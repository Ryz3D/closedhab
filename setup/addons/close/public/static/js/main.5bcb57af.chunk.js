(this["webpackJsonpclose-frontend"]=this["webpackJsonpclose-frontend"]||[]).push([[0],{183:function(e,t,n){e.exports=n.p+"static/media/logo.dba46384.png"},201:function(e,t,n){e.exports=n(340)},206:function(e,t,n){},306:function(e,t,n){},340:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(45),c=n.n(o),i=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,356)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)}))},l=n(162),u=n(86),s=n(20),v=(n(206),n(207),n(15)),m=n(16),h=n(18),p=n(17),f=n(352),d=n(354),b=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){return Object(v.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement(d.a,{style:{marginTop:"15px",marginLeft:"14mm"},size:"huge",inverted:this.props.inverted,subheader:this.props.subheader},this.props.children)}}]),n}(r.a.Component),E=(n(306),n(355)),O=n(87),g=function(){function e(){Object(v.a)(this,e)}return Object(m.a)(e,null,[{key:"rest",value:function(e){var t=this;return new Promise((function(n){fetch("".concat(t.host).concat(e),{headers:{Authorization:"Basic YWRtaW46c21hcnRob21l"}}).then((function(t){switch(t.status){case 200:return t.json();case 403:return console.error("Forbidden: ".concat(e)),void n();default:return console.error(t.status,t.text()),void n()}})).then((function(e){0!==e.error?(console.error(e.message),n()):n(e.data)})).catch((function(e){console.error(e),n()}))}))}},{key:"sse",value:function(e,t){var n=new EventSource("".concat(this.host).concat(e),{withCredentials:!0});return n.addEventListener("message",(function(e){return t(e.data)})),function(e){return n.close()}}},{key:"layoutList",value:function(){var e=this;return new Promise((function(t){e.rest("layout/list").then(t)}))}},{key:"layoutGet",value:function(e){var t=this;return new Promise((function(n){t.rest("layout/get?q=".concat(encodeURIComponent(e))).then(n)}))}},{key:"varList",value:function(){var e=this;return new Promise((function(t){e.rest("var/list").then(t)}))}},{key:"varGet",value:function(e){var t=this;return new Promise((function(n){t.rest("var/get?q=".concat(encodeURIComponent(e))).then(n)}))}},{key:"varSet",value:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return new Promise((function(r){n.rest("var/set?q=".concat(encodeURIComponent(e),"&v=").concat(encodeURIComponent(t),"$f=").concat(a?1:0)).then(r)}))}},{key:"varSub",value:function(e,t){var n=this.sse("var/sub?q=".concat(encodeURIComponent(e)),t);return function(e){return n()}}},{key:"setup",value:function(){var e=this;return new Promise((function(t){e.rest("setup").then(t)}))}}]),e}();g.host="/api/";var y=g,j=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={value:0,last:0},a.props.var||console.error("CSlider: No var given"),a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.varGet(this.props.var).then((function(t){return e.setState({value:parseFloat(t),last:parseFloat(t)})})),this.closeSub=y.varSub(this.props.var,(function(t){return e.setState({value:parseFloat(t),last:parseFloat(t)})}))}},{key:"componentWillUnmount",value:function(){this.closeSub()}},{key:"startSend",value:function(){var e=this;this.send(),this.int=setInterval((function(t){return e.send()}),this.props.interval||500)}},{key:"stopSend",value:function(){this.int&&clearInterval(this.int)}},{key:"send",value:function(){this.props.var&&this.state.value!==this.state.last&&(y.varSet(this.props.var,this.state.value,this.props.forceSend),this.setState({last:this.state.value}))}},{key:"render",value:function(){var e=this,t=Math.pow(10,this.props.labelPrecision||0),n=this.props.min||0,a=this.props.max||100,o=(this.state.value-n)/(a-n)*100,c={WebkitAppearance:"none",background:"linear-gradient(to right, #9f35cc 0%, #b75bde ".concat(o,"%, #fff ").concat(o,"%, #fff 100%)"),width:"300px",height:"5px"};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"csliderroot"},this.props.rating?r.a.createElement(E.a,{icon:"star",maxRating:"10",clearable:!0,onRate:function(t,n){var a=n.rating,r=n.maxRating;return e.send(a/r)}},r.a.createElement("i",null,"hello")):r.a.createElement("input",{type:"range",className:"cslider",style:c,value:this.state.value,min:n,max:a,step:this.props.step||"any",onScroll:function(e){return console.log(e)},onMouseDown:function(t){return e.startSend()},onPointerDown:function(t){return e.startSend()},onMouseUp:function(t){return e.stopSend()},onPointerUp:function(t){return e.stopSend()},onChange:function(t){return e.setState({value:t.target.value})}}),!this.props.hideLabel&&r.a.createElement(O.a,null,(this.props.labelConv||function(e){return"".concat(e,"%")})(Math.round((o+Number.EPSILON)*t)/t))))}}]),n}(r.a.Component),k=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a.props.var||console.error("CButton: No var given"),a.props.value||console.error("CButton: No value given"),a}return Object(m.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{style:{color:"#9f35cc"},icon:this.props.icon,onClick:function(t){return y.varSet(e.props.var,e.props.value,e.props.forceSend)}},this.props.content||this.props.children))}}]),n}(r.a.Component),S=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={value:0},a.props.var||console.error("CText: No var given"),a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.varGet(this.props.var).then((function(t){return e.setState({value:t})})),this.closeSub=y.varSub(this.props.var,(function(t){return e.setState({value:t})}))}},{key:"componentWillUnmount",value:function(){this.closeSub()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.state.value)}}]),n}(r.a.Component),C=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null,"Home"),r.a.createElement("p",null,"Balken Helligkeit"),r.a.createElement(j,{var:"balkenBrightness"}),r.a.createElement("p",null,"Balken Schalter"),r.a.createElement(j,{var:"balkenSwitch",min:0,max:1,step:1,labelConv:function(e){return e>=.5?"On":"Off"}}),r.a.createElement("p",null,"R\xf6hre (Verbraucht ",r.a.createElement(S,{var:"roehreSensor"}),"W)"),r.a.createElement(j,{var:"roehreSwitch",min:0,max:1,step:1,labelConv:function(e){return e>=.5?"On":"Off"}}),r.a.createElement("p",null,"Rollladen"),r.a.createElement(f.a.Group,{secondary:!0},r.a.createElement(k,{forceSend:!0,var:"rolli",value:"UP",icon:"chevron up"}),r.a.createElement(k,{forceSend:!0,var:"rolli",value:"STOP",icon:"stop circle"}),r.a.createElement(k,{forceSend:!0,var:"rolli",value:"DOWN",icon:"chevron down"})),r.a.createElement("p",null,"Lucas Stecki (Verbraucht ",r.a.createElement(S,{var:"steckiSensor"}),"W)"),r.a.createElement(j,{var:"steckiSwitch",min:0,max:1,step:1,labelConv:function(e){return e>=.5?"On":"Off"}}),r.a.createElement("p",null,"Lucas Rolli"),r.a.createElement(f.a.Group,{secondary:!0},r.a.createElement(k,{forceSend:!0,var:"rolli2",value:"UP",icon:"chevron up"}),r.a.createElement(k,{forceSend:!0,var:"rolli2",value:"STOP",icon:"stop circle"}),r.a.createElement(k,{forceSend:!0,var:"rolli2",value:"DOWN",icon:"chevron down"})))}}]),n}(r.a.Component),w=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null,"Layout"))}}]),n}(r.a.Component),x=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null,"Pages"))}}]),n}(r.a.Component),P=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null,"Variables"))}}]),n}(r.a.Component),I=n(169),F=n.n(I),R=n(348),W=n(59),B=n(350),L=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){this.props.windowWidth;return r.a.createElement("div",null,r.a.createElement(b,null,"Settings"),r.a.createElement(R.a,null,r.a.createElement(O.a,null,r.a.createElement(W.a,{name:"columns"}),"Homepage"),r.a.createElement(B.a,{labeled:!0,options:[{text:"a",value:"a"}]})))}}]),n}(r.a.Component),U=F()(L),N=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={},a}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null,"About"))}}]),n}(r.a.Component),H=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){return Object(v.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{style:{backgroundColor:"#000",position:"fixed",top:"0",left:"0",minWidth:"100vw",minHeight:"100vh",color:"#fff",textAlign:"center"}},r.a.createElement("h1",null,"404!"))}}]),n}(r.a.Component),A=n(41),D=n(351),M=n(353),T=n(188),G=n(180),z=n(183),q=n.n(z),V=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(v.a)(this,n),(a=t.call(this,e)).state={setup:{},sidebar:"1"===(localStorage.getItem("sidebar")||"1")},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.setup().then((function(t){return e.setState({setup:t||{}})}))}},{key:"toggleSidebar",value:function(){var e=this;this.setState({sidebar:!this.state.sidebar},(function(t){localStorage.setItem("sidebar",e.state.sidebar?"1":"0")}))}},{key:"render",value:function(){var e=this,t=document.location.pathname,n={position:"fixed",top:0,left:0,minWidth:"100vw",minHeight:"100vh"},a=Object(A.a)(Object(A.a)({},n),{},{backgroundColor:"#ddd"}),o={position:"fixed",top:"2mm",left:"2mm",zIndex:10,backgroundColor:"#9f35ccb0",transition:"opacity 1s"},c=Object(A.a)({},o),i=Object(A.a)(Object(A.a)({},o),{},{opacity:this.state.sidebar?0:1});return r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,null,r.a.createElement("title",null,this.state.setup.name||"closedHAB")),r.a.createElement(D.a.Pushable,{style:Object(A.a)(Object(A.a)({},n),{},{overflow:"hidden"})},r.a.createElement(D.a,{width:"thin",animation:"slide out",inverted:!0,vertical:!0,visible:this.state.sidebar,as:M.a},r.a.createElement(f.a,{style:c,size:"tiny",circular:!0,icon:"x",onClick:function(t){return e.toggleSidebar()}}),r.a.createElement(M.a.Header,null,r.a.createElement(d.a,{inverted:!0,textAlign:"center",style:{marginTop:"12mm",marginBottom:"10px"}},r.a.createElement(T.a,{src:q.a}),r.a.createElement("br",null),"closedHAB")),[{key:"/",name:"Home",icon:"home"},{key:"/pages",name:"Pages",icon:"columns"},{key:"/variables",name:"Variables",icon:"sitemap"},{key:"/settings",name:"Settings",icon:"settings"},{key:"/about",name:"About",icon:"info"}].map((function(e){return r.a.createElement(M.a.Item,{key:e.key,active:t===e.key,as:u.b,to:e.key},r.a.createElement(W.a,{name:e.icon}),e.name)}))),r.a.createElement(D.a.Pusher,{style:a},r.a.createElement(f.a,{style:i,size:"small",circular:!0,icon:"sidebar",onClick:function(t){return e.toggleSidebar()}}),this.props.children)))}}]),n}(r.a.Component),J={"/":C,"/layout":w,"/pages":x,"/variables":P,"/settings":U,"/about":N};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,null,r.a.createElement(s.c,null,Object.entries(J).map((function(e){return r.a.createElement(s.a,{path:e[0],exact:!0,key:e[0]},r.a.createElement(V,null,r.a.createElement(e[1])))})),r.a.createElement(s.a,{component:H})))),document.getElementById("root")),i(),Object(l.a)()}},[[201,1,2]]]);
//# sourceMappingURL=main.5bcb57af.chunk.js.map