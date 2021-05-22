/* Thumb */
(function (window){
	
	var FWDEVPLogo = function(
			parent, 
			source,
			position,
			margins
		){
		
		var self  = this;
		var prototype = FWDEVPLogo.prototype;
		
		this.img_img = null;
		
		this.logoImage_do = null;
		
		this.position_str = position;
		this.source_str = source;
		this.logoLink_str = parent.data.logoLink_str;
		
		this.margins = margins;
		
		this.isShowed_bl = true;
		this.allowToShow_bl = true;
	
		this.init = function(){
			
			if(self.logoLink_str == "none"){
				self.getStyle().pointerEvents = "none";
			}else{
				self.setButtonMode(true);
				self.screen.onclick = function(){window.open(self.logoLink_str, "_blank");};
			}
			
			self.logoImage_do = new FWDEVPDisplayObject("img");
			
			self.img_img = new Image();
			self.img_img.onerror = null;
			self.img_img.onload = self.loadDone;
			self.img_img.src = self.source_str + "?" + (new Date()).getTime();
			self.hide();
		};
		
		this.loadDone = function(){
			self.setWidth(self.img_img.width);
			self.setHeight(self.img_img.height);
			
			self.logoImage_do.setScreen(self.img_img);
			self.addChild(self.logoImage_do);
			self.logoImage_do.setWidth(self.img_img.width);
			self.logoImage_do.setHeight(self.img_img.height);
			
			self.positionAndResize();
		};
		
		this.positionAndResize = function(){
			
			if(self.position_str == "topleft"){
				self.finalX = self.margins;
				self.finalY = self.margins;
			}else if(self.position_str == "topright"){
				self.finalX = parent.stageWidth - self.w - self.margins;
				self.finalY = self.margins;
			}else if(self.position_str == "bottomright"){
				self.finalX = parent.stageWidth - self.w - self.margins;
				self.finalY = parent.stageHeight - self.h - self.margins;
			}else if(self.position_str == "bottomleft"){
				self.finalX = self.margins;
				self.finalY = parent.stageHeight - self.h - self.margins;
			}
		
			self.setX(self.finalX);
			self.setY(self.finalY);
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.setVisible(true);
			FWDAnimation.killTweensOf(self);
			if(animate){
				FWDAnimation.to(self, .8, {alpha:1, ease:Expo.easeInOut});
			}else{
				self.setAlpha(1);
			}
		};
		
		this.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self);
			if(animate){
				FWDAnimation.to(self, .8, {alpha:0, ease:Expo.easeInOut, onComplete:function(){
					self.setVisible(false);
				}});
			}else{
				self.setAlpha(0);
				self.setVisible(false);
			}
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDEVPLogo.setPrototype = function(){
    	FWDEVPLogo.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPLogo.prototype = null;
	window.FWDEVPLogo = FWDEVPLogo;
}(window));