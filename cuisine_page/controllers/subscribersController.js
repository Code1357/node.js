'use strict';

// DBのモデルモジュールをインポート
const Subscriber = require('../models/subscriber');

/* // データを次のミドルウェア関数に渡すため、getAllSubscribersをエクスポートする
exports.getAllSubscribers = (req, res, next) => {
  // findによって、Subscriberモデルに対するクリエを発行
  Subscriber.find( {}, (error, subscribers) => {  // 引数なしのfind({})は空のオブジェクトと同じ,条件をつけないために空にしている

    // エラーは次のミドルウェア関数に渡す
    if(error) next(error);
    // MongoDBから返されたデータをrequestオブジェクトに設定する
    req.data = subscribers;
    // 次のミドルウェア関数に進む
    next();
  });
}; ｰ> 下記に書き直し*/

// getAllSubscribersの書き直し/ん？ES6タイプに記述し直しただけ？
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({}).exec() // これがfindクエリからのプロミスを返す
    // 保存したデータが次のthenブロックに送られる
    .then((subscribers) => { //Promise.thenというところをチェーンにして記述,ここからプロミス
      // データベースからの結果を保存する
      res.render('subscribers', {
        subscribers: subscribers
      });
    })
    // プロミスを破ったエラーをキャッチする
    .catch((error) => {
      console.log(error.massage);
      return []; // return [] リストを返す？
    })
    // ロングメッセージでプロミスの連鎖を終える
    .then(() => {
      console.log('promise complete')
    });
};

// contactページをレタリング するアクション
exports.getSubscriptionPage = (req, res) => {
  res.render('contact');
};

// 購読者情報を保存するアクションを追加
exports.saveSubscriber = (req, res) => {
  // 新しいSubscriberを作成
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    postalCode: req.body.postalCode
  });
  // 新しいSubscriberを保存
  /*   newSubscriber.save((error, result) => { // resultは変数となり、idが戻り値として入る。
      if(error)res.send(error);
      res.render('thanks');
    });　-> 下記に書きおなし */

  // saveSubscriberの書き直し/ん？ES6タイプに記述し直しただけ？
  newSubscriber.save()　// save():mongooseのクエリメソッド
    .then(result => { // プロミスを記述
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