"use strict";
import "./index.scss";
import "../../resources/function/loadComplete.js";
import { castChinese } from "./cast100ms.js";
import { logProcessing } from "../../resources/function/logProcessing.js";

let target;
const main = document.querySelector("main");
const castingType = document.querySelector("#type");
const castingCountdown = document.querySelector("#countdown");
const castingName = document.querySelector("section");
const castingProgress = document.querySelector("aside");
const params = new URLSearchParams(new URL(window.location).search);
let casting = {};
main.style.opacity = "0";

addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "20") {
    const log = logProcessing(e.line, "action");
    casting[log.casterID] = {
      name: castChinese?.[parseInt(log?.actionID, 16)] ?? log.actionName,
      startTime: Date.now(),
      castTime: log.castTime * 1000,
      overTime: Date.now() + log.castTime * 1000,
      damageType: null, //留坑
    };
  } else if (e.line[0] === "23") {
    const log = logProcessing(e.line, "action");
    delete casting[log.casterID];
  }
});

addOverlayListener("EnmityTargetData", (e) => {
  target = e?.[params.get("focus") === "true" ? "Focus" : "Target"]?.ID?.toString(16).toUpperCase();
  casting?.[target] !== undefined ? show() : clear();
});

startOverlayEvents();

function show() {
  main.style.opacity = "1";
  castingName.innerText = casting?.[target]?.name ?? "";
  castingType.innerText = casting?.[target]?.damageType ?? "";
}

function clear() {
  main.style.opacity = "0";
}

function update() {
  if (casting?.[target] !== undefined) {
    const now = Date.now();
    castingProgress.style.width = `${
      ((now - casting[target].startTime) / casting[target].castTime) * 100 + parseFloat(params.get("advance") ?? 8)
    }%`;
    castingCountdown.innerText = ((casting[target].overTime - now) / 1000).toFixed(2);
    if (castingCountdown.innerText <= 0) {
      delete casting[target];
      clear();
    }
  }
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
