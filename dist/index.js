!function(){"use strict";var e={691:function(e,t,n){var r=n(537),o=n.n(r),a=n(645),c=n.n(a)()(o());c.push([e.id,"body table{border-collapse:collapse}body table td{text-align:center;padding:5px 5px;border:1px #d3d3d3 solid}*{padding:0;margin:0}","",{version:3,sources:["webpack://./src/index/index.scss"],names:[],mappings:"AACE,WACE,wBAAA,CACA,cACE,iBAAA,CACA,eAAA,CACA,wBAAA,CAIN,EACE,SAAA,CACA,QAAA",sourcesContent:["body {\r\n  table {\r\n    border-collapse: collapse;\r\n    td {\r\n      text-align: center;\r\n      padding: 5px 5px;\r\n      border: 1px lightgray solid;\r\n    }\r\n  }\r\n}\r\n* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n"],sourceRoot:""}]),t.Z=c},645:function(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(c[s]=!0)}for(var u=0;u<e.length;u++){var p=[].concat(e[u]);r&&c[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),n&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=n):p[2]=n),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),t.push(p))}},t}},537:function(e){e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),c=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(e," */")}));return[t].concat(c).concat([a]).join("\n")}return[t].join("\n")}},379:function(e){var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},c=[],i=0;i<e.length;i++){var s=e[i],u=r.base?s[0]+r.base:s[0],p=a[u]||0,d="".concat(u," ").concat(p);a[u]=p+1;var l=n(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)t[l].references++,t[l].updater(f);else{var m=o(f,r);r.byIndex=i,t.splice(i,0,{identifier:d,updater:m,references:1})}c.push(d)}return c}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var i=n(a[c]);t[i].references--}for(var s=r(e,o),u=0;u<a.length;u++){var p=n(a[u]);0===t[p].references&&(t[p].updater(),t.splice(p,1))}a=s}}},569:function(e){var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:function(e){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:function(e,t,n){e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:function(e){e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:function(e){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},332:function(e,t,n){e.exports=n.p+"images/b1d92d858fb5b6b33cbd.png"},275:function(e,t,n){e.exports=n.p+"images/f342eb11e8119cf8c69d.png"},285:function(e,t,n){e.exports=n.p+"images/18bb1c33cec0aeeb3bf3.png"},296:function(e,t,n){e.exports=n.p+"images/a5a8e8b114ae908b1bdc.png"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}(),function(){var e=n(379),t=n.n(e),r=n(795),o=n.n(r),a=n(569),c=n.n(a),i=n(565),s=n.n(i),u=n(216),p=n.n(u),d=n(589),l=n.n(d),f=n(691),m={};m.styleTagTransform=l(),m.setAttributes=s(),m.insert=c().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=p(),t()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;var g=n(332),b=n(275),v=n(285),h=n(296),y=document.querySelector("table"),A={fflogsUploaderDownload:{type:"HTML网页",describe:"FFLOGS上传器下载",img:"",useful:"永久"},triggerConverter:{type:"HTML网页",describe:"旧触发器正则转换",img:"",useful:"before 6.0"},castingMonitor:{type:"ACT悬浮窗",describe:"6.0施法监控",img:g,useful:"6.X"},keigennRecord:{type:"ACT悬浮窗",describe:"6.0减伤监控",img:b,useful:"6.X"},keySkillTimer:{type:"ACT悬浮窗",describe:"6.0团辅监控",img:v,useful:"6.X"},teamWatch:{type:"ACT悬浮窗",describe:"6.0技能监控",img:h,useful:"6.X"},mpTick:{type:"ACT悬浮窗",describe:"回蓝计时",img:"",useful:"All"}},C=document.createElement("tr");for(var x in["类型","适用版本","描述","预览","链接"].forEach((function(e){var t=document.createElement("th");t.innerText=e,C.appendChild(t)})),y.appendChild(C),A){var T=A[x],E=document.createElement("tr"),w=document.createElement("td"),S=document.createElement("td"),M=document.createElement("td"),j=document.createElement("td"),I=document.createElement("td"),L=document.createElement("a");L.href="./".concat(x,".html"),L.innerText="点击跳转",j.appendChild(L);var R=new Image;R.src=T.img,I.appendChild(R),w.innerText=T.type,S.innerText=T.useful,M.innerText=T.describe,E.appendChild(w),E.appendChild(S),E.appendChild(M),E.appendChild(I),E.appendChild(j),y.appendChild(E)}}()}();