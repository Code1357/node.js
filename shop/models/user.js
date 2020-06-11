'use strict';

const mongoose = require('mongoose');
// オブジェクトの分割代入, 参照：https://mongoosejs.com/docs/guide.html
const { Schema } = mongoose;
const Subscriber = require('./subscriber');
const { NETWORK_AUTHENTICATION_REQUIRED, REQUEST_URI_TOO_LONG } = require('http-status-codes');
// ユーザーのスキーマを作る
const userSchema = new Schema(
  {
    // ファーストネームとラストネームのプロパティ(属性を加える)
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
      required: true// パスワード必須
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
// 仮想属性のおかげで、バラバラに入力したものを１つにまとめて出力する事ができる
userSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// pre(mongooseのメソッドでフックという):saveを実行する前,の意味(ユーザーの作成と保存の直前に実行される)つまり、実行タイミングを制御してるって事？,参考：https://mongoosejs.com/docs/middleware.html#pre
// pre,データベースに保存する直前に実行となる
userSchema.pre("save", function (next) {
  let user = this; // 登録しようとしてる情報(console.logで確認できる)
  // 既に購読者との関連があるのかをチェック
  if (user.subscribedAccount === undefined) { // user.subscribedAccountに一致するemail情報が無ければ（あってるか不明？？？）
    // 購読者一人を探すクエリ
    Subscriber.findOne({ // Subscriberモデルの、DB,subscriberの中に
      email: user.email // 登録しようとしているuserのemailと
    })
      .then(subscriber => { // 一致していたら
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        //　エラーがあれば次のミドルウェア関すに渡す
        next(error);
      });
  } else {
    // ユーザーに既存の関連がれば次の関すを呼び出す
    next();
  }
});

// ユーザースキーマにpreフックを追加(ミドルウェア)
userSchema.pre('save', function(next) {
  let user = this;
  // ユーザーのパスワードにハッシュをかける
  // 参考:https://www.npmjs.com/package/bcrypt
  bcrypt.hash(user.password, 10).then(hash => { // bcrypt.hash(),ハッシュ化
    user.password = hash; // ハッシュ化されたものを格納する,this文脈が失われるのでハッシュ関数からアクセスできるように変数に保存している
    next(); // nextを呼び出して、該当するユーザがDBに保存される
  })
  .catch(error => {
    console.log(`パスワードのハッシュ化でエラー発生： ${error.message}`);
    next(error);
  })
});

// ハッシュをかけたpスワード2つを比較する関数を定義(インスタンスメソッド？/passwordComparisonは、関数名)
// 参考:https://www.npmjs.com/package/bcrypt
userSchema.methods.passwordComparison = function(inputPassword) {
  let user = this;
  // ユーザーのパスワードと保存されているパスワードを比較する
  return bcrypt.compare(inputPassword, user.password); // チェック(入力Pass === user.password,ハッシュ化されたPass)
};

module.exports = mongoose.model('User', userSchema)



// { type: Schema.Types.ObjectId, ref: 'モデル名' }　,　RDBの外部キーのようなもの