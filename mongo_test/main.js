'use strict';

/*
参考：
http://mongodb.github.io/node-mongodb-native/3.5/tutorials/connect/
https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
https://nodejs.org/dist/latest-v14.x/docs/api/all.html#assert_assert
*/

// MongoDBモジュール,MongoClient:新しいインスタンスを作成
const MongoClient = require('mongodb').MongoClient;
// Node.jsのモジュール,error発生の確認するため
const assert = require('assert').strict; // Node.jsの厳密モード
// DBの接続先URL設定
const dbUrl = 'mongodb://localhost:27017';
// DBの名前
const dbName = 'recipe_db';
// MongoClientの新規作成
const client = new MongoClient(dbUrl);

// サーバ接続
client.connect((error) => { // connect:指定のURLを使いMDBに接続
  assert.strictEqual(null, error); // assert.strictEqual:パラメータの間の厳密な平等性をテスト実施
  console.log('サーバーに接続できました');
  const db = client.db(dbName);

  // 新しいデータを追加
  db.collection('contacts').insert({
    name: 'ちょこ',
    email: 'choko_test@gmail.com'
  }, (error, db) => {
    if (error) throw error;
    console.log(db);
  });

  // データ(レコード)の取得
  // // find(),jsの関数と違う。MongoDBでは一致が得られない時に空の配列を返す
  db.collection('contacts').find().toArray((error, document) => {
    assert.strictEqual(null, error);
    console.log(document);
  });

  // 接続解除
   client.close(() => { // close(callback):接続を閉じ,オプションのコールバックを呼び出す
    console.log('接続終了');
  });
});
