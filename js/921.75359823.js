"use strict";(self["webpackChunkfinal_hw"]=self["webpackChunkfinal_hw"]||[]).push([[921],{2921:function(s,e,n){n.r(e),n.d(e,{default:function(){return f}});var t=n(641),a=n(3751);const o={class:"container"},r={class:"col-md-6"},i=(0,t.Lk)("h1",{class:"h3 mb-3"},"請先登入",-1),u={class:"mb-3"},l=(0,t.Lk)("label",{for:"inputEmail",class:"w-100"},"Email address",-1),c={class:"mb-3"},d=(0,t.Lk)("label",{for:"inputPassword",class:"w-100"},"Password",-1),p=(0,t.Lk)("div",{class:"text-end"},[(0,t.Lk)("button",{class:"btn btn-lg btn-primary",type:"submit"},"登入")],-1);function m(s,e,n,m,h,k){return(0,t.uX)(),(0,t.CE)("div",o,[(0,t.Lk)("form",{class:"row justify-content-center",onSubmit:e[2]||(e[2]=(...s)=>k.signIn&&k.signIn(...s))},[(0,t.Lk)("div",r,[i,(0,t.Lk)("div",u,[l,(0,t.bo)((0,t.Lk)("input",{type:"email",id:"inputEmail",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=s=>h.user.username=s)},null,512),[[a.Jo,h.user.username]])]),(0,t.Lk)("div",c,[d,(0,t.bo)((0,t.Lk)("input",{type:"password",id:"inputPassword",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=s=>h.user.password=s)},null,512),[[a.Jo,h.user.password]])]),p])],32)])}n(4114);var h={data(){return{user:{username:"",password:""}}},methods:{signIn(){const s="https://vue3-course-api.hexschool.io/admin/signin";this.$http.post(s,this.user).then((s=>{if(s.data.success){const{token:e,expired:n}=s.data;document.cookie=`hexToken=${e}; expires=${new Date(n)}`,this.$router.push("/dashboard/products")}}))}}},k=n(6262);const b=(0,k.A)(h,[["render",m]]);var f=b}}]);
//# sourceMappingURL=921.75359823.js.map