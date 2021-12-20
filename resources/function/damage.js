/*
 * @Author: Souma
 * @LastEditTime: 2021-11-14 17:42:23
 */
function getDamage(e) {
  let offset = 0;
  if (e.line[8] === "3C" || e.line[8] === "A10") offset += 2; //2021年5.0=3C, 2021年6.0武士心眼=A10
  function getEffect() {
    switch (e.line[8 + offset].substr(e.line[8 + offset].length - 3, 1)) {
      case "1":
        return "暴击";
      case "2":
        return "直击";
      case "3":
        return "直暴";
      default:
        return "　　";
    }
  }
  let result = {
    type: "unknown",
    damageType: "unknown",
    damageEffect: "unknown",
    skillName: e.line[5],
    skillID: e.line[4],
    value: 0,
    from: e.line[3],
    target: e.line[7],
  };
  let damage = e.line[9 + offset].padStart(8, "0");
  if (damage[4] !== "4") {
    result.value = parseInt(damage.substring(0, 4), 16);
  } else {
    let B = "0x" + damage.substring(2, 4);
    let D = "0x" + damage.substring(6, 8);
    result.value = parseInt(D.substring(2, 4) + damage.substring(0, 2) + (B - D).toString(16).toUpperCase(), 16);
  }
  if (/^F/.test(e.line[8 + offset])) {
    return result;
  } else if (/1$/.test(e.line[8 + offset])) {
    if (result.value === 0) {
      result.type = "damage";
      result.damageType = "dodge";
      result.damageEffect = "回避";
    } else {
      return result;
    }
  } else if (/33$/.test(e.line[8 + offset])) {
    result.type = "damage";
    result.damageType = "death";
    result.damageEffect = "即死";
  } else if (/[1-4].{2}(33|.[356])$/.test(e.line[8 + offset])) {
    result.type = "damage";
    result.damageType = "physics";
    result.damageEffect = getEffect();
  } else if (/5.{4}$/.test(e.line[8 + offset])) {
    result.type = "damage";
    result.damageType = "magic";
    result.damageEffect = getEffect();
  } else if (/6.{4}$/.test(e.line[8 + offset])) {
    result.type = "damage";
    result.damageType = "darkness";
    result.damageEffect = getEffect();
  } else if (/1.{3}4$/.test(e.line[8 + offset])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "暴疗";
  } else if (/4$/.test(e.line[8 + offset])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "　　";
    // } else {
    // return result;
  }
  // console.log(offset);
  // console.log(e.line);
  // console.log(e.line[8 + offset]);
  // console.log(result);
  return result;
}
export { getDamage };
