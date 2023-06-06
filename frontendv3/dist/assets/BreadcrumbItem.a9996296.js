import{D as l,G as a,I as L,J as u,d as g,L as y,u as x,v as P,K as T,p,O as j,j as v,q as E,r as I,af as S,ab as $,bQ as w,s as H,a1 as O}from"./index.24059398.js";import{b as K}from"./Space.591372fd.js";const V=l("breadcrumb",`
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`,[a("ul",`
 list-style: none;
 padding: 0;
 margin: 0;
 `),a("a",`
 color: inherit;
 text-decoration: inherit;
 `),l("breadcrumb-item",`
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `,[l("icon",`
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `),a("&:not(:last-child)",[L("clickable",[u("link",`
 cursor: pointer;
 `,[a("&:hover",`
 background-color: var(--n-item-color-hover);
 `),a("&:active",`
 background-color: var(--n-item-color-pressed); 
 `)])])]),u("link",`
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `,[a("&:hover",`
 color: var(--n-item-text-color-hover);
 `,[l("icon",`
 color: var(--n-item-text-color-hover);
 `)]),a("&:active",`
 color: var(--n-item-text-color-pressed);
 `,[l("icon",`
 color: var(--n-item-text-color-pressed);
 `)])]),u("separator",`
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `),a("&:last-child",[u("link",`
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `,[l("icon",`
 color: var(--n-item-text-color-active);
 `)]),u("separator",`
 display: none;
 `)])])]),C=E("n-breadcrumb"),A=Object.assign(Object.assign({},x.props),{separator:{type:String,default:"/"}}),J=g({name:"Breadcrumb",props:A,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r}=y(e),s=x("Breadcrumb","-breadcrumb",V,K,e,o);P(C,{separatorRef:T(e,"separator"),mergedClsPrefixRef:o});const c=p(()=>{const{common:{cubicBezierEaseInOut:d},self:{separatorColor:m,itemTextColor:n,itemTextColorHover:i,itemTextColorPressed:h,itemTextColorActive:b,fontSize:f,fontWeightActive:k,itemBorderRadius:_,itemColorHover:R,itemColorPressed:z,itemLineHeight:B}}=s.value;return{"--n-font-size":f,"--n-bezier":d,"--n-item-text-color":n,"--n-item-text-color-hover":i,"--n-item-text-color-pressed":h,"--n-item-text-color-active":b,"--n-separator-color":m,"--n-item-color-hover":R,"--n-item-color-pressed":z,"--n-item-border-radius":_,"--n-font-weight-active":k,"--n-item-line-height":B}}),t=r?j("breadcrumb",void 0,c,e):void 0;return{mergedClsPrefix:o,cssVars:r?void 0:c,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),v("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},v("ul",null,this.$slots))}}),D=w?window:null,M=(e=D)=>{const o=()=>{const{hash:c,host:t,hostname:d,href:m,origin:n,pathname:i,port:h,protocol:b,search:f}=(e==null?void 0:e.location)||{};return{hash:c,host:t,hostname:d,href:m,origin:n,pathname:i,port:h,protocol:b,search:f}},r=()=>{s.value=o()},s=I(o());return S(()=>{e&&(e.addEventListener("popstate",r),e.addEventListener("hashchange",r))}),$(()=>{e&&(e.removeEventListener("popstate",r),e.removeEventListener("hashchange",r))}),s},q={separator:String,href:String,clickable:{type:Boolean,default:!0},onClick:Function},N=g({name:"BreadcrumbItem",props:q,setup(e,{slots:o}){const r=H(C,null);if(!r)return()=>null;const{separatorRef:s,mergedClsPrefixRef:c}=r,t=M(),d=p(()=>e.href?"a":"span"),m=p(()=>t.value.href===e.href?"location":null);return()=>{const{value:n}=c;return v("li",{class:[`${n}-breadcrumb-item`,e.clickable&&`${n}-breadcrumb-item--clickable`]},v(d.value,{class:`${n}-breadcrumb-item__link`,"aria-current":m.value,href:e.href,onClick:e.onClick},o),v("span",{class:`${n}-breadcrumb-item__separator`,"aria-hidden":"true"},O(o.separator,()=>{var i;return[(i=e.separator)!==null&&i!==void 0?i:s.value]})))}}});export{N as _,J as a};
