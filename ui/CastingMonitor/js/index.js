/*
 * @Author: Souma
 * @LastEditTime: 2021-10-16 23:35:31
 */
"use strict";
import { actions } from "../../../resources/data/actions.js";
import { logProcessing } from "../../../resources/function/logProcessing.js";
import { items } from "../../../resources/data/item.js";
let party,
  player,
  timer,
  lock = { ID: null, Name: null };
document.body.style.display = "none";
addOverlayListener("PartyChanged", (e) => (party = e.party || party));
addOverlayListener("ChangePrimaryPlayer", (e) => (player = e.charID.toString(16).toUpperCase()));
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "21" || (e.line[0] === "22" && e.line[45] === "0")) {
    let l = logProcessing(e.line, "action");
    if (l.casterID === lock.ID || (lock.ID === null && l.casterID === player)) {
      let section = document.createElement("section");
      if (l.actionID === "07") {
        section.classList.add("AA");
      } else {
        let img = document.createElement("img");
        let action = actions[parseInt(l.actionID, 16).toString()];
        img.setAttribute(
          "src",
          "https://cafemaker.wakingsands.com/i/" +
            (l.actionName.indexOf("Item_") === 0
              ? (
                  items[parseInt(e.line[5].substr(5, 5), 16) - (e.line[5].substr(5, 1) === "F" ? 1000000 : 0)] || {
                    Url: "000000/000405",
                  }
                ).Url
              : (action || { Url: "000000/000405" }).Url) +
            ".png"
        );
        img.setAttribute("alt", l.actionName);
        section.classList.add((action || { ActionCategory: "能力" }).ActionCategory === "能力" ? "oGCD" : "GCD");
        section.append(img);
      }
      let icon = document.createElement("img");
      icon.setAttribute("src", "../../../resources/img/icon.png");
      icon.classList.add("icon");
      section.append(icon);
      document.querySelector("main").appendChild(section);
      document.body.style.display = "block";
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.style.display = "none";
      }, 30000);
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
  lock = { ID: span.getAttribute("data-id"), Name: span.getAttribute("data-name") };
};
addOverlayListener("EnmityTargetData", (e) => {
  if (e.Target !== null) {
    let tarID = e.Target.ID.toString(16).toUpperCase();
    if (isLock) {
      aside.innerText = "";
      span.innerText = lock.Name;
    } else if (!isLock && tarID.substr(0, 1) === "1" && tarID !== player) {
      aside.innerText = `当前目标:${lock.Name === null ? "YOU" : lock.Name},点击这里切换为:`;
      span.innerText = e.Target.Name;
      span.setAttribute("data-name", e.Target.Name);
      span.setAttribute("data-id", tarID);
    } else {
      aside.innerText = "";
      if (isLock) {
        span.innerText = lock.Name;
      } else {
        span.innerText = "";
        lock = { ID: null, Name: null };
      }
    }
  } else {
    aside.innerText = "";
    if (isLock) {
      span.innerText = lock.Name;
    } else {
      span.innerText = "";
      lock = { ID: null, Name: null };
    }
  }
});
startOverlayEvents();
