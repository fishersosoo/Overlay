/*
 * @Author: Souma
 * @LastEditTime: 2021-10-02 06:40:57
 */
"use strict";
import { logProcessing } from "../../../resources/function/logProcessing.js";
import { TTS } from "../../../resources/function/TTS.js";
let player = "";
let status = {};
let aggroListLength = 0;
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
addOverlayListener("ChangePrimaryPlayer", (e) => (player = e.charID.toString(16).toUpperCase()));
addOverlayListener("EnmityAggroList", (e) => {
  let ul = document.querySelector("main ul");
  ul.innerHTML = "";
  aggroListLength = e.AggroList.length;
  e.AggroList.forEach((enemy) => {
    if (!!status[enemy.ID]) {
      let li = document.createElement("li");
      let hp = document.createElement("meter");
      hp.value = enemy.CurrentHP / enemy.MaxHP;
      li.setAttribute("data-id", enemy.ID);
      li.setAttribute("data-name", enemy.Name);
      li.classList.add(`isCurrentTarget-${enemy.isCurrentTarget}`);
      li.appendChild(hp);
      let article = document.createElement("article");
      article.innerText = enemy.Name;
      li.appendChild(article);
      let aside = document.createElement("aside");
      aside.innerText = parseInt((enemy.CurrentHP / enemy.MaxHP) * 100) + "%";
      li.appendChild(aside);
      let time = document.createElement("progress");
      time.value = 1 - (Date.now() - status[enemy.ID].gains) / status[enemy.ID].duration;
      li.append(time);
      let cd = document.createElement("span");
      cd.innerText = Math.max((status[enemy.ID].gains + status[enemy.ID].duration - Date.now()) / 1000, 0).toFixed(2);
      li.append(cd);
      if (getUrlParam("cdOnly") === "true") {
        for (const dom of [hp, article, aside]) dom.style.display = "none";
        time.style.left = 0;
        cd.style.left = 0;
      }
      ul.append(li);
    }
  });
});
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "26") {
    let l = logProcessing(e.line, "status");
    if (player == l["casterID"] && l["statusTime"] >= 15) {
      if (status[parseInt(l["targetID"], 16)]) clearTimeout(status[parseInt(l["targetID"], 16)].timer);
      status[parseInt(l["targetID"], 16)] = {
        gains: Date.now(),
        duration: l["statusTime"] * 1000,
      };
      status[parseInt(l["targetID"], 16)].timer = setTimeout(() => {
        if ((getUrlParam("tts") || "false") === "true" && aggroListLength < 3) TTS("续毒");
      }, (l["statusTime"] - (getUrlParam("time") || 3)) * 1000);
    }
  }
});
addOverlayListener("ChangeZone", () => wipe());
addOverlayListener("onPartyWipe", () => wipe());
startOverlayEvents();
let wipe = () => {
  for (const key in status) clearTimeout(status[key].timer);
  status = {};
};
