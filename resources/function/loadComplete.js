/*
 * @Author: Souma
 * @LastEditTime: 2021-12-01 06:22:28
 */
"use strict";
import styles from "./readMe.scss";
export default (function () {
  const loading = document.querySelector("#loading");
  if (loading) loading.remove();
  let readMe = document.createElement("div");
  readMe.className += `${styles.readMe}`;
  readMe.id = "readMe";
  let text = document.createElement("span");
  text.innerText = `🔒这是供用户调整悬浮窗大小的调试用文本，当你在ACT的OverlayPlugin(ngld)悬浮窗插件中锁定此悬浮窗，该段文本与半透明蓝色背景即会消失。`;
  text.classList.add(`${styles.text}`)
  readMe.appendChild(text);
  document.body.appendChild(readMe);
  document.addEventListener(
    "onOverlayStateUpdate",
    (e) => (document.querySelector("#readMe").style.display = e.detail.isLocked ? "none" : "flex")
  );
})();
