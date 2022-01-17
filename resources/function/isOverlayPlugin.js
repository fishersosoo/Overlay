export default (() =>
  setTimeout(() => {
    if (!window.OverlayPluginApi && new URLSearchParams(new URL(window.location).search).get("OVERLAY_WS") === null) {
      let div = document.createElement("div");
      div.innerText = "请在ACT悬浮窗中添加此页面，而不是浏览器直接访问。";
      document.body.appendChild(div);
      div.style.position = "absolute";
      div.style.top = 0;
      div.style.fontFamily = "微软雅黑";
      div.style.fontSize = "24px";
      div.style.color = "white";
      div.style.textShadow = `rgb(0, 0, 0) -1px 0px 2px, rgb(0, 0, 0) 0px 1px 2px, rgb(0, 0, 0) 1px 0px 2px, rgb(0, 0, 0) 0px -1px 2px`;
    }
  }, 1000))();
