/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Element','./library'],function(q,E,l){"use strict";var C=E.extend("sap.ui.core.CustomData",{metadata:{library:"sap.ui.core",properties:{key:{type:"string",group:"Data",defaultValue:null},value:{type:"any",group:"Data",defaultValue:null},writeToDom:{type:"boolean",group:"Data",defaultValue:false}}}});C.prototype.setValue=function(v){this.setProperty("value",v,true);var c=this.getParent();if(c&&c.getDomRef()){var o=this._checkWriteToDom(c);if(o){c.$().attr(o.key,o.value);}}return this;};C.prototype._checkWriteToDom=function(r){if(!this.getWriteToDom()){return null;}var k=this.getKey();var v=this.getValue();if(typeof v!="string"){q.sap.log.error("CustomData with key "+k+" should be written to HTML of "+r+" but the value is not a string.");return null;}if(!(sap.ui.core.ID.isValid(k))||(k.indexOf(":")!=-1)){q.sap.log.error("CustomData with key "+k+" should be written to HTML of "+r+" but the key is not valid (must be a valid sap.ui.core.ID without any colon).");return null;}if(k==q.sap._FASTNAVIGATIONKEY){v=/^\s*(x|true)\s*$/i.test(v)?"true":"false";}else if(k.indexOf("sap-ui")==0){q.sap.log.error("CustomData with key "+k+" should be written to HTML of "+r+" but the key is not valid (may not start with 'sap-ui').");return null;}return{key:"data-"+k,value:v};};return C;});
