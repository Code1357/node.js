'use strict';

// 個別の経路
exports.showCoures = (req, res) => {
  res.render('courses'); // courses.ejsをレス
};

exports.showSignUp = (req, res) => {
  res.render('contact'); // contact.ejsをレス
};

exports.postedSignUpFrom = (req, res) => {
  res.render('thanks'); // thanks.ejsをレス
};

// コースの配列お定義
const courses = [
  {
    titel: 'Event Driven Cakes',
    cost: 50
  },
  {
    titel: 'Asynchronous Artichoke',
    cost: 25
  },
  {
    titel: 'Object Oriented Oreange Juice',
    cost: 10
  }
];

exports.showCourses = (req, res) => {
  res.render('courses', { // coureses.ejsをレス
    offeredCourses: courses // オブジェクトを代入してからejsへ反映
  });
};

/* offeredCourses.forEach(courese => {
  courese.titel
  courese.cost
}); */