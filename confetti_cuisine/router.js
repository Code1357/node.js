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
  } catch (e) {
    res.weiteHead(htttpStatus.OK, contentTypes.html);
    utils.getFile('views/error.html', res);
  }
};

// 経路関数を関連づけるgetとpostの関数を作成
exports.get = (url, action) => {
  routes['GET'][url] = action;
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};