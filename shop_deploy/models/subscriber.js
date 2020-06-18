'use strict';

const mongoose = require('mongoose');
// スキーマ(設計図)のプロパティを設定/バリデータ(プロパティを規制する)
// ①const { Schema } = mongoose;を消して、const subscriberSchema = new mongoose.Schema({ でも良い。
/* const { Schema } = mongoose; */
const subscriberSchema = new mongoose.Schema({
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
  zipCode: {
    type: Number,
    min: [10000, '桁数が足りません'],
    max: 99999,
    unique: true
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});
  // ①の設定であればmongoose必要。courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
  /* courses: [{ type: Schema.Types.ObjectId, ref: 'Course' },]  */// Courseモデルを参照,ref:リレーションを表現できる,[]参照配列
/* },
  {
    timestamps: true
  }
); */


// 購読者のフルネームを取得するインスタンスメソッドを追加
// インスタンスメソッド(Schema内で使うメソッド)
subscriberSchema.methods.getInfo = function () { // getInfo：メソッド名をつけてるだけ(このスキーマ内で、getinfoメソッドを設定する),class GetInfo {}...みたいな感じ
  return `Name: ${this.name} Email: ${this.email} ZipCode: ${this.zipCode}`; // this,自分の(sbscriberSchemaの)
};

subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();
};

// 定義したスキーマをモデルに適用し(設計図名:'Subscriber'),exportする
module.exports = mongoose.model('Subscriber', subscriberSchema);
// 上記は、const Subscriber = mongoose.model('Subscriber', subscriberSchema);
// 'Subscriber'(モデル名), subscriberSchema(スキーマ名)