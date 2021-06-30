"use strict";

function partySort(p, charName="测试占星本人", rule) {
  for (const i of p) {
    delete i.inParty; //Always true
    delete i.level; //Always 0
  }
  p.sort(function (a, b) {
    return parseInt(b.id, 16) - parseInt(a.id, 16);
  });
  //似乎没有必要?本身就已经是倒序排序了
  let sortParty = [];
  for (let i = 0; i < rule.length; i++) {
    const sortJobid = rule[i];
    for (let j = 0; j < p.length; j++) {
      const orginJobid = p[j].job;
      if (orginJobid === sortJobid) {
        p[j].name === charName?sortParty.reverse():"";//置顶charName
        sortParty.push(p[j]);
        p[j].name === charName?sortParty.reverse():"";//置顶charName
      }
    }
  }
  // console.log(sortParty);
  return sortParty;
}

//#region JobId
// PLD 19
// MNK 20
// WAR 21
// DRG 22
// BRD 23
// WHM 24
// BLM 25

// SMN 27
// SCH 28

// NIN 30
// MCH 31
// DRK 32
// AST 33
// SAM 34
// RDM 35
// BLU 36
// GNB 37
// DNC 38
//#endregion

export { partySort };
