// Node.jsのコアモジュールを使ってテストする
"use strict";

const assert = require("assert"); // assertモジュール読み込み

// テスト仕様で指定された関数を実装する
let add = ((x, y) => {
  return x + y;
})(4, 5);

// アサートテストを記述
assert.strictEqual(add, 8, "間違ってます！");



/* assert.strictEqual(actual, expected[, message])
同値比較によって決定された実際のパラメータと期待されるパラメータの間の厳密な平等性をテストします。
*/

/* assert.notStrictEqual(actual, expected[, message])
同値比較によって決定された実際のパラメータと期待されるパラメータの間の厳密な不等式をテストします。
*/