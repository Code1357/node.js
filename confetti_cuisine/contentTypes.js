'use strict';

// 関連づける（エクスポートする)ContentTypeのオブジェクトを作成

module.exports = { // 参考：sub.js
html: {
  'Content-Type': 'text/html; charset=utf-8' // 参考：sub.js
},
text: {
  'Content-Type': 'text/plain; charset=utf-8'
},
js: {
  'Content-Type': 'text/js'
},
jpg: {
  'Content-Type': 'image/jpg'
},
png: {
  'Content-Type': 'image/png'
},
css: {
  'Content-Type': 'text/css'
}
  };