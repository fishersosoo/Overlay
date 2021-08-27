/*
 * @Author: Souma
 * @LastEditTime: 2021-08-27 23:48:59
 */
"use strict";
import { loadItem } from "../../../resources/localStorage.min.js";
import { TTS } from "../../../resources/TTS.js";
import { actions } from "./actions.min.js";
import { compareSame } from "./compareSameGroup.min.js";
import { defaultSettings } from "./defaultSettings.min.js";
import { jobList } from "./job.min.js";
let namespace = "TeamWatch3";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
let baseClass = {
  1: 19,
  2: 20,
  3: 21,
  4: 22,
  5: 23,
  6: 24,
  7: 25,
  26: 27,
  29: 30,
  19: 19,
  21: 21,
  32: 32,
  37: 37,
  24: 24,
  28: 28,
  33: 33,
  20: 20,
  22: 22,
  30: 30,
  34: 34,
  23: 23,
  31: 31,
  38: 38,
  25: 25,
  27: 27,
  35: 35,
  36: 36,
};
let charID = "10000021";
let party = [];
let levels = {};
let settings;
(function loadSettings() {
  settings = Object.assign(defaultSettings, load("settings", {}));
})();

function partySort(party) {
  let result = [];
  settings.partySort["when" + jobList.find((j) => j.ID.toString() === party.find((p) => p.id !== charID).job.toString()).Role]
    .split(">")
    .forEach((element) => result.push(...settings.partySort[element]));
  return party.sort((a, b) => parseInt(result.indexOf(baseClass[a.job].toString())) - parseInt(result.indexOf(baseClass[b.job].toString())));
}
addOverlayListener("ChangePrimaryPlayer", (e) => (charID = e.charID.toString(16).toUpperCase()));
addOverlayListener("onLogEvent", (e) => {
  for (const log of e.detail.logs) {
    let AddCombatant = log.match(/^.{15}03:(?<id>1.{7}):Added new combatant .+? Job:.+? Level: (?<level>\d+) Max HP/);
    let RemoveCombatant = log.match(/^.{15}04:(?<id>1.{7}):/);
    let NetworkAbility = log.match(/^.{15}1[56]:(?<id>1.{7}):[^:]+:(?<ability>[^:]+):.+:0$/);
    if (AddCombatant) {
      levels[AddCombatant.groups.id] = AddCombatant.groups.level;
    } else if (RemoveCombatant) {
      delete levels[RemoveCombatant.groups.id];
    } else if (NetworkAbility) {
      let index = party.findIndex((p) => p.id === NetworkAbility.groups.id && p.inParty === true);
      if (index >= 0) {
        let bom = document.querySelector(`[name="${index}-${compareSame(parseInt(NetworkAbility.groups.ability, 16))}"]`);
        if (bom) bom.use();
      }
    }
  }
});
function handle() {
  document.querySelector("main").innerHTML = "";
  for (let i = 0; i < party.length; i++) {
    const player = party[i];
    if (player === undefined) break;
    settings.watchs
      .find((watch) => watch.job === player.job.toString())
      .watch.forEach((skill) => {
        let action = actions.find((action) => action.ID === skill.id);
        let art = document.createElement("article");
        art.style.position = "absolute";
        art.style.top = `${(parseInt(skill.top) + 50 * i) * 0.8}px`;
        art.style.right = parseInt(skill.right) * 0.8 + "px";
        art.style.width = "48px";
        art.style.height = art.style.width;
        art.style.lineHeight = art.style.width;
        art.style.transform = `scale(${skill.scale * 0.8})`;
        setTimeout(() => {
          if (action.IsRoleAction !== "TRUE" && parseInt(action.ClassJobLevel) > parseInt(levels[player.id])) art.style.opacity = "0.5";
        }, 1000);
        art.style.fontSize = settings.style.fontSize + "px";
        art.setAttribute("name", i + "-" + action.ID);
        let recast100ms = action.Recast100ms instanceof Function ? action.Recast100ms(levels[player.id] ? levels[player.id] : 0) / 10 : action.Recast100ms / 10;
        art.setAttribute("reset100ms", recast100ms);
        let maxCharges = action.MaxCharges instanceof Function ? action.MaxCharges(levels[player.id] ? levels[player.id] : 0) : action.MaxCharges;
        art.style.background = `
        url(),
        url(./resources/${settings.style.skin}.png),
        url(https://cafemaker.wakingsands.com/i/${action.Url}.png) center / 40px 40px no-repeat `;
        if (maxCharges > 0) {
          art.innerText = maxCharges;
          art.style.textShadow = "-1px 0 3px rgb(197, 73, 0), 0 1px 3px rgb(197, 73, 0), 1px 0 3px rgb(197, 73, 0), 0 -1px 3px rgb(197, 73, 0)";
          art.style.fontSize = parseInt(art.style.fontSize) * 0.8 + "px";
          art.style.padding = "15px 0px 0px 30px";
        }
        art.use = function () {
          TTS(settings.tts[action.ID]);
          art.style.opacity = "1";
          if (maxCharges === "0") {
            clearInterval(art.timer);
            let url = `url(./resources/${settings.style.skin + action.ActionCategory}.png)`;
            let bgArr = art.style.background.split(",");
            bgArr[0] = `${url} 0px 0px/ 432px 432px`;
            art.style.background = bgArr.join(",");
            let now = recast100ms;
            art.timer = setInterval(() => {
              let p = 1 - now / recast100ms;
              let x = Math.floor((p * 81) % 9);
              let y = Math.floor(p * 9);
              if (!(x === 8 && y === 8)) {
                now -= settings.style.refreshRate / 1000;
                art.innerText = Math.round(now);
                bgArr[0] = `${url} ${-48 * x}px ${-48 * y}px / 432px 432px`;
                art.style.background = bgArr.join(",");
              } else {
                clearInterval(art.timer);
                art.innerText = "";
                bgArr[0] = "url()";
                art.style.background = bgArr.join(",");
              }
            }, settings.style.refreshRate);
          } else {
            art.innerText = parseInt(art.innerText) - 1;
            let bgArr = art.style.background.split(",");
            bgArr[1] = `url(./resources/${art.innerText !== "0" ? settings.style.skin : "0charges"}.png)`;
            art.style.background = bgArr.join(",");
            art.style.color = art.innerText === "0" ? "rgb(255,100,100)" : "white";
            let now = recast100ms;
            if (!art.timer) {
              art.timer = setInterval(() => {
                let p = 1 - now / recast100ms;
                let x = Math.floor((p * 81) % 9);
                let y = Math.floor(p * 9);
                if (!(x === 8 && y === 8)) {
                  now -= settings.style.refreshRate / 1000;
                  bgArr[0] = `url(./resources/charges.png) ${-48 * x}px ${-48 * y}px / 432px 432px`;
                  bgArr[1] = `url(./resources/${art.innerText !== "0" ? settings.style.skin : "0charges"}.png)`;
                  art.style.background = bgArr.join(",");
                } else {
                  clearInterval(art.timer);
                  art.timer = undefined;
                  art.innerText = parseInt(art.innerText) + 1;
                  bgArr[0] = `url(./resources/charges.png) 0px 0px/ 432px 432px`;
                  bgArr[1] = `url(./resources/${art.innerText !== "0" ? settings.style.skin : "0charges"}.png)`;
                  art.style.background = bgArr.join(",");
                  if (art.innerText === maxCharges) {
                    bgArr[1] = `url(./resources/${settings.style.skin}.png)`;
                  } else {
                    art.innerText = parseInt(art.innerText) + 1;
                    art.use();
                  }
                }
              }, settings.style.refreshRate);
            }
          }
        };
        document.querySelector("main").appendChild(art);
      });
  }
}
addOverlayListener("PartyChanged", (e) => {
  party = e.party;
  if (e.party.length) party = [party.find((p) => p.id === charID), ...partySort(party.filter((p) => p.id !== charID))];
  handle();
});
startOverlayEvents();
document.addEventListener("onOverlayStateUpdate", (e) =>
  e.detail.isLocked ? document.querySelector("#readMe").setAttribute("hidden", true) : document.querySelector("#readMe").removeAttribute("hidden")
);
document.querySelector("#settings").onclick = () => {
  window.open("./settings.html", "_blank", "width=1280,height=720");
};
document.querySelector("#showFake").onclick = () => {
  party = [
    { id: "10000027", name: "PLD", worldId: 1177, job: 19, inParty: true },
    { id: "10000030", name: "NIN", worldId: 1169, job: 30, inParty: true },
    { id: "10000028", name: "SCH", worldId: 1179, job: 28, inParty: true },
    { id: "10000022", name: "DRG", worldId: 1043, job: 22, inParty: true },
    { id: (charID || "10000021").toString(16).toUpperCase(), name: "TEST", worldId: 1177, job: 38, inParty: true },
    { id: "10000020", name: "MNK", worldId: 1045, job: 20, inParty: true },
    { id: "10000033", name: "AST", worldId: 1179, job: 33, inParty: true },
    { id: "10000025", name: "BLM", worldId: 1177, job: 25, inParty: true },
  ];
  handle();
};
document.querySelector("#clear").onclick = () => {
  party = [];
  handle();
};
