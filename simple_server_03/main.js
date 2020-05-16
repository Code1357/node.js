'use strict';

const port = 3000;

const http = require('http'); // node.jsのコアモジュール
const httpStatus = require('http-status-codes'); // 依存のモジュール
const app = http.createServer(); // サーバーを作る

// JavaScriptオブジェクトを文字列に変換する関数
const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
}

app.on('request', (req, res) => {
  // リクエストを監視
  let body = [] // チャンクとして届くデータを順番に入れる箱（配列）を準備する

  // 以下、POSTしたデータ
  req.on('data', (bodyData /*引数：データを引き受ける場所*/ ) => {　// .on('data')のイベントを定義（データ読み込み時イベント）
    // そのデータを別のコールバック関数で処理
    body.push(bodyData); // 受信したデータをbody配列に入れる,push:配列の最後に要素をを追加
  });

  req.on('end', () => { // .on('end')：ストリームから読み込むデータが完了したらのイベント
    body = Buffer.concat(body).toString(); // Buffer(バイナリデータ）のbody配列を文字列テキストに変換,concat(body):配列を繋ぐ,toString():指定されたオブジェクトを表す文字列を返す

    // リクエストの内容をコンソールにロギングする
    console.log(`Reqest Body Contents: ${body}`);
  });

  //getJSONStringを使って、流れたように記述されたデータを整えてるだけ
  console.log(`Method: ${getJSONString(req.method)}`); // (req.method):HTTPリクエストのメソッドを出力
  console.log(`URL: ${getJSONString(req.url)}`); // (req.url):HTTPリクエストのURLを出力
  console.log(`Headers: ${getJSONString(req.headers)}`); // (req.headers):HTTPリクエストのhesder情報を出力

  res.writeHead(httpStatus.OK, {　//　writeHead():heder情報の書き出し
    'Content-Type': 'text/html; charset=utf-8'
  });

  // write():bodyへの書き出し

  // 「このメッセージが画面に現れます」
  let resMessage = '<h1>クライアントの画面に表示させます</h1>';
  res.end(resMessage);　//  最後は必ず.end()で閉める
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