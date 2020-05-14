'use strict'
// // exports_01.jsを呼び出して実行
const test_01 = require('./exports_01');
console.log(test_01);

// exports_01.jsの関数aを呼び出して、出力
let myTest = test_01.a
console.log(myTest);

// exports_01.jsの関数cを呼び出して、実行、出力
let myTest_02 = test_01.c();
console.log(myTest_02);

// // exports_01.jsの関数dを呼び出して、実行
test_01.d();