const {format} = require('node:util');

/**
 * Check the function is async or not
 * @param {*} data Any data
 * @return {boolean}
 */
const isAsyncFunc = (data) => data && data.constructor.name === 'AsyncFunction';
/**
 *
 * @param {string} name Test name
 * @param {Function} func Test function.
 */
const doTest = async (name, func) => {
  try {
    if (isAsyncFunc(func)) {
      await func();
      success = true;
    } else {
      func();
      success = true;
    }

    if (success) console.log(format('[%s]: success', name));
    else console.log(format('[%s]: fail', name));
  } catch (e) {
    console.log(format("[%s]: fail cuz '%s'", name, e?.message));
  }
};

module.exports = {doTest};
