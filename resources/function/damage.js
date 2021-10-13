/*
 * @Author: Souma
 * @LastEditTime: 2021-10-13 08:07:26
 */
function getDamage(e) {
  function getEffect() {
    switch (e.line[8].substr(e.line[8].length - 3, 1)) {
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
  if (/^f/i.test(e.line[8])) {
    return result;
  } else if (/1$/.test(e.line[8])) {
    result.type = "damage";
    result.damageType = "dodge";
    result.damageEffect = "回避";
  } else if (/[1-4].{2}(33|.[356])$/.test(e.line[8])) {
    result.type = "damage";
    result.damageType = "physics";
    result.damageEffect = getEffect();
  } else if (/5.{4}$/.test(e.line[8])) {
    result.type = "damage";
    result.damageType = "magic";
    result.damageEffect = getEffect();
  } else if (/6.{4}$/.test(e.line[8])) {
    result.type = "damage";
    result.damageType = "darkness";
    result.damageEffect = getEffect();
  } else if (/1.{3}4$/.test(e.line[8])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "暴疗";
  } else if (/4$/.test(e.line[8])) {
    result.type = "heal";
    result.damageType = "heal";
    result.damageEffect = "　　";
  } else {
    return result;
  }
  let damage = e.line[9].padStart(8, "0");
  if (damage[4] !== "4") {
    result.value = parseInt(damage.substring(0, 4), 16);
  } else {
    let B = "0x" + damage.substring(2, 4);
    let D = "0x" + damage.substring(6, 8);
    result.value = parseInt(D.substring(2, 4) + damage.substring(0, 2) + (B - D).toString(16).toUpperCase(), 16);
  }
  return result;
}
export { getDamage };
