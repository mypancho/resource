/* FWDEVPYTBQButton */
(function (){
var FWDEVPYTBQButton = function(
			label,
			normalColor,
			selectedColor,
			hdPath,
			id
		){
		
		var self = this;
		var prototype = FWDEVPYTBQButton.prototype;
		
		this.text_do = null;
		this.hd_do = null;
		this.dumy_do = null;
		
		this.label_str = label;
		this.normalColor_str = normalColor;
		this.selectedColor_str = selectedColor;
		this.hdPath_str = hdPath;
		
		this.id = id;
		this.totalWidth = 0;
		this.totalHeight = 23;
		this.hdWidth = 7;
		this.hdHeight = 5;

		this.hasHd_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.isDisabled_bl = false;

		
		//##########################################//
		/* initialize self */
		//##########################################//
		this.init = function(){
			
			self.hasHd_bl = true;
			self.setBackfaceVisibility();
			self.setupMainContainers();
			
			
			self.setHeight(self.totalHeight);
			//self.setBkColor("#FF0000");
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			self.text_do = new FWDEVPDisplayObject("div");
			self.text_do.setBackfaceVisibility();
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.getStyle().display = "inline-block";
			self.text_do.getStyle().whiteSpace = "nowrap";
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.normalColor_str;
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";	
			self.text_do.setInnerHTML(self.label_str);
			self.addChild(self.text_do);
			
			if(self.hasHd_bl){
				var img = new Image();
				img.src = self.hdPath_str;
				self.hd_do = new FWDEVPDisplayObject("img");
				self.hd_do.setScreen(img);
				self.hd_do.setWidth(self.hdWidth);
				self.hd_do.setHeight(self.hdHeight);
				self.addChild(self.hd_do);
			}
				
			self.dumy_do = new FWDEVPDisplayObject("div");
			if(FWDEVPUtils.isIE){
				self.dumy_do.setBkColor("#FF0000");
				self.dumy_do.setAlpha(0.0001);
			};
			
			self.dumy_do.setButtonMode(true);
			self.dumy_do.setHeight(self.totalHeight);
			self.addChild(self.dumy_do);
			
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
		
		this.onMouseOver = function(e){
			if(self.isDisabled_bl) return;
			self.setSelectedState(true);
			self.dispatchEvent(FWDEVPYTBQButton.MOUSE_OVER, {e:e, id:self.id});
		};
			
		this.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			self.setNormalState(true);
			self.dispatchEvent(FWDEVPYTBQButton.MOUSE_OUT, {e:e, id:self.id});
		};
		
		this.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDEVPYTBQButton.CLICK, {e:e, id:self.id});
		};
	
		//###############################//
		/* set final size */
		//###############################//
		this.setFinalSize = function(){
			if(self.text_do.x != 0) return;
			var width = self.text_do.getWidth() + 34;
			var height = self.text_do.getHeight();
		
			self.text_do.setX(18);
			self.text_do.setY(parseInt((self.totalHeight - height)/2));
			
			if(self.hd_do){
				self.hd_do.setX(width - 12);
				self.hd_do.setY(self.text_do.y + 1);
			}
			
			self.dumy_do.setWidth(width);
			self.setWidth(width);
		}
		
		this.updateText = function(label){
			this.label_str = label;
			this.text_do.setInnerHTML(self.label_str);
			
			if(self.label_str == "highres" || self.label_str == "hd1080" || self.label_str == "hd720" || self.label_str == "hd1440" || self.label_str == "hd2160"){
				self.hd_do.setVisible(true);
			}else{
				self.hd_do.setVisible(false);
			}
			
		};
		
		//################################//
		/* Set states */
		//###############################//
		this.setSelectedState = function(animate){
			this.isSelected_bl = true;
			FWDAnimation.killTweensOf(self.text_do);
			if(animate){
				FWDAnimation.to(self.text_do.screen, .5, {css:{color:self.selectedColor_str}, ease:Expo.easeOut});
			}else{
				self.text_do.getStyle().color = self.selectedColor_str;
			}
		};
		
		this.setNormalState = function(animate){
			this.isSelected_bl = false;
			FWDAnimation.killTweensOf(self.text_do);
			if(animate){
				FWDAnimation.to(self.text_do.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
			}else{
				self.text_do.getStyle().color = self.normalColor_str;
			}
		};
		
		//##############################//
		/* disable /enable button */
		//##############################//
		this.disable = function(){
			self.isDisabled_bl = true;
			FWDAnimation.killTweensOf(self.text_do);
			self.setSelectedState(true);
			self.dumy_do.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			FWDAnimation.killTweensOf(self.text_do);
			self.setNormalState(true);
			self.dumy_do.setButtonMode(true);
		};
		

		self.init();
	};
	
	/* set prototype */
	FWDEVPYTBQButton.setPrototype = function(){
		FWDEVPYTBQButton.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPYTBQButton.MOUSE_OVER = "onMouseOver";
	FWDEVPYTBQButton.MOUSE_OUT = "onMouseOut";
	FWDEVPYTBQButton.CLICK = "onClick";
	
	FWDEVPYTBQButton.prototype = null;
	window.FWDEVPYTBQButton = FWDEVPYTBQButton;
}(window));