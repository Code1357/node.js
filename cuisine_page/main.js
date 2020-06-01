'use strict';
/*
mongoose(パッケージ)を使った操作
// 参考：
https://mongoosejs.com
https://mongoosejs.com/docs/connections.html
https://mongoosejs.com/docs/schematypes.html
*/
// mongooseモジュールを読み込み
const mongoose = require('mongoose');
// データベースへの接続を設定
mongoose.connect('mongodb://localhost:27017/recipe_db',
{useNewUrlParser: true, useUnifiedTopology: true}
);
// データベースをdb変数に代入
const db = mongoose.connection;
// mongooseでMongoDBへ接続
db.once('open', () => {
  console.log('mongooseを使ってMongoDBに接続できました！')
});

// mongoose.Schemaを使って新しいスキーマを作る,スキーマ:クラスのようなイメージで設計図となる部分
const subscriberSchema = mongoose.Schema({
  name: String, // プロパティ: データ型
  email: String,
  zipCode: Number
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