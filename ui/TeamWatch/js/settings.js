"use strict";
/*
 * @Author: Souma
 * @LastEditTime: 2021-08-28 17:19:51
 */
import { loadItem, saveItem } from "../../../resources/localStorage.min.js";
import { actions } from "./actions.min.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
import { defaultSettings } from "./defaultSettings.min.js";
import { jobList } from "./job.min.js";
import { language } from "./language.min.js";
import "../../../resources/jquery-3.6.0.min.js";
import "../../../resources/drag-arrange.min.js";
// import "../../..";
let namespace = "TeamWatch3";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
let loadSettings = load("settings", {});
let settings = Object.assign(defaultSettings, loadSettings, { share: {} });
let old = localStorage.getItem("teamWatch");
if (old && !localStorage.getItem("TeamWatch3")) {
  //导入旧数据
  console.log(language.loadOldSettings[settings.language]);
  old = JSON.parse(old);
  for (const key in old.watch) {
    let n = [];
    let i = 0;
    for (const id of old.watch[key]) {
      if (id !== "") n.push({ id: id, scale: "1", top: "0px", right: 44 * i + "px" });
      i++;
    }
    settings.watchs.find((w) => w.job === key).watch = n;
  }
  settings.ttsOn = old.TTSOn;
  settings.tts = old.TTS;
  settings.style.fontSize = old.settings.fontSize;
  save("settings", settings);
  // localStorage.removeItem("teamWatch");
}
let nav = document.createElement("ul");
let skinList = { "默认": "default", "Material UI MOD": "material" };
let urlList = { cafemaker: "https://cafemaker.wakingsands.com/i/", XIVAPI: "https://xivapi.com/i/" };
for (const key in settings) {
  if (key === "ttsOn") continue;
  let li = document.createElement("li");
  li.title = key;
  li.innerText = language[key][settings.language] || key;
  li.onclick = () => {
    for (const li of document.querySelectorAll("main>article")) li.style.display = "none";
    document.querySelector(`#${li.title}`).style.display = "block";
    for (const li of document.querySelectorAll("nav>ul>li")) li.style.fontWeight = "normal";
    li.style.fontWeight = "bold";
  };
  nav.appendChild(li);
  let element = document.createElement("article");
  element.id = key;
  document.querySelector("main").appendChild(element);
}
document.querySelector("nav").appendChild(nav);

