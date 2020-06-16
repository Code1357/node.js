'use strict';

// jQeryで記述されている

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses?apiToken=recipeT0k3n", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

// 最新コース(APIのボタン)
/* $(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => { 
      let data = results.data; // データを表現するローカル変数を準備
      if (!data || !data.courses) return; // データオブジェクトがコースの情報を含んでいるかチェック
      data.courses.forEach(course => { // コースのデータのループ処理で要素をモーダルに追加
        $(".modal-body").append(　
          // 状態によって適切なクラスを設定したボタンに変化を与える,三項演算子を使っている(参考：https://wa3.i-3-i.info/word11653.html)滅多に使う事はない
          `<div>
						<span class="course-title">
							${course.title}
						</span>
            <button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
          
							${course.joined ? "Joined" : "参加"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => { // 各ボタンに機能を持たせるためにプロミスでカスタム関数を呼び出す
      addJoinButtonListener();
    });
  });
});

// 参加ボタンの機能を作成(APIのボタン)
let addJoinButtonListener = () => {
  $(".join-button").click(event => { // クリックイベント
    let $button = $(event.target), // ターゲットのボタンを補足して(event.target:イベントを発生させたオブジェクトへの参照)
      courseId = $button.data("id"); // ボタンのデータからコースIDを取得
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { // /api/courses/該当のid/joinというパス,参加したいコースIDをつけてAjaxリクエストを出す
      let data = results.data;
      if (data && data.success) { // joinアクションの成功を確認してボタンを更新する
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("登録できませんもう一度試してください");
      }
    });
  });
}; */

/* 
'courses/_coursesModal,モーダルに追加するデータ
これがAjax関数となる
*/

/* $(document).ready(() => { // DOMがロードされるのを待って(DOMが完全にロードされるまでJavaScriptが実行されないようになる)
  $("#modal-button").click(() => { // #=id,モーダルボタンに対するクリックイベントを監視(クリックリスナ：クリックしたら動作する)
    $(".modal-body").html(""); // モーダルの既存のコンテンツはクリアする
    $.get("/courses?format=json", data => { // /courses?format=jsonのデータを非同期にリクエスト(getでAjaxのGETリクエストを実行)
      data.forEach(course => { // レスポンスのデータ配列をループして
        $(".modal-body").append( // それぞれのコースをモーダルに加えていく(layout.js内のクラスmodal-bodyに以下を追加する)

        // 以下はHTMLを作成しつつ追加している
          `<div> 
						<span class="course-title">
							${course.title}
						</span>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    });
  });
}); */


/*
上記のAjax関数はjQueryを使って非同期でサーバーに通信している

参考：https://developer.mozilla.org/ja/docs/Web/Guide/AJAX/Getting_Started
Ajaxは非同期である
Ajaxは、XMLHttpRequestオブジェクトを使う
Ajaxは、JSON, XML, HTML, テキストファイルなど、様々な形式の情報で送受信が可能
Ajaxはサーバーと通信する
Ajaxは、ページの読み込みを行わずページの更新やデータ交換が可能
*/