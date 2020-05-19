'use strict';

const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');

// fsモジュールをインポート(Node.jsのコアモジュール)
const fs = require('fs'); // 様々なファイル操作のメソッドが使えるようになる

// エラー処理関数を作成/以下コードの内容では、該当しない場合は、このエラー関数をresする複線を貼っている
const sendErrorResponse = (res) => {
    res.writeHead(httpStatus.NOT_FOUND, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.write('<h1>File Not Found/ファイルはありません</h1>');
    res.end();
};

// リクエストされた名前のファイルを探す関数(コードを避けるための自作関数)
const costomReadFile = (file_path, res) => {
    if (fs.existsSync(file_path)) { // existsSync:存在するか確認
        fs.readFile(file_path, (error, data) => {　//　readFile：ファイルを読み込む,リファレンスを参考にすること
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};

const server = http.createServer((req, res) => {

    // リクエストのURLをurl変数に保存
    let url = req.url;

    // URLにファイル拡張子が含まれているかチェック
    // url.indexOf():リクエストurlの中(url文字列中)の.htmlを検索, indexOf()文字列検索で見つからない場合-1が返される
    // つまり.htmlがurlに含まれていると-1 以外なので、例)5と-1は等しくない(true)となる。.htmlが含まれないと-1が返り-1は等しくない(false)となり、次へ流れる。
    if (url.indexOf('.html') !== -1) {
        res.writeHead(httpStatus.OK, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        costomReadFile(`./views${url}`, res); // costomReadFile：自作関数
    } else if (url.indexOf('.js') !== -1) {
        res.writeHead(httpStatus.OK, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        costomReadFile(`./public/js${url}`, res);
    } else if (url.indexOf('.css') !== -1) {
        res.writeHead(httpStatus.OK, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        costomReadFile(`./public/css${url}`, res);
    } else if (url.indexOf('.png') !== -1) {
        res.writeHead(httpStatus.OK, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        costomReadFile(`./public/images${url}`, res);
    } else {
        sendErrorResponse(res);
    }
});


server.listen(port);
console.log(`サーバが起動してポート ${port} を監視しています`);