let styleOptions = document.createElement("ul");
//常规
for (const key in settings.style) {
  let li = document.createElement("li");
  if (language[key] !== undefined) {
    li.innerText = language[key][settings.language];
    let input;
    if (!isNaN(settings.style[key])) {
      input = document.createElement("input");
      input.setAttribute("type", "number");
      input.title = key;
      input.value = settings.style[key];
    } else {
      input = document.createElement("select");
      input.title = key;
      if (key === "skin") {
        for (const key in skinList) {
          let option = document.createElement("option");
          option.value = skinList[key];
          option.innerText = key;
          input.appendChild(option);
        }
      } else if (key === "url") {
        for (const key in urlList) {
          let option = document.createElement("option");
          option.value = urlList[key];
          option.innerText = key;
          input.appendChild(option);
        }
      }
      input.value = settings.style[key];
    }
    li.appendChild(input);
    styleOptions.appendChild(li);
  }
}
document.querySelector("#style").appendChild(styleOptions);
//监控列表
let watchOptions = document.createElement("ul");
// document.oncontextmenu = () => false;
let pos = {};
for (const i in settings.watchs) {
  const watch = settings.watchs[i];
  let li = document.createElement("li");
  li.innerText = jobList.find((j) => j.ID === watch.job)[settings.language];
  li.style.height = "50px";
  li.style.lineHeight = li.style.height;
  li.style.outline = "gray dashed 1px";
  li.style.width = 40 * watch.length + "px";
  li.style.position = "relative";
  li.title = watch.job;
  for (const skill of watch.watch) {
    let action = actions.find((action) => action.ID === skill.id);
    if (action === undefined) {
      console.log(`${skill.id}未找到，已跳过`);
    } else {
      let art = document.createElement("article");
      art.style.position = "absolute";
      art.style.top = skill.top;
      art.style.right = skill.right;
      art.style.transform = `scale(${skill.scale})`;
      insertWatch(art, action, li);
    }
  }
  li.style.paddingLeft = "0.5em";
  let btn = document.createElement("button");
  btn.innerText = "+";
  btn.style.marginLeft = "1em";
  btn.style.padding = "0.375em 0.75em";
  btn.setAttribute("name", jobList.find((j) => j.ID === watch.job).cn); //不要改cn
  btn.onclick = function () {
    let remove = document.querySelector("#watchs > ul > li > div");
    if (remove) remove.remove();
    let div = document.createElement("div");
    div.style.height = li.style.height;
    div.style.width = "300px";
    div.style.left = "8em";
    div.style.top = "0px";
    div.style.position = "absolute";
    let select = document.createElement("select");
    for (const action of actions.filter((action) => new RegExp(`(^| )${btn.getAttribute("name")}($| )`).test(action.ClassJobCategory))) {
      if (compareSameGroup[action.ID] === undefined) {
        if ([].slice.call(li.querySelectorAll("article")).find((a) => a.getAttribute("name") === (compareSameGroup[action.ID] || action.ID)) === undefined) {
          let option = document.createElement("option");
          option.innerText = action[`Name_${settings.language}`];
          option.setAttribute("value", action.ID);
          select.appendChild(option);
        }
      }
    }
    div.appendChild(select);
    let add = document.createElement("button");
    add.innerText = language.add[settings.language];
    let cancel = document.createElement("button");
    cancel.innerText = language.cancel[settings.language];
    div.appendChild(add);
    add.onclick = function () {
      let action = actions.find((action) => action.ID === this.parentNode.querySelector("select").value);
      let art = document.createElement("article");
      art.style.position = "absolute";
      art.style.top = "0px";
      let mostRight = [].slice.call(li.querySelectorAll("article")).reduce((pre, value) => (parseInt(pre.style.right) > parseInt(value.style.right) ? pre : value));
      art.style.right = parseInt(mostRight.style.right) + parseInt(40) + 4 + "px";
      insertWatch(art, action, li);
      cancel.onclick();
    };
    div.appendChild(cancel);
    cancel.onclick = function () {
      this.parentNode.remove();
    };
    li.appendChild(div);
  };
  li.appendChild(btn);
  watchOptions.appendChild(li);
}
document.querySelector("#watchs").appendChild(watchOptions);
//语音提醒
let div = document.createElement("div");
let ttsOnBtn = document.createElement("input");
ttsOnBtn.setAttribute("type", "checkbox");
ttsOnBtn.checked = settings.ttsOn === "true";
div.appendChild(ttsOnBtn);
let ttsOnText = document.createElement("span");
ttsOnText.innerText = language.ttsOnText[settings.language];
div.appendChild(ttsOnText);
document.querySelector("#tts").appendChild(div);
for (const key in settings.tts) {
  if (Object.hasOwnProperty.call(settings.tts, key)) {
    const value = settings.tts[key];
    insertTTS(key, value);
  }
}
let ttsAdd = document.createElement("button");
ttsAdd.id = "ttsPlus";
ttsAdd.innerText = "+";
ttsAdd.onclick = function () {
  if (document.querySelector("#ttsAddSelect")) return;
  let div = document.createElement("div");
  div.style.display = "inline-block";
  div.id = "ttsAddSelect";
  let input = document.createElement("input");
  input.setAttribute("placeholder", language.searchSkill[settings.language]);
  input.onchange = function () {
    // this.value
    select.innerHTML = "";
    actions
      .filter((action) => action.Name_cn.indexOf(this.value) !== -1 || action.Name_en.indexOf(this.value) !== -1 || action.Name_jp.indexOf(this.value) !== -1)
      .forEach((element) => {
        console.log(element);
        let option = document.createElement("option");
        option.innerText = element[`Name_${settings.language}`];
        option.value = element.ID;
        select.appendChild(option);
      });
  };
  let select = document.createElement("select");
  for (const i of actions) {
    if (compareSameGroup[i.ID]) continue;
    let option = document.createElement("option");
    option.innerText = i[`Name_${settings.language}`];
    option.value = i.ID;
    select.appendChild(option);
  }
  let add = document.createElement("button");
  add.innerText = language.add[settings.language];
  add.onclick = function () {
    insertTTS(select.value, "");
    div.remove();
  };
  let cancel = document.createElement("button");
  cancel.innerText = language.cancel[settings.language];
  cancel.onclick = function () {
    div.remove();
  };
  div.style.position = "relative";
  div.style.left = "-300px";
  div.style.bottom = "-30px";
  div.appendChild(input);
  div.appendChild(select);
  div.appendChild(add);
  div.appendChild(cancel);
  ttsAdd.parentNode.appendChild(div);
};
document.querySelector("#tts").appendChild(ttsAdd);
{
  //小队排序
  let jobSort = document.createElement("div");
  jobSort.id = "jobSort";
  let jobSortOptions = ["Tank>Healer>Dps", "Tank>Dps>Healer", "Healer>Tank>Dps", "Healer>Dps>Tank", "Dps>Healer>Tank", "Dps>Tank>Healer"];
  let forList = ["Tank", "Healer", "Dps"];
  let jobSortList = ["jobSortTank", "jobSortHealer", "jobSortDps"];
  for (const role of jobSortList) {
    let span = document.createElement("span");
    span.innerText = language[role][settings.language];
    jobSort.appendChild(span);
    let select = document.createElement("select");
    for (const o of jobSortOptions) {
      let option = document.createElement("option");
      option.value = o;
      option.innerText = o;
      select.appendChild(option);
    }
    select.title = `when${role.replace("jobSort", "")}`;
    select.value = settings.partySort[`when${role.replace("jobSort", "")}`];
    jobSort.appendChild(select);
  }
  document.querySelector("#partySort").appendChild(jobSort);

  for (const role of forList) {
    let ul = document.createElement("ul");
    ul.classList.add(role);
    for (const t of settings.partySort[role]) {
      let li = document.createElement("li");
      let p = document.createElement("p");
      p.innerText = jobList.find((j) => j.ID === t.toString())[settings.language];
      p.classList.add("drag");
      p.style.height = "100%";
      p.style.width = "100%";
      li.appendChild(p);
      li.setAttribute("name", t);
      ul.appendChild(li);
    }
    document.querySelector("#partySort").appendChild(ul);
  }
  $("#partySort > ul.Tank > li").arrangeable({ dragSelector: `.drag` });
  $("#partySort > ul.Healer > li").arrangeable({ dragSelector: `.drag` });
  $("#partySort > ul.Dps > li").arrangeable({ dragSelector: `.drag` });
}
{
  //语言
  let language = document.createElement("select");
  let languageList = ["cn", "en", "jp"];
  for (const lge of languageList) {
    let option = document.createElement("option");
    option.value = lge;
    option.innerText = lge;
    language.appendChild(option);
  }
  language.title = "language";
  language.style.width = "5em";
  language.style.padding = "25px";
  language.style.margin = "25px";
  language.style.fontSize = "25px";
  language.value = settings.language;
  document.querySelector("#language").appendChild(language);
}
{
  //导入导出
  let shareIn = document.createElement("p");
  let shareInBtn = document.createElement("button");
  let shareInInput = document.createElement("textarea");
  shareInInput.id = "shareInInput";
  shareInBtn.innerText = language.shareIn[settings.language];
  shareIn.appendChild(shareInInput);
  shareIn.appendChild(shareInBtn);
  let shareOut = document.createElement("p");
  let shareOutBtn = document.createElement("button");
  let shareOutInput = document.createElement("textarea");
  shareOutInput.id = "shareOutInput";
  shareOutBtn.innerText = language.shareOut[settings.language];
  shareOut.appendChild(shareOutInput);
  shareOut.appendChild(shareOutBtn);
  document.querySelector("#share").appendChild(shareIn);
  document.querySelector("#share").appendChild(shareOut);
  shareInBtn.onclick = () => {
    try {
      save("settings", JSON.parse(window.decodeURIComponent(window.atob(document.querySelector("#shareInInput").value))));
      location.reload();
    } catch {
      document.querySelector("#shareInInput").value = "格式错误";
    }
  };
  shareOutBtn.onclick = () => {
    document.querySelector("#shareOutInput").value = window.btoa(window.encodeURIComponent(JSON.stringify(settings)));
  };
}
document.querySelector("#save").innerHTML = language.save[settings.language];
document.querySelector("#save").onclick = function () {
  //常规
  document.querySelectorAll("#style>ul>li>input").forEach((e) => (settings.style[e.title] = e.value));
  document.querySelectorAll("#style>ul>li>select").forEach((e) => (settings.style[e.title] = e.value));
  //监控列表
  document.querySelectorAll("#watchs>ul>li").forEach((e) => {
    let arr = [];
    e.querySelectorAll("article").forEach((a) =>
      arr.push({ id: a.getAttribute("name"), scale: a.style.transform.replace(/[^0-9\.]/gi, ""), top: a.style.top, right: a.style.right })
    );
    settings.watchs.find((w) => w.job === e.title).watch = arr;
  });
  //语音提醒
  settings.ttsOn = document.querySelector("#tts > div:nth-child(1) > input[type=checkbox]").checked.toString();
  let t = {};
  document.querySelectorAll("#tts>div.ttsSkill>input").forEach((e) => (t[e.title] = e.value));
  settings.tts = t;
  //小队排序
  document.querySelectorAll("#partySort>#jobSort>select").forEach((e) => (settings.partySort[e.title] = e.value));
  document.querySelectorAll("#partySort>ul").forEach((e) => {
    let s = [];
    e.querySelectorAll("li").forEach((l) => s.push(l.getAttribute("name")));
    settings.partySort[e.className] = s;
  });
  //语言
  settings.language = document.querySelector("#language > select").value;
  //finish
  save("settings", settings);
  location.reload();
  if (window.opener) window.opener.location.reload();
};
document.querySelector("nav>ul>li:nth-of-type(1)").onclick();
function insertTTS(key, value) {
  if (!parseInt(key) > 0) return;
  let div = document.createElement("div");
  div.classList.add("ttsSkill");
  div.innerText = actions.find((action) => action.ID === key)[`Name_${settings.language}`];
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = value;
  input.title = key;
  div.appendChild(input);
  let del = document.createElement("button");
  del.innerHTML = "X";
  del.onclick = function () {
    this.parentNode.remove();
  };
  div.appendChild(del);
  document.querySelector("#tts").insertBefore(div, document.getElementById("ttsPlus"));
}

