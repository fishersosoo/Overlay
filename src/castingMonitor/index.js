"use strict";
import { getAction } from "../../resources/data/actions.js";
import { getJobByID } from "../../resources/data/job";
import { logProcessing } from "../../resources/function/logProcessing.js";
import { items } from "../../resources/data/item.js";
import "../../resources/function/xianyu.js";
import "../../resources/function/loadComplete.js";
import "./index.scss";
import iconSrc from "./icon.png";
document.body.appendChild(document.createElement("header"));
document.body.appendChild(document.createElement("main"));
let targetID, playerID, timer;
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
document.body.style.backgroundColor = `rgba(5,5,5,${getUrlParam("bgOpacity") || 0.25})`;
const header = document.querySelector("header");
addOverlayListener("ChangePrimaryPlayer", (e) => {
  playerID = e.charID.toString(16).toUpperCase();
  targetID = playerID.toString();
});
addOverlayListener("PartyChanged", (e) => {
  document.body.style.display = "block";
  header.innerHTML = "";
  targetID = playerID.toString();
  // e.party = [
  //   { id: "1002E5AA", name: "A", job: 38, inParty: true },
  //   { id: "10000002", name: "B", job: 32, inParty: true },
  //   { id: "10000003", name: "C", job: 33, inParty: true },
  //   { id: "10000004", name: "D", job: 28, inParty: true },
  //   { id: "10000005", name: "E", job: 30, inParty: true },
  //   { id: "10000006", name: "F", job: 20, inParty: true },
  //   { id: "10000007", name: "G", job: 25, inParty: true },
  //   { id: "10000008", name: "H", job: 19, inParty: true },
  // ];
  if (e.party.length > 0) {
    for (const p of e.party) {
      if (!p.inParty) break;
      const member = document.createElement("article");
      member.innerText = getJobByID(p.job)?.simple2 ?? "??";
      member.setAttribute("data-id", p.id);
      member.title = p.name;
      member.addEventListener("click", function () {
        clearCasting();
        if (targetID === this.getAttribute("data-id")) {
          document.querySelectorAll("header>article").forEach((dom) => {
            dom.classList.remove("selecting");
            if (dom.innerText === "YOU") dom.classList.add("selecting");
          });
          targetID = playerID.toString();
        } else {
          document.querySelectorAll("header>article").forEach((dom) => dom.classList.remove("selecting"));
          this.classList.add("selecting");
          targetID = this.getAttribute("data-id");
        }
      });
      if (p.id === playerID) {
        member.innerText = "YOU";
        member.classList.add("selecting");
        targetID = p.id;
      }
      header.appendChild(member);
    }
  }
});
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "20" || e.line[0] === "21" || (e.line[0] === "22" && e.line[45] === "0")) {
    let l = logProcessing(e.line, "action");
    if (l.casterID === targetID) {
      let section = document.createElement("section");
      let action = getAction(parseInt(l.actionID, 16));
      section.setAttribute("data-action-name", l.actionName);
      if (action.ActionCategory === "自动攻击") {
        section.classList.add("AA");
      } else {
        const img = new Image();
        const cafeUrl = `https://cafemaker.wakingsands.com/i/${action?.Url}.png`;
        const xivapiUrl = `https://xivapi.com/i/${action?.Url}.png`;
        function checkImgExists(imgurl) {
          return new Promise(function (resolve, reject) {
            var ImgObj = new Image();
            ImgObj.src = imgurl;
            ImgObj.onload = (res) => resolve(res);
            ImgObj.onerror = (err) => reject(err);
          });
        }
        checkImgExists(cafeUrl)
          .then(() => {
            img.src = `${cafeUrl}`;
          })
          .catch(() => {
            img.src = `${xivapiUrl}`;
          });
        if (e.line[0] === "20") {
          section.classList.add("casting");
        } else {
          clearCasting();
          if (action.ActionCategory === "能力") section.classList.add("oGCD");
        }
        let icon = new Image();
        icon.src = iconSrc;
        icon.style.top = "-4px";
        icon.style.left = "-4px";
        section.appendChild(img);
        section.appendChild(icon);
      }
      document.querySelector("main").appendChild(section);
      document.body.style.display = "block";
      clearTimeout(timer);
      if (getUrlParam("autoHideTime") !== "0") autoHide();
      setTimeout(() => {
        section.remove();
      }, 30000);
    }
  } else if (e.line[0] === "23" && e.line[2] === targetID) {
    clearCasting();
    // lastStartCasting?.remove();
  }
});
startOverlayEvents();
autoHide();
function clearCasting() {
  document.querySelectorAll(".casting").forEach((value) => value?.remove());
}

function autoHide() {
  timer = setTimeout(() => {
    document.body.style.display = "none";
  }, Math.max(parseInt(getUrlParam("autoHideTime")), 10000) || 30000);
}
