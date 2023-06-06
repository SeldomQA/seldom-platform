import{p as fe,N as he,a as de,V as Ie,b as Re,c as Oe,h as ue,r as Ke,d as Te}from"./Tag.0f7865c5.js";import{r as B,w as le,a as _e,h as ze,b as Ae,e as Be,f as V,g as Fe,i as G,d as T,j as l,k as ve,l as me,m as je,n as $e,u as Z,p as g,q as ae,s as D,t as be,v as W,x as X,T as De,y as we,z as J,A as He,F as Le,B as Me,C as We,X as Ee,D as I,E as Ue,G as M,H as ce,I as O,J as A,K,L as qe,M as re,N as $,O as Ve,P as Ge}from"./index.b7222058.js";import{N as Xe}from"./Icon.f741b2d7.js";import{u as Je}from"./light.75d41d3d.js";function Ze(e){return o=>{o?e.value=o.$el:e.value=null}}function Qe(e,o,n){if(!o)return e;const t=B(e.value);let r=null;return le(e,i=>{r!==null&&window.clearTimeout(r),i===!0?n&&!n.value?t.value=!0:r=window.setTimeout(()=>{t.value=!0},o):t.value=!1}),t}function Ye(e={},o){const n=_e({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:t,keyup:r}=e,i=d=>{switch(d.key){case"Control":n.ctrl=!0;break;case"Meta":n.command=!0,n.win=!0;break;case"Shift":n.shift=!0;break;case"Tab":n.tab=!0;break}t!==void 0&&Object.keys(t).forEach(w=>{if(w!==d.key)return;const h=t[w];if(typeof h=="function")h(d);else{const{stop:x=!1,prevent:S=!1}=h;x&&d.stopPropagation(),S&&d.preventDefault(),h.handler(d)}})},u=d=>{switch(d.key){case"Control":n.ctrl=!1;break;case"Meta":n.command=!1,n.win=!1;break;case"Shift":n.shift=!1;break;case"Tab":n.tab=!1;break}r!==void 0&&Object.keys(r).forEach(w=>{if(w!==d.key)return;const h=r[w];if(typeof h=="function")h(d);else{const{stop:x=!1,prevent:S=!1}=h;x&&d.stopPropagation(),S&&d.preventDefault(),h.handler(d)}})},p=()=>{(o===void 0||o.value)&&(G("keydown",document,i),G("keyup",document,u)),o!==void 0&&le(o,d=>{d?(G("keydown",document,i),G("keyup",document,u)):(V("keydown",document,i),V("keyup",document,u))})};return ze()?(Ae(p),Be(()=>{(o===void 0||o.value)&&(V("keydown",document,i),V("keyup",document,u))})):p(),Fe(n)}const eo=T({name:"ChevronRight",render(){return l("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",fill:"currentColor"}))}}),oo={padding:"8px 14px"},no=e=>{const{borderRadius:o,boxShadow2:n,baseColor:t}=e;return Object.assign(Object.assign({},oo),{borderRadius:o,boxShadow:n,color:je(t,"rgba(0, 0, 0, .85)"),textColor:t})},to=ve({name:"Tooltip",common:me,peers:{Popover:fe},self:no}),ro=to,io={padding:"4px 0",optionIconSizeSmall:"14px",optionIconSizeMedium:"16px",optionIconSizeLarge:"16px",optionIconSizeHuge:"18px",optionSuffixWidthSmall:"14px",optionSuffixWidthMedium:"14px",optionSuffixWidthLarge:"16px",optionSuffixWidthHuge:"16px",optionIconSuffixWidthSmall:"32px",optionIconSuffixWidthMedium:"32px",optionIconSuffixWidthLarge:"36px",optionIconSuffixWidthHuge:"36px",optionPrefixWidthSmall:"14px",optionPrefixWidthMedium:"14px",optionPrefixWidthLarge:"16px",optionPrefixWidthHuge:"16px",optionIconPrefixWidthSmall:"36px",optionIconPrefixWidthMedium:"36px",optionIconPrefixWidthLarge:"40px",optionIconPrefixWidthHuge:"40px"},lo=e=>{const{primaryColor:o,textColor2:n,dividerColor:t,hoverColor:r,popoverColor:i,invertedColor:u,borderRadius:p,fontSizeSmall:d,fontSizeMedium:w,fontSizeLarge:h,fontSizeHuge:x,heightSmall:S,heightMedium:C,heightLarge:k,heightHuge:_,textColor3:y,opacityDisabled:N}=e;return Object.assign(Object.assign({},io),{optionHeightSmall:S,optionHeightMedium:C,optionHeightLarge:k,optionHeightHuge:_,borderRadius:p,fontSizeSmall:d,fontSizeMedium:w,fontSizeLarge:h,fontSizeHuge:x,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:o,optionTextColorChildActive:o,color:i,dividerColor:t,suffixColor:n,prefixColor:n,optionColorHover:r,optionColorActive:$e(o,{alpha:.1}),groupHeaderTextColor:y,optionTextColorInverted:"#BBB",optionTextColorHoverInverted:"#FFF",optionTextColorActiveInverted:"#FFF",optionTextColorChildActiveInverted:"#FFF",colorInverted:u,dividerColorInverted:"#BBB",suffixColorInverted:"#BBB",prefixColorInverted:"#BBB",optionColorHoverInverted:o,optionColorActiveInverted:o,groupHeaderTextColorInverted:"#AAA",optionOpacityDisabled:N})},ao=ve({name:"Dropdown",common:me,peers:{Popover:fe},self:lo}),so=ao,uo=Object.assign(Object.assign({},de),Z.props),Co=T({name:"Tooltip",props:uo,__popover__:!0,setup(e){const o=Z("Tooltip","-tooltip",void 0,ro,e),n=B(null);return Object.assign(Object.assign({},{syncPosition(){n.value.syncPosition()},setShow(r){n.value.setShow(r)}}),{popoverRef:n,mergedTheme:o,popoverThemeOverrides:g(()=>o.value.self)})},render(){const{mergedTheme:e,internalExtraClass:o}=this;return l(he,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:o.concat("tooltip"),ref:"popoverRef"}),this.$slots)}}),ge=T({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return l("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),se=ae("n-dropdown-menu"),Q=ae("n-dropdown"),pe=ae("n-dropdown-option");function ie(e,o){return e.type==="submenu"||e.type===void 0&&e[o]!==void 0}function co(e){return e.type==="group"}function xe(e){return e.type==="divider"}function po(e){return e.type==="render"}const ye=T({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const o=D(Q),{hoverKeyRef:n,keyboardKeyRef:t,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:i,activeKeyPathRef:u,animatedRef:p,mergedShowRef:d,renderLabelRef:w,renderIconRef:h,labelFieldRef:x,childrenFieldRef:S,renderOptionRef:C,nodePropsRef:k,menuPropsRef:_}=o,y=D(pe,null),N=D(se),E=D(be),Y=g(()=>e.tmNode.rawNode),U=g(()=>{const{value:s}=S;return ie(e.tmNode.rawNode,s)}),ee=g(()=>{const{disabled:s}=e.tmNode;return s}),oe=g(()=>{if(!U.value)return!1;const{key:s,disabled:b}=e.tmNode;if(b)return!1;const{value:R}=n,{value:F}=t,{value:te}=r,{value:j}=i;return R!==null?j.includes(s):F!==null?j.includes(s)&&j[j.length-1]!==s:te!==null?j.includes(s):!1}),ne=g(()=>t.value===null&&!p.value),q=Qe(oe,300,ne),H=g(()=>!!(y!=null&&y.enteringSubmenuRef.value)),L=B(!1);W(pe,{enteringSubmenuRef:L});function z(){L.value=!0}function a(){L.value=!1}function m(){const{parentKey:s,tmNode:b}=e;b.disabled||!d.value||(r.value=s,t.value=null,n.value=b.key)}function f(){const{tmNode:s}=e;s.disabled||!d.value||n.value!==s.key&&m()}function c(s){if(e.tmNode.disabled||!d.value)return;const{relatedTarget:b}=s;b&&!ue({target:b},"dropdownOption")&&!ue({target:b},"scrollbarRail")&&(n.value=null)}function P(){const{value:s}=U,{tmNode:b}=e;!d.value||!s&&!b.disabled&&(o.doSelect(b.key,b.rawNode),o.doUpdateShow(!1))}return{labelField:x,renderLabel:w,renderIcon:h,siblingHasIcon:N.showIconRef,siblingHasSubmenu:N.hasSubmenuRef,menuProps:_,popoverBody:E,animated:p,mergedShowSubmenu:g(()=>q.value&&!H.value),rawNode:Y,hasSubmenu:U,pending:X(()=>{const{value:s}=i,{key:b}=e.tmNode;return s.includes(b)}),childActive:X(()=>{const{value:s}=u,{key:b}=e.tmNode,R=s.findIndex(F=>b===F);return R===-1?!1:R<s.length-1}),active:X(()=>{const{value:s}=u,{key:b}=e.tmNode,R=s.findIndex(F=>b===F);return R===-1?!1:R===s.length-1}),mergedDisabled:ee,renderOption:C,nodeProps:k,handleClick:P,handleMouseMove:f,handleMouseEnter:m,handleMouseLeave:c,handleSubmenuBeforeEnter:z,handleSubmenuAfterEnter:a}},render(){var e,o;const{animated:n,rawNode:t,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:u,siblingHasSubmenu:p,renderLabel:d,renderIcon:w,renderOption:h,nodeProps:x,props:S,scrollable:C}=this;let k=null;if(r){const E=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,t,t.children);k=l(Se,Object.assign({},E,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const _={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},y=x==null?void 0:x(t),N=l("div",Object.assign({class:[`${i}-dropdown-option`,y==null?void 0:y.class],"data-dropdown-option":!0},y),l("div",we(_,S),[l("div",{class:[`${i}-dropdown-option-body__prefix`,u&&`${i}-dropdown-option-body__prefix--show-icon`]},[w?w(t):J(t.icon)]),l("div",{"data-dropdown-option":!0,class:`${i}-dropdown-option-body__label`},d?d(t):J((o=t[this.labelField])!==null&&o!==void 0?o:t.title)),l("div",{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__suffix`,p&&`${i}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?l(Xe,null,{default:()=>l(eo,null)}):null)]),this.hasSubmenu?l(Ie,null,{default:()=>[l(Re,null,{default:()=>l("div",{class:`${i}-dropdown-offset-container`},l(Oe,{show:this.mergedShowSubmenu,placement:this.placement,to:C&&this.popoverBody||void 0,teleportDisabled:!C},{default:()=>l("div",{class:`${i}-dropdown-menu-wrapper`},n?l(De,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>k}):k)}))})]}):null);return h?h({node:N,option:t}):N}}),fo=T({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:o}=D(se),{renderLabelRef:n,labelFieldRef:t,nodePropsRef:r,renderOptionRef:i}=D(Q);return{labelField:t,showIcon:e,hasSubmenu:o,renderLabel:n,nodeProps:r,renderOption:i}},render(){var e;const{clsPrefix:o,hasSubmenu:n,showIcon:t,nodeProps:r,renderLabel:i,renderOption:u}=this,{rawNode:p}=this.tmNode,d=l("div",Object.assign({class:`${o}-dropdown-option`},r==null?void 0:r(p)),l("div",{class:`${o}-dropdown-option-body ${o}-dropdown-option-body--group`},l("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__prefix`,t&&`${o}-dropdown-option-body__prefix--show-icon`]},J(p.icon)),l("div",{class:`${o}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(p):J((e=p.title)!==null&&e!==void 0?e:p[this.labelField])),l("div",{class:[`${o}-dropdown-option-body__suffix`,n&&`${o}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return u?u({node:d,option:p}):d}}),ho=T({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:o,clsPrefix:n}=this,{children:t}=e;return l(Le,null,l(fo,{clsPrefix:n,tmNode:e,key:e.key}),t==null?void 0:t.map(r=>{const{rawNode:i}=r;return i.show===!1?null:xe(i)?l(ge,{clsPrefix:n,key:r.key}):r.isGroup?(He("dropdown","`group` node is not allowed to be put in `group` node."),null):l(ye,{clsPrefix:n,tmNode:r,parentKey:o,key:r.key})}))}}),vo=T({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:o}}=this.tmNode;return l("div",o,[e==null?void 0:e()])}}),Se=T({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:o,childrenFieldRef:n}=D(Q);W(se,{showIconRef:g(()=>{const r=o.value;return e.tmNodes.some(i=>{var u;if(i.isGroup)return(u=i.children)===null||u===void 0?void 0:u.some(({rawNode:d})=>r?r(d):d.icon);const{rawNode:p}=i;return r?r(p):p.icon})}),hasSubmenuRef:g(()=>{const{value:r}=n;return e.tmNodes.some(i=>{var u;if(i.isGroup)return(u=i.children)===null||u===void 0?void 0:u.some(({rawNode:d})=>ie(d,r));const{rawNode:p}=i;return ie(p,r)})})});const t=B(null);return W(Me,null),W(We,null),W(be,t),{bodyRef:t}},render(){const{parentKey:e,clsPrefix:o,scrollable:n}=this,t=this.tmNodes.map(r=>{const{rawNode:i}=r;return i.show===!1?null:po(i)?l(vo,{tmNode:r,key:r.key}):xe(i)?l(ge,{clsPrefix:o,key:r.key}):co(i)?l(ho,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key}):l(ye,{clsPrefix:o,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return l("div",{class:[`${o}-dropdown-menu`,n&&`${o}-dropdown-menu--scrollable`],ref:"bodyRef"},n?l(Ee,{contentClass:`${o}-dropdown-menu__content`},{default:()=>t}):t,this.showArrow?Ke({clsPrefix:o,arrowStyle:this.arrowStyle}):null)}}),mo=I("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Ue(),I("dropdown-option",`
 position: relative;
 `,[M("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[M("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),I("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[M("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ce("disabled",[O("pending",`
 color: var(--n-option-text-color-hover);
 `,[A("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),M("&::before","background-color: var(--n-option-color-hover);")]),O("active",`
 color: var(--n-option-text-color-active);
 `,[A("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),M("&::before","background-color: var(--n-option-color-active);")]),O("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[A("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),O("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),O("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[A("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[O("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),A("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[O("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),I("icon",`
 font-size: var(--n-option-icon-size);
 `)]),A("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),A("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[O("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),I("icon",`
 font-size: var(--n-option-icon-size);
 `)]),I("dropdown-menu","pointer-events: all;")]),I("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),I("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),I("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),M(">",[I("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ce("scrollable",`
 padding: var(--n-padding);
 `),O("scrollable",[A("content",`
 padding: var(--n-padding);
 `)])]),bo={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},wo=Object.keys(de),go=Object.assign(Object.assign(Object.assign({},de),bo),Z.props),ko=T({name:"Dropdown",inheritAttrs:!1,props:go,setup(e){const o=B(!1),n=Je(K(e,"show"),o),t=g(()=>{const{keyField:a,childrenField:m}=e;return Te(e.options,{getKey(f){return f[a]},getDisabled(f){return f.disabled===!0},getIgnored(f){return f.type==="divider"||f.type==="render"},getChildren(f){return f[m]}})}),r=g(()=>t.value.treeNodes),i=B(null),u=B(null),p=B(null),d=g(()=>{var a,m,f;return(f=(m=(a=i.value)!==null&&a!==void 0?a:u.value)!==null&&m!==void 0?m:p.value)!==null&&f!==void 0?f:null}),w=g(()=>t.value.getPath(d.value).keyPath),h=g(()=>t.value.getPath(e.value).keyPath),x=X(()=>e.keyboard&&n.value);Ye({keydown:{ArrowUp:{prevent:!0,handler:ee},ArrowRight:{prevent:!0,handler:U},ArrowDown:{prevent:!0,handler:oe},ArrowLeft:{prevent:!0,handler:Y},Enter:{prevent:!0,handler:ne},Escape:E}},x);const{mergedClsPrefixRef:S,inlineThemeDisabled:C}=qe(e),k=Z("Dropdown","-dropdown",mo,so,e,S);W(Q,{labelFieldRef:K(e,"labelField"),childrenFieldRef:K(e,"childrenField"),renderLabelRef:K(e,"renderLabel"),renderIconRef:K(e,"renderIcon"),hoverKeyRef:i,keyboardKeyRef:u,lastToggledSubmenuKeyRef:p,pendingKeyPathRef:w,activeKeyPathRef:h,animatedRef:K(e,"animated"),mergedShowRef:n,nodePropsRef:K(e,"nodeProps"),renderOptionRef:K(e,"renderOption"),menuPropsRef:K(e,"menuProps"),doSelect:_,doUpdateShow:y}),le(n,a=>{!e.animated&&!a&&N()});function _(a,m){const{onSelect:f}=e;f&&re(f,a,m)}function y(a){const{"onUpdate:show":m,onUpdateShow:f}=e;m&&re(m,a),f&&re(f,a),o.value=a}function N(){i.value=null,u.value=null,p.value=null}function E(){y(!1)}function Y(){H("left")}function U(){H("right")}function ee(){H("up")}function oe(){H("down")}function ne(){const a=q();(a==null?void 0:a.isLeaf)&&n.value&&(_(a.key,a.rawNode),y(!1))}function q(){var a;const{value:m}=t,{value:f}=d;return!m||f===null?null:(a=m.getNode(f))!==null&&a!==void 0?a:null}function H(a){const{value:m}=d,{value:{getFirstAvailableNode:f}}=t;let c=null;if(m===null){const P=f();P!==null&&(c=P.key)}else{const P=q();if(P){let s;switch(a){case"down":s=P.getNext();break;case"up":s=P.getPrev();break;case"right":s=P.getChild();break;case"left":s=P.getParent();break}s&&(c=s.key)}}c!==null&&(i.value=null,u.value=c)}const L=g(()=>{const{size:a,inverted:m}=e,{common:{cubicBezierEaseInOut:f},self:c}=k.value,{padding:P,dividerColor:s,borderRadius:b,optionOpacityDisabled:R,[$("optionIconSuffixWidth",a)]:F,[$("optionSuffixWidth",a)]:te,[$("optionIconPrefixWidth",a)]:j,[$("optionPrefixWidth",a)]:Pe,[$("fontSize",a)]:Ce,[$("optionHeight",a)]:ke,[$("optionIconSize",a)]:Ne}=c,v={"--n-bezier":f,"--n-font-size":Ce,"--n-padding":P,"--n-border-radius":b,"--n-option-height":ke,"--n-option-prefix-width":Pe,"--n-option-icon-prefix-width":j,"--n-option-suffix-width":te,"--n-option-icon-suffix-width":F,"--n-option-icon-size":Ne,"--n-divider-color":s,"--n-option-opacity-disabled":R};return m?(v["--n-color"]=c.colorInverted,v["--n-option-color-hover"]=c.optionColorHoverInverted,v["--n-option-color-active"]=c.optionColorActiveInverted,v["--n-option-text-color"]=c.optionTextColorInverted,v["--n-option-text-color-hover"]=c.optionTextColorHoverInverted,v["--n-option-text-color-active"]=c.optionTextColorActiveInverted,v["--n-option-text-color-child-active"]=c.optionTextColorChildActiveInverted,v["--n-prefix-color"]=c.prefixColorInverted,v["--n-suffix-color"]=c.suffixColorInverted,v["--n-group-header-text-color"]=c.groupHeaderTextColorInverted):(v["--n-color"]=c.color,v["--n-option-color-hover"]=c.optionColorHover,v["--n-option-color-active"]=c.optionColorActive,v["--n-option-text-color"]=c.optionTextColor,v["--n-option-text-color-hover"]=c.optionTextColorHover,v["--n-option-text-color-active"]=c.optionTextColorActive,v["--n-option-text-color-child-active"]=c.optionTextColorChildActive,v["--n-prefix-color"]=c.prefixColor,v["--n-suffix-color"]=c.suffixColor,v["--n-group-header-text-color"]=c.groupHeaderTextColor),v}),z=C?Ve("dropdown",g(()=>`${e.size[0]}${e.inverted?"i":""}`),L,e):void 0;return{mergedClsPrefix:S,mergedTheme:k,tmNodes:r,mergedShow:n,handleAfterLeave:()=>{!e.animated||N()},doUpdateShow:y,cssVars:C?void 0:L,themeClass:z==null?void 0:z.themeClass,onRender:z==null?void 0:z.onRender}},render(){const e=(t,r,i,u,p)=>{var d;const{mergedClsPrefix:w,menuProps:h}=this;(d=this.onRender)===null||d===void 0||d.call(this);const x=(h==null?void 0:h(void 0,this.tmNodes.map(C=>C.rawNode)))||{},S={ref:Ze(r),class:[t,`${w}-dropdown`,this.themeClass],clsPrefix:w,tmNodes:this.tmNodes,style:[i,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:u,onMouseleave:p};return l(Se,we(this.$attrs,S,x))},{mergedTheme:o}=this,n={show:this.mergedShow,theme:o.peers.Popover,themeOverrides:o.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return l(he,Object.assign({},Ge(this.$props,wo),n),{trigger:()=>{var t,r;return(r=(t=this.$slots).default)===null||r===void 0?void 0:r.call(t)}})}}),No=(e,o)=>{const n=e.__vccOpts||e;for(const[t,r]of o)n[t]=r;return n};export{eo as C,Co as N,No as _,ko as a,oo as b,Ze as c,so as d,lo as s,ro as t};
