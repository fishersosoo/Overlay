"use strict";

import {
    checkLog,
    Comparison
}
from "../../resources/logLineProcessing.min.js";

var settings = { //设置项
    serverTickBarColorR: "#inputRangeBarR", //r
    serverTickBarColorG: "#inputRangeBarG", //g
    serverTickBarColorB: "#inputRangeBarB", //b
    serverTickBarColorA: "#inputRangeBarA", //a
    serverTickProgressBorderSize: "#inputRangeBorderSize", //边框
    serverTickProgressBackgroundAlpha: "#inputRangeProgressBackgroundAlpha", //背景不透明度
    serverTickProgressHeight: "#inputRangeProgressHeightPer", //高%
    serverTickProgressWidth: "#inputRangeProgressWidthPer", //宽%
}

let loopCycleMs = 3000; //每轮循环的时间(毫秒)
let loopTimer; //计时器
let charName; //玩家名称
loadSetting();
addOverlayListener("ChangePrimaryPlayer", (e) => {
    charName = e.charName; //获取玩家名称
    if (typeof(locked) == "undefined" || locked) jqLoopStop();
});

addOverlayListener("LogLine", (e) => {
    let l = e.line;
    // console.time();
    if (checkLog(l, "27", {
            "TargetName": [Comparison.equal, charName],
            "CurrentMP": [Comparison.equal, "10000"],
            "MaxMP": [Comparison.equal, "10000"]
        })) {
        jqLoopStart(); //触发回蓝日志
    };
    // console.timeEnd();
});

startOverlayEvents();

document.addEventListener("onOverlayStateUpdate", (e) => { //锁定悬浮窗
    let settingsContainer = document.getElementById("setting");
    if (!settingsContainer)
        return;
    var locked = e.detail.isLocked;
    if (locked) {
        settingsContainer.classList.add("hidden"); //锁定
        jqLoopStop();
    } else {
        settingsContainer.classList.remove("hidden"); //未锁定
        jqLoopStart();
    }
});

$(document).bind("selectstart", () => { //禁用文字选择功能
    return false;
});

$("table").mousedown((e) => { //右键恢复默认
    if (e.which == 3) {
        $(e.target).val($(e.target).attr("value")); //标签的值
        setStyle(e.target); //实际的样式
    }
});

$("table").bind("input propertychange", (e) => { //用户改变设置
    setStyle(e.target);
});

function setStyle(e) { //设置外观
    switch (e.id) {
        case "inputRangeBarR":
        case "inputRangeBarG":
        case "inputRangeBarB":
        case "inputRangeBarA":
            $("#bar").css("backgroundColor", `rgba( ${$("#inputRangeBarR").val()}, 
                                                    ${$("#inputRangeBarG").val()}, 
                                                    ${$("#inputRangeBarB").val()}, 
                                                    ${$("#inputRangeBarA").val()})`); //颜色
            $("#progress").css("border-color", invertColor($("#bar").css("backgroundColor"))); //设置边框
            break;
        case "inputRangeBorderSize":
            $("#progress").css("border-width", $(e).val()); //边框
            break;
        case "inputRangeProgressBackgroundAlpha":
            $("#progress").css("background-color", `rgba(0, 0, 0, ${$("#inputRangeProgressBackgroundAlpha").val()})`); //背景不透明度
            break;
        case "inputRangeProgressHeightPer":
            $("#progress").css("height", `${$(e).val()}%`); //高%
            break;
        case "inputRangeProgressWidthPer":
            $("#progress").css("width", `${$(e).val()}%`); //宽%
            break;
    }
    saveSetting();
}

function jqAnimation() { //动画
    $("#bar").stop();
    $("#bar").css("width", "0%");
    $("#bar").animate({
        width: "100%"
    }, loopCycleMs, "linear"); //线性
}

function jqLoopStart() { //计时器启动
    jqLoopStop();
    jqAnimation();
    loopTimer = setInterval(jqAnimation, loopCycleMs); //创建计时器
}

function jqLoopStop() { //计时器停止
    clearInterval(loopTimer);
    $("#bar").stop();
    $("#bar").css("width", "0%");
}

function invertColor(rgba) { //根据颜色返回高可读性的黑或白 用于设置边框颜色
    let c = rgba.match(/^rgba?\((?<r>[^,]+), ?(?<g>[^,]+), ?(?<b>[^,]+)(?:, )?(?<a>[^,]+)*?\)$/);
    return (c[1] * 0.299 + c[2] * 0.587 + c[3] * 0.114) > 186 ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)";
}

function saveSetting() { //保存设置
    localStorage.clear();
    for (const key in settings) {
        if (Object.hasOwnProperty.call(settings, key)) {
            localStorage.setItem(key, $(settings[key]).val());
        }
    }
}

function loadSetting() { //读取设置并手动应用(不调用方法因为rgba会重复4次)
    for (const key in settings) {
        if (Object.hasOwnProperty.call(settings, key)) {
            $(settings[key]).val(localStorage.getItem(key)); //标签的值
            $("#bar").css("backgroundColor", `rgba( ${$("#inputRangeBarR").val()}, 
                                                    ${$("#inputRangeBarG").val()}, 
                                                    ${$("#inputRangeBarB").val()}, 
                                                    ${$("#inputRangeBarA").val()})`); //颜色
            $("#progress").css("border-width", $("#inputRangeBorderSize").val()); //边框
            $("#progress").css("background-color", `rgba(0, 0, 0, ${$("#inputRangeProgressBackgroundAlpha").val()})`); //背景不透明度
            $("#progress").css("height", `${$("#inputRangeProgressHeightPer").val()}%`); //高%
            $("#progress").css("width", `${$("#inputRangeProgressWidthPer").val()}%`); //宽%
        }
    }
}

$("#progress").bind("contextmenu", () => { // 禁用右键菜单 浏览器打开时用
    return false;
})