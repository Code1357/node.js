// ここからチャットのsocket接続を管理する
'use strict';

const Message = require('../models/message');

// ソケットを接続するための処理
module.exports = io => {
  io.on('connection', client => { // 新規ユーザーの接続を監視, connction(node.js)イベント,新しいTCPストリームが確立された時に発生する,クライアントがソケットチャンネルに接続した事を示す。
    console.log('新規接続');

    // DBに保存されているデータを制限をつけてロードする
    Message.find({}) // このスキーマの中を探し出す
    .sort({createdAt: -1 }) // sort(並べ方を決める),createdAt(日付順),-1(降順)
    .limit(10) // 最大数は10
    .then(messages => {
      client.emit("load all messages", messages.reverse()); // load all messages(カスタムイベント),messageの配列を逆にする.revers(js),自作のイベント
    });

    client.on('disconnect', () => { // ユーザーの切断を監視,disconnect(node.js)イベント,切断のイベント
      console.log('ユーザーは切断しました');
    });

    // 決まったメッセージではなく、データを送信するように変更
    client.on("message", data => { // データをmessageイベントの内容として送信
      let messageAttributes = { // 受け取ったデータを全て集める
        content: data.content,
        userName: data.userName,
        user: data.userId
      };
      let m = new Message(messageAttributes); // 設計したスキーマに該当一致するtypeの内容で
      m.save() // 変数mを保存
      .then(() => { // 保存に成功したら値を送信
        io.emit("message", messageAttributes);
      })
      .catch(error => console.log(`chat Error:${error.message}`));
    });


    /* client.on("message", () => { // 作成されるメッセージのイベントを監視, messeage(node.js)イベント,もしmessage受信したら
      io.emit("message", { // emitメソッドで任意のテキストを接続している全部のクライアントに送信する
        content: "Hello" // content,recipeApp.jsで設定
      });
    }); */
  });
};
