const {doTest} = require('../testing.js');
const assert = require('node:assert');

const {ILovePDF} = require('../../dist');
const {Task} = require('../../dist/task.js');

doTest('download', async () => {
  const instance = new ILovePDF();
  const task = await instance.newTask('officepdf');
  assert.ok(task instanceof Task);
  assert.strictEqual(typeof task.id, 'string');

  assert.strictEqual(
    await task.addFileLocal('/tmp/a.odt', 'asuadhsasdui'),
    true,
  );
  const process = await task.process({});
  assert.ok(process);

  const download = await task.download();
  assert.ok(download, 'Download shouldnt undefined');
  assert.ok(
    download instanceof Buffer,
    'Download should be instance of Buffer',
  );
});
