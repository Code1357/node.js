'use strict';

const port = 3000;
const http = require('http');
const httpStatusCodes = require('http-status-codes');
const router = require('./router'); // 作成したモジュール
const fs = require('fs'); // 様々な 『ファイル』 を供給するために必要

const plainTextContentType = {
    'Content-Type': 'text/plain; charset=utf-8'
}
const htmlContentType = {
    'Content-Type': 'text/html; charset=utf-8'
}

// readFile自作関数
const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log('Error reading the file/エラー　ファイルを読み込めません');
        }
        res.end(data);
    });
};

// getとpostで経路を登録する
router.get('/', (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end('INDEX/目次');
});

router.get('/index.html', (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    customReadFile('views/index.html', res);
});

router.post('/', (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end('POSTED/投稿');
});

// 全てのリクエストをtouter.jsを通じて処理する
http.createServer(router.handle).listen(port);
console.log(`サーバが起動してポート ${port} を監視しています`);
