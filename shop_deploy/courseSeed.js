// デプロイした後の別のアプリを追加したい場合、seedを作成する
// 既存のシードファイルと名前が衝突しないようする必要あり

"use strict";

const mongoose = require("mongoose");
const Course = require("./models/course"); // データをシーディングするためにモデルを読み込む
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
Course.remove({}) // 既存のドキュメント を全て削除して、
  .then(() => {
    return Course.create({ // 新しいDBドキュメント を作成するコードを実行
      title: "Beets sitting at home",
      description: "Seasonal beets from the guy down the street.",
      zipCode: 12323,
      items: ["beets"]
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Barley even listening",
      description: "Organic wheats and barleys for bread, soup, and fun!",
      zipCode: 20325,
      items: ["barley", "rye", "wheat"]
    });
  })
  .then(course => console.log(course.title))
  .then(() => {
    return Course.create({
      title: "Peaching to the choir",
      description: "Get fresh peaches from the local farm.",
      zipCode: 10065,
      items: ["peaches", "plums"]
    });
  })
  .then(course => console.log(course.title))
  .catch(error => console.log(error.message))
  .then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });
