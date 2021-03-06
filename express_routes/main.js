'use strict';
/*
以下、実行結果を検証する
試しにPOSTリクエスト送信するには他ターミナルから
curl --data "first_name=Yasuhiro&last_name=Okada" http://localhost:3000
*/

const port = 3000;
const express = require('express');
const app = express();
const homeController = require('./controllers/homeController');

// '/items/:vegtable'に向かうGETリクエストを処理する(経路は1つの例）
// app.get('/items/:vegtable',homeController.sendReqParam);

/* 下記をhomeController.jsに移行して記述し直す（MVCの考え） */
// ミドルウェア関数を定義しているだけ,一連のルーティング処理の間に挟む関数
// 引数nextはapp.useで定義した関数入る
/* app.use((req, res, next) => { // useメソッド：Express.jsで使いたいミドルウェア関数を定義できる
  console.log(`リクエスト内容は${req.url}`); // 結果：リクエスト内容は/
  next(); // next関数を呼び出す
}); */
app.use(homeController.logReqestPaths);

// '/sign_up'POSTリクエストを処理する(経路は1つの例)
app.post('/sign_up',  homeController.userSignUpProcessor); // 間違ってる？？？？

//　URLエンコードされたデータを解析する
app.use(
  express.urlencoded({ // urlencoded：Epressの組み込みミドルウェア,URL エンコードされたボディのみを解析
    extended: false // extende：falseかtrueのどちらで解析するか選択できる
  })
);
app.use(express.json());　// json：Epressの組み込みミドルウェア,JSON のみを解析

//　ホームページように新しいPOST経路を作成
/* app.post('/', (req, res) => {
  console.log(req.body);// 結果：{}
  console.log(req.query); // 結果：[Object: null prototype] { first_name: 'Yasuhiro', last_name: 'Okada' }
  res.send("POST Successgul!")
});
 */

app.listen(port, () => {
  console.log(`server ${port}が起動しています`);
});
