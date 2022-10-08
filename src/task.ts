import axios, {AxiosInstance} from 'axios';
import FormData from 'form-data';
import fs from 'node:fs';
import {IDownloadProcessed, IError} from './@typings';
import {throwIfTypeIsNot} from './util';

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
  #files_: string[] = [];

  /**
   * @description Uploaded files
   * @return {string}
   */
  get files(): string[] {
    return this.#files_;
  }

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
   * @param {string} fileName File Name
   * @return {Promise<boolean>}
   */
  async addFileLocal(filePath: string, fileName: string): Promise<boolean> {
    throwIfTypeIsNot(filePath, 'string', 'filePath is required!');
    throwIfTypeIsNot(fileName, 'string', 'fileName is required!');

    const stat = await fs.promises.stat(filePath).catch(() => undefined);
    if (!stat || stat.isDirectory()) return false;

    const form = new FormData();
    form.append('task', this.id);
    form.append('file', fs.createReadStream(filePath));

    const response = await this.request
      .post('/v1/upload', form)
      .catch((e) => e.response);
    if (!response.data?.server_filename) {
      throw new Error(response.data.error.message);
    }
    this.#files_.push(response.data.server_filename.concat('||', fileName));

    return true;
  }

  /**
   * Add file via URL
   * @param {string} fileUrl File URL
   * @param {string} fileName File Name
   * @return {Promise<boolean>}
   */
  async addFileUrl(fileUrl: string, fileName: string): Promise<boolean> {
    throwIfTypeIsNot(fileUrl, 'string', 'fileUrl is required!');
    throwIfTypeIsNot(fileName, 'string', 'fileName is required!');

    const response = await this.request
      .post('/v1/upload', {
        'task': this.id,
        'cloud_file': fileUrl,
      })
      .catch((e) => e.response);

    if (!response.data?.server_filename) {
      throw new Error(response.data.error.message);
    }
    this.#files_.push(response.data.server_filename.concat('||', fileName));

    return true;
  }

  /**
   * Process current task.
   * @param {any} args Process payload
   * @return {Promise<IDownloadProcessed | IError>}
   */
  async process(args: UseAny): Promise<IDownloadProcessed | IError> {
    if (!this.#files_.length) {
      throw new Error("You aren't able to process this task!");
    }

    const response = await this.request
      .post('/v1/process', {
        ...args,
        task: this.id,
        tool: this.tool,
        files: this.#files_.map((fl) => ({
          server_filename: fl.split('||')[0],
          filename: fl.split('||')[1],
        })),
      })
      .catch((e) => e.response);

    return response.data;
  }

  /**
   * @description Download processed task.
   * @return {Promise<Buffer | undefined>} buffer.
   */
  async download(): Promise<Buffer | undefined> {
    const response = await this.request
      .get('/v1/download/'.concat(this.id), {
        responseType: 'arraybuffer',
      })
      .catch((e) => e.response);

    if (response.status !== 200) return undefined;
    return response.data;
  }
}
