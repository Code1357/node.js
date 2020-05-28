'use strict';

const port = 3000;
const express = require('express');
const app = express();
const homeController = require('./controllers/homeCotroller');
const errorController = require('./controllers/errorController');
app.use(errorController.logErrors);

// express-ejs-layoutsの設定
const layouts = require('express-ejs-layouts');
app.use(layouts); // ミドルェア層である事を設定

// Express.jsアプリケーションビューエンジンにejsを設定する（viewフォルダでejsを格納して使えるようにする)
app.set('view engine', 'ejs');


// パスはindexに指定すればindex,nameを指定すればnameを呼び出せる
// という事はURLを自由に設定できる？？？？
/* ① responsWithName: app.get('/name', homeController.responsWithName); */

/* ルート・パラメータ
   name(既に指定されたkey,プロパティ)
   :myName(イメージは値が入る箱) 
   例)
    ルートパス：'/name/:myName'
    訪問者が、
    リクエストURL：http://localhost:3000/name/chokoと入力したら
    myNameの箱にchokoが入る
    そのパラメータを取得するには、req.paramsを使う
    req.params: {'name': 'choko'}となる
*/
responsWithName: app.get('/name/:myName', homeController.responsWithName);


// 例）http://localhost:3000/images/nodejs.jpg など直接HTTPたたく事で訪問できる
app.use(express.static('public')); // static:Expressのミドルウェア

// 順序が大切,エラー処理のミドルウェア
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


// デプロイした時にどちらのポートが適用となるか比較している,process.env：文字列でないプロパティを代入すると暗黙で文字列に変換される
app.set('port', process.env.PORT || 3000); 
app.listen(port, console.log(`prot${app.get('port')}が起動しています`));