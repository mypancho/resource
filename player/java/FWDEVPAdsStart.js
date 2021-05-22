/* FWDEVPAdsStart */
(function (window){
var FWDEVPAdsStart = function(
			position_str,
			borderColorN_str,
			borderColorS_str,
			adsBackgroundPath_str,
			timeColor_str
		){
		
		var self = this;
		var prototype = FWDEVPAdsStart.prototype;
		
		this.main_do = null;
		this.bk_do = null;
		this.text_do = null;
		this.border_do = null;
		this.thumbHolder_do = null;

		
		this.borderNColor_str = borderColorN_str;
		this.borderSColor_str = borderColorS_str;
		this.adsBackgroundPath_str = adsBackgroundPath_str;
		this.position_str = position_str;
		this.timeColor_str = timeColor_str;
		
		this.totalWidth = 215;
		this.totalHeight = 64;
		this.fontSize = 12;
		
		this.hasThumbanil_bl = false;
		this.isShowed_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
			self.hide(false, true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			this.main_do = new FWDEVPDisplayObject("div");
			this.main_do.hasTransform3d_bl = false;
			this.main_do.hasTransform2d_bl = false;
			this.main_do.setBackfaceVisibility();
			
			this.bk_do = new FWDEVPDisplayObject("div");
			this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')";
			
			this.text_do = new FWDEVPDisplayObject("div");
			this.text_do.hasTransform3d_bl = false;
			this.text_do.hasTransform2d_bl = false;
			this.text_do.setBackfaceVisibility();
			this.text_do.getStyle().fontFamily = "Arial";
			this.text_do.getStyle().fontSize= "12px";
			this.text_do.getStyle().lineHeight = "18px";
			//this.text_do.getStyle().whiteSpace= "nowrap";
			this.text_do.getStyle().textAlign = "center";
			this.text_do.getStyle().color = this.timeColor_str;
			this.text_do.getStyle().fontSmoothing = "antialiased";
			this.text_do.getStyle().webkitFontSmoothing = "antialiased";
			this.text_do.getStyle().textRendering = "optimizeLegibility";
			this.text_do.setInnerHTML("...");
			
			this.thumbHolder_do = new FWDEVPDisplayObject("div");
			this.thumbHolder_do.setWidth(this.totalHeight - 8);
			this.thumbHolder_do.setHeight(this.totalHeight - 8);
			this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4);
			this.thumbHolder_do.setY(4);
			
			this.border_do = new FWDEVPDisplayObject("div");
			this.border_do.getStyle().border = "1px solid " + this.borderNColor_str + "";
		
			this.main_do.setWidth(this.totalWidth);
			this.main_do.setHeight(this.totalHeight);
			this.bk_do.setWidth(this.totalWidth);
			this.bk_do.setHeight(this.totalHeight);
			if(this.position_str == "left"){
				this.border_do.setX(-1);
				this.border_do.setWidth(this.totalWidth - 1);
				this.border_do.setHeight(this.totalHeight -2);
			}else{
				this.border_do.setWidth(this.totalWidth);
				this.border_do.setHeight(this.totalHeight -2);
			}
			this.setWidth(this.totalWidth);
			this.setHeight(this.totalHeight);
		
			this.main_do.addChild(this.bk_do);
			this.main_do.addChild(this.text_do);
			this.main_do.addChild(this.thumbHolder_do);
			this.main_do.addChild(this.border_do);
			
			this.addChild(this.main_do);
		};
		
		//#####################################//
		/* load thumbnail */
		//#####################################//
		this.loadThumbnail = function(path){
			this.hasThumbanil_bl = true;
			if(!this.thumbnail_do){
				this.thumbnail_do = new FWDEVPDisplayObject("img");
				this.smallImage_img = new Image();
			}
			
			this.thumbHolder_do.setVisible(true);
			this.smallImage_img.onload = this.onSmallImageLoad;
			this.smallImage_img.src = path;
		};
		
		this.onSmallImageLoad = function(){
			self.smallImageOriginalW = self.smallImage_img.width;
			self.smallImageOriginalH = self.smallImage_img.height;
			self.thumbnail_do.setScreen(self.smallImage_img);
			self.thumbHolder_do.addChild(self.thumbnail_do);
			
			var scaleX = self.thumbHolder_do.w/self.smallImageOriginalW;
			var scaleY = self.thumbHolder_do.h/self.smallImageOriginalH;
			var totalScale = 0;
			
			if(scaleX >= scaleY){
				totalScale = scaleX;
			}else if(scaleX <= scaleY){
				totalScale = scaleY;
			}
			
			self.thumbnail_do.setWidth(Math.round(self.smallImageOriginalW * totalScale));
			self.thumbnail_do.setHeight(Math.round(self.smallImageOriginalH * totalScale));
			self.thumbnail_do.setX(Math.round((self.thumbHolder_do.w - self.thumbnail_do.w)/2));
			self.thumbnail_do.setY(Math.round((self.thumbHolder_do.h - self.thumbnail_do.h)/2));
			self.thumbnail_do.setAlpha(0);
			FWDAnimation.to(self.thumbnail_do, .8, {alpha:1});
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		this.updateText = function(text){
			this.text_do.setInnerHTML(text);
			
			if(this.hasThumbanil_bl){
				this.text_do.setX(16);
				this.text_do.setWidth(this.totalWidth - this.totalHeight - 26);
			}else{
				this.text_do.setX(8);
				this.text_do.setWidth(this.totalWidth - 16);
			}
			
			this.text_do.setY(parseInt((self.totalHeight - self.text_do.getHeight())/2));
		};
	
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(animate){
			if(this.isShowed_bl) return;
			
			this.isShowed_bl = true;
			this.setVisible(true);
			
			FWDAnimation.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDAnimation.to(this.main_do, .8, {x:0, delay:.2, ease:Expo.easeInOut});
				}else{
					FWDAnimation.to(this.main_do, .8, {x:-this.totalWidth + 1, delay:.2,  ease:Expo.easeInOut});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(0);
				}else{
					this.main_do.setX(-this.totalWidth);
				}
			}
		};	
			
		this.hide = function(animate, overwrite){
			if(!this.isShowed_bl && !overwrite) return;
			
			this.isShowed_bl = false;
			this.hasThumbanil_bl = false;
			
			FWDAnimation.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDAnimation.to(this.main_do, .8, {x:-this.totalWidth, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}else{
					FWDAnimation.to(this.main_do, .8, {x:0, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(-this.totalWidth);
				}else{
					this.main_do.setX(0);
				} 
				this.hideCompleteHandler();
			}
		};
		
		this.hideCompleteHandler = function(){
			if(self.smallImage_img){
				self.smallImage_img.onload = null;
				self.smallImage_img.src = "";
				FWDAnimation.killTweensOf(self.thumbnail_do);
			}
			
			if(self.main_do.alpha != 1) self.main_do.setAlpha(1);
			self.thumbHolder_do.setVisible(false);
			self.setVisible(false);
		};
		
		//###########################################//
		/* hide / show  opacity */
		//###########################################//
		this.hideWithOpacity = function(){
			if(!FWDEVPUtils.isIEAndLessThen9){
				FWDAnimation.to(this.main_do, .8, {alpha:.5});
			}
		};
		
		this.showWithOpacity = function(){
			if(!FWDEVPUtils.isIEAndLessThen9){
				FWDAnimation.to(this.main_do, .8, {alpha:1});
			}
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDEVPAdsStart.setPrototype = function(){
		FWDEVPAdsStart.prototype = null;
		FWDEVPAdsStart.prototype = new FWDEVPTransformDisplayObject("div");
	};
	
	FWDEVPAdsStart.CLICK = "onClick";
	FWDEVPAdsStart.MOUSE_OVER = "onMouseOver";
	FWDEVPAdsStart.SHOW_TOOLTIP = "showTooltip";
	FWDEVPAdsStart.MOUSE_OUT = "onMouseOut";
	FWDEVPAdsStart.MOUSE_UP = "onMouseDown";
	
	FWDEVPAdsStart.prototype = null;
	window.FWDEVPAdsStart = FWDEVPAdsStart;
}(window));