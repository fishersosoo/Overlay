/*
 * @Author: Souma
 * @LastEditTime: 2021-10-04 12:55:55
 */
"use strict";
import { actions } from "../../../resources/data/actions.js";
import { logProcessing } from "../../../resources/function/logProcessing.js";
let party,
  player,
  lock = { ID: null, Name: null };
addOverlayListener("PartyChanged", (e) => (party = e.party || party));
addOverlayListener("ChangePrimaryPlayer", (e) => (player = e.charID.toString(16).toUpperCase()));
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "21" || e.line[0] === "22") {
    let l = logProcessing(e.line, "action");
    if (l.casterID === lock.ID || (lock.ID === null && l.casterID === player)) {
      let section = document.createElement("section");
      if (l.actionID === "07") {
        section.classList.add("AA");
      } else {
        let img = document.createElement("img");
        let action = actions.find((action) => action.ID === parseInt(l.actionID, 16).toString());
        img.setAttribute("src", "https://cafemaker.wakingsands.com/i/" + (action || { Url: "000000/000405" }).Url + ".png");
        img.setAttribute("alt", l.actionName);
        section.classList.add((action || { ActionCategory: "能力" }).ActionCategory === "能力" ? "oGCD" : "GCD");
        section.append(img);
      }
      let icon = document.createElement("img");
      icon.setAttribute("src", "../../../resources/img/icon.png");
      icon.classList.add("icon");
      section.append(icon);
      document.querySelector("main").appendChild(section);
      setTimeout(() => {
        section.remove();
      }, 15000);
    }
  }
});
let aside = document.querySelector("header>aside");
let span = document.querySelector("header>span");
let isLock = false;
document.querySelector("header").onclick = () => {
  isLock = !isLock;
  lock = { ID: span.innerText, Name: span.getAttribute("data-id") };
};
addOverlayListener("EnmityTargetData", (e) => {
  if (!isLock && e.Target) {
    let tarID = e.Target.ID.toString(16).toUpperCase();
    if (tarID.substr(0, 1) === "1" && tarID !== player) {
      aside.innerText = "点击监控:";
      span.innerText = e.Target.Name;
      span.setAttribute("data-id", tarID);
    }
  } else if (isLock) {
    aside.innerText = "当前目标:";
    span.innerText = lock.Name;
  } else {
    aside.innerText = "玩家";
    span.innerText = "";
    lock = { ID: null, Name: null };
  }
});
startOverlayEvents();
