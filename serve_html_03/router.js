'use strict';

const httpStatus = require('http-status-codes');
const hetmlContentType = {
  'Content-Type': 'text/html; charset=utf-8'
}
// route "オブジェクト" を定義
// 'GET'：プロパティ名,『'' or ""』でプロパティ名は括る方がよいが状況によっては省略可能
const toutes = {
  'GET':{
    '/info':(req,res) => {
      res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/plain; charset=utf-8'
      })
      res.end('Welcom to the Info Page!/情報のページへようこそ！');
    }
  },
  'POST':{
  }
};

// 経路のコールバック関数を処理するhandle関数を作る
// handle関数を作る理由:リクエストの経路(ルーティング)は、エラーを明示処理しないとクラッシュしてしまう。その際、try...catch文を記述する必要あり
// try...catch 文:予想していない異常によるエラーが発生した場合の回避処理(途中でプログラムが止まるのを回避する)
exports.handle = (req,res) => {
  try { // try{}:例外的なエラーが発生するかもしれない処理を記述
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req,res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, hetmlContentType);
      res.end('<h1>No such file exisits</h1>');
    }
  } catch (ex) { // 例外的なエラーが発生した場合に実行する処理
    console.log('error:' + ex);
  }
};

// 他で使う関数GET,POSTを定義(今回は、経路を登録するためにmain.jsで使う)
exports.get = (url, action) => {
  routes['GET'][url] = action;
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};