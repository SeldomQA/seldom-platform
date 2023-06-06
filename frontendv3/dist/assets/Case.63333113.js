import{P as I}from"./project.4663e3ef.js";import{r as se,u as Y,_ as Se,b as De}from"./HttpCommon.3165052d.js";import{G as B,D as _,I as T,J as b,S as Ie,U as Re,d as j,L as re,V as me,u as Q,v as ge,K as Ee,p as O,O as ve,j as c,q as he,s as be,bG as Ce,R as oe,H as je,a5 as Pe,a4 as ce,a1 as ne,Y as Le,N as F,M as ue,a2 as de,c1 as Ne,o as y,bp as R,br as C,r as E,af as X,bt as s,bx as i,b2 as v,by as w,a as xe,c as pe,F as _e,c0 as fe,a7 as V,bV as ye,bR as A,bW as Ae,bu as Te,bv as Me}from"./index.b7222058.js";import{_ as Oe,a as Ve}from"./DescriptionsItem.b94e9705.js";import{_ as Ue}from"./Divider.e4608d22.js";import{_ as Z}from"./_plugin-vue_export-helper.de5143a6.js";import{g as He,l as qe}from"./Tag.0f7865c5.js";import{l as Ke,b as We}from"./light.606b06da.js";import{F as Ge,_ as Je}from"./Select.3b49b3e4.js";import{N as K}from"./Space.d7fc70c6.js";import{b as Ye,_ as Qe,a as Xe,L as Ze}from"./LogoPython.5e8775bb.js";import{F as et}from"./FolderOpenOutline.572462d0.js";import{_ as tt,a as st}from"./BreadcrumbItem.d88a2c55.js";import{_ as ot}from"./DataTable.d98b255d.js";import{N as nt}from"./Icon.f741b2d7.js";import"./light.75d41d3d.js";import"./light.d4746edd.js";import"./light.91468ef2.js";import"./Input.e02c91bc.js";const rt=B([_("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[T("show-divider",[_("list-item",[B("&:not(:last-child)",[b("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),T("clickable",[_("list-item",`
 cursor: pointer;
 `)]),T("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),T("hoverable",[_("list-item",`
 border-radius: var(--n-border-radius);
 `,[B("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[b("divider",`
 background-color: transparent;
 `)])])]),T("bordered, hoverable",[_("list-item",`
 padding: 12px 20px;
 `),b("header, footer",`
 padding: 12px 20px;
 `)]),b("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[B("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),_("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[b("prefix",`
 margin-right: 20px;
 flex: 0;
 `),b("suffix",`
 margin-left: 20px;
 flex: 0;
 `),b("main",`
 flex: 1;
 `),b("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),Ie(_("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),Re(_("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),it=Object.assign(Object.assign({},Q.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),we=he("n-list"),at=j({name:"List",props:it,setup(t){const{mergedClsPrefixRef:r,inlineThemeDisabled:e,mergedRtlRef:l}=re(t),a=me("List",l,r),u=Q("List","-list",rt,Ke,t,r);ge(we,{showDividerRef:Ee(t,"showDivider"),mergedClsPrefixRef:r});const p=O(()=>{const{common:{cubicBezierEaseInOut:x},self:{fontSize:z,textColor:h,color:P,colorModal:f,colorPopover:m,borderColor:d,borderColorModal:k,borderColorPopover:S,borderRadius:D,colorHover:$,colorHoverModal:L,colorHoverPopover:N}}=u.value;return{"--n-font-size":z,"--n-bezier":x,"--n-text-color":h,"--n-color":P,"--n-border-radius":D,"--n-border-color":d,"--n-border-color-modal":k,"--n-border-color-popover":S,"--n-color-modal":f,"--n-color-popover":m,"--n-color-hover":$,"--n-color-hover-modal":L,"--n-color-hover-popover":N}}),g=e?ve("list",void 0,p,t):void 0;return{mergedClsPrefix:r,rtlEnabled:a,cssVars:e?void 0:p,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender}},render(){var t;const{$slots:r,mergedClsPrefix:e,onRender:l}=this;return l==null||l(),c("ul",{class:[`${e}-list`,this.rtlEnabled&&`${e}-list--rtl`,this.bordered&&`${e}-list--bordered`,this.showDivider&&`${e}-list--show-divider`,this.hoverable&&`${e}-list--hoverable`,this.clickable&&`${e}-list--clickable`,this.themeClass],style:this.cssVars},r.header?c("div",{class:`${e}-list__header`},r.header()):null,(t=r.default)===null||t===void 0?void 0:t.call(r),r.footer?c("div",{class:`${e}-list__footer`},r.footer()):null)}}),lt=j({name:"ListItem",setup(){const t=be(we,null);return t||Ce("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:t.showDividerRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){const{$slots:t,mergedClsPrefix:r}=this;return c("li",{class:`${r}-list-item`},t.prefix?c("div",{class:`${r}-list-item__prefix`},t.prefix()):null,t.default?c("div",{class:`${r}-list-item__main`},t):null,t.suffix?c("div",{class:`${r}-list-item__suffix`},t.suffix()):null,this.showDivider&&c("div",{class:`${r}-list-item__divider`}))}}),ct=_("steps",`
 width: 100%;
 display: flex;
`,[_("step",`
 position: relative;
 display: flex;
 flex: 1;
 `,[T("disabled","cursor: not-allowed"),T("clickable",`
 cursor: pointer;
 `),B("&:last-child",[_("step-splitor","display: none;")])]),_("step-splitor",`
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),_("step-content","flex: 1;",[_("step-content-header",`
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[b("title",`
 white-space: nowrap;
 flex: 0;
 `)]),b("description",`
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),_("step-indicator",`
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[_("step-indicator-slot",`
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `,[b("index",`
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[oe()]),_("icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[oe()]),_("base-icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[oe()])])]),T("vertical","flex-direction: column;",[je("show-description",[B(">",[_("step","padding-bottom: 8px;")])]),B(">",[_("step","margin-bottom: 16px;",[B("&:last-child","margin-bottom: 0;"),B(">",[_("step-indicator",[B(">",[_("step-splitor",`
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]),_("step-content",[b("description","margin-top: 8px;")])])])])])]);function ut(t,r){return typeof t!="object"||t===null||Array.isArray(t)?null:(t.props||(t.props={}),t.props.internalIndex=r+1,t)}function dt(t){return t.map((r,e)=>ut(r,e))}const pt=Object.assign(Object.assign({},Q.props),{current:Number,status:{type:String,default:"process"},size:{type:String,default:"medium"},vertical:Boolean,"onUpdate:current":[Function,Array],onUpdateCurrent:[Function,Array]}),ze=he("n-steps"),_t=j({name:"Steps",props:pt,setup(t,{slots:r}){const{mergedClsPrefixRef:e,mergedRtlRef:l}=re(t),a=me("Steps",l,e),u=Q("Steps","-steps",ct,We,t,e);return ge(ze,{props:t,mergedThemeRef:u,mergedClsPrefixRef:e,stepsSlots:r}),{mergedClsPrefix:e,rtlEnabled:a}},render(){const{mergedClsPrefix:t}=this;return c("div",{class:[`${t}-steps`,this.rtlEnabled&&`${t}-steps--rtl`,this.vertical&&`${t}-steps--vertical`]},dt(Pe(He(this))))}}),ft={status:String,title:String,description:String,disabled:Boolean,internalIndex:{type:Number,default:0}},mt=j({name:"Step",props:ft,setup(t){const r=be(ze,null);r||Ce("step","`n-step` must be placed inside `n-steps`.");const{inlineThemeDisabled:e}=re(),{props:l,mergedThemeRef:a,mergedClsPrefixRef:u,stepsSlots:p}=r,g=O(()=>l.vertical),x=O(()=>{const{status:f}=t;if(f)return f;{const{internalIndex:m}=t,{current:d}=l;if(d===void 0)return"process";if(m<d)return"finish";if(m===d)return l.status||"process";if(m>d)return"wait"}return"process"}),z=O(()=>{const{value:f}=x,{size:m}=l,{common:{cubicBezierEaseInOut:d},self:{stepHeaderFontWeight:k,[F("stepHeaderFontSize",m)]:S,[F("indicatorIndexFontSize",m)]:D,[F("indicatorSize",m)]:$,[F("indicatorIconSize",m)]:L,[F("indicatorTextColor",f)]:N,[F("indicatorBorderColor",f)]:M,[F("headerTextColor",f)]:o,[F("splitorColor",f)]:n,[F("indicatorColor",f)]:U,[F("descriptionTextColor",f)]:H}}=a.value;return{"--n-bezier":d,"--n-description-text-color":H,"--n-header-text-color":o,"--n-indicator-border-color":M,"--n-indicator-color":U,"--n-indicator-icon-size":L,"--n-indicator-index-font-size":D,"--n-indicator-size":$,"--n-indicator-text-color":N,"--n-splitor-color":n,"--n-step-header-font-size":S,"--n-step-header-font-weight":k}}),h=e?ve("step",O(()=>{const{value:f}=x,{size:m}=l;return`${f[0]}${m[0]}`}),z,l):void 0,P=O(()=>{if(t.disabled)return;const{onUpdateCurrent:f,"onUpdate:current":m}=l;return f||m?()=>{f&&ue(f,t.internalIndex),m&&ue(m,t.internalIndex)}:void 0});return{stepsSlots:p,mergedClsPrefix:u,vertical:g,mergedStatus:x,handleStepClick:P,cssVars:e?void 0:z,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){const{mergedClsPrefix:t,onRender:r,handleStepClick:e,disabled:l}=this,a=ce(this.$slots.default,u=>{const p=u||this.description;return p?c("div",{class:`${t}-step-content__description`},p):null});return r==null||r(),c("div",{class:[`${t}-step`,l&&`${t}-step--disabled`,!l&&e&&`${t}-step--clickable`,this.themeClass,a&&`${t}-step--show-description`,`${t}-step--${this.mergedStatus}-status`],style:this.cssVars,onClick:e},c("div",{class:`${t}-step-indicator`},c("div",{class:`${t}-step-indicator-slot`},c(Le,null,{default:()=>ce(this.$slots.icon,u=>{const{mergedStatus:p,stepsSlots:g}=this;return p==="finish"||p==="error"?p==="finish"?c(de,{clsPrefix:t,key:"finish"},{default:()=>ne(g["finish-icon"],()=>[c(Ge,null)])}):p==="error"?c(de,{clsPrefix:t,key:"error"},{default:()=>ne(g["error-icon"],()=>[c(Ne,null)])}):null:u||c("div",{key:this.internalIndex,class:`${t}-step-indicator-slot__index`},this.internalIndex)})})),this.vertical?c("div",{class:`${t}-step-splitor`}):null),c("div",{class:`${t}-step-content`},c("div",{class:`${t}-step-content-header`},c("div",{class:`${t}-step-content-header__title`},ne(this.$slots.title,()=>[this.title])),this.vertical?null:c("div",{class:`${t}-step-splitor`})),a))}}),gt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},vt=C("path",{d:"M320 146s24.36-12-64-12a160 160 0 1 0 160 160",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32"},null,-1),ht=C("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 58l80 80l-80 80"},null,-1),bt=[vt,ht],Ct=j({name:"Refresh",render:function(r,e){return y(),R("svg",gt,bt)}});class xt{runningCase(r,e){return se.post("/api/case/"+r+"/running",e)}getCaseResult(r){return se.get("/api/case/"+r+"/result")}getSyncLog(){return se.get("/api/project/sync_log")}}const ie=new xt,yt=v("\u8FD0\u884C\u65E5\u5FD7"),wt={class:"log-style",rows:"34"},zt=j({__name:"CaseResult",props:{caseid:{type:Number,required:!0}},setup(t){const r=t,e=Y(),l=E({name:"",create_time:"",run_time:"",system_out:""}),a=async()=>{await ie.getCaseResult(r.caseid.toString()).then(u=>{u.success===!0?l.value=u.result:e.error(u.error.message)})};return X(()=>{a()}),(u,p)=>{const g=Oe,x=Ve,z=Ue;return y(),R("div",null,[s(x,{"label-placement":"left"},{default:i(()=>[s(g,{label:"\u62A5\u544A\u540D\u79F0"},{default:i(()=>[v(w(l.value.name),1)]),_:1}),s(g,{label:"\u521B\u5EFA\u65F6\u95F4"},{default:i(()=>[v(w(l.value.create_time),1)]),_:1}),s(g,{label:"\u8FD0\u884C\u65F6\u957F"},{default:i(()=>[v(w(l.value.run_time),1)]),_:1})]),_:1}),s(z,{"title-placement":"left"},{default:i(()=>[yt]),_:1}),C("textarea",wt,`\r
      `+w(l.value.system_out)+`\r
    `,1)])}}});const kt=Z(zt,[["__scopeId","data-v-0146cf7d"]]),$t={class:"case-sync-modal"},Ft={class:"sync-button"},Bt=v(" \u91CD\u8BD5 "),St={class:"dialog-footer"},Dt=v("\u53D6\u6D88"),It=v("\u5408\u5E76"),Rt=j({__name:"CaseSync",emits:["cancel"],setup(t,{emit:r}){const e=xe({addCase:[],delCase:[],req:{},succCode:1,stepButton:""}),l=Y(),a=E(1),u=E("process"),p=E(!1),g=async()=>{p.value=!0;const d=await I.syncCode(sessionStorage.projectId.toString());d.success===!0?(u.value="finish",P(),u.value="process",e.stepButton="\u540C\u6B65"):(l.error(d.error.message),u.value="error",e.succCode=0),p.value=!1},x=async()=>{const d=await I.syncCase(sessionStorage.projectId.toString());d.success===!0?(u.value="finish",P(),u.value="process",e.stepButton="\u7ED3\u679C"):(l.error(d.error.message),u.value="error",e.succCode=0),p.value=!1},z=async()=>{const d=await I.syncResult(sessionStorage.projectId.toString());d.success===!0?(u.value="finish",e.addCase=d.result.add_case,e.delCase=d.result.del_case,e.req=d.result):(l.error(d.error.message),u.value="error",e.succCode=0),p.value=!1},h=async()=>{switch(a.value){case 1:g();break;case 2:x();break;case 3:z();break}},P=()=>{a.value===null?a.value=1:a.value>=3?a.value=null:a.value++},f=async()=>{const d=await I.syncMerge(sessionStorage.projectId,e.req);d.success===!0?(l.success("\u5408\u5E76\u6210\u529F\uFF01"),m()):l.error(d.error.message)},m=()=>{r("cancel",{})};return X(()=>{e.stepButton="\u62C9\u53D6"}),(d,k)=>{const S=mt,D=_t,$=V,L=lt,N=at,M=ye,o=K;return y(),R("div",$t,[s(o,{vertical:"",style:{"margin-top":"30px"}},{default:i(()=>[s(D,{current:a.value,status:u.value},{default:i(()=>[s(S,{title:"\u62C9\u53D6\u4EE3\u7801",description:""}),s(S,{title:"\u540C\u6B65\u7528\u4F8B",description:""}),s(S,{title:"\u67E5\u627E\u7ED3\u679C",description:""})]),_:1},8,["current","status"]),C("div",Ft,[e.succCode==1?(y(),pe($,{key:0,"n-button":"",type:"primary",size:"small",loading:p.value,onClick:h},{default:i(()=>[v(w(e.stepButton),1)]),_:1},8,["loading"])):(y(),pe($,{key:1,type:"warning",size:"small",loading:p.value,onClick:h},{default:i(()=>[Bt]),_:1},8,["loading"]))]),s(o,null,{default:i(()=>[s(M,{title:"\u65B0\u589E\u7528\u4F8B",class:"add-case-list"},{default:i(()=>[s(N,{class:"case-list"},{default:i(()=>[(y(!0),R(_e,null,fe(e.addCase,n=>(y(),R("div",null,[s(L,null,{default:i(()=>[v(w(n.class_name)+"."+w(n.case_name),1)]),_:2},1024)]))),256))]),_:1})]),_:1}),s(M,{title:"\u5220\u9664\u7528\u4F8B",class:"del-case-list"},{default:i(()=>[s(N,{class:"case-list"},{default:i(()=>[(y(!0),R(_e,null,fe(e.delCase,n=>(y(),R("div",null,[s(L,null,{default:i(()=>[v(w(n.class_name)+"."+w(n.case_name),1)]),_:2},1024)]))),256))]),_:1})]),_:1})]),_:1}),C("div",St,[s(o,null,{default:i(()=>[s($,{onClick:k[0]||(k[0]=n=>m())},{default:i(()=>[Dt]),_:1}),s($,{type:"primary",onClick:k[1]||(k[1]=n=>f())},{default:i(()=>[It]),_:1})]),_:1})])]),_:1})])}}});const Et=Z(Rt,[["__scopeId","data-v-8ab0720d"]]),jt={class:"case-sync-log"},Pt={class:"log-style",rows:"40"},Lt=j({__name:"CaseSyncLog",props:{caseid:{type:Number,required:!0}},setup(t){const r=Y(),e=E({log:""}),l=async()=>{await ie.getSyncLog().then(a=>{a.success===!0?e.value=a.result:r.error(a.error.message)})};return X(()=>{l()}),(a,u)=>(y(),R("div",jt,[C("textarea",Pt,`\r
      `+w(e.value.log)+`\r
    `,1)]))}});const Nt=Z(Lt,[["__scopeId","data-v-f5478e0f"]]),ke=t=>(Te("data-v-b9d07453"),t=t(),Me(),t),At={class:"body"},Tt={class:"pageheader"},Mt=ke(()=>C("span",null,"\u7528\u4F8B\u7BA1\u7406",-1)),Ot=v("\u9996\u9875"),Vt=v("\u7528\u4F8B\u7BA1\u7406"),Ut=v("\u540C\u6B65"),Ht=v("\u65E5\u5FD7"),qt=v(" \u6761 "),Kt=ke(()=>C("h3",null,"\u7528\u4F8B\u5217\u8868",-1)),Wt=j({__name:"Case",setup(t){const r=({caseAction:o})=>[{title:"ID",key:"id"},{title:"\u6D4B\u8BD5\u7C7B",key:"class_name"},{title:"\u6D4B\u8BD5\u7C7B\u63CF\u8FF0",key:"class_doc"},{title:"\u6D4B\u8BD5\u65B9\u6CD5",key:"case_name"},{title:"\u6D4B\u8BD5\u65B9\u6CD5\u63CF\u8FF0",key:"case_doc"},{title:"\u72B6\u6001",key:"status",render(n){return n.status===0?"\u672A\u6267\u884C":n.status===1?"\u6267\u884C\u4E2D":n.status===2?"\u5DF2\u6267\u884C":"\u672A\u77E5"}},{title:"\u64CD\u4F5C",key:"actions",render(n){return c(K,{},{default:()=>[c(V,{strong:!0,secondary:!0,size:"small",type:"info",onClick:()=>o(n,"run")},{default:()=>"\u6267\u884C"}),c(V,{strong:!0,secondary:!0,size:"small",type:"primary",onClick:()=>o(n,"report")},{default:()=>"\u67E5\u770B"})]})}}],e=xe({loading:!0,projectId:"",fileData:[],caseData:[],caseNumber:0,defaultProps:{children:"children",label:"label"},env:null,selectedCase:{},syncCaseDialog:!1,syncLogDialog:!1,cid:0}),l=E(),a=Y(),u=E({envOptions:[]}),p=async()=>{const o=await I.getProjectTree(sessionStorage.projectId);o.success===!0?(e.fileData=g(o.result.files),e.caseNumber=o.result.case_number):a.error(o.error.message)},g=o=>o.map((n,U)=>{const H=n.label,ee=n.full_name,W=n.children,G=!!n.is_leaf;return{label:H,full_name:ee,children:W,isLeaf:G,prefix:()=>c(nt,null,{default:()=>c(G?Ze:et)})}}),x=async()=>{e.loading=!0;const o=await I.getEnvs();if(o.success===!0)for(let n=0;n<o.result.length;n++)u.value.envOptions.push({value:o.result[n].id,label:o.result[n].name});else a.error(o.error.message);e.loading=!1},z=o=>{if(l.value=o,o.label.match(".py"))I.getProjectCases(e.projectId,o.full_name).then(n=>{n.success===!0?e.caseData=n.result:a.error(n.error.message)});else{if(o.children.length>0)return;I.getProjectSubdirectory(e.projectId,o.full_name).then(n=>{n.success===!0?o.children=g(n.result):a.error(n.error.message)})}},h=()=>{if(e.projectId===""||e.projectId===void 0){a.warning("\u8BF7\u9009\u62E9\u9879\u76EE\uFF01");return}e.syncCaseDialog=!0},P=()=>{if(e.projectId===""||e.projectId===void 0){a.warning("\u8BF7\u9009\u62E9\u9879\u76EE");return}e.syncLogDialog=!0},f=E(),m=(o,n)=>{e.env=o},d=async o=>{e.env===null?a.warning("\u8BF7\u9009\u62E9\u6267\u884C\u73AF\u5883"):(await ie.runningCase(o.id.toString(),{env:e.env})).success===!0?a.success("\u5F00\u59CB\u6267\u884C"):a.error("\u8FD0\u884C\u5931\u8D25")},k=()=>{l.value==null||l==null?a.warning("\u8BF7\u9009\u62E9\u5DE6\u4FA7\u6811\u8282\u70B9\u7528\u4F8B\u6587\u4EF6"):I.getProjectCases(e.projectId,l.value.full_name).then(o=>{o.success===!0?(a.success("\u5237\u65B0\u6210\u529F"),e.caseData=o.result):a.error(o.error.message)})},S=o=>{if(console.log("row",o.status),o.status===0){a.warning("\u8BF7\u5148\u6267\u884C\u7528\u4F8B\uFF01");return}else if(o.status===1){a.warning("\u6B63\u5728\u6267\u884C\u7528\u4F8B\uFF01");return}e.selectedCase=o,e.cid=o.id,D.value=!0},D=E(!1),$=r({caseAction(o,n){switch(n){case"run":d(o);break;case"report":S(o);break}}}),L=!1,N=({option:o})=>({onClick(){z(o)}}),M=()=>{e.syncCaseDialog=!1,p()};return X(()=>{x(),p(),e.projectId=sessionStorage.projectId}),(o,n)=>{const U=tt,H=st,ee=Je,W=Se,G=qe,ae=De,$e=Ye,le=Qe,Fe=ot,Be=Xe,J=ye,te=Ae;return y(),R("div",At,[C("div",Tt,[s(A(K),{justify:"space-between",class:"breadcrumb-navigation"},{default:i(()=>[Mt,s(H,{separator:">"},{default:i(()=>[s(U,null,{default:i(()=>[Ot]),_:1}),s(U,null,{default:i(()=>[Vt]),_:1})]),_:1})]),_:1})]),s(J,{class:"main-card"},{default:i(()=>[C("div",null,[s(A(K),{justify:"space-between"},{default:i(()=>[C("div",null,[s(A(V),{type:"primary",onClick:h},{default:i(()=>[Ut]),_:1}),s(A(V),{onClick:P,style:{left:"10px"}},{default:i(()=>[Ht]),_:1})]),s(ae,{inline:"","label-placement":"left"},{default:i(()=>[s(W,{label:"\u73AF\u5883"},{default:i(()=>[s(ee,{style:{width:"200px"},options:u.value.envOptions,placeholder:"\u9009\u62E9\u73AF\u5883","onUpdate:value":m},null,8,["options"])]),_:1}),s(W,{label:"\u7528\u4F8B"},{default:i(()=>[s(G,{type:"info",style:{"margin-right":"12px"}},{default:i(()=>[v(w(e.caseNumber),1)]),_:1}),qt]),_:1})]),_:1})]),_:1})]),s(A(K),{justify:"space-between",align:"center"},{default:i(()=>[Kt,s(A(V),{strong:"",secondary:"",type:"primary",size:"small",onClick:k},{icon:i(()=>[s(A(Ct))]),_:1})]),_:1}),C("div",null,[s(Be,{"x-gap":"16",cols:6},{default:i(()=>[s(le,null,{default:i(()=>[s($e,{class:"filetree","block-line":"","expand-on-click":"",data:e.fileData,"key-field":"label","node-props":N},null,8,["data"])]),_:1}),s(le,{span:"5"},{default:i(()=>[s(Fe,{columns:A($),data:e.caseData,pagination:L,bordered:!1},null,8,["columns","data"])]),_:1})]),_:1})])]),_:1}),s(te,{show:e.syncCaseDialog,"onUpdate:show":n[0]||(n[0]=q=>e.syncCaseDialog=q)},{default:i(()=>[s(J,{title:"\u540C\u6B65\u7528\u4F8B",style:{width:"800px"},role:"dialog"},{default:i(()=>[s(Et,{ref_key:"caseSync",ref:f,onCancel:M},null,512)]),_:1})]),_:1},8,["show"]),s(te,{show:e.syncLogDialog,"onUpdate:show":n[1]||(n[1]=q=>e.syncLogDialog=q)},{default:i(()=>[s(J,{title:"\u540C\u6B65\u65E5\u5FD7",bordered:!1,size:"huge",role:"dialog","aria-modal":"true",style:{width:"85%"}},{default:i(()=>[s(Nt)]),_:1})]),_:1},8,["show"]),s(te,{show:D.value,"onUpdate:show":n[2]||(n[2]=q=>D.value=q)},{default:i(()=>[s(J,{title:"\u6267\u884C\u7ED3\u679C",bordered:!1,size:"huge",role:"dialog","aria-modal":"true",style:{width:"85%"}},{default:i(()=>[s(kt,{caseid:e.cid},null,8,["caseid"])]),_:1})]),_:1},8,["show"])])}}});const _s=Z(Wt,[["__scopeId","data-v-b9d07453"]]);export{_s as default};
