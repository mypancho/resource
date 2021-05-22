/* FWDEVPSimpleButton */
(function (window){
var FWDEVPSimpleButton = function(nImg, 
								  sPath, 
								  dPath, 
								  alwaysShowSelectedPath, 
								  useHEXColorsForSkin_bl,
								  normalButtonsColor_str,
								  selectedButtonsColor_str){
		
		var self = this;
		var prototype = FWDEVPSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
	
		this.n_sdo;
		this.s_sdo;
		this.d_sdo;
		
		this.toolTipLabel_str;
		
		this.totalWidth = this.nImg.width;
		this.totalHeight = this.nImg.height;
		
		this.useHEXColorsForSkin_bl = useHEXColorsForSkin_bl;
		this.normalButtonsColor_str = normalButtonsColor_str;
		this.selectedButtonsColor_str = selectedButtonsColor_str;
		
		this.isShowed_bl = true;
		this.isSetToDisabledState_bl = false;
		this.isDisabled_bl = false;
		this.isDisabledForGood_bl = false;
		this.isSelectedFinal_bl = false;
		this.isActive_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl || alwaysShowSelectedPath;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			if(self.useHEXColorsForSkin_bl){
				self.n_sdo = new FWDEVPTransformDisplayObject("div");
				self.n_sdo.setWidth(self.totalWidth);
				self.n_sdo.setHeight(self.totalHeight);
				self.n_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.nImg, self.normalButtonsColor_str).canvas;
				self.n_sdo.screen.appendChild(self.n_sdo_canvas);
				self.addChild(self.n_sdo);
			}else{
				self.n_sdo = new FWDEVPTransformDisplayObject("img");	
				self.n_sdo.setScreen(self.nImg);
				self.addChild(self.n_sdo);
			}
			
			if(self.allowToCreateSecondButton_bl){
				
				self.img1 = new Image();
				self.img1.src = self.sPath_str;
				var img2 = new Image();
				self.sImg = img2;
				
				if(self.useHEXColorsForSkin_bl){
					self.s_sdo = new FWDEVPTransformDisplayObject("div");
					self.s_sdo.setWidth(self.totalWidth);
					self.s_sdo.setHeight(self.totalHeight);
					self.img1.onload = function(){
						self.s_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.img1, self.selectedButtonsColor_str).canvas;
						self.s_sdo.screen.appendChild(self.s_sdo_canvas);
					}
					self.s_sdo.setAlpha(0);
					self.addChild(self.s_sdo);
				}else{
					self.s_sdo = new FWDEVPDisplayObject("img");
					self.s_sdo.setScreen(self.img1);
					self.s_sdo.setWidth(self.totalWidth);
					self.s_sdo.setHeight(self.totalHeight);
					self.s_sdo.setAlpha(0);
					self.addChild(self.s_sdo);
				}
				
				if(self.dPath_str){
					img2.src = self.dPath_str;
					self.d_sdo = new FWDEVPDisplayObject("img");
					self.d_sdo.setScreen(img2);
					self.d_sdo.setWidth(self.totalWidth);
					self.d_sdo.setHeight(self.totalHeight);
					self.d_sdo.setX(-100);
					self.addChild(self.d_sdo);
				};
			}
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonMode(true);
			self.screen.style.yellowOverlayPointerEvents = "none";
			
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("pointerup", self.onMouseUp);
				self.screen.addEventListener("pointerover", self.onMouseOver);
				self.screen.addEventListener("pointerout", self.onMouseOut);
			}else if(self.screen.addEventListener){	
				if(!self.isMobile_bl){
					self.screen.addEventListener("mouseover", self.onMouseOver);
					self.screen.addEventListener("mouseout", self.onMouseOut);
					self.screen.addEventListener("mouseup", self.onMouseUp);
				}
				self.screen.addEventListener("touchend", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDEVPSimpleButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDEVPSimpleButton.MOUSE_OVER, {e:e});
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDEVPSimpleButton.MOUSE_OUT, {e:e});
				self.setNormalState();
			}
		};
		
		self.onMouseUp = function(e){
			if(self.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
			self.dispatchEvent(FWDEVPSimpleButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelected = function(){
			self.isSelectedFinal_bl = true;
			if(!self.s_sdo) return;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		self.setUnselected = function(){
			self.isSelectedFinal_bl = false;
			if(!self.s_sdo) return;
			FWDAnimation.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.d_sdo) self.d_sdo.setX(0);
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.d_sdo) self.d_sdo.setX(-100);
		};
		
		this.disable = function(){
			if(self.isDisabledForGood_bl  || self.isDisabled_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:.4});
			self.setNormalState();
		};
		
		this.enable = function(){
			if(self.isDisabledForGood_bl || !self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:1});
		};
		
		this.disableForGood = function(){
			self.isDisabledForGood_bl = true;
			self.setButtonMode(false);
		};
		
		this.showDisabledState = function(){
			if(self.d_sdo.x != 0) self.d_sdo.setX(0);
		};
		
		this.hideDisabledState = function(){
			if(self.d_sdo.x != -100) self.d_sdo.setX(-100);
		};
		
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDAnimation.killTweensOf(self);
			if(!FWDEVPUtils.isIEAndLessThen9 ){
				if(FWDEVPUtils.isIEWebKit){
					FWDAnimation.killTweensOf(self.n_sdo);
					self.n_sdo.setScale2(0);
					FWDAnimation.to(self.n_sdo, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}else{
					self.setScale2(0);
					FWDAnimation.to(self, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}
			}else if(FWDEVPUtils.isIEAndLessThen9){
				self.setVisible(true);
			}else{
				self.setAlpha(0);
				FWDAnimation.to(self, .4, {alpha:1, delay:.4});
				self.setVisible(true);
			}
		};	
			
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self);
			FWDAnimation.killTweensOf(self.n_sdo);
			self.setVisible(false);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		self.updateHEXColors = function(normalColor_str, selectedColor_str){
			FWDEVPUtils.changeCanvasHEXColor(self.nImg, self.n_sdo_canvas, normalColor_str);
			FWDEVPUtils.changeCanvasHEXColor(self.img1, self.s_sdo_canvas, selectedColor_str);
		}
		
		self.init();
	};
	
	/* set prototype */
	FWDEVPSimpleButton.setPrototype = function(){
		FWDEVPSimpleButton.prototype = null;
		FWDEVPSimpleButton.prototype = new FWDEVPTransformDisplayObject("div");
	};
	
	FWDEVPSimpleButton.CLICK = "onClick";
	FWDEVPSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDEVPSimpleButton.SHOW_TOOLTIP = "showTooltip";
	FWDEVPSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDEVPSimpleButton.MOUSE_UP = "onMouseDown";
	
	FWDEVPSimpleButton.prototype = null;
	window.FWDEVPSimpleButton = FWDEVPSimpleButton;
}(window));