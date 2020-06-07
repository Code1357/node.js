'use strict';

const mongoose = require('mongoose');
// オブジェクトの分割代入, 参照：https://mongoosejs.com/docs/guide.html
const { Schema } = mongoose;
const Subscriber = require('./subscriber');
// ユーザーのスキーマを作る
const userSchema = new Schema(
  {
    // ファーストネームとラストネームのプロパティ
    name: {
      first: {
        type: String,
        trim: true // trim()を呼び出すか否か(前後空白の削除の可否)
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
      min: [10000, '桁数が足りません'],
      max: 99999
    },
    // パスワードのプロパティを追加
    password: {
      type: String,
      required: true
    },
    // ユーザーをコースに繋げるコールプロパティを追加([]で配列にしている)
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // ユーザを購読者に繋るsubscribedAccountを追加
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

userSchema.pre("save", function(next) { // pre:saveを実行する前,の意味
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema)



// { type: Schema.Types.ObjectId, ref: 'モデル名' }　,　RDBの外部キーのようなもの