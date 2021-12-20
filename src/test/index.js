"use strict";

// const TTS = (t) => callOverlayHandler({ call: "cactbotSay", text: t });
// const arr = ["死斗", "天赐", "战歌"];
// const body = document.body;
// for (const a of arr) {
//   let btn = document.createElement("button");
//   btn.innerText = a;
//   btn.addEventListener("click", () => TTS(a));
//   body.appendChild(btn);
// }

// let btnAll = document.createElement("button");
// btnAll.innerText = "所有";
// btnAll.addEventListener("click", () => {
//   for (const a of arr) TTS(a);
// });
// body.appendChild(btnAll);
// console.log(!!window.OverlayPluginApi);
import { getDamage } from "../../resources/function/damage.js";
const testLog1 = `22|2021-12-19T23:54:16.7400000+08:00|4000DE3C|ハイデリン|65A2|クリスタル・ウォタガ|10343005|Clairde Lune|650003|6FB10000|E|82E0000|1B|65A28000|0|0|0|0|0|0|0|0|0|0|39193|47837|8728|10000|||94.59|104.05|0.00|2.32|44|44|0|10000|||100.00|90.00|0.00|0.00|00007128|0|6aea8b24a0bd52c0`;
const testArr1 = testLog1.split("|");
const testDamage1 = getDamage({ line: testArr1 });
// console.log(testDamage1);
const testLog2 = `22|2021-12-19T23:54:16.7400000+08:00|4000DE3C|ハイデリン|65A2|クリスタル・ウォタガ|1034976B|Sendou Erika|A10|4D00000|650003|ABEB0000|E|82E0000|1B|65A28000|0|0|0|0|0|0|0|0|46282|53206|10000|10000|||94.80|103.65|0.00|2.36|44|44|0|10000|||100.00|90.00|0.00|0.00|00007128|1|89ca4d42bd59327c`;
const testArr2 = testLog2.split("|");
const testDamage2 = getDamage({ line: testArr2 });
// console.log(testDamage2);
