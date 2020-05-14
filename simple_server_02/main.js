'use strict';

const port = 3000;

const http = require('http');
const httpStatus = require('http-status-codes');
const app = http.createServer();

/* // リクエストを監視するリスナ on()はクライアントからデータを受け取ると発生するイベント
app.on('request',(req, res) => {
  // レスポンス準備（クライアントに送り返す）
  res.writeHead(httpStatus.OK, { 
    'Content-Type':'text/html; charset=utf-8'
  });

  // Webに表示させたいもの
  let resMessage = '<h1>これを表示させますよ！</h1>';
  // htmlでレスポンスする
  res.end(resMessage);
});


// http://localhost:3000/
app.listen(port);

console.log(`サーバが起動してポート ${port} を監視しています`) */


 // JavaScriptオブジェクトを文字列に変換する
const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
}

app.on('request',(req,res) => {
  // リクエストを監視
  let body = [] // チャンクを格納する配列を作成
  req.on('data',(bodyData) => {
    // そのデータを別のコールバック関数で処理
    body.push(bodyData); // 受信したデーtをbody配列に入れる
  });
  req.on('end',() => { // データ転送の完了時に実行するコード
    body = Buffer.concat(body).toString(); // body配列を文字列テキストに変換
    // リクエストの内容をコンソールにロギングする
    console.log(`Reqest Body Contents: ${body}`);
});

console.log(`Method: ${getJSONString(req.method)}`); 
console.log(`URL: ${getJSONString(req.url)}`);
console.log(`Headers: $getJSONString(req.headers)}`);

res.writeHead(httpStatus.OK, {
  'Content-Type':'text/html'
});


// 「このメッセージが画面に現れます」
let resMessage = '<h1>This will show on the screen.</h1>';
res.end(resMessage);
});

app.listen(port);
// 「サーバが起動しました。監視しているポート番号は:」
console.log(`The server has started and is listening on port number: ${port}`);







