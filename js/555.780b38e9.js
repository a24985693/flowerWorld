"use strict";(self["webpackChunkfinal_hw"]=self["webpackChunkfinal_hw"]||[]).push([[555],{8555:function(t,e,s){s.r(e),s.d(e,{default:function(){return It}});var o=s(641),l=s(33);const a={class:"text-end"},i={class:"table-responsive"},n={class:"table text-nowrap"},d=(0,o.Lk)("thead",null,[(0,o.Lk)("tr",null,[(0,o.Lk)("th",{width:"120"},"分類"),(0,o.Lk)("th",null,"產品名稱"),(0,o.Lk)("th",{width:"120"},"原價"),(0,o.Lk)("th",{width:"120"},"售價"),(0,o.Lk)("th",{width:"100"},"是否啟用"),(0,o.Lk)("th",{width:"200"},"編輯")])],-1),c={scope:"row"},u={key:0,class:"text-success"},r={key:1,class:"text-muted"},p={class:"btn-group"},m=["onClick"],b=["onClick"];function h(t,e,s,h,k,g){const L=(0,o.g2)("LoadingSpinner"),f=(0,o.g2)("PageNavigation"),v=(0,o.g2)("ProductModal");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.bF)(L,{active:t.isLoading},null,8,["active"]),(0,o.Lk)("div",a,[(0,o.Lk)("button",{type:"button",class:"btn btn-secondary",onClick:e[0]||(e[0]=t=>g.openModal(!0))}," 新增產品 ")]),(0,o.Lk)("div",i,[(0,o.Lk)("table",n,[d,(0,o.Lk)("tbody",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(t.products,(e=>((0,o.uX)(),(0,o.CE)("tr",{key:e.id},[(0,o.Lk)("td",c,(0,l.v_)(e.category),1),(0,o.Lk)("td",null,(0,l.v_)(e.title),1),(0,o.Lk)("td",null,(0,l.v_)(t.$filters.currency(e.origin_price)),1),(0,o.Lk)("td",null,(0,l.v_)(t.$filters.currency(e.price)),1),(0,o.Lk)("td",null,[e.is_enabled?((0,o.uX)(),(0,o.CE)("span",u,"啟用")):((0,o.uX)(),(0,o.CE)("span",r,"不啟用"))]),(0,o.Lk)("td",null,[(0,o.Lk)("div",p,[(0,o.Lk)("button",{class:"btn btn-outline-gray btn-sm",type:"button",onClick:t=>g.openModal(!1,e)},"編輯",8,m),(0,o.Lk)("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:s=>t.comfirmDelProduct(e)},"刪除",8,b)])])])))),128))])])]),(0,o.bF)(f,{pagination:t.pagination,onUpdatePage:t.getProducts},null,8,["pagination","onUpdatePage"]),(0,o.bF)(v,{ref:"productModal"},null,512)],64)}var k=s(3751);const g={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},L={class:"modal-dialog modal-xl",role:"document"},f={class:"modal-content border-0"},v={class:"modal-header bg-dark text-white"},y={class:"modal-title",id:"exampleModalLabel"},w={key:0},U={key:1},P=(0,o.Lk)("button",{type:"button",class:"btn-close text-white","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),x={class:"modal-body"},C={class:"mb-3"},F=(0,o.Lk)("label",{for:"title",class:"form-label"},"標題",-1),M={class:"row gx-2"},S={class:"mb-3 col-md-6"},_=(0,o.Lk)("label",{for:"category",class:"form-label"},"分類",-1),E={class:"mb-3 col-md-6"},X=(0,o.Lk)("label",{for:"price",class:"form-label"},"單位",-1),$={class:"row gx-2"},V={class:"mb-3 col-md-6"},A=(0,o.Lk)("label",{for:"origin_price",class:"form-labe"},"原價",-1),N={class:"mb-3 col-md-6"},J=(0,o.Lk)("label",{for:"price",class:"form-label"},"售價",-1),I=(0,o.Lk)("hr",null,null,-1),j={class:"mb-3"},D=(0,o.Lk)("label",{for:"description",class:"form-label"},"產品描述",-1),Q={class:"mb-3"},B=(0,o.Lk)("label",{for:"content",class:"form-label"},"說明內容",-1),H={class:"mb-5"},K={class:"form-check"},T=(0,o.Lk)("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),W=(0,o.Lk)("hr",null,null,-1),Y={class:"mainImg my-5"},q={class:"mb-5"},z={for:"imageUrl",class:"form-label w-100"},G={class:"mb-3 input-group"},O={type:"text",class:"form-control",id:"imageUrl",placeholder:"請輸入圖片連結",ref:"inputLink"},R=(0,o.Lk)("label",{for:"customFile",class:"form-label w-100"},"或上傳主圖片",-1),Z={key:0,class:"fas fa-spinner fa-spin"},tt={key:0,class:"text-danger"},et={key:1,class:"row justify-content-center"},st={class:"col-md-6"},ot={class:"ratio ratio-1x1"},lt=["src"],at={class:"mb-3 input-group"},it=(0,o.Lk)("hr",null,null,-1),nt={class:"subImg my-5"},dt={class:"mb-5"},ct=(0,o.Lk)("label",{for:"subImageUr",class:"form-label w-100"},"輸入副圖片網址",-1),ut={class:"mb-3 input-group"},rt={type:"text",class:"form-control",id:"subImageUr",placeholder:"請輸入副圖片連結",ref:"inputSubLink"},pt=(0,o.Lk)("label",{for:"customSubFile",class:"form-label w-100"},"或上傳副圖片",-1),mt={key:0,class:"fas fa-spinner fa-spin"},bt={key:0,class:"row"},ht={class:"ratio ratio-1x1"},kt=["src"],gt={class:"input-group"},Lt=["onUpdate:modelValue"],ft=["onClick"],vt={class:"modal-footer"},yt=(0,o.Lk)("button",{type:"button",class:"btn btn-gray","data-bs-dismiss":"modal"},"取消",-1);function wt(t,e,s,a,i,n){return(0,o.uX)(),(0,o.CE)("div",g,[(0,o.Lk)("div",L,[(0,o.Lk)("div",f,[(0,o.Lk)("div",v,[(0,o.Lk)("h5",y,[i.product.id?((0,o.uX)(),(0,o.CE)("span",w,"編輯產品")):((0,o.uX)(),(0,o.CE)("span",U,"新增產品"))]),P]),(0,o.Lk)("div",x,[(0,o.Lk)("div",C,[F,(0,o.bo)((0,o.Lk)("input",{type:"text",class:"form-control",id:"title",placeholder:"請輸入標題","onUpdate:modelValue":e[0]||(e[0]=t=>i.product.title=t)},null,512),[[k.Jo,i.product.title]])]),(0,o.Lk)("div",M,[(0,o.Lk)("div",S,[_,(0,o.bo)((0,o.Lk)("input",{type:"text",class:"form-control",id:"category",placeholder:"請輸入分類","onUpdate:modelValue":e[1]||(e[1]=t=>i.product.category=t)},null,512),[[k.Jo,i.product.category]])]),(0,o.Lk)("div",E,[X,(0,o.bo)((0,o.Lk)("input",{type:"text",class:"form-control",id:"unit",placeholder:"請輸入單位","onUpdate:modelValue":e[2]||(e[2]=t=>i.product.unit=t)},null,512),[[k.Jo,i.product.unit]])])]),(0,o.Lk)("div",$,[(0,o.Lk)("div",V,[A,(0,o.bo)((0,o.Lk)("input",{type:"number",class:"form-control",id:"origin_price",placeholder:"請輸入原價","onUpdate:modelValue":e[3]||(e[3]=t=>i.product.origin_price=t)},null,512),[[k.Jo,i.product.origin_price]])]),(0,o.Lk)("div",N,[J,(0,o.bo)((0,o.Lk)("input",{type:"number",class:"form-control",id:"price",placeholder:"請輸入售價","onUpdate:modelValue":e[4]||(e[4]=t=>i.product.price=t)},null,512),[[k.Jo,i.product.price]])])]),I,(0,o.Lk)("div",j,[D,(0,o.bo)((0,o.Lk)("textarea",{type:"text",class:"form-control",id:"description",placeholder:"請輸入產品描述","onUpdate:modelValue":e[5]||(e[5]=t=>i.product.description=t)},null,512),[[k.Jo,i.product.description]])]),(0,o.Lk)("div",Q,[B,(0,o.bo)((0,o.Lk)("textarea",{type:"text",class:"form-control",id:"content",placeholder:"請輸入產品說明內容","onUpdate:modelValue":e[6]||(e[6]=t=>i.product.content=t),style:{"white-space":"pre"}},null,512),[[k.Jo,i.product.content]])]),(0,o.Lk)("div",H,[(0,o.Lk)("div",K,[(0,o.bo)((0,o.Lk)("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,id:"is_enabled","onUpdate:modelValue":e[7]||(e[7]=t=>i.product.is_enabled=t)},null,512),[[k.lH,i.product.is_enabled]]),T])]),W,(0,o.Lk)("div",Y,[(0,o.Lk)("div",q,[(0,o.Lk)("label",z,[(0,o.eW)("輸入主圖片網址 "),(0,o.Lk)("div",G,[(0,o.Lk)("input",O,null,512),(0,o.Lk)("button",{type:"button",class:"btn btn-secondary",onClick:e[8]||(e[8]=(...t)=>n.sendUploadLink&&n.sendUploadLink(...t))}," 新增圖片 ")])]),R,t.mainLoading?((0,o.uX)(),(0,o.CE)("i",Z)):(0,o.Q3)("",!0),(0,o.Lk)("input",{type:"file",id:"customFile",class:"form-control mb-3",onChange:e[9]||(e[9]=(...t)=>n.sendUploadFile&&n.sendUploadFile(...t)),ref:"inputFile"},null,544)]),t.warning?((0,o.uX)(),(0,o.CE)("p",tt,(0,l.v_)(t.warning),1)):(0,o.Q3)("",!0),i.product.imageUrl?((0,o.uX)(),(0,o.CE)("div",et,[(0,o.Lk)("div",st,[(0,o.Lk)("div",ot,[(0,o.Lk)("img",{class:"img-fluid object-fit-cover",alt:"主圖片",src:i.product.imageUrl},null,8,lt)]),(0,o.Lk)("div",at,[(0,o.bo)((0,o.Lk)("input",{type:"url",class:"form-control",placeholder:"請輸入連結","onUpdate:modelValue":e[10]||(e[10]=t=>i.product.imageUrl=t)},null,512),[[k.Jo,i.product.imageUrl]]),(0,o.Lk)("button",{type:"button",class:"btn btn-outline-danger",onClick:e[11]||(e[11]=t=>{i.product.imageUrl=""})}," 移除 ")])])])):(0,o.Q3)("",!0)]),it,(0,o.Lk)("div",nt,[(0,o.Lk)("div",dt,[ct,(0,o.Lk)("div",ut,[(0,o.Lk)("input",rt,null,512),(0,o.Lk)("button",{type:"button",class:"btn btn-secondary",onClick:e[12]||(e[12]=(...t)=>n.sendUploadSubLink&&n.sendUploadSubLink(...t))}," 新增圖片 ")]),pt,t.subLoading?((0,o.uX)(),(0,o.CE)("i",mt)):(0,o.Q3)("",!0),(0,o.Lk)("input",{type:"file",id:"customSubFile",class:"form-control mb-3",onChange:e[13]||(e[13]=(...t)=>n.sendUploadSubFile&&n.sendUploadSubFile(...t)),ref:"inputSubFile"},null,544)]),i.product.images?((0,o.uX)(),(0,o.CE)("div",bt,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(i.product.images,((t,e)=>((0,o.uX)(),(0,o.CE)("div",{key:e,class:"col-md-4 mb-3"},[(0,o.Lk)("div",ht,[(0,o.Lk)("img",{class:"img-fluid object-fit-cover",alt:"副圖片",src:t},null,8,kt)]),(0,o.Lk)("div",gt,[(0,o.bo)((0,o.Lk)("input",{type:"url",class:"form-control",placeholder:"請輸入連結","onUpdate:modelValue":t=>i.product.images[e]=t},null,8,Lt),[[k.Jo,i.product.images[e]]]),(0,o.Lk)("button",{type:"button",class:"btn btn-outline-danger",onClick:t=>i.product.images.splice(e,1)}," 移除 ",8,ft)])])))),128))])):(0,o.Q3)("",!0)])]),(0,o.Lk)("div",vt,[yt,(0,o.Lk)("button",{type:"button",class:"btn btn-secondary",onClick:e[14]||(e[14]=(...t)=>n.sendUpdateProduct&&n.sendUpdateProduct(...t))},"確認")])])])],512)}var Ut=s(3286),Pt=(s(4114),s(4445)),xt=s(1250),Ct=s(8465),Ft=s.n(Ct),Mt=s(9040);const St=(0,Mt.A)();var _t=(0,Pt.nY)("adminProduct",{state:()=>({products:[],pagination:{},tempProduct:{},warning:"",isNew:!1,isLoading:!1,mainLoading:!1,subLoading:!1}),actions:{getProducts(t=1){this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/api/cms67/admin/products?page=${t}`;xt.A.get(e).then((t=>{this.isLoading=!1,this.products=t.data.products,this.pagination=t.data.pagination})).catch((()=>{this.isLoading=!1,St.pushMessage({style:"danger",title:"產品列表取得失敗",content:"請稍後嘗試"})}))},getProduct(t,e){this.isNew=t,this.isNew?this.tempProduct={}:this.tempProduct={...e}},updateProduct(t){this.isLoading=!0,this.tempProduct=t;let e="https://vue3-course-api.hexschool.io/api/cms67/admin/product",s="post";this.isNew||(e=`https://vue3-course-api.hexschool.io/api/cms67/admin/product/${t.id}`,s="put"),xt.A[s](e,{data:this.tempProduct}).then((t=>{let e=this.isNew?"新增成功":"更新成功";t.data.success?(this.getProducts(),St.pushMessage({style:"success",title:e})):(this.isLoading=!1,e=this.isNew?"新增失敗":"更新失敗",St.pushMessage({style:"danger",title:e,content:t.data.message.join("、")}))})).catch((()=>{this.isLoading=!1;const t=this.isNew?"新增失敗":"更新失敗";St.pushMessage({style:"danger",title:t,content:"請稍後嘗試"})}))},comfirmDelProduct(t){Ft().fire({title:"確定刪除嗎",text:`確定要${t.title}刪除嗎`,icon:"warning",cancelButtonText:"取消",confirmButtonText:"確定",showCancelButton:!0}).then((e=>{e.isConfirmed&&this.deleteProduct(t)}))},deleteProduct(t){this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/api/cms67/admin/product/${t.id}`;xt.A.delete(e).then((t=>{t.data.success?(this.getProducts(),St.pushMessage({style:"success",title:"刪除成功"})):(this.isLoading=!1,St.pushMessage({style:"danger",title:"刪除失敗",content:t.data.message.join("、")}))})).catch((()=>{this.isLoading=!1,St.pushMessage({style:"danger",title:"刪除失敗",content:"請稍後嘗試"})}))},uploadFile(t){this.mainLoading=!0;const e=new FormData;e.append("file-to-upload",t);const s="https://vue3-course-api.hexschool.io/api/cms67/admin/upload";xt.A.post(s,e).then((t=>{this.mainLoading=!1,t.data.success?(this.warning="",this.tempProduct.imageUrl=t.data.imageUrl):this.warning=t.data.message})).catch((()=>{this.mainLoading=!1,St.pushMessage({style:"danger",title:"上傳失敗",content:"請稍後在嘗試"})}))},uploadSubFile(t){this.subLoading=!0;const e=new FormData;e.append("file-to-upload",t);const s="https://vue3-course-api.hexschool.io/api/cms67/admin/upload";xt.A.post(s,e).then((t=>{this.subLoading=!1,t.data.success&&this.tempProduct.images.push(t.data.imageUrl)})).catch((()=>{this.subLoading=!1,St.pushMessage({style:"danger",title:"上傳失敗",content:"請稍後在嘗試"})}))},uploadLink(t){this.tempProduct.imageUrl=t},uploadSubLink(t){this.tempProduct.images.push(t)}}}),Et={mixins:[Ut.A],watch:{tempProduct(){this.product=this.tempProduct,this.product.images||(this.product.images=[])}},data(){return{product:{}}},computed:{...(0,Pt.aH)(_t,["tempProduct","mainLoading","subLoading","warning"])},methods:{...(0,Pt.i0)(_t,["updateProduct","uploadFile","uploadSubFile","uploadLink","uploadSubLink"]),sendUploadFile(){const t=this.$refs.inputFile.files[0];this.uploadFile(t),this.$refs.inputFile.value=""},sendUploadSubFile(){const t=this.$refs.inputSubFile.files[0];this.uploadSubFile(t),this.$refs.inputSubFile.value=""},sendUploadLink(){this.uploadLink(this.$refs.inputLink.value),this.$refs.inputLink.value=""},sendUploadSubLink(){this.uploadSubLink(this.$refs.inputSubLink.value),this.$refs.inputSubLink.value=""},sendUpdateProduct(){this.updateProduct(this.product),this.hideModal()}}},Xt=s(6262);const $t=(0,Xt.A)(Et,[["render",wt]]);var Vt=$t,At=s(9060),Nt={components:{ProductModal:Vt,PageNavigation:At.A},computed:{...(0,Pt.aH)(_t,["products","pagination","isNew","isLoading"])},methods:{...(0,Pt.i0)(_t,["getProducts","getProduct","comfirmDelProduct"]),openModal(t,e){this.getProduct(t,e),this.$refs.productModal.showModal()}},created(){this.getProducts()}};const Jt=(0,Xt.A)(Nt,[["render",h]]);var It=Jt}}]);
//# sourceMappingURL=555.780b38e9.js.map