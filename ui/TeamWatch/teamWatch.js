"use strict";

import { checkLog, extractLog } from "../../resources/logLineProcessing.min.js";
import { partySort } from "../../resources/partyList.min.js";
import { action } from "../../resources/action.min.js";
import { quest } from "../../resources/quest.min.js";

let rangeSize = 30;
let spacingHorizontal = 3;
let spacingVertical = 5;
let charID;
let party;
let watchingID = Array(8);
let watchingRecast = Array(8);
for (let i = 0; i < 8; i++) {
  watchingID[i] = ["", "", "", "", "", "", "", "", "", ""];
  watchingRecast[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
let sortRuleAll;
let minSync = 1;
let maxSync = 99;
let watch;
let timerList = [];
let compareSameGroup = [
  [16484, 16486], //回返彼岸花→回返纷乱雪月花
  [16485, 16486], //回返天下五剑→回返纷乱雪月花
  [16191, 16192], //单色标准舞步→双色标准舞步
  [15998, 0], //技巧舞步→0
  [16193, 15998], //单色技巧舞步结束→技巧舞步
  [16194, 15998], //双色技巧舞步结束→技巧舞步
  [16195, 15998], //三色技巧舞步结束→技巧舞步
  [16196, 15998], //四色技巧舞步结束→技巧舞步
  [3551, 16464], //直觉→勇猛
];
$("table").css("border-spacing", `${spacingHorizontal}px ${spacingVertical}px`);
$("td").css("width", `${rangeSize}px`);
$("td").css("height", `${rangeSize}px`);
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    $("#readMe").hide();
    $("body").css("background-color", "rgba(0,0,150,0.0)");
    $("#userRefresh").show();
  } else {
    $("#readMe").show();
    $("body").css("background-color", "rgba(0,0,150,0.2)");
    $("#userRefresh").hide();
  }
});
addOverlayListener("LogLine", (e) => {
  checkLog(e.line, "15", {}) || checkLog(e.line, "16", {}) ? checkWatch(e) : "";
});
$("#userRefresh").on("mouseover", function () {
  $("#userRefresh p").css("opacity", "1");
});
$("#userRefresh").on("mouseleave", function () {
  $("#userRefresh p").css("opacity", `${party ? (party.length === 0 ? 0.25 : 0) : 0.25}`);
});
addOverlayListener("onPartyWipe", () => clearIcon());
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charID = e.charID;
});
function addIcon() {
  clearIcon();
  $("#userRefresh p").css("opacity", `${party.length === 0 ? 0.5 : 0}`);
  for (let i = 0; i < 8; i++) {
    if (i < party.length) {
      $(`tr:eq(${i})`).css("background-color", "rgba(0,0,0,0.5)");
      for (let j = 0; j < 10; j++) {
        try {
          if (localStorage.getItem("setWatch") == null) {
            watch = {
              1: ["", "", "", "", "", "", "7535", "7548", "7533", ""],
              2: ["", "", "", "", "", "", "7549", "7542", "7541", ""],
              3: ["", "", "", "", "", "", "7535", "7548", "7533", ""],
              4: ["", "", "", "", "", "", "7549", "7542", "7541", ""],
              5: ["", "", "", "", "", "", "", "", "", ""],
              6: ["", "", "", "", "", "", "", "", "", ""],
              7: ["", "", "", "", "", "", "7560", "", "157", ""],
              19: ["20", "7383", "7531", "17", "3540", "7385", "7535", "7548", "7533", "30"],
              20: ["7395", "", "", "", "", "65", "7549", "7542", "7541", "7396"],
              21: ["7389", "16464", "7531", "44", "3552", "7388", "7535", "7548", "7533", "43"],
              22: ["85", "", "", "", "", "", "7549", "7542", "7541", "3557"],
              23: ["101", "", "", "", "", "", "7405", "", "7541", "118"],
              24: ["7432", "3570", "3571", "7433", "3569", "", "16536", "7562", "7561", "140"],
              25: ["3573", "", "", "", "", "", "7560", "", "157", ""],
              26: ["", "", "", "", "", "", "7560", "", "157", ""],
              27: ["3581", "7427", "", "", "", "", "7560", "", "7561", "7423"],
              28: ["166", "188", "3583", "16542", "16537", "7434", "16545", "7562", "7561", "7436"],
              29: ["", "", "", "", "", "", "7549", "7542", "7541", ""],
              30: ["2257", "", "", "", "", "", "7549", "7542", "7541", "2258"],
              31: ["2878", "", "", "", "", "", "16889", "", "7541", ""],
              32: ["7390", "7393", "7531", "3636", "3634", "16471", "7535", "7548", "7533", "3638"],
              33: ["16556", "7439", "16557", "16553", "3613", "", "16559", "7562", "7561", "16552"],
              34: ["16486", "7499", "", "", "", "", "7549", "7542", "7541", ""],
              35: ["7521", "", "", "", "", "", "7560", "", "7561", "7520"],
              36: ["11415", "11411", "11421", "23280", "23273", "18320", "7560", "18305", "7561", "18317"],
              37: ["16138", "16161", "7531", "16148", "16151", "16160", "7535", "7548", "7533", "16152"],
              38: ["16013", "15998", "", "", "", "16015", "16012", "", "7541", ""],
            };
          } else {
            watch = JSON.parse(localStorage.getItem("setWatch"));
          }
          watchingID[i][j] = watch[party[i].job][9 - j];
          watchingRecast[i][j] = action[party[i].job][watchingID[i][j]][5];
          let td = $(`tr:eq(${i})`).children()[j];
          $(td).css(
            "background-image",
            `url(https://cafemaker.wakingsands.com/i/${action[party[i].job][watch[party[i].job][9 - j]][1]})`
          );
          if (maxSync !== 99) {
            let skillLevel = action[party[i].job][watch[party[i].job][9 - j]][3];
            if (skillLevel <= minSync) {
              $(td).css("opacity", "1");
            } else if (minSync < skillLevel && skillLevel <= maxSync && minSync != 80) {
              $(td).append($("<article></article>").text("?"));
              $(td).css("opacity", "0.8");
            }
          }
        } catch {}
      }
    }
  }
}
addOverlayListener("ChangeZone", (e) => {
  if (quest[e.zoneName]) {
    minSync = quest[e.zoneName][0];
    maxSync = quest[e.zoneName][1];
  } else {
    minSync = 1;
    maxSync = 99;
  }
});
addOverlayListener("PartyChanged", (e) => {
  sortRuleAll = localStorage.getItem("setSortRule")
    ? JSON.parse(localStorage.getItem("setSortRule"))
    : [21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38];
  e.party ? (party = partySort(e.party, charID, sortRuleAll)) : "";
  setTimeout(() => {
    addIcon();
  }, 1000);
});
startOverlayEvents();
function clearIcon() {
  $("tr").css("background-color", "");
  $("td").css("background-image", "");
  $("td").css("opacity", "0.2");
  $("td").text("");
  if (timerList) {
    for (const i of timerList) {
      clearInterval(i);
    }
  }
}
function checkWatch(e) {
  try {
    if (party) {
      for1: for (let i = 0; i < party.length; i++) {
        const p = party[i];
        if (p.id === extractLog(e.line, "CasterObjectID")) {
          for (let j = 0; j < watchingID[i].length; j++) {
            let compareId = parseInt(extractLog(e.line, "AbilityID"), 16);
            for (const i in compareSameGroup) {
              if (Object.hasOwnProperty.call(compareSameGroup, i)) {
                const element = compareSameGroup[i];
                compareId === element[0] ? (compareId = element[1]) : "";
              }
            }
            if (parseInt(watchingID[i][j]) === compareId) {
              let td = $(`tr:eq(${i})`).children()[j];
              if ($(td).text() > 0) {
                break for1;
              }
              let cd = watchingRecast[i][j] / 10;
              $(td).css("opacity", "1");
              $(td).empty();
              $(td).append($("<article></article>").text(cd--));
              $($(td).children()[0]).css("background-color", "rgba(27,27,27,0.5)");
              $(td).css(
                "background-image",
                `url(https://cafemaker.wakingsands.com/i/${
                  action[party[i].job][parseInt(extractLog(e.line, "AbilityID"), 16)][1]
                })`
              );
              let timer = setInterval(() => {
                $($(td).children()[0]).text(cd--);
                if (cd === -1) {
                  clearInterval(timer);
                  $($(td).children()[0]).css("background-color", "");
                  $(td).text("");
                  $(td).css(
                    "background-image",
                    `url(https://cafemaker.wakingsands.com/i/${action[party[i].job][watch[party[i].job][9 - j]][1]})`
                  );
                }
              }, 1000);
              timerList.push(timer);
              break for1;
            }
          }
        }
      }
    }
  } catch {}
}
window.settingSort = function () {
  window.open("./settingSort.html", "_blank", "width=200,height=600");
};
window.settingWatch = function () {
  window.open("./settingWatch.html", "_blank", "width=200,height=300");
};

