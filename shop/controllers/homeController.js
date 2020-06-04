'use strict';

// 個別の経路2
exports.showCourses = (req, res) => {
  res.render('courses', { // coureses.ejsをレス
    offeredCourses: courses // オブジェクトを代入してからejsへ反映
  });
};

// コースの配列お定義
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