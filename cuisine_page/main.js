'use strict';

// MongoDBモジュール,MongoClient:新しいインスタンスを作成
const MongoClient = require('mongodb').MongoClient;
// Node.jsのモジュール,error発生の確認するため
const assert = require('assert').strict; // Node.jsの厳密モード
// DBの接続先URL設定
const dbUrl = 'mongodb://localhost:27017';
// DBの名前
const dbName = 'recipe_db';
// MongoClientの新規作成
const client = new MongoClient(dbUrl);

// サーバ接続
client.connect((error) => { // connect:指定のURLを使いMDBに接続
  assert.strictEqual(null, error); // assert.strictEqual:パラメータの間の厳密な平等性をテスト実施
  console.log('サーバーに接続できました');
  const db = client.db(dbName);

  // 新しいデータを追加
  db.collection('contacts').insert({
    name: 'ちょこ',
    email: 'choko_test@gmail.com'
  }, (error, db) => {
    if (error) throw error;
    console.log(db);
  });

  // データ(レコード)の取得
  // // find(),jsの関数と違う。MongoDBでは一致が得られない時に空の配列を返す
  db.collection('contacts').find().toArray((error, document) => {
    assert.strictEqual(null, error);
    console.log(document);
  });

  // 接続解除
   client.close(() => { // close(callback):接続を閉じ,オプションのコールバックを呼び出す
    console.log('接続終了');
  });
});

/*--------------------------------------------*/

// ecpress初期化,設定
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000); // portへ代入

// express-ejs-layoutインポート,設定
const layouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(layouts);

// 静的ファイルの供給
app.use(express.static('public'));

// homeControllerインポート
const homeController = require('./controllers/homeController');
const errorControllers = require('./controllers/errorController');

// HTTPリクエストのバッファルトリームをでコードする（bodyの解析）参考：http://expressjs.com/ja/api.html#express.urlencoded
app.use(
  express.urlencoded({
    extended:false
  })
);
app.use(express.json());

// 経路
app.get('/', (req, res) => {
  res.send('ようこそ、甘くて美味しい料理のページへ！')
});

// リクエストのパスに応じて対応する経路
app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/thanks', homeController.postedSignUpFrom);

// Errorの経路
app.use(errorControllers.pageNotFoundError);
app.use(errorControllers.internalServerError);

// ポートの監視
app.listen(app.get('port'), () => {
  console.log(`localhost:${app.get('port')}を監視しています`);
});