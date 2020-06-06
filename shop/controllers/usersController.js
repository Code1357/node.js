'use strict';

const User = require('../models/user');

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      // エラーならメッセージを出してホームにリダイレクト
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render('users/index');
  },
  // フォームを表示させるアクション
  new: (req, res) => {
    res.render('users/new');
  },
  // ユーザの登録内容をDBに保存するために情報を作るアクション
  // new.ejsから受け取ったデータを次のミドルウエア関数のredirectViewに渡す
  create: (res, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,　// .firstはejsで設定したname属性
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    // 上記変数createをUserモデルで受け取る
    User.create(userParams) // Userモデル
      .then(user => {
        res.locals.redirect = '/users'; // redirect:ページの転送
        res.locals.user = user; // この行のコード???  // localsも???
        next(); // next???
      })
      .catch(error => {
        console.log(`Error ユーザの情報は保存できませんでした ${error.message}`);
        next(error);
      });
  },
  // ビューの表示は、redirectViewアクションで別に行う(createアクションから引き継ぐ)
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  }
};