//#region JobId
// GLA 1  剑术师
// PGL 2  格斗家?WIKI和ACT是PGL 触发器获取的是PUG
// MRD 3  斧术师
// LNC 4  枪术士?WIKI和ACT是LNC 触发器获取的是LUC
// ARC 5  弓箭手
// CNJ 6  幻术师
// THM 7  咒术师
// PLD 19 骑士
// MNK 20 武僧
// WAR 21 战士
// DRG 22 龙骑士
// BRD 23 吟游诗人
// WHM 24 白魔法师
// BLM 25 黑魔法师
// ACN 26 秘术师
// SMN 27 召唤师
// SCH 28 学者
// ROG 29 双剑师
// NIN 30 忍者
// MCH 31 机工士
// DRK 32 暗黑骑士
// AST 33 占星术士
// SAM 34 武士
// RDM 35 赤魔法师
// BLU 36 青魔法师
// GNB 37 绝枪战士
// DNC 38 舞者
//#endregion

window.makeFakeParty = function () {
  party = [
    {
      id: "1039CE69",
      name: "Souma",
      worldId: 1177,
      job: 34,
      inParty: true,
    },
    {
      id: "10000002",
      name: "酱",
      worldId: 1169,
      job: 19,
      inParty: true,
    },
    {
      id: "10000003",
      name: "良",
      worldId: 1169,
      job: 30,
      inParty: true,
    },
    {
      id: "10000004",
      name: "游",
      worldId: 1179,
      job: 28,
      inParty: true,
    },
    {
      id: "10000005",
      name: "L",
      worldId: 1043,
      job: 22,
      inParty: true,
    },
    {
      id: "10000006",
      name: "天",
      worldId: 1045,
      job: 20,
      inParty: false,
    },
    {
      id: "100000007",
      name: "Ta",
      worldId: 1179,
      job: 33,
      inParty: true,
    },
    {
      id: "10000008",
      name: "So",
      worldId: 1177,
      job: 25,
      inParty: true,
    },
  ];
  // console.log(arr.slice(0));
  // JSON.parse(JSON.stringify(obj);
  sortRuleAll = localStorage.getItem("setSortRule")
    ? JSON.parse(localStorage.getItem("setSortRule"))
    : [21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38];
  party = partySort(party, charID, sortRuleAll);
  minSync = 999;
  maxSync = 999;
  addIcon();
};
window.clearShow = function () {
  party = [];
  clearIcon();
};
window.userRefresh = function () {
  location.reload();
};
