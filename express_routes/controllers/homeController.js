// URLのパラメータを取得する経路
/* app.get('/items/:vegtable', (req, res) => {
  let veg = req.params.vegtable;
  res.send(`${veg}のページですよ`);
});  */

// ある経路に固有のリクエストを扱う関数を作る
exports.sendreqParam = (req, res) => {
  let veg = req.params.vegtable;
  res.send(`${veg}のページですよ`);
};