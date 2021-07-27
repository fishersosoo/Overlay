"use strict";
import { checkLog, extractLog } from "../../resources/logLineProcessing.min.js";
import { partySort } from "../../resources/partyList.min.js";
import { action } from "../../resources/action.min.js";
import { zoneInfoType } from "../../resources/zoneInfo.min.js";
import { quest } from "../../resources/quest.min.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
import { defaultWatch } from "./defaultWatch.min.js";
let charID = "";
let party = [];
let watchingID = Array(8);
let watchingRecast = Array(8);
for (let i = 0; i < 8; i++) {
  watchingID[i] = ["", "", "", "", "", "", "", "", "", ""];
  watchingRecast[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
let sortRuleAll = [21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38];
let minSync = 1;
let maxSync = 99;
let watch = {};
let timerList = [];
let bgOpacity = 0;
$("table").css("border-spacing", "3px 5px");
$("td").css("width", "30px");
$("td").css("height", "30px");
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    $("#readMe").hide();
    $("body").css("background-color", "rgba(0,0,150,0.0)");
    // $("#userRefresh").show();
  } else {
    $("#readMe").show();
    $("body").css("background-color", "rgba(0,0,150,0.2)");
    // $("#userRefresh").hide();
  }
});
addOverlayListener("LogLine", (e) => {
  checkLog(e.line, "15", {}) || checkLog(e.line, "16", {}) ? checkWatch(e) : "";
});
// $("#userRefresh").on("mouseover", function () {
//   $("#userRefresh p").show();
// });
// $("#userRefresh").on("mouseleave", function () {
//   $("#userRefresh p").hide();
// });
addOverlayListener("onPartyWipe", () => addIcon());
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charID = e.charID;
});
function addIcon() {
  clearIcon();
  watch = JSON.parse(localStorage.getItem("setWatch")) || defaultWatch;
  bgOpacity = localStorage.getItem("setBgOpacity") || 0.5;
  for (let i = 0; i < party.length; i++) {
    $(`tr:eq(${i})`).css("background-color", `rgba(0,0,0,${bgOpacity}`);
    for (let j = 0; j < 10; j++) {
      try {
        watchingID[i][j] = watch[party[i].job][9 - j];
        if (watchingID[i][j] !== "") {
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
        }
      } catch {}
    }
  }
}
addOverlayListener("ChangeZone", (e) => {
  try {
    minSync = quest[zoneInfoType[e.zoneID].name["cn"]][0];
    maxSync = quest[zoneInfoType[e.zoneID].name["cn"]][1];
  } catch {
    minSync = 1;
    maxSync = 99;
  }
});
addOverlayListener("PartyChanged", (e) => {
  localStorage.getItem("setSortRule") ? (sortRuleAll = JSON.parse(localStorage.getItem("setSortRule"))) : "";
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
            if (!(cd >= 0)) {
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
      job: 27,
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
  localStorage.getItem("setSortRule") ? (sortRuleAll = JSON.parse(localStorage.getItem("setSortRule"))) : "";
  party = partySort(party, charID, sortRuleAll);
  minSync = 999;
  maxSync = 999;
  addIcon();
};
window.clearShow = function () {
  party = [];
  clearIcon();
};
// window.userRefresh = function () {
//   addIcon();
//  // location.reload();
// };

window.settingStyle = function () {
  window.open("./settingStyle.html", "_blank", "width=280,height=300");
};
