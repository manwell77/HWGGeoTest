/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','./ListItemBase','./library'],function(q,E,L,l){"use strict";var C=L.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:sap.ui.core.VerticalAlign.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});var T=E.extend("sap.m.TablePopin",{onfocusin:function(e){if(e.srcControl===this||!q(e.target).is(":sapFocusable")){this.getParent().focus();}}});C.prototype.init=function(){L.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[];};C.prototype.onAfterRendering=function(){L.prototype.onAfterRendering.call(this);this._checkTypeColumn();};C.prototype.exit=function(){L.prototype.exit.call(this);this._checkTypeColumn(false);this._destroyClonedHeaders();if(this._oPopin){this._oPopin.destroy(true);this._oPopin=null;this.removePopin();}};C.prototype.setVisible=function(v){L.prototype.setVisible.call(this,v);if(!v&&this.hasPopin()){this.removePopin();}return this;};C.prototype.getTable=function(){var p=this.getParent();if(p instanceof sap.m.Table){return p;}if(p&&p.getMetadata().getName()=="sap.m.Table"){return p;}};C.prototype.getPopin=function(){if(!this._oPopin){this._oPopin=new T({id:this.getId()+"-sub"}).addEventDelegate({ontouchstart:this.ontouchstart,ontouchmove:this.ontouchmove,ontap:this.ontap,ontouchend:this.ontouchend,ontouchcancel:this.ontouchcancel,onsaptabnext:this.onsaptabnext,onsaptabprevious:this.onsaptabprevious},this).setParent(this,null,true);}return this._oPopin;};C.prototype.$Popin=function(){return this.$("sub");};C.prototype.hasPopin=function(){return!!(this._oPopin&&this.getTable().hasPopin());};C.prototype.removePopin=function(){this.$Popin().remove();};C.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable");};C.prototype.updateSelectedDOM=function(s,t){L.prototype.updateSelectedDOM.apply(this,arguments);t.children().attr("aria-selected",s);if(this.hasPopin()){this.$Popin().attr("aria-selected",s);this.$("subcell").attr("aria-selected",s);}};C.prototype._checkTypeColumn=function(n){if(n==undefined){n=this._needsTypeColumn();}if(this._bNeedsTypeColumn!=n){this._bNeedsTypeColumn=n;this.informList("TypeColumnChange",n);}};C.prototype._needsTypeColumn=function(){var t=this.getType(),m=sap.m.ListType;return this.getVisible()&&(t==m.Detail||t==m.Navigation||t==m.DetailAndActive);};sap.m.ColumnListItem.prototype._addClonedHeader=function(h){return this._aClonedHeaders.push(h);};sap.m.ColumnListItem.prototype._destroyClonedHeaders=function(){this._aClonedHeaders.forEach(function(c){c.destroy(true);});this._aClonedHeaders=[];};C.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true);};C.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false);};C.prototype._toggleActiveClass=function(s){if(this.hasPopin()){this.$Popin().toggleClass("sapMLIBActive",s);}};return C;},true);
