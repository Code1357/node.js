'use strict'
// zipコードを取得する,zipコード：アメリカ合衆国の郵便番号制度
// citiesパッケージをインポート
// require('cities'),パスを指定しなくても、citiesディレクトリに直接アクセスできる
const cities = require('cities')
// zip_lookupメソッドを使い、結果をmyCityに代入,zip_lookupはapp.jsで別に定義されたメソッド（exportsされている）
let myCity = cities.zip_lookup('10016');
// 結果をコンソールに出力
console.log(myCity);