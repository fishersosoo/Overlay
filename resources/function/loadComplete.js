/*
 * @Author: Souma
 * @LastEditTime: 2021-12-01 06:22:28
 */
"use strict";
export default (function () {
  const loading = document.querySelector("#loading");
  if (loading) loading.remove();
  let readMe = document.createElement("div");
  readMe.style.height = "100vh";
  readMe.style.width = "100vw";
  readMe.style.zIndex = "10";
  readMe.style.color = "white";
  readMe.style.textShadow = -"1px 0 2px #000, 0 1px 2px #000, 1px 0 2px #000, 0 -1px 2px #000";
  readMe.style.display = "none";
  readMe.style.fontFamily = "微软雅黑";
  readMe.style.fontWeight = "bold";
  readMe.style.background = "color: rgba(0, 0, 150, 0.2)";
  readMe.style.position = "fixed";
  readMe.style.bottom = "0";
  readMe.style.fontSize = "16px";
  readMe.style.alignItems = "flex-end";
  readMe.style.justifyContent = "center";
  readMe.id = "readMe";
  let text = document.createElement("span");
  text.innerText = `🔒这是供用户调整悬浮窗大小的调试用文本，当你在ACT的OverlayPlugin(ngld)悬浮窗插件中锁定此悬浮窗，该段文本与半透明蓝色背景即会消失。`;
  text.style.width = "90vw";
  text.style.paddingBottom = "8px";
  readMe.appendChild(text);
  document.body.appendChild(readMe);
  document.addEventListener(
    "onOverlayStateUpdate",
    (e) => (document.querySelector("#readMe").style.display = e.detail.isLocked ? "none" : "flex")
  );
})();
