/*
 * @Author: Souma
 * @LastEditTime: 2021-10-01 14:07:33
 */
"use strict";
import { jobList } from "../../../resources/data/job.js";
import { status } from "../../../resources/data/status.js";
import { getDamage } from "../../../resources/function/damage.js";
import { logProcessing } from "../../../resources/function/logProcessing.js";
import { keigenn } from "../data/keigenn.js";
let party = [],
  youID = "",
  duration = "00:00",
  FFXIVObject = {},
  scrollMove = true;
class FFObject {
  constructor(id, name) {
    this.ID = id;
    this.Name = name;
    this.Status = {};
  }
}
function addFooter() {
  document.querySelector("body > footer > ul").innerHTML = `<li class="select" data-object-id="${youID}" data-select="true" data-job-name="YOU" data-reality-name="YOU">YOU</li>`;
  if (party.length) {
    document.querySelector("body > footer > ul").append(
      ...party
        .filter((p) => p.id !== youID)
        .map((value) => {
          let li = document.createElement("li");
          li.setAttribute("data-reality-name", value.name);
          li.setAttribute("data-job-name", (jobList.find((job) => job.ID.toString() === value.job.toString()) || { cn: "未知" }).cn);
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
        li.classList.remove("select");
      });
      this.setAttribute("data-select", "true");
      li.classList.add("select");
      document
        .querySelectorAll("body > main > table > tbody > tr:not(:nth-child(1))")
        .forEach((element) => (element.style.display = element.getAttribute("data-master-id") === li.getAttribute("data-object-id") ? "table-row" : "none"));
    };
    li.oncontextmenu = () =>
      document
        .querySelectorAll("body > footer > ul > li ")
        .forEach((li) => (li.innerText = li.innerText === li.getAttribute("data-reality-name") ? li.getAttribute("data-job-name") : li.getAttribute("data-reality-name")));
  });
}
addOverlayListener("ChangePrimaryPlayer", (e) => {
  youID = e.charID.toString(16).toUpperCase();
  addFooter();
});
addOverlayListener("PartyChanged", (e) => {
  party = e.party.filter((p) => p.inParty);
  addFooter();
});
addOverlayListener("CombatData", (e) => (duration = e.Encounter.duration));
addOverlayListener("ChangeZone", () => (FFXIVObject = {}), (document.querySelector("body > main > table > tbody").innerHTML = "<tr></tr>"));
addOverlayListener("onPartyWipe", () => {
  FFXIVObject = {};
  document.querySelector("body > main > table > tbody").insertRow(-1).insertCell(0).innerHTML = "团灭";
  document.querySelector("body > main").scrollTop = document.querySelector("body > main").scrollHeight;
});
addOverlayListener("LogLine", (e) => {
  let l = {};
  switch (e.line[0]) {
    case "21":
    case "22":
      l = logProcessing(e.line, "action");
      if (l["casterID"].substring(0, 1) === "4" && (party.some((value) => value.id === l["targetID"] && value.inParty) || l["targetID"] === youID)) {
        let row = document.querySelector("body > main > table > tbody").insertRow(-1);
        row.setAttribute("data-master-id", l["targetID"]);
        row.setAttribute("data-master-name", l["targetName"]);
        row.style.display = document.querySelector(`body > footer > ul > li[data-object-id="${l["targetID"]}"]`).getAttribute("data-select") === "true" ? "table-row" : "none";
        let damage = getDamage(e);
        row.insertCell(0).innerHTML = duration;
        row.insertCell(1).innerHTML = l["actionName"];
        let cell3 = row.insertCell(2);
        cell3.innerHTML = damage.value.toLocaleString();
        cell3.setAttribute("data-damage-effect", damage.damageEffect);
        cell3.title = damage.from;
        cell3.classList.add(damage.damageType);
        let cell4 = row.insertCell(3);
        function createImg(type, key) {
          let img = document.createElement("img");
          img.setAttribute("src", `https://cafemaker.wakingsands.com/i/${status[parseInt(key, 16)].url}`);
          img.title = FFXIVObject[l[type]].Status[key].name;
          if (keigenn[key] && keigenn[key][damage.damageType] === "0") img.classList.add("useless");
          cell4.appendChild(img);
        }
        if (FFXIVObject[l["targetID"]]) for (const key in FFXIVObject[l["targetID"]].Status) createImg("targetID", key);
        if (FFXIVObject[l["casterID"]]) for (const key in FFXIVObject[l["casterID"]].Status) createImg("casterID", key);
        if (scrollMove && document.querySelector(`body > footer > ul > li[data-object-id="${l["targetID"]}"]`).getAttribute("data-select") === "true") {
          document.querySelector("body > main").scrollTop = document.querySelector("body > main").scrollHeight;
        }
        row.onclick = () => {
          let result = [];
          result.push(row.children[0].innerHTML);
          result.push(row.children[2].title);
          result.push(row.children[1].innerHTML);
          result.push(row.getAttribute("data-master-name"));
          result.push(row.children[2].innerHTML);
          for (const kg of row.children[3].children) result.push(kg.title);
          document.querySelector("#toCopy").value = result.join(" ");
          document.querySelector("#toCopy").select();
          document.execCommand("copy");
          document.querySelector("#hint").innerText = "已复制！";
          document.querySelector("#hint").classList.add("anim-opacity2");
          setTimeout(() => document.querySelector("#hint").classList.remove("anim-opacity2"), 2000);
        };
      } else if ((party.some((value) => value.id === l["targetID"] && value.inParty) || l["targetID"] === youID) && keigenn[l["actionID"]] !== undefined) {
        document.querySelector("body > main > table > tbody").insertRow(-1).insertCell(0).innerHTML = `${duration} ${l["casterName"]}发动了“${l["actionName"]}”。`;
        document.querySelector("body > main").scrollTop = document.querySelector("body > main").scrollHeight;
      }
      break;
    case "26":
      l = logProcessing(e.line, "status");
      if (
        keigenn[l["statusID"]] !== undefined &&
        (party.some((value) => value.id === l["targetID"] && value.inParty) || l["targetID"] === youID || l["targetID"].substring(0, 1) === "4")
      ) {
        FFXIVObject[l["targetID"]] = FFXIVObject[l["targetID"]] || new FFObject(l["targetID"], l["targetName"]);
        FFXIVObject[l["targetID"]].Status[l["statusID"]] = { name: l["statusName"], caster: l["casterName"] };
      }
      break;
    case "30":
      l = logProcessing(e.line, "status");
      if (
        keigenn[l["statusID"]] !== undefined &&
        (party.some((value) => value.id === l["targetID"] && value.inParty) || l["targetID"] === youID || l["targetID"].substring(0, 1) === "4")
      )
        try {
          delete FFXIVObject[l["targetID"]].Status[l["statusID"]];
        } catch {}
      break;
    default:
      break;
  }
});
startOverlayEvents();
document.querySelector("main").onscroll = (e) => (scrollMove = document.querySelector("main").scrollHeight - 282 - e.target.scrollTop < 5);
document.querySelector("header").onclick = function () {
  let m = document.querySelector("main");
  if (m.style.opacity === "0") {
    m.style.opacity = "1";
    this.style.opacity = "0.5";
  } else {
    m.style.opacity = "0";
    this.style.opacity = "1";
  }
};
