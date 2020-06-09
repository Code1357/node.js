'use strict';

const User = require('../models/user');

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
    res.render('users/index');
  },
  // フォームを表示させるアクション
  new: (req, res) => { // 4
    res.render('users/new');
  },
  // ユーザの登録内容をDBに保存するために情報を作るアクション
  // new.ejsから受け取ったデータを次のミドルウエア関数のredirectViewに渡す
  create: (req, res, next) => { // 5
    let userParams = {
      name: {
        first: req.body.first,　// .firstはejsで設定したname属性
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
      // let userParams = getUserParams(req.body);　, getUserParams不明、自作メソッド？
    // 上記変数createをUserモデルで受け取る
    User.create(userParams) // Userモデル
      .then(user => {
        res.locals.redirect = '/users'; // redirect:ページの転送
        res.locals.user = user; // この行のコード???  // localsも???
        next();
      })
      .catch(error => {
        console.log(`Error ユーザの情報は保存できませんでした ${error.message}`);
        next(error);
      });
  },
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
    let userId = req.params.id, // ローカル変数
      // ユーザーのパラメータをリクエストから収集する
      userParams = { //　更新させたいフィールド？？
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };// getUserParams???
      // ユーザーをIDで見つけたあと、、ドキュメント レコードの更新も行う
    User.findByIdAndUpdate(userId, { // findByIdAndUpdat:mongooseのメソッド(ドキュメントを置き換え),参考：https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
      $set: userParams // $setを使って、指定したIDと続くパラメータを受け取る(ここには、変更後の値が入る)
    })
      .then(user => {
        // ローカル変数としてレスポンスに追加
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
        res.locals.redirect = "/users"; // ローカルファイルに転送
        next();
      })
      .catch(error => {
        console.log(`Error 該当のユーザーを削除できませんでした: ${error.message}`);
        next();
      });
  }
};


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