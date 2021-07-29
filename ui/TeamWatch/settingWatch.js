"use strict";
import { action } from "../../resources/action.min.js";
import { def, defSort } from "./def.js";
import { compareSameGroup } from "./compareSameGroup.min.js";
import { loadItem, saveItem } from "../../resources/localStorage.min.js";
let namespace = "teamWatch";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
let watch;
try {
  watch = load("watch", def);
} catch {
  console.log("配置格式错误，已恢复默认。");
  watch = JSON.parse(JSON.stringify(def));
  save("watch", watch);
}
let shortGCD = false;
let jobList = {
  1: "剑术师",
  2: "格斗家",
  3: "斧术师",
  4: "枪术士",
  5: "弓箭手",
  6: "幻术师",
  7: "咒术师",
  19: "骑士",
  20: "武僧",
  21: "战士",
  22: "龙骑士",
  23: "吟游诗人",
  24: "白魔法师",
  25: "黑魔法师",
  26: "秘术师",
  27: "召唤师",
  28: "学者",
  29: "双剑师",
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
let jobNum = 18; //预留更新
let job = 20;
window.onload = function () {
  insertJobList();
  insertSelect();
};
window.checkboxOnclick = function (checkbox) {
  shortGCD = $(checkbox).prop("checked");
  insertSelect();
};
function insertJobList() {
  for (const key in jobList) {
    if (Object.hasOwnProperty.call(jobList, key)) {
      const e = jobList[key];
      $("#job").append(`<option value="${key}" ${parseInt(key) === 19 ? "selected" : ""}>${e}</option>`);
    }
  }
  job = $("#job").val();
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
window.save = function () {
  let tempWatch = [];
  for (let i = 0; i < 10; i++) {
    tempWatch.push($("select.skill").eq(i).val());
  }
  delete watch[job];
  watch[job] = tempWatch;
  save("watch", watch);
  show();
};
window.rec = function () {
  insertSelect();
};
window.def = function () {
  let c = confirm("确定要全部恢复默认吗？");
  if (c) {
    watch = JSON.parse(JSON.stringify(def));
    show();
    insertSelect();
  }
};
window.exp = function () {
  $("#area").val(window.btoa(JSON.stringify(watch)));
};
let t;
window.imp = async function () {
  let imp = atob($("#area").val());
  if (imp) {
    show(JSON.parse(imp));
    if (!t) {
      t = setTimeout(() => {
        let c = confirm(`确定要导入此配置吗？`);
        if (c) {
          save("watch", imp);
          location.reload();
        } else {
          show();
        }
        t = null;
      }, 500);
    }
  }
};
show();
function show() {
  $("#pre").html("");
  for (const key in watch) {
    if (Object.hasOwnProperty.call(watch, key)) {
      const element = watch[key];
      try {
        $("#pre").append(
          `<tr id="${key}"><td class="pre-job">${jobList[key]}</td>${`${element.map((e) =>
            e
              ? `<td style="background-image:url(https://cafemaker.wakingsands.com/i/${action[key][e][1]})"></td>`
              : `<td></td>`
          )}`}</tr>`
        );
      } catch {
        $("#pre").append(
          `<tr id="${key}"><td class="pre-job"">${jobList[key]}</td>${`${element.map((e) =>
            e ? `<td><img></img></td>` : `<td></td>`
          )}`}</tr>`
        );
      }
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
}
let bgOpacity = load("bgOpacity", "0.5");
$("#bgOpacity").val(bgOpacity);
$("#pre").css("background-color", `rgba(50,50,50,${bgOpacity})`);
$("#text").text($("#bgOpacity").val());
window.saveOpacity = function () {
  save("bgOpacity", $("#bgOpacity").val());
};
$("#bgOpacity").on("change", () => {
  bgOpacity = $("#bgOpacity").val();
  $("#text").text(bgOpacity);
  $("#pre").css("background-color", `rgba(50,50,50,${bgOpacity})`);
});

let sortList = {
  19: "骑士/剑术师",
  20: "武僧/格斗家",
  21: "战士/斧术师",
  22: "龙骑士/枪术士",
  23: "吟游诗人",
  24: "白魔法师/幻术师",
  25: "黑魔法师/咒术师",
  27: "召唤师/秘术师",
  28: "学者",
  30: "忍者/双剑师",
  31: "机工士",
  32: "暗黑骑士",
  33: "占星术士",
  34: "武士",
  35: "赤魔法师",
  36: "青魔法师",
  37: "绝枪战士",
  38: "舞者",
};
let o = $(`<select id="s" size="${jobNum}"></select>`);
let sortRule = load("sortRule", defSort);
insertSort();
function insertSort() {
  $("#s").html("");
  for (let i = 0; i < sortRule.length; i++) {
    const e = parseInt(sortRule[i]);
    $(o).append(`<option class="jobClass ${classColor(e)}" value="${e}">${sortList[e]}</option>`);
  }
}
function classColor(e) {
  switch (e) {
    case 21:
    case 32:
    case 37:
    case 19:
      return "tank";
    case 24:
    case 33:
    case 28:
      return "healer";
    default:
      return "dps";
  }
}
$("#sort").append(o);
$("#sort").append(`<button class="save" id="sortSave">保存</button>`);
$("#sort").append(`<button class="rec" id="sortRec">重做</button>`);
$("#sort").append(`<p><button class="def" id="sortDef">排序默认值</button></p>`);
$("#updown")
  .children()
  .on("click", (e) => {
    let i = $("#s").find("option:selected").index();
    if (e.currentTarget.id === "up") {
      $("#s")
        .children()
        .eq(i)
        .insertBefore(
          $("#s")
            .children()
            .eq(i === 0 ? 0 : i - 1)
        );
    } else {
      $("#s")
        .children()
        .eq(i)
        .insertAfter(
          $("#s")
            .children()
            .eq(i === jobNum ? jobNum : i + 1)
        );
    }
  });
$("#sortSave").on("click", () => {
  let sortRule = [];
  for (let i = 0; i < jobNum; i++) {
    sortRule.push($("#s").children().eq(i).val());
  }
  save("sortRule", sortRule);
});
$("#sortRec").on("click", () => {
  insertSort();
});
$("#sortDef").on("click", () => {
  let c = confirm("确定要恢复默认排序吗？");
  if (c) {
    sortRule = defSort;
    insertSort();
  }
});
