'use strict';

const port = 3000;
const express = require('express');
const app = express();
const homeController = require('./controllers/homeCotroller');

// Express.jsアプリケーションビューエンジンにejsを設定する（viewフォルダでejsを格納して使えるようにする)
app.set('view engine', 'ejs');



responsWithName: app.get('/index', homeController.responsWithName);



// デプロイした時にどちらのポートが適用となるか比較している,process.env：文字列でないプロパティを代入すると暗黙で文字列に変換される
// app.set('port', process.env.PORT || 3000); 

app.listen(port, console.log(`prot${app.get('port')}が起動しています`));