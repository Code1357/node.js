'use strict'

const httpStatus = require('http-status-codes');

module.exports = {
  // ????
  logErrors: (error, req, res, next) => {
    console.error(error.stack);
    next(error);
  },
  // リクエストページが存在しない場合のエラーに対処
  respondNoResourceFound: (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | ページは存在しません`); //res.render('error'); // error.ejsでエラー表示する方法もある
  },
  // サーバ内部のエラーに対処
  respondInternalError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERRORが発生: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | 申し訳ございません。内部で不具合が起きました。復旧まで今しばらくお待ちください。`);
  }
};


// res.status(), 参考：http://expressjs.com/ja/api.html#res.status
// error.stack, 参照：https://nodejs.org/api/errors.html#errors_error_stack