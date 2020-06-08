'use strict';

const express = require('express'); // express呼び出し
const app = express(); // express初期化
const router = express.Router(); // .Router初期化
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const errorController = require("./controllers/errorController")
const homeController = require('./controllers/homeController');
const subscribersController = require('./controllers/subscribersController');
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const methodOverride = require("method-override");

// 不要：mongoose.Promise = global.Promise; // jsプロミスを使う為に必要

// mongooseでMongoDBに接続,参考：https://mongoosejs.com,参考：https://mongoosejs.com/docs/connections.html
mongoose.connect('mongodb://localhost:27017/recipe_db',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// (node:2210)非推奨の警告を避ける事ができる,参考：https://mongoosejs.com/docs/connections.html
mongoose.set("useCreateIndex", true);

// データベースをdb変数に代入,参考：https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connection
const db = mongoose.connection;
// openイベント時、DBに接続できた事を1度だけログ出力する
db.once('open', () => {
  console.log('mongooseを使ってMongoDBに接続できました！')
});

// app.setを使う事でprocess.env.PORT || 3000を'port'へ代入している
// 参考：https://nodejs.org/dist/latest-v14.x/docs/api/all.html#process_process_env ,参考：http://expressjs.com/en/5x/api.html#app.set
app.set('port', process.env.PORT || 3000); // portへ代入

// テンプレートエンジンejsを指定,参考：https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set('view engine', 'ejs');

router.use(methodOverride("_method", { // method-overrideを処理,アプリケーションルータを設定(クエリパラメータ_methodを見つけたら、指定されたmethodを解釈する。例)?_method=PUT)
  methods: ["POST", "GET"]
})
);

router.use(layouts); // ミドルウェア関数として、express-ejs-layoutsを使用
router.use(express.static('public')); // 静的ファイルの供給を可能にするコード

// HTTPリクエストのバッファルトリームをエンコードする（urlエンコードの本体の解析）参考：http://expressjs.com/ja/api.html#express.urlencoded
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json()); // リクエストのJSON本体を解析する
router.use(homeController.logRequestPaths); //自作ミドルウェア関数

// 下記から、getとpostの経路(ルーティングパスを記入)
router.get('/', homeController.index); /*1*/
router.get('/contact', homeController.getSubscriptionPage); /*2*/

router.get('/users', usersController.index /*3*/, usersController.indexView /*3.1*/);
router.get('/users/new', usersController.new); /*4*/
router.post('/users/create', usersController.create, /*5*/usersController.redirectView); /*5.1*/
router.get('/users/:id/edit', usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView); // PUT
router.get('/users/:id', usersController.show, usersController.showView); /*6*/

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new);
router.post('/courses/create', coursesController.create, coursesController.redirectView);
router.get('/courses/:id', coursesController.show, coursesController.showView);
router.post('/subscribe', subscribersController.saveSubscriber);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router); // appの変わりにrouterを使えという命令

// ポートの監視
app.listen(app.get('port'), () => {
  console.log(`localhost:${app.get('port')}を監視しています`);
});


/*.use
・ミドルウェア関数をロードする（読み込む）
・リクエストが来たら、最初に発動する
・レスポンスがサーバーから出ていく時にも発動する
・参考：http://expressjs.com/ja/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps
*/