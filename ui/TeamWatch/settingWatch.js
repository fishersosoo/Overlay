"use strict";
import { action } from "../../resources/action.min.js";
import { def, defSort } from "./def.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
import { loadItem, saveItem } from "../../resources/localStorage.min.js";
import "../../resources/drag-arrange.js";
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
let bgOpacity = load("bgOpacity", "0.5");
window.onload = function () {
  insertJobList();
};
window.checkboxOnClick = function (checkbox) {
  shortGCD = $(checkbox).prop("checked");
  insertSelect();
};
function insertJobList() {
  for (const key in jobList) {
    if (Object.hasOwnProperty.call(jobList, key)) {
      const e = jobList[key];
      if (e[1]) {
        $("#job").append(`<option value="${key}" ${parseInt(key) === 19 ? "selected" : ""}>${e[0]}</option>`);
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
    append: for (const key in action[job]) {
      if (Object.hasOwnProperty.call(action[job], key)) {
        for (const i of compareSameGroup) {
          if (i[0].toString() === key) {
            continue append;
          }
        }
        shortGCD || action[job][key][5] >= 100
          ? $("select.skill").eq(i).append(`<option value="${key}">${action[job][key][0]}</option>`)
          : "";
      }
    }
    $("select.skill").eq(i).val(watch[job][i]);
  }
}
$(".skill").on("change", (e) => {
  watch[$("#job").val()][$(e.currentTarget).parent().index()] = $(e.currentTarget).val();
  show(watch);
});
$("#ul-def").on("click", () => {
  watch = load("watch", JSON.parse(JSON.stringify(def)));
  for (let i = 0; i < 10; i++) {
    $("select.skill").eq(i).val(watch[job][i]);
  }
  show(watch);
});
$("#set-save").on("click", () => {
  save("bgOpacity", $("#bgOpacity").val());
  let tempSort = [];
  for (let i = 0; i < $("#pre>tr").length; i++) {
    tempSort.push($("#pre>tr").eq(i)[0].id);
  }
  watch = JSON.parse(JSON.stringify(getWatch()));
  sortRule = JSON.parse(JSON.stringify(tempSort));
  save("watch", watch);
  save("sortRule", sortRule);
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
  show(watch);
  insertSelect();
});
$("#set-def").on("click", () => {
  let c = confirm("确定要恢复默认吗？（不按保存就不会覆盖设置）");
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
  let imp = atob($("#area").val());
  if (imp) {
    show(JSON.parse(imp));
  }
});
show(watch);
function show(w) {
  $("#pre").html("");
  for (let i = 0; i < sortRule.length; i++) {
    const e = sortRule[i];
    try {
      $("#pre").append(
        `<tr id="${e}" ${jobList[e][1] ? "" : "hidden"}><td class="${classColor(e)} pre-job">${jobList[e][0]}</td>${`${w[
          e
        ].map((m) =>
          m
            ? `<td style="background-image:url(https://cafemaker.wakingsands.com/i/${action[e][m][1]})"><span style="display:none">${m}</span></td>`
            : `<td><span></span></td>`
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
      $(".skill").eq(index).css("backgroundColor", "Red");
      setTimeout(() => {
        $(".skill").eq(index).css("backgroundColor", "");
      }, 1000);
    }
  });
  $("#pre>tr").arrangeable({ dragSelector: "td" });
  $("#bgOpacity").val(bgOpacity);
  $("#text").text($("#bgOpacity").val());
  $("#pre>tr").css("background-color", `rgba(0,0,0,${bgOpacity})`);
}
$("#bgOpacity").on("change", () => {
  bgOpacity = $("#bgOpacity").val();
  $("#text").text(bgOpacity);
  $("#pre>tr").css("background-color", `rgba(0,0,0,${bgOpacity})`);
});
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
  let c = confirm("要左右翻转当前设置吗?");
  if (c) {
    watch = rev(watch);
    show(watch);
  }
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
