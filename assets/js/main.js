/* =========================================================================
   唐代喆 Jay · 个人作品集 —— 交互脚本
   - 滚动进场动画（IntersectionObserver）
   - 顶部滚动进度条
   - 项目视频进入视口自动播放、离开暂停（省流、不打扰）
   - 证书 Lightbox：点击打开、← → 翻页、Esc 关闭、可键盘访问、焦点返回
   - 导出 PDF 按钮（window.print）
   ⚠ 全程不使用 localStorage / sessionStorage 等任何浏览器存储 API
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 滚动进场淡入 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });

    // 兜底：万一某些浏览器没有触发观察回调（页面延迟绘制等），
    // 2.5 秒后强制显示仍处于隐藏状态的内容，保证文字永远不会消失。
    window.setTimeout(function () {
      reveals.forEach(function (el) {
        if (!el.classList.contains("is-visible")) el.classList.add("is-visible");
      });
    }, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 2. 顶部滚动进度条 ---------- */
  var bar = document.getElementById("scrollProgress");
  if (bar) {
    var ticking = false;
    var updateBar = function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      bar.style.width = Math.min(100, (scrolled / max) * 100) + "%";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(updateBar); ticking = true; }
    }, { passive: true });
    updateBar();
  }

  /* ---------- 3. 项目视频：进入视口自动播放，离开暂停 ---------- */
  var vids = document.querySelectorAll("video.js-autoplay");
  if (vids.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (v.preload === "none") { v.preload = "auto"; v.load(); }
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); } /* 自动播放被拦截时静默忽略 */
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.4 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- 4. 证书 Lightbox（灯箱） ---------- */
  var lb      = document.getElementById("lightbox");
  var lbImg   = document.getElementById("lbImg");
  var lbCap   = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");
  var lbPrev  = document.getElementById("lbPrev");
  var lbNext  = document.getElementById("lbNext");

  var gallery = [];   // 当前奖项的证书图数组
  var index = 0;      // 当前图片索引
  var lastFocused = null;

  function render() {
    if (!gallery.length) return;
    lbImg.src = gallery[index];
    lbImg.alt = lbCap.textContent + "（证书 " + (index + 1) + "/" + gallery.length + "）";
    var multi = gallery.length > 1;
    lbPrev.hidden = !multi;
    lbNext.hidden = !multi;
  }

  function openLightbox(images, caption, trigger) {
    gallery = images;
    index = 0;
    lastFocused = trigger || null;
    lbCap.textContent = caption || "";
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";   // 锁定背景滚动
    lbClose.focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();  // 焦点返回触发按钮
  }

  function step(dir) {
    if (gallery.length < 2) return;
    index = (index + dir + gallery.length) % gallery.length;
    render();
  }

  // 给每个奖项按钮绑定打开事件
  document.querySelectorAll(".award").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var images;
      try { images = JSON.parse(btn.getAttribute("data-images") || "[]"); }
      catch (err) { images = []; }
      if (!images.length) return;
      openLightbox(images, btn.getAttribute("data-caption") || "", btn);
    });
  });

  if (lb) {
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { step(-1); });
    lbNext.addEventListener("click", function () { step(1); });
    // 点击灰色背景（非图片区域）关闭
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
    // 键盘：Esc 关闭、← → 翻页
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- 5. 导出 PDF ---------- */
  ["printBtn", "printBtn2"].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener("click", function () { window.print(); });
  });

  /* ---------- 6. 锚点平滑滚动（兼容旧浏览器，尊重 reduce-motion） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });
})();
