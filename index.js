import got from "got";

import { validateTool, getConfig } from "./util.js";
import { Task } from "./task.js";

/**
 * @class ILovePDF
 */
export class ILovePDF {
  /**
   * @constructor
   * init ilovepdf
   */
  constructor() {
    this.token = undefined;
  }

  get request() {
    return got.extend({
      prefixUrl: "https://api.ilovepdf.com",
      headers: {
        Authorization: "Bearer ".concat(this.token),
      },
    });
  }

  /**
   * @param {string} tool - ILovePDF tool
   * @return {Task}
   */
  async newTask(tool) {
    if (typeof this.token !== "string" || !Array.isArray(this.workers)) {
      const response = await got("https://www.ilovepdf.com/word_to_pdf");
      const config = await getConfig(response.body);

      if (!config?.token) throw new Error("Couldn't get the token");

      this.token = config?.token;
    }

    if (!validateTool(tool)) return undefined;
    const taskResponse = await this.request.get("./v1/start/".concat(tool));

    return new Task(this.token, taskResponse.server, taskResponse.task);
  }
}

const instance = new ILovePDF();
instance.newTask("officepdf");
