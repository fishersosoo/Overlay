/*
 * @Author: Souma
 * @LastEditTime: 2021-11-10 22:47:00
 */
"use strict";
(function () {
  if (window.localStorage.getItem(`${document.title}-Xianyu`) !== "true") {
    let show = document.createElement("div");
    show.innerText = "本悬浮窗永久免费公开使用，若您是通过闲鱼购买，说明受骗！\n作者：猫小胖 海猫茶屋 Souma";
    let button = document.createElement("button");
    button.innerText = "我知道了，不再显示";
    button.style.display = "block";
    button.style.padding = "2px 5px";
    button.onclick = () => {
      show.remove();
      window.localStorage.setItem(`${document.title}-Xianyu`, "true");
    };
    button.style.margin = "0 auto";
    show.appendChild(button);
    show.style.fontFamily = "'微软雅黑', 'Microsoft Yahei UI', Lato, Arial, Helvetica, sans-serif";
    show.style.borderRadius = "10px";
    show.style.color = "white";
    show.style.background = "rgba(55,155,55,0.8)";
    show.style.fontSize = "12px";
    show.style.position = "fixed";
    show.style.top = "0";
    show.style.margin = "0 auto";
    show.style.padding = "5px";
    show.style.width = "100vw";
    document.body.append(show);
  }
})();
