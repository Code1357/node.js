'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');

// '経路': 'レスポンスの対応'  を定義するマップ
const routeResponseMap = {
  '/info': '<h1>Info Page/情報ページ</h1>',
  '/contact': '<h1>Contact/お問い合わせ</h1>',
  '/about': '<h1>Learn More About Us/私たちについて知っていただきたい事</h1>',
  '/hello': '<h1>Say hello by emailing us <a href="mailto:mailing@gmail.com">here</a>/当方へのご連絡は、<a href="mailto:mailing@gmail.com">ここ</a>にメールを送信してださい</h1>',
  '/error': '<h1>Soryy,thh page yuou looking for is not here/ごめんなさい。あなたが探しているページは、ここにはありません</h1>' // ここにerror.404ステータスコードでレスポンスを記述
};　           
　


const app = http.createServer((req, res) => {　// req:リクエスト情報を受けている
  res.writeHead(httpStatus.OK, httpStatus.NOT_FOUND, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  //　リクエストの経路がマップで定義されているかチェック
  if (routeResponseMap[req.url]) { // リクエストのURLが○○だったら
    res.end(routeResponseMap[req.url]); // リクエストのURLに基づいたページを返す
  } else {
    // デフォルトのHTMLでレスポンス
    res.end('<h1>Welcome!/ようこそ！</h1>'); // 該当なければ...を返す
  }
});

// http://localhost:3000/
app.listen(port);

// サーバ状況をログに出力
console.log(`サーバが起動してポート ${port} を監視しています`)