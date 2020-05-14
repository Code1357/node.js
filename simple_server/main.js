'use strict';

/* const http = require('http');
const server = http.createServer((req, res) => {
res.writeHead(200, {
'Content-Type': 'text/plain; charset=utf-8'
});
res.write(req.headers['user-agent']);
res.end();
});
const port = 8000;
server.listen(port, () => {
console.log('Listening on ' + port);
}); */

const port = 3000;

// httpとhttp-status-codeのモジュールをロードする
const http = require('http');
const httpStatus = require('http-status-codes');

// requestとresponseのパラメータを指定してサーバを作成
const app = http.createServer((req, res) => {
  // 「リクエストを受信しました！」
  console.log('リクエストを受信しました！');
  // クライアントに対するレスポンスを書く
  res.writeHead(httpStatus.OK, { // httpStatus.OK はモジュールで OK という変数をimportしてるだけ, OK = 200
    'Content-Type':'text/html; charset=utf-8' // text/htmlをhtmlにする事でh1タグがHTMLとして読み込まれる,日本語の場合、charset=utf-8を記述しないと文字化けする
  });

  let resMessage = '<h1>ようやく、htmlにレスポンスできたー！</h1>';
  res.write(resMessage);
  res.end();
  // 「レスポンスを送信しました:」
  console.log(`Sent a response : ${resMessage}`);
});

// アプリケーションのサーバにポート3000を監視させる // http://localhost:3000/
app.listen(port);

// 「サーバが起動して、このポートを監視中:」
console.log(`サーバが起動してポート ${port} を監視しています`)