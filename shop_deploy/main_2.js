/* // ひとまず、しわ寄せ部屋

// リクエストのパスに応じて対応する経路???
router.get('/courses', homeController.showCourses);

// Errorの経路???
router.use(errorControllers.pageNotFoundError);
router.use(errorControllers.internalServerError);


// コースの配列の定義
const courses = [
  {
    title: 'ホールケーキ',
    cost: 50
  },
  {
    title: 'カットケーキ',
    cost: 25
  },
  {
    title: 'ジュース',
    cost: 10
  }
]

const showCourses =  (req, res) => {
  res.render('courses', { // coureses.ejsをレス
    offeredCourses: courses // オブジェクトを代入してからejsへ反映
  });}


  /*
上記の説明:コールバックのみでコードを実装していくと、入れ子が深くなっていく(コールバックヘルという)
解消するためにPromiseを使って、コードを短くするよう工夫する
*/

// indexアクションと置き換えしたコード
// すべての顧客情報を取り出す
/* getAllSubscribers = (req, res) => {
  Subscriber.find({}).exec() // findクエリ
    .then((subscribers) => { // ここからプロミス
      // データベースからの結果を受け取る
      res.render('subscribers', {// subscribers.ejsを表示
        subscribers: subscribers // プロパティ: ドキュメント(ejsへ渡せる部分)
      });
    })
    // エラーをキャッチする
    .catch((error) => {
      console.log(error.massage);
      return [];
    })
    // ロングメッセージでプロミスの連鎖を終える
    .then(() => {
      console.log('プロミス完了');
    });
}, */


/* 
<form action="/subscribe" method="post">
<label for="name">名前</label>
  <input type="text" name="name" placeholder="Name">
  <label for="email">Email</label>
  <input type="text" name="email" placeholder="Email">
  <label for="zipCode">ZipCode</label>
  <input type="text" name="zipCode" placeholder="zipCode" ><label for="zipCode">ハイフンなし,半角数字</label>
  <input type="submit" name="submit">
</form>

 */



validator

// validate関数(ミドルウェアでの新規登録時のチェックを増やす)
validate: (req, res, next) => {
  // あらかじめ決めた規則に置き換える(Sanitizers)
  body("email") // emmailフィールドをサニタイズしますよ宣言,sanitize(fields)と一緒
    .normalizeEmail({ // express-validatorのnormalizeEmailメソッド
      all_lowercase: true // @マーク前を小文字に変換する
    })
    .trim(); // express-validatorのtrimメソッド,左右両側の空白を除去する
  // あらかじめ決めた規則を守れているかチェックする(Validators)
  check("email", "メールが無効です") // checkでフィールドを検証する
    .isEmail(); // 文字列がメールがどうかチェック
  check("zipCode", "郵便番号が無効です")
    .notEmpty() // 値が空でないかどうかをチェック
    .isInt() // 文字列が整数であるかどうかをチェック
    .isLength({ // 文字列の長さが範囲内であるかをチェック
      min: 5,
      max: 5
    })
    .equals(req.body.zipCode); // 文字列かどうかチェック???
  check("password", "パスワードを空にする事はできません").notEmpty();
  (req, res) => {
    validationResult(req).then(error => { // ValidationResult(検証エラーを抽出して結果をオブジェクトで利用できるようにする,これまでの検証結果を集めてエラー結果に基づいていてアクション実施)
      if (!error.isEmpty()) { // もしエラーであれば、
        let messages = error.array().map(e => e.msg);
        req.skip = true; // create処理をスキップするかもしれないためのカスタム設定
        req.flash("error", messages.join(" and ")); // フラッシュメッセージをandで連結して表示
        res.locals.redirect = "/users/new"; // 新規登録画面に(戻される)転送
        next();
      } else {
        next(); // そうでなければ、createのミドルウェア関数を実行の流れ
      }
    });
  }
}



// router.use(expressValidator()); // express-validatorをExpressのミドルウェアで使用する,「express.json」と「express.urlencode」の導入後に記述する必要がある(リクエストの本体を検証の前に解析しておく必要があるため)+++はたして必要なのか？？？？


const expressValidator = require('express-validator');

router.use(expressValidator());
// express-validatorをExpressのミドルウェアで使用する,「express.json」と「express.urlencode」の導入後に記述する必要がある(リクエストの本体を検証の前に解析しておく必要があるため)+++はたして必要なのか？？？？


 * /