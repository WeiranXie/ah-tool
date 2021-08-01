(function(){var e={6761:function(e,t,n){"use strict";n(6992),n(8674),n(9601),n(7727),n(8594),n(5666);var r=n(9963),o=n(6252),i={class:"font-h bg-bg w-full h-full overflow-scroll text-text text-center tablet:text-left"};function a(e,t,n,r,a,s){var c=(0,o.up)("setup");return(0,o.wg)(),(0,o.j4)("div",i,[(0,o.Wm)(c)])}var s=(0,o.aZ)({components:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}});s.render=a;var c=s,l=n(7171),u=n(2119),d={class:"relative w-full mx-auto"};function p(e,t,n,r,i,a){return(0,o.wg)(),(0,o.j4)("section",d," dsf ")}var m=(0,o.aZ)({name:"",props:{},data:function(){return{}},created:function(){}});m.render=p;var f=m,h=[{path:"/:locale",component:f,meta:{type:"page",slug:"home-b2c"}},{path:"/:locale/:slug",component:f,meta:{type:"page"}}],g=(0,u.p7)({history:(0,u.PO)("/ah-tool/"),routes:h,scrollBehavior:function(){return{el:"#app",top:0,left:0}}});g.beforeResolve(function(){var e=(0,l.Z)(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",r());case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}());var b=g;n(2222);function v(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,o=e?e*n/100:0,i={style:"decimal",useGrouping:!0},a=-1;switch(r){case 0:a=0;break;case 1:a=o>=10?0:1;break;case 2:a=o>=1?1:2;break}return a>=0&&(i.minimumFractionDigits=a,i.maximumFractionDigits=a),"".concat(new Intl.NumberFormat(this.$i18n.locale,i).format(o)," ").concat(t)}function y(e,t){return new Intl.NumberFormat(e,{style:"currency",currency:"EUR",minimumFractionDigits:2}).format(t)}var H={install:function(e){e.mixin({methods:{$nutrition:v,$currency:y}})}},w=(n(6699),n(8309),n(3631)),x=(0,w.qY)(),k=null!==x&&(!["safari","ie","ios","ios-webview","edge-ios","fxios"].includes(x.name)&&"Linux"!==x.os&&"iOS"!==x.os);null!==x&&console.log(x.name,x.version,"on",x.os);var S={install:function(e){e.config.globalProperties.$imgPngFm=k?"webp":"png",e.config.globalProperties.$imgJpgFm=k?"webp":"jpg"}},T=n(968),j=(n(2023),n(3577)),C={class:"flex flex-col bg-bg"},D={class:"flex text-center flex-row flex-wrap"},O={class:"relative"};function A(e,t,i,a,s,c){return(0,o.wg)(),(0,o.j4)("div",C,[(0,o.Wm)("div",D,[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(e.exps,(function(i,a){return(0,o.wg)(),(0,o.j4)("div",{key:a,class:"flex flex-1/2 max-w-1/2 flex-col tablet:flex-1/3 border border-collapse"},[(0,o.Wm)("label",{for:i.id,class:[e.exp.includes(i.id)?"":"opacity-20","bg-black text-bg w-full py-3 px-4 checked-sibling:bg-bg checked-sibling:text-black"]},[(0,o.Wm)("img",{class:"h-36 my-3 mx-auto ",src:n(3660)("./".concat(i.id,".jpg")).default},null,8,["src"]),(0,o.wy)((0,o.Wm)("input",{id:i.id,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.exp=t}),type:"checkbox",name:"some-radios",value:i.id,disabled:"AKH"===i.id||e.locked,class:"hidden"},null,8,["id","value","disabled"]),[[r.e8,e.exp]]),(0,o.Uk)(" "+(0,j.zw)(e.$t("exp.".concat(i.id))),1)],10,["for"])])})),128))]),(0,o.Wm)(r.uT,{data:"",enterActiveClass:"transition-all duration-150 ease-out",enterFromClass:"opacity-0 max-h-0",enterToClass:"opacity-100 max-h-16",leaveActiveClass:"transition-all duration-150 ease-in",leaveFromClass:"opacity-100 max-h-16",leaveToClass:"opacity-0 max-h-0"},{default:(0,o.w5)((function(){return[(0,o.Wm)("div",O,[(0,o.Wm)("div",{class:"text-center border-b bg-black bg-opacity-20 text-bg px-4 pt-2 pb-3",innerHTML:e.$t("misc.choose_investigators")},null,8,["innerHTML"]),(0,o.Wm)("div",{class:"text-center border-b bg-black bg-opacity-20 text-bg px-4 pt-2 pb-3",innerHTML:e.$t("misc.mythos")},null,8,["innerHTML"])])]})),_:1}),e.locked?((0,o.wg)(),(0,o.j4)("div",{key:1,class:"relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3",innerHTML:e.$t("misc.restart")},null,8,["innerHTML"])):((0,o.wg)(),(0,o.j4)("div",{key:0,class:"relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3",innerHTML:e.$t("misc.start")},null,8,["innerHTML"]))])}var M=JSON.parse('{"a":[{"id":"AKH","name":"Arkham Horror","year":2005},{"id":"CDP","name":"Curse of the Dark Pharoah","year":2006},{"id":"DUH","name":"Dunwich Horror","year":2006},{"id":"KIY","name":"The King in Yellow","year":2007},{"id":"KH","name":"Kingsport Horror","year":2008},{"id":"BGW","name":"Black Goat of the Woods","year":2008},{"id":"INH","name":"Innsmouth Horror","year":2009},{"id":"LTH","name":"The Lurker at the Threshold","year":2010},{"id":"MKH","name":"Miskatonic Horror","year":2011}]}'),I=(0,o.aZ)({name:"Setup",props:{},emits:["exp","active-panel"],data:function(){return{locked:!1,exp:["AKH"]}},computed:{exps:function(){return M.a}},created:function(){},methods:{}});I.render=A;var K=I,W=JSON.parse('{"zh":{"misc":{"start":"确定","restart":"重新开始游戏","rumor_pass":"已破除","rumor_failed":"已失败","choose_investigators":"选择调查员","browse_investigators":"查看调查员","mythos":"查看神话卡","city_encounters":"查看城市遭遇","outworld_encounters":"查看异界遭遇","back":"返回","draw":"抽卡","continue":"确认","devoured":"被吞没","choose_random":"随机选择","num_gators":"调查员人数"},"exp":{"AKH":"魔镇惊魂","CDP":"法老王的诅咒","DUH":"敦威治村惊魂","KIY":"黄衣之王","KH":"金斯波特惊魂","BGW":"森之黑山羊","INH":"印斯茅斯惊魂","LTH":"裂境潜伏者","MKH":"密斯卡托尼克惊魂"},"locations":{"Whateley Farm":"怀特利农场","607 Water St":"水街607号","Velmas Diner":"威玛餐厅","Esoteric Order of Dagon":"大袞教会","Gardners Place":"加德纳宅","Wizards Hill":"巫师山","Train Station":"火车站","The Rope and Anchor":"绳锚旅店","Hall School":"霍尔学院","Congregational Hospital":"公理会医院","Neils Curiosity Shop":"尼尔的古玩店","Darkes Carnival":"达克嘉年华","St Erasmuss Home":"圣依拉姆斯教堂","Marsh Refinery":"泽地精炼厂","Central Hill":"中山大街","7th House on the Left":"七号楼","Devils Hopyard":"魔鬼花园","Newspaper":"报社","Devil Reef":"魔鬼礁","Yha nthlei":"伊哈-恩斯雷","Cold Spring Glen":"冷泉谷","Easttown":"东城区","Downtown":"商业区","French Hill":"法国山","Inner Sanctum":"秘密圣所","Arkham Asylum":"阿卡姆精神病院","Bank of Arkham":"阿卡姆银行","Unvisited Isle":"未访之岛","Graveyard":"坟场","Silver Twilight Lodge":"银晓结社","The Witch House":"女巫之家","Black Cave":"黑暗洞窟","Independence Square":"独立广场","Woods":"森林","Hibbs Roadhouse":"希伯酒馆","Historical Society":"历史协会","The Unnamable":"古屋","Science Building":"科学大楼","The General Store":"杂货店","Curiositie Shoppe":"珍品店","Ye Olde Magick Shoppe":"魔法商店","St Marys Hospital":"圣玛丽医院","Police Station":"警察局","Library":"图书馆","Administration Building":"行政大楼"},"mythos":{"environment":"环境","env":{"urban":"城市","weather":"天气","mystic":"神秘"},"headline":"头条","rumor":"流言"}},"en":{"misc":{"start":"Continue","restart":"Start A New Game","rumor_pass":"Rumor passed","rumor_failed":"Rumor failed","choose_investigators":"Choose Investigators","browse_investigators":"Browse Investigators","mythos":"Mythos Deck","city_encounters":"City Encounters","outworld_encounters":"Outworld Encounters"},"exp":{"AKH":"Arkham Horror","CDP":"Curse of the Dark Pharoah","DUH":"Dunwich Horror","KIY":"The King in Yellow","KH":"Kingsport Horror","BGW":"Black Goat of the Woods","INH":"Innsmouth Horror","LTH":"The Lurker at the Threshold","MKH":"Miskatonic Horror"},"locations":{"Easttown":"Easttown","Downtown":"Downtown","French Hill":"French Hill","Inner Sanctum":"Inner Sanctum","Arkham Asylum":"Arkham Asylum","Bank of Arkham":"Bank of Arkham","Unvisited Isle":"Unvisited Isle","Graveyard":"Graveyard","Silver Twilight Lodge":"Silver Twilight Lodge","The Witch House":"The Witch House","Black Cave":"Black Cave","Independence Square":"Indpendence Square","Woods":"Woods","Hibbs Roadhouse":"Hibb\'s Roadhouse","Historical Society":"Historical Society","The Unnamable":"The Unnamable","Science Building":"Science Building","The General Store":"The General Store","Curiositie Shoppe":"Curiositie Shoppe","Ye Olde Magick Shoppe":"Ye Olde Magick Shoppe","St Marys Hospital":"St. Mary\'s Hospital","Police Station":"Police Station","Library":"The Library","Administration Building":"Administration Building"},"mythos":{"env":{"env":"Environment","urban":"Urban","weather":"Weather","mystic":"Mystic"},"headline":"Headline","rumor":"Rumor"}}}'),L=(0,T.o)({locale:"zh",messages:W}),_=(0,r.ri)(c).use(b).use(L).use(H).use(S).component("setup",K);b.isReady().then((function(){console.log("ROUTER READY, MOUNTING APP"),_.mount("#app")})).catch((function(e){console.error("ERROR STARTING VUE",e)}))},9032:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/AKH.67b6e174.jpg"},4666:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/BGW.5d57f4b3.jpg"},9069:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/CDP.e18345d5.jpg"},8778:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/DUH.b1d1c6df.jpg"},9021:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/INH.027c766f.jpg"},7032:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/KH.4ddee55c.jpg"},6217:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/KIY.b019b1e1.jpg"},9462:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/LTH.12a0022e.jpg"},1132:function(e,t,n){"use strict";n.r(t),t["default"]=n.p+"img/MKH.57f09b20.jpg"},3660:function(e,t,n){var r={"./AKH.jpg":9032,"./BGW.jpg":4666,"./CDP.jpg":9069,"./DUH.jpg":8778,"./INH.jpg":9021,"./KH.jpg":7032,"./KIY.jpg":6217,"./LTH.jpg":9462,"./MKH.jpg":1132};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=3660}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],i=e[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,i<a&&(a=i));s&&(e.splice(l--,1),t=o())}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/ah-tool/"}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],s=r[1],c=r[2],l=0;for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var u=c(n);for(t&&t(r);l<a.length;l++)i=a[l],n.o(e,i)&&e[i]&&e[i][0](),e[a[l]]=0;return n.O(u)},r=self["webpackChunkweb_frontend_main"]=self["webpackChunkweb_frontend_main"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(6761)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.6694932f.js.map