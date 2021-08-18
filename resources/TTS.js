/*
 * @Author: Souma
 * @LastEditTime: 2021-08-18 18:39:22
 */
// let TTS = (t) => callOverlayHandler({ call: "cactbotSay", text: t });
let his = [];
let TTS = (t) => {
  if (his.indexOf(t) && t) {
    his.push(t);
    setTimeout(() => his.shift(), 1000);
    callOverlayHandler({ call: "cactbotSay", text: t });
  }
};
export { TTS };
