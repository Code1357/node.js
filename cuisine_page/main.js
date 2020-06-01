'use strict';
/*
mongoose(パッケージ)を使った操作
// 参考：
https://mongoosejs.com
https://mongoosejs.com/docs/connections.html
https://mongoosejs.com/docs/schematypes.html
https://mongoosejs.com/docs/guide.html
https://mongoosejs.com/docs/models.html
*/
// mongooseモジュールを読み込み
const mongoose = require('mongoose');
// データベースへの接続を設定
mongoose.connect('mongodb://localhost:27017/recipe_db',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// データベースをdb変数に代入
const db = mongoose.connection;
// mongooseでMongoDBへ接続
db.once('open', () => {
  console.log('mongooseを使ってMongoDBに接続できました！')
});

// DBのモデルモジュールをインポート
/* const Subscriber = require('./models/subscriber'); */

//　方法①Subscriberをインスタンス化(モデルのインスタンスをドキュメントと呼ぶ)
/* let subscriber1 = new Subscriber({
  name: 'ちょこらんど',
  email: 'chokolund@gmail.com'
});
// SubscriberをDBに保存する
subscriber1.save((error, savedDocument) => {
  // エラーがあれば次のミドルウェア関数に渡す
  if (error) console.log(error);
  // 保存したドキュメントをログに出力
  console.log(savedDocument);
});
 */
// 方法②上記newとsaveを一度に行う方法
/* Subscriber.create({
  name: 'なすびちゃん',
  email: 'nasubi@gmail.com'
}, function (error, savedDocument) {
  if (error) console.log(error);
  console.log(savedDocument);
}
); */

// 上記内容でsubscribersというDBが作成されている事がCompassやシェルで確認できる,(DB名はモデル名に s がつく様子()

// データベースないのドキュメントの検索例(1つのドキュメントを見つける方法),変数に代入して使う
// 参考：https://mongoosejs.com/docs/api.html#model_Model.findOne
/* const myQuery = Subscriber.findOne({
  name: 'なすびちゃん'
}); */

// クエリを実行
/* myQuery.exec((error, data)=> { // exec:クエリの実行
  if(data) console.log(data.name);
}); */

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

// リクエストをgetAllSubscribers関数に渡す
app.get('/subscribers', subscriberController.getAllSubscribers, (req, res, next) => {
  // reqesutオブジェクトからのデータをログ煮出す
  console.log(req.data);
  // データをブラウザのウィンドウに表示する
  res.render('subscribers', {subscribers: req.data}); // subscribers.ejsを呼び出す,{subscribers: req.data}は、req.dataを変数subscribersに代入して.ejsに反映させる
});


// Errorの経路
app.use(errorControllers.pageNotFoundError);
app.use(errorControllers.internalServerError);

// ポートの監視
app.listen(app.get('port'), () => {
  console.log(`localhost:${app.get('port')}を監視しています`);
});
