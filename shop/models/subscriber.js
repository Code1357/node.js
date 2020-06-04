'use strict';

const mongoose = require('mongoose');

// スキーマ(設計図)のプロパティを設定/バリデータ(プロパティを規制する)
const subscriberSchema = mongoose.Schema({
  name: { // プロパティ
    type: String,
    required: true // 「nameプロパティは必須で型はStringにします」と制約している
  },
  email: {
    type: String,
    required: true,
    lowercase: true, // 大文字と小文字を区別せず、DB保存時に小文字に変換する
    unique: true // 重複防止
  },
  postalCode: {
    type: Number,
    min: [10000000, "番号が短すぎます"],
    max: 9999999
  }
});
 // 購読者のフルネームを取得するインスタンスメソッドを追加(スキーマにインスタンスメソッドを定義できる)
 subscriberSchema.methods.getInfo = function() {
   return `Name: ${this.name} Email: ${this.email} postalCode:${this.postalCode}`
 };

 // 同じpostalコードを持つ購読者を見つけるインスタンスメソッドを追加
 subscriberSchema.methods.findLocalSubscribers = function() {
   return this.model("Subscriber").find({postalCode: this.postalCode}).exec();
 };


// 定義したスキーマをモデルに適用し(設計図名:'Subscriber'),exportする
module.exports = mongoose.model('Subscriber', subscriberSchema); 
// 上記は、const Subscriber = mongoose.model('Subscriber', subscriberSchema);
// 'Subscriber'(モデル名), subscriberSchema(スキーマ名)

//　さsだ