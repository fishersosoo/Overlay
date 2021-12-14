"use strict";

import "./index.scss";
import IMGcastingMonitor from "./images/castingMonitor.png";
import IMGkeigennRecord from "./images/keigennRecord.png";
import IMGkeySkillTimer from "./images/keySkillTimer.png";
import IMGteamWatch from "./images/teamWatch.png";
const table = document.querySelector("table");
const list = {
  "fflogsUploaderDownload": { type: "HTML网页", describe: "FFLOGS上传器下载", img: "", useful: "永久" },
  "triggerConverter": { type: "HTML网页", describe: "旧触发器正则转换", img: "", useful: "before 6.0" },
  "castingMonitor": { type: "ACT悬浮窗", describe: "6.0施法监控", img: IMGcastingMonitor, useful: "6.X" },
  "keigennRecord": { type: "ACT悬浮窗", describe: "6.0减伤监控", img: IMGkeigennRecord, useful: "6.X" },
  "keySkillTimer": { type: "ACT悬浮窗", describe: "6.0团辅监控", img: IMGkeySkillTimer, useful: "6.X" },
  "teamWatch": { type: "ACT悬浮窗", describe: "6.0技能监控", img: IMGteamWatch, useful: "6.X" },
  "mpTick": { type: "ACT悬浮窗", describe: "回蓝计时", img: "", useful: "All" },
};
let thead = document.createElement("tr");
const theadChild = ["类型", "适用版本", "描述", "预览", "链接"];
theadChild.forEach((value) => {
  let theadChildNode = document.createElement("th");
  theadChildNode.innerText = value;
  thead.appendChild(theadChildNode);
});
table.appendChild(thead);

for (const key in list) {
  const project = list[key];
  let tr = document.createElement("tr");
  let tdType = document.createElement("td");
  let tdUseful = document.createElement("td");
  let tdText = document.createElement("td");
  let tdUrl = document.createElement("td");
  let tdImg = document.createElement("td");
  let td3A = document.createElement("a");
  td3A.href = `./${key}.html`;
  td3A.innerText = "点击跳转";
  tdUrl.appendChild(td3A);
  let td4Img = new Image();
  td4Img.src = project.img;
  tdImg.appendChild(td4Img);
  tdType.innerText = project.type;
  tdUseful.innerText = project.useful;
  tdText.innerText = project.describe;
  tr.appendChild(tdType);
  tr.appendChild(tdUseful);
  tr.appendChild(tdText);
  tr.appendChild(tdImg);
  tr.appendChild(tdUrl);
  table.appendChild(tr);
}
