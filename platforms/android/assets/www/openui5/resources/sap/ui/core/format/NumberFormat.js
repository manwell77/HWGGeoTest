/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/core/LocaleData'],function(q,B,L){"use strict";var N=B.extend("sap.ui.core.format.NumberFormat",{constructor:function(f){throw new Error();}});var n={INTEGER:"integer",FLOAT:"float",CURRENCY:"currency",PERCENT:"percent"};var g={ARABIC:"arabic",INDIAN:"indian"};var r={FLOOR:"floor",CEILING:"ceiling",TOWARDS_ZERO:"towards_zero",AWAY_FROM_ZERO:"away_from_zero",HALF_FLOOR:"half_floor",HALF_CEILING:"half_ceiling",HALF_TOWARDS_ZERO:"half_towards_zero",HALF_AWAY_FROM_ZERO:"half_away_from_zero"};var R={};R[r.FLOOR]=Math.floor;R[r.CEILING]=Math.ceil;R[r.TOWARDS_ZERO]=function(f){return f>0?Math.floor(f):Math.ceil(f);};R[r.AWAY_FROM_ZERO]=function(f){return f>0?Math.ceil(f):Math.floor(f);};R[r.HALF_TOWARDS_ZERO]=function(f){return f>0?Math.ceil(f-0.5):Math.floor(f+0.5);};R[r.HALF_AWAY_FROM_ZERO]=function(f){return f>0?Math.floor(f+0.5):Math.ceil(f-0.5);};R[r.HALF_FLOOR]=function(f){return Math.ceil(f-0.5);};R[r.HALF_CEILING]=Math.round;N.RoundingMode=r;N.oDefaultIntegerFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:0,groupingEnabled:false,groupingType:g.ARABIC,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:true,type:n.INTEGER,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.TOWARDS_ZERO,emptyString:NaN};N.oDefaultFloatFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingType:g.ARABIC,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:n.FLOAT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN};N.oDefaultPercentFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,groupingEnabled:true,groupingType:g.ARABIC,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",percentSign:"%",isInteger:false,type:n.PERCENT,showMeasure:false,style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN};N.oDefaultCurrencyFormat={minIntegerDigits:1,maxIntegerDigits:99,groupingEnabled:true,groupingType:g.ARABIC,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:n.CURRENCY,showMeasure:true,currencyCode:true,currencyContext:'standard',style:"standard",parseAsString:false,roundingMode:N.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN};N.getInstance=function(f,l){return this.getFloatInstance(f,l);};N.getFloatInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.FLOAT);F.oFormatOptions=q.extend(false,{},this.oDefaultFloatFormat,o,f);return F;};N.getIntegerInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.INTEGER);F.oFormatOptions=q.extend(false,{},this.oDefaultIntegerFormat,o,f);return F;};N.getCurrencyInstance=function(f,l){var F=this.createInstance(f,l),C=f&&f.currencyContext,o=this.getLocaleFormatOptions(F.oLocaleData,n.CURRENCY,C);F.oFormatOptions=q.extend(false,{},this.oDefaultCurrencyFormat,o,f);return F;};N.getPercentInstance=function(f,l){var F=this.createInstance(f,l),o=this.getLocaleFormatOptions(F.oLocaleData,n.PERCENT);F.oFormatOptions=q.extend(false,{},this.oDefaultPercentFormat,o,f);return F;};N.createInstance=function(f,l){var F=q.sap.newObject(this.prototype),p;if(f instanceof sap.ui.core.Locale){l=f;f=undefined;}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();}F.oLocale=l;F.oLocaleData=L.getInstance(l);if(f){if(f.pattern){p=this.parseNumberPattern(f.pattern);q.each(p,function(s,o){f[s]=o;});}if(f.emptyString!==undefined){}}return F;};N.getLocaleFormatOptions=function(l,t,C){var o={},s;switch(t){case n.PERCENT:s=l.getPercentPattern();break;case n.CURRENCY:s=l.getCurrencyPattern(C);break;default:s=l.getDecimalPattern();}o=this.parseNumberPattern(s);o.plusSign=l.getNumberSymbol("plusSign");o.minusSign=l.getNumberSymbol("minusSign");o.decimalSeparator=l.getNumberSymbol("decimal");o.groupingSeparator=l.getNumberSymbol("group");o.percentSign=l.getNumberSymbol("percentSign");o.pattern=s;switch(t){case n.FLOAT:case n.PERCENT:o.minFractionDigits=0;o.maxFractionDigits=99;break;case n.INTEGER:o.minFractionDigits=0;o.maxFractionDigits=0;o.groupingEnabled=false;break;case n.CURRENCY:o.minFractionDigits=undefined;o.maxFractionDigits=undefined;break;}return o;};N.parseNumberPattern=function(f){var m=0;var M=0;var h=0;var G=false;var s=g.ARABIC;var S=f.indexOf(";");if(S!==-1){f=f.substring(0,S);}var j=0;for(var i=0;i<f.length;i++){var C=f[i];if(C===","){if(G){s=g.INDIAN;}G=true;continue;}else if(C==="."){j=1;continue;}else if(j==0&&C==="0"){m++;}else if(j==1){if(C==="0"){M++;h++;}else if(C==="#"){h++;}}}return{minIntegerDigits:m,minFractionDigits:M,maxFractionDigits:h,groupingEnabled:G,groupingType:s};};N.prototype.format=function(v,m){if(q.isArray(v)){m=v[1];v=v[0];}var i="",f="",G="",s="",h="",p="",P=0,l=0,j=0,k=v<0,D=-1,o=q.extend({},this.oFormatOptions),t,S;if(v===o.emptyString||(isNaN(v)&&isNaN(o.emptyString))){return"";}if(o.decimals!==undefined){o.minFractionDigits=o.decimals;o.maxFractionDigits=o.decimals;}if(o.shortLimit===undefined||Math.abs(v)>=o.shortLimit){S=a(v,o.style,o.precision,o.shortDecimals||o.maxFractionDigits,this.oLocaleData);if(S&&S.formatString!="0"){v=v/S.magnitude;if(o.shortDecimals!==undefined){o.minFractionDigits=o.shortDecimals;o.maxFractionDigits=o.shortDecimals;}o.roundingMode=N.RoundingMode.HALF_AWAY_FROM_ZERO;}}if(o.precision!==undefined){o.minFractionDigits=0;o.maxFractionDigits=e(v,o.precision);}if(o.type==n.PERCENT){v=N._shiftDecimalPoint(v,2);}if(o.type==n.CURRENCY){var u=this.oLocaleData.getCurrencyDigits(m);if(o.maxFractionDigits===undefined){o.maxFractionDigits=u;}if(o.minFractionDigits===undefined){o.minFractionDigits=u;}}if(typeof v=="number"){v=c(v,o.maxFractionDigits,o.roundingMode);}h=this.convertToDecimal(v);if(h=="NaN"){return h;}if(k){h=h.substr(1);}D=h.indexOf(".");if(D>-1){i=h.substr(0,D);f=h.substr(D+1);}else{i=h;}if(i.length<o.minIntegerDigits){i=q.sap.padLeft(i,"0",o.minIntegerDigits);}else if(i.length>o.maxIntegerDigits){i=q.sap.padLeft("","?",o.maxIntegerDigits);}if(f.length<o.minFractionDigits){f=q.sap.padRight(f,"0",o.minFractionDigits);}else if(f.length>o.maxFractionDigits){f=f.substr(0,o.maxFractionDigits);}l=i.length;if(o.groupingEnabled&&l>3){if(o.groupingType==g.ARABIC){P=l%3||3;j=3;}else{P=l%2+1||3;j=2;}G=i.substr(0,P);while(P<i.length-1){G+=o.groupingSeparator;G+=i.substr(P,j);P+=j;}G+=i.substr(P);i=G;}if(k){s=o.minusSign;}s+=i;if(f){s+=o.decimalSeparator+f;}if(S&&S.formatString){s=S.formatString.replace(S.valueSubString,s);s=s.replace(/'.'/g,".");}if(o.type==n.CURRENCY){p=o.pattern;t=p.split(";");if(t.length===2){p=k?t[1]:t[0];if(k){s=s.substring(1);}}if(!o.currencyCode){m=this.oLocaleData.getCurrencySymbol(m);}if(o.showMeasure&&m){p=p.replace(/\u00a4/,m);}else{p=p.replace(/\s*\u00a4\s*/,"");}if(k){p=p.replace(/-/,o.minusSign);}p=p.replace(/[0#.,]+/,s);s=p;}if(o.type==n.PERCENT){p=o.pattern;s=p.replace(/[0#.,]+/,s);s=s.replace(/%/,o.percentSign);}if(sap.ui.getCore().getConfiguration().getOriginInfo()){s=new String(s);s.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString()};}return s;};N.prototype.parse=function(v){var o=this.oFormatOptions,p=d(o.plusSign+o.minusSign),G=d(o.groupingSeparator),D=d(o.decimalSeparator),s="^\\s*(["+p+"]?(?:[0-9"+G+"]+|[0-9"+G+"]*"+D+"[0-9]*)(?:[eE][+-][0-9]+)?)\\s*$",f="^\\s*(["+p+"]?[0-9"+G+"]+)\\s*$",h=new RegExp(G,"g"),i=new RegExp(D,"g"),P=this.oLocaleData.getPercentPattern(),j=this.oLocaleData.getNumberSymbol("percentSign"),k,l,m,t,u,C,w=0,S,E;if(v===""){E=o.emptyString;if(o.parseAsString&&(o.emptyString===0||isNaN(o.emptyString))){E=o.emptyString+"";}if(o.type===n.CURRENCY){return[E,undefined];}else{return E;}}if(P.charAt(0)==="%"){s=s.slice(0,1)+"%?"+s.slice(1);}else if(P.charAt(P.length-1)==="%"){s=s.slice(0,s.length-1)+"%?"+s.slice(s.length-1);}v=v.replace(/\s/g,"");S=b(v,this.oFormatOptions.style,this.oLocaleData);if(S){v=S.number;k=new RegExp(s);}else if(o.isInteger){k=new RegExp(f);}else if(o.type===n.CURRENCY){t="[^\\d\\s+-]*";m="(?:^("+t+")"+s.substring(1,s.length-1)+"$)|(?:^"+s.substring(1,s.length-1)+"("+t+")\\s*$)";k=new RegExp(m);}else{k=new RegExp(s);}if(!k.test(v)){return o.type===n.CURRENCY?null:NaN;}if(o.type===n.CURRENCY){u=k.exec(v);if(u[2]){v=u[2];C=u[1]||undefined;}else{v=u[3];C=u[4]||undefined;}if(C&&!o.showMeasure){return null;}}if(C){C=this.oLocaleData.getCurrencyCodeBySymbol(C)||C;}v=v.replace(h,"");v=v.replace(o.plusSign,"+");v=v.replace(o.minusSign,"-");v=v.replace(/^\+/,"");if(S){v=v.replace(i,".");v=N._shiftDecimalPoint(v,Math.round(Math.log(S.factor)/Math.LN10));}if(o.isInteger){w=o.parseAsString?v:parseInt(v,10);}else{v=v.replace(i,".");if(v.indexOf(j)!==-1){l=true;v=v.replace(j,"");}w=o.parseAsString?v:parseFloat(v);if(l){w=N._shiftDecimalPoint(w,-2);}}if(o.parseAsString){w=N._shiftDecimalPoint(v,0);}return o.type===n.CURRENCY?[w,C]:w;};N.prototype.convertToDecimal=function(v){var V=""+v,f,s,D,F,E,p;if(V.indexOf("e")==-1&&V.indexOf("E")==-1){return V;}var h=V.match(/^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/);f=h[1]=="-";s=h[2].replace(/\./g,"");D=h[3]?h[3].length:0;F=h[4]?h[4].length:0;E=parseInt(h[5],10);if(E>0){if(E<F){p=D+E;V=s.substr(0,p)+"."+s.substr(p);}else{V=s;E-=F;for(var i=0;i<E;i++){V+="0";}}}else{if(-E<D){p=D+E;V=s.substr(0,p)+"."+s.substr(p);}else{V=s;E+=D;for(var i=0;i>E;i--){V="0"+V;}V="0."+V;}}if(f){V="-"+V;}return V;};N._shiftDecimalPoint=function(v,s){if(typeof s!=="number"){return NaN;}var E=v.toString().toLowerCase().split("e");if(typeof v==="number"){s=E[1]?(+E[1]+s):s;return+(E[0]+"e"+s);}else if(typeof v==="string"){if(parseInt(v,10)===0&&s>=0){return v;}v=E[0];var D=v.indexOf("."),A,i,f;if(D===-1){v=v+".";D=v.length-1;}if(E[1]){D+=(+E[1]);}A=D+s;if(A<=0){v=q.sap.padLeft(v,'0',v.length-A+1);A=1;}else if(A>=v.length-1){v=q.sap.padRight(v,'0',A+1);A=v.length-1;}v=v.replace(".","");i=v.substring(0,A);f=v.substring(A);i=i.replace(/^(-?)0+(\d)/,"$1$2");return i+(f?("."+f):"");}else{return null;}};function a(v,s,p,D,l){var S,k,P=p!==undefined;if(!P){p=2;}if(s!="short"&&s!="long"){return S;}for(var i=0;i<14;i++){k=Math.pow(10,i);if(c(Math.abs(v)/k,p-1)<10){break;}}var f=v/k,D=P?e(f,p):D,h=c(Math.abs(f),D);var j="other";if(h==0){j="zero";}else if(h==1){j="one";}else if(h==2){j="two";}else if(h>2&&h<=5){j="few";}else if(h>5&&h<=10){j="many";}var C=l.getDecimalFormat(s,k.toString(),j);if(!C||C=="0"){return S;}else{S={};S.formatString=C;var m=C.match(/0+\.*0*/);if(m){S.valueSubString=m[0];var o=S.valueSubString.indexOf(".");if(o==-1){S.decimals=0;S.magnitude=k*Math.pow(10,1-S.valueSubString.length);}else{S.decimals=S.valueSubString.length-o-1;S.magnitude=k*Math.pow(10,1-o);}}else{S.magnitude=1;}}return S;}function b(v,s,l){var f;var F=1;if(s!="short"&&s!="long"){return;}var k=10;var p;var C;while(k<1e14){for(var i=0;i<6;i++){switch(i){case 0:p="zero";break;case 1:p="one";break;case 2:p="two";break;case 3:p="few";break;case 4:p="many";break;default:p="other";}C=l.getDecimalFormat(s,k.toString(),p);if(C){C=C.replace(/[\s\u00a0]/g,"");C=C.replace(/'.'/g,".");var m=C.match(/0+\.*0*/);if(m){var V=m[0];var u=C.replace(V,"");var I=v.indexOf(u);if(I>=0){f=v.replace(u,"");F=k;break;}}}}if(f){break;}k=k*10;}if(!f){return;}return{number:f,factor:F};}function c(v,m,s){if(typeof v!=="number"){return NaN;}s=s||N.RoundingMode.HALF_AWAY_FROM_ZERO;m=parseInt(m,10);if(typeof s==="function"){v=s(v,m);}else{if(!m){return R[s](v);}v=N._shiftDecimalPoint(R[s](N._shiftDecimalPoint(v,m)),-m);}return v;}function d(s){return s.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");}function e(v,p){var i=Math.floor(Math.log(Math.abs(v))/Math.LN10);return Math.max(0,p-i-1);}return N;});
