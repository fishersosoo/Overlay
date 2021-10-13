/*
 * @Author: Souma
 * @LastEditTime: 2021-10-13 01:07:40
 */
"use strict";
import { actions } from "../../../resources/data/actions.js";
import { jobList } from "../../../resources/data/job.js";
import { logProcessing } from "../../../resources/function/logProcessing.js";
import { compareSame } from "../../../resources/function/compareSameGroup.min.js";
import { TTS } from "../../../resources/function/TTS.js";
import { loadItem, saveItem } from "../../../resources/function/localStorage.min.js";
let party = [];
let player = "";
addOverlayListener("PartyChanged", (e) => (party = e.party || party));
addOverlayListener("ChangePrimaryPlayer", (e) => (player = e.charID.toString(16).toUpperCase()));
addOverlayListener("LogLine", (e) => {});
addOverlayListener("ChangeZone", () => {});
addOverlayListener("onPartyWipe", () => {});
startOverlayEvents();
let namespace = "";
let load = (t, a = "") => loadItem(namespace, t, a);
let save = (t, a) => saveItem(namespace, t, a);
// let narcissisticNumber = (n) => {
//   let result = [];
//   for (let i = Math.pow(10, n - 1); i < Math.pow(10, n); i++) {
//     let t = 0;
//     for (let j = 0; j < n; j++) t += Math.pow(String(i)[j], n);
//     if (i === t) result.push(i);
//   }
//   return `${n}：${JSON.stringify(result)}`;
// };
// for (let i = 3; i < 9; i++) {
//   console.time(i);
//   console.log(narcissisticNumber(i));
//   console.timeEnd(i);
// }