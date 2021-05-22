/* Info screen */
(function (window){
	
	var FWDEVPPassword = function(data, parent){
		
		var self = this;
		var prototype = FWDEVPPassword.prototype;
		
		this.xhr = null;
		
		this.passColoseN_img = data.passColoseN_img;
		
		this.privateVideoPassword_str = data.privateVideoPassword_str;
		this.bk_do = null;
		this.mainHolder_do = null;
	
		this.passMainHolder_do = null;
		this.passMainHolderBk_do = null;
		this.passMainLabel_do = null;
		this.passLabel_do = null;
		this.passInput_do = null;
		
		this.closeButton_do = null;
		
	
		this.embedWindowBackground_str = data.embedWindowBackground_str;
		
		this.secondaryLabelsColor_str = data.secondaryLabelsColor_str;
		this.inputColor_str = data.inputColor_str;
		this.mainLabelsColor_str = data.mainLabelsColor_str;
		this.passButtonNPath_str = data.passButtonNPath_str;
		this.passButtonSPath_str = data.passButtonSPath_str;
		this.inputBackgroundColor_str = data.inputBackgroundColor_str;
		this.borderColor_str = data.borderColor_str;
		
		this.maxTextWidth = 0;
		this.totalWidth = 0;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.buttonWidth = 28;
		this.buttonHeight = 19;
		this.embedWindowCloseButtonMargins = data.embedWindowCloseButtonMargins;
		this.finalEmbedPath_str = null;
		
		this.isShowed_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
	
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setBackfaceVisibility();
			self.mainHolder_do = new FWDEVPDisplayObject("div");
			self.mainHolder_do.hasTransform3d_bl = false;
			self.mainHolder_do.hasTransform2d_bl = false;
			self.mainHolder_do.setBackfaceVisibility();
			
			self.bk_do = new FWDEVPDisplayObject("div");
			self.bk_do.getStyle().width = "100%";
			self.bk_do.getStyle().height = "100%";
			self.bk_do.setAlpha(.9);
			self.bk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
		
			self.passMainHolder_do =  new FWDEVPDisplayObject("div");
			
			self.passMainHolderBk_do = new FWDEVPDisplayObject("div");
			self.passMainHolderBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.passMainHolderBk_do.getStyle().borderStyle = "solid";
			self.passMainHolderBk_do.getStyle().borderWidth = "1px";
			self.passMainHolderBk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.passMainLabel_do = new FWDEVPDisplayObject("div");
			self.passMainLabel_do.setBackfaceVisibility();
			self.passMainLabel_do.getStyle().fontFamily = "Arial";
			self.passMainLabel_do.getStyle().fontSize= "12px";
			self.passMainLabel_do.getStyle().color = self.mainLabelsColor_str;
			self.passMainLabel_do.getStyle().whiteSpace= "nowrap";
			self.passMainLabel_do.getStyle().fontSmoothing = "antialiased";
			self.passMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.passMainLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.passMainLabel_do.getStyle().padding = "0px";
			self.passMainLabel_do.setInnerHTML("PRIVATE VIDEO");	
			
			
			self.passLabel_do = new FWDEVPDisplayObject("div");
			self.passLabel_do.setBackfaceVisibility();
			self.passLabel_do.getStyle().fontFamily = "Arial";
			self.passLabel_do.getStyle().fontSize= "12px";
			self.passLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.passLabel_do.getStyle().whiteSpace= "nowrap";
			self.passLabel_do.getStyle().fontSmoothing = "antialiased";
			self.passLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.passLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.passLabel_do.getStyle().padding = "0px";
			self.passLabel_do.setInnerHTML("Please enter password:");
			
			self.passInput_do = new FWDEVPDisplayObject("input");
			self.passInput_do.setBackfaceVisibility();
			self.passInput_do.getStyle().fontFamily = "Arial";
			self.passInput_do.getStyle().fontSize= "12px";
			self.passInput_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.passInput_do.getStyle().color = self.inputColor_str;
			self.passInput_do.getStyle().outline = 0;
			self.passInput_do.getStyle().whiteSpace= "nowrap";
			self.passInput_do.getStyle().fontSmoothing = "antialiased";
			self.passInput_do.getStyle().webkitFontSmoothing = "antialiased";
			self.passInput_do.getStyle().textRendering = "optimizeLegibility";
			self.passInput_do.getStyle().padding = "6px";
			self.passInput_do.getStyle().paddingTop = "4px";
			self.passInput_do.getStyle().paddingBottom = "4px";
			self.passInput_do.screen.setAttribute("type", "password");
			
			FWDEVPSimpleSizeButton.setPrototype();
			self.passButton_do = new FWDEVPSimpleSizeButton(
					self.passButtonNPath_str, 
					self.passButtonSPath_str,
					self.buttonWidth,
					self.buttonHeight,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str
					);
			self.passButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, self.passClickHandler);
			
			//setup close button
			FWDEVPSimpleButton.setPrototype();
			self.closeButton_do = new FWDEVPSimpleButton(self.passColoseN_img, data.embedWindowClosePathS_str, undefined,
					true,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str);
			self.closeButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			self.addChild(self.mainHolder_do);
			self.mainHolder_do.addChild(self.bk_do);
			
		
			self.passMainHolder_do.addChild(self.passMainHolderBk_do);
			self.passMainHolder_do.addChild(self.passMainLabel_do);
			self.passMainHolder_do.addChild(self.passLabel_do);
			self.passMainHolder_do.addChild(self.passInput_do);
			self.passMainHolder_do.addChild(self.passButton_do);
		
			self.mainHolder_do.addChild(self.passMainHolder_do);
			self.mainHolder_do.addChild(self.closeButton_do); 
		};
	
		this.closeButtonOnMouseUpHandler = function(){
			if(!self.isShowed_bl) return;
			self.hide();
		};
		
	
		function selectText(){
			if(window.top != window && FWDEVPUtils.isIE) return;
			var range, selection;
			if (document.body.createTextRange) {
				range = document.body.createTextRange();
			    range.moveToElementText(this);
			    range.select();
			}else if(window.getSelection && document.createRange) {
			    selection = window.getSelection();
			    range = document.createRange();
			    range.selectNodeContents(this);
			    selection.removeAllRanges();
			    selection.addRange(range);
			}
		};
		
		this.positionAndResize = function(){
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			
			self.maxTextWidth = Math.min(self.stageWidth - 150, 300);
			self.totalWidth = self.maxTextWidth + self.buttonWidth;
			
			self.positionFinal();
			
			self.closeButton_do.setX(self.stageWidth - self.closeButton_do.w - self.embedWindowCloseButtonMargins);
			self.closeButton_do.setY(self.embedWindowCloseButtonMargins);
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
		};
		
		this.positionFinal = function(){
			
			var totalHeight;
			
			var textLableHeight = self.passLabel_do.getHeight();
		
			var passMainLabelHeight;
			
			
			passMainLabelHeight = self.passMainLabel_do.getHeight();
			
			self.passMainLabel_do.setX(16);
			self.passLabel_do.setX(16);
			self.passLabel_do.setY(passMainLabelHeight + 14);
			
			self.passInput_do.setX(10);
			self.passInput_do.setWidth(parseInt(self.totalWidth - 40 - self.buttonWidth));
			self.passInput_do.setY(self.passLabel_do.y + textLableHeight + 5);
			self.passButton_do.setX(10 + self.passInput_do.w + 20);
			self.passButton_do.setY(self.passLabel_do.y + textLableHeight + 5);
			
			self.passMainHolderBk_do.setY(self.passLabel_do.y - 9);
			self.passMainHolderBk_do.setWidth(self.totalWidth - 2);
			self.passMainHolderBk_do.setHeight(self.passButton_do.y + self.passButton_do.h - 9);
			self.passMainHolder_do.setWidth(self.totalWidth);
			self.passMainHolder_do.setHeight(self.passButton_do.y + self.passButton_do.h + 14);

			self.passMainHolder_do.setX(Math.round((self.stageWidth - self.totalWidth)/2));
			totalHeight = self.passMainHolderBk_do.getHeight();
			self.passMainHolder_do.setY(Math.round((self.stageHeight - totalHeight)/2) - 10);
			
		};
		
		//##############################################//
		/* Send email */
		//##############################################//
		this.passClickHandler = function(){
			
			if(self.privateVideoPassword_str != FWDEVPUtils.MD5(self.passInput_do.screen.value)){
				if(!FWDAnimation.isTweening(self.passInput_do.screen)) FWDAnimation.to(self.passInput_do.screen, .1, {css:{backgroundColor:'#FF0000'}, yoyo:true, repeat:3});
				return;
			}
			self.dispatchEvent(FWDEVPPassword.CORRECT);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		this.updateHEXColors = function(normalColor_str, selectedColor_str){
			self.passButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			self.closeButton_do.updateHEXColors(normalColor_str, selectedColor_str);
		}
		
		/* show hide info */
		//#########################################//
		this.showInfo = function(text, hasError){
				
			self.infoText_do.setInnerHTML(text);
			self.passMainHolder_do.addChild(self.infoText_do);
			self.infoText_do.setWidth(self.buttonWidth);
			self.infoText_do.setHeight(self.buttonHeight - 4);
			self.infoText_do.setX(self.passButton_do.x);
			self.infoText_do.setY(self.passButton_do.y - 23);

			self.infoText_do.setAlpha(0);
			if(hasError){
				self.infoText_do.getStyle().color = "#FF0000";
			}else{
				self.infoText_do.getStyle().color = self.mainLabelsColor_str;
			}
			FWDAnimation.killTweensOf(self.infoText_do);
			FWDAnimation.to(self.infoText_do, .16, {alpha:1, yoyo:true, repeat:7});
		};
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			parent.main_do.addChild(self);
			
			self.passButton_do.setSelectedState();
			self.passInput_do.setInnerHTML("");
			if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) parent.main_do.setSelectable(true);
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.mainHolder_do.setY(- self.stageHeight);
			
			self.showCompleteId_to = setTimeout(self.showCompleteHandler, 900);
			setTimeout(function(){
				FWDAnimation.to(self.mainHolder_do, .8, {y:0, delay:.1, ease:Expo.easeInOut});
			}, 100);
		};
		
		this.showCompleteHandler = function(){};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			
			if(parent.customContextMenu_do) parent.customContextMenu_do.enable();
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			
			if(!FWDEVPUtils.isMobile || (FWDEVPUtils.isMobile && FWDEVPUtils.hasPointerEvent)) parent.main_do.setSelectable(false);
			self.hideCompleteId_to = setTimeout(self.hideCompleteHandler, 800);
			FWDAnimation.killTweensOf(self.mainHolder_do);
			FWDAnimation.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
		};
		
		this.hideCompleteHandler = function(){
			parent.main_do.removeChild(self);
			self.dispatchEvent(FWDEVPPassword.HIDE_COMPLETE);
		};
	
		this.init();
	};
		
	/* set prototype */
	FWDEVPPassword.setPrototype = function(){
		FWDEVPPassword.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPPassword.ERROR = "error";
	FWDEVPPassword.CORRECT = "correct";
	FWDEVPPassword.HIDE_COMPLETE = "hideComplete";
	
	FWDEVPPassword.prototype = null;
	window.FWDEVPPassword = FWDEVPPassword;
}(window));