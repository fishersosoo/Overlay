"use strict";
let sortRuleAll;
var jobList = [
  "骑士",
  "武僧",
  "战士",
  "龙骑士",
  "吟游诗人",
  "白魔法师",
  "黑魔法师",
  "",
  "召唤师",
  "学者",
  "",
  "忍者",
  "机工士",
  "暗黑骑士",
  "占星术士",
  "武士",
  "赤魔法师",
  "青魔法师",
  "绝枪战士",
  "舞者",
];

window.onload = function () {
  if (window.localStorage.getItem("setSortRule") == null) {
    sortRuleAll = [
      21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38,
    ];
  } else {
    sortRuleAll = JSON.parse(window.localStorage.getItem("setSortRule"));
  }
  insertText();
  insertTextCSS();
  saveSort();
};

$("#save").click(function () {
  saveSort();
});
$("#default").click(function () {
  sortRuleAll = [
    21, 32, 37, 19, 24, 33, 28, 22, 20, 34, 30, 25, 27, 36, 35, 23, 31, 38,
  ];
  insertText();
  insertTextCSS();
});
function insertText() {
  for (let i = 0; i < sortRuleAll.length; i++) {
    $("#sort article")[i].innerText = jobId2Name(sortRuleAll[i]);
  }
}
function insertTextCSS() {
  for (const a of document.querySelectorAll("article")) {
    switch ($(a).text()) {
      case "战士":
      case "暗黑骑士":
      case "绝枪战士":
      case "骑士":
        $(a).css("color", "lightblue");
        break;
      case "白魔法师":
      case "占星术士":
      case "学者":
        $(a).css("color", "lightgreen");
        break;
      case "龙骑士":
      case "武僧":
      case "武士":
      case "忍者":
      case "黑魔法师":
      case "召唤师":
      case "青魔法师":
      case "赤魔法师":
      case "吟游诗人":
      case "机工士":
      case "舞者":
        $(a).css("color", "red");
        break;
      default:
        break;
    }
  }
}

for (const s of document.querySelectorAll("span")) {
  s.addEventListener("click", function () {
    let now = this.parentNode.children[1];
    let nowText = $(now).text();
    let index = $(this.parentNode).index();
    let before = $(`#sort article:eq(${index - 1})`);
    let after = $(`#sort article:eq(${index + 1})`);
    if (this.className == "up") {
      if (index != 0) {
        $(now).text(before.text());
        $(before).text(nowText);
      }
    } else if (this.className == "down") {
      if (index != 17) {
        $(now).text($(after).text());
        $(after).text(nowText);
      }
    }
    insertTextCSS();
  });
}

function saveSort() {
  let l = $("#sort ul").children();
  let setSortRule = [];
  for (let i = 0; i < l.length; i++) {
    const element = l[i];
    setSortRule.push(jobName2Id(element.children[1].innerText));
  }
  window.localStorage.setItem("setSortRule", JSON.stringify(setSortRule));
}

function jobName2Id(name) {
  return jobList.indexOf(name) + 19;
}
function jobId2Name(id) {
  return jobList[id - 19];
}
