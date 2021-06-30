"use strict";

import { checkLog, Comparison, extractLog } from "../../resources/logLineProcessing.min.js";
import { partySort } from "../../resources/partyList.min.js";
import { action } from "../../resources/action.min.js";
import { quest } from "../../resources/quest.min.js";
import { msgShow } from "../../resources/messageShow.js";

let rangeSize = 30;
let spacingHorizontal = 0;
let spacingVertical = 0;
let charName;
let party;
let testParty = [
  {
    id: "103E49B5",
    name: "测试召唤",
    worldId: 1177,
    job: 27,
    level: 0,
    inParty: true,
  },
  {
    id: "10420438",
    name: "测试白魔本人",
    worldId: 1178,
    job: 24,
    level: 0,
    inParty: true,
  },
  {
    id: "103A9B6F",
    name: "测试暗骑",
    worldId: 1179,
    job: 32,
    level: 0,
    inParty: true,
  },
  {
    id: "1041D345",
    name: "测试黑魔",
    worldId: 1179,
    job: 25,
    level: 0,
    inParty: true,
  },
  {
    id: "1001BE06",
    name: "测试枪刃",
    worldId: 1043,
    job: 37,
    level: 0,
    inParty: true,
  },
  {
    id: "1039AB5F",
    name: "测试赤魔",
    worldId: 1178,
    job: 35,
    level: 0,
    inParty: true,
  },
  {
    id: "1039CE69",
    name: "测试占星",
    worldId: 1177,
    job: 33,
    level: 0,
    inParty: true,
  },
  {
    id: "1002515D",
    name: "测试武僧",
    worldId: 1043,
    job: 20,
    level: 0,
    inParty: true,
  },
];
let sortRuleAll;
let minSync = 1;
let maxSync = 99;
let flag = true;
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
      MessageType: [Comparison.equal, "0039"],
      MessageText: [Comparison.matchRegex, "^进入了休息区。|You have entered a sanctuary.|レストエリアに入った！$"],
    })
  ) {
    $("tr").css("background-color", "");
    $("td").css("background-image", "");
  }
  if (
    checkLog(e.line, "00", {
      MessageType: [Comparison.equal, "0038"],
      MessageText: [Comparison.equal, "test"],
    })
  ) {
    party = partySort(testParty, "测试白魔本人", sortRuleAll); //测试用
    addIcon(); //测试用
    msgShow("测试");
  }
});
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charName = e.charName; //玩家名称
});
addOverlayListener("ChangeZone", (e) => {
  try {
    quest[e.zoneName][0];
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
  // party && flag ? addIcon() : "";
});
addOverlayListener("PartyChanged", (e) => {
  if (flag && e.party != "") {
    party = partySort(e.party, charName, sortRuleAll);
    addIcon();
  } else {
    party = "";
    $("tr").css("background-color", "");
    $("td").css("background-image", "");
    $("aside").remove();
  }
});
startOverlayEvents();
if (window.localStorage.getItem("setSortRule") == null) {
  sortRuleAll = [21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38];
} else {
  sortRuleAll = JSON.parse(window.localStorage.getItem("setSortRule"));
}

let watch = {
  19: ["20", "7383", "7531", "17", "3540", "7385", "7535", "7548", "7533", "30"],
  20: ["7395", "", "", "", "", "65", "7549", "7542", "7541", "7396"],
  21: ["7389", "16464", "7531", "44", "3552", "7388", "7535", "7548", "7533", "43"],
  22: ["85", "", "", "", "", "", "7549", "7542", "7541", "3557"],
  23: ["101", "", "", "", "", "", "7405", "", "7541", "118"],
  24: ["7432", "3570", "3571", "7433", "3569", "", "16536", "7562", "7561", "140"],
  25: ["3573", "", "", "", "", "", "7560", "", "157", ""],

  27: ["3581", "7427", "", "", "", "", "7560", "", "7561", "7423"],
  28: ["166", "188", "3583", "16542", "16537", "7434", "16545", "7562", "7561", "7436"],

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

function addIcon() {
  flag = false;
  $("tr").css("background-color", "");
  $("td").css("background-image", "");
  $("aside").remove();
  for (let i = 0; i < 8; i++) {
    if (i < party.length) {
      $(`tr:eq(${i})`).css("background-color", "rgba(0,0,0,0.5)");
      for (let j = 0; j < 10; j++) {
        try {
          $($($("tbody").children()[i]).children()[j]).css(
            "background-image",
            `url(https://cafemaker.wakingsands.com/i/${action[party[i].job][watch[party[i].job][9 - j]][1]})`
          );
          let skillLevel = action[party[i].job][watch[party[i].job][9 - j]][3];
          let td = $($("tbody").children()[i]).children()[j];
          if (skillLevel > maxSync) {
            $(td).css("opacity", "0.4");
          } else if (minSync < skillLevel && skillLevel <= maxSync && minSync != 80) {
            $(td).css("opacity", "1");
            let txt = $("<aside></aside>");
            $(td).append(txt);
          }
        } catch {}
      }
    }
  }
  setTimeout(() => {
    flag = true;
  }, 1000);
}
