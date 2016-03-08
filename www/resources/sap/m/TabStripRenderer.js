/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TabStripItem','./TabStrip'],function(q,T,a){"use strict";var b={};b.render=function(r,C){if(!C.getVisible()){return;}this.beginTabStrip(r,C);if(sap.ui.Device.system.phone===true){r.renderControl(C.getAggregation('_select'));}else{this.renderLeftOverflowButtons(r,C);this.beginTabContainer(r,C);this.renderTabs(r,C);this.endTabContainer(r);this.renderRightOverflowButtons(r,C);this.renderTouchArea(r,C);}this.endTabStrip(r);};b.renderTabs=function(r,C){var t=C.getItems(),s=C.getSelectedItem();t.forEach(function(o,i,t){var I=s&&s===o.getId();this.renderTab(r,C,o,I);}.bind(this));};b.renderTab=function(r,C,t,s){var i=T._CSS_CLASS+(s?" selected":""),I=t.getModified(),S=sap.ui.getCore().byId(C.getSelectedItem());if(I){i+=" "+i+" sapMTabContainerItemModified";}r.write("<div id='"+t.getId()+"' class='"+i+"'");r.writeElementData(t);r.writeAccessibilityState(t,c(t,C.getParent(),S));r.write(">");r.write("<span id='"+g(t)+"' class='"+T._CSS_CLASS_LABEL+"'>");this.renderTabText(r,t);r.write("</span>");this.renderTabCloseButton(r,t);r.write("</div>");};b.renderTabText=function(r,t){var s=t.getText();if(s.length>T.DISPLAY_TEXT_MAX_LENGHT){r.writeEscaped(s.slice(0,T.DISPLAY_TEXT_MAX_LENGHT));r.write('...');}else{r.writeEscaped(s);}};b.renderTabCloseButton=function(r,t){r.write("<div class='sapMTSTabCloseBtnCnt'>");r.renderControl(t.getAggregation("_closeButton"));r.write("</div>");};b.beginTabStrip=function(r,C){r.write("<div");r.addClass("sapMTabStrip");r.writeControlData(C);r.writeClasses();r.write(">");};b.endTabStrip=function(r){r.write("</div>");};b.beginTabContainer=function(r,C){r.write("<div id='"+C.getId()+"-tabContainer' class='sapMTSTabContainer'>");r.write("<div id='"+C.getId()+"-tabs'  class='sapMTSTabs'");r.writeAccessibilityState(C,{role:"tablist"});r.write(">");};b.endTabContainer=function(r){r.write("</div>");r.write("</div>");};b.renderLeftOverflowButtons=function(r,C){r.write("<div id='"+C.getId()+"-leftOverflowButtons' class='sapMTSLeftOverflowButtons'>");if(!sap.ui.Device.system.phone){r.renderControl(C._oLeftArrowButton);}r.write("</div>");};b.renderRightOverflowButtons=function(r,C){r.write("<div id='"+C.getId()+"-rightOverflowButtons'  class='sapMTSRightOverflowButtons'>");if(!sap.ui.Device.system.phone){r.renderControl(C._oRightArrowButton);}r.write("</div>");};b.renderTouchArea=function(r,C){r.write("<div id='"+C.getId()+"-touchArea'  class='sapMTSTouchArea'>");r.renderControl(C.getAggregation('_select'));r.renderControl(C.getAddButton());r.write("</div>");};function g(t){return t.getId()+"-label";}function c(i,t,s){var A={role:"tab"},d=a._ariaStaticTexts.closable.getId()+" ";d+=i.getModified()?a._ariaStaticTexts.modified.getId():a._ariaStaticTexts.notModified.getId();A["describedby"]=d;A["labelledby"]=g(i);if(t&&t.getRenderer&&t.getRenderer().getContentDomId){A["controls"]=t.getRenderer().getContentDomId(t);}if(s&&s.getId()===i.getId()){A["selected"]="true";}else{A["selected"]="false";}return A;}return b;},true);