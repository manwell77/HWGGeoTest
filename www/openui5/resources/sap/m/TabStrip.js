/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/delegate/ItemNavigation','sap/ui/base/ManagedObject','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/InvisibleText','./AccButton','./TabStripItem','./TabStripSelect','sap/ui/Device'],function(q,C,I,a,M,S,b,A,T,c,D){"use strict";var d=C.extend("sap.m.TabStrip",{metadata:{library:"sap.m",properties:{hasSelect:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabStripItem",multiple:true,singularName:"item"},downArrowButton:{type:"sap.m.Button",multiple:false,singularName:"downArrowButton"},addButton:{type:"sap.m.Button",multiple:false,singularName:"addButton"},_select:{type:'sap.m.TabStripSelect',multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:'sap.m.TabStripItem',group:"Misc"}},events:{selectionChange:{parameters:{item:{type:"sap.m.TabStripItem"}}},itemCloseRequest:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabStripItem"}}},itemPress:{parameters:{item:{type:"sap.m.TabStripItem"}}}}},constructor:function(i,s){var h=false;if(!s&&typeof i==='object'){s=i;}if(s){h=s['hasSelect'];delete s['hasSelect'];}sap.ui.base.ManagedObject.prototype.constructor.apply(this,arguments);this.setProperty('hasSelect',h,true);}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");d._ICONBUTTONS={LeftArrowButton:"slim-arrow-left",RightArrowButton:"slim-arrow-right",DownArrowButton:"slim-arrow-down",AddButton:"add",DeclineButton:"decline"};d.SELECT_ITEMS_ID_PREFIX='SelectItem-';d._SCROLLSIZE=320;d._MINDRAGOFFSET=sap.ui.Device.support.touch?15:5;d._SCROLL_ANIMATION_DURATION=sap.ui.getCore().getConfiguration().getAnimation()?500:0;d.prototype.init=function(){this._bDoScroll=!sap.ui.Device.system.phone;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oLeftArrowButton=null;this._oRightArrowButton=null;this._oTouchStartX=null;if(!sap.ui.Device.system.phone){this._oScroller=new S(this,this.getId()+"-tabs",{horizontal:true,vertical:false,nonTouchScrolling:true});}};d.prototype.exit=function(){this._bRtl=null;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(this._oLeftArrowButton){this._oLeftArrowButton.destroy();this._oLeftArrowButton=null;}if(this._oRightArrowButton){this._oRightArrowButton.destroy();this._oRightArrowButton=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this._removeItemNavigation();};d.prototype.onBeforeRendering=function(){var g=this.getDownArrowButton(),h=this.getAddButton();if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this._oLeftArrowButton=this._generateButton(d._ICONBUTTONS.LeftArrowButton);this._oRightArrowButton=this._generateButton(d._ICONBUTTONS.RightArrowButton);if(g&&g.getIcon()!=d._ICONBUTTONS.DownArrowButton){g.setIcon(I.getIconURI(d._ICONBUTTONS.DownArrowButton));}if(h&&h.getIcon()!=d._ICONBUTTONS.AddButton){h.setIcon(I.getIconURI(d._ICONBUTTONS.AddButton));}};d.prototype.onAfterRendering=function(){var i=this.getItems(),t=[];if(this._oScroller){this._oScroller.setIconTabBar(this,q.proxy(this._checkOverflow,this),null);}i.forEach(function(g){var h=g.getDomRef();q(h).attr("tabindex","-1");t.push(h);});this._addItemNavigation(this.getDomRef("tabContainer"),t);this._adjustScrolling();this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this._adjustScrolling,this));};d.prototype.getFocusDomRef=function(){var t=sap.ui.getCore().byId(this.getSelectedItem());if(!t){return null;}return t.getDomRef();};d.prototype.applyFocusInfo=function(F){if(F.focusDomRef){q(F.focusDomRef).focus();}};d.prototype._addItemNavigation=function(h,t){if(!this._oItemNavigation){this._oItemNavigation=new a();}this._oItemNavigation.setRootDomRef(h);this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setCycling(false);this._oItemNavigation.setPageSize(5);this.addDelegate(this._oItemNavigation);};d.prototype._checkScrolling=function(){var t=this.getDomRef("tabs"),s=t&&(t.scrollWidth>this.getDomRef("tabContainer").clientWidth);this.$().toggleClass("sapMTSScrollable",s);return s;};d.prototype._checkOverflow=function(){var t=this.getDomRef("tabs"),g=this.getDomRef("tabContainer"),s,h,i,j=false,k=false;if(this._checkScrolling()&&t&&g){if(this._bRtl&&D.browser.firefox){s=-g.scrollLeft;}else{s=g.scrollLeft;}h=t.scrollWidth;i=g.clientWidth;if(Math.abs(h-i)===1){h=i;}if(s>0){j=true;}if((h>i)&&(s+i<h)){k=true;}this.$().toggleClass("sapMTSScrollBack",j).toggleClass("sapMTSScrollForward",k);}else{this.$().toggleClass("sapMTSScrollBack",false).toggleClass("sapMTSScrollForward",false);}};d.prototype._adjustScrolling=function(){this._iMaxOffsetLeft=Math.abs(this.$("tabContainer").width()-this.$("tabs").width());this._checkOverflow();};d.prototype._generateButton=function(B){var t=this,g;switch(B){case d._ICONBUTTONS.LeftArrowButton:g=new A({type:sap.m.ButtonType.Transparent,icon:I.getIconURI(B),tooltip:r.getText("TABSTRIP_SCROLL_BACK"),tabIndex:"-1",ariaHidden:"true",press:function(E){t._scroll(-d._SCROLLSIZE,d._SCROLL_ANIMATION_DURATION);}});break;case d._ICONBUTTONS.RightArrowButton:g=new A({type:sap.m.ButtonType.Transparent,icon:I.getIconURI(B),tooltip:r.getText("TABSTRIP_SCROLL_FORWARD"),tabIndex:"-1",ariaHidden:"true",press:function(E){t._scroll(d._SCROLLSIZE,d._SCROLL_ANIMATION_DURATION);}});break;case d._ICONBUTTONS.DownArrowButton:g=new A({type:sap.m.ButtonType.Transparent,icon:I.getIconURI(B)});break;case d._ICONBUTTONS.AddButton:g=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:I.getIconURI(B)});break;case d._ICONBUTTONS.DeclineButton:g=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:B});break;default:break;}return g;};d.prototype._removeItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};d.prototype._scroll=function(i,g){var s=this.getDomRef("tabContainer").scrollLeft,h;if(this._bRtl&&D.browser.firefox){h=s-i;if(h<-this._iMaxOffsetLeft){h=-this._iMaxOffsetLeft;}if(h>0){h=0;}}else{h=s+i;if(h<0){h=0;}if(h>this._iMaxOffsetLeft){h=this._iMaxOffsetLeft;}}this._oScroller.scrollTo(h,0,g);this._iCurrentScrollLeft=h;};d.prototype._scrollIntoView=function(i,g){var $=this.$("tabs"),h=i.$(),t=$.innerWidth()-$.width(),j=h.outerWidth(true),k=h.position().left-t/2,l=this.getDomRef("tabContainer"),s=l.scrollLeft,m=this.$("tabContainer").width(),n=s;if(k<0||k>m-j){if(this._bRtl&&D.browser.firefox){if(k<0){n+=k+j-m;}else{n+=k;}}else{if(k<0){n+=k;}else{n+=k+j-m;}}this._iCurrentScrollLeft=n;this._oScroller.scrollTo(n,0,g);}};d.prototype._createSelect=function(t){var s,g,h,i={type:sap.m.SelectType.IconOnly,autoAdjustWidth:true,icon:sap.ui.core.IconPool.getIconURI("slim-arrow-down"),tooltip:r.getText("TABSTRIP_OPENED_TABS"),change:function(E){g=E.getParameters()['selectedItem'];h=o.findTabStripItemFromSelectItem.call(this,g);this._activateItem(h);}.bind(this)};s=new c(i);o.addItemsToSelect.call(this,s,t);return s;};d.prototype.onsapselect=function(E){E.setMarked();E.preventDefault();this._activateItem(E.srcControl);};d.prototype.onsapdelete=function(E){var i=q("#"+E.target.id).control(0),s=i.getId()===this.getSelectedItem(),g=function(){this._moveToNextItem(s);};this._removeItem(i,g);};d.prototype._moveToNextItem=function(s){var i=this.getItems().length,g=this._oItemNavigation.getFocusedIndex(),n=i===g?--g:g,N=this.getItems()[n],F=function(){this._oItemNavigation.focusItem(n);};if(s){this.setSelectedItem(N);this.fireSelectionChange({item:N});}q.sap.delayedCall(0,this,F);};d.prototype._activateItem=function(i){if(i&&i instanceof sap.m.TabStripItem){this.fireItemPress({item:i});if(!this.getSelectedItem()||this.getSelectedItem()!==i.getId()){this.setSelectedItem(i);this.fireSelectionChange({item:i});}}};d.prototype.addAggregation=function(s,O,g){if(s==='items'){o.handleItemsAggregation.call(this,['addAggregation',O,g],true);}return C.prototype.addAggregation.call(this,s,O,g);};d.prototype.insertAggregation=function(s,O,i,g){if(s==='items'){o.handleItemsAggregation.call(this,['insertAggregation',O,i,g],true);}return C.prototype.insertAggregation.call(this,s,O,i,g);};d.prototype.removeAggregation=function(s,O,g){if(s==='items'){o.handleItemsAggregation.call(this,['removeAggregation',O,g]);}return C.prototype.removeAggregation.call(this,s,O,g);};d.prototype.removeAllAggregation=function(s,g){if(s==='items'){o.handleItemsAggregation.call(this,['removeAllAggregation',null,g]);}return C.prototype.removeAllAggregation.call(this,s,g);};d.prototype.destroyAggregation=function(s,g){if(s==='items'){o.handleItemsAggregation.call(this,['destroyAggregation',g]);}return C.prototype.destroyAggregation.call(this,s,g);};d.prototype.setSelectedItem=function(s){if(!s){return;}if(s.$().length>0){this._scrollIntoView(s,500);}u(this.getItems(),s);f.call(this,s.getId());if(this.getHasSelect()){var g=o.findSelectItemFromTabStripItem.call(this,s);this.getAggregation('_select').setSelectedItem(g);}return d.prototype.setAssociation.call(this,"selectedItem",s,true);};d.prototype.setProperty=function(p,v,s){var R;R=C.prototype.setProperty.call(this,p,v,s);if(p==='hasSelect'){if(v){if(!this.getAggregation('_select')){R=this.setAggregation('_select',this._createSelect(this.getItems()));}}else{R=this.destroyAggregation('_select');}}return R;};var e={attachItemEventListeners:function(O){O.detachItemClosePressed(e.handleItemClosePressed.bind(this));O.detachItemPropertyChanged(e.handleTabStripItemPropertyChanged.bind(this));O.attachItemPropertyChanged(e.handleTabStripItemPropertyChanged.bind(this));O.attachItemClosePressed(e.handleItemClosePressed.bind(this));},detachItemEventListeners:function(O){if(!O||typeof O!=='object'||!O.getMetadata||O.getMetadata().getName()!=='sap.m.TabStripItem'){var i=this.getItems();i.forEach(function(g){if(typeof g!=='object'||!g.getMetadata||g.getMetadata().getName()!=='sap.m.TabStripItem'){return;}return e.detachItemEventListeners.call(this,g);}.bind(this));}},handleTabStripItemPropertyChanged:function(E){var s=o.findSelectItemFromTabStripItem.call(this,E.getSource());s.setProperty(E['mParameters'].propertyKey,E['mParameters'].propertyValue);},handleItemClosePressed:function(E){this._removeItem(E.getSource());}};d.prototype._removeItem=function(i,g){var t;if(i.getMetadata().getName()!=='sap.m.TabStripItem'){q.sap.log.error('Expecting instance of a TabStripSelectItem, given: ',i);}if(i.getId().indexOf(d.SELECT_ITEMS_ID_PREFIX)!==-1){t=o.findTabStripItemFromSelectItem.call(this,i);}else{t=i;}if(this.fireItemCloseRequest({item:t})){this.removeAggregation('items',t);this._moveToNextItem(i.getId()===this.getSelectedItem());if(g){g.call(this);}}};var o={handleItemsAggregation:function(g,i){var s='items',F=g[0],O=g[1],n=[s];g.forEach(function(h,j){if(j>0){n.push(h);}});if(i){e.attachItemEventListeners.call(this,O);}else{e.detachItemEventListeners.call(this,O);}if(s!=="items"){return this;}if(this.getHasSelect()){o.handleSelectItemsAggregation.call(this,n,i,F,O);}return this;},handleSelectItemsAggregation:function(g,i,F,O){var s=this.getAggregation('_select'),h;if(F==='destroyAggregation'&&!s){return;}if(O===null||typeof O!=='object'){return s[F]['apply'](s,g);}if(i){h=o.createSelectItemFromTabStripItem.call(this,O);}else{h=o.findSelectItemFromTabStripItem.call(this,O);}g.forEach(function(j,k){if(typeof j==='object'){g[k]=h;}});return s[F]['apply'](s,g);},addItemsToSelect:function(s,i){i.forEach(function(g){var h=o.createSelectItemFromTabStripItem.call(this,g);s.addAggregation('items',h);if(g.getId()===this.getSelectedItem()){s.setSelectedItem(h);}},this);},createSelectItemFromTabStripItem:function(t){if(!t){return;}var s=t.getMetadata().getName();if(s!=='sap.m.TabStripItem'){q.sap.log.error('Expecting instance of "sap.m.TabContainerItem": '+s+' given.');return;}var g=new sap.m.TabStripItem({id:d.SELECT_ITEMS_ID_PREFIX+t.getId(),text:t.getText(),modified:t.getModified(),itemClosePressed:function(E){e.handleItemClosePressed.call(this,E);}.bind(this)}).addEventDelegate({ontap:function(E){var h=E.srcControl;if(h instanceof A){h.fireItemClosePressed({item:h});}else if(h instanceof sap.ui.core.Icon){h=h.getParent&&h.getParent().getParent&&h.getParent().getParent();h.fireItemClosePressed({item:h});}else if(h instanceof T){h.fireTabSelected({item:h});}}});return g;},findTabStripItemFromSelectItem:function(t){var i,s=t.getId().replace(d.SELECT_ITEMS_ID_PREFIX,''),g=this.getItems();for(i=0;i<g.length;i++){if(g[i].getId()===s){return g[i];}}},findSelectItemFromTabStripItem:function(t){var i,s,g=d.SELECT_ITEMS_ID_PREFIX+t.getId();if(this.getHasSelect()){s=this.getAggregation('_select').getItems();for(i=0;i<s.length;i++){if(s[i].getId()===g){return s[i];}}}}};d._ariaStaticTexts={closable:new b({text:r.getText("TABSTRIP_ITEM_CLOSABLE")}).toStatic(),modified:new b({text:r.getText("TABSTRIP_ITEM_MODIFIED")}).toStatic(),notModified:new b({text:r.getText("TABSTRIP_ITEM_NOT_MODIFIED")}).toStatic()};function u(i,s){var g="false";i.forEach(function(h){if(h.$()){g="false";if(s&&s.getId()===h.getId()){g="true";}h.$().attr("aria-selected",g);}});}function f(s){if(this.$("tabs")){this.$("tabs").children(".selected").removeClass("selected");q("#"+s).addClass("selected");}}d.prototype.changeItemState=function(i,s){T.CSS_CLASS_STATE="sapMTabSelectListItemModified";T.CSS_CLASS_STATEINVISIBLE="sapMTabSelectListItemModifiedInvisible";T._CSS_CLASS_LABEL="sapMTabContainerItemLabel";T.YET_ANOTHER_CSS_CLASS_FOR_THE_SAME_THING_THAT_LOST_ME_20_MINUTES_IN_CONFUSION="sapMTabContainerItemModified";var $;var g=this.getItems();g.forEach(function(h){if(i===h.getId()){$=q(h.$());if(s===true&&!$.hasClass(T.YET_ANOTHER_CSS_CLASS_FOR_THE_SAME_THING_THAT_LOST_ME_20_MINUTES_IN_CONFUSION)){$.addClass(T.YET_ANOTHER_CSS_CLASS_FOR_THE_SAME_THING_THAT_LOST_ME_20_MINUTES_IN_CONFUSION);}else{$.removeClass(T.YET_ANOTHER_CSS_CLASS_FOR_THE_SAME_THING_THAT_LOST_ME_20_MINUTES_IN_CONFUSION);}}});};d.prototype.ontouchstart=function(E){var t=q(E.target).control(0);if(t instanceof T||t instanceof A||t instanceof sap.ui.core.Icon||t instanceof c){this._oTouchStartX=E.changedTouches[0].pageX;}};d.prototype.ontouchend=function(E){var t,i;if(!this._oTouchStartX){return;}t=q(E.target).control(0);i=Math.abs(E.changedTouches[0].pageX-this._oTouchStartX);if(i<d._MINDRAGOFFSET){if(t instanceof T){this._activateItem(t);}else if(t instanceof sap.m.AccButton){if(t&&t.getParent&&t.getParent()instanceof T){t=t.getParent();this._removeItem(t);}}else if(t instanceof sap.ui.core.Icon){if(t&&t.getParent&&t.getParent().getParent&&t.getParent().getParent()instanceof T){t=t.getParent().getParent();this._removeItem(t);}}this._oTouchStartX=null;}};return d;},false);
