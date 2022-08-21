import got from "got";

/**
 * @class Task
 */
export class Task {
  /**
   * @constructor
   * @param {string} token API Token
   * @param {string} server Task server.
   * @param {string} id Task ID.
   */
  constructor(token, server, id) {
    this.request = got.extend({
      prefixUrl: "https://".concat(server),
      headers: {
        Authorization: "Bearer ".concat(token),
      },
    });

    this.id = id;
  }

  // todo: implement upload, process, and download
}
