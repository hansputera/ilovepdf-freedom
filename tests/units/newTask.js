const {doTest} = require('../testing.js');
const assert = require('node:assert');

const {ILovePDF} = require('../../dist');
const {Task} = require('../../dist/task.js');

doTest('newTask', async () => {
  const instance = new ILovePDF();

  const task = await instance.newTask('officepdf');
  assert.ok(task instanceof Task);
  assert.strictEqual(typeof task.id, 'string');
});
