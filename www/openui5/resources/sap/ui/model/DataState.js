/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/Object'],function(q,B){"use strict";var D=B.extend("sap.ui.model.DataState",{metadata:{},constructor:function(){this.mProperties={modelMessages:[],controlMessages:[],laundering:false,originalValue:null,originalInternalValue:null,value:null,invalidValue:null,internalValue:null,dirty:false};this.mChangedProperties={};}});D.prototype._sortMessages=function(m){var s={'Error':0,'Warning':1,'Success':2,'Info':3};m.sort(function(a,b){return s[a.type]-s[b.type];});};D.prototype.setProperty=function(p,v){if(p==="modelMessages"||p==="controlMessages"){v=v||[];}v=v===undefined?null:v;if(q.sap.equal(this.mProperties[p],v)){delete this.mChangedProperties[p];}else{if(!this.mChangedProperties[p]){this.mChangedProperties[p]={};}this.mChangedProperties[p]={oldValue:q.isArray(this.mProperties[p])?this.mProperties[p].slice(0):this.mProperties[p],value:v};}if(p==="modelMessages"||p==="controlMessages"){var o=[].concat(this.mProperties["modelMessages"],this.mProperties["controlMessages"]);this._sortMessages(o);this.mChangedProperties["messages"]={oldValue:o,value:this.getMessages().slice(0)};if(this.mChangedProperties["messages"].oldValue.length===0&&this.mChangedProperties["messages"].value.length===0){delete this.mChangedProperties["messages"];}}if(this.isDirty()!==this.mProperties["dirty"]){this.mChangedProperties.dirty={oldValue:!this.isDirty(),value:this.isDirty()};}else{delete this.mChangedProperties.dirty;}return this;};D.prototype.calculateChanges=function(){for(var p in this.mChangedProperties){var c=this.mChangedProperties[p].value;if(!q.sap.equal(this.mProperties[p],c)){if(q.isArray(c)){c=c.slice(0);}this.mProperties[p]=c;}}return this;};D.prototype.getProperty=function(p){var r;var c;var g=function(n){return((this.mChangedProperties[n]&&"value"in this.mChangedProperties[n])?this.mChangedProperties[n].value:this.mProperties[n]);}.bind(this);switch(p){case'messages':var m=[],C=g('controlMessages'),M=g('modelMessages');if(M||C){m=m.concat(M?M:[],C?C:[]);this._sortMessages(m);}r=m;break;case'controlDirty':c=!!(this.mChangedProperties.invalidValue&&this.mChangedProperties.invalidValue.value);r=c;break;case'dirty':var v=this.mChangedProperties&&this.mChangedProperties.value&&("value"in this.mChangedProperties.value)?this.mChangedProperties.value.value:this.mProperties.value;var o=this.mChangedProperties&&this.mChangedProperties.originalValue&&("value"in this.mChangedProperties.originalValue)?this.mChangedProperties.originalValue.value:this.mProperties.originalValue;c=!!(this.mChangedProperties.invalidValue&&this.mChangedProperties.invalidValue.value);r=c||!q.sap.equal(v,o);break;default:r=g(p);}return r;};D.prototype.getMessages=function(){return this.getProperty("messages");};D.prototype.setModelMessages=function(m){return this.setProperty("modelMessages",m);};D.prototype.getModelMessages=function(){return this.getProperty("modelMessages");};D.prototype.setControlMessages=function(m){return this.setProperty("controlMessages",m);};D.prototype.getControlMessages=function(){return this.getProperty("controlMessages");};D.prototype.isDirty=function(){return this.getProperty("dirty");};D.prototype.isControlDirty=function(){return this.getProperty("controlDirty");};D.prototype.isLaundering=function(){return this.getProperty("laundering");};D.prototype.setLaundering=function(l){return this.setProperty("laundering",l);};D.prototype.getValue=function(v){return this.getProperty("value");};D.prototype.setValue=function(v){return this.setProperty("value",v);};D.prototype.getInvalidValue=function(){return this.getProperty("invalidValue");};D.prototype.setInvalidValue=function(i){return this.setProperty("invalidValue",i);};D.prototype.getOriginalValue=function(){return this.getProperty("originalValue");};D.prototype.setOriginalValue=function(o){return this.setProperty("originalValue",o);};D.prototype.changed=function(n){if(n===false){this.mChangedProperties={};}return!q.isEmptyObject(this.mChangedProperties);};D.prototype.getChanges=function(){return this.mChangedProperties;};return D;});
