'use strict';

// DBのモデルモジュールをインポート
const Subscriber = require('../models/subscriber');

// オブジェクトリテラルでモジュールをまとめる
module.exports = {
  index: (req, res) => {
    Subscriber.find({})
      // インデックスページにユーザー配列をレダリング
      .then(subscribers => {
        res.render('subscribers/index', {
          subscribers: subscribers
        });
      })
      // エラーならメッセージを出してホームページにリダイレクト
      .chtch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        res.redirect('/');
      });
  },
  // contactページをレタリング(表示させる)する
  getSubscriptionPage: (req, res) => {
    res.render('contact');
  },
  // 購読者情報をDBに保存する
  saveSubscriber: (req, res) => {
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
  }
}

/*
上記の説明:コールバックのみでコードを実装していくと、入れ子が深くなっていく(コールバックヘルという)
解消するためにPromiseを使って、コードを短くするよう工夫する
*/



// indexアクションと置き換えしたコード
// すべての顧客情報を取り出す
/* getAllSubscribers = (req, res) => {
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
}, */