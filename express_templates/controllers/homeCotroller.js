'use strict';

/* ① exports.responsWithName = (req, res) => {
  // カスタムEJSビューで応答する
  res.render('index'); //res.render：ビューにあるHTMLの文字列をクライアントに送信する
} */

exports.responsWithName = (req, res) => {
  // リクエストのパラメータをローカル変数に代入
  let paramsName = req.params.myName;

  console.log(req.params); // { myName: 'choko' }
  console.log(paramsName); // choko

  // 変数nameに値を代入して、indexのローカル変数に渡す
  res.render('index', {name: paramsName });
};
// ('index', {name: paramsName })は、nameが変数,paramsNameが値。この場合、indexを表示させるとともに、index内で記述したnameに値を渡せる。