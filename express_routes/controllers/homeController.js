'use strict';
// MVCを意識して

/* 分解前コード */
/* app.get('/items/:vegtable', (req, res) => {
  let veg = req.params.vegtable;
  res.send(`${veg}のページですよ`);
});  */

// ある経路に固有のリクエストを扱う関数を作る(経路は1つの例）
exports.sendreqParam = (req, res) => {
  let veg = req.params.vegtable;
  res.send(`${veg}のページですよ`);
};

/* 分解前コード */
/* app.use((req, res, next) => { // useメソッド：Express.jsで使いたいミドルウェア関数を定義できる
  console.log(`リクエスト内容は${req.url}`); // 結果：リクエスト内容は/
  next(); // next関数を呼び出す
});
 */
//　ミドルウェア関数,reqestのlogを残す関数
exports.logReqestPaths = (req, res, next) => {
  let log = console.log(`リクエスト内容は${req.url}`);
  next();
};

// ある経路に固有のリクエストを扱う関数を作る(経路は1つの例）
exports.userSignUpProcessor = (req, res) => {
  res.send('POSTページだよ');
}