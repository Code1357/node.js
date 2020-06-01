'use strict';

// DBのスキーマとモデルを格納するファイル

/*
mongoose(パッケージ)を使った操作
// 参考：
https://mongoosejs.com
https://mongoosejs.com/docs/connections.html
https://mongoosejs.com/docs/schematypes.html
https://mongoosejs.com/docs/guide.html
https://mongoosejs.com/docs/models.html
*/

const mongoose = require('mongoose');

// mongoose.Schemaを使って新しいスキーマを作る,スキーマ:クラスのようなイメージで設計図となる部分
const subscriberSchema = mongoose.Schema({
  name: String, // プロパティ: データ型
  email: String,
  zipCode: Number
});

// 定義したスキーマをモデルに適用する(設計図名:'Subscriber')
// Subscriberモデルだけをモジュールとしてエクスポートする
module.exports = mongoose.model('Subscriber', subscriberSchema); 
// 上記は、const Subscriber = mongoose.model('Subscriber', subscriberSchema);  ,  'Subscriber' モデル名, subscriberSchema スキーマ名をモデル名に代入する