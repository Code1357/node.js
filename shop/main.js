'use strict';

const mongoose = require('mongoose');
// DBへの接続
mongoose.connect('mongodb://localhost:27017/recipe_db',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// データベースをdb変数に代入
const db = mongoose.connection;
// mongooseでMongoDBへ接続
db.once('open', () => {
  console.log('mongooseを使ってMongoDBに接続できました！')
});

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
const subscriberController = require('./controllers/subscribersController');
const errorControllers = require('./controllers/errorController');

// HTTPリクエストのバッファルトリームをでコードする（bodyの解析）参考：http://expressjs.com/ja/api.html#express.urlencoded
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// 経路
app.get('/', (req, res) => {
  res.send('ようこそ、甘くて美味しい料理のページへ！')
});

// リクエストのパスに応じて対応する経路
app.get('/courses', homeController.showCourses);
 // *購読ページ用のGETルート
app.get('/contact', subscriberController.getSubscriptionPage);
 // *購読データを処理するPOSTルート
app.post("/subscribe" ,subscriberController.saveSubscriber);
 // 送信後のサンクス用のGETルート
/* app.post('/thanks', homeController.postedSignUpFrom); */

// すべての購読者を表示するビューへの経路
app.get('/subscribers', subscriberController.getAllSubscribers);


// Errorの経路
app.use(errorControllers.pageNotFoundError);
app.use(errorControllers.internalServerError);

// ポートの監視
app.listen(app.get('port'), () => {
  console.log(`localhost:${app.get('port')}を監視しています`);
});
