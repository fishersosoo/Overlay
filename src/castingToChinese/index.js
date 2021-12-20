"use strict";
import "./index.scss";
import "../../resources/function/loadComplete.js";
import { castChinese } from "./cast100ms.js";
import { logProcessing } from "../../resources/function/logProcessing.js";

let target;
const main = document.querySelector("main");
const section = document.querySelector("section");
const aside = document.querySelector("aside");
const params = new URLSearchParams(new URL(window.location).search);
let going = false;
let casting = {};
main.style.opacity = "0";

addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "20") {
    const log = logProcessing(e.line, "action");
    casting[log.casterID] = {
      name: castChinese?.[parseInt(log?.actionID, 16)] ?? log.actionName,
      startTime: Date.now(),
      castTime: log.castTime * 1000,
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
  going = true;
  main.style.opacity = "1";
  section.innerText = casting?.[target]?.name ?? " ";
}

function clear() {
  going = false;
  main.style.opacity = "0";
}

function update() {
  if (going && casting?.[target] !== undefined) {
    aside.style.width = `${
      ((Date.now() - casting[target].startTime) / casting[target].castTime) * 100 + parseFloat(params.get("advance") ?? 8)
    }%`;
    if (parseInt(aside.style.width) >= 105) clear();
  }
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
