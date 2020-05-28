'use strict';

const httpStatus = require('http-status-codes');

// エラー処理用のミドルウェア
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack); // エラーを出力
  next(error); // errorを次のミドルウェア関数に渡す
};

// ステータスコード404でレスポンス
/* exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode); // res.status():レスポンスのHTTPステータスを設定する
  res.send(`${errorCode} | The page does not exist!/このページは存在しません`)
};
 */

 // カスタムのエラーページで応答する
exports.respondNoResourceFound = (req, res) => {
  // 404.htmlの内容を送信
  res.sendFile('./public/404.html', {root: './'}); // res.sendFile:指定されたパスにファイルを転送,rootがない場合は絶対パスでなければならない
};


// すべてのエラーをキャッチし、ステータスコード500でレスポンス,500：内部サーバーエラー
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!/申し訳ありませんが、私たちのアプリケーションに問題が発生しています。`)
};