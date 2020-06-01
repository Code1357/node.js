'use strict';

// DBのモデルモジュールをインポート
const Subscriber = require('../models/subscriber');

// データを次のミドルウェア関数に渡すため、getAllSubscribersをエクスポートする
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
};

// contactページをレタリング するアクション
exports.getSubscriptionPage = (req, res) => {
  res.render('contact');
};

// 購読者情報を保存するアクションを追加
exports.saveSubscriber =(req, res) => {
  // 新しいSubscriberを作成
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    postalCode: req.body.postalCode
  });
  // 新しいSubscriberを保存
  newSubscriber.save((error, result) => { // resultは変数となり、idが戻り値として入る。
    if(error)res.send(error);
    res.render('thanks');
  });
};