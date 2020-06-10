'use strict';

const Subscriber = require('../models/subscriber');

// カスタム関数を作って、リクエストから購読者のデータを取り出す
// 参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt
const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode) // 文字列->整数へ変換
  };
};

module.exports = {
  index: (req, res, next) => { // indexアクション：購読者全員のドキュメントを探し出す
    Subscriber.find()
      // インデックスページにユーザー配列を表示させる
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  // 購読者情報をDBに保存する
  /* saveSubscriber: (req, res) => {
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });
    // 新しいSubscriberを保存
    newSubscriber
      .save()　// save():mongooseのクエリメソッド
      .then(() => { // ここからプロミス
        res.render("thanks");
      })
      .catch(error => {
        if (error) res.send(error);
      });
  }, */
  new: (req, res) => {
    res.render("subscribers/new");
  },
  create: (req, res, next) => { // createアクション：新規購読者作成
    let subscriberParams = getSubscriberParams(req.body);
    /*  {
       name: req.body.name,
       email: req.body.email,
       zipCode: req.body.zipCode
     }; */
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => { //showアクション：購読者のデータを表示する
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  edit: (req, res, next) => { // editアクション：購読者データの編集を行う
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => { // updateアクション：既存購読者のドキュメントの値を更新する
    let subscriberId = req.params.id;
    let subscriberParams = getSubscriberParams(req.body);
    /* {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    }; */

    Subscriber.findByIdAndUpdate(subscriberId, { // 既存の購読者を探す
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => { // deleteアクション：購読者のドキュメントを削除
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }
};


// find()だとドキュメンよ前検索/find({})だと、{}の中に検索したいものを指定し検索する,参考：https://mongoosejs.com/docs/api.html#model_Model.find