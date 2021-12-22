"use strict";

import { getAction } from "../../resources/data/actions.js";
import { compareSame } from "../../resources/function/compareSameGroup.js";
import { levels } from "../../resources/function/getLevels.js";
import "../../resources/function/loadComplete.js";
import { loadItem } from "../../resources/function/localStorage";
import { logProcessing } from "../../resources/function/logProcessing.js";
import "../../resources/function/xianyu.js";
import { baseClass, sortRule, watchJobsActionsID } from "./default.js";
import "./index.scss";

const namespace = "TeamWatch4";
const load = (t, a = undefined) => loadItem(namespace, t, a);
const sortRuleUsed = load("sortRuleUser", sortRule);

let playerID = "";
let party = [];
let timers = [];
let inFaker = true;
let params = new URLSearchParams(new URL(window.location).search);

document.querySelector("main").style.transform = `scale(${(params.get("scale") ?? 1) * 0.8})`;
document.querySelector("#settings").addEventListener("click", () => {
  window.open("./teamWatchSettings.html", "_blank", "width=800,height=800");
});
document.querySelector("#test").addEventListener("click", () => {
  document.querySelectorAll(".skill_icon").forEach((element) => {
    use(element);
  });
});
document.addEventListener("onOverlayStateUpdate", (e) => {
  inFaker = !e.detail.isLocked;
  partyChanged(inFaker ? fakeParty : party);
  document.querySelector(".menu").style.display = e.detail.isLocked ? "none" : "block";
});
addOverlayListener("ChangePrimaryPlayer", (e) => {
  playerID = e.charID.toString(16).toUpperCase();
});
addOverlayListener("ChangeZone", () => {
  partyChanged(party);
});
addOverlayListener("onPartyWipe", () => {
  partyChanged(party);
});
let timer;
addOverlayListener("PartyChanged", (e) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (playerID !== "") {
      clearInterval(timer);
      party = e.party.filter((p) => p.inParty);
      if (!inFaker) partyChanged(party);
    }
  }, 100);
});
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "21" || (e.line[0] === "22" && e.line[45] === "0")) {
    let log = logProcessing(e.line, "action");
    if (inFaker && log?.casterID === playerID) {
      use(document.querySelector("#member1").querySelector(`article[data-action-proto-id="${parseInt(log?.actionID, 16)}"]`));
    } else {
      use(
        document
          .querySelector(`#member${party?.findIndex((member) => member.id === compareSame(log?.casterID)) + 1}`)
          ?.querySelector(`article[data-action-proto-id="${parseInt(log.actionID, 16)}"]`)
      );
    }
  }
});
startOverlayEvents();
const body = document.body;
const membersDOM = [
  body.querySelector("#member1"),
  body.querySelector("#member2"),
  body.querySelector("#member3"),
  body.querySelector("#member4"),
  body.querySelector("#member5"),
  body.querySelector("#member6"),
  body.querySelector("#member7"),
  body.querySelector("#member8"),
];
function partyChanged(party) {
  for (const member of membersDOM) member.innerHTML = "";
  for (const timer of timers) clearTimeout(timer);
  timers = [];
  if (party.length === 0 || party === []) return;
  party = (() => {
    return party.sort((a, b) => {
      if (a.id === playerID) return -1;
      if (b.id === playerID) return 1;
      a.job = baseClass[a.job] ?? a.job;
      b.job = baseClass[b.job] ?? b.job;
      return sortRuleUsed.indexOf(a.job.toString()) - sortRuleUsed.indexOf(b.job.toString());
    });
  })();
  const watchJobsActionsIDUsed = load("watchJobsActionsIDUser") ?? watchJobsActionsID;
  for (let m = 0; m < membersDOM.length; m++) {
    if (party[m]) {
      membersDOM[m].innerHTML = "";
      const partyMember = party[m];
      membersDOM[m].setAttribute("data-party-job", party[m].job);
      const jobActionsID = watchJobsActionsIDUsed?.[partyMember?.job.toString()];
      for (let i = 0; i < jobActionsID.length; i++) {
        let memberActionDOM = document.createElement("article");
        if (jobActionsID[i] > 0) {
          const action = getAction(jobActionsID[i], levels[party[m].id]?.level ?? 999);
          for (const protos in action) memberActionDOM.setAttribute(`data-action-proto-${protos}`, action[protos]);
          memberActionDOM.classList.add("skill_icon");
          memberActionDOM.classList.add("useful_" + action.Useful);
          if (action.ID === undefined) {
            memberActionDOM.style.opacity = "0";
          } else {
            memberActionDOM.style.background = `url(https://souma.diemoe.net/resources/icon/${action.Url}.png) no-repeat`;
            memberActionDOM.style.animationDuration = action?.Recast100ms * 100 + "ms";
            memberActionDOM.setAttribute("data-action-proto-recastNow", "");
            memberActionDOM.setAttribute("data-action-proto-chargesNow", action?.MaxCharges);
            memberActionDOM.timerCharges = null;
            let maxCharges = action.MaxCharges;
            if (maxCharges !== "0") {
              const chargesCountDOM = document.createElement("span");
              chargesCountDOM.classList.add("charges");
              chargesCountDOM.innerText = maxCharges;
              memberActionDOM.appendChild(chargesCountDOM);
            }
          }
        }
        membersDOM[m].appendChild(memberActionDOM);
      }
    } else {
      break;
    }
  }
}
function use(dom) {
  if (dom) {
    if (dom.timer) clearInterval(dom.timer);
    const maxCharges = parseInt(dom.getAttribute("data-action-proto-maxcharges"));
    let chargesNow = parseInt(dom.getAttribute("data-action-proto-chargesnow"));
    const chargeable = maxCharges > 0;
    const charges1000ms = dom.getAttribute("data-action-proto-recast100ms") * 100;
    if (chargeable) {
      dom.classList.add("hideText");
    } else {
      dom.setAttribute("data-action-proto-recastNow", Math.floor(dom.getAttribute("data-action-proto-recast100ms") / 10));
      dom.classList.remove("hideText");
      dom.classList.remove("normalActionAnimation");
      dom.classList.remove("GCDActionAnimation");
      dom.classList.remove("oGCDActionAnimation");
    }
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        if (chargeable) {
          chargesNow = Math.max(--chargesNow, 0);
          if (chargesNow === 0) dom.classList.add("nocharges");
          dom.querySelector(".charges").innerText = chargesNow;
          dom.setAttribute("data-action-proto-chargesnow", chargesNow);
          dom.classList.add(dom.getAttribute("data-action-proto-actioncategory") === "能力" ? "oGCDActionAnimation" : "GCDActionAnimation");
        } else {
          dom.classList.add("normalActionAnimation");
        }
        if (chargeable) {
          if (dom.timerCharges === null) {
            dom.timerCharges = setInterval(() => {
              dom.classList.remove("nocharges");
              let chargesFinfishTimer = Math.min(parseInt(dom.getAttribute("data-action-proto-chargesnow")) + 1, maxCharges);
              dom.setAttribute("data-action-proto-chargesnow", chargesFinfishTimer);
              dom.querySelector(".charges").innerText = chargesFinfishTimer;
              if (chargesFinfishTimer === maxCharges) {
                clearInterval(dom.timerCharges);
                dom.timerCharges = null;
                dom.classList.remove("GCDActionAnimation");
                dom.classList.remove("oGCDActionAnimation");
              }
            }, charges1000ms);
            timers.push(parseInt(dom.timerCharges));
          }
        } else {
          dom.timer = setInterval(() => {
            dom.setAttribute("data-action-proto-recastNow", dom.getAttribute("data-action-proto-recastNow") - 1);
            if (dom.getAttribute("data-action-proto-recastNow") < 1) {
              setTimeout(() => {
                dom.setAttribute("data-action-proto-recastNow", "");
                dom.classList.remove("normalActionAnimation");
                dom.classList.remove("GCDActionAnimation");
                dom.classList.remove("oGCDActionAnimation");
                clearInterval(dom.timer);
              }, 500);
            }
          }, 1000);
        }

        timers.push(parseInt(dom.timer));
      });
    });
  }
}
const fakeParty = [
  { id: "10000001", name: "Faker1", job: 24, inParty: true },
  { id: "1039CE69", name: "Souma", job: 25, inParty: true },
  { id: "10000004", name: "Faker4", job: 35, inParty: true },
  { id: "10000005", name: "Faker5", job: 34, inParty: true },
  { id: "10000006", name: "Faker6", job: 39, inParty: true },
  { id: "10000007", name: "Faker7", job: 40, inParty: true },
  { id: "10000008", name: "Faker8", job: 28, inParty: true },
  { id: "1002E5AA", name: "Suzu", job: 38, inParty: true },
];
