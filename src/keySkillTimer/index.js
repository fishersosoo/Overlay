"use strict";

import { getAction } from "../../resources/data/actions.js";
import { compareSame } from "../../resources/function/compareSameGroup.js";
import "../../resources/function/loadComplete.js";
import { logProcessing } from "../../resources/function/logProcessing.js";
import { TTS } from "../../resources/function/TTS.js";
import "../../resources/function/xianyu.js";
import "./index.scss";
import { raidBuffs } from "./raidbuffs.js";
import { levels } from "../../resources/function/getLevels.js";

let params = new URLSearchParams(new URL(window.location).search);
let timers = [];
let party = [];
let youID = null;
let inFaker = true;

addOverlayListener("ChangePrimaryPlayer", (e) => (youID = e.charID.toString(16).toUpperCase()));
addOverlayListener("PartyChanged", (e) => {
  party = e.party || [];
  if (!inFaker) show(party);
});
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "21" || (e.line[0] === "22" && e.line[45] === "0")) {
    let log = logProcessing(e.line, "action");
    let actionID = parseInt(log["actionID"], 16);
    if (party.some((p) => p.inParty && p.id === log["casterID"]) && raidBuffs[actionID]) {
      document.querySelector(`article[data-from="${log["casterID"]}-${compareSame(actionID)}"]`)?.use();
      doTTS(actionID)
    } else if (log["casterID"] === youID && raidBuffs[actionID] !== undefined) {
      doTTS(actionID);
    }
  }

  function doTTS(actionID) {
    if ((raidBuffs[actionID]?.type === "0" && params.get("dajinengTTS") !== "false") ||
      (raidBuffs[actionID]?.type === "1" && params.get("tuanfuTTS") !== "false")) {
      TTS(raidBuffs[actionID]?.tts);
    }
  }
});
addOverlayListener("ChangeZone", () => document.querySelectorAll("article").forEach((element) => element.cancel()));
addOverlayListener("onPartyWipe", () => document.querySelectorAll("article").forEach((element) => element.cancel()));
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    inFaker = false;
    show(party);
  } else {
    inFaker = true;
    faker();
  }
});
startOverlayEvents();
function faker() {
  show([
    { id: "0", name: "A", job: 19, inParty: true },
    { id: "0", name: "A", job: 20, inParty: true },
    { id: "0", name: "A", job: 21, inParty: true },
    { id: "0", name: "A", job: 22, inParty: true },
    { id: "0", name: "A", job: 23, inParty: true },
    { id: "0", name: "A", job: 24, inParty: true },
    { id: "0", name: "A", job: 25, inParty: true },
    { id: "0", name: "A", job: 27, inParty: true },
    { id: "0", name: "A", job: 28, inParty: true },
    { id: "0", name: "A", job: 30, inParty: true },
    { id: "0", name: "A", job: 31, inParty: true },
    { id: "0", name: "A", job: 32, inParty: true },
    { id: "0", name: "A", job: 33, inParty: true },
    { id: "0", name: "A", job: 34, inParty: true },
    { id: "0", name: "A", job: 35, inParty: true },
    { id: "0", name: "A", job: 36, inParty: true },
    { id: "0", name: "A", job: 37, inParty: true },
    { id: "0", name: "A", job: 38, inParty: true },
    { id: "0", name: "A", job: 39, inParty: true },
    { id: "0", name: "A", job: 40, inParty: true },
  ]);
}
function show(party) {
  const main = document.querySelector("body>main");
  main.innerHTML = "";
  main.nextElementSibling.innerHTML = "";
  for (const p of party) {
    if (!p.inParty && params.get("inPartyOnly") !== "false") break;
    for (const key in raidBuffs) {
      const element = raidBuffs[key];
      if (element.job.indexOf(p.job) > -1) {
        let art = document.createElement("article");
        const action = getAction(key, levels[p.id]?.level ?? 999);
        art.style.order = element.order;
        art.classList.add("useful_" + action.Useful);
        art.setAttribute("data-from", `${p.id}-${key}`);
        let aside = document.createElement("aside");
        aside.setAttribute("data-recast", element.recast1000ms);
        aside.setAttribute("data-duration", element.duration);
        aside.innerText = "";
        art.append(aside);
        let section = document.createElement("section");
        section.style.backgroundImage = `url(https://souma.diemoe.net/resources/icon/${action?.Url ?? "000000/000405"}.png)`;
        art.append(section);
        let shadow = document.createElement("div");
        shadow.classList.add("shadow");
        art.append(shadow);
        document.querySelector(element.type === 0 ? "body > main" : "body > div").append(art);
        art.use = function () {
          let recast = aside.getAttribute("data-recast");
          let time = parseInt(recast);
          let duration = aside.getAttribute("data-duration");
          aside.innerText = duration;
          clearInterval(art.timer);
          if (duration === "0") {
            shadow.style.clipPath = `inset(0 0 0 0)`;
            aside.innerText = time;
          } else {
            aside.style.color = "gold";
          }
          let i = 0;
          art.timer = setInterval(() => {
            time -= 0.25;
            i++;
            if (time > recast - duration) {
              if (i % 4 === 0) aside.innerText = parseInt(duration - (recast - time));
              shadow.style.clipPath = `inset(${100 - ((recast - time) / duration) * 100}% 0 0 0)`;
            } else {
              if (i % 4 === 0) {
                aside.innerText = parseInt(time);
                aside.style.color = "white";
              }
              shadow.style.clipPath = `inset(${100 - (time / (recast - duration)) * 100}% 0 0 0)`;
            }
            if (time <= 0) art.cancel();
          }, 250);
          timers.push(art.timer);
        };
        // art.use();
        art.cancel = () => {
          clearInterval(art.timer);
          aside.innerText = "";
          shadow.style.clipPath = `inset(100% 0 0 0)`;
        };
      }
    }
  }
}
