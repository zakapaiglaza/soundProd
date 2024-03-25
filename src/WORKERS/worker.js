const path = require('path');
const { workerData } = require('worker_threads');

console.log(path.resolve(__dirname, workerData.path))

require('ts-node').register();
require(path.resolve(__dirname, workerData.path));




