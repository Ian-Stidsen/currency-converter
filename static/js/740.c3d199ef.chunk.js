"use strict";(self.webpackChunkcurrency_converter=self.webpackChunkcurrency_converter||[]).push([[740],{950:function(e,r,n){n.d(r,{_:function(){return t}});var c=JSON.parse('{"a":"W98qXl74GuqqwyOfcf7AZVt8YsglorlK"}');function t(){var e=new Headers;return e.append("apikey",c.a),fetch("https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP",{method:"GET",redirect:"follow",headers:e}).then((function(e){return e.json()})).then((function(e){return e.quotes}))}},740:function(e,r,n){n.r(r),n.d(r,{Rates:function(){return f}});var c=n(413),t=n(165),u=n(982),a=n(861),l=n(885),s=n(791),o=n(270),i=n(950),d=n(184);function f(){var e=(0,s.useRef)("USD"),r=(0,s.useState)([{currencyCode:"1 USD",currencyValue:"1 USD"}]),n=(0,l.Z)(r,2),f=n[0],h=n[1],y=(0,s.useState)([{currencyCode:"USD",currencyValue:1}]),p=(0,l.Z)(y,2),v=p[0],m=p[1];(0,s.useEffect)((function(){x()}),[]);var x=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(){var n;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(v.length>1)){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,(0,i._)();case 4:n=r.sent,Object.entries(n).map((function(r){var n=r[0].slice(3,r[0].length),c=1/r[1];return m((function(e){return[].concat((0,u.Z)(e),[{currencyCode:n,currencyValue:c}])})),h((function(r){return[].concat((0,u.Z)(r),[{currencyCode:"1 "+n,currencyValue:c.toFixed(8)+" "+e.current.value}])})),null}));case 6:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.q,{children:(0,d.jsx)("title",{children:"Converter | Rates"})}),(0,d.jsxs)("table",{className:"table",children:[(0,d.jsx)("thead",{className:"tableheader",children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:"tableHead",children:"Compare rate from"}),(0,d.jsx)("th",{className:"tableHead",children:(0,d.jsx)("select",{id:"compareSelect",ref:e,onChange:function(){var r=v.filter((function(r){return r.currencyCode!==e.current.value?null:r}))[0].currencyValue;h((function(n){return n.map((function(n){var t=v.map((function(c){var t=n.currencyCode.split(" ")[1],u=(c.currencyValue/r).toFixed(8);return c.currencyCode!==t?null:c.currencyCode===e.current.value?n.currencyCode:u+" "+e.current.value}));return(0,c.Z)((0,c.Z)({},n),{},{currencyValue:t})}))}))},children:v.map((function(e){var r=e.currencyCode;return(0,d.jsx)("option",{value:r,children:"To "+r},r)}))})})]})}),(0,d.jsx)("tbody",{className:"tableBody",children:f.map((function(e){return(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{className:"tableData",children:e.currencyCode}),(0,d.jsx)("td",{className:"tableData",children:e.currencyValue})]},e.currencyCode)}))})]})]})}}}]);
//# sourceMappingURL=740.c3d199ef.chunk.js.map