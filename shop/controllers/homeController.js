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
  showCourses: (req, res) => {
    res.render('courses', { // coureses.ejsをレス
      offeredCourses: courses // オブジェクトを代入してからejsへ反映
    });
  }
};