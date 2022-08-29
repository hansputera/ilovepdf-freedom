import axios, {AxiosInstance} from 'axios';
import {format} from 'node:util';
import {Tool} from './@typings';
import {Task} from './task';
import {getConfig, getTools} from './util';

/**
 * @class ILovePDF
 */
export class ILovePDF {
  /**
   * ILovePDF Token
   * @type {string}
   */
  #token = '';

  /**
   * Get axios request
   * @return {AxiosInstance}
   */
  get request(): AxiosInstance {
    return axios.create({
      'baseURL': 'https://api.ilovepdf.com',
      'headers': {
        'Authorization': format('Bearer %s', this.#token),
      },
    });
  }

  /**
   * Refresh ILovePDF token
   * @return {Promise<void>}
   */
  async refreshToken(): Promise<void> {
    const response = await axios.get('https://ilovepdf.com/merge_pdf');
    const config = await getConfig(response.data);

    if (typeof config?.token !== 'string') {
      throw new Error('Couldnt find token!');
    }

    this.#token = config.token;
  }

  /**
   * Create a new task
   * @param {Tool} tool New Task Tool Name
   */
  async newTask(tool: Tool) {
    const tools = getTools();

    if (tools.indexOf(tool.toLowerCase() as Tool) === -1) {
      return undefined;
    } else if (!this.#token.length) {
      await this.refreshToken();
    }

    const response = await this.request.get(
      format('/v1/start/%s', tool.toLowerCase()),
    );

    if (!response.data?.task) return undefined;
    else {
      return new Task(
        response.data.task,
        this.#token,
        response.data.server,
        tool.toLowerCase(),
      );
    }
  }
}
