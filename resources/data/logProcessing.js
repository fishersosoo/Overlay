/*
 * @Author: Souma
 * @LastEditTime: 2021-09-15 05:53:31
 */
let logsIndex = {
  action: {
    casterID: 2,
    casterName: 3,
    actionID: 4,
    actionName: 5,
    targetID: 6,
    targetName: 7,
  },
  status: {
    statusID: 2,
    statusName: 3,
    statusTime: 4,
    casterID: 5,
    casterName: 6,
    targetID: 7,
    targetName: 8,
  },
};
function logProcessing(line, type) {
  if (logsIndex[type]) {
    let result = {};
    for (const key in logsIndex[type]) {
      result[key] = line[logsIndex[type][key]];
    }
    return result;
  } else {
    return {};
  }
}
export { logProcessing };
