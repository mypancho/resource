/* Info screen */
(function (window){
	
	var FWDEVPOPWindow = function(data, parent){
		
		var self = this;
		var prototype = FWDEVPOPWindow.prototype;
		
		this.adHolder_do = null;
		this.mainHolder_do = null;
		this.closeButton_do = null;
		
		this.buttons_ar = [];
	
			
		this.maxWidth = data.aopwWidth;
		this.maxHeight = data.aopwHeight + data.popwColseN_img.height + 1; 
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.aopwSource = data.aopwSource;
		this.aopwTitle = data.aopwTitle;
		this.aopwTitleColor_str = data.aopwTitleColor_str;
		this.aopwBorderSize = data.aopwBorderSize;
		
		this.isShowed_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
	
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setBackfaceVisibility();
			
			self.mainBar_do = new FWDEVPDisplayObject("div");
			
			self.bar_do = new FWDEVPDisplayObject("div");
			self.bar_do.getStyle().background = "url('" + data.popwBarBackgroundPath_str + "')";
			
			self.adHolder_do = new FWDEVPDisplayObject("div");
		
			
			self.adBk_do = new FWDEVPDisplayObject("div");
			self.adBk_do.getStyle().background = "url('" + data.popwWindowBackgroundPath_str + "')";
				
			//setup close button
			FWDEVPSimpleButton.setPrototype();
			self.closeButton_do = new FWDEVPSimpleButton(data.popwColseN_img, data.popwColseSPath_str, undefined,
					true,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str);
			self.closeButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			
			self.title_do = new FWDEVPDisplayObject("div");
			self.title_do.getStyle().width = "100%";
			self.title_do.getStyle().textAlign = "left";
			//self.title_do.getStyle().fontSmoothing = "antialiased";
			//self.title_do.getStyle().webkitFontSmoothing = "antialiased";
			//self.title_do.getStyle().textRendering = "optimizeLegibility";
			self.title_do.getStyle().fontFamily = "Arial";
			self.title_do.getStyle().fontSize= "14px";
			self.title_do.getStyle().fontWeight = "100";
			self.title_do.getStyle().color = self.aopwTitleColor_str;
			self.title_do.setInnerHTML(self.aopwTitle);
			self.bar_do.addChild(self.title_do);
			
		
			self.addChild(self.adBk_do);
			self.mainBar_do.addChild(self.bar_do);
			self.mainBar_do.addChild(self.closeButton_do); 
			self.mainBar_do.setHeight(self.closeButton_do.h);
			self.addChild(self.mainBar_do);
			self.addChild(self.adHolder_do);
			self.bar_do.setHeight(self.mainBar_do.h);
			
		};
		
		
		this.closeButtonOnMouseUpHandler = function(){
			if(!self.isShowed_bl) return;
			self.hide();
			parent.play();
		};
		
	
		this.positionAndResize = function(){
			self.stageWidth = Math.min(parent.stageWidth, self.maxWidth);
			self.stageHeight = Math.min(parent.stageHeight, self.maxHeight);
			var totalScale = 1;
			var scaleX = parent.stageWidth/self.maxWidth;
			var scaleY = parent.stageHeight/self.maxHeight;
			if(scaleX < scaleY){
				totalScale = scaleX;
			}else if(scaleX > scaleY){
				totalScale = scaleY;
			}
			if(totalScale > 1) totalScale = 1;
			
			self.stageWidth = totalScale * self.maxWidth;
			self.stageHeight = totalScale * self.maxHeight;
			
				
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
		
			self.setHeight(self.stageHeight);
			self.setX(Math.round((parent.stageWidth - self.stageWidth)/2));
			self.setY(Math.round((parent.stageHeight - self.stageHeight)/2));
			
			self.mainBar_do.setWidth(self.stageWidth);
			self.closeButton_do.setX(self.stageWidth - self.closeButton_do.w);
			self.bar_do.setWidth(self.stageWidth - self.closeButton_do.w - 1);
			
			self.adBk_do.setWidth(self.stageWidth);
			self.adBk_do.setHeight(self.stageHeight - self.mainBar_do.h - 1);
			self.adBk_do.setY(self.mainBar_do.h + 1);
			
			self.adHolder_do.setWidth(self.stageWidth - self.aopwBorderSize * 2);
			self.adHolder_do.setX(self.aopwBorderSize);
			self.adHolder_do.setY(self.mainBar_do.h + self.aopwBorderSize + 1);
			self.adHolder_do.setHeight(self.stageHeight - self.mainBar_do.h - self.aopwBorderSize * 2 - 1);
		};
		
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			parent.main_do.addChild(self);
			self.adHolder_do.setInnerHTML("<iframe width='100%' height='100%' scrolling='no' frameBorder='0' src=" + self.aopwSource + "></iframe>");
			self.positionAndResize();
			
			self.title_do.setX(8);
			self.title_do.setY(Math.round((self.bar_do.h - self.title_do.getHeight())/2));
			
			
			/*
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.mainHolder_do.setY(- self.stageHeight);
			
			self.showCompleteId_to = setTimeout(self.showCompleteHandler, 900);
			setTimeout(function(){
				FWDAnimation.to(self.mainHolder_do, .8, {y:0, delay:.1, ease:Expo.easeInOut});
			}, 100);
			*/
		};
		
		this.showCompleteHandler = function(){};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			if(parent.main_do.contains(self)) parent.main_do.removeChild(self);
	
			
			/*
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			
			if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) parent.main_do.setSelectable(false);
			self.hideCompleteId_to = setTimeout(self.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(self.mainHolder_do);
			FWDAnimation.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
			*/
		};
		
		this.hideCompleteHandler = function(){
			parent.main_do.removeChild(self);
			self.dispatchEvent(FWDEVPOPWindow.HIDE_COMPLETE);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		this.updateHEXColors = function(normalColor_str, selectedColor_str){
			self.closeButton_do.updateHEXColors(normalColor_str, selectedColor_str);
		}
	
		this.init();
	};
		
	/* set prototype */
	FWDEVPOPWindow.setPrototype = function(){
		FWDEVPOPWindow.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPOPWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDEVPOPWindow.prototype = null;
	window.FWDEVPOPWindow = FWDEVPOPWindow;
}(window));