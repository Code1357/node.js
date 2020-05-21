/* 
参考：https://www.sejuku.net/blog/,
exports.プロパティ名 = 値
個別単位のモジュールを作成できる
読み込み方：例)ファイル名：sample.js
  const sample = require('./sample');
  console.log(sample.プロパティ名);

module.exports.プロパティ名 = 値
個別もしくは、ファイル単位でモジュールを作成できる
読み込み方：例)ファイル名：sample.js
  const sample = require('./sample');
  console.log(sample);

  例2）下記のモジュールの場合の読み込み
    module.exports = {
      html: {
      'Content-Type': 'text/html; charset=utf-8'
      };
      onst sample = require('./sample');
      console.log(sample.html);

違い：
一般的にはexportsではなくmodule.exportsを使ってモジュール化する
exports = では、exports.プロパティ名と記述しないとモジュールとして使えない
module.exports = では、プロパティ名を省いても、モジュールとして使用できる

※ モジュールの中身のプロパティ名や関数名は把握が必要
*/


/*
Content-Type：例
  'Content-Type': 'text/js' => textに分類される、jsファイルを意味する

参考：https://wa3.i-3-i.info/word15787.html
参考：https://qiita.com/AkihiroTakamura/items/b93fbe511465f52bffaa
*/


/*
参考：https://wa3.i-3-i.info/word15398.html
マップする：アレとコレを関連づけるという意味
*/


/*
fs.readFile(path[, options], callback)
参考：Node.js-リファレンス


/*
response.writeHead(statusCode[, statusMessage][, headers])
response.write(chunk[, encoding][, callback])
response.end([data[, encoding]][, callback])
参考：Node.js-リファレンス

res.writeHead():情報の書き出し
res.write()：bodyへ直接書き出し(画面表示させる）
res.end()：レスポンスしたいもの(画面表示したいもの)で閉める
*/


/*

*/