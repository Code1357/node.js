'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');

// fsモジュールをインポート(Node.jsのコアモジュール)
const fs = require('fs'); // 様々なファイル操作のメソッドが使えるようになる

// HTMLファイルの経路を設定
const routeMap = {
    "/": "views/index.html"　// "/"は、URLのルートにアクセスした場合の経路
};

const server = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    if (routeMap[req.url]) {
        fs.readFile(routeMap[req.url], (error, data) => {　// マップされファイルを読み込んでその内容で応答する,fs.readFile()：非同期のファイルの読み込み
            res.write(data);
            res.end();
        });
    } else {
        res.end('<h1>Sorry, not found. / ごめんなさい.なにもないの.</h1>' /* 引数dataにたされる */);
    }
})

server.listen(port);
console.log(`サーバが起動してポート ${port} を監視しています`);