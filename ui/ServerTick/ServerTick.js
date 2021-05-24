import
{
    checkLog
}
from '../../resources/networkLogLines.js';

addOverlayListener('LogLine', (e) => LogLine(e));
startOverlayEvents();

function LogLine(e)
{
    if (checkLog(e.line, "14",
        {
            "CasterName": "Souma",
            "AbilityName": "玄冰"
        }))
    {
        console.log("do sth.");
    };
}


$(document).ready(function()
{
    let debugMode = true; //左键进度条启动动画,中键停止动画
    let loopTimer; //创建一个计时器
    let loopCycleMs = 3000; //每次循环的时间(毫秒)

    loadSetting(); //读取设置

    $('#colorpicker').farbtastic('#color'); //初始化拾色器

    //动画
    function jqAnimation()
    {
        $("#bar").stop(); //停止当前动画
        $("#bar").css("width", "0%"); //恢复进度条为0
        $("#bar").animate(
        {
            width: '100%'
        }, loopCycleMs, "linear"); //线性
    }

    //计时器启动
    function jqLoopStart()
    {
        jqLoopStop(); //中止以前的计时器与动画
        jqAnimation(); //开始新的动画
        loopTimer = setInterval(jqAnimation, loopCycleMs); //创建计时器
    }

    //计时器停止
    function jqLoopStop()
    {
        clearInterval(loopTimer); //停止计时器
        $("#bar").stop(); //停止当前动画
        $("#bar").css("width", "0%"); //恢复进度条为0
    }

    //禁用progress右键菜单
    $("#progress").bind("contextmenu", function(e)
    {
        return false;
    })

    //右键点击progress
    $("#progress").mousedown(function(e)
    {
        $("#readMe").text("");
        switch (e.which)
        {
            case 1: //左键
                if (debugMode) jqLoopStart(); //开始

                break;
            case 2: //中键
                if (debugMode) jqLoopStop(); //停止
                break;
        }
    });

    //farbtastic点击事件
    $(".overlay,.wheel").bind("mousedown", function()
    {
        $("#bar").css("backgroundColor", $("#color").prop("value"));
        saveSetting();
    });

    //保存设置
    function saveSetting()
    {
        localStorage.setItem("userColor", $("#color").prop("value"));
    }

    //读取设置
    function loadSetting()
    {
        $("#bar").css("backgroundColor", localStorage.getItem("userColor"));
    }

    //#region 未使用
    // 颜色转换为易读
    // function invertColor(hex, bw)
    // {
    //     if (hex.indexOf('#') === 0)
    //     {
    //         hex = hex.slice(1);
    //     }
    //     // convert 3-digit hex to 6-digits.
    //     if (hex.length === 3)
    //     {
    //         hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    //     }
    //     if (hex.length !== 6)
    //     {
    //         throw new Error('Invalid HEX color.');
    //     }
    //     var r = parseInt(hex.slice(0, 2), 16),
    //         g = parseInt(hex.slice(2, 4), 16),
    //         b = parseInt(hex.slice(4, 6), 16);
    //     if (bw)
    //     {
    //         return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ?
    //             '#000000' :
    //             '#FFFFFF';
    //     }
    //     // invert color components
    //     r = (255 - r).toString(16);
    //     g = (255 - g).toString(16);
    //     b = (255 - b).toString(16);
    //     // pad each with zeros and return
    //     return "#" + padZero(r) + padZero(g) + padZero(b);
    // }
    //

    //#endregion

});