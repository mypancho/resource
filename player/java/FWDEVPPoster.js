/* Thumb */
(function (window){
	
	var FWDEVPPoster = function(
			parent, 
			backgroundColor,
			showPoster,
			fillEntireScreenWithPoster_bl
		){
		
		var self  = this;
		var prototype = FWDEVPPoster.prototype;
		
		
		this.img_img = new Image();
		this.img_do = null;
		this.imgW = 0;
		this.imgH = 0;
		this.finalW = 0;
		this.finalH = 0;
		this.finalX = 0;
		this.finalY = 0;
		
		this.curPath_str;
		this.backgroundColor_str = backgroundColor;
		this.fillEntireScreenWithPoster_bl = fillEntireScreenWithPoster_bl;
		
		this.isTransparent_bl = false;
		this.showPoster_bl = showPoster;
		this.showOrLoadOnMobile_bl = false;
		this.isShowed_bl = true;
		this.allowToShow_bl = true;
		this.isMobile_bl = FWDEVPUtils.isMobile;
	
		this.init = function(){
			self.img_img = new Image();
			self.img_do = new FWDEVPDisplayObject("img");
			self.hide();
			self.setBkColor(self.backgroundColor_str);
		};
		
		this.positionAndResize = function(){
			if(!parent.stageWidth) return;
			self.setWidth(parent.stageWidth);
			self.setHeight(parent.stageHeight);
		
			if(!self.imgW) return;
			var scX = parent.stageWidth/self.imgW;
			var scY = parent.stageHeight/self.imgH;
			var ttSc;
			
			if(self.fillEntireScreenWithPoster_bl){
				if(scX >= scY){
					ttSc = scX;
				}else{
					ttSc = scY;
				}
			}else{
				if(scX <= scY){
					ttSc = scX;
				}else{
					ttSc = scY;
				}
			}
			
			
			self.finalW = Math.round(ttSc * self.imgW);
			self.finalH = Math.round(ttSc * self.imgH);
			self.finalX = parseInt((parent.stageWidth - self.finalW)/2);
			self.finalY = parseInt((parent.stageHeight - self.finalH)/2);
		
			self.img_do.setX(self.finalX);
			self.img_do.setY(self.finalY);
			self.img_do.setWidth(self.finalW);
			self.img_do.setHeight(self.finalH);		
		};
		
		this.setPoster = function(path){
			if(path && (FWDEVPUtils.trim(path) == "") || path =="none"){
				self.showOrLoadOnMobile_bl = true;
				self.isTransparent_bl = true;
				self.show();
				return;
			}else if(path == "youtubemobile"){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = false;
				self.img_img.src = null;
				self.imgW = 0;
				return;
			}else if(path == self.curPath_str){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = true;
				self.show();
				return;
			}
			
			self.isTransparent_bl = false;
			self.showOrLoadOnMobile_bl = true;
			self.curPath_str = path;
			if(self.allowToShow_bl) self.isShowed_bl = false;
			if(!path) return;
			//self.img_do.setAlpha(0);
			if(self.img_do) self.img_do.src = "";
			self.img_img.onload = self.posterLoadHandler;
			self.img_img.src = self.curPath_str;
		};
		
		this.posterLoadHandler = function(e){
			self.imgW = self.img_img.width;
			self.imgH = self.img_img.height;
			self.img_do.setScreen(self.img_img);
			self.addChild(self.img_do);
			self.show();
			self.positionAndResize();
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.show = function(allowToShow_bl){
			if(!self.allowToShow_bl || self.isShowed_bl || !self.showOrLoadOnMobile_bl) return;
			
			self.isShowed_bl = true;
			
			if(self.isTransparent_bl){
				if(self.alpha != 0) self.setAlpha(0);
			}else {
				if(self.alpha != 1) self.setAlpha(1);
			}
			
			self.setVisible(true);
			
			if(!self.isMobile_bl && !self.isTransparent_bl){
				FWDAnimation.killTweensOf(self);
				self.setAlpha(0);
				FWDAnimation.to(self, .6, {alpha:1, delay:.4});	
				
			}
			
			self.positionAndResize();
		};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			self.setVisible(false);
		};
		
		
		this.init();
	};
	
	/* set prototype */
    FWDEVPPoster.setPrototype = function(){
    	FWDEVPPoster.prototype = new FWDEVPDisplayObject("div");
    };
    
    FWDEVPPoster.prototype = null;
	window.FWDEVPPoster = FWDEVPPoster;
}(window));