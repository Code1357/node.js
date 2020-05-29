'use strict';

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
app.get('/courses', homeController.showCoures);
app.get('/contact', homeController.showSignUp);
app.post('/thanks', homeController.postedSignUpFrom);

// ポートの監視
app.listen(app.get('port'), () => {
  console.log(`localhost:${app.get('port')}を監視しています`);
});