const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const router = require('./router');
const contetntTypes = require('./contentTypes'); // オブジェクトモジュールの読み込み
const utils = require('./utils');

// Webページとアセットについて、一連の経路を追加
router.get('/index.html',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.html);
  utils.getFile('views/index.html' ,res);
});

router.get('/courses.html',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.html);
  utils.getFile('views/courses.html' ,res);
});

// 経路getに入ってきたら表示させる
router.get('/contact.html',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.html);
  utils.getFile('views/contact.html' ,res);
});

// 経路postに入ってきたら実行
router.post('/thanks.html',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.html);
  utils.getFile('views/thanks.html' ,res);
});

router.get('/1024px_vscode.png',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.png);
  utils.getFile('public/image/1024px_vscode.png' ,res);
});

router.get('/bootstrap.css',(req, res) => {
  res.writeHead(httpStatus.OK, contetntTypes.png);
  utils.getFile('public/css/bootstrap.css' ,res);
});

http.createServer(router.handle).listen(port);
console.log(`現在、port ${port} を監視中です`)