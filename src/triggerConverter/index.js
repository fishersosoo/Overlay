"use strict";
const input = document.querySelector("#i");
const output = document.querySelector("#o");
const reg = /\^\.\{14\} (?=\d)/g;
const regEcho = /00:0038:(?!:)/g;
const regnet = /\^\d+\\\|/;
input.addEventListener("keyup", () => {
  let text = input.value;
  text = text.replace(reg, `^.{14} (?:\\w+ |)`);
  text = text.replace(regEcho, `00:0038::?`);
  text = text.replace(regnet, (e) => "(?i)" + e);
  output.value = text;
});
