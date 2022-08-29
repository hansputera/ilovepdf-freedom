const {format} = require('node:util');

/**
 *
 * @param {string} name Test name
 * @param {Function} func Test function.
 */
const doTest = async (name, func) => {
  try {
    func();

    console.log(format('[%s]: success', name));
  } catch (e) {
    console.log(format('[%s]: %s fail', name, e?.message));
  }
};

module.exports = {doTest};
