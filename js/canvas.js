// キャンバスクリア用関数
window.clearCanvas = function (canvasId = "#board") {
  const canvas = $(canvasId)[0];
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // クリア後も描画スタイルを再設定
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";
  }
};

// Base64データを指定したキャンバスに描画する関数
window.drawToSpecificCanvas = function (canvasId, dataURL) {
  const canvas = $(canvasId)[0];
  if (!canvas) return;

  window.clearCanvas(canvasId);

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = dataURL;
};

$(function () {
  // メインのキャンバス (#board) をローカルの定数として定義
  const mainCanvas = $("#board")[0];
  const mainCtx = mainCanvas.getContext("2d");
  let drawing = false; // 初期設定

  mainCtx.lineWidth = 3;
  mainCtx.lineCap = "round";
  mainCtx.strokeStyle = "#333";

  function getPos(e) {
    const rect = mainCanvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  } // 描画部分

  $("#board").on("mousedown touchstart", function (e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    mainCtx.beginPath();
    mainCtx.moveTo(pos.x, pos.y);
  });

  $(window).on("mouseup touchend", function () {
    drawing = false;
    mainCtx.beginPath();
  });

  $("#board").on("mousemove touchmove", function (e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    mainCtx.lineTo(pos.x, pos.y);
    mainCtx.stroke();
    mainCtx.beginPath();
    mainCtx.moveTo(pos.x, pos.y);
  });

  window.getCanvasData = function () {
    return mainCanvas.toDataURL();
  };
});
