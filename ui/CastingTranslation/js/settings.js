/*
 * @Author: Souma
 * @LastEditTime: 2021-10-12 06:11:05
 */
"use strict";
import { loadItem, saveItem } from "../../../resources/function/localStorage.min.js";
let namespace = "CastingTranslation";
let load = (t, a = null) => loadItem(namespace, t, a);
let save = (t, a) => saveItem(namespace, t, a);
let custom = Object.assign({ 返回: "返回" }, load("costom", {}));
let tbody = document.querySelector("body main table tbody");
for (const key in custom) addTr(key, custom[key]);
document.querySelector("#add").onclick = () => addTr();
function addTr(key = "", key2 = "") {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let ipt1 = document.createElement("input");
  let split = document.createElement("span");
  let ipt2 = document.createElement("input");
  let del = document.createElement("button");
  ipt1.value = key;
  ipt2.value = key2;
  split.innerText = ">";
  del.innerText = "X";
  td1.appendChild(ipt1);
  td2.appendChild(ipt2);
  tr.appendChild(td1);
  tr.appendChild(split);
  tr.appendChild(td2);
  tr.appendChild(del);
  tbody.appendChild(tr);
  del.onclick = () => {
    tr.remove();
    tbody.onchange();
  };
}
let aside = document.querySelector("body > aside");
let timer;
tbody.onchange = () => {
  let o = {};
  for (let i = 2; i < tbody.children.length; i++)
    o[tbody.children[i].children[0].firstChild.value] = tbody.children[i].children[2].firstChild.value;
  aside.classList.remove("save");
  aside.classList.add("save");
  clearTimeout(timer);
  timer = setTimeout(() => {
    aside.classList.remove("save");
  }, 2000);
  save("costom", o);
};
