'use strict';

// 分割代入している
const mongoose = require('mongoose'),
{Scema} = mongoose,


// ユーザーのスキーマを作る
const userSchema = new userSchema({
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
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  // ユーザーを購読者に繋げるsubscribedAccountを追加
  subscribedAccount: {type: Schema.Types.ObjectId, ref: 'Subscriber'}
},{
  // createdAtとupdatedAtの日時を記録するタイムスタンププロパティを追加
  timestamps: true
});