"use strict";

import { action } from "../../resources/action.min.js";
let watch;
let insertGCD = false;
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
let jobList = {
  19: "骑士",
  20: "武僧",
  21: "战士",
  22: "龙骑士",
  23: "吟游诗人",
  24: "白魔法师",
  25: "黑魔法师",

  27: "召唤师",
  28: "学者",

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
  insertGCD = $(checkbox).prop("checked");
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
    for (const key in action[job]) {
      if (Object.hasOwnProperty.call(action[job], key)) {
        action[job][key][2] === 0 || (action[job][key][2] === 1 && (insertGCD || action[job][key][5] >= 50))
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
