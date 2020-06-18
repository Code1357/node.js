'use strict';

const mongoose = require('mongoose');
// mongooseの中にあるオブジェクトSchemaを、同じ名前定数Schemaにインポートした上で、代入している
/* const { Schema } = require('mongoose'); */

const courseSchema = new mongoose.Schema({
    // コースのスキーマにプロパティを追加
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    items: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
});
    /* maxStudents: { // 最大学生数？
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative number of students"] // デフォルトは0で、負の数は持てない
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, "コースは、コスト設定にマイナスを設定できません"]
    }
  },
  {
    timestamps: true
  }
); */

module.exports = mongoose.model('Course', courseSchema);





