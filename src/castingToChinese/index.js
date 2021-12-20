"use strict";
import "./index.scss";
import "../../resources/function/loadComplete.js";
import { castChinese } from "./cast100ms.js";
import { logProcessing } from "../../resources/function/logProcessing.js";
import { TTS } from "../../resources/function/TTS.js";

let target;
const main = document.querySelector("main");
const castingType = document.querySelector("#type");
const castingCountdown = document.querySelector("#countdown");
const castingName = document.querySelector("section");
const castingProgress = document.querySelector("aside");
const params = new URLSearchParams(new URL(window.location).search);
const ttsEnable = params.get("tts") === "true";
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
      alreadyTTS: false,
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
  if (ttsEnable && casting?.[target]?.alreadyTTS === false) {
    TTS(castingName.innerText);
    casting[target].alreadyTTS = true;
  }
}

function clear() {
  main.style.opacity = "0";
}
const pingMs = parseInt(params.get("ping") ?? 80);
function update() {
  if (casting?.[target] !== undefined) {
    const now = Date.now();
    const count = (casting[target].overTime - now - pingMs) / 1000;
    castingProgress.style.width = `${((now - casting[target].startTime + pingMs) / casting[target].castTime) * 100}%`;
    castingCountdown.innerText = Math.max(count, 0).toFixed(2);
    if (count <= -0.1) {
      delete casting[target];
      clear();
    }
  }
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
