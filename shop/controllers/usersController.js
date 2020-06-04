'use strict';

// ユーザーモデルのロード
const User = require('../models/user');

module.exports = {
  index: (req, res) => {
    User.find({})
      // インデックスページにユーザー配列をレダリング
      .then(users => {
        res.render('users/index', {
          users: users
        });
      })
      // エラーならメッセージを出してホームページにリダイレクト
      .chtch(error => {
        console.log(`Error fetching users: ${error.message}`)
        res.redirect('/');
      });
  }
};