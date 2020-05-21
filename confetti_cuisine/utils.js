// getFile(関数)に必要なモジュールをインポート
const fs = require('fs');
const httpStatus = require('http-status-codes');
const contentTypes = require('./contentTypes');

// ファイルを読み込み、レスポンス(反応)を返すgetFile(関数)を、オブジェクト内に作成(エクスポートする)
module.exports = {
  getFile: (file, res) => {
    fs.readFile(`./${file}`, (error, data) => { // ファイル読み込み, ./${file}：変数(パス)であり引数
      if (error) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html); // ステータスコード500,server error
        res.end('There was an error serving content! / コンテンツの提供にエラーが発生しました');
      }
      res.end(data); // ifに該当してもしなくてもdataを返す
    });
  }
};
