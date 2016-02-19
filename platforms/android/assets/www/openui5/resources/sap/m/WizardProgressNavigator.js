/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","jquery.sap.global"],function(l,C,I,q){"use strict";var W=C.extend("sap.m.WizardProgressNavigator",{metadata:{properties:{stepCount:{type:"int",group:"Data",defaultValue:3},stepTitles:{type:"string[]",group:"Appearance",defaultValue:[]},stepIcons:{type:"sap.ui.core.URI[]",group:"Appearance",defaultValue:[]},varyingStepCount:{type:"boolean",group:"Appearance",defaultValue:false}},events:{stepChanged:{parameters:{previous:{type:"int"},current:{type:"int"}}},stepActivated:{parameters:{index:{type:"int"}}}}}});W.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8};W.CLASSES={NAVIGATION:"sapMWizardProgressNav",LIST:"sapMWizardProgressNavList",STEP:"sapMWizardProgressNavStep",ANCHOR:"sapMWizardProgressNavAnchor",SEPARATOR:"sapMWizardProgressNavSeparator",ICON:"sapMWizardProgressNavIcon"};W.ATTRIBUTES={STEP:"data-sap-ui-wpn-step",STEP_COUNT:"data-sap-ui-wpn-step-count",CURRENT_STEP:"data-sap-ui-wpn-step-current",ACTIVE_STEP:"data-sap-ui-wpn-step-active",OPEN_SEPARATOR:"data-sap-ui-wpn-separator-open",ARIA_LABEL:"aria-label",ARIA_DISABLED:"aria-disabled"};W.TEXT={SELECTED:"WIZARD_PROG_NAV_SELECTED",PROCESSED:"WIZARD_PROG_NAV_PROCESSED",STEP:"WIZARD_PROG_NAV_STEP_TITLE"};W.prototype.init=function(){this._currentStep=1;this._activeStep=1;this._cachedSteps=null;this._cachedSeparators=null;this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._createAnchorNavigation();};W.prototype.onBeforeRendering=function(){if(this.getStepCount()!==this.getStepIcons().filter(String).length){this.setStepIcons([]);}};W.prototype.onAfterRendering=function(){var z=this._activeStep-1,a=this._currentStep-1;this._cacheDOMElements();this._updateStepZIndex();this._updateSeparatorsOpenAttribute();this._updateAnchorNavigation(z);this._updateStepActiveAttribute(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepCurrentAttribute(a);this._updateAnchorAriaLabelAttribute(a);};W.prototype.getCurrentStep=function(){return this._currentStep;};W.prototype.previousStep=function(){var c=this.getCurrentStep();if(c<2){return this;}return this._moveToStep(c-1);};W.prototype.nextStep=function(){return this._moveToStep(this.getCurrentStep()+1);};W.prototype.incrementProgress=function(){return this._moveToStep(this.getProgress()+1);};W.prototype.getProgress=function(){return this._activeStep;};W.prototype.discardProgress=function(i){if(i<=0||i>this._activeStep){return this;}this._updateCurrentStep(i,this._currentStep);this._updateStepActiveAttribute(i-1,this._activeStep-1);this._addAnchorAriaDisabledAttribute(i-1);this._updateAnchorNavigation(i-1);this._currentStep=i;this._activeStep=i;};W.prototype._setOnEnter=function(c){this._onEnter=c;};W.prototype.ontap=function(e){if(!(this._isIcon(e.target)||this._isAnchor(e.target))||!this._isActiveStep(this._getStepNumber(e.target))){return;}this._updateCurrentStep(this._getStepNumber(e.target));};W.prototype.onsapspace=function(e){if(this._onEnter){this._onEnter(e,this._anchorNavigation.getFocusedIndex());}this.ontap(e);};W.prototype.onsapenter=W.prototype.onsapspace;W.prototype.exit=function(){this.removeDelegate(this._anchorNavigation);this._anchorNavigation.destroy();this._anchorNavigation=null;this._currentStep=null;this._activeStep=null;this._cachedSteps=null;this._cachedSeparators=null;};W.prototype._createAnchorNavigation=function(){var t=this;this._anchorNavigation=new I();this._anchorNavigation.setCycling(false);this._anchorNavigation.attachEvent("AfterFocus",function(p){var e=p.mParameters.event;if(!e||!e.relatedTarget||q(e.relatedTarget).hasClass(W.CLASSES.ANCHOR)){return;}t._anchorNavigation.focusItem(t._currentStep-1);});this.addDelegate(this._anchorNavigation);};W.prototype._cacheDOMElements=function(){var d=this.getDomRef();this._cachedSteps=d.querySelectorAll("."+W.CLASSES.STEP);this._cachedSeparators=d.querySelectorAll("."+W.CLASSES.SEPARATOR);};W.prototype._updateStepZIndex=function(){var z=this._currentStep-1,s=this._cachedSteps.length,a=W.CONSTANTS.MAXIMUM_STEPS;for(var i=0;i<s;i++){if(i<=z){this._cachedSteps[i].style.zIndex=0;}else{this._cachedSteps[i].style.zIndex=a;a-=1;}}};W.prototype._updateSeparatorsOpenAttribute=function(){var s=this._cachedSeparators.length,a,e;if(this._currentStep===1){a=0;e=2;}else if(this._currentStep>1&&this._currentStep<s){a=this._currentStep-2;e=this._currentStep;}else{a=s-3;e=s-1;}for(var i=0;i<s;i++){if(a<=i&&i<=e){this._cachedSeparators[i].setAttribute(W.ATTRIBUTES.OPEN_SEPARATOR,true);}else{this._cachedSeparators[i].removeAttribute(W.ATTRIBUTES.OPEN_SEPARATOR);}}};W.prototype._updateAnchorNavigation=function(a){var n=this.getDomRef(),f=[];for(var i=0;i<=a;i++){f.push(this._cachedSteps[i].children[0]);}this._anchorNavigation.setRootDomRef(n);this._anchorNavigation.setItemDomRefs(f);this._anchorNavigation.setPageSize(a);this._anchorNavigation.setFocusedIndex(a);};W.prototype._updateStepActiveAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.ACTIVE_STEP);}this._cachedSteps[n].setAttribute(W.ATTRIBUTES.ACTIVE_STEP,true);};W.prototype._updateStepCurrentAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.CURRENT_STEP);}this._cachedSteps[n].setAttribute(W.ATTRIBUTES.CURRENT_STEP,true);};W.prototype._addAnchorAriaDisabledAttribute=function(a){var s=this._cachedSteps.length,b;for(var i=a+1;i<s;i++){b=this._cachedSteps[i].children[0];b.setAttribute(W.ATTRIBUTES.ARIA_DISABLED,true);b.removeAttribute(W.ATTRIBUTES.ARIA_LABEL);}};W.prototype._removeAnchorAriaDisabledAttribute=function(i){this._cachedSteps[i].children[0].removeAttribute(W.ATTRIBUTES.ARIA_DISABLED);};W.prototype._updateAnchorAriaLabelAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(W.TEXT.PROCESSED));}this._cachedSteps[n].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(W.TEXT.SELECTED));};W.prototype._moveToStep=function(n){var s=this.getStepCount(),o=this.getCurrentStep();if(n>s){return this;}if(n>this._activeStep){this._updateActiveStep(n);}return this._updateCurrentStep(n,o);};W.prototype._updateActiveStep=function(n,o){var z=n-1,a=(o||this._activeStep)-1;this._activeStep=n;this._updateAnchorNavigation(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepActiveAttribute(z,a);return this.fireStepActivated({index:n});};W.prototype._updateCurrentStep=function(n,o){var z=n-1,a=(o||this.getCurrentStep())-1;this._currentStep=n;this._updateStepZIndex();this._updateSeparatorsOpenAttribute();this._updateStepCurrentAttribute(z,a);this._updateAnchorAriaLabelAttribute(z,a);return this.fireStepChanged({previous:o,current:n});};W.prototype._isAnchor=function(d){return d.className.indexOf(W.CLASSES.ANCHOR)!==-1;};W.prototype._isIcon=function(d){return d.className.indexOf(W.CLASSES.ICON)!==-1;};W.prototype._isActiveStep=function(s){return s<=this._activeStep;};W.prototype._getStepNumber=function(d){var s=q(d).closest("."+W.CLASSES.STEP).attr(W.ATTRIBUTES.STEP);return parseInt(s,10);};return W;});
