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

const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require("connect-flash");

const passport = require("passport");
const User = require("./models/user");


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

mongoose.set('useFindAndModify', false); // findOneAndUpdate()を使う時は、これをセット必須,セットしないと非推奨となる

// method-overrideを処理,アプリケーションルータを設定(クエリパラメータ_methodを見つけたら、指定されたmethodを解釈する。例)?_method=PUT)
router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router.use(layouts); // ミドルウェア関数として、express-ejs-layoutsを使用
router.use(express.static('public')); // 静的ファイルの供給を可能にするコード

// HTTPリクエストのバッファルトリームをエンコードする（urlエンコードの本体の解析）参考：http://expressjs.com/ja/api.html#express.urlencoded
router.use(express.urlencoded({extended: false}));
router.use(express.json()); // リクエストのJSON本体を解析する
router.use(homeController.logRequestPaths); //自作ミドルウェア関数？？？

router.use(cookieParser('secret_passcode')); // 選択した秘密のパスコードを使う。事と、expressに知らせている
router.use(expressSession({ // 
  secret: 'secret_passcpde', // 必須オプション
  cookie: {
    maxAge: 4000000 // 4万ミリ秒(約1時間でクッキーを期限切れにする)
  },
resave: false, // 基本的にはfalse
saveUninitialized: false // セッションにメッセージを追加しない限りクッキーをユーザーに送らないようにする
}));
router.use(connectFlash()); // フラッシュメッセージがセッションに保存される
// cookie-parser参考：https://www.npmjs.com/package/cookie-parser
// express-session,参考：https://www.npmjs.com/package/express-session
// connect-flash,参考：https://www.npmjs.com/package/connect-flash , Express 3.までしか対応してない？
// connect-flash,参考：https://qiita.com/t_n/items/5409422e8477475fa665 , Express 4.以降に使う場合
// *express-sessionモジュールを使う場合、cookie-parserを使う必要はないが、問題が生じる事があるので注意が必要

// フラッシュメッセージを、レスポンスのローカル変数に代入する必要がある
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});


router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// 下記から、getとpostの経路(ルーティングパスを記入)
router.get('/', homeController.index); /*1*/
router.get('/contact', homeController.getSubscriptionPage); /*2*/

router.get('/users', usersController.index /*3*/, usersController.indexView /*3.1*/);
router.get('/users/new', usersController.new); /*4*/
router.post('/users/create', /* usersController.validate */ usersController.create, /*5*/usersController.redirectView); /*5.1*/
router.get('/users/login', usersController.login);
router.get("/users/login", usersController.login); // なぜ二つあるのか？？？
router.post('/users/login', usersController.authenticate,usersController.redirectView); // login時のPOSTリクエスト処理
router.get('/users/:id/edit', usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView); // PUT
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView); // DELETE
router.get('/users/:id', usersController.show, usersController.showView); /*6*/

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

// router.post('/subscribe', subscribersController.saveSubscriber);

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