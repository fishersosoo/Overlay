!function(){"use strict";var e={4434:function(e,n,t){var r=t(7537),o=t.n(r),a=t(3645),i=t.n(a)()(o());i.push([e.id,'*{box-sizing:border-box;padding:0;margin:0}body{font-size:20px;color:#fff;padding:2px 4px}#show{font-size:14px;text-shadow:-1px 0 1.5px #91ba5e,0 1.5px 1.5px #91ba5e,1px 0 1.5px #91ba5e,0 -1.5px 1.5px #91ba5e}#show::before{content:"LB:"}#extra{text-shadow:-1px 0 2px #a91a16,0 1.5px 2px #a91a16,1px 0 2px #a91a16,0 -1.5px 2px #a91a16;font-weight:bold}#extraAll{position:absolute;top:21px;right:0;font-size:14px;text-shadow:-1px 0 2px #a91a16,0 1.5px 2px #a91a16,1px 0 2px #a91a16,0 -1.5px 2px #a91a16}#extraAll::before{content:"奖励:"}.anime{animation:anime 5s;animation-fill-mode:forwards}@keyframes anime{0%{opacity:0;height:0px;font-size:.5em}4%{opacity:1;height:26px;font-size:1.2em}6%{font-size:1em}70%{opacity:1}90%{opacity:0;height:26px}100%{opacity:0;height:0px}}',"",{version:3,sources:["webpack://./src/limitBreakTip/index.scss"],names:[],mappings:"AAAA,EAAA,qBACE,CAAA,SACA,CAAA,QACA,CAAA,KAEF,cACE,CAAA,UACA,CAAA,eACA,CAAA,MAEF,cAIE,CAAA,iGACA,CAAA,cAJA,aACE,CAAA,OAMJ,yFACE,CAAA,gBACA,CAAA,UAEF,iBAIE,CAAA,QACA,CAAA,OACA,CAAA,cACA,CAAA,yFACA,CAAA,kBAPA,aACE,CAAA,OAQJ,kBACE,CAAA,4BACA,CAAA,iBAEF,GACE,SACE,CAAA,UACA,CAAA,cACA,CAAA,GAEF,SACE,CAAA,WACA,CAAA,eACA,CAAA,GAEF,aACE,CAAA,IAEF,SACE,CAAA,IAEF,SACE,CAAA,WACA,CAAA,KAEF,SACE,CAAA,UACA,CAAA",sourcesContent:['* {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\nbody {\r\n  font-size: 20px;\r\n  color: white;\r\n  padding: 2px 4px;\r\n}\r\n#show {\r\n  &::before {\r\n    content: "LB:";\r\n  }\r\n  font-size: 14px;\r\n  text-shadow: -1px 0 1.5px rgb(145, 186, 94), 0 1.5px 1.5px rgb(145, 186, 94), 1px 0 1.5px rgb(145, 186, 94),\r\n    0 -1.5px 1.5px rgb(145, 186, 94);\r\n}\r\n#extra {\r\n  text-shadow: -1px 0 2px rgb(169, 26, 22), 0 1.5px 2px rgb(169, 26, 22), 1px 0 2px rgb(169, 26, 22), 0 -1.5px 2px rgb(169, 26, 22);\r\n  font-weight: bold;\r\n}\r\n#extraAll {\r\n  &::before {\r\n    content: "奖励:";\r\n  }\r\n  position: absolute;\r\n  top: 21px;\r\n  right: 0;\r\n  font-size: 14px;\r\n  text-shadow: -1px 0 2px rgb(169, 26, 22), 0 1.5px 2px rgb(169, 26, 22), 1px 0 2px rgb(169, 26, 22), 0 -1.5px 2px rgb(169, 26, 22);\r\n}\r\n.anime {\r\n  animation: anime 5s;\r\n  animation-fill-mode: forwards;\r\n}\r\n@keyframes anime {\r\n  0% {\r\n    opacity: 0;\r\n    height: 0px;\r\n    font-size: 0.5em;\r\n  }\r\n  4% {\r\n    opacity: 1;\r\n    height: 26px;\r\n    font-size: 1.2em;\r\n  }\r\n  6% {\r\n    font-size: 1em;\r\n  }\r\n  70% {\r\n    opacity: 1;\r\n  }\r\n  90% {\r\n    opacity: 0;\r\n    height: 26px;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n    height: 0px;\r\n  }\r\n}\r\n'],sourceRoot:""}]),n.Z=i},3645:function(e){e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var p=0;p<e.length;p++){var A=[].concat(e[p]);r&&i[A[0]]||(void 0!==a&&(void 0===A[5]||(A[1]="@layer".concat(A[5].length>0?" ".concat(A[5]):""," {").concat(A[1],"}")),A[5]=a),t&&(A[2]?(A[1]="@media ".concat(A[2]," {").concat(A[1],"}"),A[2]=t):A[2]=t),o&&(A[4]?(A[1]="@supports (".concat(A[4],") {").concat(A[1],"}"),A[4]=o):A[4]="".concat(o)),n.push(A))}},n}},7537:function(e){e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),i=t.sources.map((function(e){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([a]).join("\n")}return[n].join("\n")}},3379:function(e){var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],p=r.base?s[0]+r.base:s[0],A=a[p]||0,u="".concat(p," ").concat(A);a[p]=A+1;var l=t(u),d={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)n[l].references++,n[l].updater(d);else{var f=o(d,r);r.byIndex=c,n.splice(c,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=t(a[i]);n[c].references--}for(var s=r(e,o),p=0;p<a.length;p++){var A=t(a[p]);0===n[A].references&&(n[A].updater(),n.splice(A,1))}a=s}}},569:function(e){var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},9216:function(e){e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},3565:function(e,n,t){e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},7795:function(e){e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},4589:function(e){e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,{a:n}),n},t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e=t(3379),n=t.n(e),r=t(7795),o=t.n(r),a=t(569),i=t.n(a),c=t(3565),s=t.n(c),p=t(9216),A=t.n(p),u=t(4589),l=t.n(u),d=t(4434),f={};f.styleTagTransform=l(),f.setAttributes=s(),f.insert=i().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=A(),n()(d.Z,f),d.Z&&d.Z.locals&&d.Z.locals,function(){var e=document.querySelector("#loading");e&&e.remove();var n=document.createElement("div");n.style.height="100vh",n.style.width="100vw",n.style.zIndex="10",n.style.color="white",n.style.textShadow="-1px 0 2px #000, 0 1px 2px #000, 1px 0 2px #000, 0 -1px 2px #000",n.style.display="none",n.style.fontFamily="微软雅黑",n.style.fontWeight="bold",n.style.backgroundColor="rgba(0, 0, 150, 0.2)",n.style.position="fixed",n.style.bottom="0",n.style.fontSize="12px",n.style.alignItems="flex-end",n.style.justifyContent="center",n.id="readMe";var t=document.createElement("span");t.innerText="🔒这是供用户调整悬浮窗尺寸的蓝色背景，在ACT的Overlay(ngld)插件中锁定此悬浮窗便即会消失。",t.style.width="90vw",t.style.paddingBottom="8px",n.appendChild(t),document.body.appendChild(n),document.addEventListener("onOverlayStateUpdate",(function(e){return document.querySelector("#readMe").style.display=e.detail.isLocked?"none":"flex"}))}();var x,C,m=new URLSearchParams(new URL(window.location).search),h=parseInt(null!==(x=m.get("LBMax"))&&void 0!==x?x:3e4),v=Math.ceil(1e3*(parseInt(null!==(C=m.get("automatic"))&&void 0!==C?C:220)/h).toFixed(4))/1e3,y=0,g=0,b=0,T=0,E=document.querySelector("#show"),w=document.querySelector("#extra"),S=document.querySelector("#extraAll");function F(){T=0,E.innerHTML="0%",w.innerHTML="",S.innerText="0%"}function L(e){if("36"===e.line[0]){var n=(g=parseInt(e.line[2],16)/h)-y;if(E.innerHTML="".concat((100*g).toFixed(2),"%"),n>v){var t;b+=n,T+=n,S.innerText="".concat((100*T).toFixed(0),"%");var r=(100*b).toFixed(0);if(parseInt(null===(t=w.lastChild)||void 0===t?void 0:t.innerText)===r-1)w.lastChild.innerText="+".concat(r,"%");else{var o=document.createElement("p");o.innerText="+".concat(r,"%"),o.classList.add("anime"),o.setAttribute("data-time",(new Date).toTimeString().substring(0,8)),w.appendChild(o)}}else b=0;y=g}}addOverlayListener("ChangeZone",(function(){return F()})),addOverlayListener("onPartyWipe",(function(){return F()})),addOverlayListener("LogLine",(function(e){return L(e)})),startOverlayEvents(),"true"===m.get("test")&&function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=[["36","2021-12-28T21:38:30.3580000+08:00","0000"],["36","2021-12-28T21:38:33.3580000+08:00","00DC"],["36","2021-12-28T21:38:34.8290000+08:00","0208"],["36","2021-12-28T21:38:36.3460000+08:00","02E4"],["36","2021-12-28T21:38:37.8630000+08:00","0410"],["36","2021-12-28T21:38:39.3360000+08:00","04EC"],["36","2021-12-28T21:38:42.3720000+08:00","05C8"],["36","2021-12-28T21:38:45.3620000+08:00","06A4"],["36","2021-12-28T21:38:47.8140000+08:00","07D0"],["36","2021-12-28T21:38:47.8140000+08:00","08FC"],["36","2021-12-28T21:38:47.8140000+08:00","0A28"],["36","2021-12-28T21:38:47.8140000+08:00","0B54"],["36","2021-12-28T21:38:47.8140000+08:00","0C80"],["36","2021-12-28T21:38:48.3510000+08:00","0D5C"],["36","2021-12-28T21:38:50.6220000+08:00","0E88"],["36","2021-12-28T21:38:50.8900000+08:00","0FB4"],["36","2021-12-28T21:38:51.0230000+08:00","10E0"],["36","2021-12-28T21:38:51.1570000+08:00","120C"],["36","2021-12-28T21:38:51.3360000+08:00","12E8"],["36","2021-12-28T21:38:54.3690000+08:00","13C4"],["36","2021-12-28T21:38:57.3570000+08:00","14A0"],["36","2021-12-28T21:38:58.3360000+08:00","15CC"],["36","2021-12-28T21:38:58.3360000+08:00","16F8"],["36","2021-12-28T21:38:58.3360000+08:00","1824"],["36","2021-12-28T21:38:58.3360000+08:00","1950"],["36","2021-12-28T21:38:58.3360000+08:00","1A7C"],["36","2021-12-28T21:39:00.3410000+08:00","1B58"],["36","2021-12-28T21:39:03.3690000+08:00","1C34"],["36","2021-12-28T21:39:04.2630000+08:00","1D60"],["36","2021-12-28T21:39:06.3600000+08:00","1E3C"]],t=0,r=function(r){var o=new Date(n[r][1])-new Date(n[r-1][1]);t+=o,setTimeout((function(){L({line:n[r]})}),t/e)},o=1;o<n.length;o++)r(o)}(2)}()}();