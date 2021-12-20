"use strict";
const input = document.querySelector("#i");
const output = document.querySelector("#o");
const regs = [
  { from: /\^\.\{14\} (?=\d)/g, to: `^.{14} (?:\\w+ |)` },
  { from: /\^\.\{15\}(?=\d)/g, to: `^.{15}(?:\\w+ |)` },
  { from: /(?<=00:[^:]+):(?!:)/g, to: `::?` },
  { from: /\^\.\{/g, to: `(?i)^.{` },
];
input.addEventListener("keyup", () => {
  let text = input.value;
  for (const key in regs) {
    const reg = regs[key];
    text = text.replace(reg.from, reg.to);
  }
  output.value = text;
});
