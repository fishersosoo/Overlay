"use strict";
/*
 * @Author: Souma
 * @LastEditTime: 2021-08-15 22:51:11
 */
import { status } from "../../resources/status.js";
import { loadItem, saveItem } from "../../resources/localStorage.min.js";
document.addEventListener("onOverlayStateUpdate", (e) => (e.detail.isLocked ? $("#readMe").hide() : $("#readMe").show()));
$(function () {
  let namespace = "keigenRecord";
  function load(t, a = "") {
    return loadItem(namespace, t, a);
  }
  function save(t, a) {
    saveItem(namespace, t, a);
  }
  let blurName = load("blurName", false);
  let defSettings = {
    cacheMax: "300",
    autoHideS: "15",
    color: {
      dtColor: "rgba(50, 50, 50, 0.8)",
      ddColor: "rgba(10, 10, 10, 0.4)",
      dodgeColor: "rgb(128, 128, 128)",
      physicsColor: "rgb(255, 100, 100)",
      magicColor: "rgb(100, 200, 255)",
      darknessColor: "rgb(255, 175, 255)",
    },
  };
  let settings = load("settings", 0) || defSettings;
  function showRefresh() {
    $("#cacheMax").val(settings.cacheMax);
    $("#autoHideS").val(settings.autoHideS);
    for (const key in settings.color) {
      if (Object.hasOwnProperty.call(settings.color, key)) {
        $(`#${key}`).val(settings.color[key]);
        $(`#${key}~span`).css("background-color", settings.color[key]);
      }
    }
  }
  showRefresh();
  $("#readMe button").on("click", (e) => {
    switch ($(e.currentTarget)[0].innerText) {
      case "保存":
        settings.cacheMax = $("#cacheMax").val();
        settings.autoHideS = $("#autoHideS").val();
        for (let i = 0; i < $("#readMe>p>input[type='text']").length; i++) {
          const element = $("#readMe>p>input")[i];
          settings.color[element.id] = $(element).val();
        }
        save("settings", settings);
        break;
      case "恢复出厂(不保存)":
        settings = JSON.parse(JSON.stringify(defSettings));
        break;
    }
    showRefresh();
  });
  let statusNow = {};
  let statusList = {
    "4a7": { physics: 1, magic: 1 }, //铁壁
    "740": { physics: 1, magic: 1 }, //盾阵
    "496": { physics: 1, magic: 1 }, //干预
    "4a": { physics: 1, magic: 1 }, //预警
    "498": { physics: 1, magic: 1 }, //武装
    "52": { physics: 1, magic: 1 }, //神圣领域
    "2df": { physics: 1, magic: 1 }, //原初的直觉
    "8b3": { physics: 1, magic: 1 }, //原初的勇猛
    "57": { physics: 1, magic: 1 }, //战栗
    "59": { physics: 1, magic: 1 }, //复仇
    "199": { physics: 1, magic: 1 }, //死斗
    "49a": { physics: 1, magic: 1 }, //至黑之夜
    "2ea": { physics: 0, magic: 1 }, //弃明投暗
    "2eb": { physics: 1, magic: 1 }, //暗影墙
    "766": { physics: 0, magic: 1 }, //暗黑布道
    "32a": { physics: 1, magic: 1 }, //行尸走肉
    "811": { physics: 1, magic: 1 }, //死而不僵
    "730": { physics: 1, magic: 1 }, //石之心
    "728": { physics: 1, magic: 1 }, //伪装
    "72a": { physics: 1, magic: 1 }, //星云
    "72f": { physics: 0, magic: 1 }, //光之心
    "72c": { physics: 1, magic: 1 }, //超火流星
    "751": { physics: 1, magic: 1 }, //节制
    "12b": { physics: 1, magic: 1 }, //野战治疗阵
    "13d": { physics: 0, magic: 1 }, //异想的幻光
    "753": { physics: 0, magic: 1 }, //炽天的幻光
    "351": { physics: 1, magic: 1 }, //命运之轮（日）
    "4b6": { physics: 1, magic: 1 }, //命运之轮（夜）

    "4d0": { physics: 1, magic: 1 }, //心眼
    "49b": { physics: 1, magic: 1 }, //金刚极意
    "78e": { physics: 1, magic: 1 }, //行吟
    "79f": { physics: 1, magic: 1 }, //策动
    "722": { physics: 1, magic: 1 }, //防守之桑巴

    "2d7": { physics: 1, magic: 1 }, //圣光幕帘（已触发）
    "4c2": { physics: 1, magic: 1 }, //神祝祷
    "5b1": { physics: 1, magic: 1 }, //摆脱
    "129": { physics: 1, magic: 1 }, //鼓舞
    "77d": { physics: 1, magic: 1 }, //炽天的幕帘
    "345": { physics: 1, magic: 1 }, //黑夜领域
    "757": { physics: 1, magic: 1 }, //天星冲日（夜）
    "761": { physics: 1, magic: 1 }, //天星交错（夜）
    "1e8": { physics: 1, magic: 1 }, //残影
    "a8": { physics: 1, magic: 1 }, //魔罩
    "790": { physics: 1, magic: 1 }, //防护障壁
    "76a": { physics: 1, magic: 1 }, //残暴弹

    "09": { physics: 1, magic: 0 }, //减速（通用）（亲疏自行）
    "4a9": { physics: 1, magic: 1 }, //雪仇
    "4ab": { physics: 1, magic: 0 }, //牵制
    "4b3": { physics: 0, magic: 1 }, //昏乱

    "848":{ physics: 1, magic: 1 }, //体力增加（捕食）
    "6b3":{ physics: 1, magic: 1 }, //腐臭（臭气）
    "843":{ physics: 0, magic: 1 }, //智力精神降低（魔法锤）

  };
  let statusTimer = [];
  let party = [];
  addOverlayListener("PartyChanged", (e) => {
    party = e.party;
  });
  let charName = "";
  let duration = "00:00";
  let timer;
  addOverlayListener("ChangePrimaryPlayer", (e) => (charName = e.charName));
  addOverlayListener("CombatData", (e) => {
    $("main").show();
    $("#hover").hide();
    duration = e.Encounter.duration;
    clearTimeout(timer);
    timer = setTimeout(() => {
      $("main").hide();
      $("#hover").show();
    }, parseInt(settings.autoHideS) * 1000);
  });
  $("#hover").on("click", () => {
    $("main").show();
    $("#hover").hide();
  });
  $("html").on("mouseleave", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      $("main").hide();
      $("#hover").show();
    }, parseInt(settings.autoHideS) * 1000);
  });
  addOverlayListener("ChangeZone", () => (statusNow = {}));
  addOverlayListener("onPartyWipe", () => (statusNow = {}));
  addOverlayListener("LogLine", (e) => handle(e));
  startOverlayEvents();
  function handle(e) {
    switch (e.line[0]) {
      case "21":
      case "22":
        if (camp(e).inParty && camp(e, "caster").isEnemy) {
          let damage = getDamage(e);
          if (damage.type === "damage" && damage.skillName.substring(0, 8) !== "Unknown_") {
            let dl = `main>dl:last[title="${damage.skillName}"]`;
            if ($("main").children("dl").length >= parseInt(settings.cacheMax)) $("main").children(":first").remove();
            if ($(dl).length === 0)
              $(`main`).append(
                `<dl title="${damage.skillName}"><dt style="background-color:${
                  settings.color.dtColor
                }"onclick="dtClick(this)"><span class="damage-time">${duration}</span><span class="damage-name">${
                  damage.skillName
                }</span><span class="damage-target player-name">${nameAbridge(damage.target)}</span><span style="color:${
                  settings.color[`${damage.damageType}Color`]
                }" class="damage-value"></span><span class="status"></span></dt></dl>`
              );
            if (damage.target === charName) {
              $(`${dl}>dt>.damage-time`).text(duration);
              $(`${dl}>dt>.damage-target`).text(nameAbridge(damage.target));
              $(`${dl}>dt>.damage-name`).text(damage.skillName);
              $(`${dl}>dt>.damage-value`).text(damage.value.toLocaleString());
              $(`${dl}>dt>.status`).html(getTargetStatus(damage.from, damage.damageType, true) + getTargetStatus(damage.target, damage.damageType));
            }
            $(`${dl}`).append(
              `<dd style="background-color:${settings.color.ddColor}"hidden><span class="damage-time">${duration}</span><span class="damage-effect">${
                damage.damageEffect
              }</span><span class="damage-target player-name">${damage.target}</span><span style="color:${
                settings.color[`${damage.damageType}Color`]
              }"  class="damage-value">${damage.value.toLocaleString()}</span><span class="status">${
                getTargetStatus(damage.from, damage.damageType, true) + getTargetStatus(damage.target, damage.damageType)
              }</span></dd>`
            );
            $(".player-name").css("filter", `blur(${blurName ? 2 : 0}px)`);
            $("html").scrollTop($("main").height());
          }
        }
        break;
      case "26":
        if ((camp(e).inParty || camp(e).isEnemy) && statusList[e.line[2]]) {
          if (!statusNow[e.line[8]]) statusNow[e.line[8]] = {};
          if (!statusTimer[e.line[8]]) statusTimer[e.line[8]] = {};
          statusNow[e.line[8]][e.line[2]] = { name: e.line[3], from: e.line[6] };
          clearTimeout(statusTimer[e.line[8]][e.line[2]]);
          statusTimer[e.line[8]][e.line[2]] = setTimeout(() => {
            delete statusNow[e.line[8]][e.line[2]];
          }, parseInt(e.line[4] * 1000) + 500);
          //预留500ms防止节制类技能未判定上
          break;
        }
      case "30":
        if ((camp(e).inParty || camp(e).isEnemy) && statusNow[e.line[8]]) {
          clearTimeout(statusTimer[e.line[8]][e.line[2]]);
          delete statusNow[e.line[8]][e.line[2]];
        }
        break;
      default:
        break;
    }
    function nameAbridge(str) {
      let i = str.indexOf(" ");
      return i >= 0 ? `${str.substring(0, 1)}. ${str.substring(i + 1, i + 2)}.` : str;
    }
    function camp(e, t = "target") {
      let index;
      let result = { inParty: false, isEnemy: false };
      if (t === "target") index = 0;
      else if (t === "caster") index = -4;
      else return result;
      switch (e.line[0]) {
        case "21":
        case "22":
          index += 7;
          break;
        case "26":
        case "30":
          index += 8;
          break;
        default:
          return result;
      }
      result.inParty = e.line[index] === charName;
      for (const p of party) if (!result.inParty) result.inParty = p.name === e.line[index] && p.inParty;
      result.isEnemy = e.line[index - 1].substring(0, 1) === "4";
      return result;
    }
    function getTargetStatus(name, damageType, flag = false) {
      if (statusNow[name]) {
        let result = "";
        for (const key in statusNow[name])
          if (Object.hasOwnProperty.call(statusNow[name], key)) {
            result += `<span class="icons"><img class="${flag ? "icons-offset" : ""} ${
              (statusList[key].physics && damageType === "physics") || (statusList[key].magic && damageType === "magic") || damageType === "dodge"
                ? "useful"
                : "useless"
            }" src="https://cafemaker.wakingsands.com/i/${status[parseInt(key, 16)].url}"></span>`;
          }
        return result;
      } else {
        return "";
      }
    }
  }
  window.dtClick = (e) => ($($(e).siblings("dd")[0]).is(":hidden") ? $(e).siblings("dd").show() : $(e).siblings("dd").hide());
  function getDamage(e) {
    let result = {
      type: "unknown",
      damageType: "unknown",
      damageEffect: "未知",
      skillName: e.line[5],
      skillID: e.line[4],
      value: 0,
      from: e.line[3],
      target: e.line[7],
    };
    if (/^.{0,7}1$/.test(e.line[8])) {
      result.type = "damage";
      result.damageType = "dodge";
      result.damageEffect = "回避";
    } else if (/^[^fF].{0,3}[1-4].{2}(33|.[356])$/.test(e.line[8])) {
      result.type = "damage";
      result.damageType = "physics";
      result.damageEffect = getDamageEffect();
    } else if (/^[^fF].{0,3}5.{4}$/.test(e.line[8])) {
      result.type = "damage";
      result.damageType = "magic";
      result.damageEffect = getDamageEffect();
    } else if (/^[^fF].{0,3}6.{4}$/.test(e.line[8])) {
      result.type = "damage";
      result.damageType = "darkness";
      result.damageEffect = getDamageEffect();
    } else if (/^[^fF].{0,3}1.{0,3}4$/.test(e.line[8])) {
      result.type = "heal";
      result.damageType = "heal";
      result.damageEffect = "暴击";
    } else if (/^[^fF].{0,7}4$/.test(e.line[8])) {
      result.type = "heal";
      result.damageType = "heal";
      result.damageEffect = "　　";
    } else {
      return result;
    }
    let damage = e.line[9].padStart(8, "0");
    if (damage[4] !== "4") {
      result.value = parseInt(damage.substring(0, 4), 16);
    } else {
      let B = "0x" + damage.substring(2, 4);
      let D = "0x" + damage.substring(6, 8);
      result.value = parseInt(D.substring(2, 4) + damage.substring(0, 2) + (B - D).toString(16).toUpperCase(), 16);
    }
    return result;
    function getDamageEffect() {
      switch (e.line[8].substr(e.line[8].length - 3, 1)) {
        case "1":
          return "暴击";
        case "2":
          return "直击";
        case "3":
          return "直暴";
        default:
          return "　　";
      }
    }
  }
  $("html").on("contextmenu", () => {
    blurName = !blurName;
    $(".player-name").css("filter", `blur(${blurName ? 2 : 0}px)`);
    save("blurName", blurName);
  });
});
