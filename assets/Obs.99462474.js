import{k as fe,l as de,o as he,f as pe,g as k,n as $,ah as K,u as B,am as ve,aa as Z,t as ye,j,p as Ce,i as ge}from"./vendor.813eed01.js";import{c as I,a as me}from"./_commonjsHelpers.88e99c8f.js";import"./hasOverlayPluginApi.ecf97ca4.js";import{_ as we}from"./index.793e9a59.js";import"./sweetalert2.6e640675.js";import"https://overlay.diemoe.net/common/common.min.js";var W={exports:{}},O=1e3,M=O*60,E=M*60,R=E*24,_e=R*7,Fe=R*365.25,be=function(n,s){s=s||{};var e=typeof n;if(e==="string"&&n.length>0)return xe(n);if(e==="number"&&isFinite(n))return s.long?Ae(n):ke(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))};function xe(n){if(n=String(n),!(n.length>100)){var s=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(n);if(!!s){var e=parseFloat(s[1]),f=(s[2]||"ms").toLowerCase();switch(f){case"years":case"year":case"yrs":case"yr":case"y":return e*Fe;case"weeks":case"week":case"w":return e*_e;case"days":case"day":case"d":return e*R;case"hours":case"hour":case"hrs":case"hr":case"h":return e*E;case"minutes":case"minute":case"mins":case"min":case"m":return e*M;case"seconds":case"second":case"secs":case"sec":case"s":return e*O;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return e;default:return}}}}function ke(n){var s=Math.abs(n);return s>=R?Math.round(n/R)+"d":s>=E?Math.round(n/E)+"h":s>=M?Math.round(n/M)+"m":s>=O?Math.round(n/O)+"s":n+"ms"}function Ae(n){var s=Math.abs(n);return s>=R?U(n,s,R,"day"):s>=E?U(n,s,E,"hour"):s>=M?U(n,s,M,"minute"):s>=O?U(n,s,O,"second"):n+" ms"}function U(n,s,e,f){var y=s>=e*1.5;return Math.round(n/e)+" "+f+(y?"s":"")}function Be(n){e.debug=e,e.default=e,e.coerce=c,e.disable=v,e.enable=y,e.enabled=b,e.humanize=be,e.destroy=u,Object.keys(n).forEach(o=>{e[o]=n[o]}),e.names=[],e.skips=[],e.formatters={};function s(o){let i=0;for(let d=0;d<o.length;d++)i=(i<<5)-i+o.charCodeAt(d),i|=0;return e.colors[Math.abs(i)%e.colors.length]}e.selectColor=s;function e(o){let i,d=null,p,g;function h(...a){if(!h.enabled)return;const l=h,t=Number(new Date),r=t-(i||t);l.diff=r,l.prev=i,l.curr=t,i=t,a[0]=e.coerce(a[0]),typeof a[0]!="string"&&a.unshift("%O");let C=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(_,F)=>{if(_==="%%")return"%";C++;const x=e.formatters[F];if(typeof x=="function"){const A=a[C];_=x.call(l,A),a.splice(C,1),C--}return _}),e.formatArgs.call(l,a),(l.log||e.log).apply(l,a)}return h.namespace=o,h.useColors=e.useColors(),h.color=e.selectColor(o),h.extend=f,h.destroy=e.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>d!==null?d:(p!==e.namespaces&&(p=e.namespaces,g=e.enabled(o)),g),set:a=>{d=a}}),typeof e.init=="function"&&e.init(h),h}function f(o,i){const d=e(this.namespace+(typeof i=="undefined"?":":i)+o);return d.log=this.log,d}function y(o){e.save(o),e.namespaces=o,e.names=[],e.skips=[];let i;const d=(typeof o=="string"?o:"").split(/[\s,]+/),p=d.length;for(i=0;i<p;i++)!d[i]||(o=d[i].replace(/\*/g,".*?"),o[0]==="-"?e.skips.push(new RegExp("^"+o.substr(1)+"$")):e.names.push(new RegExp("^"+o+"$")))}function v(){const o=[...e.names.map(m),...e.skips.map(m).map(i=>"-"+i)].join(",");return e.enable(""),o}function b(o){if(o[o.length-1]==="*")return!0;let i,d;for(i=0,d=e.skips.length;i<d;i++)if(e.skips[i].test(o))return!1;for(i=0,d=e.names.length;i<d;i++)if(e.names[i].test(o))return!0;return!1}function m(o){return o.toString().substring(2,o.toString().length-2).replace(/\.\*\?$/,"*")}function c(o){return o instanceof Error?o.stack||o.message:o}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return e.enable(e.load()),e}var Le=Be;(function(n,s){s.formatArgs=f,s.save=y,s.load=v,s.useColors=e,s.storage=b(),s.destroy=(()=>{let c=!1;return()=>{c||(c=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),s.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function e(){return typeof window!="undefined"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document!="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function f(c){if(c[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+c[0]+(this.useColors?"%c ":" ")+"+"+n.exports.humanize(this.diff),!this.useColors)return;const u="color: "+this.color;c.splice(1,0,u,"color: inherit");let o=0,i=0;c[0].replace(/%[a-zA-Z%]/g,d=>{d!=="%%"&&(o++,d==="%c"&&(i=o))}),c.splice(i,0,u)}s.log=console.debug||console.log||(()=>{});function y(c){try{c?s.storage.setItem("debug",c):s.storage.removeItem("debug")}catch{}}function v(){let c;try{c=s.storage.getItem("debug")}catch{}return!c&&typeof process!="undefined"&&"env"in process&&(c={}.DEBUG),c}function b(){try{return localStorage}catch{}}n.exports=Le(s);const{formatters:m}=n.exports;m.j=function(c){try{return JSON.stringify(c)}catch(u){return"[UnexpectedJSONParseError]: "+u.message}}})(W,W.exports);var Ie=W.exports,Y={exports:{}};(function(n){var s=Object.prototype.hasOwnProperty,e="~";function f(){}Object.create&&(f.prototype=Object.create(null),new f().__proto__||(e=!1));function y(c,u,o){this.fn=c,this.context=u,this.once=o||!1}function v(c,u,o,i,d){if(typeof o!="function")throw new TypeError("The listener must be a function");var p=new y(o,i||c,d),g=e?e+u:u;return c._events[g]?c._events[g].fn?c._events[g]=[c._events[g],p]:c._events[g].push(p):(c._events[g]=p,c._eventsCount++),c}function b(c,u){--c._eventsCount==0?c._events=new f:delete c._events[u]}function m(){this._events=new f,this._eventsCount=0}m.prototype.eventNames=function(){var u=[],o,i;if(this._eventsCount===0)return u;for(i in o=this._events)s.call(o,i)&&u.push(e?i.slice(1):i);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(o)):u},m.prototype.listeners=function(u){var o=e?e+u:u,i=this._events[o];if(!i)return[];if(i.fn)return[i.fn];for(var d=0,p=i.length,g=new Array(p);d<p;d++)g[d]=i[d].fn;return g},m.prototype.listenerCount=function(u){var o=e?e+u:u,i=this._events[o];return i?i.fn?1:i.length:0},m.prototype.emit=function(u,o,i,d,p,g){var h=e?e+u:u;if(!this._events[h])return!1;var a=this._events[h],l=arguments.length,t,r;if(a.fn){switch(a.once&&this.removeListener(u,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,o),!0;case 3:return a.fn.call(a.context,o,i),!0;case 4:return a.fn.call(a.context,o,i,d),!0;case 5:return a.fn.call(a.context,o,i,d,p),!0;case 6:return a.fn.call(a.context,o,i,d,p,g),!0}for(r=1,t=new Array(l-1);r<l;r++)t[r-1]=arguments[r];a.fn.apply(a.context,t)}else{var C=a.length,w;for(r=0;r<C;r++)switch(a[r].once&&this.removeListener(u,a[r].fn,void 0,!0),l){case 1:a[r].fn.call(a[r].context);break;case 2:a[r].fn.call(a[r].context,o);break;case 3:a[r].fn.call(a[r].context,o,i);break;case 4:a[r].fn.call(a[r].context,o,i,d);break;default:if(!t)for(w=1,t=new Array(l-1);w<l;w++)t[w-1]=arguments[w];a[r].fn.apply(a[r].context,t)}}return!0},m.prototype.on=function(u,o,i){return v(this,u,o,i,!1)},m.prototype.once=function(u,o,i){return v(this,u,o,i,!0)},m.prototype.removeListener=function(u,o,i,d){var p=e?e+u:u;if(!this._events[p])return this;if(!o)return b(this,p),this;var g=this._events[p];if(g.fn)g.fn===o&&(!d||g.once)&&(!i||g.context===i)&&b(this,p);else{for(var h=0,a=[],l=g.length;h<l;h++)(g[h].fn!==o||d&&!g[h].once||i&&g[h].context!==i)&&a.push(g[h]);a.length?this._events[p]=a.length===1?a[0]:a:b(this,p)}return this},m.prototype.removeAllListeners=function(u){var o;return u?(o=e?e+u:u,this._events[o]&&b(this,o)):(this._events=new f,this._eventsCount=0),this},m.prototype.off=m.prototype.removeListener,m.prototype.addListener=m.prototype.on,m.prefixed=e,m.EventEmitter=m,n.exports=m})(Y);var Q=Y.exports,D=null;typeof WebSocket!="undefined"?D=WebSocket:typeof MozWebSocket!="undefined"?D=MozWebSocket:typeof I!="undefined"?D=I.WebSocket||I.MozWebSocket:typeof window!="undefined"?D=window.WebSocket||window.MozWebSocket:typeof self!="undefined"&&(D=self.WebSocket||self.MozWebSocket);var X=D,ee={exports:{}},J={exports:{}};(function(n,s){(function(e,f){n.exports=f()})(I,function(){var e=e||function(f,y){var v;if(typeof window!="undefined"&&window.crypto&&(v=window.crypto),typeof self!="undefined"&&self.crypto&&(v=self.crypto),typeof globalThis!="undefined"&&globalThis.crypto&&(v=globalThis.crypto),!v&&typeof window!="undefined"&&window.msCrypto&&(v=window.msCrypto),!v&&typeof I!="undefined"&&I.crypto&&(v=I.crypto),!v&&typeof me=="function")try{v=require("crypto")}catch{}var b=function(){if(v){if(typeof v.getRandomValues=="function")try{return v.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof v.randomBytes=="function")try{return v.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},m=Object.create||function(){function t(){}return function(r){var C;return t.prototype=r,C=new t,t.prototype=null,C}}(),c={},u=c.lib={},o=u.Base=function(){return{extend:function(t){var r=m(this);return t&&r.mixIn(t),(!r.hasOwnProperty("init")||this.init===r.init)&&(r.init=function(){r.$super.init.apply(this,arguments)}),r.init.prototype=r,r.$super=this,r},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),i=u.WordArray=o.extend({init:function(t,r){t=this.words=t||[],r!=y?this.sigBytes=r:this.sigBytes=t.length*4},toString:function(t){return(t||p).stringify(this)},concat:function(t){var r=this.words,C=t.words,w=this.sigBytes,_=t.sigBytes;if(this.clamp(),w%4)for(var F=0;F<_;F++){var x=C[F>>>2]>>>24-F%4*8&255;r[w+F>>>2]|=x<<24-(w+F)%4*8}else for(var A=0;A<_;A+=4)r[w+A>>>2]=C[A>>>2];return this.sigBytes+=_,this},clamp:function(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=f.ceil(r/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var r=[],C=0;C<t;C+=4)r.push(b());return new i.init(r,t)}}),d=c.enc={},p=d.Hex={stringify:function(t){for(var r=t.words,C=t.sigBytes,w=[],_=0;_<C;_++){var F=r[_>>>2]>>>24-_%4*8&255;w.push((F>>>4).toString(16)),w.push((F&15).toString(16))}return w.join("")},parse:function(t){for(var r=t.length,C=[],w=0;w<r;w+=2)C[w>>>3]|=parseInt(t.substr(w,2),16)<<24-w%8*4;return new i.init(C,r/2)}},g=d.Latin1={stringify:function(t){for(var r=t.words,C=t.sigBytes,w=[],_=0;_<C;_++){var F=r[_>>>2]>>>24-_%4*8&255;w.push(String.fromCharCode(F))}return w.join("")},parse:function(t){for(var r=t.length,C=[],w=0;w<r;w++)C[w>>>2]|=(t.charCodeAt(w)&255)<<24-w%4*8;return new i.init(C,r)}},h=d.Utf8={stringify:function(t){try{return decodeURIComponent(escape(g.stringify(t)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(t){return g.parse(unescape(encodeURIComponent(t)))}},a=u.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new i.init,this._nDataBytes=0},_append:function(t){typeof t=="string"&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var r,C=this._data,w=C.words,_=C.sigBytes,F=this.blockSize,x=F*4,A=_/x;t?A=f.ceil(A):A=f.max((A|0)-this._minBufferSize,0);var S=A*F,P=f.min(S*4,_);if(S){for(var H=0;H<S;H+=F)this._doProcessBlock(w,H);r=w.splice(0,S),C.sigBytes-=P}return new i.init(r,P)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});u.Hasher=a.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){a.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var r=this._doFinalize();return r},blockSize:512/32,_createHelper:function(t){return function(r,C){return new t.init(C).finalize(r)}},_createHmacHelper:function(t){return function(r,C){return new l.HMAC.init(t,C).finalize(r)}}});var l=c.algo={};return c}(Math);return e})})(J);(function(n,s){(function(e,f){n.exports=f(J.exports)})(I,function(e){return function(f){var y=e,v=y.lib,b=v.WordArray,m=v.Hasher,c=y.algo,u=[],o=[];(function(){function p(l){for(var t=f.sqrt(l),r=2;r<=t;r++)if(!(l%r))return!1;return!0}function g(l){return(l-(l|0))*4294967296|0}for(var h=2,a=0;a<64;)p(h)&&(a<8&&(u[a]=g(f.pow(h,1/2))),o[a]=g(f.pow(h,1/3)),a++),h++})();var i=[],d=c.SHA256=m.extend({_doReset:function(){this._hash=new b.init(u.slice(0))},_doProcessBlock:function(p,g){for(var h=this._hash.words,a=h[0],l=h[1],t=h[2],r=h[3],C=h[4],w=h[5],_=h[6],F=h[7],x=0;x<64;x++){if(x<16)i[x]=p[g+x]|0;else{var A=i[x-15],S=(A<<25|A>>>7)^(A<<14|A>>>18)^A>>>3,P=i[x-2],H=(P<<15|P>>>17)^(P<<13|P>>>19)^P>>>10;i[x]=S+i[x-7]+H+i[x-16]}var ie=C&w^~C&_,ae=a&l^a&t^l&t,ce=(a<<30|a>>>2)^(a<<19|a>>>13)^(a<<10|a>>>22),ue=(C<<26|C>>>6)^(C<<21|C>>>11)^(C<<7|C>>>25),G=F+ue+ie+o[x]+i[x],le=ce+ae;F=_,_=w,w=C,C=r+G|0,r=t,t=l,l=a,a=G+le|0}h[0]=h[0]+a|0,h[1]=h[1]+l|0,h[2]=h[2]+t|0,h[3]=h[3]+r|0,h[4]=h[4]+C|0,h[5]=h[5]+w|0,h[6]=h[6]+_|0,h[7]=h[7]+F|0},_doFinalize:function(){var p=this._data,g=p.words,h=this._nDataBytes*8,a=p.sigBytes*8;return g[a>>>5]|=128<<24-a%32,g[(a+64>>>9<<4)+14]=f.floor(h/4294967296),g[(a+64>>>9<<4)+15]=h,p.sigBytes=g.length*4,this._process(),this._hash},clone:function(){var p=m.clone.call(this);return p._hash=this._hash.clone(),p}});y.SHA256=m._createHelper(d),y.HmacSHA256=m._createHmacHelper(d)}(Math),e.SHA256})})(ee);var te=ee.exports,ne={exports:{}};(function(n,s){(function(e,f){n.exports=f(J.exports)})(I,function(e){return function(){var f=e,y=f.lib,v=y.WordArray,b=f.enc;b.Base64={stringify:function(c){var u=c.words,o=c.sigBytes,i=this._map;c.clamp();for(var d=[],p=0;p<o;p+=3)for(var g=u[p>>>2]>>>24-p%4*8&255,h=u[p+1>>>2]>>>24-(p+1)%4*8&255,a=u[p+2>>>2]>>>24-(p+2)%4*8&255,l=g<<16|h<<8|a,t=0;t<4&&p+t*.75<o;t++)d.push(i.charAt(l>>>6*(3-t)&63));var r=i.charAt(64);if(r)for(;d.length%4;)d.push(r);return d.join("")},parse:function(c){var u=c.length,o=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var d=0;d<o.length;d++)i[o.charCodeAt(d)]=d}var p=o.charAt(64);if(p){var g=c.indexOf(p);g!==-1&&(u=g)}return m(c,u,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function m(c,u,o){for(var i=[],d=0,p=0;p<u;p++)if(p%4){var g=o[c.charCodeAt(p-1)]<<p%4*2,h=o[c.charCodeAt(p)]>>>6-p%4*2,a=g|h;i[d>>>2]|=a<<24-d%4*8,d++}return v.create(i,d)}}(),e.enc.Base64})})(ne);var re=ne.exports;function q(){return q=Object.assign?Object.assign.bind():function(n){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var f in e)Object.prototype.hasOwnProperty.call(e,f)&&(n[f]=e[f])}return n},q.apply(this,arguments)}function Pe(n,s){if(n==null)return{};var e={},f=Object.keys(n),y,v;for(v=0;v<f.length;v++)y=f[v],!(s.indexOf(y)>=0)&&(e[y]=n[y]);return e}var L;(function(n){n[n.Hello=0]="Hello",n[n.Identify=1]="Identify",n[n.Identified=2]="Identified",n[n.Reidentify=3]="Reidentify",n[n.Event=5]="Event",n[n.Request=6]="Request",n[n.RequestResponse=7]="RequestResponse",n[n.RequestBatch=8]="RequestBatch",n[n.RequestBatchResponse=9]="RequestBatchResponse"})(L||(L={}));var se;(function(n){n[n.None=0]="None",n[n.General=1]="General",n[n.Config=2]="Config",n[n.Scenes=4]="Scenes",n[n.Inputs=8]="Inputs",n[n.Transitions=16]="Transitions",n[n.Filters=32]="Filters",n[n.Outputs=64]="Outputs",n[n.SceneItems=128]="SceneItems",n[n.MediaInputs=256]="MediaInputs",n[n.Vendors=512]="Vendors",n[n.Ui=1024]="Ui",n[n.All=1023]="All",n[n.InputVolumeMeters=65536]="InputVolumeMeters",n[n.InputActiveStateChanged=131072]="InputActiveStateChanged",n[n.InputShowStateChanged=262144]="InputShowStateChanged",n[n.SceneItemTransformChanged=524288]="SceneItemTransformChanged"})(se||(se={}));var oe;(function(n){n[n.None=-1]="None",n[n.SerialRealtime=0]="SerialRealtime",n[n.SerialFrame=1]="SerialFrame",n[n.Parallel=2]="Parallel"})(oe||(oe={}));function Re(n,s,e){const f=re.stringify(te(e+n));return re.stringify(te(f+s))}const Se=["authentication","rpcVersion"],z=Ie("obs-websocket-js");class N extends Error{constructor(s,e){super(e);this.code=void 0,this.code=s}}class T extends Q{constructor(...s){super(...s);this._identified=!1,this.internalListeners=new Q,this.socket=void 0}static generateMessageId(){return String(T.requestCounter++)}get identified(){return this._identified}async connect(s="ws://127.0.0.1:4455",e,f={}){var y=this;this.socket&&await this.disconnect();try{const v=this.internalEventPromise("ConnectionClosed"),b=this.internalEventPromise("ConnectionError");return await Promise.race([async function(){const m=await y.createConnection(s);return y.emit("Hello",m),y.identify(m,e,f)}(),new Promise((m,c)=>{b.then(u=>{u.message&&c(u)}),v.then(u=>{c(u)})})])}catch(v){throw await this.disconnect(),v}}async disconnect(){if(!this.socket||this.socket.readyState===X.CLOSED)return;const s=this.internalEventPromise("ConnectionClosed");this.socket.close(),await s}async reidentify(s){const e=this.internalEventPromise(`op:${L.Identified}`);return await this.message(L.Reidentify,s),e}async call(s,e){const f=T.generateMessageId(),y=this.internalEventPromise(`res:${f}`);await this.message(L.Request,{requestId:f,requestType:s,requestData:e});const{requestStatus:v,responseData:b}=await y;if(!v.result)throw new N(v.code,v.comment);return b}cleanup(){!this.socket||(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,this.socket=void 0,this._identified=!1,this.internalListeners.removeAllListeners())}async createConnection(s){var e;const f=this.internalEventPromise("ConnectionOpened"),y=this.internalEventPromise(`op:${L.Hello}`);this.socket=new X(s,this.protocol),this.socket.onopen=this.onOpen.bind(this),this.socket.onmessage=this.onMessage.bind(this),this.socket.onerror=this.onError.bind(this),this.socket.onclose=this.onClose.bind(this),await f;const v=(e=this.socket)==null?void 0:e.protocol;if(!v)throw new N(-1,"Server sent no subprotocol");if(v!==this.protocol)throw new N(-1,"Server sent an invalid subprotocol");return y}async identify(s,e,f={}){let{authentication:y,rpcVersion:v}=s,b=Pe(s,Se);const m=q({rpcVersion:v},f);y&&e&&(m.authentication=Re(y.salt,y.challenge,e));const c=this.internalEventPromise(`op:${L.Identified}`);await this.message(L.Identify,m);const u=await c;return this._identified=!0,this.emit("Identified",u),q({rpcVersion:v},b,u)}async message(s,e){if(!this.socket)throw new Error("Not connected");if(!this.identified&&s!==1)throw new Error("Socket not identified");const f=await this.encodeMessage({op:s,d:e});this.socket.send(f)}async internalEventPromise(s){return new Promise(e=>{this.internalListeners.once(s,e)})}onOpen(s){z("socket.open"),this.emit("ConnectionOpened"),this.internalListeners.emit("ConnectionOpened",s)}async onMessage(s){try{const{op:e,d:f}=await this.decodeMessage(s.data);if(z("socket.message: %d %j",e,f),e===void 0||f===void 0)return;switch(e){case L.Event:{const{eventType:y,eventData:v}=f;this.emit(y,v);return}case L.RequestResponse:{const{requestId:y}=f;this.internalListeners.emit(`res:${y}`,f);return}default:this.internalListeners.emit(`op:${e}`,f)}}catch(e){z("error handling message: %o",e)}}onError(s){z("socket.error: %o",s);const e=new N(-1,s.message);this.emit("ConnectionError",e),this.internalListeners.emit("ConnectionError",e)}onClose(s){z("socket.close: %s (%d)",s.reason,s.code);const e=new N(s.code,s.reason);this.emit("ConnectionClosed",e),this.internalListeners.emit("ConnectionClosed",e),this.cleanup()}}T.requestCounter=1;typeof exports!="undefined"&&Object.defineProperty(exports,"__esModule",{value:!0});class Oe extends T{constructor(...s){super(...s);this.protocol="obswebsocket.json"}async encodeMessage(s){return JSON.stringify(s)}async decodeMessage(s){return JSON.parse(s)}}const V=n=>(Ce("data-v-5920fb8e"),n=n(),ge(),n),Me={id:"container"},Ee=j(" \u5730\u5740"),De=V(()=>k("br",null,null,-1)),He=j(" \u7AEF\u53E3"),$e=V(()=>k("br",null,null,-1)),je=j(" \u5BC6\u7801"),ze=["type"],Ne=V(()=>k("br",null,null,-1)),Te={style:{"user-select":"none"},for:"auto"},Ve=j(" \u81EA\u52A8\u8FDE\u63A5 "),Ue={style:{"user-select":"none"},for:"partyLength"},qe=j(" \u4EC5\u5728\u5C0F\u961F\u4EBA\u6570\u57285~8\u4EBA\u65F6\u5F55\u5236 "),We=V(()=>k("br",null,null,-1)),Je=V(()=>k("br",null,null,-1)),Ge=["disabled"],Ke=["disabled"],Ze=["disabled"],Ye=fe({setup(n){let s=!1;const e=de({ip:"127.0.0.1",port:"4455",password:"Yim1psOoJJ8s96Lc",autoConnect:!1,partyLength:!0,connect:!1,status:"\u7A7A\u95F2",passowrdShow:!1}),f={party:[]};v();const y=new Oe;y.on("ExitStarted",m),y.on("ConnectionClosed",m),y.on("ConnectionError",m),addOverlayListener("onLogEvent",h),addOverlayListener("onInCombatChangedEvent",g),addOverlayListener("PartyChanged",a),startOverlayEvents(),setTimeout(async()=>{e.autoConnect&&await c()},1e3);function v(){var t,r,C,w,_,F;const l=JSON.parse((t=localStorage.getItem("ObsData"))!=null?t:"{}");e.ip=(r=l==null?void 0:l.ip)!=null?r:e.ip,e.port=(C=l==null?void 0:l.port)!=null?C:e.port,e.password=(w=l==null?void 0:l.password)!=null?w:e.password,e.autoConnect=(_=l==null?void 0:l.autoConnect)!=null?_:e.autoConnect,e.partyLength=(F=l==null?void 0:l.partyLength)!=null?F:e.partyLength}function b(){localStorage.setItem("ObsData",JSON.stringify({ip:e.ip,port:e.port,password:e.password,autoConnect:e.autoConnect,partyLength:e.partyLength}))}function m(){e.status="closed",e.connect=!1}async function c(){try{const{obsWebSocketVersion:l,negotiatedRpcVersion:t}=await y.connect(`ws://127.0.0.1:${e.port}`,e.password,{rpcVersion:1});e.status=`\u6210\u529F ${l} (using RPC ${t})`,e.connect=!0}catch(l){e.status=`\u5931\u8D25 ${l.code} ${l.message}`,e.connect=!1}}async function u(){await c()}async function o(){await y.disconnect()}function i(){!e.connect||(e.partyLength&&f.party.length<=8&&f.party.length>=5?y.call("StartRecord"):e.partyLength||y.call("StartRecord"))}async function d(){await y.call("StopRecord").catch(()=>{})}function p(){y.call("GetRecordStatus").then(async l=>{l.outputActive?await d().then(()=>setTimeout(()=>p(),1e3)):i()})}async function g(l){!s&&l.detail.inACTCombat&&p(),s&&!l.detail.inACTCombat&&d(),s=l.detail.inACTCombat}async function h(l){for(const t of l.detail.logs)/^.{14} \w+ 00:(?:00B9|0139)::?(?:距离战斗开始还有|Battle commencing in |戦闘開始まで)\d+[^（(]+[（(]/i.test(t)?p():(/^.{14} (?:Director |)21:.{8}:4000001[026]/.test(t)||/^.{14} ChatLog 00:0038::end$/i.test(t))&&d()}function a(l){var t;f.party=(t=l==null?void 0:l.party)!=null?t:[]}return window.onunload=async()=>{await y.disconnect()},(l,t)=>(he(),pe("div",Me,[k("form",null,[Ee,$(k("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=r=>B(e).ip=r)},null,512),[[K,B(e).ip]]),De,He,$(k("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=r=>B(e).port=r)},null,512),[[K,B(e).port]]),$e,je,$(k("input",{type:B(e).passowrdShow?"text":"password","onUpdate:modelValue":t[2]||(t[2]=r=>B(e).password=r),autocomplete:"on"},null,8,ze),[[ve,B(e).password]]),k("button",{onClick:t[3]||(t[3]=r=>B(e).passowrdShow=!B(e).passowrdShow)}," \u{1F440} "),Ne,k("label",Te,[$(k("input",{type:"checkbox",id:"auto","onUpdate:modelValue":t[4]||(t[4]=r=>B(e).autoConnect=r)},null,512),[[Z,B(e).autoConnect]]),Ve]),k("label",Ue,[$(k("input",{type:"checkbox",id:"partyLength","onUpdate:modelValue":t[5]||(t[5]=r=>B(e).partyLength=r)},null,512),[[Z,B(e).partyLength]]),qe]),We,k("button",{onClick:b},"\u4FDD\u5B58\u8BBE\u7F6E")]),Je,k("p",null,"\u8FDE\u63A5\u72B6\u6001\uFF1A"+ye(B(e).status),1),k("button",{disabled:B(e).connect,onClick:u},"\u8FDE\u63A5",8,Ge),k("button",{disabled:!B(e).connect,onClick:o},"\u65AD\u5F00",8,Ke),k("button",{disabled:!B(e).connect,onClick:p},"\u624B\u52A8\u5F00\u59CB\u5F55\u5236",8,Ze)]))}});var st=we(Ye,[["__scopeId","data-v-5920fb8e"]]);export{st as default};
