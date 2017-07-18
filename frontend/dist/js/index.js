"use strict";var _slicedToArray=function(){function a(a,b){var c=[],d=true,e=false,f=undefined;try{for(var g=a[Symbol.iterator](),h;!(d=(h=g.next()).done);d=true){c.push(h.value);if(b&&c.length===b)break}}catch(a){e=true;f=a}finally{try{if(!d&&g["return"])g["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b)){return b}else if(Symbol.iterator in Object(b)){return a(b,c)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();(function b(c,d,e){function a(h,i){if(!d[h]){if(!c[h]){var j=typeof require=="function"&&require;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var f=d[h]={exports:{}};c[h][0].call(f.exports,function(b){var d=c[h][1][b];return a(d?d:b)},f,f.exports,b,c,d,e)}return d[h].exports}for(var g=typeof require=="function"&&require,f=0;f<e.length;f++){a(e[f])}return a})({1:[function(a,b,c){var f=a("../utils"),g=f.convertUnit2Minutes,h=f.orderByName,i=f.object2array,j=f.getEachFieldToFixed2,k=f.merge,l=a("../echartsUtils"),m=l.createEChartsSeries,n=l.AXIS_MINUTES,o=l.GRID_NORMAL,q=[],p="#chartLast24Hs";function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};if(a.componentType=="markLine")return d("Average "+a.seriesName+" for <b>"+a.value+"</b> minutes");else if(a.componentType=="markPoint")return d("Longest "+a.seriesName+" for <b>"+a.value+"</b> minutes"+("<br/>in "+q[a.data.coord[0]]));else if(Array.isArray(a)&&a.length==2)return d("In "+a[0].name+":<br/>"+a.map(function(a){return a.seriesName+" for <b>"+a.value+"</b> minutes"}).join("<br/>"));return d(null)}var r=null;b.exports={update:e};function e(a){if(!r)r=echarts.init($(p)[0]);var b=g(a),c=h(i(b));q=c.map(function(a){return a.name});r.setOption({xAxis:{data:c.map(function(a){return a.name.slice(11)})},yAxis:k(n,{boundaryGap:[0,0.2]}),grid:o,tooltip:{trigger:"axis",formatter:d},series:[m("line","watching").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#29b6f6").setItemColor("#29b6f6").setAreaColor("#b3e5fc").setValues(j(c,"watching")).toObject(),m("line","coding").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#01579b").setItemColor("#01579b").setAreaColor("#0288d1").setValues(j(c,"coding")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],2:[function(a,b,c){var i=a("../utils"),j=i.convertUnit2Hour,k=i.orderByWatchingTime,l=i.object2array,m=i.getEachFieldToFixed2,n=a("../echartsUtils"),o=n.createEChartsSeries,p=n.GRID_NORMAL,q="#chartAllLangs",r="#dlgAllLangs",s="btn-default",t="btn-success",u=["#a5d6a7","#80cbc4","#90caf9","#80deea","#ef9a9a","#ffcc80","#bcaaa4"],v="#b0bec5";function d(a){if(!a)return u;var b=[];for(var c=0;c<a;c++){b.push(u[c%u.length])}b.push(v);return b}function e(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};return d("You spent<br/> <b>"+a.percent+"%</b> time"+("<br/>(<b>"+a.value+"</b> hours)<br/> on "+a.name+" "))}var w=null,x=null,y=null,z=0;b.exports={update:f,setRange:g};function f(a){if(!x){x=$(r);x.on("shown.bs.modal",h)}y=a;x.modal()}function g(a){z=Number(a);var b=x.find(".range-block [data-range]");b.removeClass(t).addClass(s);b.filter("[data-range="+z+"]").addClass(t).removeClass(s);h()}function h(){if(!w)w=echarts.init($(q)[0]);var a=j(y),b=k(l(a),true);if(z){var f=z,g=b.length;for(var h=f+1;h<g;h++){b[f].watching+=b[h].watching;b[f].coding+=b[h].coding}if(g>f){b[f].name="other";b.length=f+1}}var c=b.map(function(a){return a.name});w.setOption({legend:{orient:"vertical",x:"right",data:c},color:d(z),grid:p,tooltip:{trigger:"item",formatter:e},series:[o("pie","watching").setLabelBold().setLabels(c).setValues(m(b,"watching")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],3:[function(a,b,c){(function(c){var g=a("../utils"),h=g.convertUnit2Hour,i=g.orderByWatchingTime,j=g.object2array,k=g.getEachFieldToFixed2,l=g.getShortProjectName,m=a("../echartsUtils"),n=m.createEChartsSeries,o=m.AXIS_HOURS,p=m.GRID_NORMAL,q="#chartAllProjects",r="#dlgAllProjects",s=[],t=[],u=[];function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a},e=a.dataIndex;if(e>=s.length)return d(null);return d("You spent<br/> (<b>"+a.value+"</b> hours)<br/> on <u>"+s[e]+"</u>")}var v=null,w=null,x=null;b.exports={update:e};function e(a){if(!w){w=$(r);w.on("shown.bs.modal",f)}x=a;w.modal()}function f(){if(!v){v=echarts.init($(q)[0]);v.on("click",function(a){if(typeof a.dataIndex=="number"){w.modal("hide");c.app.openProjectReport(u[a.dataIndex])}})}var a=h(x),b=i(j(a));u=b.map(function(a){return a.name});s=b.map(function(a){return decodeURIComponent(a.name)});t=s.map(function(a,c){return l(a)+(" ("+Number(b[c].watching).toFixed(2)+" hs)")});var e=b.length*50;$(q).height(e);v.resize({height:e});v.setOption({legend:{data:[""]},xAxis:{type:"value",nameLocation:"end",position:"top",axisTick:{show:false},axisLabel:o.axisLabel},yAxis:{type:"category",nameLocation:"start",axisTick:{show:false},axisLabel:{inside:true,interval:0},z:1024,data:t},grid:p,tooltip:{trigger:"item",formatter:d},series:[n("bar","watching").setItemColor("#fff59d").setValues(k(b,"watching")).toObject()]})}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"../echartsUtils":10,"../utils":20}],4:[function(a,b,c){var f=a("../utils"),g=f.convertUnit2Hour,h=f.orderByWatchingTime,i=f.object2array,j=f.getEachFieldToFixed2,k=a("../echartsUtils"),l=k.createEChartsSeries,m=k.GRID_NORMAL,n=["#4caf50","#2196f3","#ffeb3b","#f44336","#9c27b0","#009688","#ff9800","#795548"],o="#chartComputer";function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};return d("You spent<br/> <b>"+a.percent+"%</b> time"+("<br/>(<b>"+a.value+"</b> hours)<br/> on "+a.name+" "))}var p=null;b.exports={update:e};function e(a){if(!p)p=echarts.init($(o)[0]);var b=g(a),c=h(i(b));p.setOption({color:n,grid:m,tooltip:{trigger:"item",formatter:d},series:[l("pie","watching").setLabelBold().setLabels(c.map(function(a){return a.name})).setValues(j(c,"watching")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],5:[function(a,b,c){var f=a("../utils"),g=f.convertUnit2Hour,h=f.orderByWatchingTime,i=f.object2array,j=f.getEachFieldToFixed2,k=a("../echartsUtils"),l=k.createEChartsSeries,m=k.AXIS_HOURS,n=k.GRID_NORMAL,o="#chartFile",p=5,q=[];function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a},e=a.dataIndex;if(e>=q.length)return d(null);return d("You spent<br/> (<b>"+a.value+"</b> hours)<br/> on <u>"+q[e]+"</u>")}var r=null;b.exports={update:e};function e(a){if(!r)r=echarts.init($(o)[0]);var b=g(a),c=h(i(b)).slice(-p),e=[];q=c.map(function(a){return decodeURIComponent(a.name)});e=q.map(function(a,b){return a+(" ("+Number(c[b].watching).toFixed(2)+" hs)")});r.setOption({legend:{data:[""]},xAxis:{type:"value",nameLocation:"end",position:"top",axisTick:{show:false},axisLabel:m.axisLabel},yAxis:{type:"category",nameLocation:"start",axisTick:{show:false},axisLabel:{inside:true},z:1024,data:e},grid:n,tooltip:{trigger:"item",formatter:d},series:[l("bar","watching").setItemColor("#ce93d8").setValues(j(c,"watching")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],6:[function(a,b,c){var f=a("../utils"),g=f.convertUnit2Hour,h=f.orderByWatchingTime,j=f.object2array,k=f.getEachFieldToFixed2,i=a("../echartsUtils"),l=i.createEChartsSeries,m=i.GRID_NORMAL,n=["#a5d6a7","#80cbc4","#90caf9","#80deea","#ef9a9a","#ffcc80","#bcaaa4","#b0bec5"],o=["#a5d6a7","#80cbc4","#90caf9","#80deea","#ef9a9a","#d6d6d6"],p="#chartLanguage",q="";function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};return d("You spent<br/> <b>"+a.percent+"%</b> time"+("<br/>(<b>"+a.value+"</b> hours)<br/> on "+(a.name=="other"?q:a.name)+" "))}var r=null;b.exports={update:e};function e(a){if(!r)r=echarts.init($(p)[0]);var b=g(a),c=h(j(b),true),e=5,f=c.length;for(var s=e+1;s<f;s++){c[e].watching+=c[s].watching;c[e].coding+=c[s].coding}if(f>e){q=c.slice(e,e+5).map(function(a){return a.name}).join(", ")+"...";c[e].name="other";c.length=e+1}r.setOption({color:f>e?o:n,grid:m,tooltip:{trigger:"item",formatter:d},series:[l("pie","watching").setLabelBold().setLabels(c.map(function(a){return a.name})).setValues(k(c,"watching")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],7:[function(a,b,c){var j=a("../utils"),k=j.convertUnit2Hour,l=j.orderByWatchingTime,m=j.orderByName,n=j.object2array,o=j.getEachFieldToFixed2,p=j.expandGroupByDaysObject,q=j.getShortProjectName,r=j.merge,s=a("../echartsUtils"),t=s.createEChartsSeries,u=s.AXIS_HOURS,v=s.GRID_NORMAL,w=a("../form"),x=w.fill,y="#chartOneProjectDays",z="#chartOneProjectLanguages",A="#chartOneProjectFiles",B="#dlgOneProject",C="btn-default",D="btn-primary";function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};if(a.componentType=="markLine")return d("Average "+a.seriesName+" for <b>"+a.value+"</b> hours");else if(a.componentType=="markPoint")return d("Longest "+a.seriesName+" for <b>"+a.value+"</b> hours"+("<br/>in "+N[a.data.coord[0]]));else if(Array.isArray(a)&&a.length==2)return d("In "+a[0].name+":<br/>"+a.map(function(a){return a.seriesName+" for <b>"+a.value+"</b> hours"}).join("<br/>"));return d(null)}function e(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a},e=a.dataIndex;if(e>=O.length)return d(null);return d("You spent<br/> (<b>"+a.value+"</b> hours)<br/> on <u>"+O[e]+"</u>")}var E=null,F=null,G=null,H=null,I=null,J=7,K="",L="",M=10,N=[],O=[];b.exports={update:f,setRange:g};function f(a,b){if(!H){H=$(B);H.on("shown.bs.modal",function(){L=decodeURIComponent(Object.keys(a.groupBy.project)[0]);K=q(L);x(H,{projName:K,projPath:L,reportDays:b});h();i()})}I=a;J=b;H.modal()}function g(a){M=Number(a);var b=H.find(".range-block [data-range]");b.removeClass(D).addClass(C);b.filter("[data-range="+a+"]").addClass(D).removeClass(C);i()}function h(){if(!E)E=echarts.init($(y)[0]);var a=new Date,b=new Date(a);b.setDate(b.getDate()-J+1);var c=$.extend(true,{},I.groupBy.day),e=p(c,b,a),f=k(e),g=m(n(f));N=g.map(function(a){return a.name});console.log(c);E.setOption({xAxis:{data:N},yAxis:r(u,{boundaryGap:[0,0.2]}),grid:v,tooltip:{trigger:"axis",formatter:d},series:[t("line","watching").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#66bb6a").setItemColor("#66bb6a").setAreaColor("#c8e6c9").setValues(o(g,"watching")).toObject(),t("line","coding").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#1b5e20").setItemColor("#1b5e20").setAreaColor("#388e3c").setValues(o(g,"coding")).toObject()]})}function i(){if(!G)G=echarts.init($(A)[0]);var a=k(I.groupBy.file),b=l(n(a)),c=[];if(M)b=b.slice(-M);var d=b.length*50;$(A).height(d);G.resize({height:d});O=b.map(function(a){return decodeURIComponent(a.name)});c=O.map(function(a,c){return a+(" ("+Number(b[c].watching).toFixed(2)+" hs)")});G.setOption({legend:{data:[""]},xAxis:{type:"value",nameLocation:"end",position:"top",axisTick:{show:false},axisLabel:u.axisLabel},yAxis:{type:"category",nameLocation:"start",axisTick:{show:false},axisLabel:{inside:true,interval:0},z:2048,data:c},grid:v,tooltip:{trigger:"item",formatter:e},series:[t("bar","watching").setItemColor("#E4F6FE").setValues(o(b,"watching")).add({itemStyle:{normal:{borderColor:"#CAEDFD"}}}).toObject()]})}},{"../echartsUtils":10,"../form":11,"../utils":20}],8:[function(a,b,c){(function(c){var f=a("../utils"),g=f.convertUnit2Hour,h=f.orderByWatchingTime,i=f.object2array,j=f.getEachFieldToFixed2,k=f.getShortProjectName,l=a("../echartsUtils"),m=l.createEChartsSeries,n=l.AXIS_HOURS,o=l.GRID_NORMAL,p="#chartProject",q=5,r=[],s=[],t=[];function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a},e=a.dataIndex;if(e>=s.length)return d(null);return d("You spent<br/> (<b>"+a.value+"</b> hours)<br/> on <u>"+s[e]+"</u>")}var u=null;b.exports={update:e};function e(a){if(!u){u=echarts.init($(p)[0]);u.on("click",function(a){return typeof a.dataIndex=="number"&&c.app.openProjectReport(r[a.dataIndex])})}var b=g(a),e=h(i(b)).slice(-q);r=e.map(function(a){return a.name});s=e.map(function(a){return decodeURIComponent(a.name)});t=s.map(function(a,b){return k(a)+(" ("+Number(e[b].watching).toFixed(2)+" hs)")});u.setOption({legend:{data:[""]},xAxis:{type:"value",nameLocation:"end",position:"top",axisTick:{show:false},axisLabel:n.axisLabel},yAxis:{type:"category",nameLocation:"start",axisTick:{show:false},axisLabel:{inside:true},z:1024,data:t},grid:o,tooltip:{trigger:"item",formatter:d},series:[m("bar","watching").setItemColor("#fff59d").setValues(j(e,"watching")).toObject()]})}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"../echartsUtils":10,"../utils":20}],9:[function(a,b,c){var f=a("../utils"),g=f.convertUnit2Hour,h=f.orderByName,i=f.object2array,j=f.getEachFieldToFixed2,k=f.merge,l=a("../echartsUtils"),m=l.createEChartsSeries,n=l.AXIS_HOURS,o=l.GRID_NORMAL,q=[],p="#chartSummary";function d(a,b,c){var d=function setText(a){return setTimeout(c,1,b,a),a};if(a.componentType=="markLine")return d("Average "+a.seriesName+" for <b>"+a.value+"</b> hours");else if(a.componentType=="markPoint")return d("Longest "+a.seriesName+" for <b>"+a.value+"</b> hours"+("<br/>in "+q[a.data.coord[0]]));else if(Array.isArray(a)&&a.length==2)return d("In "+a[0].name+":<br/>"+a.map(function(a){return a.seriesName+" for <b>"+a.value+"</b> hours"}).join("<br/>"));return d(null)}var r=null;b.exports={update:e};function e(a){if(!r)r=echarts.init($(p)[0]);var b=g(a),c=h(i(b));q=c.map(function(a){return a.name});r.setOption({xAxis:{data:q},yAxis:k(n,{boundaryGap:[0,0.2]}),grid:o,tooltip:{trigger:"axis",formatter:d},series:[m("line","watching").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#66bb6a").setItemColor("#66bb6a").setAreaColor("#c8e6c9").setValues(j(c,"watching")).toObject(),m("line","coding").showMaxMarkPoint("max time").showAverageLine("average time").setLineSmooth().setLineColor("#1b5e20").setItemColor("#1b5e20").setAreaColor("#388e3c").setValues(j(c,"coding")).toObject()]})}},{"../echartsUtils":10,"../utils":20}],10:[function(a,b,c){b.exports={createEChartsSeries:d,AXIS_HOURS:{axisLabel:{formatter:"{value} hs"}},AXIS_MINUTES:{axisLabel:{formatter:"{value} mins"}},GRID_NORMAL:{left:"20",right:"20",bottom:"10",top:"10",containLabel:true},GRID_HORIZON_BAR:{left:"10",right:"20",bttom:"5",top:"5",containLabel:true}};function d(a,b){var c={},d={type:a,name:b},e={showMaxMarkPoint:function showMaxMarkPoint(a){return d.markPoint={data:[{type:"max",name:a}]}},showAverageLine:function showAverageLine(a){return d.markLine={data:[{type:"average",name:a}]}},setLineSmooth:function setLineSmooth(){return d.smooth=true},setLineColor:function setLineColor(a){return d.lineStyle={normal:{color:a}}},setItemColor:function setItemColor(a){return d.itemStyle={normal:{color:a}}},setAreaColor:function setAreaColor(a){return d.areaStyle={normal:{color:a}}},setTooltip:function setTooltip(a){return d.tooltip={formatter:a}},setLabelBold:function setLabelBold(){return d.label={normal:{textStyle:{fontWeight:"bold"}}}},setLabels:function setLabels(a){return d.data?d.data.forEach(function(b,c){return b.name=a[c]}):d.data=a.map(function(a){return{name:a}})},setValues:function setValues(a){return d.data?d.data.forEach(function(b,c){return b.value=a[c]}):d.data=a.map(function(a){return{value:a}})},add:function add(){for(var a,b=arguments.length,c=Array(b),e=0;e<b;e++){c[e]=arguments[e]}return(a=$).extend.apply(a,[true,d].concat(c))}};c.toObject=function(){return d};var f=function _loop(a){c[a]=function(){return e[a].apply(e,arguments),c}};for(var g in e){f(g)}return c}},{}],11:[function(a,b,c){function d(a){var b={};a.find("[name]").each(function(a,c){var d=$(c),e=g(d)?d.val():d.text();if(d.data("ignore"))return;b[d.attr("name")]=e});return b}function e(a,b){b=b||{};a.find("[name]").each(function(a,c){var d=$(c),e=d.attr("name"),f=b[e]||"";if(d.data("ignore"))return;g(d)?d.val(f):d.text(f)})}function f(a){return g(a)}function g(a){var b=a.prop("tagName");return b=="INPUT"||b=="TEXTAREA"||b=="SELECT"}b.exports={encode:d,fill:e,isValueTag:f}},{}],12:[function(a,b,c){var j="coding-tracker-i18n",i=a("./utils").hasLocalStorage(),k={"zh-cn":a("./i18n/zh-cn"),"zh-tw":a("./i18n/zh-tw"),"ru":a("./i18n/ru")},l="";function d(a){return i?localStorage.getItem(a):null}function e(a,b){i&&localStorage.setItem(a,b)}function f(){l=d(j)||"";if(l in k){var a=k[l],b=$("[data-i18n]"),c="en"in k?null:{};for(var e=0,f=b.length;e<f;e++){var g=b.eq(e),h=g.data("i18n");if(h in a){c&&(c[h]=g.text());g.text(a[h])}}c&&(k.en=c)}}function g(a){e(j,a);f()}function h(a){var b=k[l];return b&&b[a]}b.exports={update:f,setLanguage:g,get:h,get language(){return l}}},{"./i18n/ru":13,"./i18n/zh-cn":14,"./i18n/zh-tw":15,"./utils":20}],13:[function(a,b,c){b.exports={title_summary:"\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u043E\u0442\u0447\u0435\u0442",title_24hs:"\u041E\u0442\u0447\u0435\u0442 \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 24 \u0447\u0430\u0441\u0430",title_projects:"\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C",title_projects_tip:" (\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432 \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u0435 \u0434\u043B\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439)",title_languages:"\u042F\u0437\u044B\u043A\u0438",title_files:"\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E \u0444\u0430\u0439\u043B\u0430\u043C",title_computers:"\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u044B",title_welcome:"VSCode Coding Tracker \u043E\u0442\u0447\u0435\u0442",title_share:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",title_author:"\u0410\u0432\u0442\u043E\u0440",title_version:"\u0412\u0435\u0440\u0441\u0438\u044F",title_help:"\u041F\u043E\u043C\u043E\u0449\u044C",title_license:"\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u044F",title_components:"\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B",title_connect:"\u0421\u0441\u044B\u043B\u043A\u0438",title_server_version:"\u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430:",title_storage_version:"\u0412\u0435\u0440\u0441\u0438\u044F \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430:",title_files_in_proj:"\u0424\u0430\u0439\u043B\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u0430:",title_last_xx_days:"\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435",title_totally_1:"\u0412\u0441\u0435\u0433\u043E: ",title_totally_2:"\u0447. \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430; ",title_totally_3:"\u0447. \u043F\u0435\u0447\u0430\u0442\u0430\u043D\u0438\u044F",full_report:"\u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442",option_7_days:"7 \u0434\u043D\u0435\u0439",option_30_days:"30 \u0434\u043D\u0435\u0439",option_365_days:"365 \u0434\u043D\u0435\u0439",word_top:"\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435",word_all:"\u0412\u0441\u0435",word_day:"\u0434\u043D\u0435\u0439",link_github_repo_server:"\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",link_github_repo_extension:"\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F",link_vscode_marketplace:"VSCode \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F",show_welcome:"welcome info",welcome_subtitle:"",welcome_intro:"\u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435:",welcome_watching_time:"\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430(\u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0432\u0440\u0435\u043C\u044F \u043F\u0435\u0447\u0430\u0442\u0430\u043D\u0438\u044F)",welcome_coding_time:"\u0412\u0440\u0435\u043C\u044F, \u043F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u0435 \u043D\u0430 \u043F\u0435\u0447\u0430\u0442\u0430\u043D\u0438\u0435",welcome_tips:"\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438:",welcome_tips_click_hover_title:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043C\u044B\u0448\u044C \u043D\u0430 \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u0443",welcome_tips_click_hover:"\u041D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043B\u044F \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438. \u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u0441\u0442\u043E\u043B\u0431\u0446\u0443 \u0441 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u043C \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0442\u0447\u0435\u0442\u0430 \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443.",welcome_tips_language_title:"\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u044F\u0437\u044B\u043A\u0430",welcome_tips_language:"\u0412\u044B\u0431\u043E\u0440 \u044F\u0437\u044B\u043A\u0430 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u0432\u0435\u0440\u0445\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432\u043E\u0437\u043B\u0435 \u0438\u043A\u043E\u043D\u043A\u0438:",welcome_contribution:"\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u043E:",welcome_contribution_1:"\u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u0438\u0434\u0435\u044F \u0438\u043B\u0438 \u0432\u044B \u043D\u0430\u0448\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0443, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 ",welcome_contribution_2:" \u0438\u043B\u0438 ",welcome_btn_close:"OK. \u0421\u043F\u0440\u044F\u0442\u0430\u0442\u044C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E",welcome_reopen:"\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u044D\u0442\u043E \u043E\u043A\u043D\u043E \u0441\u043D\u043E\u0432\u0430 \u043A\u043B\u0438\u043A\u043D\u0443\u0432 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \"welcome info\"",share_content:"\u0422\u0435\u043A\u0441\u0442",share_font_size:"\u0420\u0430\u0437\u043C\u0435\u0440 \u0442\u0435\u043A\u0441\u0442\u0430",share_mark_line:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043B\u0438\u043D\u0438\u044E",share_mark_line_max:"\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C",share_mark_line_average:"\u0421\u0440\u0435\u0434\u043D\u0438\u0439",share_mark_line_min:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439",share_tip:"(\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0442\u043E\u0447\u043A\u0443 \u0432 \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u0435, \u0447\u0442\u043E\u0431 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440 \u0441\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C)",share_btn:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"}},{}],14:[function(a,b,c){b.exports={title_summary:"\u7F16\u7A0B\u65F6\u95F4\u603B\u7ED3",title_24hs:"24\u5C0F\u65F6\u603B\u7ED3",title_projects:"\u9879\u76EE\u8017\u65F6",title_projects_tip:"(\u70B9\u51FB\u56FE\u8868\u9879\u76EE\u67E5\u770B\u8BE6\u7EC6)",title_languages:"\u6309\u8BED\u8A00\u5206\u7C7B",title_files:"\u6587\u4EF6\u8017\u65F6",title_computers:"\u6309\u8BA1\u7B97\u673A\u5206\u7C7B",title_welcome:"\u6B22\u8FCE\u6765\u5230\u62A5\u544A\u9875\u9762",title_share:"\u5206\u4EAB",title_author:"\u4F5C\u8005",title_version:"\u7248\u672C",title_help:"\u5E2E\u52A9",title_license:"\u5F00\u6E90\u534F\u8BAE",title_components:"\u76F8\u5173\u7EC4\u4EF6",title_connect:"\u94FE\u63A5",title_server_version:"\u670D\u52A1\u5668\u7248\u672C:",title_storage_version:"\u5B58\u50A8\u6587\u4EF6\u7248\u672C:",title_files_in_proj:"\u9879\u76EE\u4E2D\u7684\u6587\u4EF6:",title_last_xx_days:"\u6700\u8FD1",title_totally_1:"\u5408\u8BA1: ",title_totally_2:"\u5C0F\u65F6. \u4E13\u6CE8\u65F6\u95F4:",title_totally_3:"\u5C0F\u65F6",full_report:"\u5B8C\u6574\u62A5\u544A",option_7_days:"7\u5929",option_30_days:"30\u5929",option_365_days:"365\u5929",word_top:"\u524D",word_all:"\u5168\u90E8",word_day:"\u5929",link_github_repo_server:"Github\u4ED3\u5E93(\u670D\u52A1\u5668\u7AEF\u4EE3\u7801)",link_github_repo_extension:"Github\u4ED3\u5E93(VSCode\u63D2\u4EF6\u7AEF\u4EE3\u7801)",link_vscode_marketplace:"VSCode\u63D2\u4EF6\u5E02\u573A",show_welcome:"\u6B22\u8FCE/\u5E2E\u52A9\u4FE1\u606F",welcome_subtitle:"\u8FD9\u662FVSCode Coding Tracker\u7684\u7F16\u7A0B\u60C5\u51B5\u62A5\u544A\u9875\u9762, \u4F60\u80FD\u5728\u8FD9\u513F\u770B\u5230\u4F60\u65E5\u5E38\u7684\u7F16\u7A0B\u60C5\u51B5\u7EDF\u8BA1",welcome_intro:"\u7B80\u4ECB:",welcome_watching_time:"\u4F60\u4F7F\u7528(\u67E5\u770B)VSCode\u7684\u65F6\u957F (\u5305\u62ECCoding time)",welcome_coding_time:"\u4F60\u5728VSCode\u4E2D\u5199\u4EE3\u7801(\u6572\u952E\u76D8)\u7684\u65F6\u957F",welcome_tips:"\u63D0\u793A:",welcome_tips_click_hover_title:"\u5C06\u9F20\u6807\u653E\u5230\u6216\u70B9\u51FB\u56FE\u8868\u9879",welcome_tips_click_hover:"\u5C06\u9F20\u6807\u653E\u5230\u56FE\u8868\u9879\u4E0A\u4EE5\u83B7\u5F97\u8BE6\u7EC6\u4FE1\u606F. \u70B9\u51FB\u9879\u76EE\u56FE\u8868\u9879\u53EF\u4EE5\u67E5\u770B\u9488\u5BF9\u67D0\u4E2A\u9879\u76EE\u7684\u8BE6\u7EC6\u62A5\u544A",welcome_tips_language_title:"\u66F4\u6362\u9875\u9762\u8BED\u8A00",welcome_tips_language:"\u5728\u9875\u9762\u4E0A\u65B9\u53EF\u66F4\u6362\u8BED\u8A00, \u5728\u8FD9\u4E2A\u56FE\u6807\u65C1:",welcome_contribution:"\u5E2E\u52A9\u6539\u8FDB:",welcome_contribution_1:"\u5982\u679C\u4F60\u6709\u4EC0\u4E48\u597D\u7684\u70B9\u5B50 \u6216 \u53D1\u73B0\u4E86\u4E00\u4E9Bbug/\u7F3A\u9677. \u6B22\u8FCE\u7ED9\u8FD9\u4E2A\u9879\u76EE\u63D0\u4EA4 ",welcome_contribution_2:" \u6216 ",welcome_btn_close:"OK. \u9690\u85CF\u8FD9\u4E2A\u6B22\u8FCE\u4FE1\u606F",welcome_reopen:"\u4F60\u53EF\u4EE5\u70B9\u51FB\u9875\u9762\u5E95\u90E8\u7684\"\u6B22\u8FCE/\u5E2E\u52A9\u4FE1\u606F\"\u4EE5\u91CD\u65B0\u663E\u793A\u8FD9\u4E2A\u4FE1\u606F",share_content:"\u5206\u4EAB\u6587\u672C",share_font_size:"\u5B57\u53F7",share_mark_line:"\u6807\u8BB0\u7EBF",share_mark_line_max:"\u6700\u5927\u503C",share_mark_line_average:"\u5E73\u5747\u503C",share_mark_line_min:"\u6700\u5C0F\u503C",share_tip:"\u70B9\u51FB\u56FE\u8868\u4E0A\u7684\u9879\u76EE\u53EF \u6DFB\u52A0/\u5220\u9664 \u6807\u8BB0\u70B9",share_btn:"\u4FDD\u5B58\u4E3A\u56FE\u7247\u5206\u4EAB"}},{}],15:[function(a,b,c){b.exports={title_summary:"\u7DE8\u7A0B\u6642\u9593\u7E3D\u7D50",title_24hs:"24\u5C0F\u6642\u7E3D\u7D50",title_projects:"\u9805\u76EE\u8017\u6642",title_projects_tip:"(\u9EDE\u64CA\u5716\u8868\u9805\u76EE\u67E5\u770B\u8A73\u7D30)",title_languages:"\u6309\u8A9E\u8A00\u5206\u985E",title_files:"\u6587\u4EF6\u8017\u6642",title_computers:"\u6309\u8A08\u7B97\u6A5F\u5206\u985E",title_welcome:"\u6B61\u8FCE\u4F86\u5230\u5831\u544A\u9801\u9762",title_share:"\u5206\u4EAB",title_author:"\u4F5C\u8005",title_version:"\u7248\u672C",title_help:"\u5E6B\u52A9",title_license:"\u958B\u6E90\u5354\u8B70",title_components:"\u76F8\u95DC\u7D44\u4EF6",title_connect:"\u93C8\u63A5",title_server_version:"\u670D\u52D9\u5668\u7248\u672C:",title_storage_version:"\u5B58\u5132\u6587\u4EF6\u7248\u672C:",title_files_in_proj:"\u9805\u76EE\u4E2D\u7684\u6587\u4EF6:",title_last_xx_days:"\u6700\u8FD1",title_totally_1:"\u5408\u8A08:",title_totally_2:"\u5C0F\u6642. \u5C08\u6CE8\u6642\u9593:",title_totally_3:"\u5C0F\u6642",full_report:"\u5B8C\u6574\u5831\u544A",option_7_days:"7\u5929",option_30_days:"30\u5929",option_365_days:"365\u5929",word_top:"\u524D",word_all:"\u5168\u90E8",word_day:"\u5929",link_github_repo_server:"Github\u5009\u5EAB(\u670D\u52D9\u5668\u7AEF\u4EE3\u78BC)",link_github_repo_extension:"Github\u5009\u5EAB(VSCode\u63D2\u4EF6\u7AEF\u4EE3\u78BC)",link_vscode_marketplace:"VSCode\u63D2\u4EF6\u5E02\u5834",show_welcome:"\u6B61\u8FCE/\u5E6B\u52A9\u4FE1\u606F",welcome_subtitle:"\u9019\u662FVSCode Coding Tracker\u7684\u7DE8\u7A0B\u60C5\u6CC1\u5831\u544A\u9801\u9762, \u4F60\u80FD\u5728\u9019\u5152\u770B\u5230\u4F60\u65E5\u5E38\u7684\u7DE8\u7A0B\u60C5\u6CC1\u7D71\u8A08",welcome_intro:"\u7C21\u4ECB:",welcome_watching_time:"\u4F60\u4F7F\u7528(\u67E5\u770B)VSCode\u7684\u6642\u9577 (\u5305\u62ECCoding time)",welcome_coding_time:"\u4F60\u5728VSCode\u4E2D\u5BEB\u4EE3\u78BC(\u6572\u9375\u76E4)\u7684\u6642\u9577",welcome_tips:"\u63D0\u793A:",welcome_tips_click_hover_title:"\u5C07\u9F20\u6A19\u653E\u5230\u6216\u9EDE\u64CA\u5716\u8868\u9805",welcome_tips_click_hover:"\u5C07\u9F20\u6A19\u653E\u5230\u5716\u8868\u9805\u4E0A\u4EE5\u7372\u5F97\u8A73\u7D30\u4FE1\u606F. \u9EDE\u64CA\u9805\u76EE\u5716\u8868\u9805\u53EF\u4EE5\u67E5\u770B\u91DD\u5C0D\u67D0\u500B\u9805\u76EE\u7684\u8A73\u7D30\u5831\u544A",welcome_tips_language_title:"\u66F4\u63DB\u9801\u9762\u8A9E\u8A00",welcome_tips_language:"\u5728\u9801\u9762\u4E0A\u65B9\u53EF\u66F4\u63DB\u8A9E\u8A00, \u5728\u9019\u500B\u5716\u6A19\u65C1:",welcome_contribution:"\u5E6B\u52A9\u6539\u9032:",welcome_contribution_1:"\u5982\u679C\u4F60\u6709\u4EC0\u9EBC\u597D\u7684\u9EDE\u5B50 \u6216 \u767C\u73FE\u4E86\u4E00\u4E9Bbug/\u7F3A\u9677. \u6B61\u8FCE\u7D66\u9019\u500B\u9805\u76EE\u63D0\u4EA4",welcome_contribution_2:"\u6216",welcome_btn_close:"OK. \u96B1\u85CF\u9019\u500B\u6B61\u8FCE\u4FE1\u606F",welcome_reopen:"\u4F60\u53EF\u4EE5\u9EDE\u64CA\u9801\u9762\u5E95\u90E8\u7684\"\u6B61\u8FCE/\u5E6B\u52A9\u4FE1\u606F\"\u4EE5\u91CD\u65B0\u986F\u793A\u9019\u500B\u4FE1\u606F",share_content:"\u5206\u4EAB\u6587\u672C",share_font_size:"\u5B57\u865F",share_mark_line:"\u6A19\u8A18\u7DDA",share_mark_line_max:"\u6700\u5927\u503C",share_mark_line_average:"\u5E73\u5747\u503C",share_mark_line_min:"\u6700\u5C0F\u503C",share_tip:"\u9EDE\u64CA\u5716\u8868\u4E0A\u7684\u9805\u76EE\u53EF \u6DFB\u52A0/\u522A\u9664 \u6A19\u8A18\u9EDE",share_btn:"\u4FDD\u5B58\u70BA\u5716\u7247\u5206\u4EAB"}},{}],16:[function(a,b,c){(function(b){function c(){var r="coding-tracker-version",s=a("./utils"),t=a("./statusDialog").init(),u=a("./url").init(),v=a("./i18n"),w=a("./share"),x={summary:a("./charts/summary"),last24hours:a("./charts/24hours"),computer:a("./charts/computer"),language:a("./charts/language"),project:a("./charts/project"),file:a("./charts/file"),allProjects:a("./charts/all_projects"),allLanguages:a("./charts/all_languages"),oneProject:a("./charts/one_project")},y=null,z=$("#selectReportDateRange"),A=$("#selectI18N"),B=$("#welcomeInfo"),C=7,D="";z.on("change",k);A.on("change",function(){return v.setLanguage(A.val())});v.update();A.val(v.language||"en");k();l();i();this.share=w;this.showAllProjects=b;this.showAllLangs=c;this.setAllLangs=d;this.setFilesInProj=e;this.openProjectReport=f;this.hideWelcome=g;this.showWelcome=h;this.shareSummary=j;function b(){x.allProjects.update(y.groupBy.project)}function c(){x.allLanguages.update(y.groupBy.language)}function d(a){x.allLanguages.setRange(a)}function e(a){x.oneProject.setRange(a)}function f(a){p(u.getProjectReportDataURL(C,a),function(a){return x.oneProject.update(a,C)},true)}function g(){B.slideUp();localStorage.setItem(r,D)}function h(){B.slideDown()}function i(){$.get("/",function(a){D=a.serverVersion;$("#version [name]").each(function(b,c){return $(c).text(a[$(c).attr("name")])});s.hasLocalStorage()&&localStorage.getItem(r)!=D&&h()})}function j(){w.shareSummary(m(y),y.total)}function k(){C=Number(z.val());p(u.getBasicReportDataURL(C),n)}function l(){var b=Date.now();p(u.getLast24HoursDataURL(b),a);function a(a){x.last24hours.update(s.expandAndShortGroupByHoursObject(a.groupBy.hour,b));o(a.total,$("#counterLast24Hs"))}}function m(a){var b=new Date,c=new Date(b);c.setDate(c.getDate()-C+1);var d=$.extend(true,{},a.groupBy.day),e=s.expandGroupByDaysObject(d,c,b);return e}function n(a){y=a;x.summary.update(m(a));o(a.total,$("#counterSummary"));x.computer.update(a.groupBy.computer);x.language.update(a.groupBy.language);x.project.update(a.groupBy.project);x.file.update(a.groupBy.file)}function o(a,b){var c=s.convertUnit2Hour({total:a}).total;b.find("[name]").each(function(a,b){return $(b).text(Number(c[$(b).attr("name")]).toFixed(2))})}function p(a,b,c){c||t.loading();$.ajax({method:"GET",url:a,success:function success(a){return b(a),t.hide()},error:q})}function q(a){var b="",c=function getXHRInfo(){return"\n  readyState: "+a.readyState+"\n  status: "+a.status+"\n  statusText: "+a.statusText};if(a){if("readyState"in a&&a.readyState<4||"status"in a&&a.status!=200)b="Network exception!"+c();if(a.responseJSON&&typeof a.responseJSON.error=="string")b="Server response:\n  "+a.responseJSON.error}if(!b)b=a;t.failed(b)}}b.app=new c}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./charts/24hours":1,"./charts/all_languages":2,"./charts/all_projects":3,"./charts/computer":4,"./charts/file":5,"./charts/language":6,"./charts/one_project":7,"./charts/project":8,"./charts/summary":9,"./i18n":12,"./share":17,"./statusDialog":18,"./url":19,"./utils":20}],17:[function(a,b,c){var k=a("./utils"),l=k.convertUnit2Hour,m=k.orderByName,n=k.object2array,o=k.getEachFieldToFixed2,p=k.merge,q=a("./echartsUtils"),r=q.createEChartsSeries,s=q.AXIS_HOURS,t=a("./form"),u=t.encode,v=t.fill,w=null,x=$("#chartImageDownloader")[0],y=null,z=null,A={text:"",fontSizeMain:"24",fontSizeSub:"18"},B={backgroundColor:"#ffffff"},C=null,D=300;function d(){x.href=y.getDataURL(B);x.download="chart.png";x.click()}function e(a,b){var c=l(a),d=m(n(c)),e=d.map(function(a){return a.name}),f=l({total:b}).total.watching.toFixed(2),g=d.length,h=(f/g).toFixed(2);A.text="My Coding Report\n  "+f+" hours in last "+g+" days. "+("(Average: "+h+" hours/day)");z={xAxis:{data:e},yAxis:p(s,{boundaryGap:[0,0.2]}),grid:{top:100,left:20,right:30,bottom:20,containLabel:true},series:[r("line","watching").showMaxMarkPoint("max time").setLineSmooth().setLineColor("#66bb6a").setItemColor("#66bb6a").setAreaColor("#c8e6c9").setValues(o(d,"watching")).toObject()]};j()}function f(a){C&&clearTimeout(C);C=setTimeout(g,a||D)}function g(){var a=u(w),b=a.text.trim().split("\n"),c=_slicedToArray(b,2),d=c[0],e=c[1],f=Number(a.fontSizeMain)||24,g=Number(a.fontSizeSub)||18;z.title={text:d,subtext:e,textStyle:{fontSize:f},subtextStyle:{fontSize:g}};var h=[];w.find(".btn-markline.btn-success").each(function(a,b){var c=$(b).data("type"),d={position:"middle",formatter:c+": {c} hs"};h.push({type:c,label:{normal:d,emphasis:d}})});z.series[0].markLine={data:h};z.grid.top=(f+g)*1.8;y.setOption(z)}function h(a){a.toggleClass("btn-success").toggleClass("btn-default");g()}function i(a){if(!a)return;var b=z.series[0].markPoint;if(a.componentType=="markPoint"){b.data=b.data.filter(function(b){return b.name!=a.name})}else if(a.componentType=="series"){b.data.push({name:"custom_"+Date.now(),xAxis:a.dataIndex,yAxis:a.value})}g()}function j(){if(!w){w=$("#dlgShare");w.on("shown.bs.modal",function(){if(!y){y=echarts.init($("#chartShare")[0]);y.on("click",i)}v(w,A);g()})}w.modal()}b.exports={shareSummary:e,saveChart:d,delayUpdate:f,onMarkLineBtnClick:h}},{"./echartsUtils":10,"./form":11,"./utils":20}],18:[function(a,b,c){function d(){var d=$("#dlgStatus"),e=d.find(".modal-title"),f=d.find(".alert-info"),g=d.find(".alert-danger"),h=g.find("code"),i=function show(){return d.modal({keyboard:false,backdrop:"static"})},j=function hide(){return d.modal("hide")};return{loading:a,failed:b,hide:c};function a(){e.text("Loading report...");f.show();g.hide();i()}function b(a){e.text("Load Failed!");f.hide();g.show();h.html(typeof a=="string"?a:JSON.stringify(a,null,"  "));i()}function c(){setTimeout(j,50)}}b.exports={init:d}},{}],19:[function(a,b,c){var d="/ajax/report",e="",f={init:function init(){e=(location.href.match(/[\?\&]token\=(.+?)(\&|$)/)||["",""])[1];return f},getBasicReportDataURL:function getBasicReportDataURL(a){return d+"/recent?days="+a+"&token="+e},getLast24HoursDataURL:function getLast24HoursDataURL(a){return d+"/last24hs?ts="+a+"&token="+e},getProjectReportDataURL:function getProjectReportDataURL(a,b){return d+"/project?project="+b+"&days="+a+"&token="+e}};b.exports=f},{}],20:[function(a,b,c){var q={expandGroupByDaysObject:function expandGroupByDaysObject(a,b,c){b=new Date(b);if(b.getTime()>c.getTime())throw new Error("startDate could not bigger than endDate");var d=h(c),f="",g={};do{f=h(b);g[f]=a[f]||e();b.setDate(b.getDate()+1)}while(d>f);return g},expandAndShortGroupByHoursObject:function expandAndShortGroupByHoursObject(a,b){var c={},d=24,f=new Date(b),g="";while(d--){g=i(f);c[g]=a[g]||e();f.setHours(f.getHours()-1)}return c},orderByName:j,orderByWatchingTime:k,object2array:l,convertUnit2Hour:function convertUnit2Hour(a){return o(a,3600*1000)},convertUnit2Minutes:function convertUnit2Minutes(a){return o(a,60*1000)},getEachFieldToFixed2:m,generateChartOption:n,merge:p,getShortProjectName:f,hasLocalStorage:d};b.exports=q;function d(){return typeof localStorage!="undefined"}function e(){return{coding:0,watching:0}}function f(a){return(a.match(/.*(^|[\\\/])(.+)$/)||[0,0,a])[2]}function g(a){return a==0?"00":a<10?"0"+a:""+a}function h(a){return a.getFullYear()+"-"+g(a.getMonth()+1)+"-"+g(a.getDate())}function i(a){return h(a)+" "+g(a.getHours())+":00"}function j(a,b){var c=b?-1:1,d=-c;a.sort(function(e,a){return e.name>a.name?c:d});return a}function k(a,b){a.sort(b?function(c,a){return a.watching-c.watching}:function(c,a){return c.watching-a.watching});return a}function l(a){return Object.keys(a).map(function(b){a[b].name=b;return a[b]})}function m(a,b){return a.map(function(a){return Number(a[b]).toFixed(2)})}function n(a,b,c){for(var d,e=arguments.length,f=Array(e>3?e-3:0),g=3;g<e;g++){f[g-3]=arguments[g]}return(d=$).extend.apply(d,[true,{},{name:a,type:b,data:c}].concat(f))}function o(a,b){var c=Array.isArray(a)?[]:{};for(var d in a){var e=a[d];c[d]={coding:e.coding/b,watching:e.watching/b}}return c}function p(){for(var a,b=arguments.length,c=Array(b),d=0;d<b;d++){c[d]=arguments[d]}return(a=$).extend.apply(a,[true,{}].concat(c))}},{}]},{},[16]);
//# sourceMappingURL=index.js.map