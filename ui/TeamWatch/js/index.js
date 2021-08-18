/*
 * @Author: Souma
 * @LastEditTime: 2021-08-19 05:15:34
 */
"use strict";
import { action } from "../../../resources/action.min.js";
import { loadItem } from "../../../resources/localStorage.min.js";
import { partySort } from "../../../resources/partyList.min.js";
import { zoneSync } from "../../../resources/sync.js";
import { TTS } from "../../../resources/TTS.js";
import { compareSame } from "./compareSameGroup.js";
import { def, defCSS, defSort, defTTS } from "./def.js";
let charID;
let party = [];
let intervals = [];
let namespace = "teamWatch";
let watch = load("watch", JSON.parse(JSON.stringify(def)));
let actionTTS = load("TTS", JSON.parse(JSON.stringify(defTTS)));
let TTSOn = load("TTSOn", false);
let sync = [0, 999];
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
let settings = load("settings", JSON.parse(JSON.stringify(defCSS)));
function loadTable() {
  settings = load("settings", JSON.parse(JSON.stringify(defCSS)));
  $("body > main > table").remove();
  let t = $(
    `<table><tbody>${party
      .map(
        (p) =>
          `<tr id="${p.job}">${watch[p.job]
            .map(
              (w) =>
                `<td>${
                  w > 0
                    ? `<div class="icon" style="opacity:${canOrNot(action[p.job][w][3])};background-image:url(https://cafemaker.wakingsands.com/i/${
                        action[p.job][w][1]
                      })"><aside style="background-image:url(../../resources/img/base.png)" class="icon-border"></aside></div><article title="${
                        action[p.job][w][5] / 10
                      }"></article>`
                    : ""
                }</td>`
            )
            .join("")}</tr>`
      )
      .join("")}</tbody></table>`
  );
  function canOrNot(skillLevel) {
    if (skillLevel <= sync[0]) {
      return settings["yesOpacity"];
    } else if (sync[0] < skillLevel && skillLevel <= sync[1]) {
      return settings["mbOpacity"];
    } else {
      return settings["noOpacity"];
    }
  }
  $("body > main").append(t);
  $(".icon").css({
    "position": "absolute",
    "height": settings["iconSize"] + "px",
    "width": settings["iconSize"] + "px",
    "top": -settings["spacingY"] + "px",
    "line-height": settings["iconSize"] + "px",
  });
  $("body > main > table > tbody > tr > td").css({
    position: "relative",
    height: settings["iconSize"] + "px",
    width: settings["iconSize"] + "px",
  });
  let scale = parseInt(settings["iconSize"]) / 40;
  $("body > main > table > tbody > tr > td > div > aside").css({
    position: "absolute",
    height: scale * 48 + "px",
    width: scale * 48 + "px",
    top: (scale * -8) / 2 + "px",
    left: (scale * -8) / 2 + "px",
  });
  $("body > main > table > tbody > tr > td > article").css({
    "position": "absolute",
    "height": settings["iconSize"] + "px",
    "line-height": settings["iconSize"] + "px",
    "width": settings["iconSize"] + "px",
    "top": -settings["spacingY"] + "px",
    "fontSize": settings["fontSize"] + "px",
  });
  $("body > main > table").css({
    "border-spacing": `${settings["spacingX"]}px ${settings["spacingY"]}px`,
    "background-color": `rgba(0, 0, 0, ${settings["bgOpacity"]})`,
    "padding": party.length ? settings["tablePadding"] : 0 + "px",
  });
  $("body > main > table > tbody > tr:last-child > td").css("height", parseInt(settings["iconSize"] - settings["spacingY"] * 2) + "px");
  $("body > main").css({
    "min-width": settings["iconSize"] * 10 + settings["spacingX"] * 11 + settings["tablePadding"] * 2 + "px",
    "max-width": settings["iconSize"] * 10 + settings["spacingX"] * 11 + settings["tablePadding"] * 2 + "px",
  });
}
let r = document.querySelectorAll("#readMe > p.clickable");
r[0].addEventListener("click", () => {
  window.open("./settings.html", "_blank", "width=872,height=637");
});
r[1].addEventListener("click", () => {
  party = [
    { id: "10000027", name: "PLD", worldId: 1177, job: 19, inParty: true },
    { id: "10000030", name: "NIN", worldId: 1169, job: 30, inParty: true },
    { id: "10000028", name: "SCH", worldId: 1179, job: 28, inParty: true },
    { id: "10000022", name: "DRG", worldId: 1043, job: 22, inParty: true },
    { id: (charID || "10000021").toString(16).toUpperCase(), name: "TEST", worldId: 1177, job: 21, inParty: true },
    { id: "10000020", name: "MNK", worldId: 1045, job: 20, inParty: true },
    { id: "10000033", name: "AST", worldId: 1179, job: 33, inParty: true },
    { id: "10000025", name: "BLM", worldId: 1177, job: 25, inParty: true },
  ];
  party = partySort(party, charID, load("sortRule", JSON.parse(JSON.stringify(defSort))));
  watch = load("watch", JSON.parse(JSON.stringify(def)));
  sync = [999, 999];
  loadTable();
});
r[2].addEventListener("click", () => {
  party = [];
  for (const i of intervals) clearInterval(i);
  $("body > main > table").remove();
});

document.addEventListener("onOverlayStateUpdate", (e) => (e.detail.isLocked ? $("#readMe").hide() : $("#readMe").show()));
addOverlayListener("ChangePrimaryPlayer", (e) => (charID = e.charID));
addOverlayListener("PartyChanged", (e) => {
  party = partySort(e.party, charID, load("sortRule", JSON.parse(JSON.stringify(defSort))));
  for (const i of intervals) clearInterval(i);
  setTimeout(() => loadTable(), 1000);
});
addOverlayListener("ChangeZone", (e) => {
  for (const i of intervals) clearInterval(i);
  sync = zoneSync[e.zoneName] || [999, 999];
});
addOverlayListener("onPartyWipe", () => {
  for (const i of intervals) clearInterval(i);
  loadTable();
});
addOverlayListener("onLogEvent", (e) => {
  let logs = e.detail.logs;
  for (const log of logs) {
    // if (log.match(/^.{14} 00:0038:test$/)) {
    // }
    let networkAbility = log.match(/^.{15}1[56]:(?<CasterObjectID>1.{7}):[^:]+:(?<AbilityID>[^:]+):/i);
    if (networkAbility) {
      //15、16
      let n = party.findIndex((m) => {
        return m.id === networkAbility.groups.CasterObjectID && m.inParty;
      });
      let cs = compareSame(networkAbility.groups.AbilityID);
      if (TTSOn && (n + 1 || parseInt(networkAbility.groups.CasterObjectID, 16) === charID)) TTS(actionTTS[cs]);
      if (n + 1) {
        //inparty
        let i = watch[party[n].job].findIndex((a) => {
          return parseInt(a) === cs;
        });
        if (i + 1) {
          //watch
          let f = $(`body > main > table > tbody > tr`).eq(n).children()[i];
          let d = $(f).children("div")[0];
          $(d).css({
            "opacity": settings["yesOpacity"],
            "background-image": `url(https://cafemaker.wakingsands.com/i/${action[party[n].job][parseInt(networkAbility.groups.AbilityID, 16)][1]})`,
          });
          let a = $(f).children("article")[0];
          let cd = a.title;
          $(a).text(cd--);
          $(a).css("background-color", `rgba(27,27,27,${settings["cdOpacity"]})`);
          let interval = setInterval(() => {
            $(a).text(cd);
            if (!cd--) {
              $(a).text("");
              $(a).css("background-color", "");
              $(d).css("background-image", `url(https://cafemaker.wakingsands.com/i/${action[party[n].job][cs][1]})`);
              clearInterval(interval);
            }
          }, 1000);
          intervals.push(interval);
        }
      }
    }
  }
});
startOverlayEvents();
