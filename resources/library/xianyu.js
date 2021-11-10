/*
 * @Author: Souma
 * @LastEditTime: 2021-11-10 20:20:13
 */
"use strict";
(function () {
  if (window.localStorage.getItem(`${document.title}-Xianyu`) !== "true") {
    let show = document.createElement("div");
    show.innerText = "本悬浮窗永久免费公开使用，若您是通过闲鱼购买，说明受骗！\n作者：猫小胖 海猫茶屋 Souma";
    let button = document.createElement("button");
    button.innerText = "我知道了，不再显示";
    button.style.position = "absolute";
    button.onclick = () => {
      show.remove();
      window.localStorage.setItem(`${document.title}-Xianyu`, "true");
    };
    button.style.bottom = "10px";
    button.style.left = "0";
    button.style.right = "0";
    button.style.margin = "0 auto";
    button.style.height = "24px";
    button.style.width = "128px";
    show.appendChild(button);
    show.style.fontFamily = "'微软雅黑', 'Microsoft Yahei UI', Lato, Arial, Helvetica, sans-serif";
    show.style.textAlign = "center";
    show.style.padding = "5px";
    show.style.borderRadius = "10px";
    show.style.color = "white";
    show.style.background = "rgba(55,155,55,0.8)";
    show.style.fontSize = "24px";
    show.style.position = "fixed";
    show.style.top = "0";
    show.style.bottom = "0";
    show.style.left = "0";
    show.style.right = "0";
    show.style.margin = "auto auto";
    show.style.height = "150px";
    show.style.width = "450px";
    document.body.append(show);
  }
})();
