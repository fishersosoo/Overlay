"use strict";

import {
    checkLog,
    Comparison,
    extractLog,
    jobIDConvert
}
from "../../resources/logLineProcessing.js";
var lifeMs = 15000;
var targetingJobID = 0;
var targetingName;
var watchingJobID = 0;
var watchingName;
var FFXIVAPI = "https://cafemaker.wakingsands.com";
var last16Time = 0;
var start = false;
var playerName;
addOverlayListener("ChangePrimaryPlayer", (e) => {
    playerName = e["charName"];
})
addOverlayListener("LogLine", (e) => {
    let l = e.line;
    if (checkLog(l, "00", {
            "MessageType": [Comparison.equal, "0038"],
            "MessageText": [Comparison.equal, "Casting monitor"]
        })) {
        watchingJobID = targetingJobID;
        watchingName = targetingName;
        if (watchingJobID == 0) {
            start = false;
            $("#skillShow").text("");
            $("#skillShow").css("backgroundColor", "rgba(0,0,0,0)");
        } else {
            start = true;
            $("#skillShow").text(jobIDConvert(watchingJobID).middle);
            $("#skillShow").css("backgroundColor", "rgba(0,0,0,0.4)");
        }
    } else if (start && checkLog(l, "15", {
            "CasterName": [Comparison.equal, watchingName],
            "AbilityID": [Comparison.notMatchRegex, "^0[78]$"],
        })) {
        showSkillIcon(extractLog(l, "AbilityID"));
    } else if (start && checkLog(l, "16", {
            "Time": [Comparison.notEqual, last16Time],
            "CasterName": [Comparison.equal, watchingName]
        })) {
        last16Time = extractLog(l, "Time");
        showSkillIcon(extractLog(l, "AbilityID"));
    }
});
addOverlayListener('EnmityTargetData', (e) => {
    if (e.Target !== null) {
        targetingJobID = e.Target.Job;
        targetingName = e.Target.Name;
    } else {
        targetingJobID = 0;
        targetingName = null;
    };
});
addOverlayListener('ChangeZone', () => {
    if (watchingName != playerName) {
        watchingJobID = 0;
        watchingName = null;
        start = false;
        $("#skillShow").css("backgroundColor", "rgba(0,0,0,0)");
    }
})
startOverlayEvents();

function showSkillIcon(ID) {
    if (parseInt(ID, 16) > 100000) return;
    try {
        let urlAPI = FFXIVAPI + "/Action/" + parseInt(ID, 16) + "?columns=Icon,ActionCategoryTargetID";
        let d = new Date();
        let imgClass;
        let imgDOM;

        $.getJSON(urlAPI, function(data) {
            data["ActionCategoryTargetID"] == 4 ? imgClass = "oGCD" : imgClass = "GCD";
            imgDOM = $("<img class='" + imgClass + "' id='" + d.getTime() + "' src='" + FFXIVAPI + data["Icon"] + "'>");
            $("#skillShow").append(imgDOM);
            $(imgDOM).animate({
                right: "100%"
            }, lifeMs, "linear");
            setTimeout("$('#" + d.getTime() + "').remove()", lifeMs);
        });
    } catch {}
};

document.addEventListener("onOverlayStateUpdate", (e) => { //锁定悬浮窗
    if (e.detail.isLocked) {
        $("#readme").slideUp("slow");
        $("#skillShow").fadeIn(0);

    } else {
        $("#readme").slideDown("slow");
        $("#skillShow").fadeOut(0);
    }
});
