'use strict';

// コースの配列の定義
const courses = [
  {
    title: 'ホールケーキ',
    cost: 50
  },
  {
    title: 'カットケーキ',
    cost: 25
  },
  {
    title: 'ジュース',
    cost: 10
  }
];


// 経路のコントロール(オブジェクトリテラルでexportsする),モジュールが増えてくると収集がつかなくなる為

module.exports = {
  // contactページをレタリング(表示させる)する
  getSubscriptionPage: (req, res) => {
    res.render('contact');
  },
  showCourses: (req, res) => {
    res.render('courses', { // coureses.ejsをレス
      offeredCourses: courses // オブジェクトを代入してからejsへ反映
    });
  },
  index: (req, res) => {
    res.render('index');
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};