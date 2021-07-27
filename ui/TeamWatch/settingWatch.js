"use strict";

import { action } from "../../resources/action.min.js";
import { defaultWatch } from "./defaultWatch.min.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
let watch;
let shortGCD = false;
if (localStorage.getItem("setWatch") == null) {
  watch = JSON.parse(JSON.stringify(defaultWatch));
} else {
  watch = JSON.parse(localStorage.getItem("setWatch"));
}
let jobList = {
  // 1: "剑术师",
  // 2: "格斗家",
  // 3: "斧术师",
  // 4: "枪术士",
  // 5: "弓箭手",
  // 6: "幻术师",
  // 7: "咒术师",
  19: "骑士",
  20: "武僧",
  21: "战士",
  22: "龙骑士",
  23: "吟游诗人",
  24: "白魔法师",
  25: "黑魔法师",
  // 26: "秘术师",
  27: "召唤师",
  28: "学者",
  // 29: "双剑师",
  30: "忍者",
  31: "机工士",
  32: "暗黑骑士",
  33: "占星术士",
  34: "武士",
  35: "赤魔法师",
  36: "青魔法师",
  37: "绝枪战士",
  38: "舞者",
};
let job = 20;
window.onload = function () {
  insertJobList();
  insertSelect();
};
window.checkboxOnclick = function (checkbox) {
  shortGCD = $(checkbox).prop("checked");
  $("select.skill").children().remove();
  insertSelect();
};
function insertJobList() {
  for (const key in jobList) {
    if (Object.hasOwnProperty.call(jobList, key)) {
      const e = jobList[key];
      $("#job").append(`<option value="${key}">${e}</option>`);
    }
  }
  job = $("#job").val();
}
$("#job").on("change", function () {
  job = $("#job").val();
  $("select.skill").children().remove();
  insertSelect();
});
function insertSelect() {
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
window.save = function () {
  let tempWatch = [];
  for (let i = 0; i < 10; i++) {
    tempWatch.push($("select.skill").eq(i).val());
  }
  delete watch[job];
  watch[job] = tempWatch;
  localStorage.setItem("setWatch", JSON.stringify(watch));
};
window.jobDefault = function () {
  watch[job] = defaultWatch[job];
  $("select.skill").children().remove();
  insertSelect();
};
window.exp = function () {
  $("#area").val(window.btoa(JSON.stringify(watch)));
};
window.imp = function () {
  let imp = atob($("#area").val());
  if (imp) {
    let c = confirm(`确定要导入此配置吗?\n${imp}`);
    if (c) {
      localStorage.setItem("setWatch", imp);
      location.reload();
    }
  }
};
