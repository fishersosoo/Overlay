!function(){"use strict";var e={691:function(e,t,n){var r=n(537),o=n.n(r),a=n(645),i=n.n(a)()(o());i.push([e.id,"body{background-color:#fff}body table{border-collapse:collapse}body table td{text-align:center;padding:5px 5px;border:1px #d3d3d3 solid}*{padding:0;margin:0}","",{version:3,sources:["webpack://./src/index/index.scss"],names:[],mappings:"AAAA,KACE,qBAAA,CACA,WACE,wBAAA,CACA,cACE,iBAAA,CACA,eAAA,CACA,wBAAA,CAIN,EACE,SAAA,CACA,QAAA",sourcesContent:["body {\r\n  background-color: white;\r\n  table {\r\n    border-collapse: collapse;\r\n    td {\r\n      text-align: center;\r\n      padding: 5px 5px;\r\n      border: 1px lightgray solid;\r\n    }\r\n  }\r\n}\r\n* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n"],sourceRoot:""}]),t.Z=i},645:function(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var p=[].concat(e[u]);r&&i[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),n&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=n):p[2]=n),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),t.push(p))}},t}},537:function(e){e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),i=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([a]).join("\n")}return[t].join("\n")}},379:function(e){var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],u=r.base?s[0]+r.base:s[0],p=a[u]||0,l="".concat(u," ").concat(p);a[u]=p+1;var d=n(l),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)t[d].references++,t[d].updater(f);else{var m=o(f,r);r.byIndex=c,t.splice(c,0,{identifier:l,updater:m,references:1})}i.push(l)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var s=r(e,o),u=0;u<a.length;u++){var p=n(a[u]);0===t[p].references&&(t[p].updater(),t.splice(p,1))}a=s}}},569:function(e){var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:function(e){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:function(e,t,n){e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:function(e){e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:function(e){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},332:function(e,t,n){e.exports=n.p+"images/b1d92d858fb5b6b33cbd.png"},611:function(e,t,n){e.exports=n.p+"images/ef9754eecbc27267fec9.gif"},275:function(e,t,n){e.exports=n.p+"images/f342eb11e8119cf8c69d.png"},285:function(e,t,n){e.exports=n.p+"images/18bb1c33cec0aeeb3bf3.png"},296:function(e,t,n){e.exports=n.p+"images/a5a8e8b114ae908b1bdc.png"},745:function(e,t,n){e.exports=n.p+"images/1ceeee14f37b42ff7724.png"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e+"../"}(),function(){var e=n(379),t=n.n(e),r=n(795),o=n.n(r),a=n(569),i=n.n(a),c=n(565),s=n.n(c),u=n(216),p=n.n(u),l=n(589),d=n.n(l),f=n(691),m={};m.styleTagTransform=d(),m.setAttributes=s(),m.insert=i().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=p(),t()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;var g=n(332),b=n(275),h=n(285),v=n(296),y=n(611),A=n(745),C=document.querySelector("table"),x={fflogsUploaderDownload:{type:"HTML网页",describe:"FFLOGS上传器下载",img:"",useful:"永久",params:""},triggerConverter:{type:"HTML网页",describe:"旧触发器正则转换",img:"",useful:"before 6.0",params:""},castingMonitor:{type:"ACT悬浮窗",describe:"施法监控",img:g,useful:"6.X",params:"?duration=15&tetris=false"},keigennRecord:{type:"ACT悬浮窗",describe:"减伤监控",img:b,useful:"6.X",params:"?maxLength=800&24Mode=false&bgOpacity=0.45&bodyOpacity=1&fontSize=12px&th1=3em&th2=4.5em&th3=2.5em&th4=3.75em"},keySkillTimer:{type:"ACT悬浮窗",describe:"团辅监控",img:h,useful:"6.X",params:"?dajinengTTS=true&tuanfuTTS=true&inPartyOnly=true"},teamWatch:{type:"ACT悬浮窗",describe:"技能监控",img:v,useful:"6.X",params:"?scale=1"},mpTick:{type:"ACT悬浮窗",describe:"回蓝计时",img:"",useful:"All",params:""},castingToChinese:{type:"ACT悬浮窗",describe:"读条汉化",img:y,useful:"6.0",params:"?directive=false&focus=false&tts=false&hideProg=false&hideCountdown=false&roomaji=true&progHeight=10px&fontSize=20px&fontFamily=SmartisanHei&ping=80"},textCommandHelper:{type:"Any",describe:"文本指令助手",img:A,useful:"Any",params:"?postNamazuPost=2019"}},T=document.createElement("tr");for(var E in["类型","适用版本","点击跳转","预览"].forEach((function(e){var t=document.createElement("th");t.innerText=e,T.appendChild(t)})),C.appendChild(T),x){var w=x[E],S=document.createElement("tr"),L=document.createElement("td"),M=document.createElement("td"),j=document.createElement("td"),O=document.createElement("td"),k=document.createElement("a");k.href="./".concat(E,".html").concat(w.params),k.innerText=w.describe,"textCommandHelper"===E&&k.addEventListener("click",(function(){alert("可以在浏览器里直接打开。\n也可以加悬浮窗：ACT-插件-OverlayPlugin（NGLD），左下方“新建”，任意起名，类型选择“自订 - 标签”。添加完成后，在右侧窗体的路径中，填入跳转后的页面地址。\n如何联动鲶鱼精邮差：修改url链接中的端口号为鲶鱼精邮差监听的端口号且开启监听")})),"ACT悬浮窗"===w.type&&k.addEventListener("click",(function(){alert('如何添加悬浮窗：ACT-插件-OverlayPlugin（NGLD），左下方“新建”，任意起名，类型选择“自订 - 数据统计”。添加完成后，在右侧窗体的路径中，填入跳转后的页面地址。\n如何自定义属性：修改url链接中".html?"后方的字符串，若没有则无法自定义或有单独设置页面。')}));var N=new Image;N.src=w.img,O.appendChild(N),L.innerText=w.type,M.innerText=w.useful,S.appendChild(L),S.appendChild(M),S.appendChild(j),j.appendChild(k),S.appendChild(O),C.appendChild(S)}}()}();