$(function () {
  const canvas = $("#board")[0];
  const ctx = canvas.getContext("2d");
  let drawing = false;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#FFF";

  // 座標
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    // タッチ
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    // マウス
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  // ==== 描画開始 (mouse + touch) ====
  $("#board").on("mousedown touchstart", function (e) {
    e.preventDefault();
    drawing = true;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  // ==== 描画終了 (mouse + touch) ====
  $(window).on("mouseup touchend", function () {
    drawing = false;
    ctx.beginPath();
  });

  // ==== 描画中 (mouse + touch) ====
  $("#board").on("mousemove touchmove", function (e) {
    if (!drawing) return;
    e.preventDefault();

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });
});
