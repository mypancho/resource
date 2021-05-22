/* FWDEVPPopupAddButton */
(function (){
var FWDEVPPopupAddButton = function(
		    parent,
			imageSource,
			start,
			end,
			link,
			target,
			id,
			popupAddCloseNPath_str,
			popupAddCloseSPath_str,
			showPopupAdsCloseButton_bl
		){
		
		var self = this;
		var prototype = FWDEVPPopupAddButton.prototype;
		
		this.closeButton_do;
		this.image_do;
		this.imageSource = imageSource;
		this.link = link;
		this.target = target;
		this.start = start;
		this.end = end;
		this.finalW = 0;
		this.finalH = 0;
		this.id = id;
		
		this.showPopupAdsCloseButton_bl = showPopupAdsCloseButton_bl;
		this.popupAddCloseNPath_str = popupAddCloseNPath_str;
		this.popupAddCloseSPath_str = popupAddCloseSPath_str;
		
		this.isClosed_bl = false;
		this.isLoaded_bl = false;
		this.isShowed_bl = false;

		
		//##########################################//
		/* initialize self */
		//##########################################//
		this.init = function(){
			this.image = new Image();
			this.image.src = this.imageSource;
			this.image.onload = this.onLoadHandler;
			
			if(self.link){
				self.setButtonMode(true);
			}
			
			if(self.showPopupAdsCloseButton_bl){
				FWDEVPSimpleSizeButton.setPrototype();
				self.closeButton_do = new FWDEVPSimpleSizeButton(
						self.popupAddCloseNPath_str, 
						self.popupAddCloseSPath_str,
						21,
						21
						);
				self.closeButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, self.closeClickButtonCloseHandler);
			}
		};
		
		this.closeClickButtonCloseHandler = function(){
			self.hide();
			self.isClosed_bl = true;
		};
		
		this.clickHandler = function(){
			if(self.link){
				parent.parent.pause();
				window.open(self.link, self.target);
			}
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.onLoadHandler = function(){
			self.originalW = self.image.width;
			self.originalH = self.image.height;
			self.image_do = new FWDEVPDisplayObject("img");
			self.image_do.setScreen(self.image);
			self.image_do.setWidth(self.originalW);
			self.image_do.setHeight(self.originalH);
			self.addChild(self.image_do);
			self.isLoaded_bl = true;
			if(self.closeButton_do){
				self.addChild(self.closeButton_do);
				self.closeButton_do.setX(-300);
			}
			//self.resizeAndPosition(true);
			if(self.screen.addEventListener){
				self.image_do.screen.addEventListener("click", self.clickHandler);
			}else{
				self.image_do.screen.attachEvent("onclick", self.clickHandler);
			}
		};
		
		this.hide = function(remove){
			if(!this.isShowed_bl) return;
			this.isShowed_bl = false;
			var scale = Math.min(1, parent.parent.tempVidStageWidth/(self.originalW));			
			var finalH = parseInt(scale * self.originalH);
			
			finalY = parseInt(parent.parent.tempVidStageHeight);
			parent.setY(finalY);
			
			FWDAnimation.killTweensOf(parent);
			if(remove){
				parent.removeChild(self);
				parent.setWidth(0);
				parent.setHeight(0);
			}else{
				self.setWidth(0);
				self.setHeight(0);
				parent.setVisible(false);
				self.setVisible(false);
			}
		};
		
		this.show = function(){
			if(this.isShowed_bl || this.isClosed_bl || !self.isLoaded_bl) return;
			this.isShowed_bl = true;
			setTimeout(function(){
				FWDAnimation.killTweensOf(parent);
				parent.setVisible(true);
				self.setVisible(true);
				var scale = Math.min(1, parent.parent.tempVidStageWidth/(self.originalW));			
				var finalH = parseInt(scale * self.originalH) - 2;
				
				
				if(parent.parent.controller_do.isShowed_bl){
					finalY = parseInt(parent.parent.tempVidStageHeight - parent.parent.controller_do.h - (self.originalH * scale) + 2 + finalH);
				}else{
					finalY = parseInt(parent.parent.tempVidStageHeight - (self.originalH * scale) + 2 + finalH);
				}	
				parent.setY(finalY);
			
				self.resizeAndPosition(true);
			}, 100);
		};
		
		//###############################//
		/* set final size */
		//###############################//
		this.resizeAndPosition = function(animate){
			if(!self.isLoaded_bl || self.isClosed_bl || !self.isShowed_bl) return;
	
			var finalY;
			var hasScale_bl = !FWDEVPUtils.isIEAndLessThen9;
			var scale = 1;
		
			scale = Math.min(1, parent.parent.tempVidStageWidth/(self.originalW));			
		
			self.finalW = parseInt(scale * self.originalW);
			self.finalH = parseInt(scale * self.originalH);
			
			if(self.finalW == self.prevFinalW && self.finalH == self.prevFinalH) return;
		
			self.setWidth(self.finalW);
			self.setHeight(self.finalH);
			self.image_do.setWidth(self.finalW);
			self.image_do.setHeight(self.finalH);
			
			if(parent.parent.controller_do){
				if(parent.parent.controller_do.isShowed_bl){
					finalY = parseInt(parent.parent.tempVidStageHeight - parent.parent.controller_do.h - (self.originalH * scale) - 10);
				}else{
					finalY = parseInt(parent.parent.tempVidStageHeight - (self.originalH * scale) - 10);
				}	
			}else{
				finalY = parseInt(parent.parent.tempVidStageHeight - (self.originalH * scale));
			}
			
			parent.setX(parseInt((parent.parent.tempVidStageWidth - self.finalW)/2));
			
			FWDAnimation.killTweensOf(parent);
			if(animate){
				FWDAnimation.to(parent, .8, {y:finalY, ease:Expo.easeInOut});
			}else{
				parent.setY(finalY);
			}
			
			if(self.closeButton_do){
				self.closeButton_do.setY(2);
				self.closeButton_do.setX(parseInt(self.finalW - 21 - 2));
			}
			
			
			self.prevFinalW = self.finalW;
			self.prevFinallH = self.finalH;
			parent.setWidth(self.finalW);
			parent.setHeight(self.finalH);
		};

		self.init();
	};
	
	/* set prototype */
	FWDEVPPopupAddButton.setPrototype = function(){
		FWDEVPPopupAddButton.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPPopupAddButton.MOUSE_OVER = "onMouseOver";
	FWDEVPPopupAddButton.MOUSE_OUT = "onMouseOut";
	FWDEVPPopupAddButton.CLICK = "onClick";
	
	FWDEVPPopupAddButton.prototype = null;
	window.FWDEVPPopupAddButton = FWDEVPPopupAddButton;
}(window));