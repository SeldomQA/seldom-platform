import{d as de,av as xt,af as Pe,b8 as Jt,a3 as Qt,p as A,r as T,x as De,a6 as nt,j as d,y as Zt,ac as ut,a9 as Ne,_ as lt,b9 as en,ba as ct,e as yt,k as rt,l as at,aq as tn,s as St,z as Se,a2 as nn,T as Ct,D as $,J as j,I as oe,G as re,H as ot,E as Ft,u as Fe,K as ee,w as Ce,v as ft,O as st,a4 as on,aa as ln,a8 as rn,a1 as an,N as ge,b7 as Je,n as ye,a0 as sn,bb as dn,F as un,L as cn,Q as fn,aw as hn,at as vn,aY as gn,aX as ht,aZ as bn,bc as pn,M as le}from"./index.c733b6dd.js";import{c as Tt,b as He,k as mn,u as vt,a as wn,j as xn}from"./light.3498919c.js";import{e as yn,f as Sn,i as dt,j as Cn,k as Fn,h as We,_ as Tn,p as On,l as Qe,N as Rn,u as it,V as Mn,b as zn,c as kn,d as Pn}from"./Tag.0e03fab2.js";function In(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function Ze(e){const n=e.filter(o=>o!==void 0);if(n.length!==0)return n.length===1?n[0]:o=>{e.forEach(l=>{l&&l(o)})}}function gt(e){return e&-e}class _n{constructor(n,o){this.l=n,this.min=o;const l=new Array(n+1);for(let a=0;a<n+1;++a)l[a]=0;this.ft=l}add(n,o){if(o===0)return;const{l,ft:a}=this;for(n+=1;n<=l;)a[n]+=o,n+=gt(n)}get(n){return this.sum(n+1)-this.sum(n)}sum(n){if(n===void 0&&(n=this.l),n<=0)return 0;const{ft:o,min:l,l:a}=this;if(n>a)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let h=n*l;for(;n>0;)h+=o[n],n-=gt(n);return h}getBound(n){let o=0,l=this.l;for(;l>o;){const a=Math.floor((o+l)/2),h=this.sum(a);if(h>n){l=a;continue}else if(h<n){if(o===a)return this.sum(o+1)<=n?o+1:a;o=a}else return a}return o}}let Le;function $n(){return Le===void 0&&("matchMedia"in window?Le=window.matchMedia("(pointer:coarse)").matches:Le=!1),Le}let et;function bt(){return et===void 0&&(et="chrome"in window?window.devicePixelRatio:1),et}const Bn=He(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[He("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[He("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),An=de({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const n=xt();Bn.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:Tt,ssr:n}),Pe(()=>{const{defaultScrollIndex:c,defaultScrollKey:g}=e;c!=null?p({index:c}):g!=null&&p({key:g})});let o=!1,l=!1;Jt(()=>{if(o=!1,!l){l=!0;return}p({top:z.value,left:w})}),Qt(()=>{o=!0,l||(l=!0)});const a=A(()=>{const c=new Map,{keyField:g}=e;return e.items.forEach((I,W)=>{c.set(I[g],W)}),c}),h=T(null),v=T(void 0),r=new Map,x=A(()=>{const{items:c,itemSize:g,keyField:I}=e,W=new _n(c.length,g);return c.forEach((V,D)=>{const B=V[I],K=r.get(B);K!==void 0&&W.add(D,K)}),W}),y=T(0);let w=0;const z=T(0),k=De(()=>Math.max(x.value.getBound(z.value-nt(e.paddingTop))-1,0)),P=A(()=>{const{value:c}=v;if(c===void 0)return[];const{items:g,itemSize:I}=e,W=k.value,V=Math.min(W+Math.ceil(c/I+1),g.length-1),D=[];for(let B=W;B<=V;++B)D.push(g[B]);return D}),p=(c,g)=>{if(typeof c=="number"){m(c,g,"auto");return}const{left:I,top:W,index:V,key:D,position:B,behavior:K,debounce:i=!0}=c;if(I!==void 0||W!==void 0)m(I,W,K);else if(V!==void 0)S(V,K,i);else if(D!==void 0){const f=a.value.get(D);f!==void 0&&S(f,K,i)}else B==="bottom"?m(0,Number.MAX_SAFE_INTEGER,K):B==="top"&&m(0,0,K)};let F,E=null;function S(c,g,I){const{value:W}=x,V=W.sum(c)+nt(e.paddingTop);if(!I)h.value.scrollTo({left:0,top:V,behavior:g});else{F=c,E!==null&&window.clearTimeout(E),E=window.setTimeout(()=>{F=void 0,E=null},16);const{scrollTop:D,offsetHeight:B}=h.value;if(V>D){const K=W.get(c);V+K<=D+B||h.value.scrollTo({left:0,top:V+K-B,behavior:g})}else h.value.scrollTo({left:0,top:V,behavior:g})}}function m(c,g,I){h.value.scrollTo({left:c,top:g,behavior:I})}function H(c,g){var I,W,V;if(o||e.ignoreItemResize||Z(g.target))return;const{value:D}=x,B=a.value.get(c),K=D.get(B),i=(V=(W=(I=g.borderBoxSize)===null||I===void 0?void 0:I[0])===null||W===void 0?void 0:W.blockSize)!==null&&V!==void 0?V:g.contentRect.height;if(i===K)return;i-e.itemSize===0?r.delete(c):r.set(c,i-e.itemSize);const N=i-K;if(N===0)return;D.add(B,N);const Q=h.value;if(Q!=null){if(F===void 0){const ae=D.sum(B);Q.scrollTop>ae&&Q.scrollBy(0,N)}else if(B<F)Q.scrollBy(0,N);else if(B===F){const ae=D.sum(B);i+ae>Q.scrollTop+Q.offsetHeight&&Q.scrollBy(0,N)}te()}y.value++}const Y=!$n();let q=!1;function L(c){var g;(g=e.onScroll)===null||g===void 0||g.call(e,c),(!Y||!q)&&te()}function G(c){var g;if((g=e.onWheel)===null||g===void 0||g.call(e,c),Y){const I=h.value;if(I!=null){if(c.deltaX===0&&(I.scrollTop===0&&c.deltaY<=0||I.scrollTop+I.offsetHeight>=I.scrollHeight&&c.deltaY>=0))return;c.preventDefault(),I.scrollTop+=c.deltaY/bt(),I.scrollLeft+=c.deltaX/bt(),te(),q=!0,yn(()=>{q=!1})}}}function J(c){if(o||Z(c.target)||c.contentRect.height===v.value)return;v.value=c.contentRect.height;const{onResize:g}=e;g!==void 0&&g(c)}function te(){const{value:c}=h;c!=null&&(z.value=c.scrollTop,w=c.scrollLeft)}function Z(c){let g=c;for(;g!==null;){if(g.style.display==="none")return!0;g=g.parentElement}return!1}return{listHeight:v,listStyle:{overflow:"auto"},keyToIndex:a,itemsStyle:A(()=>{const{itemResizable:c}=e,g=Ne(x.value.sum());return y.value,[e.itemsStyle,{boxSizing:"content-box",height:c?"":g,minHeight:c?g:"",paddingTop:Ne(e.paddingTop),paddingBottom:Ne(e.paddingBottom)}]}),visibleItemsStyle:A(()=>(y.value,{transform:`translateY(${Ne(x.value.sum(k.value))})`})),viewportItems:P,listElRef:h,itemsElRef:T(null),scrollTo:p,handleListResize:J,handleListScroll:L,handleListWheel:G,handleItemResize:H}},render(){const{itemResizable:e,keyField:n,keyToIndex:o,visibleItemsTag:l}=this;return d(ut,{onResize:this.handleListResize},{default:()=>{var a,h;return d("div",Zt(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?d("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[d(l,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(v=>{const r=v[n],x=o.get(r),y=this.$slots.default({item:v,index:x})[0];return e?d(ut,{key:r,onResize:w=>this.handleItemResize(r,w)},{default:()=>y}):(y.key=r,y)})})]):(h=(a=this.$slots).empty)===null||h===void 0?void 0:h.call(a)])}})}}),ve="v-hidden",En=He("[v-hidden]",{display:"none!important"}),pt=de({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:n}){const o=T(null),l=T(null);function a(){const{value:v}=o,{getCounter:r,getTail:x}=e;let y;if(r!==void 0?y=r():y=l.value,!v||!y)return;y.hasAttribute(ve)&&y.removeAttribute(ve);const{children:w}=v,z=v.offsetWidth,k=[],P=n.tail?x==null?void 0:x():null;let p=P?P.offsetWidth:0,F=!1;const E=v.children.length-(n.tail?1:0);for(let m=0;m<E-1;++m){if(m<0)continue;const H=w[m];if(F){H.hasAttribute(ve)||H.setAttribute(ve,"");continue}else H.hasAttribute(ve)&&H.removeAttribute(ve);const Y=H.offsetWidth;if(p+=Y,k[m]=Y,p>z){const{updateCounter:q}=e;for(let L=m;L>=0;--L){const G=E-1-L;q!==void 0?q(G):y.textContent=`${G}`;const J=y.offsetWidth;if(p-=k[L],p+J<=z||L===0){F=!0,m=L-1,P&&(m===-1?(P.style.maxWidth=`${z-J}px`,P.style.boxSizing="border-box"):P.style.maxWidth="");break}}}}const{onUpdateOverflow:S}=e;F?S!==void 0&&S(!0):(S!==void 0&&S(!1),y.setAttribute(ve,""))}const h=xt();return En.mount({id:"vueuc/overflow",head:!0,anchorMetaName:Tt,ssr:h}),Pe(a),{selfRef:o,counterRef:l,sync:a}},render(){const{$slots:e}=this;return lt(this.sync),d("div",{class:"v-overflow",ref:"selfRef"},[en(e,"default"),e.counter?e.counter():d("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function Ot(e,n){n&&(Pe(()=>{const{value:o}=e;o&&ct.registerHandler(o,n)}),yt(()=>{const{value:o}=e;o&&ct.unregisterHandler(o)}))}const Nn=de({name:"Checkmark",render(){return d("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},d("g",{fill:"none"},d("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Ln=de({props:{onFocus:Function,onBlur:Function},setup(e){return()=>d("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Dn={height:"calc(var(--n-option-height) * 7.6)",paddingSmall:"4px 0",paddingMedium:"4px 0",paddingLarge:"4px 0",paddingHuge:"4px 0",optionPaddingSmall:"0 12px",optionPaddingMedium:"0 12px",optionPaddingLarge:"0 12px",optionPaddingHuge:"0 12px",loadingSize:"18px"},Hn=e=>{const{borderRadius:n,popoverColor:o,textColor3:l,dividerColor:a,textColor2:h,primaryColorPressed:v,textColorDisabled:r,primaryColor:x,opacityDisabled:y,hoverColor:w,fontSizeSmall:z,fontSizeMedium:k,fontSizeLarge:P,fontSizeHuge:p,heightSmall:F,heightMedium:E,heightLarge:S,heightHuge:m}=e;return Object.assign(Object.assign({},Dn),{optionFontSizeSmall:z,optionFontSizeMedium:k,optionFontSizeLarge:P,optionFontSizeHuge:p,optionHeightSmall:F,optionHeightMedium:E,optionHeightLarge:S,optionHeightHuge:m,borderRadius:n,color:o,groupHeaderTextColor:l,actionDividerColor:a,optionTextColor:h,optionTextColorPressed:v,optionTextColorDisabled:r,optionTextColorActive:x,optionOpacityDisabled:y,optionCheckColor:x,optionColorPending:w,optionColorActive:"rgba(0, 0, 0, 0)",optionColorActivePending:w,actionTextColor:h,loadingColor:x})},Wn=rt({name:"InternalSelectMenu",common:at,peers:{Scrollbar:tn,Empty:Sn},self:Hn}),Rt=Wn;function Vn(e,n){return d(Ct,{name:"fade-in-scale-up-transition"},{default:()=>e?d(nn,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>d(Nn)}):null})}const mt=de({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:o,multipleRef:l,valueSetRef:a,renderLabelRef:h,renderOptionRef:v,labelFieldRef:r,valueFieldRef:x,showCheckmarkRef:y,nodePropsRef:w,handleOptionClick:z,handleOptionMouseEnter:k}=St(dt),P=De(()=>{const{value:S}=o;return S?e.tmNode.key===S.key:!1});function p(S){const{tmNode:m}=e;m.disabled||z(S,m)}function F(S){const{tmNode:m}=e;m.disabled||k(S,m)}function E(S){const{tmNode:m}=e,{value:H}=P;m.disabled||H||k(S,m)}return{multiple:l,isGrouped:De(()=>{const{tmNode:S}=e,{parent:m}=S;return m&&m.rawNode.type==="group"}),showCheckmark:y,nodeProps:w,isPending:P,isSelected:De(()=>{const{value:S}=n,{value:m}=l;if(S===null)return!1;const H=e.tmNode.rawNode[x.value];if(m){const{value:Y}=a;return Y.has(H)}else return S===H}),labelField:r,renderLabel:h,renderOption:v,handleMouseMove:E,handleMouseEnter:F,handleClick:p}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:o,isPending:l,isGrouped:a,showCheckmark:h,nodeProps:v,renderOption:r,renderLabel:x,handleClick:y,handleMouseEnter:w,handleMouseMove:z}=this,k=Vn(o,e),P=x?[x(n,o),h&&k]:[Se(n[this.labelField],n,o),h&&k],p=v==null?void 0:v(n),F=d("div",Object.assign({},p,{class:[`${e}-base-select-option`,n.class,p==null?void 0:p.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:l,[`${e}-base-select-option--show-checkmark`]:h}],style:[(p==null?void 0:p.style)||"",n.style||""],onClick:Ze([y,p==null?void 0:p.onClick]),onMouseenter:Ze([w,p==null?void 0:p.onMouseenter]),onMousemove:Ze([z,p==null?void 0:p.onMousemove])}),d("div",{class:`${e}-base-select-option__content`},P));return n.render?n.render({node:F,option:n,selected:o}):r?r({node:F,option:n,selected:o}):F}}),wt=de({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n,labelFieldRef:o,nodePropsRef:l}=St(dt);return{labelField:o,nodeProps:l,renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:o,nodeProps:l,tmNode:{rawNode:a}}=this,h=l==null?void 0:l(a),v=n?n(a,!1):Se(a[this.labelField],a,!1),r=d("div",Object.assign({},h,{class:[`${e}-base-select-group-header`,h==null?void 0:h.class]}),v);return a.render?a.render({node:r,option:a}):o?o({node:r,option:a,selected:!1}):r}}),jn=$("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[$("scrollbar",`
 max-height: var(--n-height);
 `),$("virtual-list",`
 max-height: var(--n-height);
 `),$("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[j("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),$("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),$("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),j("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),j("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),j("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),$("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),$("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[oe("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),re("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),re("&:active",`
 color: var(--n-option-text-color-pressed);
 `),oe("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),oe("pending",[re("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),oe("selected",`
 color: var(--n-option-text-color-active);
 `,[re("&::before",`
 background-color: var(--n-option-color-active);
 `),oe("pending",[re("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),oe("disabled",`
 cursor: not-allowed;
 `,[ot("selected",`
 color: var(--n-option-text-color-disabled);
 `),oe("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),j("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Ft({enterScale:"0.5"})])])]),Kn=de({name:"InternalSelectMenu",props:Object.assign(Object.assign({},Fe.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const n=Fe("InternalSelectMenu","-internal-select-menu",jn,Rt,e,ee(e,"clsPrefix")),o=T(null),l=T(null),a=T(null),h=A(()=>e.treeMate.getFlattenedNodes()),v=A(()=>Fn(h.value)),r=T(null);function x(){const{treeMate:i}=e;let f=null;const{value:N}=e;N===null?f=i.getFirstAvailableNode():(e.multiple?f=i.getNode((N||[])[(N||[]).length-1]):f=i.getNode(N),(!f||f.disabled)&&(f=i.getFirstAvailableNode())),c(f||null)}function y(){const{value:i}=r;i&&!e.treeMate.getNode(i.key)&&(r.value=null)}let w;Ce(()=>e.show,i=>{i?w=Ce(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?x():y(),lt(g)):y()},{immediate:!0}):w==null||w()},{immediate:!0}),yt(()=>{w==null||w()});const z=A(()=>nt(n.value.self[ge("optionHeight",e.size)])),k=A(()=>Je(n.value.self[ge("padding",e.size)])),P=A(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),p=A(()=>{const i=h.value;return i&&i.length===0});function F(i){const{onToggle:f}=e;f&&f(i)}function E(i){const{onScroll:f}=e;f&&f(i)}function S(i){var f;(f=a.value)===null||f===void 0||f.sync(),E(i)}function m(){var i;(i=a.value)===null||i===void 0||i.sync()}function H(){const{value:i}=r;return i||null}function Y(i,f){f.disabled||c(f,!1)}function q(i,f){f.disabled||F(f)}function L(i){var f;We(i,"action")||(f=e.onKeyup)===null||f===void 0||f.call(e,i)}function G(i){var f;We(i,"action")||(f=e.onKeydown)===null||f===void 0||f.call(e,i)}function J(i){var f;(f=e.onMousedown)===null||f===void 0||f.call(e,i),!e.focusable&&i.preventDefault()}function te(){const{value:i}=r;i&&c(i.getNext({loop:!0}),!0)}function Z(){const{value:i}=r;i&&c(i.getPrev({loop:!0}),!0)}function c(i,f=!1){r.value=i,f&&g()}function g(){var i,f;const N=r.value;if(!N)return;const Q=v.value(N.key);Q!==null&&(e.virtualScroll?(i=l.value)===null||i===void 0||i.scrollTo({index:Q}):(f=a.value)===null||f===void 0||f.scrollTo({index:Q,elSize:z.value}))}function I(i){var f,N;!((f=o.value)===null||f===void 0)&&f.contains(i.target)&&((N=e.onFocus)===null||N===void 0||N.call(e,i))}function W(i){var f,N;!((f=o.value)===null||f===void 0)&&f.contains(i.relatedTarget)||(N=e.onBlur)===null||N===void 0||N.call(e,i)}ft(dt,{handleOptionMouseEnter:Y,handleOptionClick:q,valueSetRef:P,pendingTmNodeRef:r,nodePropsRef:ee(e,"nodeProps"),showCheckmarkRef:ee(e,"showCheckmark"),multipleRef:ee(e,"multiple"),valueRef:ee(e,"value"),renderLabelRef:ee(e,"renderLabel"),renderOptionRef:ee(e,"renderOption"),labelFieldRef:ee(e,"labelField"),valueFieldRef:ee(e,"valueField")}),ft(Cn,o),Pe(()=>{const{value:i}=a;i&&i.sync()});const V=A(()=>{const{size:i}=e,{common:{cubicBezierEaseInOut:f},self:{height:N,borderRadius:Q,color:ae,groupHeaderTextColor:Te,actionDividerColor:Oe,optionTextColorPressed:be,optionTextColor:pe,optionTextColorDisabled:se,optionTextColorActive:ne,optionOpacityDisabled:me,optionCheckColor:ue,actionTextColor:Re,optionColorPending:fe,optionColorActive:he,loadingColor:Me,loadingSize:ze,optionColorActivePending:ke,[ge("optionFontSize",i)]:we,[ge("optionHeight",i)]:xe,[ge("optionPadding",i)]:ie}}=n.value;return{"--n-height":N,"--n-action-divider-color":Oe,"--n-action-text-color":Re,"--n-bezier":f,"--n-border-radius":Q,"--n-color":ae,"--n-option-font-size":we,"--n-group-header-text-color":Te,"--n-option-check-color":ue,"--n-option-color-pending":fe,"--n-option-color-active":he,"--n-option-color-active-pending":ke,"--n-option-height":xe,"--n-option-opacity-disabled":me,"--n-option-text-color":pe,"--n-option-text-color-active":ne,"--n-option-text-color-disabled":se,"--n-option-text-color-pressed":be,"--n-option-padding":ie,"--n-option-padding-left":Je(ie,"left"),"--n-option-padding-right":Je(ie,"right"),"--n-loading-color":Me,"--n-loading-size":ze}}),{inlineThemeDisabled:D}=e,B=D?st("internal-select-menu",A(()=>e.size[0]),V,e):void 0,K={selfRef:o,next:te,prev:Z,getPendingTmNode:H};return Ot(o,e.onResize),Object.assign({mergedTheme:n,virtualListRef:l,scrollbarRef:a,itemSize:z,padding:k,flattenedNodes:h,empty:p,virtualListContainer(){const{value:i}=l;return i==null?void 0:i.listElRef},virtualListContent(){const{value:i}=l;return i==null?void 0:i.itemsElRef},doScroll:E,handleFocusin:I,handleFocusout:W,handleKeyUp:L,handleKeyDown:G,handleMouseDown:J,handleVirtualListResize:m,handleVirtualListScroll:S,cssVars:D?void 0:V,themeClass:B==null?void 0:B.themeClass,onRender:B==null?void 0:B.onRender},K)},render(){const{$slots:e,virtualScroll:n,clsPrefix:o,mergedTheme:l,themeClass:a,onRender:h}=this;return h==null||h(),d("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,a,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?d("div",{class:`${o}-base-select-menu__loading`},d(ln,{clsPrefix:o,strokeWidth:20})):this.empty?d("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},an(e.empty,()=>[d(Tn,{theme:l.peers.Empty,themeOverrides:l.peerOverrides.Empty})])):d(rn,{ref:"scrollbarRef",theme:l.peers.Scrollbar,themeOverrides:l.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},{default:()=>n?d(An,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:v})=>v.isGroup?d(wt,{key:v.key,clsPrefix:o,tmNode:v}):v.ignored?null:d(mt,{clsPrefix:o,key:v.key,tmNode:v})}):d("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(v=>v.isGroup?d(wt,{key:v.key,clsPrefix:o,tmNode:v}):d(mt,{clsPrefix:o,key:v.key,tmNode:v})))}),on(e.action,v=>v&&[d("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},v),d(Ln,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Un={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"},qn=e=>{const{borderRadius:n,textColor2:o,textColorDisabled:l,inputColor:a,inputColorDisabled:h,primaryColor:v,primaryColorHover:r,warningColor:x,warningColorHover:y,errorColor:w,errorColorHover:z,borderColor:k,iconColor:P,iconColorDisabled:p,clearColor:F,clearColorHover:E,clearColorPressed:S,placeholderColor:m,placeholderColorDisabled:H,fontSizeTiny:Y,fontSizeSmall:q,fontSizeMedium:L,fontSizeLarge:G,heightTiny:J,heightSmall:te,heightMedium:Z,heightLarge:c}=e;return Object.assign(Object.assign({},Un),{fontSizeTiny:Y,fontSizeSmall:q,fontSizeMedium:L,fontSizeLarge:G,heightTiny:J,heightSmall:te,heightMedium:Z,heightLarge:c,borderRadius:n,textColor:o,textColorDisabled:l,placeholderColor:m,placeholderColorDisabled:H,color:a,colorDisabled:h,colorActive:a,border:`1px solid ${k}`,borderHover:`1px solid ${r}`,borderActive:`1px solid ${v}`,borderFocus:`1px solid ${r}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${ye(v,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${ye(v,{alpha:.2})}`,caretColor:v,arrowColor:P,arrowColorDisabled:p,loadingColor:v,borderWarning:`1px solid ${x}`,borderHoverWarning:`1px solid ${y}`,borderActiveWarning:`1px solid ${x}`,borderFocusWarning:`1px solid ${y}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${ye(x,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${ye(x,{alpha:.2})}`,colorActiveWarning:a,caretColorWarning:x,borderError:`1px solid ${w}`,borderHoverError:`1px solid ${z}`,borderActiveError:`1px solid ${w}`,borderFocusError:`1px solid ${z}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${ye(w,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${ye(w,{alpha:.2})}`,colorActiveError:a,caretColorError:w,clearColor:F,clearColorHover:E,clearColorPressed:S})},Gn=rt({name:"InternalSelection",common:at,peers:{Popover:On},self:qn}),Mt=Gn,Yn=re([$("base-selection",`
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[$("base-loading",`
 color: var(--n-loading-color);
 `),$("base-selection-tags","min-height: var(--n-height);"),j("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),j("state-border",`
 z-index: 1;
 border-color: #0000;
 `),$("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[j("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),$("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[j("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),$("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[j("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),$("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),$("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[$("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[j("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),j("render-label",`
 color: var(--n-text-color);
 `)]),ot("disabled",[re("&:hover",[j("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),oe("focus",[j("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),oe("active",[j("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),$("base-selection-label","background-color: var(--n-color-active);"),$("base-selection-tags","background-color: var(--n-color-active);")])]),oe("disabled","cursor: not-allowed;",[j("arrow",`
 color: var(--n-arrow-color-disabled);
 `),$("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[$("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),j("render-label",`
 color: var(--n-text-color-disabled);
 `)]),$("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),$("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),$("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[j("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),j("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>oe(`${e}-status`,[j("state-border",`border: var(--n-border-${e});`),ot("disabled",[re("&:hover",[j("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),oe("active",[j("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),$("base-selection-label",`background-color: var(--n-color-active-${e});`),$("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),oe("focus",[j("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),$("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),$("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[re("&:last-child","padding-right: 0;"),$("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[j("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Xn=de({name:"InternalSelection",props:Object.assign(Object.assign({},Fe.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const n=T(null),o=T(null),l=T(null),a=T(null),h=T(null),v=T(null),r=T(null),x=T(null),y=T(null),w=T(null),z=T(!1),k=T(!1),P=T(!1),p=Fe("InternalSelection","-internal-selection",Yn,Mt,e,ee(e,"clsPrefix")),F=A(()=>e.clearable&&!e.disabled&&(P.value||e.active)),E=A(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Se(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),S=A(()=>{const s=e.selectedOption;if(!!s)return s[e.labelField]}),m=A(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function H(){var s;const{value:b}=n;if(b){const{value:U}=o;U&&(U.style.width=`${b.offsetWidth}px`,e.maxTagCount!=="responsive"&&((s=y.value)===null||s===void 0||s.sync()))}}function Y(){const{value:s}=w;s&&(s.style.display="none")}function q(){const{value:s}=w;s&&(s.style.display="inline-block")}Ce(ee(e,"active"),s=>{s||Y()}),Ce(ee(e,"pattern"),()=>{e.multiple&&lt(H)});function L(s){const{onFocus:b}=e;b&&b(s)}function G(s){const{onBlur:b}=e;b&&b(s)}function J(s){const{onDeleteOption:b}=e;b&&b(s)}function te(s){const{onClear:b}=e;b&&b(s)}function Z(s){const{onPatternInput:b}=e;b&&b(s)}function c(s){var b;(!s.relatedTarget||!(!((b=l.value)===null||b===void 0)&&b.contains(s.relatedTarget)))&&L(s)}function g(s){var b;!((b=l.value)===null||b===void 0)&&b.contains(s.relatedTarget)||G(s)}function I(s){te(s)}function W(){P.value=!0}function V(){P.value=!1}function D(s){!e.active||!e.filterable||s.target!==o.value&&s.preventDefault()}function B(s){J(s)}function K(s){if(s.key==="Backspace"&&!i.value&&!e.pattern.length){const{selectedOptions:b}=e;b!=null&&b.length&&B(b[b.length-1])}}const i=T(!1);let f=null;function N(s){const{value:b}=n;if(b){const U=s.target.value;b.textContent=U,H()}e.ignoreComposition&&i.value?f=s:Z(s)}function Q(){i.value=!0}function ae(){i.value=!1,e.ignoreComposition&&Z(f),f=null}function Te(s){var b;k.value=!0,(b=e.onPatternFocus)===null||b===void 0||b.call(e,s)}function Oe(s){var b;k.value=!1,(b=e.onPatternBlur)===null||b===void 0||b.call(e,s)}function be(){var s,b;if(e.filterable)k.value=!1,(s=v.value)===null||s===void 0||s.blur(),(b=o.value)===null||b===void 0||b.blur();else if(e.multiple){const{value:U}=a;U==null||U.blur()}else{const{value:U}=h;U==null||U.blur()}}function pe(){var s,b,U;e.filterable?(k.value=!1,(s=v.value)===null||s===void 0||s.focus()):e.multiple?(b=a.value)===null||b===void 0||b.focus():(U=h.value)===null||U===void 0||U.focus()}function se(){const{value:s}=o;s&&(q(),s.focus())}function ne(){const{value:s}=o;s&&s.blur()}function me(s){const{value:b}=r;b&&b.setTextContent(`+${s}`)}function ue(){const{value:s}=x;return s}function Re(){return o.value}let fe=null;function he(){fe!==null&&window.clearTimeout(fe)}function Me(){e.disabled||e.active||(he(),fe=window.setTimeout(()=>{m.value&&(z.value=!0)},100))}function ze(){he()}function ke(s){s||(he(),z.value=!1)}Ce(m,s=>{s||(z.value=!1)}),Pe(()=>{sn(()=>{const s=v.value;!s||(s.tabIndex=e.disabled||k.value?-1:0)})}),Ot(l,e.onResize);const{inlineThemeDisabled:we}=e,xe=A(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:b},self:{borderRadius:U,color:Ie,placeholderColor:je,textColor:Ke,paddingSingle:Ue,paddingMultiple:qe,caretColor:_e,colorDisabled:$e,textColorDisabled:Be,placeholderColorDisabled:Ge,colorActive:Ye,boxShadowFocus:Ae,boxShadowActive:ce,boxShadowHover:t,border:u,borderFocus:C,borderHover:_,borderActive:O,arrowColor:M,arrowColorDisabled:R,loadingColor:X,colorActiveWarning:Ee,boxShadowFocusWarning:Xe,boxShadowActiveWarning:kt,boxShadowHoverWarning:Pt,borderWarning:It,borderFocusWarning:_t,borderHoverWarning:$t,borderActiveWarning:Bt,colorActiveError:At,boxShadowFocusError:Et,boxShadowActiveError:Nt,boxShadowHoverError:Lt,borderError:Dt,borderFocusError:Ht,borderHoverError:Wt,borderActiveError:Vt,clearColor:jt,clearColorHover:Kt,clearColorPressed:Ut,clearSize:qt,arrowSize:Gt,[ge("height",s)]:Yt,[ge("fontSize",s)]:Xt}}=p.value;return{"--n-bezier":b,"--n-border":u,"--n-border-active":O,"--n-border-focus":C,"--n-border-hover":_,"--n-border-radius":U,"--n-box-shadow-active":ce,"--n-box-shadow-focus":Ae,"--n-box-shadow-hover":t,"--n-caret-color":_e,"--n-color":Ie,"--n-color-active":Ye,"--n-color-disabled":$e,"--n-font-size":Xt,"--n-height":Yt,"--n-padding-single":Ue,"--n-padding-multiple":qe,"--n-placeholder-color":je,"--n-placeholder-color-disabled":Ge,"--n-text-color":Ke,"--n-text-color-disabled":Be,"--n-arrow-color":M,"--n-arrow-color-disabled":R,"--n-loading-color":X,"--n-color-active-warning":Ee,"--n-box-shadow-focus-warning":Xe,"--n-box-shadow-active-warning":kt,"--n-box-shadow-hover-warning":Pt,"--n-border-warning":It,"--n-border-focus-warning":_t,"--n-border-hover-warning":$t,"--n-border-active-warning":Bt,"--n-color-active-error":At,"--n-box-shadow-focus-error":Et,"--n-box-shadow-active-error":Nt,"--n-box-shadow-hover-error":Lt,"--n-border-error":Dt,"--n-border-focus-error":Ht,"--n-border-hover-error":Wt,"--n-border-active-error":Vt,"--n-clear-size":qt,"--n-clear-color":jt,"--n-clear-color-hover":Kt,"--n-clear-color-pressed":Ut,"--n-arrow-size":Gt}}),ie=we?st("internal-selection",A(()=>e.size[0]),xe,e):void 0;return{mergedTheme:p,mergedClearable:F,patternInputFocused:k,filterablePlaceholder:E,label:S,selected:m,showTagsPanel:z,isComposing:i,counterRef:r,counterWrapperRef:x,patternInputMirrorRef:n,patternInputRef:o,selfRef:l,multipleElRef:a,singleElRef:h,patternInputWrapperRef:v,overflowRef:y,inputTagElRef:w,handleMouseDown:D,handleFocusin:c,handleClear:I,handleMouseEnter:W,handleMouseLeave:V,handleDeleteOption:B,handlePatternKeyDown:K,handlePatternInputInput:N,handlePatternInputBlur:Oe,handlePatternInputFocus:Te,handleMouseEnterCounter:Me,handleMouseLeaveCounter:ze,handleFocusout:g,handleCompositionEnd:ae,handleCompositionStart:Q,onPopoverUpdateShow:ke,focus:pe,focusInput:se,blur:be,blurInput:ne,updateCounter:me,getCounter:ue,getTail:Re,renderLabel:e.renderLabel,cssVars:we?void 0:xe,themeClass:ie==null?void 0:ie.themeClass,onRender:ie==null?void 0:ie.onRender}},render(){const{status:e,multiple:n,size:o,disabled:l,filterable:a,maxTagCount:h,bordered:v,clsPrefix:r,onRender:x,renderTag:y,renderLabel:w}=this;x==null||x();const z=h==="responsive",k=typeof h=="number",P=z||k,p=d(dn,null,{default:()=>d(mn,{clsPrefix:r,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var E,S;return(S=(E=this.$slots).arrow)===null||S===void 0?void 0:S.call(E)}})});let F;if(n){const{labelField:E}=this,S=g=>d("div",{class:`${r}-base-selection-tag-wrapper`,key:g.value},y?y({option:g,handleClose:()=>this.handleDeleteOption(g)}):d(Qe,{size:o,closable:!g.disabled,disabled:l,onClose:()=>this.handleDeleteOption(g),internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>w?w(g,!0):Se(g[E],g,!0)})),m=()=>(k?this.selectedOptions.slice(0,h):this.selectedOptions).map(S),H=a?d("div",{class:`${r}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},d("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:l,value:this.pattern,autofocus:this.autofocus,class:`${r}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),d("span",{ref:"patternInputMirrorRef",class:`${r}-base-selection-input-tag__mirror`},this.pattern)):null,Y=z?()=>d("div",{class:`${r}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},d(Qe,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:l})):void 0;let q;if(k){const g=this.selectedOptions.length-h;g>0&&(q=d("div",{class:`${r}-base-selection-tag-wrapper`,key:"__counter__"},d(Qe,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:l},{default:()=>`+${g}`})))}const L=z?a?d(pt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:m,counter:Y,tail:()=>H}):d(pt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:m,counter:Y}):k?m().concat(q):m(),G=P?()=>d("div",{class:`${r}-base-selection-popover`},z?m():this.selectedOptions.map(S)):void 0,J=P?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,Z=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?d("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`},d("div",{class:`${r}-base-selection-placeholder__inner`},this.placeholder)):null,c=a?d("div",{ref:"patternInputWrapperRef",class:`${r}-base-selection-tags`},L,z?null:H,p):d("div",{ref:"multipleElRef",class:`${r}-base-selection-tags`,tabindex:l?void 0:0},L,p);F=d(un,null,P?d(Rn,Object.assign({},J,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>c,default:G}):c,Z)}else if(a){const E=this.pattern||this.isComposing,S=this.active?!E:!this.selected,m=this.active?!1:this.selected;F=d("div",{ref:"patternInputWrapperRef",class:`${r}-base-selection-label`},d("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${r}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:l,disabled:l,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),m?d("div",{class:`${r}-base-selection-label__render-label ${r}-base-selection-overlay`,key:"input"},d("div",{class:`${r}-base-selection-overlay__wrapper`},y?y({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):Se(this.label,this.selectedOption,!0))):null,S?d("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`,key:"placeholder"},d("div",{class:`${r}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,p)}else F=d("div",{ref:"singleElRef",class:`${r}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?d("div",{class:`${r}-base-selection-input`,title:In(this.label),key:"input"},d("div",{class:`${r}-base-selection-input__content`},y?y({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):Se(this.label,this.selectedOption,!0))):d("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`,key:"placeholder"},d("div",{class:`${r}-base-selection-placeholder__inner`},this.placeholder)),p);return d("div",{ref:"selfRef",class:[`${r}-base-selection`,this.themeClass,e&&`${r}-base-selection--${e}-status`,{[`${r}-base-selection--active`]:this.active,[`${r}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${r}-base-selection--disabled`]:this.disabled,[`${r}-base-selection--multiple`]:this.multiple,[`${r}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},F,v?d("div",{class:`${r}-base-selection__border`}):null,v?d("div",{class:`${r}-base-selection__state-border`}):null)}});function Ve(e){return e.type==="group"}function zt(e){return e.type==="ignored"}function tt(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Jn(e,n){return{getIsGroup:Ve,getIgnored:zt,getKey(l){return Ve(l)?l.name||l.key||"key-required":l[e]},getChildren(l){return l[n]}}}function Qn(e,n,o,l){if(!n)return e;function a(h){if(!Array.isArray(h))return[];const v=[];for(const r of h)if(Ve(r)){const x=a(r[l]);x.length&&v.push(Object.assign({},r,{[l]:x}))}else{if(zt(r))continue;n(o,r)&&v.push(r)}return v}return a(e)}function Zn(e,n,o){const l=new Map;return e.forEach(a=>{Ve(a)?a[o].forEach(h=>{l.set(h[n],h)}):l.set(a[n],a)}),l}function eo(e){const{boxShadow2:n}=e;return{menuBoxShadow:n}}const to=rt({name:"Select",common:at,peers:{InternalSelection:Mt,InternalSelectMenu:Rt},self:eo}),no=to,oo=re([$("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),$("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ft({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),io=Object.assign(Object.assign({},Fe.props),{to:it.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),so=de({name:"Select",props:io,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:o,namespaceRef:l,inlineThemeDisabled:a}=cn(e),h=Fe("Select","-select",oo,no,e,n),v=T(e.defaultValue),r=ee(e,"value"),x=vt(r,v),y=T(!1),w=T(""),z=A(()=>{const{valueField:t,childrenField:u}=e,C=Jn(t,u);return Pn(g.value,C)}),k=A(()=>Zn(Z.value,e.valueField,e.childrenField)),P=T(!1),p=vt(ee(e,"show"),P),F=T(null),E=T(null),S=T(null),{localeRef:m}=wn("Select"),H=A(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:m.value.placeholder}),Y=xn(e,["items","options"]),q=[],L=T([]),G=T([]),J=T(new Map),te=A(()=>{const{fallbackOption:t}=e;if(t===void 0){const{labelField:u,valueField:C}=e;return _=>({[u]:String(_),[C]:_})}return t===!1?!1:u=>Object.assign(t(u),{value:u})}),Z=A(()=>G.value.concat(L.value).concat(Y.value)),c=A(()=>{const{filter:t}=e;if(t)return t;const{labelField:u,valueField:C}=e;return(_,O)=>{if(!O)return!1;const M=O[u];if(typeof M=="string")return tt(_,M);const R=O[C];return typeof R=="string"?tt(_,R):typeof R=="number"?tt(_,String(R)):!1}}),g=A(()=>{if(e.remote)return Y.value;{const{value:t}=Z,{value:u}=w;return!u.length||!e.filterable?t:Qn(t,c.value,u,e.childrenField)}});function I(t){const u=e.remote,{value:C}=J,{value:_}=k,{value:O}=te,M=[];return t.forEach(R=>{if(_.has(R))M.push(_.get(R));else if(u&&C.has(R))M.push(C.get(R));else if(O){const X=O(R);X&&M.push(X)}}),M}const W=A(()=>{if(e.multiple){const{value:t}=x;return Array.isArray(t)?I(t):[]}return null}),V=A(()=>{const{value:t}=x;return!e.multiple&&!Array.isArray(t)?t===null?null:I([t])[0]||null:null}),D=fn(e),{mergedSizeRef:B,mergedDisabledRef:K,mergedStatusRef:i}=D;function f(t,u){const{onChange:C,"onUpdate:value":_,onUpdateValue:O}=e,{nTriggerFormChange:M,nTriggerFormInput:R}=D;C&&le(C,t,u),O&&le(O,t,u),_&&le(_,t,u),v.value=t,M(),R()}function N(t){const{onBlur:u}=e,{nTriggerFormBlur:C}=D;u&&le(u,t),C()}function Q(){const{onClear:t}=e;t&&le(t)}function ae(t){const{onFocus:u,showOnFocus:C}=e,{nTriggerFormFocus:_}=D;u&&le(u,t),_(),C&&se()}function Te(t){const{onSearch:u}=e;u&&le(u,t)}function Oe(t){const{onScroll:u}=e;u&&le(u,t)}function be(){var t;const{remote:u,multiple:C}=e;if(u){const{value:_}=J;if(C){const{valueField:O}=e;(t=W.value)===null||t===void 0||t.forEach(M=>{_.set(M[O],M)})}else{const O=V.value;O&&_.set(O[e.valueField],O)}}}function pe(t){const{onUpdateShow:u,"onUpdate:show":C}=e;u&&le(u,t),C&&le(C,t),P.value=t}function se(){K.value||(pe(!0),P.value=!0,e.filterable&&Be())}function ne(){pe(!1)}function me(){w.value="",G.value=q}const ue=T(!1);function Re(){e.filterable&&(ue.value=!0)}function fe(){e.filterable&&(ue.value=!1,p.value||me())}function he(){K.value||(p.value?e.filterable?Be():ne():se())}function Me(t){var u,C;!((C=(u=S.value)===null||u===void 0?void 0:u.selfRef)===null||C===void 0)&&C.contains(t.relatedTarget)||(y.value=!1,N(t),ne())}function ze(t){ae(t),y.value=!0}function ke(t){y.value=!0}function we(t){var u;!((u=F.value)===null||u===void 0)&&u.$el.contains(t.relatedTarget)||(y.value=!1,N(t),ne())}function xe(){var t;(t=F.value)===null||t===void 0||t.focus(),ne()}function ie(t){var u;p.value&&(!((u=F.value)===null||u===void 0)&&u.$el.contains(bn(t))||ne())}function s(t){if(!Array.isArray(t))return[];if(te.value)return Array.from(t);{const{remote:u}=e,{value:C}=k;if(u){const{value:_}=J;return t.filter(O=>C.has(O)||_.has(O))}else return t.filter(_=>C.has(_))}}function b(t){U(t.rawNode)}function U(t){if(K.value)return;const{tag:u,remote:C,clearFilterAfterSelect:_,valueField:O}=e;if(u&&!C){const{value:M}=G,R=M[0]||null;if(R){const X=L.value;X.length?X.push(R):L.value=[R],G.value=q}}if(C&&J.value.set(t[O],t),e.multiple){const M=s(x.value),R=M.findIndex(X=>X===t[O]);if(~R){if(M.splice(R,1),u&&!C){const X=Ie(t[O]);~X&&(L.value.splice(X,1),_&&(w.value=""))}}else M.push(t[O]),_&&(w.value="");f(M,I(M))}else{if(u&&!C){const M=Ie(t[O]);~M?L.value=[L.value[M]]:L.value=q}$e(),ne(),f(t[O],t)}}function Ie(t){return L.value.findIndex(C=>C[e.valueField]===t)}function je(t){p.value||se();const{value:u}=t.target;w.value=u;const{tag:C,remote:_}=e;if(Te(u),C&&!_){if(!u){G.value=q;return}const{onCreate:O}=e,M=O?O(u):{[e.labelField]:u,[e.valueField]:u},{valueField:R}=e;Y.value.some(X=>X[R]===M[R])||L.value.some(X=>X[R]===M[R])?G.value=q:G.value=[M]}}function Ke(t){t.stopPropagation();const{multiple:u}=e;!u&&e.filterable&&ne(),Q(),u?f([],[]):f(null,null)}function Ue(t){!We(t,"action")&&!We(t,"empty")&&t.preventDefault()}function qe(t){Oe(t)}function _e(t){var u,C,_,O,M;switch(t.key){case" ":if(e.filterable)break;t.preventDefault();case"Enter":if(!(!((u=F.value)===null||u===void 0)&&u.isComposing)){if(p.value){const R=(C=S.value)===null||C===void 0?void 0:C.getPendingTmNode();R?b(R):e.filterable||(ne(),$e())}else if(se(),e.tag&&ue.value){const R=G.value[0];if(R){const X=R[e.valueField],{value:Ee}=x;e.multiple&&Array.isArray(Ee)&&Ee.some(Xe=>Xe===X)||U(R)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;p.value&&((_=S.value)===null||_===void 0||_.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;p.value?(O=S.value)===null||O===void 0||O.next():se();break;case"Escape":p.value&&(pn(t),ne()),(M=F.value)===null||M===void 0||M.focus();break}}function $e(){var t;(t=F.value)===null||t===void 0||t.focus()}function Be(){var t;(t=F.value)===null||t===void 0||t.focusInput()}function Ge(){var t;!p.value||(t=E.value)===null||t===void 0||t.syncPosition()}be(),Ce(ee(e,"options"),be);const Ye={focus:()=>{var t;(t=F.value)===null||t===void 0||t.focus()},blur:()=>{var t;(t=F.value)===null||t===void 0||t.blur()}},Ae=A(()=>{const{self:{menuBoxShadow:t}}=h.value;return{"--n-menu-box-shadow":t}}),ce=a?st("select",void 0,Ae,e):void 0;return Object.assign(Object.assign({},Ye),{mergedStatus:i,mergedClsPrefix:n,mergedBordered:o,namespace:l,treeMate:z,isMounted:hn(),triggerRef:F,menuRef:S,pattern:w,uncontrolledShow:P,mergedShow:p,adjustedTo:it(e),uncontrolledValue:v,mergedValue:x,followerRef:E,localizedPlaceholder:H,selectedOption:V,selectedOptions:W,mergedSize:B,mergedDisabled:K,focused:y,activeWithoutMenuOpen:ue,inlineThemeDisabled:a,onTriggerInputFocus:Re,onTriggerInputBlur:fe,handleTriggerOrMenuResize:Ge,handleMenuFocus:ke,handleMenuBlur:we,handleMenuTabOut:xe,handleTriggerClick:he,handleToggle:b,handleDeleteOption:U,handlePatternInput:je,handleClear:Ke,handleTriggerBlur:Me,handleTriggerFocus:ze,handleKeydown:_e,handleMenuAfterLeave:me,handleMenuClickOutside:ie,handleMenuScroll:qe,handleMenuKeydown:_e,handleMenuMousedown:Ue,mergedTheme:h,cssVars:a?void 0:Ae,themeClass:ce==null?void 0:ce.themeClass,onRender:ce==null?void 0:ce.onRender})},render(){return d("div",{class:`${this.mergedClsPrefix}-select`},d(Mn,null,{default:()=>[d(zn,null,{default:()=>d(Xn,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),d(kn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===it.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>d(Ct,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),vn(d(Kn,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var l,a;return[(a=(l=this.$slots).empty)===null||a===void 0?void 0:a.call(l)]},action:()=>{var l,a;return[(a=(l=this.$slots).action)===null||a===void 0?void 0:a.call(l)]}}),this.displayDirective==="show"?[[gn,this.mergedShow],[ht,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[ht,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{Nn as F,Kn as N,An as V,so as _,Hn as a,Un as b,Jn as c,eo as d,In as g,Rt as i,Ze as m,no as s};
