"use strict";
import { checkLog, Comparison } from "../../resources/logLineProcessing.min.js";
let charName = "";
let timer;
addOverlayListener("LogLine", (e) => {
  if (
    checkLog(e.line, "27", {
      TargetName: [Comparison.equal, charName],
      CurrentMP: [Comparison.equal, "10000"],
      MaxMP: [Comparison.equal, "10000"],
    })
  ) {
    start();
  }
});
addOverlayListener("onPartyWipe", () => stop());
addOverlayListener("ChangePrimaryPlayer", (e) => {
  charName = e.charName;
});
startOverlayEvents();
function start() {
  stop();
  anm();
  timer = setInterval(() => {
    anm();
  }, 3000);
}
function anm() {
  $("progress").animate({ value: "0" }, 0, "linear");
  $("progress").animate({ value: "100" }, 3000, "linear");
  $("progress").animate({ value: "0" }, 0, "linear");
}
function stop() {
  $("progress").stop();
  clearInterval(timer);
}
