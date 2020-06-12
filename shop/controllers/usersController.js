'use strict';

const User = require('../models/user');
// const expressValidator = require('express-validator');
// const { check, validationResult, body } = require('express-validator');
const passport = require('passport'); // ログイン認証のためにuserControllerで必要


const getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
};

module.exports = {
  index: (req, res, next) => { // 3(DBの中身を検索して表示させる)
    User.find() // find()見つける
      .then(users => {// .then,非同期処理が成功したら進む(users,コレクション名を記述)/usersはDB名と思われる
        res.locals.users = users; // usersをres.locals.usersに代入
        next(); // 次の経路へ
      })
      // エラーならメッセージを出してホームにリダイレクト
      .catch(error => { // .catch,非同期処理が失敗したら進む
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => { // 3.1(index.ejsを表示するだけ)
    res.render('users/index', {
      flashMessages: {　
        success: 'アカウントを作成したぜ！' // フラッシュメッセを設定できる
      }
    });
  },
  // フォームを表示させるアクション
  new: (req, res) => { // 4
    res.render('users/new');
  },
  // ユーザの登録内容をDBに保存するために情報を作るアクション
  // new.ejsから受け取ったデータを次のミドルウエア関数のredirectViewに渡す
  create: (req, res, next) => { // 5
    // if (req.skip) next(); //validateでエラーだった場合、カスタムのre.skipを発動して次のミドルウェア関数を実行する(以下、createの実行を飛ばす)

    let newUser = new User(getUserParams(req.body));
    // 新規ユーザーを登録
    User.register(newUser, req.body.password, (error, user) => { // register(参考：https://www.npmjs.com/package/passport-local-mongoose)
      if (user) { // ユーザーの作成に成功
        req.flash("success", `${user.fullName}のアカウント作成に成功しました`);
        res.locals.redirect = "/users";
        next();
      } else { // ユーザーアカウントの作成はエラーで失敗した
        req.flash("error", `ユーザーアカウントの作成に失敗しました: ${error.message}.`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },

    /* let userParams = getUserParams(req.body);
     {
       name: {
         first: req.body.first,　// .firstはejsで設定したname属性
         last: req.body.last
       },
       email: req.body.email,
       password: req.body.password,
       zipCode: req.body.zipCode
     };

    // 上記変数createをUserモデルで受け取る
    User.create(userParams) // Userモデル
      .then(user => {
        // 成功した事をフラッシュメッセージで知らせる
        req.flash('success', `${user.fullName}のアカウントは無事に作成されました`);
        res.locals.redirect = '/users'; // redirect:ページの転送
        res.locals.user = user; // この行のコード???  // localsも???
        next();
      })
      .catch(error => {
        console.log(`Error ユーザの情報は保存できませんでした ${error.message}`);
        res.locals.redirect = '/users/new'; // 失敗時の転送
        // 失敗時のフラッシュメッセージ
        req.flash(
          'error', `ユーザーアカウントの作成に失敗しました${error.message}` //'error'(/*eroror-handler), ${error.message}は場面に応じた内容のerrorを返えしてくれる
        );
        next();
      });
  }, */

  // ビューの表示は、redirectViewアクションで別に行う(createアクションから引き継ぐ)
  redirectView: (req, res, next) => { // 5.1
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {// 6
    // リクエストのパラメータからユーザーIDを取り出す
    let userId = req.params.id;
    //　そのIDを持つユーザーを探す
    User.findById(userId)
      .then(user => {
        //　レスポンスオブジェクト慶友でユーザーを次のミドルウェア関数に渡す
        res.locals.user = user;
        next();
      })
      .catch(error => {
        //　エラーはロギングして次の関数に渡す
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  // showのビューを表示する
  showView: (req, res) => { // 6
    res.render("users/show");
  },

  edit: (req, res, next) => {
    let userId = req.params.id; // ユーザーIDを取得
    User.findById(userId)
      .then(user => { // 特定のユーザーのためにユーザ編集ページを表示
        res.render("users/edit", {
          user: user
        });
        console.log(user);
      })
      .catch(error => {
        console.log(`ユーザーIDを取得する際にエラー発生: ${error.message} `)
        next(error);
      });
  },

  // 更新のアクション
  update: (req, res, next) => {
    let userId = req.params.id; // ローカル変数
    // ユーザーのパラメータをリクエストから収集する
    let userParams = getUserParams(req.body);
    /* { //　更新させたいフィールド？？
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    }; */

    // ユーザーをIDで見つけたあと、、ドキュメント レコードの更新も行う
    User.findByIdAndUpdate(userId, { // findByIdAndUpdat:mongooseのメソッド(ドキュメントを置き換え),参考：https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
      $set: userParams // $setを使って、指定したIDと続くパラメータを受け取る(ここには、変更後の値が入る)
    })
      .then(user => {
        // ローカル変数としてレスポンスに追加
        /* req.flash('success', `${user.fullName}の内容を更新しました`); */
        res.locals.redirect = `/users/${userId}`; // ローカル変数を格納,該当のIDを埋め込む
        res.locals.user = user; // undefined
        next();
      })
      .catch(error => {
        console.log(`Error ユーザーを更新できず: ${error.message}`); // // error.message,なんでも良い？むしろ、messageは無い方が良い？
        next(error);
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId) // 該当のユーザーIDを見つけて、削除のメソッドを実行してIDそのものを削除
      .then(() => {
        /* req.flash('success', `削除しました`); */
        res.locals.redirect = "/users"; // ローカルファイルに転送
        next();
      })
      .catch(error => {
        console.log(`Error 該当のユーザーを削除できませんでした: ${error.message}`);
        next();
      });
  },
  login: (req, res) => {
    res.render('users/login');
  },
  // authenticate(オーセンターケイト),認証のアクション, passportの仕様に置き換えるため削除が必要
  /* authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email }) // 該当するユニークなIDを1つ探す,見つかったら
      .then(user => { // 引数userに代入
        if (user) { // もし、該当するメールが
          user.passwordComparison(req.body.password).then(passwordsMathc => { // 比較してtrueなら、引数passwordsMathcに代入して(プロミスて待機)
            if (passwordsMathc) { // trueなら、
              res.locals.redirect = `/users/${user._id}`; // パスに転送
              req.flash('success', `${user.fullName}は、正常にログインできました`); // フラッシュメッセージを返す
              res.locals.user = user;
            } else {
              req.flash(
                "error",
                `アカウントまたはパスワードが正しくありません。再度お試しいただくか、システム管理者にお問い合わせください。`
              );
              res.locals.redirect = "/users/login";
            }
            next(); // 次のミドルウェアを呼び出し
          });
        } else { // それ以外であれば、
          req.flash("error", "ユーザーアカウントのログインに失敗しました。ユーザーアカウントが見つかりません.");
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch(error => { // ログ出力し、Expressに知らせる
        console.log(`ログイン時にエラー発生: ${error.message}`);
        next(error);
      }); */

      
  // passportのローカルストラテジーでユーザーを認証
  // 参考：http://www.passportjs.org/docs/other-api/
  authenticate: passport.authenticate("local", { // authenticate(リクエストの認証をこれ一つで行う)
    failureRedirect: "/users/login", // 失敗時の転送
    failureFlash: "ログインに失敗しました.", // 失敗フラッシュメッセ
    successRedirect: "/", // 成功時の転送先
    successFlash: "ログインに成功しました" // 成功フラッシュメッセ
  }),


  // validate関数(ミドルウェアでの新規登録時のチェックを増やす)
  /* validate: (req, res, next) => {
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
  } */

};

/* validator
・Sanitization middlewares
  sanitizeBody(fields),非推奨で今後なくなるかも
  参考：https://express-validator.github.io/docs/filter-api.html
・nomalizeEmail,trim
  参考：https://github.com/validatorjs/validator.js#sanitizers
・Validation middlewares
  check([field, message])
  参考：https://express-validator.github.io/docs/check-api.html#checkfields-message
・validationResult()
  参考：https://express-validator.github.io/docs/validation-result-api.html
 */



/* Model.find():
・モデルで指定した項目をDBより呼び出す
・User.find({password: 'pass123'}) と引数を指定すると、絞り込み検索が可能
・参考：https://mongoosejs.com/docs/api.html#model_Model.find
*/

/* index: (req, res, next) => { .....
・引数nextは、次の経路へ繋げる為の関数
・最後にnext()関数を実行しないと次の経路へ繋げる事ができない
・繋げる必要がある場合にnextがなければAppがクラッシュしてしまう
 */

/* ミドルウェア関数
・必ず引数にnextの記述が必要
・リクエストが来たら、最初に発動する
・レスポンスがサーバーから出ていく時にも発動する
・参考：http://expressjs.com/ja/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps
*/

/* res.locals
参考：http://expressjs.com/en/5x/api.html#app.locals
参考：http://expressjs.com/en/5x/api.html#res.locals
*/