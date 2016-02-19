/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/core/UIComponent','sap/ui/core/mvc/View','sap/ui/core/routing/async/Views','sap/ui/core/routing/sync/Views'],function($,E,U,V,a,s){"use strict";var b=E.extend("sap.ui.core.routing.Views",{constructor:function(o){if(!o){o={};}this._oViews={};this._oComponent=o.component;if(this._oComponent){}E.apply(this,arguments);function c(){if(jQuery.sap.getUriParameters().get("sap-ui-xx-asyncRouting")==="true"){jQuery.sap.log.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Views");return true;}return false;}var d=(o.async===undefined)?c():o.async;var e=d?a:s;for(var f in e){this[f]=e[f];}},metadata:{publicMethods:["getView","setView"]},getView:function(o){return this._getView(o).loaded();},setView:function(v,o){this._checkViewName(v);this._oViews[v]=o;return this;},destroy:function(){var p;E.prototype.destroy.apply(this);for(p in this._oViews){if(this._oViews.hasOwnProperty(p)){this._oViews[p].destroy();}}this._oViews=undefined;this.bIsDestroyed=true;return this;},attachCreated:function(d,f,l){return this.attachEvent("created",d,f,l);},detachCreated:function(f,l){return this.detachEvent("created",f,l);},fireCreated:function(A){return this.fireEvent("created",A);},_getView:function(o){if(this._oComponent&&o.id){o=$.extend({},o,{id:this._oComponent.createId(o.id)});}return this._getViewWithGlobalId(o);},_checkViewName:function(v){if(!v){$.sap.log.error("A name for the view has to be defined",this);}}});return b;});
