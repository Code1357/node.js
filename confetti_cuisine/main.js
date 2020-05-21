const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const router = require('./router');
const contetntTypes = require('./contentTypes'); // オブジェクトモジュールの読み込み
const utils = require('./utils');