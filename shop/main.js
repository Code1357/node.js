'use strict';

const express = require('express'); // express呼び出し
const app = express(); // express初期化
const router = require("./routes/index"); // routesの入り口に繋がるパスを読み込む(const router = express.Router();は、routesで別々に設定しているので不要 // .Router初期化,必ず一番下にapp.use("/", router);が必要)
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

const passport = require("passport"); // passoport読み込み
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
app.set('port', process.env.PORT || 3000); // portへ代入(process.envはNodeの環境変数を取得している)

// テンプレートエンジンejsを指定,参考：https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set('view engine', 'ejs');

app.set('token', process.env.TOKEN || 'recipeT0k3n');// TOKEN:プロセスの環境変数(APIで監視するので、トークンapiフォルダのuserController.jsに記述),'recipeT0k3n'(ただの文字列でデフォルトで設定している),


mongoose.set('useFindAndModify', false); // findOneAndUpdate()を使う時は、これをセット必須,セットしないと非推奨となる

// method-overrideを処理,アプリケーションルータを設定(クエリパラメータ_methodを見つけたら、指定されたmethodを解釈する。例)?_method=PUT)
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(layouts); // ミドルウェア関数として、express-ejs-layoutsを使用
app.use(express.static('public')); // 静的ファイルの供給を可能にするコード

// HTTPリクエストのバッファルトリームをエンコードする（urlエンコードの本体の解析）参考：http://expressjs.com/ja/api.html#express.urlencoded
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // リクエストのJSON本体を解析する
app.use(homeController.logRequestPaths); //自作ミドルウェア関数？？？

app.use(cookieParser('secret_passcode')); // 選択した秘密のパスコードを使う。事と、expressに知らせている
app.use(expressSession({ // passport群より先に設定が必要,セッションを使うようにExpressに設定
  secret: 'secret_passcode', // 必須オプション
  cookie: {
    maxAge: 4000000 // 4万ミリ秒(約1時間でクッキーを期限切れにする)
  },
resave: false, // 基本的にはfalse
saveUninitialized: false // セッションにメッセージを追加しない限りクッキーをユーザーに送らないようにする
}));
app.use(connectFlash()); // フラッシュメッセージがセッションに保存される
// cookie-parser参考：https://www.npmjs.com/package/cookie-parser
// express-session,参考：https://www.npmjs.com/package/express-session
// connect-flash,参考：https://www.npmjs.com/package/connect-flash , Express 3.までしか対応してない？
// connect-flash,参考：https://qiita.com/t_n/items/5409422e8477475fa665 , Express 4.以降に使う場合
// *express-sessionモジュールを使う場合、cookie-parserを使う必要はないが、問題が生じる事があるので注意が必要


app.use(passport.initialize()); // passport初期化(フラッシュメッセの前に設置)
app.use(passport.session()); // Expressのセッションをpassportに使うように設定する(フラッシュメッセの前に設置)

// (⇩passport-local-mongooseに必要)
passport.use(User.createStrategy()); // Userのログインストラテジーを設定
passport.serializeUser(User.serializeUser()); // ユーザーデータのリシアライズをpassportを設定する(ユーザデータの圧縮暗号化)
passport.deserializeUser(User.deserializeUser()); // ユーザーデータのデシリアライズをpassportを設定する(複合=元のデータに復元する)



// レスポンスのローカル変数に代入して、レスポンスで使えるようにする(ログイン時)
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated(); // passportのログイン状態をloggeIn変数に設定(ローカル環境で使うための変数),isAuthenticated???(Passport.jsが提供しているメソッドらしい)リクエストのクッキーに既存のユーザーが格納されていれば「true」を返す,なければ「false」を返す(ログイン状態をチェック)
  res.locals.currentUser = req.user; // ログインしたユーザーをcurrentUserに設定(つまり、誰がログインしたかを示す事が可能となる)
  res.locals.flashMessages = req.flash(); // フラッシュメッセを、レスポンスのローカル変数に設定,flash()???
  next();
});



// router.post('/subscribe', subscribersController.saveSubscriber);


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