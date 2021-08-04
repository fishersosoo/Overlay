"use strict";
import { action } from "../../resources/action.min.js";
import { def, defSort, defSets } from "./def.min.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
import { loadItem, saveItem } from "../../resources/localStorage.min.js";
import "../../resources/drag-arrange.min.js";
let namespace = "teamWatch";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
let watch;
try {
  watch = load("watch", JSON.parse(JSON.stringify(def)));
} catch {
  console.log("配置格式错误，已恢复默认。");
  watch = JSON.parse(JSON.stringify(def));
  save("watch", watch);
}
let shortGCD = false;
let jobList = {
  1: ["剑术师", false],
  2: ["格斗家", false],
  3: ["斧术师", false],
  4: ["枪术士", false],
  5: ["弓箭手", false],
  6: ["幻术师", false],
  7: ["咒术师", false],
  19: ["骑士", true],
  20: ["武僧", true],
  21: ["战士", true],
  22: ["龙骑士", true],
  23: ["吟游诗人", true],
  24: ["白魔法师", true],
  25: ["黑魔法师", true],
  26: ["秘术师", false],
  27: ["召唤师", true],
  28: ["学者", true],
  29: ["双剑师", false],
  30: ["忍者", true],
  31: ["机工士", true],
  32: ["暗黑骑士", true],
  33: ["占星术士", true],
  34: ["武士", true],
  35: ["赤魔法师", true],
  36: ["青魔法师", true],
  37: ["绝枪战士", true],
  38: ["舞者", true],
};
let sortRule = load("sortRule", JSON.parse(JSON.stringify(defSort)));
let job = 19;

window.checkboxOnClick = function (checkbox) {
  shortGCD = $(checkbox).prop("checked");
  insertSelect();
};
function insertJobList() {
  let firstJobId = 19;
  for (const i of sortRule) {
    if (jobList[i][1]) {
      firstJobId = parseInt(i);
      break;
    }
  }
  for (const key in jobList) {
    if (Object.hasOwnProperty.call(jobList, key)) {
      const e = jobList[key];
      if (e[1]) {
        $("#job").append(`<option value="${key}" ${parseInt(key) === firstJobId ? "selected" : ""}>${e[0]}</option>`);
      }
    }
  }
  job = $("#job").val();
  insertSelect();
}
$("#job").on("change", function () {
  job = $("#job").val();
  insertSelect();
});
function insertSelect() {
  $("select.skill").children().remove();
  for (let i = 0; i < 10; i++) {
    $("select.skill").eq(i).append(`<option value=""></option>`);
    for (const key in action[job]) {
      if (Object.hasOwnProperty.call(action[job], key) && compareSameGroup[key] === undefined  && (shortGCD || action[job][key][5] >= 100)) {
        let owned = false;
        for (const i of $(`#${job}>td>span`)) {
          if ($(i).text() === key) {
            owned = true;
          }
        }
        $("select.skill")
          .eq(i)
          .append(`<option ${owned ? `class="owned"` : ""} value="${key}">${action[job][key][0]}</option>`);
      }
    }
    $("select.skill").eq(i).val(watch[job][i]);
  }
}
$(".skill").on("change", (e) => {
  watch[$("#job").val()][$(e.currentTarget).parent().index()] = $(e.currentTarget).val();
  show(watch);
});

