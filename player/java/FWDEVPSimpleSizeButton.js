/* FWDEVPSimpleSizeButton */
(function (window){
var FWDEVPSimpleSizeButton = function(
		nImgPath, 
		sImgPath,
		buttonWidth,
		buttonHeight, 
	    useHEXColorsForSkin_bl,
	    normalButtonsColor_str,
	    selectedButtonsColor_str){
		
		var self = this;
		var prototype = FWDEVPSimpleSizeButton.prototype;
		
		this.nImg_img = null;
		this.sImg_img = null;
	
		this.n_do;
		this.s_do;
		
		this.useHEXColorsForSkin_bl = useHEXColorsForSkin_bl;
		this.normalButtonsColor_str = normalButtonsColor_str;
		this.selectedButtonsColor_str = selectedButtonsColor_str;
		
		this.nImgPath_str = nImgPath;
		this.sImgPath_str = sImgPath;
		
		this.buttonWidth = buttonWidth;
		this.buttonHeight = buttonHeight;
		
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		this.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			self.setupMainContainers();
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setButtonMode(true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			
			self.nImg = new Image();
			self.nImg.src = self.nImgPath_str;
			
			if(self.useHEXColorsForSkin_bl){
				self.n_do = new FWDEVPTransformDisplayObject("div");
				self.n_do.setWidth(self.buttonWidth);
				self.n_do.setHeight(self.buttonHeight);
				self.nImg.onload = function(){	
					self.n_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.nImg, self.normalButtonsColor_str).canvas;
					self.n_do.screen.appendChild(self.n_do_canvas);
				}
				self.addChild(self.n_do);
			}else{
				self.n_do = new FWDEVPDisplayObject("img");
				self.n_do.setScreen(self.nImg);
				self.n_do.setWidth(self.buttonWidth);
				self.n_do.setHeight(self.buttonHeight);
				self.addChild(self.n_do);
			}
			
			
			self.sImg = new Image();
			self.sImg.src = self.sImgPath_str;
			
			if(self.useHEXColorsForSkin_bl){
				self.s_do = new FWDEVPTransformDisplayObject("div");
				self.s_do.setWidth(self.buttonWidth);
				self.s_do.setHeight(self.buttonHeight);
				self.sImg.onload = function(){	
					self.s_do_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.sImg, self.selectedButtonsColor_str).canvas;
					self.s_do.screen.appendChild(self.s_do_canvas);
				}
				self.addChild(self.s_do);
			}else{
				self.s_do = new FWDEVPDisplayObject("img");
				self.s_do.setScreen(self.sImg);
				self.s_do.setWidth(self.buttonWidth);
				self.s_do.setHeight(self.buttonHeight);
				
				self.addChild(self.s_do);
			}
			
			self.s_do.setAlpha(0);
			
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("pointerup", self.onMouseUp);
				self.screen.addEventListener("pointerover", self.setNormalState);
				self.screen.addEventListener("pointerout", self.setSelectedState);
			}else if(self.screen.addEventListener){	
				if(!self.isMobile_bl){
					self.screen.addEventListener("mouseover", self.setNormalState);
					self.screen.addEventListener("mouseout", self.setSelectedState);
					self.screen.addEventListener("mouseup", self.onMouseUp);
				}
				self.screen.addEventListener("touchend", self.onMouseUp);
			}
			
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(e){
			FWDAnimation.killTweensOf(self.s_do);
			FWDAnimation.to(self.s_do, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(e){
			FWDAnimation.killTweensOf(self.s_do);
			FWDAnimation.to(self.s_do, .5, {alpha:1, ease:Expo.easeOut});
		};
		
		this.onMouseUp = function(e){
			self.dispatchEvent(FWDEVPSimpleSizeButton.CLICK);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		self.updateHEXColors = function(normalColor_str, selectedColor_str){
			FWDEVPUtils.changeCanvasHEXColor(self.nImg, self.n_do_canvas, normalColor_str);
			FWDEVPUtils.changeCanvasHEXColor(self.sImg, self.s_do_canvas, selectedColor_str);
		}
			
		
		//###################################################//
		/* Destory */
		//###################################################//
		this.destroy = function(){
			FWDAnimation.killTweensOf(self.n_do);
			
			self.n_do.destroy();
			this.s_do.destroy();
		
			self.screen.onmouseover = null;
			self.screen.onmouseout = null;
			self.screen.onclick = null;
			self.nImg_img = null;
			self.sImg_img = null;
			
			self = null;
			prototype = null;
			FWDEVPSimpleSizeButton.prototype = null;
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDEVPSimpleSizeButton.setPrototype = function(){
		FWDEVPSimpleSizeButton.prototype = null;
		FWDEVPSimpleSizeButton.prototype = new FWDEVPTransformDisplayObject("div", "relative");
	};
	
	FWDEVPSimpleSizeButton.CLICK = "onClick";
	
	FWDEVPSimpleSizeButton.prototype = null;
	window.FWDEVPSimpleSizeButton = FWDEVPSimpleSizeButton;
}(window));