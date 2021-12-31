"use strict";

import "./index.scss";
import IMGcastingMonitor from "./images/castingMonitor.jpg";
import IMGkeigennRecord from "./images/keigennRecord.jpg";
import IMGkeySkillTimer from "./images/keySkillTimer.jpg";
import IMGteamWatch from "./images/teamWatch.jpg";
import IMGcastingToChinese from "./images/castingToChinese.gif";
import IMGtextCommandHelper from "./images/textCommandHelper.jpg";
import IMGlimitBreakTip from "./images/limitBreakTip.gif";

const table = document.querySelector("table");
const list = {
  "fflogsUploaderDownload": { type: "HTML网页", describe: "FFLOGS上传器下载", img: "", params: "" },
  "triggerConverter": { type: "HTML网页", describe: "旧触发器正则转换", img: "", params: "" },
  "castingMonitor": {
    type: "ACT悬浮窗",
    describe: "施法监控",
    img: IMGcastingMonitor,
    params: "?duration=15&tetris=false",
  },
  "keigennRecord": {
    type: "ACT悬浮窗",
    describe: "减伤监控",
    img: IMGkeigennRecord,
    params: "?maxLength=800&24Mode=false&bgOpacity=0.45&bodyOpacity=1&fontSize=12px&th1=3em&th2=4.5em&th3=2.5em&th4=3.75em",
  },
  "keySkillTimer": {
    type: "ACT悬浮窗",
    describe: "团辅监控",
    img: IMGkeySkillTimer,
    params: "?dajinengTTS=true&tuanfuTTS=true&inPartyOnly=true&dataVersion=6",
  },
  "teamWatch": { type: "ACT悬浮窗", describe: "技能监控", img: IMGteamWatch, params: "?scale=1" },
  "mpTick": { type: "ACT悬浮窗", describe: "回蓝计时", img: "", params: "" },
  "castingToChinese": {
    type: "ACT悬浮窗",
    describe: "读条汉化",
    img: IMGcastingToChinese,
    params:
      "?directive=false&focus=false&tts=false&hideProg=false&hideCountdown=false&roomaji=true&progHeight=10px&fontSize=20px&fontFamily=SmartisanHei&ping=80",
  },
  "textCommandHelper": { type: "Any", describe: "文本指令助手", img: IMGtextCommandHelper, params: "?postNamazuPort=2019" },
  "generalSkillTimer": { type: "ACT悬浮窗", describe: "通用技能冷却TTS", img: "", params: "" },
  "limitBreakTip": { type: "ACT悬浮窗", describe: "LB额外增长监控", img: IMGlimitBreakTip, params: "?LBMax=30000&automatic=220" },
  "markerTripleBarrel": {
    type: "ACT悬浮窗",
    describe: "绝神兵三连桶标记",
    img: "",
    params:
      "?jobSortRule=19,21,32,37,24,28,33,40,20,22,30,34,39,23,31,38,25,27,35,36&markingSortRule=20,22,30,34,39,23,31,38,25,27,35,36,37,32,21,19,40,33,28,24&postNamazuPort=2019",
  },
};
let thead = document.createElement("tr");
const theadChild = ["链接", "预览"];
theadChild.forEach((value) => {
  let theadChildNode = document.createElement("th");
  theadChildNode.innerText = value;
  thead.appendChild(theadChildNode);
});
table.appendChild(thead);

for (const key in list) {
  const project = list[key];
  let tr = document.createElement("tr");
  // let tdType = document.createElement("td");
  let tdText = document.createElement("td");
  let tdImg = document.createElement("td");
  let td3A = document.createElement("a");
  td3A.href = `./${key}.html${project.params}`;
  td3A.innerText = project.describe;
  if (key === "textCommandHelper") {
    td3A.addEventListener("click", () => {
      alert(`可以在浏览器里直接打开。
也可以加悬浮窗：ACT-插件-OverlayPlugin（NGLD），左下方“新建”，任意起名，类型选择“自订 - 标签”。添加完成后，在右侧窗体的路径中，填入跳转后的页面地址。
如何联动鲶鱼精邮差：修改url链接中的端口号为鲶鱼精邮差监听的端口号且开启监听`);
    });
  }
  if (project.type === "ACT悬浮窗") {
    td3A.addEventListener("click", () => {
      alert(`如何添加悬浮窗：ACT-插件-OverlayPlugin（NGLD），左下方“新建”，任意起名，类型选择“自订 - 数据统计”。添加完成后，在右侧窗体的路径中，填入跳转后的页面地址。
如何自定义属性：修改url链接中".html?"后方的字符串，若没有则无法自定义或有单独设置页面。`);
    });
  }
  let td4Img = new Image();
  td4Img.src = project.img;
  tdImg.appendChild(td4Img);
  // tdType.innerText = project.type;
  // tr.appendChild(tdType);
  tr.appendChild(tdText);
  tdText.appendChild(td3A);
  tr.appendChild(tdImg);
  table.appendChild(tr);
}
