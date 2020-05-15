'use strict';

const port = 3000;

const http = require('http');
const httpStatus = require('http-status-codes');
const app = http.createServer();

// リクエストを監視するリスナ on()はクライアントからデータを受け取ると発生するイベント
app.on('request',(req, res) => { // 'reqest'の文字列はなんでも良いわけではない
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

// ログに出力
console.log(`サーバが起動してポート ${port} を監視しています`);


/* 
onメソッドは、様々な関数をイベント登録を行うことが出来るものです。 
例えば、 
server.on('request', doRequest); 
（requestがイベント名です。doRequestが関数です。） 

第一引数で指定したイベント発生後、第二引数の関数を実行するといった感じです。 */
/* 
イベントハンドラ：イベントが発生した時に呼び出される処理
on(event, listener) 
　-eventには、イベント名を示す文字列が入る
　-listenerがイベントハンドラの箇所であり、関数オブジェクトが入る
*/

