webpackJsonp([21],{446:function(e,t,a){function i(e){a(529)}var n=a(1)(a(519),a(534),i,null,null);e.exports=n.exports},519:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(5),n=a.n(i),o=a(9),r=a.n(o),s=a(4),l=a(2);t.default={components:{QModal:l.c,QModalLayout:l.d,QIcon:l.e,QBtn:l.f,QInnerLoading:l.I,QSpinnerIos:l.M},data:function(){return{image:null,cropped:null,loading:!1}},computed:n()({},a.i(s.b)({authUsername:"auth/username",user:"auth/user"})),mounted:function(){},methods:n()({},a.i(s.c)({setAvatar:"auth/setAvatar"}),{choseFile:function(){this.$refs.fileInput.click()},setUpCroppie:function(){var e=this;this.$refs.croppieRef.bind({url:e.image})},setUpFileUploader:function(e){var t=e.target.files||e.dataTransfer.files;t.length&&(this.$refs.cropModal.open(),this.createImage(t[0]))},createImage:function(e){var t=new FileReader,a=this;t.onload=function(e){a.image=e.target.result,a.setUpCroppie()},t.readAsDataURL(e)},crop:function(){var e={format:"jpeg",circle:!1},t=this;this.$refs.croppieRef.result(e,function(e){t.cropped=e,t.save()})},save:function(e){var t=this,a=this,i=window.apiUrl+"/user/"+this.authUsername+"/update-avatar",n={avatar:this.cropped};this.loading=!0,this.close(),r.a.post(i,n).then(function(e){a.loading=!1,a.setAvatar(e.data),console.log(a.user)}).catch(function(e){e&&(t.loading=!1)})},close:function(){this.$refs.fileInput.value=null,this.$refs.cropModal.close()}})}},525:function(e,t,a){t=e.exports=a(435)(void 0),t.push([e.i,"",""])},529:function(e,t,a){var i=a(525);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(436)("18018f42",i,!0)},534:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("avatar",{attrs:{src:e.user.avatar}}),e._v(" "),a("q-btn",{staticClass:"block no-padding no-shadow",attrs:{flat:"",color:"primary",disable:e.loading},on:{click:function(t){e.choseFile()}}},[a("q-inner-loading",{attrs:{visible:e.loading}},[a("q-spinner-ios",{attrs:{size:"50px",color:"primary"}})],1),e._v("\n  \tتغيير الصوره\n  \t")],1),e._v(" "),a("input",{ref:"fileInput",attrs:{type:"file",name:"file",hidden:"true"},on:{change:e.setUpFileUploader}}),e._v(" "),a("q-modal",{ref:"cropModal",staticClass:"bg-primary"},[a("vue-croppie",{ref:"croppieRef",attrs:{enableOrientation:!0,mouseWheelZoom:!0,showZoomer:!1,enforceBoundary:!1,enableResize:!1,size:"original",viewport:{width:250,height:250,type:"circle"},boundary:{width:400,height:400}}}),e._v(" "),a("div",{staticClass:"fixed-bottom"},[a("q-btn",{staticClass:"no-shadow",attrs:{color:"primary"},on:{click:function(t){e.crop()}}},[e._v("حفظ")]),e._v(" "),a("q-btn",{staticClass:"pull-right",attrs:{flat:"",color:"primary"},on:{click:function(t){e.close()}}},[e._v("اغلاق")])],1)],1)],1)},staticRenderFns:[]}}});