import got from "got";
import { FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";

/**
 * @class Task
 */
export class Task {
  /**
   * @constructor
   * @param {string} token API Token
   * @param {string} tool Task Tool
   * @param {string} server Task server.
   * @param {string} id Task ID.
   */
  constructor(token, tool, server, id) {
    this.request = got.extend({
      prefixUrl: "https://".concat(server),
      headers: {
        Authorization: "Bearer ".concat(token),
      },
    });

    this.id = id;
    this.files = [];
    this.tool = tool;
  }

  async addFileFromPath(filePath) {
    const form = new FormData();
    form.set("file", await fileFromPath(filePath));
    form.set("task", this.id);

    const response = await this.request.post("./v1/upload", {
      body: form,
    });

    if (typeof response.body !== 'object') return false;

    this.files.push(response.body.server_filename);
    return true;
  }

  async addFileFromUrl(url) {
	  const response = await this.request.post('./v1/upload', {
		  body: {
			  task: this.id,
			  cloud_file: url,
		  }
	  });

	  if (typeof response.body !== 'object') return false;
	  this.files.push(response.body.server_filename);

	  return true;
  }

  async process() {
	  if (!this.files.length) return undefined;
  }

  // todo: implement upload, process, and download
}
