"use strict";
import { saveItem, loadItem } from "../../resources/localStorage.min.js";
import { worldId } from "../../resources/worldId.min.js";
import { checkLog, jobIDConvert } from "../../resources/logLineProcessing.min.js";
let encounter = [];
let iconBaiMingDan = `<span class="iconfont icon-baimingdan"></span>`;
let iconLahei = `<span class="iconfont icon-lahei"></span>`;
addOverlayListener("PartyChanged", (e) => {
  partyChanged(e.party);
});
addOverlayListener("EnmityTargetData", (e) => {
  // console.log(e);
});
startOverlayEvents();

function partyChanged(p) {
  $("main table").remove();
  let table = $("<table></table>");
  if (p.length > 0) {
    $(table).append(
      $(
        "<tr><th class='name'>名字</th><th class='job'>职业</th><th class='world'>所在地</th><th class='white'>白</th><th class='black'>黑</th></tr>"
      )
    );
  }
  encounter = pushNoRepetition(p, encounter);
  for (let i = 0; i < encounter.length; i++) {
    const e = encounter[i];
    let tr = $(
      `<tr>
        <td class="id" hidden>${e.id}</td>
        <td class="name">${e.name}</td>
        <td class="job">${jobIDConvert(e.job)["middle"]}</td>
        <td class="world">${worldId[e.worldId] || e.worldId}</td>
        <td class="icon">${iconBaiMingDan}</td>
        <td class="icon">${iconLahei}</td>
      </tr>`
    );
    $(table).append($(tr));
  }

  $("main").append($(table));
  $(".icon-lahei").on("click", function () {
    let reasonBlack = [
      "水平过低",
      "人身攻击",
      "消极游戏",
      "扰乱秩序",
      "没有互赞",
      "外挂脚本",
      "利用漏洞",
      "代打代练",
      "RMT",
    ];
    let reasonWhite = [
      "输出爆炸",
      "心心相通",
      "国色天香",
      "气宇轩昂",
      "助人为乐",
      "骁勇善战",
      "力挽狂澜",
      "救死扶伤",
      "慷慨解囊",
      "富可敌国",
    ];
    $("#msgShow").remove();
    let id = $(this).parent().siblings(".id").text();
    let name = $(this).parent().siblings(".name").text();
    let msgShow = $(`<div id="msgShow"><h5>要拉黑<span id="msgShowName">${name}</span>吗？</h5></div>`);
    let input = $(
      `<textarea id="reason" placeholder="输入拉黑原因\n（先点一下ACT的窗口，激活ACT后，来悬浮窗里复制&输入。）"></textarea>`
    );
    let btnOK = $(`<button id="msgBtnOK">确定</button>`);
    let btnCancel = $(`<button id="msgBtnCancel">取消</button>`);
    $(msgShow).append($(input));
    $(msgShow).append($(btnOK));
    $(msgShow).append($(btnCancel));
    $("main").append($(msgShow));
    $(btnOK).on("click", () => {
      let reason = $("#reason").val();
      saveItem("blackList", id, { id, name, reason });
      $("#msgShow").remove();
    });
    $(btnCancel).on("click", () => {
      $("#msgShow").remove();
    });
  });
}
$("#btn1").on("click", function () {
  let fakeParty = [
    {
      id: "1039CE69",
      name: "Souma",
      worldId: 1177,
      job: 34,
      inParty: true,
      level: 0,
    },
    {
      id: "1039C949",
      name: "eee",
      worldId: 1167,
      job: 33,
      inParty: true,
      level: 0,
    },
    {
      id: "0039CE49",
      name: "fff",
      worldId: 1166,
      job: 32,
      inParty: true,
      level: 0,
    },
    {
      id: "1139CE49",
      name: "bbbb",
      worldId: 1169,
      job: 31,
      inParty: true,
      level: 0,
    },
    {
      id: "1029CE49",
      name: "cccc",
      worldId: 1170,
      job: 30,
      inParty: true,
      level: 0,
    },
    {
      id: "1033CE49",
      name: "dddd",
      worldId: 1171,
      job: 29,
      inParty: true,
      level: 0,
    },
    {
      id: "1034CE49",
      name: "gggg",
      worldId: 1172,
      job: 28,
      inParty: true,
      level: 0,
    },
    {
      id: "1035CE49",
      name: "hhhh",
      worldId: 1173,
      job: 27,
      inParty: true,
      level: 0,
    },
    {
      id: "1038CE49",
      name: "jjjjjjj",
      worldId: 1174,
      job: 26,
      inParty: true,
      level: 0,
    },
    {
      id: "1037CE49",
      name: "tyutyu",
      worldId: 1176,
      job: 25,
      inParty: true,
      level: 0,
    },
    {
      id: "1036CE49",
      name: "afcase",
      worldId: 1175,
      job: 24,
      inParty: true,
      level: 0,
    },

    {
      id: "10000006",
      name: "一个黑魔法师",
      worldId: 1045,
      job: 20,
      inParty: false,
      level: 0,
    },
    {
      id: "100000007",
      name: "Sakura",
      worldId: 1179,
      job: 33,
      inParty: true,
      level: 0,
    },
    {
      id: "10000008",
      name: "弗罗多巴金斯",
      worldId: 1177,
      job: 25,
      inParty: true,
      level: 0,
    },
    {
      id: "10000009",
      name: "阿瓦罗萨",
      worldId: 1177,
      job: 22,
      inParty: true,
      level: 0,
    },
    {
      id: "10000010",
      name: "小鬼",
      worldId: 1177,
      job: 21,
      inParty: true,
      level: 0,
    },
    {
      id: "10000011",
      name: "赛巴斯",
      worldId: 1177,
      job: 28,
      inParty: true,
      level: 0,
    },
    {
      id: "10000012",
      name: "弗拉基米尔",
      worldId: 1176,
      job: 26,
      inParty: true,
      level: 0,
    },
    {
      id: "10000013",
      name: "泰达米尔",
      worldId: 1175,
      job: 25,
      inParty: true,
      level: 0,
    },
    {
      id: "10000014",
      name: "凯尔",
      worldId: 1174,
      job: 23,
      inParty: true,
      level: 0,
    },
  ];
  partyChanged(fakeParty);
});
/**
 *
 * @param {party小队(数组)} p
 * @param {encounter历史列表(数组)} e
 * @returns
 */
function pushNoRepetition(p, e) {
  f1: for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < e.length; j++) {
      if (JSON.stringify(e[j]) === JSON.stringify(p[i])) {
        break f1;
      }
    }
    e.push(p[i]);
  }
  return e;
}
