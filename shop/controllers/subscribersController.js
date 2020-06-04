'use strict';

// DBのモデルモジュールをインポート
const Subscriber = require('../models/subscriber');

// すべての顧客情報を取り出す
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({}).exec() // findクエリ
    .then((subscribers) => { // ここからプロミス
      // データベースからの結果を受け取る
      res.render('subscribers', {// subscribers.ejsを表示
        subscribers: subscribers // プロパティ: ドキュメント(ejsへ渡せる部分)
      });
    })
    // エラーをキャッチする
    .catch((error) => {
      console.log(error.massage);
      return [];
    })
    // ロングメッセージでプロミスの連鎖を終える
    .then(() => {
      console.log('プロミス完了');
    });
};

// contactページをレタリング(表示させる)する
exports.getSubscriptionPage = (req, res) => {
  res.render('contact');
};

// 購読者情報をDBに保存する
exports.saveSubscriber = (req, res) => {
  // インスタンス化
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    postalCode: req.body.postalCode
  });
  // 新しいSubscriberを保存
  newSubscriber.save()　// save():mongooseのクエリメソッド
    .then(() => { // ここからプロミス
      res.render('thanks');
    })
    .catch(error => {
      if (error) res.send(error);
    });
}; 


/*
上記の説明:コールバックのみでコードを実装していくと、入れ子が深くなっていく(コールバックヘルという)
解消するためにPromiseを使って、コードを短くするよう工夫する
*/