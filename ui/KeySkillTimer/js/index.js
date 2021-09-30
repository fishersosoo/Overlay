/*
 * @Author: Souma
 * @LastEditTime: 2021-09-30 15:17:57
 */
"use strict";
import { actions } from "../../../resources/data/actions.js";
import { jobList } from "../../../resources/data/job.js";
import { compareSame } from "../../../resources/function/compareSameGroup.min.js";
import { logProcessing } from "../../../resources/function/logProcessing.js";
import { TTS } from "../../../resources/function/TTS.js";
let raidBuffs = {
  118: { name: "战歌", duration: "20", order: -11 },
  2258: { name: "背刺", duration: "15", order: -10 },
  3557: { name: "连祷", duration: "20", order: -9 },
  7396: { name: "义结金兰", duration: "15", order: -8 },
  7398: { name: "龙肠", duration: "20", order: -7 },
  7423: { name: "灵护", duration: "15", order: -6 },
  7436: { name: "连环计", duration: "15", order: -5 },
  7520: { name: "鼓励", duration: "20", order: -4 },
  16196: { name: "技巧舞", duration: "20", order: -3 },
  16011: { name: "探戈", duration: "20", order: -2 },
  16552: { name: "占卜", duration: "15", order: -1 },
  30: { name: "无敌", duration: "10", order: 1 },
  43: { name: "死斗", duration: "8", order: 2 },
  140: { name: "天赐", duration: "0", order: 3 },
  3540: { name: "幕帘", duration: "30", order: 4 },
  3638: { name: "行尸走肉", duration: "10", order: 5 },
  16152: { name: "超火流星", duration: "8", order: 6 },
};
let timers = [];
let party = [];
addOverlayListener("PartyChanged", (e) => {
  party = e.party || [];
  // party = [
  //   { id: "1039CE69", name: "A", job: 38, inParty: true },
  //   { id: "10000002", name: "B", job: 32, inParty: true },
  //   { id: "10000003", name: "C", job: 33, inParty: true },
  //   { id: "10000004", name: "D", job: 28, inParty: true },
  //   { id: "10000005", name: "E", job: 30, inParty: true },
  //   { id: "10000006", name: "F", job: 20, inParty: true },
  //   { id: "10000007", name: "G", job: 25, inParty: true },
  //   { id: "10000008", name: "H", job: 19, inParty: true },
  // ];
  document.body.innerHTML = "<main></main><div></div>";
  show(party);
});
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "21" || e.line[0] === "22") {
    let l = logProcessing(e.line, "action");
    if (party.some((p) => p.inParty && p.id === l["casterID"])) {
      let d = document.querySelector(`article[data-from="${l["casterID"]}-${compareSame(parseInt(l["actionID"], 16))}"]`);
      if (d !== null) d.use();
      // d?.use();
    }
  }
});
addOverlayListener("ChangeZone", () => document.querySelectorAll("article").forEach((element) => element.cancel()));
addOverlayListener("onPartyWipe", () => document.querySelectorAll("article").forEach((element) => element.cancel()));
startOverlayEvents();
function show(party) {
  for (const p of party) {
    if (!p.inParty) break;
    for (const action of actions.filter(
      (action) => !!raidBuffs[action.ID] && new RegExp(`(^| )${jobList.find((j) => j.ID.toString() === p.job.toString()).cn}($| )`).test(action.ClassJobCategory)
    )) {
      let art = document.createElement("article");
      art.style.order = raidBuffs[action.ID].order;
      art.setAttribute("data-from", `${p.id}-${action.ID}`);
      let aside = document.createElement("aside");
      aside.setAttribute("data-recast", action.Recast100ms / 10);
      aside.setAttribute("data-duration", raidBuffs[action.ID].duration);
      aside.innerText = "Ready";
      art.append(aside);
      let section = document.createElement("section");
      section.style.backgroundImage = `url(https://cafemaker.wakingsands.com/i/${action.Url}.png)`;
      art.append(section);
      let shadow = document.createElement("div");
      shadow.classList.add("shadow");
      art.append(shadow);
      document.querySelector(art.style.order > 0 ? "body > main" : "body > div").append(art);
      art.use = function () {
        TTS(raidBuffs[action.ID].name);
        let recast = aside.getAttribute("data-recast");
        let time = parseInt(recast);
        let duration = aside.getAttribute("data-duration");
        aside.innerText = duration;
        art.classList.add("use");
        clearInterval(art.timer);
        aside.style.color = "gold";
        art.timer = setInterval(() => {
          aside.innerText = duration;
          if (time > recast - duration) {
            aside.innerText = duration - (recast - --time);
            shadow.style.clipPath = `inset(${100 - ((recast - time) / duration) * 100}% 0 0 0)`;
          } else {
            aside.innerText = --time - duration;
            shadow.style.clipPath = `inset(${100 - (time / (recast - duration)) * 100}% 0 0 0)`;
            aside.style.color = "white";
          }
          if (time === 0) art.cancel();
        }, 1000);
        timers.push(art.timer);
      };
      // art.onclick = () => art.use();
      art.cancel = () => {
        clearInterval(art.timer);
        art.classList.remove("use");
        aside.innerText = "Ready";
        shadow.style.clipPath = `inset(100% 0 0 0)`;
      };
    }
  }
}
