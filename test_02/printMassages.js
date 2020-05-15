'use strict'
// ローカルモジュールのmessages.jsを要求する(require),('./messages')はファイルパス,const messageModuleは変数,インポートの際、('./messages')でも('./messages.js')でも良い
const messageModule = require('./messages');
// その配列を、messageModule.messagesとして参照する,messagesは、exportsの変数名
// つまり、messagesの中には、下記がある
/*
  messages = [
  'はじめまして！',
  'こんにちわ！',
  '大好きだよ！'
]
*/
messageModule.messages.forEach(m => console.log(m));

// 結果を確認するためには、consoleで『node messages.js』を記述。exportできている事を確認できる。