'use strict';

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  // コースのスキーマにプロパティを追加
  title: {
    typw: String,
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
    min: [10000, '桁数が足りません'],
    max: 99999
  }
});

module.exports = mongoose.model('Course', courseSchema);





