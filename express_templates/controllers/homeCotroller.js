'use strict';

exports.responsWithName = (req, res) => {
  // カスタムEJSビューで応答する
  res.render('index'); //res.render：ビューにあるHTMLの文字列をクライアントに送信する
}
