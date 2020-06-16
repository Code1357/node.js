'use strict';

module.exports = {
  getSubscriptionPage: (req, res) => { // 2
    res.render('contact');
  },
  index: (req, res) => { // 1
    res.render('index');
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  chat: (req, res) => {
    res.render('chat');//chat.ejsを表示
  }
};