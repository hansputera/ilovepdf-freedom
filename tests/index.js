const fs = require('node:fs');
const path = require('node:path');
const child_process = require('node:child_process');
const util = require('node:util');

if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  child_process.exec(util.format('cd %s && pnpm run build', __dirname));
}

const files = fs.readdirSync(path.resolve(__dirname, 'units'));
files.forEach((fl) => {
  require(path.resolve(__dirname, 'units', fl));
});
