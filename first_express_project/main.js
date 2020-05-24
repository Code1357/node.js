const port = 3000;

// expressモジュールを読み込み
const express = require('express');
// expressアプリケーションをappに代入
const app = express();

// GET経路の設定


// サーバからクライアントへのレスポンスを発行,send()はwriteと同じ振る舞い
app.get('/', (req, res) => {

   console.log(req.params); // requestのパラメータをアクセスするなど、個別に設定して色々requestを確認できる,リファレンスで其々の取得内容について説明あり
  // console,log(req.body);
  // console.log(req.url);
  // console.log(req.query);

  res.send(`Hello World だよ！<br>${req.params}<br>${req.body}<br>${req.url}<br>${req.query}`); // サーバからクライアントへのレスポンスを発行,send()はwriteと同じ振る舞い
  // 例えば、出力のインデントを整える関数を作って、reqest取得内容を確認する事ができる。慣れるまで視覚的にチェックして引数確認するのもありかも。モジュール作ってみる。
});

app.listen(port, () => {
  console.log(`${3000}のprotが起動しています`);
});