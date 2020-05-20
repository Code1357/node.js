'use strict';

const httpStatus = require('http-status-codes');
const hetmlContentType = {
  'Content-Type': 'text/html; charset=utf-8'
}
// routes "オブジェクト" を定義
// 'GET'：プロパティ名,『'' or ""』でプロパティ名は括る方がよいが状況によっては省略可能
const routes = {
  'GET':{
    '/info':(req, res) => {
      res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      console.log(req.method);
      console.log(req.url);
      console.log(req.headers);
      res.end('Welcom to the Info Page!/情報のページへようこそ！');
    }
  },
  'POST':{} //　疑問:ここでPOST空で設置する意味は？
};

// 経路のコールバック関数を処理するhandle関数を作る
// handle関数を作る理由:リクエストの経路(ルーティング)は、エラーを明示処理しないとクラッシュしてしまう。その際、try...catch文を記述する必要あり
// try...catch 文:予期しないエラーが発生した場合の回避処理(途中でプログラムが止まるのを回避する)
exports.handle = (req,res) => {
  try { // try{}:例外的なエラーが発生するかもしれない処理を記述
    if (routes[req.method][req.url]) {　//　上記のオブジェクトのroutesからデータを呼び出して、trueであれば以下を実施
      routes[req.method][req.url](req, res);
    } else { // 上記のオブジェクトのroutesからデータを呼び出して、falseであれば以下を実施
      res.writeHead(httpStatus.NOT_FOUND, hetmlContentType);
      res.end('<h1>No such file exisits/そのようなファイルは存在しません</h1>');
    }
  } catch (ex) { // tureでもfalseとは関係なく、例外的なエラーが発生した場合に実行する処理(クラッシュ回避,consolo出力のみ)
    console.log('error:' + ex);
  }
};

// 他で使う関数GET,POSTを定義(今回は、経路を登録するためにmain.jsで使う)
// 以下関数をsub.jsファイルで分解して確認した
exports.get = (url, action) => {
  routes['GET'][url] = action;　
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};


// まとめ：expprtsを通じれば、通じるオブジェクトにもアクセスできる