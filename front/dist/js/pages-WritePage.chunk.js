exports.ids=[7],exports.modules={28:function(e,t,n){"use strict";n.r(t);var a=n(13),o=n(45),r=n(0),i=n.n(r),l=n(8),c=(n(46),n(47),n(4)),u=[],s=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"],d={upload:function(e){return new Promise((function(t,n){var a=new FormData;a.append("image",e),fetch("http://localhost:8020/api/user/uploads",{method:"POST",body:a}).then((function(e){return e.json()})).then((function(e){var n;(n=u).push.apply(n,Object(o.a)(e)),t("http://localhost:8020/".concat(e))})).catch((function(e){n("Upload failed"),console.error("Error:",e)}))}))}};t.default=i.a.memo((function(e){var t=Object(r.useState)(),o=Object(a.a)(t,2),p=o[0],m=o[1],f=Object(r.useState)(""),b=Object(a.a)(f,2),h=b[0],v=b[1],g=Object(r.useState)(""),y=Object(a.a)(g,2),j=y[0],O=y[1];console.log(u,"&&&&&");var w=Object(r.useMemo)((function(){return"object"==typeof window?n(40):null}),[]),E=Object(r.useMemo)((function(){return"object"==typeof window?n(41).default:null}),[]);w&&E&&w.register("modules/imageUpload",E,!0),console.log(p,"!!");var x={toolbar:{container:[[{header:"1"},{header:"2"},{font:[]}],[{size:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"]]},imageUpload:d},k="object"==typeof window?n(42):function(){return!1},S=Object(l.useDispatch)();return i.a.createElement("div",{className:"write-container"},i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("input",{type:"text",value:h,className:"write-input",onChange:function(e){v(e.target.value)},placeholder:"제목을 입력하세요"}),!!k&&i.a.createElement(k,{modules:x,formats:s,placeholder:"내용 입력",style:{height:"550px",marginTop:"20px",paddingBottom:"55px"},onChange:function(e){m(e)}})),i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("label",null,i.a.createElement("span",{style:{marginRight:"10px"}},"해쉬태크"),i.a.createElement("input",{type:"text",value:j,onChange:function(e){O(e.target.value)}}))),i.a.createElement("button",{className:"write-button",onClick:function(t){t.preventDefault();var n=j.split("#");(n=n.map((function(e){return e.replace(",","").trim()}))).shift(0),S({type:c.q,data:{image_src_arr:u,title:h,description:p,hashtag:n},push:e.history.push}),u=[],m(null)}},"작성"))))}))},45:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(17);var o=n(21);function r(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},46:function(e,t){e.exports={}},47:function(e,t){e.exports={}}};