function getWatch() {
  let tempWatch = {};
  for (const key in jobList) {
    let tempArray = [];
    if (Object.hasOwnProperty.call(jobList, key)) {
      for (let i = 0; i < 10; i++) {
        tempArray.push($(`#${key} span`).eq(i).text());
      }
      tempWatch[key] = JSON.parse(JSON.stringify(tempArray));
    }
  }
  return tempWatch;
}
$("#set-noSave").on("click", () => {
  location.reload();
});
$("#set-def").on("click", () => {
  let c = confirm("要恢复出厂的监控设置吗？");
  if (c) {
    sortRule = JSON.parse(JSON.stringify(defSort));
    watch = JSON.parse(JSON.stringify(def));
    show(watch);
    insertSelect();
  }
});
$("#set-exp").on("click", () => {
  $("#area").val(window.btoa(JSON.stringify(getWatch())));
});
$("#set-imp").on("click", () => {
  let errorText = "在这里输入他人分享的配置，再点导入。";
  if ($("#area").val() === "" || $("#area").val() === errorText) {
    $("#area").val(errorText);
    window.open("https://docs.qq.com/sheet/DTUJuWUprdnVPQlhr?tab=BB08J2", "_blank", "width=1450,height=800");
  } else {
    try {
      watch = JSON.parse(atob($("#area").val()));
      show(watch);
      insertSelect();
      $("#area").val("已导入。");
    } catch {
      $("#area").val("读取失败，请检查格式。");
    }
  }
});
function show(w) {
  $("#pre").html("");
  for (let i = 0; i < sortRule.length; i++) {
    const e = sortRule[i];
    try {
      $("#pre").append(
        `<tr id="${e}" ${jobList[e][1] ? "" : "hidden"}><td class="${classColor(e)} pre-job">${jobList[e][0]}</td>${`${w[e].map((m) =>
          m ? `<td style="background-image:url(https://cafemaker.wakingsands.com/i/${action[e][m][1]})"><span style="display:none">${m}</span></td>` : `<td><span></span></td>`
        )}`}</tr>`
      );
    } catch {
      console.log(jobList[e][0] + "意外错误，已跳过。");
    }
  }
  $("tr").on("click", (e) => {
    job = e.currentTarget.id;
    $("#job").val(job);
    insertSelect();
  });
  $("td").on("click", (e) => {
    let index = e.currentTarget.cellIndex;
    if (index > 0) {
      index--;
      $(".skill").eq(index).css("backgroundColor", "lightPink");
      setTimeout(() => {
        $(".skill").eq(index).css("backgroundColor", "");
      }, 500);
    }
  });
  $("#pre>tr").arrangeable({ dragSelector: "td:first" });
  $("#pre>tr").css("background-color", `rgba(0,0,0,0.5)`);
}
function classColor(e) {
  switch (parseInt(e)) {
    case 1:
    case 3:
    case 21:
    case 32:
    case 37:
    case 19:
      return "tank";
    case 6:
    case 24:
    case 33:
    case 28:
      return "healer";
    default:
      return "dps";
  }
}
$("#set-old").on("click", () => {
  let c = confirm("要尝试恢复旧版本的配置吗？");
  if (c) {
    let old = localStorage.getItem("setWatch");
    if (old) {
      show(JSON.parse(old));
    } else {
      alert("未找到旧版配置");
    }
  }
});
$("#set-rev").on("click", () => {
  watch = rev(watch);
  insertSelect();
  show(watch);
});
function rev(w) {
  for (const key in w) {
    if (Object.hasOwnProperty.call(w, key)) {
      const e = w[key];
      e.reverse();
    }
  }
  return w;
}
$("#set-save").on("click", () => {
  let tSettings = {};
  for (const i of $("#sets > input[type=number]")) {
    tSettings[i.id] = $(i).val();
  }
  save("settings", tSettings);
  let tSortRule = [];
  for (let i = 0; i < $("#pre>tr").length; i++) {
    tSortRule.push($("#pre>tr").eq(i)[0].id);
  }
  sortRule = JSON.parse(JSON.stringify(tSortRule));
  save("sortRule", sortRule);
  watch = JSON.parse(JSON.stringify(getWatch()));
  save("watch", watch);

  show(watch);
});
window.onload = function () {
  let settings = load("settings", defSets);
  for (const key in settings) {
    if (Object.hasOwnProperty.call(settings, key)) {
      const element = settings[key];
      $(`#${key}`).val(element);
    }
  }
  insertJobList();
  show(watch);
};
