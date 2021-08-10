"use strict";

import { justGiveMe } from "../../resources/action.js";
/*
 * @Author: Souma
 * @LastEditTime: 2021-08-10 08:36:36
 */
import { status } from "../../resources/status.js";
class keigen {
  constructor() {}
  gains() {
    this[arguments[0]] = { name: arguments[1], from: arguments[2] };
  }
  loses() {
    delete this[arguments[0]];
  }
}
let keigenBuffs = {
  766: { physics: 0, magic: 1 }, //"暗黑布道"
  "79f": { physics: 1, magic: 1 }, //"策动"
  722: { physics: 1, magic: 1 }, //"防守之桑巴"
  "78e": { physics: 1, magic: 1 }, //"行吟"
  "72f": { physics: 0, magic: 1 }, //"光之心"
  751: { physics: 1, magic: 1 }, //"节制"
  498: { physics: 1, magic: 1 }, //"武装"
  "4b6": { physics: 1, magic: 1 }, //"命运之轮（夜）"
  351: { physics: 1, magic: 1 }, //"命运之轮（日）"
  "12b": { physics: 1, magic: 1 }, //"野战治疗阵"
  "13d": { physics: 0, magic: 1 }, //"异想的幻光"
  753: { physics: 0, magic: 1 }, //"炽天的幻光"
  "4b3": { physics: 0, magic: 1 }, //"昏乱"
  "4ab": { physics: 1, magic: 0 }, //"牵制"
  "4a9": { physics: 1, magic: 1 }, //"雪仇"
  730: { physics: 1, magic: 1 }, //"石之心"
  "2eb": { physics: 1, magic: 1 }, //暗影墙
  "49a": { physics: 1, magic: 1 }, //至黑之夜
  "4a7": { physics: 1, magic: 1 }, //"铁壁"
  "4a": { physics: 1, magic: 1 }, //"预警"
  59: { physics: 1, magic: 1 }, //"复仇"
  740: { physics: 1, magic: 1 }, //"盾阵"
  496: { physics: 1, magic: 1 }, //"干预"
  57: { physics: 1, magic: 1 }, //"战栗"
  "2df": { physics: 1, magic: 1 }, //"原初的直觉"
  199: { physics: 1, magic: 1 }, //"死斗"
  52: { physics: 1, magic: 1 }, //"神圣领域"
  "32a": { physics: 1, magic: 1 }, //"行尸走肉"
  811: { physics: 1, magic: 1 }, //"死而不僵"
  "72c": { physics: 1, magic: 1 }, //"超火流星"
  "2ea": { physics: 0, magic: 1 }, //"弃明投暗"
  728: { physics: 1, magic: 1 }, //"伪装"
  "72a": { physics: 1, magic: 1 }, //"星云"
  "4d0": { physics: 1, magic: 1 }, //"心眼"
  "49b": { physics: 1, magic: 1 }, //"金刚极意"
};
let HPBuffs = {
  "5b1": {}, //摆脱
  "77d": {}, //炽天的幕帘
  129: {}, //鼓舞
  345: {}, //黑夜领域
  "2d7": {}, //圣光幕帘（已触发）
  757: {}, //天星冲日（夜）
  "4c2": {}, //神祝祷
  761: {}, //天星交错（夜）
  a8: {}, //魔罩
  790: {}, //防护障壁
  "1e8": {}, //残影
};
let healBuffs = {
  57: {}, //战栗
  "4b2": {}, //大地神的抒情恋歌
  66: {}, //真言
  751: {}, //节制
  "13d": {}, //异想的幻光
  753: {}, //异想的幻光
  724: {}, //享受即兴表演
  "2d6": {}, //圣光幕帘（等待触发）
  778: {}, //庇护所
  "34d": {}, //星位合图
  "4c3": {}, //告解//全大赦
};
let hotBuffs = {
  // 778: { },//庇护所
  "72b": {}, //极光
  "9e": {}, //再生
  96: {}, //医济
  "12b": {}, //野战治疗阵
  350: {}, //命运之轮（日）
  "34f": {}, //命运之轮（夜）
  "13b": {}, //仙光的低语
  752: {}, //天使的低语
  344: {}, //阳星相位（日）
  343: {}, //吉星相位
  54: {}, //浴血
  760: {}, //天星交错（日）
};
let enemyKeigenBuffs = {
  "4b3": { physics: 0, magic: 1 }, //昏乱
  "4ab": { physics: 1, magic: 0 }, //牵制
  "4a9": { physics: 1, magic: 1 }, //雪仇
  "09": { physics: 1, magic: 0 }, //亲疏自行的减速
};
let party = [];
let charID = "";
let gainsBuffs = {};
let duration = "";
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charID = e.charID.toString(16).toUpperCase();
});
addOverlayListener("PartyChanged", (e) => {
  party = e.party;
});
function inparty(id) {
  for (const p of party) if (p.id === id) return true;
  return false;
}
addOverlayListener("ChangeZone", () => wipe());
addOverlayListener("onPartyWipe", () => wipe());
addOverlayListener("CombatData", (e) => (duration = e.Encounter.duration));
addOverlayListener("LogLine", (e) => handle(e));
startOverlayEvents();
function wipe() {
  gainsBuffs = {};
  $("main>div").children().remove();
}

