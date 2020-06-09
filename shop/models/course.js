'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose'); //  ?
const courseSchema = new Schema({
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
  maxStudents: { // 最大学生数？
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
);

module.exports = mongoose.model('Course', courseSchema);





