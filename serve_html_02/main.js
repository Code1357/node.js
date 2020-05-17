'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');

// fsモジュールをインポート(Node.jsのコアモジュール)
const fs = require('fs'); // 様々なファイル操作のメソッドが使えるようになる

// URLを補完してファイルのパスにする関数を作る
const getViewUrl = (url) => {
    return `views${url}.html`;
}
            /* 以下の部分を自動で経路を判別する関数
                const routeMap = {
                "/": "views/index.html"　// "/"は、URLのルートにアクセスした場合の経路
                }; 
            */

const server = http.createServer((req, res) => {

    // ファイルのパス文字列を取得
    let viewUrl = getViewUrl(req.url);
           
    // リクエストのURLを補完してfsでファイルを探す
    fs.readFile(viewUrl, (error, data) => {
        if (error) {
            res.writeHead(httpStatus.NOT_FOUND);
            res.write('<h1>FILE NOT FOUND/ファイルはありません</h1>'); // なぜか文字化けする
        } else {
            res.writeHead(httpStatus.OK, {
                'Content-Type': 'text/html: charset=uft-8'
            });
            res.write(data);
        }
        res.end(); // 最後、errorとそうで無い場合のどちらも対応できるようにendで閉める
    });
})

server.listen(port);
console.log(`サーバが起動してポート ${port} を監視しています`);