function handle(e) {
  if (
    //gains
    e.line[0] === "26" &&
    (e.line[7].substring(0, 1) === "4" || e.line[7] === charID || inparty(e.line[7]))
  ) {
    if (keigenBuffs[e.line[2]]) buff("keigenBuffs");
    if (HPBuffs[e.line[2]]) buff("HPBuffs");
    if (healBuffs[e.line[2]]) buff("healBuffs");
    if (hotBuffs[e.line[2]]) buff("hotBuffs");
    if (enemyKeigenBuffs[e.line[2]]) buff("enemyKeigenBuffs");
    function buff(t) {
      if (!gainsBuffs[t]) gainsBuffs[t] = {};
      if (!gainsBuffs[t][e.line[8]]) gainsBuffs[t][e.line[8]] = new keigen();
      gainsBuffs[t][e.line[8]].gains(e.line[2], e.line[3], e.line[6]);
    }
  } else if (
    //loses
    e.line[0] === "30" &&
    (keigenBuffs[e.line[2]] || HPBuffs[e.line[2]] || healBuffs[e.line[2]] || hotBuffs[e.line[2]] || enemyKeigenBuffs[e.line[2]]) &&
    (e.line[7].substring(0, 1) === "4" || e.line[7] === charID || inparty(e.line[7]))
  ) {
    for (const key in gainsBuffs) {
      if (Object.hasOwnProperty.call(gainsBuffs, key)) {
        const element = gainsBuffs[key];
        if (element[e.line[8]]) element[e.line[8]].loses([e.line[2]]);
      }
    }
  } else if (e.line[0] === "21" || e.line[0] === "22") {
    //1[56]
    if (inparty(e.line[6])) push(e, true);
    if (e.line[6] === charID) push(e, false);
  }
  function push(e, p) {
    let damage = getDamage(e.line);
    if (e.line[6] === e.line[2] && (damage.type === "damage" || damage.type === "other") && parseInt("20F7785", 16) > 100000) return;
    let dom = $(
      `<div class="list ${$(`#${damage.type}${p ? "Party" : ""}`).children().length % 2 ? "odd" : "even"}">${
        damage.type === "heal" ? `<img src="https://cafemaker.wakingsands.com/i/${justGiveMe(parseInt(damage.skillID, 16))[1]}">` : ""
      }<div class="list-text ${damage.damageType}">${duration} ${damage.skillName} ${(damage.value / 10000).toFixed(2)}万 ${damage.damageEffect} (${
        e.line[24]
      }/${e.line[25]})</div><span class="name">${damage.from}→${damage.caster}</span><article></article></div>`
    );

    for (const key in gainsBuffs) {
      if (Object.hasOwnProperty.call(gainsBuffs, key)) {
        const element = gainsBuffs[key];
        if (
          (damage.type === "heal" && (key === "healBuffs" || key == "hotBuffs")) ||
          (damage.type === "damage" && (key === "keigenBuffs" || key == "HPBuffs"))
        ) {
          for (const key2 in element[e.line[7]]) {
            let invalid = "";
            if (key === "keigenBuffs") {
              if ((!keigenBuffs[key2].physics && damage.damageType === "physics") || (!keigenBuffs[key2].magic && damage.damageType === "magic")) {
                invalid = "invalid";
              }
            }
            if (Object.hasOwnProperty.call(element[e.line[7]], key2)) {
              $(dom)
                .find("article")
                .append(
                  `<div class="buffs"><img class="${invalid}" src="https://cafemaker.wakingsands.com/i/${
                    status[parseInt(key2, 16)].url
                  }"><div class="from"><p>${element[e.line[7]][key2].name}</p><p class="name">${element[e.line[7]][key2].from}</p></div></div>`
                );
            }
          }
        } else if (damage.type === "damage" && key === "enemyKeigenBuffs") {
          for (const key2 in element[e.line[3]]) {
            let invalid = "";
            if ((!enemyKeigenBuffs[key2].physics && damage.damageType === "physics") || (!enemyKeigenBuffs[key2].magic && damage.damageType === "magic")) {
              invalid = "invalid";
            }
            if (Object.hasOwnProperty.call(element[e.line[3]], key2)) {
              $(dom)
                .find("article")
                .append(
                  `<div class="buffs"><img class="${invalid}" src="https://cafemaker.wakingsands.com/i/${
                    status[parseInt(key2, 16)].url
                  }"><div class="from"><p>${element[e.line[3]][key2].name}</p><p>${element[e.line[3]][key2].from}</p></div></div>`
                );
            }
          }
        }
      }
    }
    $(`#${damage.type}${p ? "Party" : ""}`).append(dom);
    window.scrollBy(0, $("main")[0].clientHeight);
  }
}
function getDamage(line) {
  let result = {
    type: "other",
    damageType: null,
    damageEffect: "",
    skillName: line[5],
    skillID: line[4],
    value: null,
    from: null,
    caster: null,
  };
  if (line[0] === "26") {
    result.from = line[6];
    result.caster = line[8];
  } else if (line[0] === "21" || line[0] === "22") {
    result.from = line[3];
    result.caster = line[7];
  }

  if (/^.{0,7}1$/.test(line[8])) {
    result.type = "damage";
    result.damageType = "dodge";
    result.damageEffect = "";
  } else if (/^(.{0,7}([356]|33)|.{0,5}[1-3].{2})$/.test(line[8])) {
    result.type = "damage";
    result.damageType = "physics";
    result.damageEffect = getDamageType();
  } else if (/^.{0,3}5.[1-3].{4}$/.test(line[8])) {
    result.type = "damage";
    result.damageType = "magic";
    result.damageEffect = getDamageType();
  } else if (/^.{0,3}6.[1-3].{4}$/.test(line[8])) {
    result.type = "damage";
    result.damageType = "darkness";
    result.damageEffect = getDamageType();
  } else if (/^.{0,3}1.{0,3}4$/.test(line[8])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "暴击";
  } else if (/^.{0,7}4$/.test(line[8])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "";
  }
  demageValue();
  return result;
  function getDamageType() {
    switch (line[8].substr(line[8].length - 3, 1)) {
      case "1":
        return "暴击";
      case "2":
        return "直击";
      case "3":
        return "直暴!!";
      default:
        return "";
    }
  }
  function demageValue() {
    let damage = line[9].padStart(8, "0");
    if (damage[4] !== "4") {
      result.value = parseInt(damage.substring(0, 4), 16);
    } else {
      let B = "0x" + damage.substring(2, 4);
      let D = "0x" + damage.substring(6, 8);
      result.value = parseInt(D.substring(2, 4) + damage.substring(0, 2) + (B - D).toString(16).toUpperCase(), 16);
    }
  }
}
$("#damageParty").hide();
$("#heal").hide();
$("#healParty").hide();
$("#other").hide();
$("#otherParty").hide();
$("#menu>div:first").css("color", "#26c6da");
$("#menu>div").on("click", (e) => {
  $("#damage").hide();
  $("#damageParty").hide();
  $("#heal").hide();
  $("#healParty").hide();
  $("#other").hide();
  $("#otherParty").hide();
  $("#" + e.currentTarget.title).show();
  $("#menu>div").css("color", "#fff");
  $(e.currentTarget).css("color", "#26c6da");
});
$("html").on("contextmenu", () => $(".name").css("filter", $(".name").css("filter") === "blur(2px)" ? "" : "blur(2px)"));
