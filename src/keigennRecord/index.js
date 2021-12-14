"use strict";
import { statusForCN } from "../../resources/data/statusForCN.js";
import { getJobByID } from "../../resources/data/job.js";
import { status } from "../../resources/data/status.js";
import { getDamage } from "../../resources/function/damage.js";
import { logProcessing } from "../../resources/function/logProcessing.js";
import { keigenns } from "./keigenns.js";
import "../../resources/function/xianyu.js";
import "../../resources/function/loadComplete.js";
import "./index.scss";
let party = [],
  youID = "",
  duration = "00:00",
  FFXIVObject = {},
  scrollMove = true,
  inCombat = false,
  combatTimer = 0,
  maxLength = parseInt(getUrlParam("maxLength") || 800);
class FFObject {
  constructor(id, name) {
    this.ID = id;
    this.Name = name;
    this.Status = {};
  }
}
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
document.querySelector("main").style.backgroundColor = `rgba(5,5,5,${getUrlParam("bgOpacity") || 0.45})`;
document.body.style.opacity = getUrlParam("bodyOpacity") || 1;
function addFooter() {
  document.querySelector(
    "body > footer > ul"
  ).innerHTML = `<li class="select" data-select="true" data-job-name="All" data-reality-name="All" id="all">ALL</li>`;
  if (party.length) {
    document.querySelector("body > footer > ul").append(
      ...party.map((value) => {
        let li = document.createElement("li");
        li.setAttribute("data-reality-name", value.id === youID ? "YOU" : value.name);
        li.setAttribute("data-job-name", value.id === youID ? "YOU" : getJobByID(value.job)?.simple1 ?? "?");
        li.appendChild(document.createTextNode(li.getAttribute("data-job-name")));
        li.setAttribute("data-object-id", value.id);
        li.setAttribute("data-select", "false");
        return li;
      })
    );
  }
  document.querySelectorAll("body > footer > ul > li ").forEach((li) => {
    li.onclick = function () {
      document.querySelectorAll("body > footer > ul > li ").forEach((li) => {
        li.setAttribute("data-select", "false");
        li.classList.remove(`select`);
      });
      this.setAttribute("data-select", "true");
      li.classList.add(`select`);
      document.querySelectorAll("body > main > table > tbody > tr").forEach((element) => {
        if (li.getAttribute("id") === "all" || element.getAttribute("data-master-id") === li.getAttribute("data-object-id")) {
          element.style.display = "table-row";
        } else {
          element.style.display = "none";
        }
      });
    };
    li.oncontextmenu = () =>
      document
        .querySelectorAll("body > footer > ul > li ")
        .forEach(
          (li) =>
            (li.innerText =
              li.innerText === li.getAttribute("data-reality-name")
                ? li.getAttribute("data-job-name")
                : li.getAttribute("data-reality-name"))
        );
  });
}
addOverlayListener("ChangePrimaryPlayer", (e) => {
  youID = e.charID.toString(16).toUpperCase();
  addFooter();
});
addOverlayListener("PartyChanged", (e) => {
  party = e.party.filter((p) => p.inParty || getUrlParam("24Mode") === "true");
  addFooter();
});
try {
  addOverlayListener("onInCombatChangedEvent", (e) => (e.detail.inACTCombat && !inCombat ? startCombat() : ""));
} catch {
  addOverlayListener("CombatData", (e) => (duration = e.Encounter.duration));
}
function speTr(text, className = null, colSpan = 5) {
  let td = tbody.insertRow(-1).insertCell(0);
  td.innerText = text;
  if (className) td.classList.add(className);
  td.setAttribute("data-type", className);
  td.classList.add("spe");
  td.colSpan = colSpan;
  document.querySelector("body > main").scrollTop = document.querySelector("body > main").scrollHeight;
  return td.parentNode;
}
addOverlayListener("ChangeZone", (e) => {
  FFXIVObject = {};
  if (tbody.lastChild !== null && tbody.lastChild.firstChild.getAttribute("data-type") === "changeZone") tbody.lastChild.remove();
  speTr(e.zoneName, "changeZone");
  inCombat = false;
  clearTimeout(combatTimer);
  duration = "00:00";
});
addOverlayListener("onPartyWipe", () => {
  FFXIVObject = {};
  speTr("团灭", "ace");
  inCombat = false;
  clearTimeout(combatTimer);
  duration = "00:00";
});
const tbody = document.querySelector("body > main > table > tbody");
addOverlayListener("LogLine", (e) => {
  let l;
  switch (e.line[0]) {
    case "21":
    case "22":
      l = logProcessing(e.line, "action");
      let damage = getDamage(e);
      if (
        damage.type === "damage" &&
        l["casterID"].substring(0, 1) === "4" &&
        (l["targetID"] === youID ||
          party.some((value) => value.id === l["targetID"] && (value.inParty || getUrlParam("24Mode") === "true")))
      ) {
        if (!inCombat && duration === "00:00") startCombat();
        if (maxLength > 0 && tbody.childElementCount >= maxLength) {
          tbody.deleteRow(0);
        }
        let tr = tbody.insertRow(-1);
        tr.setAttribute("data-master-id", l["targetID"]);
        tr.setAttribute("data-master-name", l["targetName"]);
        if (
          document.querySelector("#all").getAttribute("data-select") === "true" ||
          document.querySelector(`body > footer > ul > li[data-object-id="${l["targetID"]}"]`).getAttribute("data-select") === "true"
        ) {
          tr.style.display = "table-row";
        } else {
          tr.style.display = "none";
        }
        tr.insertCell(0).innerHTML = duration; //战斗时间
        tr.insertCell(1).innerHTML = /unknown_/i.test(l["actionName"]) ? "平A？" : l.actionName ?? "未知";
        let cell2 = tr.insertCell(2);
        try {
          if (l["targetID"] === youID) {
            cell2.innerText = "YOU";
            cell2.classList.add("YOU");
          } else {
            let job = getJobByID(party.find((p) => p.id === l["targetID"])?.job);
            cell2.innerText = job?.simple2 ?? "?";
            cell2.classList.add(job?.en);
          }
        } catch (e) {
          console.warn(e);
          cell2.innerHTML = l["targetName"];
        }
        let cell3 = tr.insertCell(3);
        cell3.innerHTML = damage.value.toLocaleString();
        cell3.setAttribute("data-damage-effect", damage.damageEffect);
        cell3.title = damage.from;
        cell3.classList.add(damage.damageType);
        let cell4 = tr.insertCell(4);
        function createImg(type, key, stack = 0) {
          let img = new Image();
          let statusNow = status[parseInt(key, 16)] ?? { "CN": "未知", "url": "000000/000405" };
          img.src = `https://cafemaker.wakingsands.com/i/${stackUrl(statusNow.url)}.png`;
          img.onerror = () => {
            img.src = `https://xivapi.com/i/${stackUrl(statusNow.url)}.png`;
          };
          function stackUrl(url) {
            return stack > 1 && stack <= 16 ? url.substring(0, 7) + (Array(6).join(0) + (parseInt(url.substring(7)) + stack)).slice(-6) : url;
          }
          img.title = FFXIVObject[l[type]].Status[key].name;
          if (keigenns?.[key][damage.damageType] === 0) {
            img.classList.add("useless");
          } else if (keigenns?.[key][damage.damageType] === 0.5) {
            img.classList.add("halfUseful");
          }
          cell4.appendChild(img);
        }
        if (FFXIVObject[l["targetName"]]) forStatus("targetName");
        if (FFXIVObject[l["casterName"]]) forStatus("casterName");
        function forStatus(c) {
          for (const key in FFXIVObject[l[c]].Status) {
            createImg(c, key, parseInt(FFXIVObject[l[c]].Status[key].stack));
          }
        }
        if (
          scrollMove &&
          (document.querySelector("#all").getAttribute("data-select") === "true" ||
            document.querySelector(`body > footer > ul > li[data-object-id="${l["targetID"]}"]`).getAttribute("data-select") === "true")
        ) {
          document.querySelector("body > main").scrollTop = document.querySelector("body > main").scrollHeight;
        }
        tr.onclick = () => {
          let result = [];
          result.push(tr.children[0].innerHTML);
          result.push(tr.children[3].title);
          result.push(tr.children[1].innerHTML);
          result.push(tr.getAttribute("data-master-name"));
          result.push(tr.children[3].innerHTML);
          for (const kg of tr.children[4].children) result.push(kg.title);
          document.querySelector("#toCopy").value = result.join(" ");
          document.querySelector("#toCopy").select();
          document.execCommand("copy");
          document.querySelector("#hint").innerText = "已复制！";
          document.querySelector("#hint").classList.add("anim-opacity2");
          setTimeout(() => document.querySelector("#hint").classList.remove("anim-opacity2"), 1000);
        };
      }
      break;
    case "26":
    case "30":
      l = logProcessing(e.line, "status");
      const logStatus = l["statusID"].toLowerCase();
      const keigenn = keigenns[logStatus];
      if (
        keigenn !== undefined &&
        ((keigenn.condition === "player" && (party.some((value) => value.id === l["targetID"]) || l["targetID"] === youID)) ||
          (keigenn.condition === "enemy" && l["targetID"].substring(0, 1) === "4"))
      )
        if (e.line[0] === "26") {
          FFXIVObject[l["targetName"]] = FFXIVObject[l["targetName"]] || new FFObject(l["targetID"], l["targetName"]);
          FFXIVObject[l["targetName"]].Status[logStatus] = {
            name: statusForCN[parseInt(logStatus, 16)] ?? l["statusName"],
            caster: l["casterName"],
            stack: e.line[9] > 1 ? e.line[9] : 0,
          };
        } else {
          try {
            delete FFXIVObject[l["targetName"]].Status[logStatus];
          } catch {}
        }
      break;
    case "25":
      if (e.line[2] === youID || party.some((p) => p.id === e.line[2] && (p.inParty || getUrlParam("24Mode") === "true"))) {
        let target;
        try {
          target = e.line[2] === youID ? "你" : getJobByID(party.find((p) => p.id === e.line[2])?.job)?.simple2 ?? "unknown";
        } catch {
          target = e.line[3];
        }
        let deathTr = speTr(`💀${target}被${e.line[5]}做掉了！`, "deathEvent", 4);
        deathTr.setAttribute("data-master-id", e.line[2]);
        deathTr.setAttribute("data-master-name", e.line[3]);
        if (
          document.querySelector("#all").getAttribute("data-select") === "true" ||
          document.querySelector(`body > footer > ul > li[data-object-id="${e.line[2]}"]`).getAttribute("data-select") === "true"
        ) {
          deathTr.style.display = "table-row";
        } else {
          deathTr.style.display = "none";
        }
        deathTr.insertCell(0).innerHTML = duration; //战斗时间
      }
    default:
      break;
  }
});
startOverlayEvents();
document.querySelector("main").onscroll = (e) => {
  scrollMove = document.querySelector("main").scrollHeight - document.body.offsetHeight - e.target.scrollTop < 80;
};
document.querySelector("header").onclick = function () {
  let m = document.querySelector("main");
  let f = document.querySelector("footer");
  if (m.style.opacity === "0") {
    m.style.opacity = "1";
    f.style.opacity = "1";
    this.classList.remove(`hide`);
    // this.style.opacity = "0.75";
  } else {
    m.style.opacity = "0";
    f.style.opacity = "0";
    this.classList.add(`hide`);
    // this.style.opacity = "1";
  }
};
function startCombat() {
  inCombat = true;
  clearTimeout(combatTimer);
  let d = 0;
  combatTimer = setInterval(() => {
    duration = `${parseInt(++d / 60)
      .toString()
      .padStart(2, "0")}:${parseInt(d % 60)
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}
