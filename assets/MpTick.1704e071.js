import{d as b,r as E,m as L,ak as k,o as n,c as i,b as l,x as D,u as o,w as _,v as O,F as f,n as g,p as T,a as U,l as S,t as x,ah as w}from"./vendor.e055c356.js";import{_ as V}from"./index.f112d070.js";import"https://overlay.diemoe.net/common/common.min.js";const p=r=>(T("data-v-0c967eb8"),r=r(),U(),r),B={id:"warpper"},C=p(()=>l("article",null,null,-1)),N=[C],j=p(()=>l("h1",null,"\u8BBE\u7F6E",-1)),F=p(()=>l("h4",null,"\u5916\u6846",-1)),M=["onUpdate:modelValue"],J=p(()=>l("h4",null,"\u5185\u90E8",-1)),P=["onUpdate:modelValue"],z=b({setup(r){const h=E(!0),e=L({style:{main:{width:"100px",height:"10px",border:"1px solid black"},article:{backgroundColor:"cornflowerblue"}}});(function(){var m,c,t,s;try{const d=JSON.parse((m=localStorage.getItem("mpTickData"))!=null?m:"{}");if(d)for(const u in e.style)for(const v in e.style[u])e.style[u][v]=(s=(t=(c=d==null?void 0:d.style)==null?void 0:c[u])==null?void 0:t[v])!=null?s:e.style[u]}catch{}})(),k(()=>{localStorage.setItem("mpTickData",JSON.stringify(e))});let y;document.addEventListener("onOverlayStateUpdate",a=>h.value=!a.detail.isLocked),addOverlayListener("ChangePrimaryPlayer",a=>y=a.charID.toString(16).toUpperCase()),addOverlayListener("LogLine",a=>a.line[0]==="39"&&a.line[2]===y&&a.line[6]===a.line[7]?I():""),startOverlayEvents();function I(){}return(a,m)=>(n(),i("div",B,[l("main",{style:D(o(e).style.main)},N,4),_(l("footer",null,[j,F,l("ul",null,[(n(!0),i(f,null,g(o(e).style.main,(c,t)=>(n(),i("li",{key:t},[S(x(t),1),_(l("input",{type:"text","onUpdate:modelValue":s=>o(e).style.main[t]=s},null,8,M),[[w,o(e).style.main[t]]])]))),128))]),J,l("ul",null,[(n(!0),i(f,null,g(o(e).style.article,(c,t)=>(n(),i("li",{key:t},[S(x(t),1),_(l("input",{type:"text","onUpdate:modelValue":s=>o(e).style.article[t]=s},null,8,P),[[w,o(e).style.article[t]]])]))),128))])],512),[[O,h.value]])]))}});var H=V(z,[["__scopeId","data-v-0c967eb8"]]);export{H as default};
