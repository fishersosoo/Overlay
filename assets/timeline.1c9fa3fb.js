import{d as A,o as l,c,F as B,n as T,w as y,v as j,s as b,b as a,x as p,t as S,q as v,y as N}from"./vendor.3f586db1.js";import{_ as I}from"./index.28d3a419.js";import{u as C,U as h,A as z}from"./action.74adb01a.js";import{S as f}from"./sweetalert2.6e640675.js";const $=["innerHTML"],x=A({props:{config:null,lines:null,runtime:null,showStyle:null},setup(u){return(t,e)=>u.lines.length?(l(),c("ul",{key:0,class:"loadedTimelines",style:p(u.showStyle)},[(l(!0),c(B,null,T(u.lines,(s,i)=>y((l(),c("li",{key:i,class:b({upcoming:s.time-u.runtime<=u.config.discoloration,fade:s.time-u.runtime<=0-u.config.hold})},[a("aside",{style:p({right:Math.max((s.time-u.runtime)/u.config.displayDuration,0)*100+"%"})},null,4),a("section",null,[a("span",{innerHTML:s.action},null,8,$),a("span",null,S((s.time-u.runtime).toFixed(1)),1)])],2)),[[j,s.show&&s.time-u.runtime>0-u.config.hold-u.showStyle["--tras-duration"]&&s.time-u.runtime<=u.config.displayDuration]])),128))],4)):v("",!0)}});var G=I(x,[["__scopeId","data-v-c36895ac"]]),o;(function(u){u.\u663E\u793A\u8303\u56F4="displayDuration",u.\u53D8\u8272\u65F6\u95F4="discoloration",u.\u96F6\u540E\u6301\u7EED="hold",u.\u6218\u524D\u51C6\u5907="preBattle",u.TTS\u63D0\u524D\u91CF="ttsAdvance",u.\u5237\u65B0\u9891\u7387="refreshRateMs"})(o||(o={}));var D;(function(u){u.\u603B\u5BBD\u5EA6="--timeline-width",u.\u672A\u5230\u6765\u7F29\u653E="--normal-scale",u.\u5373\u5C06\u5230\u6765\u7F29\u653E="--up-coming-scale",u.\u5B57\u4F53\u5C3A\u5BF8="--font-size",u.\u53D8\u8272\u52A8\u753B\u65F6\u95F4="--tras-duration",u.\u672A\u5230\u6765\u4E0D\u900F\u660E\u5EA6="--opacity"})(D||(D={}));const E=C();class L{constructor(t,e,s,i){this.name=t,this.condition=e,this.timeline=s,this.codeFight=i,this.create=new Date().toLocaleString()}}const k={[o.\u663E\u793A\u8303\u56F4]:"\u663E\u793A\u8303\u56F4\uFF08\u79D2\uFF09",[o.\u53D8\u8272\u65F6\u95F4]:"\u63D0\u524D\u53D8\u8272\uFF08\u79D2\uFF09",[o.\u96F6\u540E\u6301\u7EED]:"\u540E\u7EED\u4FDD\u6301\uFF08\u79D2\uFF09",[o.\u6218\u524D\u51C6\u5907]:"\u5012\u8BA1\u65F6\u91CF\uFF08\u79D2\uFF09",[o.TTS\u63D0\u524D\u91CF]:"TTS\u9884\u5907\uFF08\u79D2\uFF09",[o.\u5237\u65B0\u9891\u7387]:"\u5237\u65B0\u7387\uFF08\u6BEB\u79D2\uFF09"},O={[o.\u663E\u793A\u8303\u56F4]:120,[o.\u53D8\u8272\u65F6\u95F4]:2.75,[o.\u96F6\u540E\u6301\u7EED]:.75,[o.\u6218\u524D\u51C6\u5907]:30,[o.TTS\u63D0\u524D\u91CF]:1,[o.\u5237\u65B0\u9891\u7387]:100},V={"--timeline-width":"\u65F6\u95F4\u8F74\u5BBD\u5EA6","--font-size":"\u5B57\u4F53\u5927\u5C0F","--normal-scale":"\u7B49\u5F85\u7F29\u653E","--up-coming-scale":"\u6765\u4E34\u7F29\u653E","--opacity":"\u7B49\u5F85\u4E0D\u900F\u660E\u5EA6","--tras-duration":"\u52A8\u753B\u65F6\u95F4"};let R={"--timeline-width":160,"--font-size":18,"--opacity":.33,"--normal-scale":.5,"--up-coming-scale":1,"--tras-duration":.66};const w=`^[ \\t\u3000]*(?<time>[\\-:\uFF1A\\d.]+) +(?:["']?(?<action>[^"\\n\\r]+)["']?)?(?:[ \\t\u3000]+(?<t>tts)[ \\t\u3000]?)?(?: ["']??(?<tts>[^" \\t\u3000\\n\\r]+)["']??)?(?:[ \\t\u3000]+sync[ \\t\u3000]*\\/(?<sync>.+)\\/)?(?:[ \\t\u3000]*window[ \\t\u3000]*(?<windowBefore>\\d+)(?:,[ \\t\u3000]*(?<windowAfter>\\d+))?)?(?:[ \\t\u3000]*jump[ \\t\u3000]*(?<jump>\\d+))?[ \\t\u3000]*$`,K=N("timeline",{state:()=>({reg:w,timelineLegalRegular:new RegExp(w,"gm"),allTimelines:[],configValues:O,configTranslate:k,settings:{api:""},filters:{},showStyle:R,showStyleTranslate:V}),getters:{},actions:{newTimeline(u="Demo",t={zoneId:"0",job:"NONE"},e=`-20 "<\u4E2D\u95F4\u5B66\u6D3E>\u5237\u76FE"
0 "\u6218\u6597\u5F00\u59CB"
10 "<\u6B7B\u6597>~" tts
65 "\u4E00\u8FD0" tts "\u573A\u4E2D\u96C6\u5408"
100 "\u4E8C\u8FD0" sync /^.{14} ActionEffect 15:4.{7}:[^:]+:AAAA:/`,s="\u7528\u6237\u521B\u5EFA"){this.allTimelines.push(new L(u,t,e,s)),this.sortTimelines(),f.fire({position:"center",icon:"success",title:`\u201C${u}\u201D\u5DF2\u521B\u5EFA`,showConfirmButton:!1,timer:1e3})},getTimeline(u){return this.allTimelines.filter(t=>(t.condition.zoneId==="0"||t.condition.zoneId===u.zoneId)&&(t.condition.job==="NONE"||t.condition.job===u.job))},parseTimeline(u){return[...u.matchAll(this.timelineLegalRegular)].reduce((t,e)=>{var s,i,n,r,m,F,d,g;return t.push({time:J(e.groups.time),action:e.groups.action?M(e.groups.action.replace(/ /,"&nbsp")):"",sync:((s=e.groups)==null?void 0:s.sync)?new RegExp(e.groups.sync):void 0,show:!e.groups.sync,windowBefore:((i=e.groups)==null?void 0:i.windowBefore)?parseInt(e.groups.windowBefore):2.5,windowAfter:((n=e.groups)==null?void 0:n.windowAfter)?parseInt(e.groups.windowAfter||e.groups.windowBefore):2.5,jump:((r=e.groups)==null?void 0:r.jump)?parseInt(e.groups.jump):void 0,alertAlready:!1,tts:((m=e.groups)==null?void 0:m.tts)?e.groups.tts:((F=e.groups)==null?void 0:F.t)?(g=(d=e.groups.action.match(/^.*<(?<name>.+)>.*$/))==null?void 0:d.groups)==null?void 0:g.name:void 0}),t},[]).sort((t,e)=>t.time-e.time)},saveTimelineSettings(){localStorage.setItem("timelines",JSON.stringify({allTimelines:this.allTimelines,configValues:this.configValues,settings:this.settings,showStyle:this.showStyle,filters:this.filters}))},loadTimelineSettings(){const u=localStorage.getItem("timelines");u&&(Object.assign(this,JSON.parse(u)),this.allTimelines.forEach(t=>{var e;t.condition.jobList&&(t.condition.job=(e=t.condition.jobList[0])!=null?e:"NONE",delete t.condition.jobList)}),this.sortTimelines(),f.fire({text:`${this.allTimelines.length}\u6761\u65F6\u95F4\u8F74\u5DF2\u5C31\u7EEA`,timer:1500,showConfirmButton:!1,backdrop:!1}))},sortTimelines(){this.allTimelines.sort((u,t)=>u.condition.job===t.condition.job?Number(u.condition.zoneId)-Number(t.condition.zoneId):h.jobToJobEnum(u.condition.job)-h.jobToJobEnum(t.condition.job))}}});function J(u){var e;const t=u.match(/^(?<negative>-)?(?<mm>[^:：]+):(?<ss>[^:：]+)$/);return t?parseFloat(t.groups.mm)*60+parseFloat(t.groups.ss)*(((e=t.groups)==null?void 0:e.negative)?-1:1):parseFloat(u)}function M(u){return[...u.matchAll(/\s*\<(?<name>[^\<\>]*?)!??\>(?<repeat>~)?(?<other>.*)\s*/gm)].forEach(t=>{var s,i,n;const e=(s=E.getActionByName(t.groups.name,r=>r[z.IsPlayerAction]))!=null?s:E.getActionByName(t.groups.name,()=>!0);e&&(u=`<div class="skill_icon">
    <img src="https://cafemaker.wakingsands.com/i/${e.Url}.png"
    onerror="javascript:this.src='https://xivapi.com/i/${e.Url}.png';this.onerror=null;">
    </div><span>${((i=t.groups)==null?void 0:i.repeat)?t.groups.name:""}${((n=t.groups)==null?void 0:n.other)?t.groups.other:""}</span>`)}),u}export{G as T,K as u};
