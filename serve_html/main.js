const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs'); // fsモジュールをインポート(Node.jsのコアモジュール)

// HTMLファイルの経路を設定
const routeMap = {
    "/":"views/index.html"
};