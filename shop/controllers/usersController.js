'use strict';

// ユーザーモデルのロード
const User = require('../models/user');

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      // エラーならメッセージを出してホームページにリダイレクト
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render('users/index');
  }
};

// res.locals