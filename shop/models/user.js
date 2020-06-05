'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose; // オブジェクトの分割代入(どういう事？)

// ユーザーのスキーマを作る
const userSchema = new Schema(
  {
    // ファーストネームとラストネームのプロパティ
    name: {
      first: {
        type: String,
        trim: true // trim()を呼び出すか否か
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, '桁数が足りません'],
      max: 99999
    },
    // パスワードのプロパティを追加
    password: {
      type: String,
      required: true
    },
    // ユーザーをコースに繋げるコールプロパティを追加
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // ユーザーを購読者に繋げるsubscribedAccountを追加
    subscribedAccount: { type: Schema.Types.ObjectId, ref: 'Subscriber' }
  },
  {
    // createdAtとupdatedAtの日時を記録するタイムスタンププロパティを追加
    timestamps: true
  }
);

// ユーザーのフルネームを取得する仮想属性を追加,DBに保存はしないが、取得したり設定したりできる('fullName'にする)
userSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model('User', userSchema)

