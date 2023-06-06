import{P as ve}from"./project.d332744d.js";import{u as at,e as lt,_ as Vt,b as qt,d as Zt}from"./HttpCommon.d6b77f6d.js";import{al as st,an as ae,j as t,d as X,bQ as ut,u as ne,q as Ue,k as Xt,l as Gt,G as j,D as m,bI as Ze,E as Yt,H as Kt,K as W,r as V,w as Jt,e as dt,f as ye,s as ue,p as L,L as de,O as we,aw as Qt,ay as er,at as Xe,ax as tr,T as Te,F as Re,a2 as Z,aY as rr,i as Oe,b$ as or,W as je,v as Ne,ar as nr,af as ke,a0 as Me,I as O,bM as ct,bO as ft,bN as ht,bL as gt,N as Ae,bG as Pe,a1 as ir,bn as pt,x as ar,a7 as pe,Y as lr,A as sr,bo as Ge,J as oe,R as ur,Q as dr,bJ as cr,_ as fr,M as Ye,o as ie,bp as se,br as te,bt as S,bx as k,bR as Se,b2 as G,a as hr,c0 as gr,bV as pr,bW as vr,by as De,c as Ke}from"./index.24059398.js";import{a as mr,f as he,j as br,u as wr}from"./light.9d5e7374.js";import{p as xr,t as vt,u as yr,S as Cr}from"./SettingsOutline.52440ec8.js";import{A as _r}from"./Add.74cb07c4.js";import{t as Rr,N as kr,_ as Sr,a as Pr}from"./_plugin-vue_export-helper.3df3813b.js";import{e as Br,_ as $r,l as Lr}from"./Tag.37583d94.js";import{E as Tr,_ as Or}from"./Input.b88c9ca8.js";import{N as mt}from"./Icon.1e1350dc.js";import{N as bt}from"./Space.591372fd.js";import{_ as Dr,a as zr}from"./BreadcrumbItem.a9996296.js";import{_ as Fr,a as Ir}from"./DescriptionsItem.52495b42.js";function Er(e,n,o,r){var i=-1,l=e==null?0:e.length;for(r&&l&&(o=e[++i]);++i<l;)o=n(o,e[i],i,e);return o}function jr(e){return function(n){return e==null?void 0:e[n]}}var Mr={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},Ar=jr(Mr);const Ur=Ar;var Nr=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Hr="\\u0300-\\u036f",Wr="\\ufe20-\\ufe2f",Vr="\\u20d0-\\u20ff",qr=Hr+Wr+Vr,Zr="["+qr+"]",Xr=RegExp(Zr,"g");function Gr(e){return e=st(e),e&&e.replace(Nr,Ur).replace(Xr,"")}var Yr=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function Kr(e){return e.match(Yr)||[]}var Jr=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function Qr(e){return Jr.test(e)}var wt="\\ud800-\\udfff",eo="\\u0300-\\u036f",to="\\ufe20-\\ufe2f",ro="\\u20d0-\\u20ff",oo=eo+to+ro,xt="\\u2700-\\u27bf",yt="a-z\\xdf-\\xf6\\xf8-\\xff",no="\\xac\\xb1\\xd7\\xf7",io="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",ao="\\u2000-\\u206f",lo=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Ct="A-Z\\xc0-\\xd6\\xd8-\\xde",so="\\ufe0e\\ufe0f",_t=no+io+ao+lo,Rt="['\u2019]",Je="["+_t+"]",uo="["+oo+"]",kt="\\d+",co="["+xt+"]",St="["+yt+"]",Pt="[^"+wt+_t+kt+xt+yt+Ct+"]",fo="\\ud83c[\\udffb-\\udfff]",ho="(?:"+uo+"|"+fo+")",go="[^"+wt+"]",Bt="(?:\\ud83c[\\udde6-\\uddff]){2}",$t="[\\ud800-\\udbff][\\udc00-\\udfff]",ge="["+Ct+"]",po="\\u200d",Qe="(?:"+St+"|"+Pt+")",vo="(?:"+ge+"|"+Pt+")",et="(?:"+Rt+"(?:d|ll|m|re|s|t|ve))?",tt="(?:"+Rt+"(?:D|LL|M|RE|S|T|VE))?",Lt=ho+"?",Tt="["+so+"]?",mo="(?:"+po+"(?:"+[go,Bt,$t].join("|")+")"+Tt+Lt+")*",bo="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",wo="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",xo=Tt+Lt+mo,yo="(?:"+[co,Bt,$t].join("|")+")"+xo,Co=RegExp([ge+"?"+St+"+"+et+"(?="+[Je,ge,"$"].join("|")+")",vo+"+"+tt+"(?="+[Je,ge+Qe,"$"].join("|")+")",ge+"?"+Qe+"+"+et,ge+"+"+tt,wo,bo,kt,yo].join("|"),"g");function _o(e){return e.match(Co)||[]}function Ro(e,n,o){return e=st(e),n=o?void 0:n,n===void 0?Qr(e)?_o(e):Kr(e):e.match(n)||[]}var ko="['\u2019]",So=RegExp(ko,"g");function Po(e){return function(n){return Er(Ro(Gr(n).replace(So,"")),e,"")}}var Bo=Po(function(e,n,o){return e+(o?"-":"")+n.toLowerCase()});const $o=Bo,Lo=ae("attach",t("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},t("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},t("g",{fill:"currentColor","fill-rule":"nonzero"},t("path",{d:"M3.25735931,8.70710678 L7.85355339,4.1109127 C8.82986412,3.13460197 10.4127766,3.13460197 11.3890873,4.1109127 C12.365398,5.08722343 12.365398,6.67013588 11.3890873,7.64644661 L6.08578644,12.9497475 C5.69526215,13.3402718 5.06209717,13.3402718 4.67157288,12.9497475 C4.28104858,12.5592232 4.28104858,11.9260582 4.67157288,11.5355339 L9.97487373,6.23223305 C10.1701359,6.0369709 10.1701359,5.72038841 9.97487373,5.52512627 C9.77961159,5.32986412 9.4630291,5.32986412 9.26776695,5.52512627 L3.96446609,10.8284271 C3.18341751,11.6094757 3.18341751,12.8758057 3.96446609,13.6568542 C4.74551468,14.4379028 6.01184464,14.4379028 6.79289322,13.6568542 L12.0961941,8.35355339 C13.4630291,6.98671837 13.4630291,4.77064094 12.0961941,3.40380592 C10.7293591,2.0369709 8.51328163,2.0369709 7.14644661,3.40380592 L2.55025253,8 C2.35499039,8.19526215 2.35499039,8.51184464 2.55025253,8.70710678 C2.74551468,8.90236893 3.06209717,8.90236893 3.25735931,8.70710678 Z"}))))),To=ae("trash",t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},t("path",{d:"M432,144,403.33,419.74A32,32,0,0,1,371.55,448H140.46a32,32,0,0,1-31.78-28.26L80,144",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),t("rect",{x:"32",y:"64",width:"448",height:"80",rx:"16",ry:"16",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),t("line",{x1:"312",y1:"240",x2:"200",y2:"352",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),t("line",{x1:"312",y1:"352",x2:"200",y2:"240",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}))),Oo=ae("download",t("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},t("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},t("g",{fill:"currentColor","fill-rule":"nonzero"},t("path",{d:"M3.5,13 L12.5,13 C12.7761424,13 13,13.2238576 13,13.5 C13,13.7454599 12.8231248,13.9496084 12.5898756,13.9919443 L12.5,14 L3.5,14 C3.22385763,14 3,13.7761424 3,13.5 C3,13.2545401 3.17687516,13.0503916 3.41012437,13.0080557 L3.5,13 L12.5,13 L3.5,13 Z M7.91012437,1.00805567 L8,1 C8.24545989,1 8.44960837,1.17687516 8.49194433,1.41012437 L8.5,1.5 L8.5,10.292 L11.1819805,7.6109127 C11.3555469,7.43734635 11.6249713,7.4180612 11.8198394,7.55305725 L11.8890873,7.6109127 C12.0626536,7.78447906 12.0819388,8.05390346 11.9469427,8.2487716 L11.8890873,8.31801948 L8.35355339,11.8535534 C8.17998704,12.0271197 7.91056264,12.0464049 7.7156945,11.9114088 L7.64644661,11.8535534 L4.1109127,8.31801948 C3.91565056,8.12275734 3.91565056,7.80617485 4.1109127,7.6109127 C4.28447906,7.43734635 4.55390346,7.4180612 4.7487716,7.55305725 L4.81801948,7.6109127 L7.5,10.292 L7.5,1.5 C7.5,1.25454011 7.67687516,1.05039163 7.91012437,1.00805567 L8,1 L7.91012437,1.00805567 Z"}))))),Do=ae("cancel",t("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},t("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},t("g",{fill:"currentColor","fill-rule":"nonzero"},t("path",{d:"M2.58859116,2.7156945 L2.64644661,2.64644661 C2.82001296,2.47288026 3.08943736,2.45359511 3.2843055,2.58859116 L3.35355339,2.64644661 L8,7.293 L12.6464466,2.64644661 C12.8417088,2.45118446 13.1582912,2.45118446 13.3535534,2.64644661 C13.5488155,2.84170876 13.5488155,3.15829124 13.3535534,3.35355339 L8.707,8 L13.3535534,12.6464466 C13.5271197,12.820013 13.5464049,13.0894374 13.4114088,13.2843055 L13.3535534,13.3535534 C13.179987,13.5271197 12.9105626,13.5464049 12.7156945,13.4114088 L12.6464466,13.3535534 L8,8.707 L3.35355339,13.3535534 C3.15829124,13.5488155 2.84170876,13.5488155 2.64644661,13.3535534 C2.45118446,13.1582912 2.45118446,12.8417088 2.64644661,12.6464466 L7.293,8 L2.64644661,3.35355339 C2.47288026,3.17998704 2.45359511,2.91056264 2.58859116,2.7156945 L2.64644661,2.64644661 L2.58859116,2.7156945 Z"}))))),zo=ae("retry",t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},t("path",{d:"M320,146s24.36-12-64-12A160,160,0,1,0,416,294",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 32px;"}),t("polyline",{points:"256 58 336 138 256 218",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}))),Fo=ae("rotateClockwise",t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 12.7916 15.3658 15.2026 13 16.3265V14.5C13 14.2239 12.7761 14 12.5 14C12.2239 14 12 14.2239 12 14.5V17.5C12 17.7761 12.2239 18 12.5 18H15.5C15.7761 18 16 17.7761 16 17.5C16 17.2239 15.7761 17 15.5 17H13.8758C16.3346 15.6357 18 13.0128 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.2761 2.22386 10.5 2.5 10.5C2.77614 10.5 3 10.2761 3 10Z",fill:"currentColor"}),t("path",{d:"M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11Z",fill:"currentColor"}))),Io=ae("rotateClockwise",t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 12.7916 4.63419 15.2026 7 16.3265V14.5C7 14.2239 7.22386 14 7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H6.12422C3.66539 15.6357 2 13.0128 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 10.2761 17.7761 10.5 17.5 10.5C17.2239 10.5 17 10.2761 17 10Z",fill:"currentColor"}),t("path",{d:"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z",fill:"currentColor"}))),Eo=ae("zoomIn",t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M11.5 8.5C11.5 8.22386 11.2761 8 11 8H9V6C9 5.72386 8.77614 5.5 8.5 5.5C8.22386 5.5 8 5.72386 8 6V8H6C5.72386 8 5.5 8.22386 5.5 8.5C5.5 8.77614 5.72386 9 6 9H8V11C8 11.2761 8.22386 11.5 8.5 11.5C8.77614 11.5 9 11.2761 9 11V9H11C11.2761 9 11.5 8.77614 11.5 8.5Z",fill:"currentColor"}),t("path",{d:"M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z",fill:"currentColor"}))),jo=ae("zoomOut",t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M11 8C11.2761 8 11.5 8.22386 11.5 8.5C11.5 8.77614 11.2761 9 11 9H6C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8H11Z",fill:"currentColor"}),t("path",{d:"M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L16.1464 16.8536L16.2157 16.9114C16.4106 17.0464 16.68 17.0271 16.8536 16.8536C17.0488 16.6583 17.0488 16.3417 16.8536 16.1464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z",fill:"currentColor"}))),Mo=X({name:"ResizeSmall",render(){return t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},t("g",{fill:"none"},t("path",{d:"M5.5 4A1.5 1.5 0 0 0 4 5.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 5.5 3h1a.5.5 0 0 1 0 1h-1zM16 5.5A1.5 1.5 0 0 0 14.5 4h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 17 5.5v1a.5.5 0 0 1-1 0v-1zm0 9a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1zm-12 0A1.5 1.5 0 0 0 5.5 16h1.25a.5.5 0 0 1 0 1H5.5A2.5 2.5 0 0 1 3 14.5v-1.25a.5.5 0 0 1 1 0v1.25zM8.5 7A1.5 1.5 0 0 0 7 8.5v3A1.5 1.5 0 0 0 8.5 13h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 11.5 7h-3zM8 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3z",fill:"currentColor"})))}}),ze=ut&&"loading"in document.createElement("img"),Ao=(e={})=>{var n;const{root:o=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(n=e.threshold)!==null&&n!==void 0?n:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof o=="string"?document.querySelector(o):o)||document.documentElement})}},Fe=new WeakMap,Ie=new WeakMap,Ee=new WeakMap,Uo=(e,n,o)=>{if(!e)return()=>{};const r=Ao(n),{root:i}=r.options;let l;const d=Fe.get(i);d?l=d:(l=new Map,Fe.set(i,l));let c,u;l.has(r.hash)?(u=l.get(r.hash),u[1].has(e)||(c=u[0],u[1].add(e),c.observe(e))):(c=new IntersectionObserver(f=>{f.forEach(x=>{if(x.isIntersecting){const h=Ie.get(x.target),p=Ee.get(x.target);h&&h(),p&&(p.value=!0)}})},r.options),c.observe(e),u=[c,new Set([e])],l.set(r.hash,u));let a=!1;const s=()=>{a||(Ie.delete(e),Ee.delete(e),a=!0,u[1].has(e)&&(u[0].unobserve(e),u[1].delete(e)),u[1].size<=0&&l.delete(r.hash),l.size||Fe.delete(i))};return Ie.set(e,s),Ee.set(e,o),s},He=Object.assign(Object.assign({},ne.props),{showToolbar:{type:Boolean,default:!0},showToolbarTooltip:Boolean}),Ot=Ue("n-image");function No(){return{toolbarIconColor:"rgba(255, 255, 255, .9)",toolbarColor:"rgba(0, 0, 0, .35)",toolbarBoxShadow:"none",toolbarBorderRadius:"24px"}}const Ho=Xt({name:"Image",common:Gt,peers:{Tooltip:Rr},self:No}),Wo=t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M6 5C5.75454 5 5.55039 5.17688 5.50806 5.41012L5.5 5.5V14.5C5.5 14.7761 5.72386 15 6 15C6.24546 15 6.44961 14.8231 6.49194 14.5899L6.5 14.5V5.5C6.5 5.22386 6.27614 5 6 5ZM13.8536 5.14645C13.68 4.97288 13.4106 4.9536 13.2157 5.08859L13.1464 5.14645L8.64645 9.64645C8.47288 9.82001 8.4536 10.0894 8.58859 10.2843L8.64645 10.3536L13.1464 14.8536C13.3417 15.0488 13.6583 15.0488 13.8536 14.8536C14.0271 14.68 14.0464 14.4106 13.9114 14.2157L13.8536 14.1464L9.70711 10L13.8536 5.85355C14.0488 5.65829 14.0488 5.34171 13.8536 5.14645Z",fill:"currentColor"})),Vo=t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M13.5 5C13.7455 5 13.9496 5.17688 13.9919 5.41012L14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2545 15 13.0504 14.8231 13.0081 14.5899L13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM5.64645 5.14645C5.82001 4.97288 6.08944 4.9536 6.28431 5.08859L6.35355 5.14645L10.8536 9.64645C11.0271 9.82001 11.0464 10.0894 10.9114 10.2843L10.8536 10.3536L6.35355 14.8536C6.15829 15.0488 5.84171 15.0488 5.64645 14.8536C5.47288 14.68 5.4536 14.4106 5.58859 14.2157L5.64645 14.1464L9.79289 10L5.64645 5.85355C5.45118 5.65829 5.45118 5.34171 5.64645 5.14645Z",fill:"currentColor"})),qo=t("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t("path",{d:"M4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07l-.057.07z",fill:"currentColor"})),Zo=j([j("body >",[m("image-container","position: fixed;")]),m("image-preview-container",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 `),m("image-preview-overlay",`
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0, 0, 0, .3);
 `,[Ze()]),m("image-preview-toolbar",`
 z-index: 1;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);
 border-radius: var(--n-toolbar-border-radius);
 height: 48px;
 bottom: 40px;
 padding: 0 12px;
 background: var(--n-toolbar-color);
 box-shadow: var(--n-toolbar-box-shadow);
 color: var(--n-toolbar-icon-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[m("base-icon",`
 padding: 0 8px;
 font-size: 28px;
 cursor: pointer;
 `),Ze()]),m("image-preview-wrapper",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 pointer-events: none;
 `,[Yt()]),m("image-preview",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: all;
 margin: auto;
 max-height: calc(100vh - 32px);
 max-width: calc(100vw - 32px);
 transition: transform .3s var(--n-bezier);
 `),m("image",`
 display: inline-flex;
 max-height: 100%;
 max-width: 100%;
 `,[Kt("preview-disabled",`
 cursor: pointer;
 `),j("img",`
 border-radius: inherit;
 `)])]),Ce=32,Dt=X({name:"ImagePreview",props:Object.assign(Object.assign({},He),{onNext:Function,onPrev:Function,clsPrefix:{type:String,required:!0}}),setup(e){const n=ne("Image","-image",Zo,Ho,e,W(e,"clsPrefix"));let o=null;const r=V(null),i=V(null),l=V(void 0),d=V(!1),c=V(!1),{localeRef:u}=mr("Image");function a(){const{value:v}=i;if(!o||!v)return;const{style:C}=v,b=o.getBoundingClientRect(),M=b.left+b.width/2,A=b.top+b.height/2;C.transformOrigin=`${M}px ${A}px`}function s(v){var C,b;switch(v.key){case" ":v.preventDefault();break;case"ArrowLeft":(C=e.onPrev)===null||C===void 0||C.call(e);break;case"ArrowRight":(b=e.onNext)===null||b===void 0||b.call(e);break;case"Escape":We();break}}Jt(d,v=>{v?Oe("keydown",document,s):ye("keydown",document,s)}),dt(()=>{ye("keydown",document,s)});let f=0,x=0,h=0,p=0,y=0,R=0,I=0,D=0,B=!1;function z(v){const{clientX:C,clientY:b}=v;h=C-f,p=b-x,Br(K)}function w(v){const{mouseUpClientX:C,mouseUpClientY:b,mouseDownClientX:M,mouseDownClientY:A}=v,Y=M-C,ee=A-b,re=`vertical${ee>0?"Top":"Bottom"}`,le=`horizontal${Y>0?"Left":"Right"}`;return{moveVerticalDirection:re,moveHorizontalDirection:le,deltaHorizontal:Y,deltaVertical:ee}}function _(v){const{value:C}=r;if(!C)return{offsetX:0,offsetY:0};const b=C.getBoundingClientRect(),{moveVerticalDirection:M,moveHorizontalDirection:A,deltaHorizontal:Y,deltaVertical:ee}=v||{};let re=0,le=0;return b.width<=window.innerWidth?re=0:b.left>0?re=(b.width-window.innerWidth)/2:b.right<window.innerWidth?re=-(b.width-window.innerWidth)/2:A==="horizontalRight"?re=Math.min((b.width-window.innerWidth)/2,y-(Y!=null?Y:0)):re=Math.max(-((b.width-window.innerWidth)/2),y-(Y!=null?Y:0)),b.height<=window.innerHeight?le=0:b.top>0?le=(b.height-window.innerHeight)/2:b.bottom<window.innerHeight?le=-(b.height-window.innerHeight)/2:M==="verticalBottom"?le=Math.min((b.height-window.innerHeight)/2,R-(ee!=null?ee:0)):le=Math.max(-((b.height-window.innerHeight)/2),R-(ee!=null?ee:0)),{offsetX:re,offsetY:le}}function $(v){ye("mousemove",document,z),ye("mouseup",document,$);const{clientX:C,clientY:b}=v;B=!1;const M=w({mouseUpClientX:C,mouseUpClientY:b,mouseDownClientX:I,mouseDownClientY:D}),A=_(M);h=A.offsetX,p=A.offsetY,K()}const F=ue(Ot,null);function g(v){var C,b;if((b=(C=F==null?void 0:F.previewedImgPropsRef.value)===null||C===void 0?void 0:C.onMousedown)===null||b===void 0||b.call(C,v),v.button!==0)return;const{clientX:M,clientY:A}=v;B=!0,f=M-h,x=A-p,y=h,R=p,I=M,D=A,K(),Oe("mousemove",document,z),Oe("mouseup",document,$)}function P(v){var C,b;(b=(C=F==null?void 0:F.previewedImgPropsRef.value)===null||C===void 0?void 0:C.onDblclick)===null||b===void 0||b.call(C,v);const M=xe();T=T===M?1:M,K()}const E=1.5;let q=0,T=1,N=0;function U(){T=1,q=0}function H(){var v;U(),N=0,(v=e.onPrev)===null||v===void 0||v.call(e)}function J(){var v;U(),N=0,(v=e.onNext)===null||v===void 0||v.call(e)}function Q(){N-=90,K()}function ce(){N+=90,K()}function Be(){const{value:v}=r;if(!v)return 1;const{innerWidth:C,innerHeight:b}=window,M=Math.max(1,v.naturalHeight/(b-Ce)),A=Math.max(1,v.naturalWidth/(C-Ce));return Math.max(3,M*2,A*2)}function xe(){const{value:v}=r;if(!v)return 1;const{innerWidth:C,innerHeight:b}=window,M=v.naturalHeight/(b-Ce),A=v.naturalWidth/(C-Ce);return M<1&&A<1?1:Math.max(M,A)}function $e(){const v=Be();T<v&&(q+=1,T=Math.min(v,Math.pow(E,q)),K())}function Le(){if(T>.5){const v=T;q-=1,T=Math.max(.5,Math.pow(E,q));const C=v-T;K(!1);const b=_();T+=C,K(!1),T-=C,h=b.offsetX,p=b.offsetY,K()}}function K(v=!0){var C;const{value:b}=r;if(!b)return;const{style:M}=b,A=or((C=F==null?void 0:F.previewedImgPropsRef.value)===null||C===void 0?void 0:C.style);let Y="";if(typeof A=="string")Y=A+";";else for(const re in A)Y+=`${$o(re)}: ${A[re]};`;const ee=`transform-origin: center; transform: translateX(${h}px) translateY(${p}px) rotate(${N}deg) scale(${T});`;B?M.cssText=Y+"cursor: grabbing; transition: none;"+ee:M.cssText=Y+"cursor: grab;"+ee+(v?"":"transition: none;"),v||b.offsetHeight}function We(){d.value=!d.value,c.value=!0}function Nt(){T=xe(),q=Math.ceil(Math.log(T)/Math.log(E)),h=0,p=0,K()}const Ht={setPreviewSrc:v=>{l.value=v},setThumbnailEl:v=>{o=v},toggleShow:We};function Wt(v,C){if(e.showToolbarTooltip){const{value:b}=n;return t(kr,{to:!1,theme:b.peers.Tooltip,themeOverrides:b.peerOverrides.Tooltip,keepAliveOnHover:!1},{default:()=>u.value[C],trigger:()=>v})}else return v}const Ve=L(()=>{const{common:{cubicBezierEaseInOut:v},self:{toolbarIconColor:C,toolbarBorderRadius:b,toolbarBoxShadow:M,toolbarColor:A}}=n.value;return{"--n-bezier":v,"--n-toolbar-icon-color":C,"--n-toolbar-color":A,"--n-toolbar-border-radius":b,"--n-toolbar-box-shadow":M}}),{inlineThemeDisabled:qe}=de(),fe=qe?we("image-preview",void 0,Ve,e):void 0;return Object.assign({previewRef:r,previewWrapperRef:i,previewSrc:l,show:d,appear:Qt(),displayed:c,previewedImgProps:F==null?void 0:F.previewedImgPropsRef,handleWheel(v){v.preventDefault()},handlePreviewMousedown:g,handlePreviewDblclick:P,syncTransformOrigin:a,handleAfterLeave:()=>{U(),N=0,c.value=!1},handleDragStart:v=>{var C,b;(b=(C=F==null?void 0:F.previewedImgPropsRef.value)===null||C===void 0?void 0:C.onDragstart)===null||b===void 0||b.call(C,v),v.preventDefault()},zoomIn:$e,zoomOut:Le,rotateCounterclockwise:Q,rotateClockwise:ce,handleSwitchPrev:H,handleSwitchNext:J,withTooltip:Wt,resizeToOrignalImageSize:Nt,cssVars:qe?void 0:Ve,themeClass:fe==null?void 0:fe.themeClass,onRender:fe==null?void 0:fe.onRender},Ht)},render(){var e,n;const{clsPrefix:o}=this;return t(Re,null,(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e),t(er,{show:this.show},{default:()=>{var r;return this.show||this.displayed?((r=this.onRender)===null||r===void 0||r.call(this),Xe(t("div",{class:[`${o}-image-preview-container`,this.themeClass],style:this.cssVars,onWheel:this.handleWheel},t(Te,{name:"fade-in-transition",appear:this.appear},{default:()=>this.show?t("div",{class:`${o}-image-preview-overlay`,onClick:this.toggleShow}):null}),this.showToolbar?t(Te,{name:"fade-in-transition",appear:this.appear},{default:()=>{if(!this.show)return null;const{withTooltip:i}=this;return t("div",{class:`${o}-image-preview-toolbar`},this.onPrev?t(Re,null,i(t(Z,{clsPrefix:o,onClick:this.handleSwitchPrev},{default:()=>Wo}),"tipPrevious"),i(t(Z,{clsPrefix:o,onClick:this.handleSwitchNext},{default:()=>Vo}),"tipNext")):null,i(t(Z,{clsPrefix:o,onClick:this.rotateCounterclockwise},{default:()=>t(Io,null)}),"tipCounterclockwise"),i(t(Z,{clsPrefix:o,onClick:this.rotateClockwise},{default:()=>t(Fo,null)}),"tipClockwise"),i(t(Z,{clsPrefix:o,onClick:this.resizeToOrignalImageSize},{default:()=>t(Mo,null)}),"tipOriginalSize"),i(t(Z,{clsPrefix:o,onClick:this.zoomOut},{default:()=>t(jo,null)}),"tipZoomOut"),i(t(Z,{clsPrefix:o,onClick:this.zoomIn},{default:()=>t(Eo,null)}),"tipZoomIn"),i(t(Z,{clsPrefix:o,onClick:this.toggleShow},{default:()=>qo}),"tipClose"))}}):null,t(Te,{name:"fade-in-scale-up-transition",onAfterLeave:this.handleAfterLeave,appear:this.appear,onEnter:this.syncTransformOrigin,onBeforeLeave:this.syncTransformOrigin},{default:()=>{const{previewedImgProps:i={}}=this;return Xe(t("div",{class:`${o}-image-preview-wrapper`,ref:"previewWrapperRef"},t("img",Object.assign({},i,{draggable:!1,onMousedown:this.handlePreviewMousedown,onDblclick:this.handlePreviewDblclick,class:[`${o}-image-preview`,i.class],key:this.previewSrc,src:this.previewSrc,ref:"previewRef",onDragstart:this.handleDragStart}))),[[rr,this.show]])}})),[[tr,{enabled:this.show}]])):null}}))}}),zt=Ue("n-image-group"),Xo=He,Go=X({name:"ImageGroup",props:Xo,setup(e){let n;const{mergedClsPrefixRef:o}=de(e),r=`c${je()}`,i=nr(),l=u=>{var a;n=u,(a=c.value)===null||a===void 0||a.setPreviewSrc(u)};function d(u){if(!(i!=null&&i.proxy))return;const s=i.proxy.$el.parentElement.querySelectorAll(`[data-group-id=${r}]:not([data-error=true])`);if(!s.length)return;const f=Array.from(s).findIndex(x=>x.dataset.previewSrc===n);~f?l(s[(f+u+s.length)%s.length].dataset.previewSrc):l(s[0].dataset.previewSrc)}Ne(zt,{mergedClsPrefixRef:o,setPreviewSrc:l,setThumbnailEl:u=>{var a;(a=c.value)===null||a===void 0||a.setThumbnailEl(u)},toggleShow:()=>{var u;(u=c.value)===null||u===void 0||u.toggleShow()},groupId:r});const c=V(null);return{mergedClsPrefix:o,previewInstRef:c,next:()=>d(1),prev:()=>d(-1)}},render(){return t(Dt,{theme:this.theme,themeOverrides:this.themeOverrides,clsPrefix:this.mergedClsPrefix,ref:"previewInstRef",onPrev:this.prev,onNext:this.next,showToolbar:this.showToolbar,showToolbarTooltip:this.showToolbarTooltip},this.$slots)}}),Yo=Object.assign({alt:String,height:[String,Number],imgProps:Object,previewedImgProps:Object,lazy:Boolean,intersectionObserverOptions:Object,objectFit:{type:String,default:"fill"},previewSrc:String,fallbackSrc:String,width:[String,Number],src:String,previewDisabled:Boolean,loadDescription:String,onError:Function,onLoad:Function},He),Ko=X({name:"Image",props:Yo,inheritAttrs:!1,setup(e){const n=V(null),o=V(!1),r=V(null),i=ue(zt,null),{mergedClsPrefixRef:l}=i||de(e),d={click:()=>{if(e.previewDisabled||o.value)return;const a=e.previewSrc||e.src;if(i){i.setPreviewSrc(a),i.setThumbnailEl(n.value),i.toggleShow();return}const{value:s}=r;!s||(s.setPreviewSrc(a),s.setThumbnailEl(n.value),s.toggleShow())}},c=V(!e.lazy);ke(()=>{var a;(a=n.value)===null||a===void 0||a.setAttribute("data-group-id",(i==null?void 0:i.groupId)||"")}),ke(()=>{if(ze)return;let a;const s=Me(()=>{a==null||a(),a=void 0,e.lazy&&(a=Uo(n.value,e.intersectionObserverOptions,c))});dt(()=>{s(),a==null||a()})}),Me(()=>{var a;e.src,(a=e.imgProps)===null||a===void 0||a.src,o.value=!1});const u=V(!1);return Ne(Ot,{previewedImgPropsRef:W(e,"previewedImgProps")}),Object.assign({mergedClsPrefix:l,groupId:i==null?void 0:i.groupId,previewInstRef:r,imageRef:n,showError:o,shouldStartLoading:c,loaded:u,mergedOnClick:a=>{var s,f;d.click(),(f=(s=e.imgProps)===null||s===void 0?void 0:s.onClick)===null||f===void 0||f.call(s,a)},mergedOnError:a=>{if(!c.value)return;o.value=!0;const{onError:s,imgProps:{onError:f}={}}=e;s==null||s(a),f==null||f(a)},mergedOnLoad:a=>{const{onLoad:s,imgProps:{onLoad:f}={}}=e;s==null||s(a),f==null||f(a),u.value=!0}},d)},render(){var e,n;const{mergedClsPrefix:o,imgProps:r={},loaded:i,$attrs:l,lazy:d}=this,c=(n=(e=this.$slots).placeholder)===null||n===void 0?void 0:n.call(e),u=this.src||r.src||"",a=t("img",Object.assign(Object.assign({},r),{ref:"imageRef",width:this.width||r.width,height:this.height||r.height,src:ze?u:this.showError?this.fallbackSrc:this.shouldStartLoading?u:void 0,alt:this.alt||r.alt,"aria-label":this.alt||r.alt,onClick:this.mergedOnClick,onError:this.mergedOnError,onLoad:this.mergedOnLoad,loading:ze&&d&&!this.intersectionObserverOptions?"lazy":"eager",style:[r.style||"",c&&!i?{height:"0",width:"0",visibility:"hidden"}:"",{objectFit:this.objectFit}],"data-error":this.showError,"data-preview-src":this.previewSrc||this.src}));return t("div",Object.assign({},l,{role:"none",class:[l.class,`${o}-image`,(this.previewDisabled||this.showError)&&`${o}-image--preview-disabled`]}),this.groupId?a:t(Dt,{theme:this.theme,themeOverrides:this.themeOverrides,clsPrefix:o,ref:"previewInstRef",showToolbar:this.showToolbar,showToolbarTooltip:this.showToolbarTooltip},{default:()=>a}),!i&&c)}}),Jo=j([m("progress",{display:"inline-block"},[m("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),O("line",`
 width: 100%;
 display: block;
 `,[m("progress-content",`
 display: flex;
 align-items: center;
 `,[m("progress-graph",{flex:1})]),m("progress-custom-content",{marginLeft:"14px"}),m("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[O("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),O("circle, dashboard",{width:"120px"},[m("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),m("progress-text",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),m("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),O("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[m("progress-text",`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),m("progress-content",{position:"relative"}),m("progress-graph",{position:"relative"},[m("progress-graph-circle",[j("svg",{verticalAlign:"bottom"}),m("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[O("empty",{opacity:0})]),m("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),m("progress-graph-line",[O("indicator-inside",[m("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[m("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),m("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),O("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[m("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),m("progress-graph-line-indicator",`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),m("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[m("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[O("processing",[j("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),j("@keyframes progress-processing-animation",`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]),Qo={success:t(ct,null),error:t(ft,null),warning:t(ht,null),info:t(gt,null)},en=X({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:String,status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:n}){const o=L(()=>he(e.height)),r=L(()=>e.railBorderRadius!==void 0?he(e.railBorderRadius):e.height!==void 0?he(e.height,{c:.5}):""),i=L(()=>e.fillBorderRadius!==void 0?he(e.fillBorderRadius):e.railBorderRadius!==void 0?he(e.railBorderRadius):e.height!==void 0?he(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:l,railColor:d,railStyle:c,percentage:u,unit:a,indicatorTextColor:s,status:f,showIndicator:x,fillColor:h,processing:p,clsPrefix:y}=e;return t("div",{class:`${y}-progress-content`,role:"none"},t("div",{class:`${y}-progress-graph`,"aria-hidden":!0},t("div",{class:[`${y}-progress-graph-line`,{[`${y}-progress-graph-line--indicator-${l}`]:!0}]},t("div",{class:`${y}-progress-graph-line-rail`,style:[{backgroundColor:d,height:o.value,borderRadius:r.value},c]},t("div",{class:[`${y}-progress-graph-line-fill`,p&&`${y}-progress-graph-line-fill--processing`],style:{maxWidth:`${e.percentage}%`,backgroundColor:h,height:o.value,lineHeight:o.value,borderRadius:i.value}},l==="inside"?t("div",{class:`${y}-progress-graph-line-indicator`,style:{color:s}},u,a):null)))),x&&l==="outside"?t("div",null,n.default?t("div",{class:`${y}-progress-custom-content`,style:{color:s},role:"none"},n.default()):f==="default"?t("div",{role:"none",class:`${y}-progress-icon ${y}-progress-icon--as-text`,style:{color:s}},u,a):t("div",{class:`${y}-progress-icon`,"aria-hidden":!0},t(Z,{clsPrefix:y},{default:()=>Qo[f]}))):null)}}}),tn={success:t(ct,null),error:t(ft,null),warning:t(ht,null),info:t(gt,null)},rn=X({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:String,railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:n}){function o(r,i,l){const{gapDegree:d,viewBoxWidth:c,strokeWidth:u}=e,a=50,s=0,f=a,x=0,h=2*a,p=50+u/2,y=`M ${p},${p} m ${s},${f}
      a ${a},${a} 0 1 1 ${x},${-h}
      a ${a},${a} 0 1 1 ${-x},${h}`,R=Math.PI*2*a,I={stroke:l,strokeDasharray:`${r/100*(R-d)}px ${c*8}px`,strokeDashoffset:`-${d/2}px`,transformOrigin:i?"center":void 0,transform:i?`rotate(${i}deg)`:void 0};return{pathString:y,pathStyle:I}}return()=>{const{fillColor:r,railColor:i,strokeWidth:l,offsetDegree:d,status:c,percentage:u,showIndicator:a,indicatorTextColor:s,unit:f,gapOffsetDegree:x,clsPrefix:h}=e,{pathString:p,pathStyle:y}=o(100,0,i),{pathString:R,pathStyle:I}=o(u,d,r),D=100+l;return t("div",{class:`${h}-progress-content`,role:"none"},t("div",{class:`${h}-progress-graph`,"aria-hidden":!0},t("div",{class:`${h}-progress-graph-circle`,style:{transform:x?`rotate(${x}deg)`:void 0}},t("svg",{viewBox:`0 0 ${D} ${D}`},t("g",null,t("path",{class:`${h}-progress-graph-circle-rail`,d:p,"stroke-width":l,"stroke-linecap":"round",fill:"none",style:y})),t("g",null,t("path",{class:[`${h}-progress-graph-circle-fill`,u===0&&`${h}-progress-graph-circle-fill--empty`],d:R,"stroke-width":l,"stroke-linecap":"round",fill:"none",style:I}))))),a?t("div",null,n.default?t("div",{class:`${h}-progress-custom-content`,role:"none"},n.default()):c!=="default"?t("div",{class:`${h}-progress-icon`,"aria-hidden":!0},t(Z,{clsPrefix:h},{default:()=>tn[c]})):t("div",{class:`${h}-progress-text`,style:{color:s},role:"none"},t("span",{class:`${h}-progress-text__percentage`},u),t("span",{class:`${h}-progress-text__unit`},f))):null)}}});function rt(e,n,o=100){return`m ${o/2} ${o/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}const on=X({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:n}){const o=L(()=>e.percentage.map((i,l)=>`${Math.PI*i/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*l)-e.circleGap*l)*2}, ${e.viewBoxWidth*8}`));return()=>{const{viewBoxWidth:r,strokeWidth:i,circleGap:l,showIndicator:d,fillColor:c,railColor:u,railStyle:a,percentage:s,clsPrefix:f}=e;return t("div",{class:`${f}-progress-content`,role:"none"},t("div",{class:`${f}-progress-graph`,"aria-hidden":!0},t("div",{class:`${f}-progress-graph-circle`},t("svg",{viewBox:`0 0 ${r} ${r}`},s.map((x,h)=>t("g",{key:h},t("path",{class:`${f}-progress-graph-circle-rail`,d:rt(r/2-i/2*(1+2*h)-l*h,i,r),"stroke-width":i,"stroke-linecap":"round",fill:"none",style:[{strokeDashoffset:0,stroke:u[h]},a[h]]}),t("path",{class:[`${f}-progress-graph-circle-fill`,x===0&&`${f}-progress-graph-circle-fill--empty`],d:rt(r/2-i/2*(1+2*h)-l*h,i,r),"stroke-width":i,"stroke-linecap":"round",fill:"none",style:{strokeDasharray:o.value[h],strokeDashoffset:0,stroke:c[h]}})))))),d&&n.default?t("div",null,t("div",{class:`${f}-progress-text`},n.default())):null)}}}),nn=Object.assign(Object.assign({},ne.props),{processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),an=X({name:"Progress",props:nn,setup(e){const n=L(()=>e.indicatorPlacement||e.indicatorPosition),o=L(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=de(e),l=ne("Progress","-progress",Jo,xr,e,r),d=L(()=>{const{status:u}=e,{common:{cubicBezierEaseInOut:a},self:{fontSize:s,fontSizeCircle:f,railColor:x,railHeight:h,iconSizeCircle:p,iconSizeLine:y,textColorCircle:R,textColorLineInner:I,textColorLineOuter:D,lineBgProcessing:B,fontWeightCircle:z,[Ae("iconColor",u)]:w,[Ae("fillColor",u)]:_}}=l.value;return{"--n-bezier":a,"--n-fill-color":_,"--n-font-size":s,"--n-font-size-circle":f,"--n-font-weight-circle":z,"--n-icon-color":w,"--n-icon-size-circle":p,"--n-icon-size-line":y,"--n-line-bg-processing":B,"--n-rail-color":x,"--n-rail-height":h,"--n-text-color-circle":R,"--n-text-color-line-inner":I,"--n-text-color-line-outer":D}}),c=i?we("progress",L(()=>e.status[0]),d,e):void 0;return{mergedClsPrefix:r,mergedIndicatorPlacement:n,gapDeg:o,cssVars:i?void 0:d,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){const{type:e,cssVars:n,indicatorTextColor:o,showIndicator:r,status:i,railColor:l,railStyle:d,color:c,percentage:u,viewBoxWidth:a,strokeWidth:s,mergedIndicatorPlacement:f,unit:x,borderRadius:h,fillBorderRadius:p,height:y,processing:R,circleGap:I,mergedClsPrefix:D,gapDeg:B,gapOffsetDegree:z,themeClass:w,$slots:_,onRender:$}=this;return $==null||$(),t("div",{class:[w,`${D}-progress`,`${D}-progress--${e}`,`${D}-progress--${i}`],style:n,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":u,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},e==="circle"||e==="dashboard"?t(rn,{clsPrefix:D,status:i,showIndicator:r,indicatorTextColor:o,railColor:l,fillColor:c,railStyle:d,offsetDegree:this.offsetDegree,percentage:u,viewBoxWidth:a,strokeWidth:s,gapDegree:B===void 0?e==="dashboard"?75:0:B,gapOffsetDegree:z,unit:x},_):e==="line"?t(en,{clsPrefix:D,status:i,showIndicator:r,indicatorTextColor:o,railColor:l,fillColor:c,railStyle:d,percentage:u,processing:R,indicatorPlacement:f,unit:x,fillBorderRadius:p,railBorderRadius:h,height:y},_):e==="multiple-circle"?t(on,{clsPrefix:D,strokeWidth:s,railColor:l,fillColor:c,railStyle:d,viewBoxWidth:a,percentage:u,showIndicator:r,circleGap:I},_):null)}}),ln=m("p",`
 box-sizing: border-box;
 transition: color .3s var(--n-bezier);
 margin: var(--n-margin);
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 color: var(--n-text-color);
`,[j("&:first-child","margin-top: 0;"),j("&:last-child","margin-bottom: 0;")]),sn=Object.assign(Object.assign({},ne.props),{depth:[String,Number]}),un=X({name:"P",props:sn,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:o}=de(e),r=ne("Typography","-p",ln,vt,e,n),i=L(()=>{const{depth:d}=e,c=d||"1",{common:{cubicBezierEaseInOut:u},self:{pFontSize:a,pLineHeight:s,pMargin:f,pTextColor:x,[`pTextColor${c}Depth`]:h}}=r.value;return{"--n-bezier":u,"--n-font-size":a,"--n-line-height":s,"--n-margin":f,"--n-text-color":d===void 0?x:h}}),l=o?we("p",L(()=>`${e.depth||""}`),i,e):void 0;return{mergedClsPrefix:n,cssVars:o?void 0:i,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),t("p",{class:[`${this.mergedClsPrefix}-p`,this.themeClass],style:this.cssVars},this.$slots)}}),dn=m("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[O("strong",`
 font-weight: var(--n-font-weight-strong);
 `),O("italic",{fontStyle:"italic"}),O("underline",{textDecoration:"underline"}),O("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),cn=Object.assign(Object.assign({},ne.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),fn=X({name:"Text",props:cn,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:o}=de(e),r=ne("Typography","-text",dn,vt,e,n),i=L(()=>{const{depth:d,type:c}=e,u=c==="default"?d===void 0?"textColor":`textColor${d}Depth`:Ae("textColor",c),{common:{fontWeightStrong:a,fontFamilyMono:s,cubicBezierEaseInOut:f},self:{codeTextColor:x,codeBorderRadius:h,codeColor:p,codeBorder:y,[u]:R}}=r.value;return{"--n-bezier":f,"--n-text-color":R,"--n-font-weight-strong":a,"--n-font-famliy-mono":s,"--n-code-border-radius":h,"--n-code-text-color":x,"--n-code-color":p,"--n-code-border":y}}),l=o?we("text",L(()=>`${e.type[0]}${e.depth||""}`),i,e):void 0;return{mergedClsPrefix:n,compitableTag:br(e,["as","tag"]),cssVars:o?void 0:i,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e,n,o;const{mergedClsPrefix:r}=this;(e=this.onRender)===null||e===void 0||e.call(this);const i=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],l=(o=(n=this.$slots).default)===null||o===void 0?void 0:o.call(n);return this.code?t("code",{class:i,style:this.cssVars},this.delete?t("del",null,l):l):this.delete?t("del",{class:i,style:this.cssVars},l):t(this.compitableTag||"span",{class:i,style:this.cssVars},l)}}),me=Ue("n-upload"),Ft="__UPLOAD_DRAGGER__",It=X({name:"UploadDragger",[Ft]:!0,setup(e,{slots:n}){const o=ue(me,null);return o||Pe("upload-dragger","`n-upload-dragger` must be placed inside `n-upload`."),()=>{const{mergedClsPrefixRef:{value:r},mergedDisabledRef:{value:i},maxReachedRef:{value:l}}=o;return t("div",{class:[`${r}-upload-dragger`,(i||l)&&`${r}-upload-dragger--disabled`]},n)}}});var Et=globalThis&&globalThis.__awaiter||function(e,n,o,r){function i(l){return l instanceof o?l:new o(function(d){d(l)})}return new(o||(o=Promise))(function(l,d){function c(s){try{a(r.next(s))}catch(f){d(f)}}function u(s){try{a(r.throw(s))}catch(f){d(f)}}function a(s){s.done?l(s.value):i(s.value).then(c,u)}a((r=r.apply(e,n||[])).next())})};const jt=e=>e.includes("image/"),ot=(e="")=>{const n=e.split("/"),r=n[n.length-1].split(/#|\?/)[0];return(/\.[^./\\]*$/.exec(r)||[""])[0]},nt=/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i,Mt=e=>{if(e.type)return jt(e.type);const n=ot(e.name||"");if(nt.test(n))return!0;const o=e.thumbnailUrl||e.url||"",r=ot(o);return!!(/^data:image\//.test(o)||nt.test(r))};function hn(e){return Et(this,void 0,void 0,function*(){return yield new Promise(n=>{if(!e.type||!jt(e.type)){n("");return}n(window.URL.createObjectURL(e))})})}const gn=ut&&window.FileReader&&window.File;function pn(e){return e.isDirectory}function vn(e){return e.isFile}function mn(e,n){return Et(this,void 0,void 0,function*(){const o=[];let r,i=0;function l(){i++}function d(){i--,i||r(o)}function c(u){u.forEach(a=>{if(!!a){if(l(),n&&pn(a)){const s=a.createReader();l(),s.readEntries(f=>{c(f),d()},()=>{d()})}else vn(a)&&(l(),a.file(s=>{o.push({file:s,entry:a,source:"dnd"}),d()},()=>{d()}));d()}})}return yield new Promise(u=>{r=u,c(e)}),o})}function be(e){const{id:n,name:o,percentage:r,status:i,url:l,file:d,thumbnailUrl:c,type:u,fullPath:a,batchId:s}=e;return{id:n,name:o,percentage:r!=null?r:null,status:i,url:l!=null?l:null,file:d!=null?d:null,thumbnailUrl:c!=null?c:null,type:u!=null?u:null,fullPath:a!=null?a:null,batchId:s!=null?s:null}}function bn(e,n,o){return e=e.toLowerCase(),n=n.toLocaleLowerCase(),o=o.toLocaleLowerCase(),o.split(",").map(i=>i.trim()).filter(Boolean).some(i=>{if(i.startsWith(".")){if(e.endsWith(i))return!0}else if(i.includes("/")){const[l,d]=n.split("/"),[c,u]=i.split("/");if((c==="*"||l&&c&&c===l)&&(u==="*"||d&&u&&u===d))return!0}else return!0;return!1})}const wn=(e,n)=>{if(!e)return;const o=document.createElement("a");o.href=e,n!==void 0&&(o.download=n),document.body.appendChild(o),o.click(),document.body.removeChild(o)},At=X({name:"UploadTrigger",props:{abstract:Boolean},setup(e,{slots:n}){const o=ue(me,null);o||Pe("upload-trigger","`n-upload-trigger` must be placed inside `n-upload`.");const{mergedClsPrefixRef:r,mergedDisabledRef:i,maxReachedRef:l,listTypeRef:d,dragOverRef:c,openOpenFileDialog:u,draggerInsideRef:a,handleFileAddition:s,mergedDirectoryDndRef:f,triggerStyleRef:x}=o,h=L(()=>d.value==="image-card");function p(){i.value||l.value||u()}function y(B){B.preventDefault(),c.value=!0}function R(B){B.preventDefault(),c.value=!0}function I(B){B.preventDefault(),c.value=!1}function D(B){var z;if(B.preventDefault(),!a.value||i.value||l.value){c.value=!1;return}const w=(z=B.dataTransfer)===null||z===void 0?void 0:z.items;w!=null&&w.length?mn(Array.from(w).map(_=>_.webkitGetAsEntry()),f.value).then(_=>{s(_)}).finally(()=>{c.value=!1}):c.value=!1}return()=>{var B;const{value:z}=r;return e.abstract?(B=n.default)===null||B===void 0?void 0:B.call(n,{handleClick:p,handleDrop:D,handleDragOver:y,handleDragEnter:R,handleDragLeave:I}):t("div",{class:[`${z}-upload-trigger`,(i.value||l.value)&&`${z}-upload-trigger--disabled`,h.value&&`${z}-upload-trigger--image-card`],style:x.value,onClick:p,onDrop:D,onDragover:y,onDragenter:R,onDragleave:I},h.value?t(It,null,{default:()=>ir(n.default,()=>[t(Z,{clsPrefix:z},{default:()=>t(_r,null)})])}):n)}}}),xn=X({name:"UploadProgress",props:{show:Boolean,percentage:{type:Number,required:!0},status:{type:String,required:!0}},setup(){return{mergedTheme:ue(me).mergedThemeRef}},render(){return t(pt,null,{default:()=>this.show?t(an,{type:"line",showIndicator:!1,percentage:this.percentage,status:this.status,height:2,theme:this.mergedTheme.peers.Progress,themeOverrides:this.mergedTheme.peerOverrides.Progress}):null})}}),yn=t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"},t("g",{fill:"none"},t("path",{d:"M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3h15.5zm.583 20.4l-7.807-7.68a.75.75 0 0 0-.968-.07l-.084.07l-7.808 7.68c.183.065.38.1.584.1h15.5c.204 0 .4-.035.583-.1l-7.807-7.68l7.807 7.68zM21.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v15.5c0 .208.036.408.103.593l7.82-7.692a2.25 2.25 0 0 1 3.026-.117l.129.117l7.82 7.692c.066-.185.102-.385.102-.593V6.25a1.75 1.75 0 0 0-1.75-1.75zm-3.25 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2z",fill:"currentColor"}))),Cn=t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"},t("g",{fill:"none"},t("path",{d:"M6.4 2A2.4 2.4 0 0 0 4 4.4v19.2A2.4 2.4 0 0 0 6.4 26h15.2a2.4 2.4 0 0 0 2.4-2.4V11.578c0-.729-.29-1.428-.805-1.944l-6.931-6.931A2.4 2.4 0 0 0 14.567 2H6.4zm-.9 2.4a.9.9 0 0 1 .9-.9H14V10a2 2 0 0 0 2 2h6.5v11.6a.9.9 0 0 1-.9.9H6.4a.9.9 0 0 1-.9-.9V4.4zm16.44 6.1H16a.5.5 0 0 1-.5-.5V4.06l6.44 6.44z",fill:"currentColor"})));var _n=globalThis&&globalThis.__awaiter||function(e,n,o,r){function i(l){return l instanceof o?l:new o(function(d){d(l)})}return new(o||(o=Promise))(function(l,d){function c(s){try{a(r.next(s))}catch(f){d(f)}}function u(s){try{a(r.throw(s))}catch(f){d(f)}}function a(s){s.done?l(s.value):i(s.value).then(c,u)}a((r=r.apply(e,n||[])).next())})};const _e={paddingMedium:"0 3px",heightMedium:"24px",iconSizeMedium:"18px"},Rn=X({name:"UploadFile",props:{clsPrefix:{type:String,required:!0},file:{type:Object,required:!0},listType:{type:String,required:!0}},setup(e){const n=ue(me),o=V(null),r=V(""),i=L(()=>{const{file:w}=e;return w.status==="finished"?"success":w.status==="error"?"error":"info"}),l=L(()=>{const{file:w}=e;if(w.status==="error")return"error"}),d=L(()=>{const{file:w}=e;return w.status==="uploading"}),c=L(()=>{if(!n.showCancelButtonRef.value)return!1;const{file:w}=e;return["uploading","pending","error"].includes(w.status)}),u=L(()=>{if(!n.showRemoveButtonRef.value)return!1;const{file:w}=e;return["finished"].includes(w.status)}),a=L(()=>{if(!n.showDownloadButtonRef.value)return!1;const{file:w}=e;return["finished"].includes(w.status)}),s=L(()=>{if(!n.showRetryButtonRef.value)return!1;const{file:w}=e;return["error"].includes(w.status)}),f=ar(()=>r.value||e.file.thumbnailUrl||e.file.url),x=L(()=>{if(!n.showPreviewButtonRef.value)return!1;const{file:{status:w},listType:_}=e;return["finished"].includes(w)&&f.value&&_==="image-card"});function h(){n.submit(e.file.id)}function p(w){w.preventDefault();const{file:_}=e;["finished","pending","error"].includes(_.status)?R(_):["uploading"].includes(_.status)?D(_):sr("upload","The button clicked type is unknown.")}function y(w){w.preventDefault(),I(e.file)}function R(w){const{xhrMap:_,doChange:$,onRemoveRef:{value:F},mergedFileListRef:{value:g}}=n;Promise.resolve(F?F({file:Object.assign({},w),fileList:g}):!0).then(P=>{if(P===!1)return;const E=Object.assign({},w,{status:"removed"});_.delete(w.id),$(E,void 0,{remove:!0})})}function I(w){const{onDownloadRef:{value:_}}=n;Promise.resolve(_?_(Object.assign({},w)):!0).then($=>{$!==!1&&wn(w.url,w.name)})}function D(w){const{xhrMap:_}=n,$=_.get(w.id);$==null||$.abort(),R(Object.assign({},w))}function B(){const{onPreviewRef:{value:w}}=n;if(w)w(e.file);else if(e.listType==="image-card"){const{value:_}=o;if(!_)return;_.click()}}const z=()=>_n(this,void 0,void 0,function*(){const{listType:w}=e;w!=="image"&&w!=="image-card"||n.shouldUseThumbnailUrlRef.value(e.file)&&(r.value=yield n.getFileThumbnailUrlResolver(e.file))});return Me(()=>{z()}),{mergedTheme:n.mergedThemeRef,progressStatus:i,buttonType:l,showProgress:d,disabled:n.mergedDisabledRef,showCancelButton:c,showRemoveButton:u,showDownloadButton:a,showRetryButton:s,showPreviewButton:x,mergedThumbnailUrl:f,shouldUseThumbnailUrl:n.shouldUseThumbnailUrlRef,renderIcon:n.renderIconRef,imageRef:o,handleRemoveOrCancelClick:p,handleDownloadClick:y,handleRetryClick:h,handlePreviewClick:B}},render(){const{clsPrefix:e,mergedTheme:n,listType:o,file:r,renderIcon:i}=this;let l;const d=o==="image";d||o==="image-card"?l=!this.shouldUseThumbnailUrl(r)||!this.mergedThumbnailUrl?t("span",{class:`${e}-upload-file-info__thumbnail`},i?i(r):Mt(r)?t(Z,{clsPrefix:e},{default:()=>yn}):t(Z,{clsPrefix:e},{default:()=>Cn})):t("a",{rel:"noopener noreferer",target:"_blank",href:r.url||void 0,class:`${e}-upload-file-info__thumbnail`,onClick:this.handlePreviewClick},o==="image-card"?t(Ko,{src:this.mergedThumbnailUrl||void 0,previewSrc:r.url||void 0,alt:r.name,ref:"imageRef"}):t("img",{src:this.mergedThumbnailUrl||void 0,alt:r.name})):l=t("span",{class:`${e}-upload-file-info__thumbnail`},i?i(r):t(Z,{clsPrefix:e},{default:()=>t(Lo,null)}));const u=t(xn,{show:this.showProgress,percentage:r.percentage||0,status:this.progressStatus}),a=o==="text"||o==="image";return t("div",{class:[`${e}-upload-file`,`${e}-upload-file--${this.progressStatus}-status`,r.url&&r.status!=="error"&&o!=="image-card"&&`${e}-upload-file--with-url`,`${e}-upload-file--${o}-type`]},t("div",{class:`${e}-upload-file-info`},l,t("div",{class:`${e}-upload-file-info__name`},a&&(r.url&&r.status!=="error"?t("a",{rel:"noopener noreferer",target:"_blank",href:r.url||void 0,onClick:this.handlePreviewClick},r.name):t("span",{onClick:this.handlePreviewClick},r.name)),d&&u),t("div",{class:[`${e}-upload-file-info__action`,`${e}-upload-file-info__action--${o}-type`]},this.showPreviewButton?t(pe,{key:"preview",quaternary:!0,type:this.buttonType,onClick:this.handlePreviewClick,theme:n.peers.Button,themeOverrides:n.peerOverrides.Button,builtinThemeOverrides:_e},{icon:()=>t(Z,{clsPrefix:e},{default:()=>t(Tr,null)})}):null,(this.showRemoveButton||this.showCancelButton)&&!this.disabled&&t(pe,{key:"cancelOrTrash",theme:n.peers.Button,themeOverrides:n.peerOverrides.Button,quaternary:!0,builtinThemeOverrides:_e,type:this.buttonType,onClick:this.handleRemoveOrCancelClick},{icon:()=>t(lr,null,{default:()=>this.showRemoveButton?t(Z,{clsPrefix:e,key:"trash"},{default:()=>t(To,null)}):t(Z,{clsPrefix:e,key:"cancel"},{default:()=>t(Do,null)})})}),this.showRetryButton&&!this.disabled&&t(pe,{key:"retry",quaternary:!0,type:this.buttonType,onClick:this.handleRetryClick,theme:n.peers.Button,themeOverrides:n.peerOverrides.Button,builtinThemeOverrides:_e},{icon:()=>t(Z,{clsPrefix:e},{default:()=>t(zo,null)})}),this.showDownloadButton?t(pe,{key:"download",quaternary:!0,type:this.buttonType,onClick:this.handleDownloadClick,theme:n.peers.Button,themeOverrides:n.peerOverrides.Button,builtinThemeOverrides:_e},{icon:()=>t(Z,{clsPrefix:e},{default:()=>t(Oo,null)})}):null)),!d&&u)}}),kn=X({name:"UploadFileList",setup(e,{slots:n}){const o=ue(me,null);o||Pe("upload-file-list","`n-upload-file-list` must be placed inside `n-upload`.");const{abstractRef:r,mergedClsPrefixRef:i,listTypeRef:l,mergedFileListRef:d,fileListStyleRef:c,cssVarsRef:u,themeClassRef:a,maxReachedRef:s,showTriggerRef:f,imageGroupPropsRef:x}=o,h=L(()=>l.value==="image-card"),p=()=>d.value.map(R=>t(Rn,{clsPrefix:i.value,key:R.id,file:R,listType:l.value})),y=()=>h.value?t(Go,Object.assign({},x.value),{default:p}):t(pt,{group:!0},{default:p});return()=>{const{value:R}=i,{value:I}=r;return t("div",{class:[`${R}-upload-file-list`,h.value&&`${R}-upload-file-list--grid`,I?a==null?void 0:a.value:void 0],style:[I&&u?u.value:"",c.value]},y(),f.value&&!s.value&&h.value&&t(At,null,n))}}}),Sn=j([m("upload","width: 100%;",[O("dragger-inside",[m("upload-trigger",`
 display: block;
 `)]),O("drag-over",[m("upload-dragger",`
 border: var(--n-dragger-border-hover);
 `)])]),m("upload-dragger",`
 cursor: pointer;
 box-sizing: border-box;
 width: 100%;
 text-align: center;
 border-radius: var(--n-border-radius);
 padding: 24px;
 opacity: 1;
 transition:
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-dragger-color);
 border: var(--n-dragger-border);
 `,[j("&:hover",`
 border: var(--n-dragger-border-hover);
 `),O("disabled",`
 cursor: not-allowed;
 `)]),m("upload-trigger",`
 display: inline-block;
 box-sizing: border-box;
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `,[j("+",[m("upload-file-list","margin-top: 8px;")]),O("disabled",`
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `),O("image-card",`
 width: 96px;
 height: 96px;
 `,[m("base-icon",`
 font-size: 24px;
 `),m("upload-dragger",`
 padding: 0;
 height: 100%;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `)])]),m("upload-file-list",`
 line-height: var(--n-line-height);
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `,[j("a, img","outline: none;"),O("disabled",`
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `,[m("upload-file","cursor: not-allowed;")]),O("grid",`
 display: grid;
 grid-template-columns: repeat(auto-fill, 96px);
 grid-gap: 8px;
 margin-top: 0;
 `),m("upload-file",`
 display: block;
 box-sizing: border-box;
 cursor: default;
 padding: 0px 12px 0 6px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `,[Ge(),m("progress",[Ge({foldPadding:!0})]),j("&:hover",`
 background-color: var(--n-item-color-hover);
 `,[m("upload-file-info",[oe("action",`
 opacity: 1;
 `)])]),O("image-type",`
 border-radius: var(--n-border-radius);
 text-decoration: underline;
 text-decoration-color: #0000;
 `,[m("upload-file-info",`
 padding-top: 0px;
 padding-bottom: 0px;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 6px 0;
 `,[m("progress",`
 padding: 2px 0;
 margin-bottom: 0;
 `),oe("name",`
 padding: 0 8px;
 `),oe("thumbnail",`
 width: 32px;
 height: 32px;
 font-size: 28px;
 display: flex;
 justify-content: center;
 align-items: center;
 `,[j("img",`
 width: 100%;
 `)])])]),O("text-type",[m("progress",`
 box-sizing: border-box;
 padding-bottom: 6px;
 margin-bottom: 6px;
 `)]),O("image-card-type",`
 position: relative;
 width: 96px;
 height: 96px;
 border: var(--n-item-border-image-card);
 border-radius: var(--n-border-radius);
 padding: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 overflow: hidden;
 `,[m("progress",`
 position: absolute;
 left: 8px;
 bottom: 8px;
 right: 8px;
 width: unset;
 `),m("upload-file-info",`
 padding: 0;
 width: 100%;
 height: 100%;
 `,[oe("thumbnail",`
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 font-size: 36px;
 `,[j("img",`
 width: 100%;
 `)])]),j("&::before",`
 position: absolute;
 z-index: 1;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 opacity: 0;
 transition: opacity .2s var(--n-bezier);
 content: "";
 `),j("&:hover",[j("&::before","opacity: 1;"),m("upload-file-info",[oe("thumbnail","opacity: .12;")])])]),O("error-status",[j("&:hover",`
 background-color: var(--n-item-color-hover-error);
 `),m("upload-file-info",[oe("name","color: var(--n-item-text-color-error);"),oe("thumbnail","color: var(--n-item-text-color-error);")]),O("image-card-type",`
 border: var(--n-item-border-image-card-error);
 `)]),O("with-url",`
 cursor: pointer;
 `,[m("upload-file-info",[oe("name",`
 color: var(--n-item-text-color-success);
 text-decoration-color: var(--n-item-text-color-success);
 `,[j("a",`
 text-decoration: underline;
 `)])])]),m("upload-file-info",`
 position: relative;
 padding-top: 6px;
 padding-bottom: 6px;
 display: flex;
 flex-wrap: nowrap;
 `,[oe("thumbnail",`
 font-size: 18px;
 opacity: 1;
 transition: opacity .2s var(--n-bezier);
 color: var(--n-item-icon-color);
 `,[m("base-icon",`
 margin-right: 2px;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `)]),oe("action",`
 padding-top: inherit;
 padding-bottom: inherit;
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: 80px;
 display: flex;
 align-items: center;
 transition: opacity .2s var(--n-bezier);
 justify-content: flex-end;
 opacity: 0;
 `,[m("button",[j("&:not(:last-child)",{marginRight:"4px"}),m("base-icon",[j("svg",[ur()])])]),O("image-type",`
 position: relative;
 max-width: 80px;
 width: auto;
 `),O("image-card-type",`
 z-index: 2;
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 right: 0;
 bottom: 0;
 top: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 `)]),oe("name",`
 color: var(--n-item-text-color);
 flex: 1;
 display: flex;
 justify-content: center;
 text-overflow: ellipsis;
 overflow: hidden;
 flex-direction: column;
 text-decoration-color: #0000;
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier); 
 `,[j("a",`
 color: inherit;
 text-decoration: underline;
 `)])])])]),m("upload-file-input",`
 display: block;
 width: 0;
 height: 0;
 opacity: 0;
 `)]);var it=globalThis&&globalThis.__awaiter||function(e,n,o,r){function i(l){return l instanceof o?l:new o(function(d){d(l)})}return new(o||(o=Promise))(function(l,d){function c(s){try{a(r.next(s))}catch(f){d(f)}}function u(s){try{a(r.throw(s))}catch(f){d(f)}}function a(s){s.done?l(s.value):i(s.value).then(c,u)}a((r=r.apply(e,n||[])).next())})};function Pn(e,n,o){const{doChange:r,xhrMap:i}=e;let l=0;function d(u){var a;let s=Object.assign({},n,{status:"error",percentage:l});i.delete(n.id),s=be(((a=e.onError)===null||a===void 0?void 0:a.call(e,{file:s,event:u}))||s),r(s,u)}function c(u){var a;if(e.isErrorState){if(e.isErrorState(o)){d(u);return}}else if(o.status<200||o.status>=300){d(u);return}let s=Object.assign({},n,{status:"finished",percentage:l});i.delete(n.id),s=be(((a=e.onFinish)===null||a===void 0?void 0:a.call(e,{file:s,event:u}))||s),r(s,u)}return{handleXHRLoad:c,handleXHRError:d,handleXHRAbort(u){const a=Object.assign({},n,{status:"removed",file:null,percentage:l});i.delete(n.id),r(a,u)},handleXHRProgress(u){const a=Object.assign({},n,{status:"uploading"});if(u.lengthComputable){const s=Math.ceil(u.loaded/u.total*100);a.percentage=s,l=s}r(a,u)}}}function Bn(e){const{inst:n,file:o,data:r,headers:i,withCredentials:l,action:d,customRequest:c}=e,{doChange:u}=e.inst;let a=0;c({file:o,data:r,headers:i,withCredentials:l,action:d,onProgress(s){const f=Object.assign({},o,{status:"uploading"}),x=s.percent;f.percentage=x,a=x,u(f)},onFinish(){var s;let f=Object.assign({},o,{status:"finished",percentage:a});f=be(((s=n.onFinish)===null||s===void 0?void 0:s.call(n,{file:f}))||f),u(f)},onError(){var s;let f=Object.assign({},o,{status:"error",percentage:a});f=be(((s=n.onError)===null||s===void 0?void 0:s.call(n,{file:f}))||f),u(f)}})}function $n(e,n,o){const r=Pn(e,n,o);o.onabort=r.handleXHRAbort,o.onerror=r.handleXHRError,o.onload=r.handleXHRLoad,o.upload&&(o.upload.onprogress=r.handleXHRProgress)}function Ut(e,n){return typeof e=="function"?e({file:n}):e||{}}function Ln(e,n,o){const r=Ut(n,o);!r||Object.keys(r).forEach(i=>{e.setRequestHeader(i,r[i])})}function Tn(e,n,o){const r=Ut(n,o);!r||Object.keys(r).forEach(i=>{e.append(i,r[i])})}function On(e,n,o,{method:r,action:i,withCredentials:l,responseType:d,headers:c,data:u}){const a=new XMLHttpRequest;a.responseType=d,e.xhrMap.set(o.id,a),a.withCredentials=l;const s=new FormData;if(Tn(s,u,o),s.append(n,o.file),$n(e,o,a),i!==void 0){a.open(r.toUpperCase(),i),Ln(a,c,o),a.send(s);const f=Object.assign({},o,{status:"uploading"});e.doChange(f)}}const Dn=Object.assign(Object.assign({},ne.props),{name:{type:String,default:"file"},accept:String,action:String,customRequest:Function,directory:Boolean,directoryDnd:{type:Boolean,default:void 0},method:{type:String,default:"POST"},multiple:Boolean,showFileList:{type:Boolean,default:!0},data:[Object,Function],headers:[Object,Function],withCredentials:Boolean,responseType:{type:String,default:""},disabled:{type:Boolean,default:void 0},onChange:Function,onRemove:Function,onFinish:Function,onError:Function,onBeforeUpload:Function,isErrorState:Function,onDownload:Function,defaultUpload:{type:Boolean,default:!0},fileList:Array,"onUpdate:fileList":[Function,Array],onUpdateFileList:[Function,Array],fileListStyle:[String,Object],defaultFileList:{type:Array,default:()=>[]},showCancelButton:{type:Boolean,default:!0},showRemoveButton:{type:Boolean,default:!0},showDownloadButton:Boolean,showRetryButton:{type:Boolean,default:!0},showPreviewButton:{type:Boolean,default:!0},listType:{type:String,default:"text"},onPreview:Function,shouldUseThumbnailUrl:{type:Function,default:e=>gn?Mt(e):!1},createThumbnailUrl:Function,abstract:Boolean,max:Number,showTrigger:{type:Boolean,default:!0},imageGroupProps:Object,inputProps:Object,triggerStyle:[String,Object],renderIcon:Object}),zn=X({name:"Upload",props:Dn,setup(e){e.abstract&&e.listType==="image-card"&&Pe("upload","when the list-type is image-card, abstract is not supported.");const{mergedClsPrefixRef:n,inlineThemeDisabled:o}=de(e),r=ne("Upload","-upload",Sn,yr,e,n),i=dr(e),l=L(()=>{const{max:g}=e;return g!==void 0?h.value.length>=g:!1}),d=V(e.defaultFileList),c=W(e,"fileList"),u=V(null),a={value:!1},s=V(!1),f=new Map,x=wr(c,d),h=L(()=>x.value.map(be));function p(){var g;(g=u.value)===null||g===void 0||g.click()}function y(g){const P=g.target;D(P.files?Array.from(P.files).map(E=>({file:E,entry:null,source:"input"})):null,g),P.value=""}function R(g){const{"onUpdate:fileList":P,onUpdateFileList:E}=e;P&&Ye(P,g),E&&Ye(E,g),d.value=g}const I=L(()=>e.multiple||e.directory);function D(g,P){if(!g||g.length===0)return;const{onBeforeUpload:E}=e;g=I.value?g:[g[0]];const{max:q,accept:T}=e;g=g.filter(({file:U,source:H})=>H==="dnd"&&(T==null?void 0:T.trim())?bn(U.name,U.type,T):!0),q&&(g=g.slice(0,q-h.value.length));const N=je();Promise.all(g.map(({file:U,entry:H})=>it(this,void 0,void 0,function*(){var J;const Q={id:je(),batchId:N,name:U.name,status:"pending",percentage:0,file:U,url:null,type:U.type,thumbnailUrl:null,fullPath:(J=H==null?void 0:H.fullPath)!==null&&J!==void 0?J:`/${U.webkitRelativePath||U.name}`};return!E||(yield E({file:Q,fileList:h.value}))!==!1?Q:null}))).then(U=>it(this,void 0,void 0,function*(){let H=Promise.resolve();return U.forEach(J=>{H=H.then(fr).then(()=>{J&&z(J,P,{append:!0})})}),yield H})).then(()=>{e.defaultUpload&&B()})}function B(g){const{method:P,action:E,withCredentials:q,headers:T,data:N,name:U}=e,H=g!==void 0?h.value.filter(Q=>Q.id===g):h.value,J=g!==void 0;H.forEach(Q=>{const{status:ce}=Q;(ce==="pending"||ce==="error"&&J)&&(e.customRequest?Bn({inst:{doChange:z,xhrMap:f,onFinish:e.onFinish,onError:e.onError},file:Q,action:E,withCredentials:q,headers:T,data:N,customRequest:e.customRequest}):On({doChange:z,xhrMap:f,onFinish:e.onFinish,onError:e.onError,isErrorState:e.isErrorState},U,Q,{method:P,action:E,withCredentials:q,responseType:e.responseType,headers:T,data:N}))})}const z=(g,P,E={append:!1,remove:!1})=>{const{append:q,remove:T}=E,N=Array.from(h.value),U=N.findIndex(H=>H.id===g.id);if(q||T||~U){q?N.push(g):T?N.splice(U,1):N.splice(U,1,g);const{onChange:H}=e;H&&H({file:g,fileList:N,event:P}),R(N)}};function w(g){var P;if(g.thumbnailUrl)return g.thumbnailUrl;const{createThumbnailUrl:E}=e;return E?(P=E(g.file,g))!==null&&P!==void 0?P:g.url||"":g.url?g.url:g.file?hn(g.file):""}const _=L(()=>{const{common:{cubicBezierEaseInOut:g},self:{draggerColor:P,draggerBorder:E,draggerBorderHover:q,itemColorHover:T,itemColorHoverError:N,itemTextColorError:U,itemTextColorSuccess:H,itemTextColor:J,itemIconColor:Q,itemDisabledOpacity:ce,lineHeight:Be,borderRadius:xe,fontSize:$e,itemBorderImageCardError:Le,itemBorderImageCard:K}}=r.value;return{"--n-bezier":g,"--n-border-radius":xe,"--n-dragger-border":E,"--n-dragger-border-hover":q,"--n-dragger-color":P,"--n-font-size":$e,"--n-item-color-hover":T,"--n-item-color-hover-error":N,"--n-item-disabled-opacity":ce,"--n-item-icon-color":Q,"--n-item-text-color":J,"--n-item-text-color-error":U,"--n-item-text-color-success":H,"--n-line-height":Be,"--n-item-border-image-card-error":Le,"--n-item-border-image-card":K}}),$=o?we("upload",void 0,_,e):void 0;Ne(me,{mergedClsPrefixRef:n,mergedThemeRef:r,showCancelButtonRef:W(e,"showCancelButton"),showDownloadButtonRef:W(e,"showDownloadButton"),showRemoveButtonRef:W(e,"showRemoveButton"),showRetryButtonRef:W(e,"showRetryButton"),onRemoveRef:W(e,"onRemove"),onDownloadRef:W(e,"onDownload"),mergedFileListRef:h,triggerStyleRef:W(e,"triggerStyle"),shouldUseThumbnailUrlRef:W(e,"shouldUseThumbnailUrl"),renderIconRef:W(e,"renderIcon"),xhrMap:f,submit:B,doChange:z,showPreviewButtonRef:W(e,"showPreviewButton"),onPreviewRef:W(e,"onPreview"),getFileThumbnailUrlResolver:w,listTypeRef:W(e,"listType"),dragOverRef:s,openOpenFileDialog:p,draggerInsideRef:a,handleFileAddition:D,mergedDisabledRef:i.mergedDisabledRef,maxReachedRef:l,fileListStyleRef:W(e,"fileListStyle"),abstractRef:W(e,"abstract"),acceptRef:W(e,"accept"),cssVarsRef:o?void 0:_,themeClassRef:$==null?void 0:$.themeClass,onRender:$==null?void 0:$.onRender,showTriggerRef:W(e,"showTrigger"),imageGroupPropsRef:W(e,"imageGroupProps"),mergedDirectoryDndRef:L(()=>{var g;return(g=e.directoryDnd)!==null&&g!==void 0?g:e.directory})});const F={clear:()=>{d.value=[]},submit:B,openOpenFileDialog:p};return Object.assign({mergedClsPrefix:n,draggerInsideRef:a,inputElRef:u,mergedTheme:r,dragOver:s,mergedMultiple:I,cssVars:o?void 0:_,themeClass:$==null?void 0:$.themeClass,onRender:$==null?void 0:$.onRender,handleFileInputChange:y},F)},render(){var e,n;const{draggerInsideRef:o,mergedClsPrefix:r,$slots:i,directory:l,onRender:d}=this;if(i.default&&!this.abstract){const u=i.default()[0];!((e=u==null?void 0:u.type)===null||e===void 0)&&e[Ft]&&(o.value=!0)}const c=t("input",Object.assign({},this.inputProps,{ref:"inputElRef",type:"file",class:`${r}-upload-file-input`,accept:this.accept,multiple:this.mergedMultiple,onChange:this.handleFileInputChange,webkitdirectory:l||void 0,directory:l||void 0}));return this.abstract?t(Re,null,(n=i.default)===null||n===void 0?void 0:n.call(i),t(cr,{to:"body"},c)):(d==null||d(),t("div",{class:[`${r}-upload`,o.value&&`${r}-upload--dragger-inside`,this.dragOver&&`${r}-upload--drag-over`,this.themeClass],style:this.cssVars},c,this.showTrigger&&this.listType!=="image-card"&&t(At,null,i),this.showFileList&&t(kn,null,i)))}}),Fn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},In=te("path",{d:"M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),En=te("rect",{x:"48",y:"64",width:"416",height:"80",rx:"28",ry:"28",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),jn=te("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M320 304l-64 64l-64-64"},null,-1),Mn=te("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 345.89V224"},null,-1),An=[In,En,jn,Mn],Un=X({name:"ArchiveOutline",render:function(n,o){return ie(),se("svg",Fn,An)}}),Nn={class:"project-form"},Hn={style:{"margin-bottom":"12px"}},Wn=G(" \u70B9\u51FB\u6216\u8005\u62D6\u52A8\u6587\u4EF6\u5230\u8BE5\u533A\u57DF "),Vn=G(" \u8BF7\u4E0A\u4F20PNG\u3001JPG\u683C\u5F0F\u7684\u56FE\u7247, \u53EA\u652F\u6301\u4E0A\u4F201\u4E2A\u56FE\u7247\u3002 "),qn={class:"dialog-footer"},Zn=G("\u53D6\u6D88"),Xn=G("\u4FDD\u5B58"),Gn=X({__name:"ProjectForm",props:{pid:Number},emits:["cancel"],setup(e,{emit:n}){const o=e,r=at(),i=V(null),l=V(null),d=V({name:"",address:"",case_dir:"",is_delete:!1,id:"",cover_name:"",path_name:""}),c={name:{required:!0,trigger:["input"],message:"\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0"},address:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165git\u5730\u5740"},case_dir:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u7528\u4F8B\u76EE\u5F55"}},u=V([]),a=({file:h,event:p})=>{const y=JSON.parse((p==null?void 0:p.target).response);return console.log(u.value),y.success?(d.value.cover_name=h.name,d.value.path_name=y.result.name,r.success("\u4E0A\u4F20\u6210\u529F")):(u.value[0].id="",u.value[0].status="error",r.error(y.error.message)),h},s=async()=>{const h=o.pid+"",p=await ve.getProject(h);p.success===!0?(d.value=p.result,d.value.path_name!=""&&u.value.push({id:d.value.path_name,name:d.value.cover_name,status:"finished"})):r.error(p.error.message)},f=()=>{n("cancel",{})},x=()=>{var h;(h=i.value)==null||h.validate(p=>{if(p)return!1;if(o.pid===0)ve.createProject(d.value).then(y=>{y.success===!0?(r.success("\u521B\u5EFA\u6210\u529F\uFF01"),f()):r.error("\u521B\u5EFA\u5931\u8D25\uFF01")});else{const y=o.pid+"";ve.updateProject(y,d.value).then(R=>{R.success===!0?(r.success("\u66F4\u65B0\u6210\u529F\uFF01"),f()):r.error("\u66F4\u65B0\u5931\u8D25\uFF01")})}})};return ke(()=>{o.pid===0||s()}),(h,p)=>{const y=Or,R=Vt,I=mt,D=fn,B=un,z=It,w=zn,_=pe,$=bt,F=qt;return ie(),se("div",Nn,[S(F,{ref_key:"formRef",ref:i,model:d.value,rules:c,"label-placement":"left","label-width":"auto"},{default:k(()=>[S(R,{label:"\u540D\u79F0",path:"name"},{default:k(()=>[S(y,{value:d.value.name,"onUpdate:value":p[0]||(p[0]=g=>d.value.name=g),placeholder:"\u9879\u76EE\u540D\u79F0"},null,8,["value"])]),_:1}),S(R,{label:"Git\u5730\u5740",path:"address"},{default:k(()=>[S(y,{value:d.value.address,"onUpdate:value":p[1]||(p[1]=g=>d.value.address=g),placeholder:"\u9879\u76EE\u7684github/gitee/gitlab...\u5730\u5740"},null,8,["value"])]),_:1}),S(R,{label:"\u7528\u4F8B\u76EE\u5F55",path:"case_dir"},{default:k(()=>[S(y,{value:d.value.case_dir,"onUpdate:value":p[2]||(p[2]=g=>d.value.case_dir=g),placeholder:"\u7528\u4F8B\u76EE\u5F55"},null,8,["value"])]),_:1}),S(R,{label:"\u9879\u76EELogo"},{default:k(()=>[S(w,{ref_key:"uploadRef",ref:l,"file-list":u.value,"onUpdate:file-list":p[3]||(p[3]=g=>u.value=g),multiple:"","directory-dnd":"",action:Se(lt)+"/api/project/upload",max:1,onFinish:a,"show-retry-button":!1},{default:k(()=>[S(z,null,{default:k(()=>[te("div",Hn,[S(I,{size:"48",depth:3},{default:k(()=>[S(Se(Un))]),_:1})]),S(D,{style:{"font-size":"16px"}},{default:k(()=>[Wn]),_:1}),S(B,{depth:"3",style:{margin:"8px 0 0 0"}},{default:k(()=>[Vn]),_:1})]),_:1})]),_:1},8,["file-list","action"])]),_:1}),te("div",qn,[S($,null,{default:k(()=>[S(_,{"cy-data":"cancel-project",onClick:p[4]||(p[4]=g=>f())},{default:k(()=>[Zn]),_:1}),S(_,{"cy-data":"save-project",type:"primary",onClick:p[5]||(p[5]=g=>x())},{default:k(()=>[Xn]),_:1})]),_:1})])]),_:1},8,["model"])])}}});const Yn=Sr(Gn,[["__scopeId","data-v-44670c78"]]),Kn={class:"body"},Jn={class:"pageheader"},Qn=te("span",null,"\u9879\u76EE\u7BA1\u7406",-1),ei=G("\u9996\u9875"),ti=G("\u914D\u7F6E\u7BA1\u7406"),ri=G("\u9879\u76EE\u7BA1\u7406"),oi={class:"filter-line"},ni=G("\u521B\u5EFA"),ii={class:"card-group"},ai={key:0},li={key:1,style:{height:"100%",width:"100%"}},si=["src"],ui=G(" \u6D4B\u8BD5\u76EE\u5F55 "),di=G(" \u6587\u4EF6\u6570\u91CF "),ci=G(" \u72B6\u6001 "),fi=G("\u672A\u514B\u9686"),hi=G("\u5DF2\u514B\u9686"),Pi=X({__name:"Project",setup(e){const n=at(),o=Zt(),r=hr({loading:!1,showDailog:!1,projectId:0,projectData:[],url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}),i=async()=>{r.loading=!0;const x=await ve.getProjects();x.success===!0?r.projectData=x.result:n.error(x.error.message),r.loading=!1},l=()=>{r.projectId=0,r.showDailog=!0},d=x=>{r.projectId=x,r.showDailog=!0},c=()=>{r.showDailog=!1,r.projectId=0,i()},u=x=>{o.warning({title:"\u8B66\u544A",content:"\u4F60\u786E\u5B9A\u5220\u9664\u9879\u76EE\u5417\uFF1F",positiveText:"\u786E\u5B9A",negativeText:"\u53D6\u6D88",onPositiveClick:()=>{ve.deleteProject(x.toString()).then(h=>{h.success===!0?(n.success("\u5220\u9664\u6210\u529F\uFF01"),i()):n.error("\u5220\u9664\u5931\u8D25\uFF01")})},onNegativeClick:()=>{console.log("\u53D6\u6D88\u5220\u9664")}})},a=async x=>{(await ve.syncCode(x.toString())).success===!0?(n.success("\u514B\u9686&\u62C9\u53D6\u6210\u529F\uFF01"),i()):n.error("\u514B\u9686&\u62C9\u53D6\u5931\u8D25")},s=[{label:"\u514B\u9686&\u62C9\u53D6",key:"clone"},{label:"\u7F16\u8F91",key:"edit"},{label:"\u5220\u9664",key:"delete"}],f=(x,h)=>{switch(x){case"clone":a(h);break;case"edit":d(h);break;case"delete":u(h);break}};return ke(()=>{i()}),(x,h)=>{const p=Dr,y=zr,R=bt,I=pe,D=mt,B=Pr,z=$r,w=Fr,_=Lr,$=Ir,F=pr,g=vr;return ie(),se("div",Kn,[te("div",Jn,[S(R,{justify:"space-between",class:"breadcrumb-navigation"},{default:k(()=>[Qn,S(y,{separator:">"},{default:k(()=>[S(p,null,{default:k(()=>[ei]),_:1}),S(p,null,{default:k(()=>[ti]),_:1}),S(p,null,{default:k(()=>[ri]),_:1})]),_:1})]),_:1})]),S(F,{class:"main-card"},{default:k(()=>[te("div",oi,[S(R,null,{default:k(()=>[S(I,{"cy-data":"create-project",type:"primary",onClick:h[0]||(h[0]=P=>l())},{default:k(()=>[ni]),_:1})]),_:1})]),te("div",ii,[S(R,null,{default:k(()=>[(ie(!0),se(Re,null,gr(r.projectData,(P,E)=>(ie(),se("div",{key:E},[S(F,{title:P.name,class:"card-style","content-style":"padding: 24px; height:50%;",hoverable:""},{"header-extra":k(()=>[S(B,{trigger:"hover",options:s,onSelect:q=>f(q,P.id)},{default:k(()=>[S(D,null,{default:k(()=>[S(Se(Cr))]),_:1})]),_:2},1032,["onSelect"])]),action:k(()=>[te("div",null,De(P.address),1)]),default:k(()=>[P.path_name==""?(ie(),se("div",ai,[S(z,{description:"no cover"})])):(ie(),se("div",li,[te("img",{src:Se(lt)+"/static/images/"+P.path_name,style:{height:"100%",width:"100%"}},null,8,si)])),S($,{"label-placement":"left",column:"1"},{default:k(()=>[S(w,null,{label:k(()=>[ui]),default:k(()=>[G(" "+De(P.case_dir),1)]),_:2},1024),S(w,null,{label:k(()=>[di]),default:k(()=>[G(" "+De(P.test_num),1)]),_:2},1024),S(w,null,{label:k(()=>[ci]),default:k(()=>[P.is_clone==0?(ie(),Ke(_,{key:0,type:"info",size:"small"},{default:k(()=>[fi]),_:1})):(ie(),Ke(_,{key:1,type:"success",size:"small"},{default:k(()=>[hi]),_:1}))]),_:2},1024)]),_:2},1024)]),_:2},1032,["title"])]))),128))]),_:1})])]),_:1}),S(g,{show:r.showDailog,"onUpdate:show":h[1]||(h[1]=P=>r.showDailog=P)},{default:k(()=>[S(F,{style:{width:"600px"},title:r.projectId==0?"\u65B0\u5EFA\u9879\u76EE":"\u7F16\u8F91\u9879\u76EE",bordered:!1,size:"huge",role:"dialog","aria-modal":"true"},{default:k(()=>[S(Yn,{pid:r.projectId,onCancel:c},null,8,["pid"])]),_:1},8,["title"])]),_:1},8,["show"])])}}});export{Pi as default};
