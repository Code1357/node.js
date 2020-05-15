'use strict'
// メッセージを配列でリストにする
let messages = [
  'はじめまして！',
    'こんにちわ！',
      '大好きだよ！'
      ]
messages.forEach(message => console.log(message));
messages.forEach((message) => {console.log(message)});