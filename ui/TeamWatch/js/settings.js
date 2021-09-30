"use strict";
/*
 * @Author: Souma
 * @LastEditTime: 2021-09-30 06:28:17
 */
import { actions } from "../../../resources/data/actions.js";
import { jobList } from "../../../resources/data/job.js";
import "../../../resources/library/drag-arrange.min.js";
import { compareSameGroup } from "../../../resources/function/compareSameGroup.min.js";
import { loadItem, saveItem } from "../../../resources/function/localStorage.min.js";
import { defaultSettings } from "./defaultSettings.min.js";
import { language } from "./language.min.js";
let namespace = "TeamWatch3";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
window.onerror = function () {
  document.querySelector("header").innerText = `遇到了意料之外的错误。 
${JSON.stringify(arguments[0])}
${JSON.stringify(arguments[1])}
${JSON.stringify(arguments[2])}
${JSON.stringify(arguments[3])}
`;
};
let settings = Object.assign(JSON.parse(JSON.stringify(defaultSettings)), load("settings", {}), { share: {} });
settings.style = Object.assign(JSON.parse(JSON.stringify(defaultSettings)).style, load("settings", {}).style);
let old = localStorage.getItem("teamWatch");
if (old && !localStorage.getItem("TeamWatch3")) {
  //导入旧数据
  console.log("从旧版本继承了监控技能");
  old = JSON.parse(old);
  settings = Object.assign(JSON.parse(JSON.stringify(defaultSettings)), { watchs: convertOldWatchs(old.watch) });
  try {
    settings.ttsOn = old.TTSOn || settings.ttsOn;
    settings.tts = old.TTS || settings.tts;
  } catch {}
  save("settings", settings);
}
let nav = document.createElement("ul");
let skinList = { "FFXIV原生": "default", "Material-UI(BLACK)": "Material-UI-BLACK", "Material-UI(DISCORD)": "Material-UI-DISCORD" };
let urlList = { cafemaker: "https://cafemaker.wakingsands.com/i/", XIVAPI: "https://xivapi.com/i/" };
if (settings.style.skin === "material") settings.style.skin = "Material-UI-DISCORD";
for (const key in settings) {
  if (key === "ttsOn" || language[key] === undefined) continue;
  let li = document.createElement("li");
  li.title = key;
  if (language[key]) li.innerText = language[key][settings.language] || key;
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
      input.onkeypress = () => /[\d\.]/.test(String.fromCharCode(event.keyCode));
      input.title = key;
      input.value = settings.style[key];
      switch (key) {
        case "scale":
          input.setAttribute("min", "0");
          input.setAttribute("max", "1");
          input.setAttribute("step", "0.05");
          // input.onkeypress = () => false;
          break;
        case "opacity":
          input.setAttribute("min", "0");
          input.setAttribute("max", "1");
          input.setAttribute("step", "0.05");
          break;
        case "fontSize":
          input.setAttribute("min", "12");
          // input.onkeypress = () => false;
          break;
        case "xSpace":
          input.setAttribute("min", "-50");
          input.setAttribute("max", "50");
          input.onkeypress = () => false;
          break;
        case "ySpace":
          input.setAttribute("min", "-44");
          input.setAttribute("max", "44");
          input.onkeypress = () => false;
          break;
        case "refreshRate":
          input.setAttribute("step", "37");
          // input.onkeypress = () => false;
          break;
        default:
          break;
      }
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
      } else if (key === "hideYourself") {
        for (const key of ["False", "True"]) {
          let option = document.createElement("option");
          option.value = key;
          option.innerText = key;
          input.appendChild(option);
        }
      } else if (key === "fontColor") {
        for (const key of [
          "AliceBlue",
          "AntiqueWhite",
          "Aqua",
          "Aquamarine",
          "Azure",
          "Beige",
          "Bisque",
          "Black",
          "BlanchedAlmond",
          "Blue",
          "BlueViolet",
          "Brown",
          "BurlyWood",
          "CadetBlue",
          "Chartreuse",
          "Chocolate",
          "Coral",
          "CornflowerBlue",
          "Cornsilk",
          "Crimson",
          "Cyan",
          "DarkBlue",
          "DarkCyan",
          "DarkGoldenRod",
          "DarkGray",
          "DarkGreen",
          "DarkKhaki",
          "DarkMagenta",
          "DarkOliveGreen",
          "DarkOrange",
          "DarkOrchid",
          "DarkRed",
          "DarkSalmon",
          "DarkSeaGreen",
          "DarkSlateBlue",
          "DarkSlateGray",
          "DarkTurquoise",
          "DarkViolet",
          "DeepPink",
          "DeepSkyBlue",
          "DimGray",
          "DodgerBlue",
          "FireBrick",
          "FloralWhite",
          "ForestGreen",
          "Fuchsia",
          "Gainsboro",
          "GhostWhite",
          "Gold",
          "GoldenRod",
          "Gray",
          "Green",
          "GreenYellow",
          "HoneyDew",
          "HotPink",
          "IndianRed ",
          "Indigo ",
          "Ivory",
          "Khaki",
          "Lavender",
          "LavenderBlush",
          "LawnGreen",
          "LemonChiffon",
          "LightBlue",
          "LightCoral",
          "LightCyan",
          "LightGoldenRodYellow",
          "LightGray",
          "LightGreen",
          "LightPink",
          "LightSalmon",
          "LightSeaGreen",
          "LightSkyBlue",
          "LightSlateGray",
          "LightSteelBlue",
          "LightYellow",
          "Lime",
          "LimeGreen",
          "Linen",
          "Magenta",
          "Maroon",
          "MediumAquaMarine",
          "MediumBlue",
          "MediumOrchid",
          "MediumPurple",
          "MediumSeaGreen",
          "MediumSlateBlue",
          "MediumSpringGreen",
          "MediumTurquoise",
          "MediumVioletRed",
          "MidnightBlue",
          "MintCream",
          "MistyRose",
          "Moccasin",
          "NavajoWhite",
          "Navy",
          "OldLace",
          "Olive",
          "OliveDrab",
          "Orange",
          "OrangeRed",
          "Orchid",
          "PaleGoldenRod",
          "PaleGreen",
          "PaleTurquoise",
          "PaleVioletRed",
          "PapayaWhip",
          "PeachPuff",
          "Peru",
          "Pink",
          "Plum",
          "PowderBlue",
          "Purple",
          "Red",
          "RosyBrown",
          "RoyalBlue",
          "SaddleBrown",
          "Salmon",
          "SandyBrown",
          "SeaGreen",
          "SeaShell",
          "Sienna",
          "Silver",
          "SkyBlue",
          "SlateBlue",
          "SlateGray",
          "Snow",
          "SpringGreen",
          "SteelBlue",
          "Tan",
          "Teal",
          "Thistle",
          "Tomato",
          "Turquoise",
          "Violet",
          "Wheat",
          "White",
          "WhiteSmoke",
          "Yellow",
          "YellowGreen",
        ]) {
          let option = document.createElement("option");
          option.value = key;
          option.innerText = key;
          option.style.color = key;
          input.appendChild(option);
        }
        input.onchange = () => {
          input.style.color = input.value;
        };
        input.style.color = settings.style.fontColor;
        input.style.textShadow = "-1px 0 3px #000, 0 1px 3px #000, 1px 0 3px #000, 0 -1px 3px #000";
        input.style.background = "#DCDCDC";
      }
      input.value = settings.style[key];
    }
    li.appendChild(input);
    styleOptions.appendChild(li);
  } else {
    console.log(`${key}被跳过了`);
  }
}
document.querySelector("#style").appendChild(styleOptions);
//监控列表
let stepInputText = document.createElement("span");
stepInputText.innerText = language.stepInputText[settings.language];
document.querySelector("#watchs").appendChild(stepInputText);
let stepInput = document.createElement("input");
stepInput.setAttribute("type", "number");
stepInput.setAttribute("step", "0.5");
stepInput.value = 22;
stepInput.id = "stepInput";
document.querySelector("#watchs").appendChild(stepInput);
let unifiedScale = document.createElement("div");
unifiedScale.innerText = language.unifiedScale[settings.language];
let per50 = document.createElement("button");
per50.innerText = "S";
per50.classList.add("unifiedScalePer");
per50.onclick = () => toUnifiedScale(0.5);
let per75 = document.createElement("button");
per75.innerText = "M";
per75.classList.add("unifiedScalePer");
per75.value = 0.75;
per75.onclick = () => toUnifiedScale(0.75);
let per100 = document.createElement("button");
per100.innerText = "L";
per100.classList.add("unifiedScalePer");
per100.value = 1;
per100.onclick = () => toUnifiedScale(1);
unifiedScale.appendChild(per50);
unifiedScale.appendChild(per75);
unifiedScale.appendChild(per100);
document.querySelector("#watchs").appendChild(unifiedScale);
let ckboxText = document.createElement("span");
ckboxText.innerText = language.ckboxText[settings.language];
document.querySelector("#watchs").appendChild(ckboxText);
let ckbox = document.createElement("input");
ckbox.setAttribute("type", "checkbox");
ckbox.checked = true;
ckbox.id = "ckboxBeforeDelete";
document.querySelector("#watchs").appendChild(ckbox);
let watchOptions = document.createElement("ul");
// document.oncontextmenu = () => false;
let pos = {};
[...settings.partySort.Tank, ...settings.partySort.Healer, ...settings.partySort.Dps, "1", "2", "3", "4", "5", "6", "7", "26", "29"].forEach((element) => {
  const watch = settings.watchs.find((watch) => watch.job === element);
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
      let mostRight = [].slice
        .call(li.querySelectorAll("article"))
        .reduce((pre, value) => (parseInt(pre.style.right) > parseInt(value.style.right) ? pre : value), { style: { right: -44 } });
      art.style.right = parseInt(mostRight.style.right) + 44 + "px";
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
});
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
  div.id = "ttsAddSelect";
  let input = document.createElement("input");
  input.setAttribute("placeholder", language.searchSkill[settings.language]);
  input.onchange = function () {
    // this.value
    select.innerHTML = "";
    actions
      .filter((action) => action.Name_cn.indexOf(this.value) !== -1 || action.Name_en.indexOf(this.value) !== -1 || action.Name_jp.indexOf(this.value) !== -1)
      .forEach((element) => {
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
  div.style.position = "absolute";
  div.style.top = ttsAdd.offsetTop * 1 + 40 + "px";
  div.style.left = ttsAdd.offsetLeft + "px";
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
      let ipt = JSON.parse(window.decodeURIComponent(window.atob(document.querySelector("#shareInInput").value)));
      if (ipt[1] instanceof Array) {
        save("settings", Object.assign(JSON.parse(JSON.stringify(defaultSettings)), { watchs: convertOldWatchs(ipt) }));
      } else {
        save("settings", ipt);
      }
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
function convertOldWatchs(old) {
  let result = [];
  for (const key in old) {
    old[key].reverse();
    let watch = {};
    watch.job = key;
    let w = [];
    let i = 0;
    for (const id of old[key]) {
      if (id !== "") w.push({ id: id, scale: "1", top: "0px", right: 44 * i + "px" });
      i++;
    }
    watch.watch = w;
    result.push(watch);
  }
  return result;
}

function insertTTS(key, value) {
  if (!parseInt(key) > 0) return;
  let div = document.createElement("div");
  div.classList.add("ttsSkill");
  try {
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
  } catch {
    console.log(`导入TTS时：未找到key=${key},value=${value}的action，已跳过此项。`);
  }
}

function insertWatch(art, action, li) {
  if (art.style.transform === "") art.style.transform = "scale(1)";
  art.style.width = "48px";
  art.style.height = art.style.width;
  art.style.lineHeight = art.style.height;
  art.style.background = `url(./resources/${settings.style.skin}/icon.png),url(${settings.style.url}${action.Url}.png) center / 40px 40px no-repeat `;
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
  art.ondrag = function (e) {
    let s = this.style.transform.replace(/[^0-9\.]/gi, "");
    let space = document.querySelector("#stepInput").value * s;
    this.style.right = Math.min(Math.max(Math.round((parseInt(pos.right) - parseInt(e.x - pos.x)) / space) * space, 0), document.body.clientWidth - 150) + "px";
    this.style.top = Math.min(Math.max(Math.round((parseInt(pos.top) + parseInt(e.y - pos.y)) / space) * space, 0), (1 - s) * 44) + "px";
  };
  li.ondragover = (e) => e.preventDefault();
  art.ondragend = function (e) {
    let s = this.style.transform.replace(/[^0-9\.]/gi, "");
    let space = document.querySelector("#stepInput").value * s;
    this.style.right = Math.min(Math.max(Math.round((parseInt(pos.right) - parseInt(e.x - pos.x)) / space) * space, 0), document.body.clientWidth - 150) + "px";
    this.style.top = Math.min(Math.max(Math.round((parseInt(pos.top) + parseInt(e.y - pos.y)) / space) * space, 0), (1 - s) * 44) + "px";
  };
  let aside = document.createElement("aside");
  aside.innerText = "X";
  aside.onclick = function () {
    if (!document.querySelector("#ckboxBeforeDelete").checked || confirm(`要删除${aside.parentNode.title}吗？`)) this.parentNode.remove();
  };
  let zp50 = document.createElement("button");
  zp50.innerText = "S";
  zp50.classList.add("zp");
  zp50.classList.add("zp-left");
  zp50.onclick = function () {
    art.style.transform = `scale(0.5)`;
    art.style.top = "0px";
  };
  let zp75 = document.createElement("button");
  zp75.innerText = "M";
  zp75.classList.add("zp");
  zp75.classList.add("zp-mid");
  zp75.onclick = function () {
    art.style.transform = `scale(0.75)`;
    art.style.top = "0px";
  };
  let zp100 = document.createElement("button");
  zp100.innerText = "L";
  zp100.classList.add("zp");
  zp100.classList.add("zp-right");
  zp100.onclick = function () {
    art.style.transform = `scale(1)`;
    art.style.top = "0px";
  };
  art.appendChild(zp50);
  art.appendChild(zp75);
  art.appendChild(zp100);
  art.appendChild(aside);
  li.appendChild(art);
}
function toUnifiedScale(per) {
  if (confirm(language.confirmPer[settings.language] + per * 100 + "%"))
    document.querySelectorAll("#watchs > ul > li> article").forEach((art) => (art.style.transform = "scale(" + per + ")"));
}
