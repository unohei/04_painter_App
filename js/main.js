import { db } from "./firebase-ini.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 直前の絵の表示用
const PREV_CANVAS_ID = "#prevBoard";
// お題表示用
const TOPIC_DISPLAY_ID = "#currentTopic";

function loadPrevImage(topicText) {
  const q = query(
    collection(db, "drawings"),
    orderBy("saveTime", "desc"),
    limit(1)
  );

  getDocs(q).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      // データがある場合、最新の描画をprevBoardに表示
      const data = querySnapshot.docs[0].data();
      drawToSpecificCanvas(PREV_CANVAS_ID, data.image);
    } else {
      // データがない場合、prevBoardをクリア
      clearCanvas(PREV_CANVAS_ID);
    }
    // 右側のboardをクリア
    clearCanvas("#board");

    // お題を更新
    $(TOPIC_DISPLAY_ID).text(topicText).show();
  });
}

function resetToNewTopic() {
  const topicDisplay = $(TOPIC_DISPLAY_ID);
  const q = collection(db, "topics");

  // 両キャンバスをクリア
  clearCanvas(PREV_CANVAS_ID);
  clearCanvas("#board");

  getDocs(q).then((querySnapshot) => {
    const allTopics = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.text) {
        allTopics.push(data.text);
      }
    });

    if (allTopics.length > 0) {
      // ランダムでお題を選択
      const randomIndex = Math.floor(Math.random() * allTopics.length);
      const randomTopic = allTopics[randomIndex]; // 画面に表示

      topicDisplay.text(`お題: ${randomTopic}`).show();
    }
  });
}

$(function () {
  // ページロード時：最新の絵を読み込み、伝言ゲームの初期状態にする
  loadPrevImage("左側の絵を見て");

  $("#clearBtn").on("click", function () {
    // クリアの場合お題リセット
    resetToNewTopic();
  });
  $("#saveBtn").on("click", function () {
    const img = getCanvasData();
    const currentTopicText = $(TOPIC_DISPLAY_ID).text();

    addDoc(collection(db, "drawings"), {
      image: img,
      saveTime: Date.now(),
      topic: currentTopicText,
    }).then(() => {
      // alert("次の人へ！");
      loadPrevImage("左側の絵を見て");
    });
  });
});
