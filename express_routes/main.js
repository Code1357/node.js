const port = 3000;
const express = require('express');
app = express();

// URLのパラメータを取得する経路
app.get('/items/:vegtable', (req, res) => {
  let veg = req.params.vegtable;
  res.send(`${veg}のページですよ`);
});

// ミドルウェア関数を定義
/* app.use((req, res, next) => {
  console.log(`リクエスト内容は${req.url}`);
}); */

app.listen(port, () => {
  console.log(`server ${port}が起動しています`);
});
