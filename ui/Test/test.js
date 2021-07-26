/*
 * @Author: Souma
 * @LastEditTime: 2021-07-27 07:06:42
 */
"use strict";
import { checkLog, Comparison, extractLog } from "../../resources/logLineProcessing.min.js";
let party = [];
window.addOverlayListener("LogLine", (e) => {});
addOverlayListener("PartyChanged", (e) => {});
startOverlayEvents();
