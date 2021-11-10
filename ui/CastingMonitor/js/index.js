/*
 * @Author: Souma
 * @LastEditTime: 2021-11-11 00:01:21
 */
"use strict";
import { actions } from "../../../resources/data/actions.min.js";
import { logProcessing } from "../../../resources/function/logProcessing.min.js";
import { items } from "../../../resources/data/item.min.js";
let party,
  player,
  timer,
  lock = { ID: null, Name: null },
  lastStartCasting;
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
document.body.style.backgroundColor = `rgba(5,5,5,${getUrlParam("bgOpacity") || 0.25})`;
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    document.querySelector("#readMe").setAttribute("hidden", true);
    document.body.style.display = "none";
  } else {
    document.querySelector("#readMe").removeAttribute("hidden");
  }
});
addOverlayListener("PartyChanged", (e) => (party = e.party || party));
addOverlayListener("ChangePrimaryPlayer", (e) => (player = e.charID.toString(16).toUpperCase()));
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "20" || e.line[0] === "21" || (e.line[0] === "22" && e.line[45] === "0")) {
    let l = logProcessing(e.line, "action");
    if (l.casterID === lock.ID || (lock.ID === null && l.casterID === player)) {
      let section = document.createElement("section");
      let action = actions[parseInt(l.actionID, 16).toString()];
      action = action || {
        Url: "000000/000405",
        ActionCategory: "能力",
      };
      if (action.ActionCategory === "自动攻击") {
        section.classList.add("AA");
      } else {
        let img = document.createElement("img");
        img.setAttribute(
          "src",
          `https://cafemaker.wakingsands.com/i/${
            (
              (l.actionName.indexOf("Item_") === 0
                ? items[parseInt(e.line[5].substr(5, 5), 16) - (e.line[5].substr(5, 1) === "F" ? 1000000 : 0)]
                : action) || { Url: "000000/000405" }
            ).Url
          }.png`
        );
        img.onerror = function () {
          this.src = this.src.replace(`https://cafemaker.wakingsands.com/`, `https://xivapi.com/`);
        };
        img.setAttribute("alt", l.actionName);
        if (e.line[0] === "20") {
          section.classList.add("casting");
          lastStartCasting = section;
        } else {
          if (lastStartCasting) lastStartCasting.remove();
          section.classList.add((action || { ActionCategory: "能力" }).ActionCategory === "能力" ? "oGCD" : "GCD");
        }
        section.append(img);
      }
      let icon = document.createElement("img");
      icon.setAttribute("src", "../../../resources/img/icon.png");
      icon.classList.add("icon");
      section.append(icon);
      document.querySelector("main").appendChild(section);
      document.body.style.display = "block";
      clearTimeout(timer);
      if (getUrlParam("autoHideTime") !== "0" && !isLock) {
        timer = setTimeout(() => {
          document.body.style.display = "none";
        }, Math.max(parseInt(getUrlParam("autoHideTime")), 10000) || 60000);
      }
      setTimeout(() => {
        section.remove();
      }, 25000);
    } else if (l.casterID === player) {
      document.body.style.display = "block";
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
  if (e.Target === null) {
    aside.innerText = "";
    if (isLock) {
      span.innerText = lock.Name;
    } else {
      span.innerText = "";
      lock = { ID: null, Name: null };
    }
  } else {
    let tarID = e.Target.ID.toString(16).toUpperCase();
    if (isLock) {
      aside.innerText = "";
      span.innerText = lock.Name;
    } else if (!isLock && tarID.substr(0, 1) === "1" && tarID !== player) {
      aside.innerText = `点击这里切换为:`;
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
  }
});
startOverlayEvents();
