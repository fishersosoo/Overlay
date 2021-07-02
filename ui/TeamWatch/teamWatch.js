"use strict";

import { checkLog, Comparison, extractLog } from "../../resources/logLineProcessing.min.js";
import { partySort } from "../../resources/partyList.min.js";
import { action } from "../../resources/action.min.js";
import { quest } from "../../resources/quest.min.js";

let rangeSize = 30;
let spacingHorizontal = 3;
let spacingVertical = 5;
let charName;
let party;
let watchingName = Array(8);
let watchingRecast = Array(8);
for (let i = 0; i < 8; i++) {
  watchingName[i] = ["", "", "", "", "", "", "", "", "", ""];
  watchingRecast[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
let sortRuleAll;
let minSync = 1;
let maxSync = 99;
let flagFinish = false;
let watch;
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
let compareSameGroup = [
  [16484, 16486], //回返彼岸花→回返纷乱雪月花
  [16485, 16486], //回返天下五剑→回返纷乱雪月花
  [16191, 16192], //单色标准舞步→双色标准舞步
  [15998, 0], //技巧舞步→0(替换图标)
  [16193, 15998], //单色技巧舞步结束→技巧舞步(替换图标)
  [16194, 15998], //双色技巧舞步结束→技巧舞步(替换图标)
  [16195, 15998], //三色技巧舞步结束→技巧舞步(替换图标)
  [16196, 15998], //四色技巧舞步结束→技巧舞步(替换图标)
];
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    $("#readMe").hide();
    $("body").css("background-color", "rgba(0,0,150,0.0)");
  } else {
    $("#readMe").show();
    $("body").css("background-color", "rgba(0,0,150,0.2)");
  }
});
$("table").css("border-spacing", `${spacingHorizontal}px ${spacingVertical}px`);
$("td").css("width", `${rangeSize}px`);
$("td").css("height", `${rangeSize}px`);
addOverlayListener("LogLine", (e) => {
  if (
    checkLog(e.line, "00", {
      MessageType: [Comparison.equal, "0839"],
      MessageText: [Comparison.matchRegex, "^.+(任务结束了。| has ended.|」の攻略を終了した。)$"],
    }) ||
    checkLog(e.line, "00", {
      MessageType: [Comparison.equal, "0039"],
      MessageText: [Comparison.matchRegex, "^进入了休息区。|You have entered a sanctuary.|レストエリアに入った！$"],
    })
  ) {
    clearIcon();
    flagFinish = true;
    setTimeout(() => {
      flagFinish = false;
    }, 1000);
  } else if (
    checkLog(e.line, "21", {
      Command: [Comparison.equal, "40000001"],
    }) ||
    checkLog(e.line, "21", {
      Command: [Comparison.equal, "40000006"],
    }) ||
    checkLog(e.line, "21", {
      Command: [Comparison.equal, "40000010"],
    })
  ) {
    addIcon();
  } else if (checkLog(e.line, "15", {}) || checkLog(e.line, "16", {})) {
    checkWatch(e);
  }
});
function checkWatch(e) {
  try {
    for1: for (let i = 0; i < party.length; i++) {
      const p = party[i];
      if (p.name === extractLog(e.line, "CasterName")) {
        for (let j = 0; j < watchingName[i].length; j++) {
          let compareId = parseInt(extractLog(e.line, "AbilityID"), 16);
          for (const i in compareSameGroup) {
            if (Object.hasOwnProperty.call(compareSameGroup, i)) {
              const element = compareSameGroup[i];
              compareId === element[0] ? (compareId = element[1]) : "";
            }
          }
          if (parseInt(watchingName[i][j]) === compareId) {
            let td = $(`tr:eq(${i})`).children()[j];
            if ($(td).text() > 0) {
              // console.log(`跳过一次了重复的触发:${watchingName[i][j]},i=${i},j=${j},td=${$(td).text()}`);
              break for1;
            }
            let cd = watchingRecast[i][j] / 10;
            $(td).css("opacity", "1");
            $(td).css("border", "");
            $(td).empty();
            $(td).append($("<article></article>").text(cd--));
            $($(td).children()[0]).css("background-color", "rgba(27,27,27,0.5)");
            let timer = setInterval(() => {
              $($(td).children()[0]).text(cd--);
              if (cd === -1 || flagFinish) {
                clearInterval(timer);
                $($(td).children()[0]).css("background-color", "");
                $(td).text("");
              }
            }, 1000);
            break for1;
          }
        }
      }
    }
  } catch {}
}
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charName = e.charName; //玩家名称
});
addOverlayListener("ChangeZone", (e) => {
  try {
    if (quest[e.zoneName] == null) {
      minSync = 1;
      maxSync = 99;
    } else {
      minSync = quest[e.zoneName][0];
      maxSync = quest[e.zoneName][1];
    }
  } catch {
    minSync = 1;
    maxSync = 99;
  }
});
addOverlayListener("PartyChanged", (e) => {
  try {
    party = partySort(e.party, charName, sortRuleAll);
  } catch {}
});
startOverlayEvents();
if (localStorage.getItem("setSortRule") == null) {
  sortRuleAll = [21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38];
} else {
  sortRuleAll = JSON.parse(localStorage.getItem("setSortRule"));
}
function addIcon() {
  try {
    clearIcon();
    for (let i = 0; i < 8; i++) {
      if (i < party.length) {
        $(`tr:eq(${i})`).css("background-color", "rgba(0,0,0,0.5)");
        for (let j = 0; j < 10; j++) {
          try {
            watchingName[i][j] = watch[party[i].job][9 - j];
            watchingRecast[i][j] = action[party[i].job][watch[party[i].job][9 - j]][5];
            $($($("tbody").children()[i]).children()[j]).css(
              "background-image",
              `url(https://cafemaker.wakingsands.com/i/${action[party[i].job][watch[party[i].job][9 - j]][1]})`
            );
            let skillLevel = action[party[i].job][watch[party[i].job][9 - j]][3];
            let td = $($("tbody").children()[i]).children()[j];
            if (maxSync !== 99) {
              if (skillLevel <= minSync) {
                $(td).css("opacity", "1");
              } else if (minSync < skillLevel && skillLevel <= maxSync && minSync != 80) {
                $(td).append($("<article></article>").text("?"));
                $(td).css("opacity", "0.8");
              }
            }
            clearInterval(timerSync);
          } catch {}
        }
      }
    }
  } catch {}
}
function clearIcon() {
  $("tr").css("background-color", "");
  $("td").css("background-image", "");
  $("td").css("opacity", "0.2");
  $("td").text("");
}
setTimeout(() => {
  addIcon();
}, 1000);
window.settingSort = function () {
  window.open("./settingSort.html", "_self");
};
window.settingWatch = function () {
  window.open("./settingWatch.html", "_blank", "width=200,height=300");
};

