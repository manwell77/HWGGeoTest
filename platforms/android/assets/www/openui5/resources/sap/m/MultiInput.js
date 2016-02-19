/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Input','./Token','./library','sap/ui/core/Item'],function(q,I,T,l,a){"use strict";var M=I.extend("sap.m.MultiInput",{metadata:{library:"sap.m",properties:{enableMultiLineMode:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},tokenizer:{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}}}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");M.prototype._sAriaMultiInputContainTokenId=new sap.ui.core.InvisibleText({text:r.getText("MULTIINPUT_ARIA_CONTAIN_TOKEN")}).toStatic().getId();M.prototype.init=function(){var t=this;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");I.prototype.init.call(this);this._bIsValidating=false;this._tokenizer=new sap.m.Tokenizer();this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.attachTokenChange(function(b){t.fireTokenChange(b.getParameters());t.invalidate();if(t._bUseDialog&&t._tokenizerInPopup&&t._tokenizer.getParent()instanceof sap.m.Dialog){t._showAllTokens(t._tokenizerInPopup);return;}else{t._setContainerSizes();var f=q.sap.containsOrEquals(t.getDomRef(),document.activeElement);if(b.getParameter("type")==="tokensChanged"&&b.getParameter("removedTokens").length>0&&f){t.focus();}if(b.getParameter("type")==="removed"&&t._isMultiLineMode){var L=t.getTokens().length;if(L>1){t.getTokens()[L-1].setVisible(true);}else{t._showAllTokens(t._tokenizer);}}}});this.setShowValueHelp(true);this.setShowSuggestion(true);this.addStyleClass("sapMMultiInput");this.attachSuggestionItemSelected(function(e){var i=null;var b=null;if(this._hasTabularSuggestions()){i=e.getParameter("selectedRow");}else{i=e.getParameter("selectedItem");if(i){b=new T({text:i.getText(),key:i.getKey()});}}var o=t._tokenizer.getTokens().length;if(i){var c=this.getValue();t._tokenizer.addValidateToken({text:c,token:b,suggestionObject:i,validationCallback:function(v){if(v){t.setValue("");}}});}if(t._bUseDialog&&t._tokenizerInPopup&&t._tokenizerInPopup.getParent()instanceof sap.m.Dialog){var n=t._tokenizer.getTokens().length;if(o<n){var N=t._tokenizer.getTokens()[n-1];t._updateTokenizerInPopup(N);t.setValue("");}if(t._tokenizerInPopup.getVisible()===false){t._tokenizerInPopup.setVisible(true);}t._setAllTokenVisible(t._tokenizerInPopup);if(t._oList instanceof sap.m.Table){t._oList.addStyleClass("sapMInputSuggestionTableHidden");}else{t._oList.destroyItems();}var s=t._oSuggestionPopup.getScrollDelegate();if(s){s.scrollTo(0,0,0);}t._oPopupInput.focus();}});this.attachLiveChange(function(e){t._tokenizer.removeSelectedTokens();if(t._bUseDialog&&t._isMultiLineMode){var v=e.getParameter("newValue");if(t._oSuggestionPopup&&t._oSuggestionPopup.getContent().length>1&&v.length>0){t._tokenizerInPopup.setVisible(false);}else{t._tokenizerInPopup.setVisible(true);t._setAllTokenVisible(t._tokenizerInPopup);}}else{t._setContainerSizes();t._tokenizer.scrollToStart();}});sap.ui.Device.orientation.attachHandler(this._onOrientationChange,this);this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(this,function(){t._setContainerSizes();});if(!(this._bUseDialog&&this._oSuggestionPopup)){this.attachSuggestionItemSelected(function(){setTimeout(function(){t._tokenizer.scrollToEnd();},0);});}};M.prototype._updateTokenizerInPopup=function(t){var n=t.clone();n.attachDelete(this._tokenizerInPopup._onDeleteToken,this._tokenizerInPopup);n.attachPress(this._tokenizerInPopup._onTokenPress,this._tokenizerInPopup);this._tokenizerInPopup.insertToken(n,0);};M.prototype._updateTokenizerInMultiInput=function(){var t=this._tokenizer.getTokens().length;var b=this._tokenizerInPopup.getTokens().length;var i=0,R=[];for(i=0;i<t;i++){var o=this._tokenizer.getTokens()[i];var j=0;while(j<b&&this._tokenizerInPopup.getTokens()[j].getId().indexOf(o.getId())<0){j++;}if(j===b){R.push(o);}}if(R.length>0){for(i=0;i<R.length;i++){this._tokenizer.removeToken(R[i]);}this.fireTokenChange({addedTokens:[],removedTokens:[R],type:sap.m.Tokenizer.TokenChangeType.TokensChanged});}};M.prototype._setAllTokenVisible=function(t){if(t.getVisible()===false){t.setVisible(true);}var b=t.getTokens();if(b.length>0){var i=0;for(i=0;i<b.length;i++){b[i].setVisible(true);}}};M.prototype._setAllTokenInvisible=function(){var t=this.getTokens();if(t.length>0){var i=0;for(i=0;i<t.length;i++){t[i].setVisible(false);}}};M.prototype._showIndicator=function(){var t=this.getTokens(),b=t.length;this._tokenizer.setVisible(true);if(b>1){if(this.getValue()!==""){this.setValue()==="";}var i=0;for(i=0;i<b-1;i++){t[i].setVisible(false);}var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");var s="<span class=\"sapMMultiInputIndicator\">"+m.getText("MULTIINPUT_SHOW_MORE_TOKENS",b-1)+"</span>";this.$().find(".sapMTokenizer").after(s);}this._bShowIndicator=true;};M.prototype._showAllTokens=function(t){this._setAllTokenVisible(t);this._removeIndicator();};M.prototype._removeIndicator=function(){this.$().find(".sapMMultiInputIndicator").remove();this._bShowIndicator=false;};M.prototype.setEnableMultiLineMode=function(m){this.setProperty("enableMultiLineMode",m,true);this.closeMultiLine();var t=this;if(this._bUseDialog){m=true;}if(m){this._showIndicator();this._isMultiLineMode=true;if(this.getDomRef()){setTimeout(function(){t._setContainerSizes();},0);}}else{this._isMultiLineMode=false;this._showAllTokens(this._tokenizer);this.setValue("");if(this.getDomRef()){setTimeout(function(){t._setContainerSizes();t._scrollAndFocus();},0);}}return this;};M.prototype.openMultiLine=function(){this.$("border").addClass("sapMMultiInputMultiModeBorder");if(this._$input){this._$input.parent().addClass("sapMMultiInputMultiModeInputContainer");}this.$().find(".sapMInputValHelp").attr("tabindex","-1");var p=this.getParent();this._originalOverflow=null;if(p&&p.$&&p.$().css("overflow")==="hidden"){this._originalOverflow=p.$().css("overflow");p.$().css("overflow","visible");}var P;if(this.$().parent('[class*="sapUiRespGridSpan"]')){P=this.$().parent('[class*="sapUiRespGridSpan"]');}else if(this.$().parents(".sapUiRFLContainer")){P=this.$().parents(".sapUiRFLContainer");}if(P&&P.length>0&&P.css("overflow")==="hidden"){P.css("overflow","visible");}};M.prototype.closeMultiLine=function(){this.$("border").removeClass("sapMMultiInputMultiModeBorder");if(this._$input){this._$input.parent().removeClass("sapMMultiInputMultiModeInputContainer");}this.$().find(".sapMInputValHelp").removeAttr("tabindex");if(this._originalOverflow){var p=this.getParent();p.$().css("overflow",this._originalOverflow);}};M.prototype._onOrientationChange=function(){this._setContainerSizes();};M.prototype.getScrollDelegate=function(){return this._tokenizer._oScroller;};M.prototype.exit=function(){if(this._sResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId;}I.prototype.exit.apply(this,arguments);};M.prototype._setContainerSizes=function(){var t=this.getDomRef();if(!t){return;}var $=this.$();if(this.getTokens().length>0){$.find(".sapMMultiInputBorder").addClass("sapMMultiInputNarrowBorder");}else{$.find(".sapMMultiInputBorder").removeClass("sapMMultiInputNarrowBorder");}q($.find(".sapMInputBaseInner")[0]).removeAttr("style");var b=$.find(".sapMMultiInputBorder").width();var s=$.children(".sapMMultiInputShadowDiv")[0];var c=$.find(".sapMMultiInputBorder").find(".sapMMultiInputIndicator");q(s).text(this.getValue());var i=q(s).width();var d=q(c).width();var e=this._tokenizer.getScrollWidth();var f=$.find(".sapMInputValHelp").outerWidth(true);if(d!==null&&this._isMultiLineMode&&this._bShowIndicator){i=d;}var g=e+i+f;var h;var j=1;if(!this._bUseDialog&&this._isMultiLineMode&&!this._bShowIndicator&&this.$().find(".sapMMultiInputBorder").length>0){var k=this.$().find(".sapMMultiInputBorder"),m=parseInt((k.css("max-height")||0),10),S=k[0].scrollHeight,n=b-f;if(m<S){n=n-17;}this._tokenizer.setPixelWidth(n);this.$("inner").css("width",n+"px");}else{if(g<b){h=i+b-g;}else{if(e===0&&i>b){h=b;}else{h=i+j;e=b-h-f;}}q($.find(".sapMInputBaseInner")[0]).css("width",h+"px");this._tokenizer.setPixelWidth(e);}if(this.getPlaceholder()){this._sPlaceholder=this.getPlaceholder();}if(this.getTokens().length>0){this.setPlaceholder("");}else{this.setPlaceholder(this._sPlaceholder);}if(this._bUseDialog&&this._isMultiLineMode&&this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()&&this._tokenizerInPopup&&this._tokenizerInPopup.getTokens().length>0){var p=this._tokenizerInPopup.getTokens().length,L=this._tokenizerInPopup.getTokens()[p-1],o=L.$(),u=L.$().outerWidth(),P=this._oSuggestionPopup.$().find(".sapMDialogScrollCont").width(),B=parseFloat(sap.m.BaseFontSize)||16,n=P-2*B;if(n<u){o.outerWidth(n,true);o.css("overflow","hidden");o.css("text-overflow","ellipsis");o.css("white-space","nowrap");}}};M.prototype.onAfterRendering=function(){I.prototype.onAfterRendering.apply(this,arguments);if(!(this._bUseDialog&&this._isMultiLineMode)){this._setContainerSizes();}};M.prototype.addValidator=function(v){this._tokenizer.addValidator(v);};M.prototype.removeValidator=function(v){this._tokenizer.removeValidator(v);};M.prototype.removeAllValidators=function(){this._tokenizer.removeAllValidators();};M.prototype.onsapnext=function(e){if(e.isMarked()){return;}var f=q(document.activeElement).control()[0];if(!f){return;}if(this._tokenizer===f||this._tokenizer.$().find(f.$()).length>0){this._scrollAndFocus();}};M.prototype.onsapbackspace=function(e){if(this.getCursorPosition()>0||!this.getEditable()||this.getValue().length>0){return;}sap.m.Tokenizer.prototype.onsapbackspace.apply(this._tokenizer,arguments);e.preventDefault();e.stopPropagation();};M.prototype.onsapdelete=function(e){if(!this.getEditable()){return;}if(this.getValue()&&!this._completeTextIsSelected()){return;}sap.m.Tokenizer.prototype.onsapdelete.apply(this._tokenizer,arguments);};M.prototype.onkeydown=function(e){if(e.ctrlKey||e.metaKey){if(e.which===q.sap.KeyCodes.A){var v=this.getValue();if(document.activeElement===this._$input[0]){if(this._$input.getSelectedText()!==v){this.selectText(0,v.length);}else if(this._tokenizer){if(!v&&this._tokenizer.getTokens().length){this._tokenizer.focus();}this._tokenizer.selectAllTokens(true);}}else if(document.activeElement===this._tokenizer.$()[0]){if(this._tokenizer._iSelectedToken===this._tokenizer.getTokens().length){this.selectText(0,v.length);}}e.preventDefault();}}};M.prototype.onpaste=function(e){var o;if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var s=this._tokenizer._parseString(o);setTimeout(function(){if(s){var i=0;for(i=0;i<s.length;i++){this.setValue(s[i]);this._validateCurrentText();}this.cancelPendingSuggest();}}.bind(this),0);};M.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return;}if(this.getCursorPosition()===0){if(e.srcControl===this){sap.m.Tokenizer.prototype.onsapprevious.apply(this._tokenizer,arguments);e.preventDefault();}}};M.prototype._scrollAndFocus=function(){this._tokenizer.scrollToEnd();this.$().find("input").focus();};M.prototype.onsaphome=function(e){sap.m.Tokenizer.prototype.onsaphome.apply(this._tokenizer,arguments);};M.prototype.onsapend=function(e){sap.m.Tokenizer.prototype.onsapend.apply(this._tokenizer,arguments);e.preventDefault();};M.prototype.onsapenter=function(e){this._validateCurrentText();if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments);}this.focus();};M.prototype._checkFocus=function(){return this.getDomRef()&&q.sap.containsOrEquals(this.getDomRef(),document.activeElement);};M.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup;var n=false;var N=false;var b=this._checkFocus();if(p instanceof sap.m.Popover){if(e.relatedControlId){n=q.sap.containsOrEquals(p.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef());N=q.sap.containsOrEquals(this._tokenizer.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef());}}if(!N&&!n&&!this._isMultiLineMode){this._setContainerSizes();this._tokenizer.scrollToEnd();}if(this._bIsValidating){if(I.prototype.onsapfocusleave){I.prototype.onsapfocusleave.apply(this,arguments);}return;}if(I.prototype.onsapfocusleave){I.prototype.onsapfocusleave.apply(this,arguments);}if(!this._bUseDialog&&!n&&e.relatedControlId!==this.getId()&&e.relatedControlId!==this._tokenizer.getId()&&!N&&!(this._isMultiLineMode&&this._bShowIndicator)){this._validateCurrentText(true);}if(!this._bUseDialog&&this._isMultiLineMode&&!this._bShowIndicator){if(b||n){return;}this.closeMultiLine();this._showIndicator();var t=this;setTimeout(function(){t._setContainerSizes();},0);}sap.m.Tokenizer.prototype.onsapfocusleave.apply(this._tokenizer,arguments);if(!this._bUseDialog&&this._isMultiLineMode&&this._bShowIndicator){var $=this.$().find(".sapMMultiInputBorder");$.scrollTop(0);}};M.prototype.cloneTokenizer=function(t){var c=new sap.m.Tokenizer();var b=t.getTokens();if(b.length>0){for(var i=b.length-1;i>=0;i--){var n=b[i].clone();c.addToken(n);}}return c;};M.prototype._processMultiLine=function(e){if(this._bUseDialog){if(e.target===this._$input[0]||e.target.className.indexOf("sapMToken")>-1&&e.target.className.indexOf("sapMTokenIcon")<0||e.target.className.indexOf("sapMTokenText")>-1){this._removeIndicator();this._oSuggestionPopup.open();this._tokenizerInPopup=this.cloneTokenizer(this._tokenizer);this._setAllTokenVisible(this._tokenizerInPopup);this._tokenizerInPopup._oScroller.setHorizontal(false);this._tokenizerInPopup.addStyleClass("sapMTokenizerMultiLine");if(this._oSuggestionTable.getItems().length===0){var t=this;this._oPopupInput.onsapenter=function(e){t._validateCurrentText();t.setValue("");};}this._oSuggestionPopup.insertContent(this._tokenizerInPopup,0);}}else{if(e.target===this._$input[0]||e.target.className.indexOf("sapMToken")>-1&&e.target.className.indexOf("sapMTokenIcon")<0||e.target.className.indexOf("sapMTokenText")>-1){this.openMultiLine();this._showAllTokens(this._tokenizer);var t=this;setTimeout(function(){t._setContainerSizes();t._tokenizer.scrollToStart();},0);}}};M.prototype.ontap=function(e){if(document.activeElement===this._$input[0]){this._tokenizer.selectAllTokens(false);}I.prototype.ontap.apply(this,arguments);};M.prototype.onfocusin=function(e){if(this._isMultiLineMode){this._processMultiLine(e);}if(e.target===this.getFocusDomRef()){I.prototype.onfocusin.apply(this,arguments);}};M.prototype.onsapescape=function(e){this._tokenizer.selectAllTokens(false);this.selectText(0,0);I.prototype.onsapescape.apply(this,arguments);};M.prototype._validateCurrentText=function(e){var o=this._tokenizer.getTokens().length;var t=this.getValue();if(!t||!this.getEditable()){return;}t=t.trim();if(!t){return;}var i=null;if(e||this._getIsSuggestionPopupOpen()){if(this._hasTabularSuggestions()){i=this._oSuggestionTable._oSelectedItem;}else{i=this._getSuggestionItem(t,e);}}var b=null;if(i&&i.getText&&i.getKey){b=new T({text:i.getText(),key:i.getKey()});}var c=this;this._bIsValidating=true;this._tokenizer.addValidateToken({text:t,token:b,suggestionObject:i,validationCallback:function(v){c._bIsValidating=false;if(v){c.setValue("");if(c._bUseDialog&&c._isMultiLineMode&&c._oSuggestionTable.getItems().length===0){var n=c._tokenizer.getTokens().length;if(o<n){var N=c._tokenizer.getTokens()[n-1];c._updateTokenizerInPopup(N);c._oPopupInput.setValue("");}if(c._tokenizerInPopup.getVisible()===false){c._tokenizerInPopup.setVisible(true);}c._setAllTokenVisible(c._tokenizerInPopup);}}}});};M.prototype.getCursorPosition=function(){return this._$input.cursorPos();};M.prototype._completeTextIsSelected=function(){var i=this._$input[0];if(i.selectionStart!==0){return false;}if(i.selectionEnd!==this.getValue().length){return false;}return true;};M.prototype._selectAllInputText=function(){var i=this._$input[0];i.selectionStart=0;i.selectionEnd=this.getValue().length;return this;};M.prototype._getIsSuggestionPopupOpen=function(){return this._oSuggestionPopup&&this._oSuggestionPopup.isOpen();};M.prototype.setEditable=function(e){if(e===this.getEditable()){return this;}if(I.prototype.setEditable){I.prototype.setEditable.apply(this,arguments);}this._tokenizer.setEditable(e);if(e){this.removeStyleClass("sapMMultiInputNotEditable");}else{this.addStyleClass("sapMMultiInputNotEditable");}return this;};M.prototype._findItem=function(t,b,e,g){if(!t){return;}if(!(b&&b.length)){return;}t=t.toLowerCase();var c=b.length;for(var i=0;i<c;i++){var d=b[i];var f=g(d);if(!f){continue;}f=f.toLowerCase();if(f===t){return d;}if(!e&&f.indexOf(t)===0){return d;}}};M.prototype._getSuggestionItem=function(t,e){var b=null;var c=null;if(this._hasTabularSuggestions()){b=this.getSuggestionRows();c=this._findItem(t,b,e,function(R){var d=R.getCells();var f=null;if(d){var i;for(i=0;i<d.length;i++){if(d[i].getText){f=d[i].getText();break;}}}return f;});}else{b=this.getSuggestionItems();c=this._findItem(t,b,e,function(c){return c.getText();});}return c;};M.prototype.addToken=function(t){return this._tokenizer.addToken(t);};M.prototype.removeToken=function(t){return this._tokenizer.removeToken(t);};M.prototype.removeAllTokens=function(){return this._tokenizer.removeAllTokens();};M.prototype.getTokens=function(){return this._tokenizer.getTokens();};M.prototype.insertToken=function(t,i){return this._tokenizer.insertToken(t,i);};M.prototype.indexOfToken=function(t){return this._tokenizer.indexOfToken(t);};M.prototype.destroyTokens=function(){return this._tokenizer.destroyTokens();};M.prototype.clone=function(){var c=I.prototype.clone.apply(this,arguments);var t=this.getTokens();var i;for(i=0;i<t.length;i++){var n=t[i].clone();c.addToken(n);}return c;};M.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("border");};M.prototype.setTokens=function(t){this._tokenizer.setTokens(t);};M.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};M.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";M.prototype.getDomRefForValueStateMessage=M.prototype.getPopupAnchorDomRef;return M;},true);
