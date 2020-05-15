'use strict';

const port = 3000;

const http = require('http'); // node.jsのコアモジュール
const httpStatus = require('http-status-codes'); // 依存のモジュール
const app = http.createServer(); // サーバーを作る

 // JavaScriptオブジェクトを文字列に変換する関数
const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
}

app.on('request',(req,res) => {
  // リクエストを監視
  let body = [] // データを入れる配列の箱を準備
  req.on('data',(bodyData) => {
    // そのデータを別のコールバック関数で処理
    body.push(bodyData); // 受信したデーtをbody配列に入れる,push:配列の最後に要素をを追加
  });
  req.on('end',() => { // データ転送の完了時に実行するコード
    body = Buffer.concat(body).toString(); // body配列を文字列テキストに変換
    // リクエストの内容をコンソールにロギングする
    console.log(`Reqest Body Contents: ${body}`);
});

console.log(`Method: ${getJSONString(req.method)}`); 
console.log(`URL: ${getJSONString(req.url)}`);
console.log(`Headers: $getJSONString(req.headers)}`);

res.writeHead(httpStatus.OK, {　//　writeHead():heder情報の書き出し
  'Content-Type':'text/html'
});

// write():bodyへの書き出し

// 「このメッセージが画面に現れます」
let resMessage = '<h1>This will show on the screen.</h1>';
res.end(resMessage);
});

// ここでは変数にprot3000を指定しているので、port3000を開いて処理を実行となる(処理の内容は、app関数)
app.listen(port);

// ログに出力「サーバが起動しました。監視しているポート番号は:」
console.log(`サーバが起動してポート ${port} を監視しています`);


/* app.on('request',(req,res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
}); */