function insertWatch(art, action, li) {
  if (art.style.transform === "") art.style.transform = "scale(1)";
  art.style.width = "48px";
  art.style.height = art.style.width;
  art.style.lineHeight = art.style.height;
  art.style.background = `url(./resources/${settings.style.skin}.png),url(${settings.style.url}${action.Url}.png) center / 40px 40px no-repeat `;
  art.title = action["Name_" + settings.language];
  art.setAttribute("name", action.ID);
  art.setAttribute("draggable", "true");
  art.ondragstart = function (e) {
    pos.x = e.x;
    pos.y = e.y;
    pos.right = this.style.right;
    pos.top = this.style.top;
    let element = document.createElement("img");
    e.dataTransfer.setDragImage(element, 0, 0);
    e.dataTransfer.effectAllowed = "move";
  };
  let space = 11;
  art.ondrag = function (e) {
    let s = this.style.transform.replace(/[^0-9\.]/gi, "");
    space = 11 * s;
    this.style.right = Math.min(Math.max(Math.round((parseInt(pos.right) - parseInt(e.x - pos.x)) / space) * space, 0), document.body.clientWidth - 150) + "px";
    this.style.top = Math.min(Math.max(Math.round((parseInt(pos.top) + parseInt(e.y - pos.y)) / space) * space, 0), (1 - s) * 44) + "px";
  };
  li.ondragover = (e) => e.preventDefault();
  art.ondragend = function (e) {
    let s = this.style.transform.replace(/[^0-9\.]/gi, "");
    space = 11 * s;
    this.style.right = Math.min(Math.max(Math.round((parseInt(pos.right) - parseInt(e.x - pos.x)) / space) * space, 0), document.body.clientWidth - 150) + "px";
    this.style.top = Math.min(Math.max(Math.round((parseInt(pos.top) + parseInt(e.y - pos.y)) / space) * space, 0), (1 - s) * 44) + "px";
  };
  let aside = document.createElement("aside");
  aside.innerText = "X";
  aside.onclick = function () {
    let c = confirm(`要删除${aside.parentNode.title}吗？`);
    if (c) this.parentNode.remove();
  };
  let zp50 = document.createElement("button");
  zp50.innerText = "S";
  zp50.style.height = "16px";
  zp50.style.lineHeight = "10px";
  zp50.style.width = "16px";
  zp50.style.position = "absolute";
  zp50.style.bottom = "4px";
  zp50.style.left = "1px";
  zp50.style.fontSize = "12px";
  zp50.onclick = function () {
    art.style.transform = `scale(0.5)`;
    art.style.top = "0px";
  };
  let zp100 = document.createElement("button");
  zp100.innerText = "L";
  zp100.style.height = "16px";
  zp100.style.lineHeight = "10px";
  zp100.style.width = "16px";
  zp100.style.position = "absolute";
  zp100.style.bottom = "4px";
  zp100.style.left = "31px";
  zp100.style.fontSize = "12px";
  zp100.onclick = function () {
    art.style.transform = `scale(1)`;
    art.style.top = "0px";
  };
  art.appendChild(zp50);
  art.appendChild(zp100);
  art.appendChild(aside);
  li.appendChild(art);
}
