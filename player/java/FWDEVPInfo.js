/* Info screen */
(function (window){
	
	var FWDEVPInfo = function(parent, warningIconPath, showErrorInfo){
		
		var self = this;
		var prototype = FWDEVPInfo.prototype;
		
		this.bk_do = null;
		this.textHolder_do = null;
		
		this.warningIconPath_str = warningIconPath;
		
		this.showErrorInfo_bl = showErrorInfo;
		this.show_to = null;
		this.isShowed_bl = false;
		this.isShowedOnce_bl = false;
		this.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setResizableSizeAfterParent();
			
			self.bk_do = new FWDEVPDisplayObject("div");
			self.bk_do.setAlpha(.2);
			self.bk_do.setBkColor("#000000");
			self.addChild(self.bk_do);
			
			self.textHolder_do = new FWDEVPDisplayObject("div");
			if(!FWDEVPUtils.isIEAndLessThen9) self.textHolder_do.getStyle().font = "Arial";
			self.textHolder_do.getStyle().wordWrap = "break-word";
			self.textHolder_do.getStyle().padding = "10px";
			self.textHolder_do.getStyle().paddingLeft = "42px";
			self.textHolder_do.getStyle().lineHeight = "18px";
			self.textHolder_do.getStyle().color = "#000000";
			self.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = this.warningIconPath_str;
			this.img_do = new FWDEVPDisplayObject("img");
			this.img_do.setScreen(img_img);
			this.img_do.setWidth(28);
			this.img_do.setHeight(28);
			
			self.addChild(self.textHolder_do);
			self.addChild(self.img_do);
		};
		
		this.showText = function(txt){
			
			if(!self.isShowedOnce_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("pointerdown", self.closeWindow);
				}else{
					self.screen.addEventListener("mousedown", self.closeWindow);
					self.screen.addEventListener("touchstart", self.closeWindow);
				}
				self.isShowedOnce_bl = true;
			}
			
			self.setVisible(false);
			
			self.textHolder_do.getStyle().paddingBottom = "10px";
			self.textHolder_do.setInnerHTML(txt);
			
			
			clearTimeout(self.show_to);
			self.show_to = setTimeout(self.show, 60);
			setTimeout(function(){
				self.positionAndResize();
			}, 10);
		};
		
		this.show = function(){
			var finalW = Math.min(640, parent.stageWidth - 120);
			self.isShowed_bl = true;
		
			self.textHolder_do.setWidth(finalW);
			setTimeout(function(){
				if(self.showErrorInfo_bl)self.setVisible(true);
				self.positionAndResize();
			}, 100);
		};
		
		this.positionAndResize = function(){
			
			var finalW = self.textHolder_do.getWidth();
			var finalH = self.textHolder_do.getHeight();
			var finalX = parseInt((parent.stageWidth - finalW)/2);
			var finalY = parseInt((parent.stageHeight - finalH)/2);
			
			self.bk_do.setWidth(parent.stageWidth);
			self.bk_do.setHeight(parent.stageHeight);
			self.textHolder_do.setX(finalX);
			self.textHolder_do.setY(finalY);
			
			self.img_do.setX(finalX + 6);
			self.img_do.setY(finalY + parseInt((self.textHolder_do.getHeight() - self.img_do.h)/2));
			//self.img_do.setY(finalY + 6);
		};
		
		this.closeWindow = function(){
			if(!self.allowToRemove_bl) return;
			self.isShowed_bl = false;
			clearTimeout(self.show_to);
			try{parent.main_do.removeChild(self);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDEVPInfo.setPrototype = function(){
		FWDEVPInfo.prototype = new FWDEVPDisplayObject("div", "relative");
	};
	
	FWDEVPInfo.prototype = null;
	window.FWDEVPInfo = FWDEVPInfo;
}(window));