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