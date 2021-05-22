/* FWDEVPComplexButton */
(function (){
var FWDEVPComplexButton = function(
			n1Img, 
			s1Path, 
			n2Img, 
			s2Path, 
			disptachMainEvent_bl,
			useHEXColorsForSkin_bl,
		    normalButtonsColor_str,
		    selectedButtonsColor_str
		){
		
		var self = this;
		var prototype = FWDEVPComplexButton.prototype;
		
		this.n1Img = n1Img;
		this.s1Path_str = s1Path;
		this.n2Img = n2Img;
		this.s2Path_str = s2Path;
		
		
		this.firstButton_do;
		this.n1_do;
		this.s1_do;
		this.secondButton_do;
		this.n2_do;
		this.s2_do;
		
		this.buttonWidth = self.n1Img.width;
		this.buttonHeight = self.n1Img.height;
		
		this.useHEXColorsForSkin_bl = useHEXColorsForSkin_bl;
		this.normalButtonsColor_str = normalButtonsColor_str;
		this.selectedButtonsColor_str = selectedButtonsColor_str;
	
		this.isSelectedState_bl = false;
		this.currentState = 1;
		this.isDisabled_bl = false;
		this.isMaximized_bl = false;
		this.disptachMainEvent_bl = disptachMainEvent_bl;
		this.isDisabled_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.hasTransform2d_bl = false;
			self.setButtonMode(true);
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setupMainContainers();
			self.secondButton_do.setVisible(false);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			
			self.firstButton_do = new FWDEVPDisplayObject("div");
			self.firstButton_do.setWidth(self.buttonWidth);
			self.firstButton_do.setHeight(self.buttonHeight);
			
			if(self.useHEXColorsForSkin_bl){
				self.n1_do = new FWDEVPDisplayObject("div");
				self.n1_do.setWidth(self.buttonWidth);
				self.n1_do.setHeight(self.buttonHeight);
				self.n1_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.n1Img, self.normalButtonsColor_str).canvas;
				self.n1_do.screen.appendChild(self.n1_sdo_canvas);			
			}else{
				self.n1_do = new FWDEVPDisplayObject("img");	
				self.n1_do.setScreen(self.n1Img);
			}
			self.firstButton_do.addChild(self.n1_do);
			
			if(self.allowToCreateSecondButton_bl){
				
				self.s1_img = new Image();
				self.s1_img.src = self.s1Path_str;
				
				if(self.useHEXColorsForSkin_bl){
					self.s1_do = new FWDEVPTransformDisplayObject("div");
					self.s1_do.setWidth(self.buttonWidth);
					self.s1_do.setHeight(self.buttonHeight);
					self.s1_img.onload = function(){
						self.s1_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.s1_img, self.selectedButtonsColor_str).canvas;
						self.s1_do.screen.appendChild(self.s1_do_canvas);
					}
					self.s1_do.setAlpha(0);
				}else{
					self.s1_do = new FWDEVPDisplayObject("img");
					self.s1_do.setScreen(self.s1_img);
					self.s1_do.setWidth(self.buttonWidth);
					self.s1_do.setHeight(self.buttonHeight);
					self.s1_do.setAlpha(0);
				}
				self.firstButton_do.addChild(self.s1_do);
			}	
				
			
			//Second button
			self.secondButton_do = new FWDEVPDisplayObject("div");
			self.secondButton_do.setWidth(self.buttonWidth);
			self.secondButton_do.setHeight(self.buttonHeight);
			
			if(self.useHEXColorsForSkin_bl){
				self.n2_do = new FWDEVPDisplayObject("div");
				self.n2_do.setWidth(self.buttonWidth);
				self.n2_do.setHeight(self.buttonHeight);
				self.n2_sdo_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.n2Img, self.normalButtonsColor_str).canvas;
				self.n2_do.screen.appendChild(self.n2_sdo_canvas);			
			}else{
				self.n2_do = new FWDEVPDisplayObject("img");	
				self.n2_do.setScreen(self.n2Img);
			}
			self.secondButton_do.addChild(self.n2_do);
			
			if(self.allowToCreateSecondButton_bl){
				
				self.s2_img = new Image();
				self.s2_img.src = self.s2Path_str;
				
				if(self.useHEXColorsForSkin_bl){
					self.s2_do = new FWDEVPTransformDisplayObject("div");
					self.s2_do.setWidth(self.buttonWidth);
					self.s2_do.setHeight(self.buttonHeight);
					self.s2_img.onload = function(){
						self.s2_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.s2_img, self.selectedButtonsColor_str).canvas;
						self.s2_do.screen.appendChild(self.s2_do_canvas);
					}
					self.s2_do.setAlpha(0);
				}else{
					self.s2_do = new FWDEVPDisplayObject("img");
					self.s2_do.setScreen(self.s2_img);
					self.s2_do.setWidth(self.buttonWidth);
					self.s2_do.setHeight(self.buttonHeight);
					self.s2_do.setAlpha(0);
				}
				self.secondButton_do.addChild(self.s2_do);
			}	
			
			self.addChild(self.secondButton_do);
			self.addChild(self.firstButton_do);
			
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
				self.screen.addEventListener("toustart", self.onDown);
				self.screen.addEventListener("touchend", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e, animate){
			if(self.isDisabled_bl || self.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				self.dispatchEvent(FWDEVPComplexButton.MOUSE_OVER, {e:e});
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl || !self.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				self.setNormalState();
				self.dispatchEvent(FWDEVPComplexButton.MOUSE_OUT);
			}
		};
		
		self.onDown = function(e){
			if(e.preventDefault) e.preventDefault();
		};
	
		self.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			if(!self.isMobile_bl) self.onMouseOver(e, false);
			//if(self.hasPointerEvent_bl) self.setNormalState();
			if(self.disptachMainEvent_bl) self.dispatchEvent(FWDEVPComplexButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		self.toggleButton = function(){
			if(self.currentState == 1){
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0;
				self.dispatchEvent(FWDEVPComplexButton.FIRST_BUTTON_CLICK);
			}else{
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1;
				self.dispatchEvent(FWDEVPComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		
		//##############################//
		/* set second buttons state */
		//##############################//
		self.setButtonState = function(state){
			if(state == 1){
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1; 
			}else{
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0; 
			}
		};
		
		//###############################//
		/* set normal state */
		//################################//
		this.setNormalState = function(){
			if(self.isMobile_bl && !self.hasPointerEvent_bl) return;
			self.isSelectedState_bl = false;
			FWDAnimation.killTweensOf(self.s1_do);
			FWDAnimation.killTweensOf(self.s2_do);
			FWDAnimation.to(self.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDAnimation.to(self.s2_do, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		this.setSelectedState = function(animate){
			self.isSelectedState_bl = true;
			FWDAnimation.killTweensOf(self.s1_do);
			FWDAnimation.killTweensOf(self.s2_do);
			FWDAnimation.to(self.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			FWDAnimation.to(self.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		this.disable = function(){
			if(self.isDisabled_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:.4});
			self.setNormalState();
		};
		
		this.enable = function(){
			if(!self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:1});
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		this.updateHEXColors = function(normalColor_str, selectedColor_str){
			FWDEVPUtils.changeCanvasHEXColor(self.n1Img, self.n1_sdo_canvas, normalColor_str);
			FWDEVPUtils.changeCanvasHEXColor(self.s1_img, self.s1_do_canvas, selectedColor_str);
			FWDEVPUtils.changeCanvasHEXColor(self.n2Img, self.n2_sdo_canvas, normalColor_str);
			FWDEVPUtils.changeCanvasHEXColor(self.s2_img, self.s2_do_canvas, selectedColor_str);
		}
		
		self.init();
	};
	
	/* set prototype */
	FWDEVPComplexButton.setPrototype = function(){
		FWDEVPComplexButton.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDEVPComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDEVPComplexButton.MOUSE_OVER = "onMouseOver";
	FWDEVPComplexButton.MOUSE_OUT = "onMouseOut";
	FWDEVPComplexButton.MOUSE_UP = "onMouseUp";
	FWDEVPComplexButton.CLICK = "onClick";
	
	FWDEVPComplexButton.prototype = null;
	window.FWDEVPComplexButton = FWDEVPComplexButton;
}(window));