import axios, {AxiosInstance} from 'axios';
import {FormData} from 'formdata-node';
import {fileFromPath} from 'formdata-node/file-from-path';
import fs from 'node:fs/promises';

/**
 * @class Task
 */
export class Task {
  /**
   * @constructor
   * @param {string} id Task ID
   * @param {string} token Task token
   * @param {string} server Task's server
   */
  constructor(
    public id: string,
    protected token: string,
    protected server: string,
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
    const stat = await fs.stat(filePath).catch(() => undefined);
    if (!stat || stat.isDirectory()) return false;

    const form = new FormData();
    form.set('task', this.id);
    form.set('file', await fileFromPath(filePath));

    const response = await this.request.post('/v1/upload', form);
    if (!response.data.server_filename) return false;
    this.files.push(response.data.server_filename);

    return true;
  }
}