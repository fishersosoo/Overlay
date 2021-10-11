/*
 * @Author: Souma
 * @LastEditTime: 2021-10-12 02:25:45
 */
"use strict";
import { castCN } from "../data/cast.js";
let main = document.querySelector("main");
let casting = {};
let target;
addOverlayListener("ChangeZone", () => (casting = {}));
addOverlayListener("onPartyWipe", () => (casting = {}));
addOverlayListener("LogLine", (e) => {
  if (e.line[0] === "20") {
    if (casting[parseInt(e.line[2], 16)] !== undefined) clearTimeout(casting[parseInt(e.line[2], 16)].timer);
    casting[parseInt(e.line[2], 16)] = {
      cn: castCN[parseInt(e.line[4], 16)] || e.line[5],
      timer: setTimeout(() => (casting[parseInt(e.line[2], 16)] = undefined), e.line[8] * 1000),
    };
  } else if (e.line[0] === "23" && parseInt(e.line[2], 16) === target) {
    casting[parseInt(e.line[2], 16)] = undefined;
    main.innerHTML = "";
  }
});
addOverlayListener("EnmityTargetData", (e) => {
  if (e.Target && casting[e.Target.ID] !== undefined) {
    main.innerHTML = casting[e.Target.ID].cn;
    target = e.Target.ID;
  } else {
    main.innerHTML = "";
    target = null;
  }
});
startOverlayEvents();
