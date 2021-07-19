"use strict";
import { checkLog, Comparison, extractLog } from "../../resources/logLineProcessing.min.js";
let party = [];
window.addOverlayListener("LogLine", (e) => {
});
addOverlayListener("PartyChanged", (e) => {
});
startOverlayEvents();