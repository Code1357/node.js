'use strict';

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    // 以下は、チャットの内容となるスキーマ
    content: { // チャット本文
      type: String,
      required: true
    },
    userName: { // ユーザー名
      type: String,
      required: true
    },
    user: { // ユーザーID
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true } // タイムスタンプ
);
module.exports = mongoose.model("Message", messageSchema);
