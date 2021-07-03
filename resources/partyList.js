"use strict";

function partySort(p, charID, rule) {
  // for (const i of p) {
  //    delete i.level; //Always 0
  // }
  p.sort(function (a, b) {
    return parseInt(b.id, 16) - parseInt(a.id, 16);
  });
  //似乎没有必要?本身就已经是倒序排序了
  let replaceClassId = [
    [1, 19],
    [2, 20],
    [3, 21],
    [4, 22],
    [5, 23],
    [6, 24],
    [7, 25],
    [26, 27],
    [29, 30],
  ];
  let sortParty = [];
  for (let i = 0; i < rule.length; i++) {
    const sortJobid = rule[i];
    for (let j = 0; j < p.length; j++) {
      if (p[j].inParty) {
        let orginJobid = p[j].job;
        for (let k = 0; k < replaceClassId.length; k++) {
          const r = replaceClassId[k];
          orginJobid === r[0] ? (orginJobid = r[1]) : "";
        }
        if (orginJobid === sortJobid) {
          parseInt(p[j].id, 16) === charID ? sortParty.reverse() : "";
          sortParty.push(p[j]);
          parseInt(p[j].id, 16) === charID ? sortParty.reverse() : "";
        } else {
        }
      }
    }
  }
  return sortParty;
}

//#region JobId
// GLA 1  剑术师
// PGL 2  格斗家?WIKI和ACT是PGL 触发器获取的是PUG
// MRD 3  斧术师
// LNC 4  枪术士?WIKI和ACT是LNC 触发器获取的是LUC
// ARC 5  弓箭手
// CNJ 6  幻术师
// THM 7  咒术师
// PLD 19 骑士
// MNK 20 武僧
// WAR 21 战士
// DRG 22 龙骑士
// BRD 23 吟游诗人
// WHM 24 白魔法师
// BLM 25 黑魔法师
// ACN 26 秘术师
// SMN 27 召唤师
// SCH 28 学者
// ROG 29 双剑师
// NIN 30 忍者
// MCH 31 机工士
// DRK 32 暗黑骑士
// AST 33 占星术士
// SAM 34 武士
// RDM 35 赤魔法师
// BLU 36 青魔法师
// GNB 37 绝枪战士
// DNC 38 舞者
//#endregion

export { partySort };
