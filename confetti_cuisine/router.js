// モジュールの読み込み
const htttpStatus = require('http-status-codes');
const contentTypes = require('./contentTypes');
const utils = require('./utils');

// リクエストの経路(get関数,post関数)を入れる、空のオブジェクトを準備
const routes = {
  'GET': {},
  'POST': {}
};

// リクエストを処理するhandle関数を作成(エクスポートする)
exports.handle = (req, res) => {
  try { // 予期せぬエラーへの対処(try...)
    routes[req.method][req.url](req, res);

console.log(req.method); // GETを取得している

  } catch (e) {
    res.writeHead(htttpStatus.OK, contentTypes.html);
    utils.getFile('views/error.html' ,res);
  }
};

// 経路関数を関連づけるgetとpostの関数を作成
exports.get = (url, action) => {
  routes['GET'][url] = action;

// console.log(url);
// console.log(action);

};

exports.post = (url, action) => {
  routes['POST'][url] = action;

console.log(url);
// console.log(action);

};