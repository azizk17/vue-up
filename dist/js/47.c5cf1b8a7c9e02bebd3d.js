webpackJsonp([47],{490:function(t,e,o){var n=o(1)(o(578),o(673),null,null,null);t.exports=n.exports},578:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(2);e.default={components:{QModal:n.c,QModalLayout:n.d,QIcon:n.e,QBtn:n.f,QRating:n.g,QList:n.h,QListHeader:n.i,QItem:n.j,QItemMain:n.k,QItemSide:n.l},data:function(){return{}},methods:{goBack:function(){this.$router.replace({name:"user.profile",params:{username:this.$route.params.username}})}},mounted:function(){this.$refs.layoutModal.open()}}},673:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-modal",{ref:"layoutModal",attrs:{"content-css":{minWidth:"80vw",minHeight:"80vh"},position:"bottom"},on:{close:function(e){t.goBack()}}},[o("q-modal-layout",[o("div",{staticClass:"layout-padding",staticStyle:{direction:"rtl"}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-6 "},[t._v("رقم الجوال")]),t._v(" "),o("div",{staticClass:"col-6"},[t._v("٠٤٤٤٤٤")])])])])],1)},staticRenderFns:[]}}});