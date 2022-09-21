import axios, {AxiosInstance} from 'axios';
import FormData from 'form-data';
import fs from 'node:fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseAny = any;

/**
 * @class Task
 */
export class Task {
  /**
   * @constructor
   * @param {string} id Task ID
   * @param {string} token Task token
   * @param {string} server Task's server
   * @param {string} tool Task's tool
   */
  constructor(
    public id: string,
    protected token: string,
    protected server: string,
    protected tool: string,
  ) {}

  /**
   * @type {string[]}
   * @description Uploaded files
   */
  private files: string[] = [];

  /**
   * Get axios request instance.
   * @return {AxiosInstance}
   */
  get request(): AxiosInstance {
    return axios.create({
      'baseURL': 'https://'.concat(this.server),
      'headers': {
        'Authorization': 'Bearer '.concat(this.token),
      },
    });
  }

  /**
   * Upload local file to I Love PDF Cloud.
   * @param {string} filePath File Path.
   * @return {Promise<boolean>}
   */
  async addFileLocal(filePath: string): Promise<boolean> {
    const stat = await fs.promises.stat(filePath).catch(() => undefined);
    if (!stat || stat.isDirectory()) return false;

    const form = new FormData();
    form.append('task', this.id);
    form.append('file', fs.createReadStream(filePath));

    const response = await this.request.post('/v1/upload', form);
    if (!response.data.server_filename) return false;
    this.files.push(response.data.server_filename);

    return true;
  }

  /**
   * Add file via URL
   * @param {string} fileUrl File URL
   * @return {Promise<boolean>}
   */
  async addFileUrl(fileUrl: string): Promise<boolean> {
    const response = await this.request.post('/v1/upload', {
      'task': this.id,
      'cloud_file': fileUrl,
    });

    if (!response.data?.server_filename) return false;
    this.files.push(response.data.server_filename);

    return true;
  }

  /**
   * Process current task.
   * @param {any} args Process payload
   * @return {Promise<any>}
   */
  async process(args: UseAny): Promise<UseAny> {
    const response = await this.request
      .post('/v1/process', {
        ...args,
        task: this.id,
        tool: this.tool,
        files: this.files.map((fl) => ({
          server_filename: fl,
        })),
      })
      .catch((e) => e.response);

    return response.data;
  }
}
