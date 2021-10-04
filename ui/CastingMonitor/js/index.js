/*
 * @Author: Souma
 * @LastEditTime: 2021-10-04 12:08:48
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
  switch (e.line[0]) {
    case "21":
    case "22":
      let l = logProcessing(e.line, "action");
      if (l.casterID === lock.ID || (lock.ID === null && l.casterID === player)) {
        let img = document.createElement("img");
        let action = actions.find((action) => action.ID === parseInt(l.actionID, 16).toString());
        let section = document.createElement("section");
        let icon = document.createElement("img");
        if (l.actionID !== "07") {
          img.setAttribute("src", "https://cafemaker.wakingsands.com/i/" + (action || { Url: "000000/000405" }).Url + ".png");
          img.setAttribute("alt", l.actionName);
          icon.setAttribute("src", "../../../resources/img/icon.png");
          icon.classList.add("icon");
          section.append(img);
          section.append(icon);
          section.classList.add((action || { ActionCategory: "能力" }).ActionCategory === "能力" ? "oGCD" : "GCD");
        } else {
          section.classList.add("AA");
        }
        document.querySelector("main").appendChild(section);
        setTimeout(() => {
          section.remove();
        }, 15000);
      }
  }
});
let aside = document.querySelector("header>aside");
let span = document.querySelector("header>span");
let header = document.querySelector("header");
let isLock = false;
header.onclick = () => (isLock = !isLock);
addOverlayListener("EnmityTargetData", (e) => {
  if (!isLock && e.Target) {
    aside.innerText = "点击监控:";
    span.innerText = e.Target.Name;
    lock = { ID: e.Target.ID.toString(16).toUpperCase(), Name: e.Target.Name };
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
