/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/base/ManagedObject','sap/ui/model/message/MessageModel','./Message','./ControlMessageProcessor'],function(q,E,M,c,d,C){"use strict";var e=E.extend("sap.ui.core.message.MessageManager",{constructor:function(){E.apply(this,arguments);this.mProcessors={};this.mObjects={};this.mMessages={};var h=sap.ui.getCore().getConfiguration().getHandleValidation();if(h){sap.ui.getCore().attachValidationSuccess(h,this._handleSuccess,this);sap.ui.getCore().attachValidationError(h,this._handleError,this);sap.ui.getCore().attachParseError(h,this._handleError,this);sap.ui.getCore().attachFormatError(h,this._handleError,this);}},metadata:{publicMethods:["addMessages","removeMessages","removeAllMessages","registerMessageProcessor","unregisterMessageProcessor","registerObject","unregisterObject","getMessageModel","destroy"]}});e.prototype._handleError=function(o,h){if(!this.oControlMessageProcessor){this.oControlMessageProcessor=new C();}if(h){var a=o.getParameter("element");var p=o.getParameter("property");var t=a.getId()+'/'+p;var P=this.oControlMessageProcessor.getId();var T=o.sId==="formatError";if(this.mMessages[P]&&this.mMessages[P][t]){this._removeMessages(this.mMessages[P][t],true);}var r={};r[a.getId()]={properties:{},fieldGroupIds:a.getFieldGroupIds?a.getFieldGroupIds():undefined};r[a.getId()].properties[p]=true;var m=new d({type:sap.ui.core.MessageType.Error,message:o.getParameter("message"),target:t,processor:this.oControlMessageProcessor,technical:T,references:r,validation:true});this.addMessages(m);}o.cancelBubble();};e.prototype._handleSuccess=function(o,h){if(!this.oControlMessageProcessor){this.oControlMessageProcessor=new C();}if(h){var a=o.getParameter("element");var p=o.getParameter("property");var t=a.getId()+'/'+p;var P=this.oControlMessageProcessor.getId();if(this.mMessages[P]&&this.mMessages[P][t]){this._removeMessages(this.mMessages[P][t],true);}}o.cancelBubble();};e.prototype.addMessages=function(m){var o=m;if(!m){return;}else if(q.isArray(m)){for(var i=0;i<m.length;i++){o=m[i];this._importMessage(o);}}else{this._importMessage(m);}this._updateMessageModel();};e.prototype._importMessage=function(m){var s=m.getTarget();var p=m.getMessageProcessor().getId();if(!this.mMessages[p]){this.mMessages[p]={};}var a=this.mMessages[p][s]?this.mMessages[p][s]:[];a.push(m);this.mMessages[p][s]=a;};e.prototype._pushMessages=function(){var t=this;q.each(this.mProcessors,function(i,p){var m=t.mMessages[i]?t.mMessages[i]:{};t._sortMessages(m);p.setMessages(q.extend(true,{},m));});};e.prototype._sortMessages=function(m){var s={'Error':0,'Warning':1,'Success':2,'Info':3};q.each(m,function(t,f){f.sort(function(a,b){return s[a.type]-s[b.type];});});};e.prototype._updateMessageModel=function(){var m=[];var o=this.getMessageModel();q.each(this.mMessages,function(p,a){q.each(a,function(k,v){m=q.merge(m,v);});});this._pushMessages();o.setData(m);};e.prototype.removeAllMessages=function(){this.aMessages=[];this.mMessages={};this._updateMessageModel();};e.prototype.removeMessages=function(m){this._removeMessages(m);};e.prototype._removeMessages=function(m,o){var t=this;if(!m||(q.isArray(m)&&m.length==0)){return;}else if(q.isArray(m)){var O=m.slice(0);for(var i=0;i<O.length;i++){if(!o||O[i].validation){t._removeMessage(O[i]);}}}else if(m instanceof d&&(!o||m.validation)){t._removeMessage(m);}else{q.each(m,function(T,a){t._removeMessages(a,o);});}this._updateMessageModel();};e.prototype._removeMessage=function(m){var a=this.mMessages[m.getMessageProcessor().getId()];if(!a){return;}var b=a[m.getTarget()];if(b){for(var i=0;i<b.length;i++){var o=b[i];if(q.sap.equal(o,m)&&!o.getPersistent()){b.splice(i,1);--i;}}}if(a[m.getTarget()].length===0){delete a[m.getTarget()];}};e.prototype.onMessageChange=function(o){var O=o.getParameter('oldMessages');var n=o.getParameter('newMessages');this.removeMessages(O);this.addMessages(n);};e.prototype.registerMessageProcessor=function(p){var P=p.getId();if(!this.mProcessors[P]){this.mProcessors[P]=p;p.attachMessageChange(this.onMessageChange,this);if(P in this.mMessages){this._pushMessages();}}};e.prototype.unregisterMessageProcessor=function(p){this.removeMessages(this.mMessages[p.getId()]);delete this.mProcessors[p.getId()];p.detachMessageChange(this.onMessageChange,this);};e.prototype.registerObject=function(o,h){if(!o instanceof M){q.sap.log.error(this+" : "+o.toString()+" is not an instance of sap.ui.base.ManagedObject");return;}o.attachValidationSuccess(h,this._handleSuccess,this);o.attachValidationError(h,this._handleError,this);o.attachParseError(h,this._handleError,this);o.attachFormatError(h,this._handleError,this);};e.prototype.unregisterObject=function(o){if(!o instanceof M){q.sap.log.error(this+" : "+o.toString()+" is not an instance of sap.ui.base.ManagedObject");return;}o.detachValidationSuccess(this._handleSuccess);o.detachValidationError(this._handleError);o.detachParseError(this._handleError);o.detachFormatError(this._handleError);};e.prototype.destroy=function(){q.sap.log.warning("Deprecated: Do not call destroy on a MessageManager");};e.prototype.getMessageModel=function(){if(!this.oMessageModel){this.oMessageModel=new c(this);this.oMessageModel.setData([]);}return this.oMessageModel;};return e;});