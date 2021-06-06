"use strict";

import {
    checkLog,
    Comparison,
    extractLog,
    jobIDConvert
}
from "../../resources/logLineProcessing.js";
addOverlayListener("LogLine", (e) => {

});
addOverlayListener("PartyChanged", (e) => {

});
startOverlayEvents();
document.addEventListener("onOverlayStateUpdate", (e) => { //锁定悬浮窗
    if (e.detail.isLocked) {
        document.getElementById("settings").classList.add("hidden");

    } else {
        document.getElementById("settings").classList.remove("hidden");

    }
});
var postNamazuPort = 2019;

function test() {
    $.post("http://127.0.0.1:" + postNamazuPort + "/command", "/e 123");
}
test();