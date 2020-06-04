'use strict'

const httpStatus = require('http-status-codes');

// オブジェクトリテラルでモジュールをまとめる
module.exports = {
  // これまで対処しなかったリクエストの全てに対処する
  pageNotFoundError: (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode); // 参照：http://expressjs.com/ja/api.html#res.status
    res.render('error'); // error.ejsでエラー表示
  },
  // サーバー内部のエラーに対処する(万が一の時に親しみあるサイトにするため)
  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`); // 参照：https://nodejs.org/api/errors.html#errors_error_stack
    res.status(errorCode);
    res.send(`${errorCode} | ごめんなさい。内部で不具合が起きました。復旧まで今しばらくお待ちください。`);
  }
};