window.showFakeParty = function () {
  party = [
    {
      id: "1039CE69",
      name: "Souma",
      worldId: 1177,
      job: 24,
      inParty: true,
    },
    {
      id: "10279428",
      name: "酱",
      worldId: 1169,
      job: 19,
      inParty: true,
    },
    {
      id: "1043177B",
      name: "良",
      worldId: 1169,
      job: 30,
      inParty: true,
    },
    {
      id: "10447ED8",
      name: "游",
      worldId: 1179,
      job: 21,
      inParty: true,
    },
    {
      id: "1027A58C",
      name: "L",
      worldId: 1043,
      job: 22,
      inParty: true,
    },
    {
      id: "1022442C",
      name: "天",
      worldId: 1045,
      job: 20,
      inParty: false,
    },
    {
      id: "1045D028",
      name: "Ta",
      worldId: 1179,
      job: 33,
      inParty: true,
    },
    {
      id: "1042FA6D",
      name: "So",
      worldId: 1177,
      job: 25,
      inParty: true,
    },
  ];
  // console.log(party.slice(party));
  party = partySort(party, charName, sortRuleAll);
  // console.log(party);
  minSync = 999;
  maxSync = 999;
  addIcon();
};
window.clearShow = function () {
  party = [];
  clearIcon();
};
