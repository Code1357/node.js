// ここからチャットのsocket接続を管理する
'use strict';

const { on } = require("../models/user");
const nodemon = require("nodemon");

// ソケットを接続するための処理
module.exports = io => {
  io.on('connection', client => { // 新規ユーザーの接続を監視, connction(node.js)イベント,新しいTCPストリームが確立された時に発生する,クライアントがソケットチャンネルに接続した事を示す。
console.log('新規接続');  

client.on('disconnect', () => { // ユーザーの切断を監視,disconnect(node.js)イベント,切断のイベント
  console.log('ユーザーは切断しました');
});

client.on("message", () => { // 作成されるメッセージのイベントを監視, messeage(node.js)イベント,もしmessage受信したら
  io.emit("message", { // emit
    content: "Hello"
  });
});
});
};
