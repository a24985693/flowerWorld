"use strict";(self["webpackChunkfinal_hw"]=self["webpackChunkfinal_hw"]||[]).push([[126],{9040:function(t,a,e){e(4114);var s=e(4445);a.A=(0,s.nY)("toast",{state:()=>({messages:[]}),actions:{pushMessage(t){const{style:a,title:e,content:s}=t;this.messages.push({style:a,title:e,content:s})},clearMessage(){this.messages=[]}}})},4126:function(t,a,e){e.r(a),e.d(a,{default:function(){return W}});var s=e(641);const n={class:"container",style:{"margin-top":"80px"}};function o(t,a,e,o,l,c){const r=(0,s.g2)("AdminNavbar"),i=(0,s.g2)("ToastMessages"),u=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(r),(0,s.Lk)("div",n,[(0,s.bF)(i),(0,s.bF)(u)])],64)}e(4114);function l(t){return{all:t=t||new Map,on:function(a,e){var s=t.get(a);s?s.push(e):t.set(a,[e])},off:function(a,e){var s=t.get(a);s&&(e?s.splice(s.indexOf(e)>>>0,1):t.set(a,[]))},emit:function(a,e){var s=t.get(a);s&&s.slice().map((function(t){t(e)})),(s=t.get("*"))&&s.slice().map((function(t){t(a,e)}))}}}const c=l();var r=c,i=e(3751);const u={class:"navbar fixed-top navbar-expand-md navbar-light bg-light"},d={class:"container"},v=(0,s.Lk)("button",{class:"navbar-toggler border-none",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,s.Lk)("span",{class:"navbar-toggler-icon"})],-1),g={class:"collapse navbar-collapse",id:"navbarNav"},h={class:"navbar-nav ms-auto"},p={class:"nav-item"},b={class:"nav-item"},m={class:"nav-item"},k={class:"nav-item"},f={class:"nav-item"};function x(t,a,e,n,o,l){const c=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("nav",u,[(0,s.Lk)("div",d,[(0,s.bF)(c,{class:"navbar-brand",to:"/"},{default:(0,s.k6)((()=>[(0,s.eW)("花花世界")])),_:1}),v,(0,s.Lk)("div",g,[(0,s.Lk)("ul",h,[(0,s.Lk)("li",p,[(0,s.bF)(c,{class:"nav-link mx-1",to:"/dashboard/products"},{default:(0,s.k6)((()=>[(0,s.eW)("產品列表")])),_:1})]),(0,s.Lk)("li",b,[(0,s.bF)(c,{class:"nav-link mx-1",to:"/dashboard/orders"},{default:(0,s.k6)((()=>[(0,s.eW)("訂單")])),_:1})]),(0,s.Lk)("li",m,[(0,s.bF)(c,{class:"nav-link mx-1",to:"/dashboard/coupon"},{default:(0,s.k6)((()=>[(0,s.eW)("優惠券")])),_:1})]),(0,s.Lk)("li",k,[(0,s.bF)(c,{class:"nav-link mx-1",to:"/dashboard/articles"},{default:(0,s.k6)((()=>[(0,s.eW)("文章")])),_:1})]),(0,s.Lk)("li",f,[(0,s.Lk)("a",{class:"nav-link mx-1",type:"button",onClick:a[0]||(a[0]=(0,i.D$)(((...t)=>l.logout&&l.logout(...t)),["prevent"])),onKeydown:a[1]||(a[1]=(0,i.D$)(((...t)=>l.logout&&l.logout(...t)),["prevent"]))}," 登出 ",32)])])])])])}var L=e(8647),$=e.n(L),A={methods:{logout(){const t="https://vue3-course-api.hexschool.io/logout";this.$http.post(t).then((t=>{t.data.success&&this.$router.push("/login")}))}},created(){},mounted(){const t=document.querySelectorAll(".nav-item"),a=document.getElementById("navbarNav"),e=new($())(a,{toggle:!1});t.forEach((t=>{t.addEventListener("click",(()=>{e.toggle()}))}))}},F=e(6262);const w=(0,F.A)(A,[["render",x]]);var y=w,M=e(2476),_=e(9040),N=e(4445),C={components:{AdminNavbar:y,ToastMessages:M.A},provide(){return{emitter:r}},methods:{...(0,N.i0)(_.A,["clearMessage"])},created(){this.clearMessage();const t=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t;const a="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(a).then((t=>{t.data.success||this.$router.push("/login")}))}};const E=(0,F.A)(C,[["render",o]]);var W=E}}]);
//# sourceMappingURL=126.9b20363d.js.map