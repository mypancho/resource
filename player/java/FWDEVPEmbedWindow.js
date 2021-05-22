/* Info screen */
(function (window){
	
	var FWDEVPEmbedWindow = function(data, parent){
		
		var self = this;
		var prototype = FWDEVPEmbedWindow.prototype;
		
		this.xhr = null;
		
		this.embedColoseN_img = data.embedColoseN_img;
		
		this.bk_do = null;
		this.mainHolder_do = null;
		this.embedAndLinkMainLabel_do = null;
		this.linkAndEmbedHolderBk_do = null;
		this.linkText_do = null;
		this.linkLabel_do = null;
		this.embedText_do = null;
		this.embedLabel_do = null;
		this.linkAndEmbedHolder_do = null;
		this.copyLinkButton_do = null;
		this.copyEmbedButton_do = null;
		
		this.infoText_do = null;
		
		this.sendMainHolder_do = null;
		this.sendMainHolderBk_do = null;
		this.sendMainLabel_do = null;
		this.yourEmailLabel_do = null;
		this.yourEmailInput_do = null;
		this.friendEmailLabel_do = null;
		this.friendEmailInput_do = null;
		
		this.closeButton_do = null;
		
		this.videoLink_str = null;
		this.embedWindowBackground_str = data.embedWindowBackground_str;
		this.embedWindowInputBackgroundPath_str = data.embedWindowInputBackgroundPath_str;
		this.secondaryLabelsColor_str = data.secondaryLabelsColor_str;
		this.inputColor_str = data.inputColor_str;
		this.mainLabelsColor_str = data.mainLabelsColor_str;
		this.sendButtonNPath_str = data.sendButtonNPath_str;
		this.sendButtonSPath_str = data.sendButtonSPath_str;
		this.inputBackgroundColor_str = data.inputBackgroundColor_str;
		this.borderColor_str = data.borderColor_str;
		this.sendToAFriendPath_str = data.sendToAFriendPath_str;
		
		this.maxTextWidth = 0;
		this.totalWidth = 0;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.buttonWidth = 44;
		this.buttonHeight = 19;
		this.embedWindowCloseButtonMargins = data.embedWindowCloseButtonMargins;
	
		this.finalEmbedPath_str = null;
		this.finalEmbedCode_str = null;
		this.linkToVideo_str = null;
		this.shareAndEmbedTextColor_str = data.shareAndEmbedTextColor_str;
	
		this.isSending_bl = false;
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
		
			//setup link and embed text
			self.linkAndEmbedHolder_do =  new FWDEVPDisplayObject("div");
			
			self.linkAndEmbedHolderBk_do = new FWDEVPDisplayObject("div");
			self.linkAndEmbedHolderBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.linkAndEmbedHolderBk_do.getStyle().borderStyle = "solid";
			self.linkAndEmbedHolderBk_do.getStyle().borderWidth = "1px";
			self.linkAndEmbedHolderBk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.embedAndLinkMainLabel_do = new FWDEVPDisplayObject("div");
			self.embedAndLinkMainLabel_do.setBackfaceVisibility();
			self.embedAndLinkMainLabel_do.getStyle().fontFamily = "Arial";
			self.embedAndLinkMainLabel_do.getStyle().fontSize= "12px";
			self.embedAndLinkMainLabel_do.getStyle().color = self.mainLabelsColor_str;
			self.embedAndLinkMainLabel_do.getStyle().whiteSpace= "nowrap";
			self.embedAndLinkMainLabel_do.getStyle().fontSmoothing = "antialiased";
			self.embedAndLinkMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedAndLinkMainLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.embedAndLinkMainLabel_do.getStyle().padding = "0px";
			self.embedAndLinkMainLabel_do.setInnerHTML("SHARE & EMBED");	
			
			self.linkLabel_do = new FWDEVPDisplayObject("div");
			self.linkLabel_do.setBackfaceVisibility();
			self.linkLabel_do.getStyle().fontFamily = "Arial";
			self.linkLabel_do.getStyle().fontSize= "12px";
			self.linkLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.linkLabel_do.getStyle().whiteSpace= "nowrap";
			self.linkLabel_do.getStyle().fontSmoothing = "antialiased";
			self.linkLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.linkLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.linkLabel_do.getStyle().padding = "0px";
			self.linkLabel_do.setInnerHTML("Link to this video:");	
			
			self.linkText_do = new FWDEVPDisplayObject("div");
			self.linkText_do.setBackfaceVisibility();
			self.linkText_do.getStyle().fontFamily = "Arial";
			self.linkText_do.getStyle().fontSize= "12px";
			self.linkText_do.getStyle().color = self.shareAndEmbedTextColor_str;
			if(!FWDEVPUtils.isIEAndLessThen9) self.linkText_do.getStyle().wordBreak = "break-all";
			self.linkText_do.getStyle().fontSmoothing = "antialiased";
			self.linkText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.linkText_do.getStyle().textRendering = "optimizeLegibility";
			self.linkText_do.getStyle().padding = "6px";
			self.linkText_do.getStyle().paddingTop = "4px";
			self.linkText_do.getStyle().paddingBottom = "4px";
			self.linkText_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.linkText_do.screen.onclick = selectText;
			
			self.embedLabel_do = new FWDEVPDisplayObject("div");
			self.embedLabel_do.setBackfaceVisibility();
			self.embedLabel_do.getStyle().fontFamily = "Arial";
			self.embedLabel_do.getStyle().fontSize= "12px";
			self.embedLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.embedLabel_do.getStyle().whiteSpace= "nowrap";
			self.embedLabel_do.getStyle().fontSmoothing = "antialiased";
			self.embedLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.embedLabel_do.getStyle().padding = "0px";
			self.embedLabel_do.setInnerHTML("Embed this video:");
			
			self.embedText_do = new FWDEVPDisplayObject("div");
			self.embedText_do.setBackfaceVisibility();
			if(!FWDEVPUtils.isIEAndLessThen9) self.embedText_do.getStyle().wordBreak = "break-all";
			self.embedText_do.getStyle().fontFamily = "Arial";
			self.embedText_do.getStyle().fontSize= "12px";
			self.embedText_do.getStyle().lineHeight = "16px";
			self.embedText_do.getStyle().color = self.shareAndEmbedTextColor_str;
			self.embedText_do.getStyle().fontSmoothing = "antialiased";
			self.embedText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedText_do.getStyle().textRendering = "optimizeLegibility";
			self.embedText_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.embedText_do.getStyle().padding = "6px";
			self.embedText_do.getStyle().paddingTop = "4px";
			self.embedText_do.getStyle().paddingBottom = "4px";
			self.embedText_do.screen.onclick = selectText;
		
			//setup flash buttons
			FWDEVPFlashButton.setPrototype();
			self.copyLinkButton_do = new FWDEVPFlashButton(
					data.embedCopyButtonNPath_str,
					data.embedCopyButtonSPath_str,
					data.flashCopyToCBPath_str,
					parent.instanceName_str + "copyLink",
					parent.instanceName_str + ".copyLinkButtonOnMouseOver",
					parent.instanceName_str + ".copyLinkButtonOnMouseOut",
					parent.instanceName_str + ".copyLinkButtonOnMouseClick",
					parent.instanceName_str + ".getLinkCopyPath",
					self.buttonWidth,
					self.buttonHeight,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str
			);
			self.copyLinkButton_do.addListener(FWDEVPFlashButton.CLICK, self.showFlashButtonInstallError);
			
			FWDEVPFlashButton.setPrototype();
			self.copyEmbedButton_do = new FWDEVPFlashButton(
					data.embedCopyButtonNPath_str,
					data.embedCopyButtonSPath_str,
					data.flashCopyToCBPath_str,
					parent.instanceName_str + "embedCode",
					parent.instanceName_str + ".embedkButtonOnMouseOver",
					parent.instanceName_str + ".embedButtonOnMouseOut",
					parent.instanceName_str + ".embedButtonOnMouseClick",
					parent.instanceName_str + ".getEmbedCopyPath",
					self.buttonWidth,
					self.buttonHeight,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str
			);
			self.copyEmbedButton_do.addListener(FWDEVPFlashButton.CLICK, self.showFlashButtonInstallError);
			
			

			//setup send to a friend
			self.sendMainHolder_do =  new FWDEVPDisplayObject("div");
			
			self.sendMainHolderBk_do = new FWDEVPDisplayObject("div");
			self.sendMainHolderBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.sendMainHolderBk_do.getStyle().borderStyle = "solid";
			self.sendMainHolderBk_do.getStyle().borderWidth = "1px";
			self.sendMainHolderBk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.sendMainLabel_do = new FWDEVPDisplayObject("div");
			self.sendMainLabel_do.setBackfaceVisibility();
			self.sendMainLabel_do.getStyle().fontFamily = "Arial";
			self.sendMainLabel_do.getStyle().fontSize= "12px";
			self.sendMainLabel_do.getStyle().color = self.mainLabelsColor_str;
			self.sendMainLabel_do.getStyle().whiteSpace= "nowrap";
			self.sendMainLabel_do.getStyle().fontSmoothing = "antialiased";
			self.sendMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.sendMainLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.sendMainLabel_do.getStyle().padding = "0px";
			self.sendMainLabel_do.setInnerHTML("SEND TO A FRIEND");	
			
			self.yourEmailLabel_do = new FWDEVPDisplayObject("div");
			self.yourEmailLabel_do.setBackfaceVisibility();
			self.yourEmailLabel_do.getStyle().fontFamily = "Arial";
			self.yourEmailLabel_do.getStyle().fontSize= "12px";
			self.yourEmailLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.yourEmailLabel_do.getStyle().whiteSpace= "nowrap";
			self.yourEmailLabel_do.getStyle().fontSmoothing = "antialiased";
			self.yourEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.yourEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.yourEmailLabel_do.getStyle().padding = "0px";
			self.yourEmailLabel_do.setInnerHTML("Your email:");
			
			self.yourEmailInput_do = new FWDEVPDisplayObject("input");
			self.yourEmailInput_do.setBackfaceVisibility();
			self.yourEmailInput_do.getStyle().fontFamily = "Arial";
			self.yourEmailInput_do.getStyle().fontSize= "12px";
			self.yourEmailInput_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.yourEmailInput_do.getStyle().color = self.inputColor_str;
			self.yourEmailInput_do.getStyle().outline = 0;
			self.yourEmailInput_do.getStyle().whiteSpace= "nowrap";
			self.yourEmailInput_do.getStyle().fontSmoothing = "antialiased";
			self.yourEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
			self.yourEmailInput_do.getStyle().textRendering = "optimizeLegibility";
			self.yourEmailInput_do.getStyle().padding = "6px";
			self.yourEmailInput_do.getStyle().paddingTop = "4px";
			self.yourEmailInput_do.getStyle().paddingBottom = "4px";
			
			self.friendEmailLabel_do = new FWDEVPDisplayObject("div");
			self.friendEmailLabel_do.setBackfaceVisibility();
			self.friendEmailLabel_do.getStyle().fontFamily = "Arial";
			self.friendEmailLabel_do.getStyle().fontSize= "12px";
			self.friendEmailLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.friendEmailLabel_do.getStyle().whiteSpace= "nowrap";
			self.friendEmailLabel_do.getStyle().fontSmoothing = "antialiased";
			self.friendEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.friendEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.friendEmailLabel_do.getStyle().padding = "0px";
			self.friendEmailLabel_do.setInnerHTML("Your friend's email:");
			
			self.friendEmailInput_do = new FWDEVPDisplayObject("input");
			self.friendEmailInput_do.setBackfaceVisibility();
			self.friendEmailInput_do.getStyle().fontFamily = "Arial";
			self.friendEmailInput_do.getStyle().fontSize= "12px";
			self.friendEmailInput_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.friendEmailInput_do.getStyle().color = self.inputColor_str;
			self.friendEmailInput_do.getStyle().outline= 0;
			self.friendEmailInput_do.getStyle().whiteSpace= "nowrap";
			self.friendEmailInput_do.getStyle().fontSmoothing = "antialiased";
			self.friendEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
			self.friendEmailInput_do.getStyle().textRendering = "optimizeLegibility";
			self.friendEmailInput_do.getStyle().padding = "6px";
			self.friendEmailInput_do.getStyle().paddingTop = "4px";
			self.friendEmailInput_do.getStyle().paddingBottom = "4px";	
			
			FWDEVPSimpleSizeButton.setPrototype();
			self.sendButton_do = new FWDEVPSimpleSizeButton(
					self.sendButtonNPath_str, 
					self.sendButtonSPath_str,
					self.buttonWidth,
					self.buttonHeight,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str
					);
			self.sendButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, self.sendClickHandler);
			
		
			self.infoText_do = new FWDEVPDisplayObject("div");
			self.infoText_do.setBackfaceVisibility();
			self.infoText_do.getStyle().fontFamily = "Arial";
			self.infoText_do.getStyle().fontSize= "12px";
			self.infoText_do.getStyle().color = self.secondaryLabelsColor_str;
			self.infoText_do.getStyle().whiteSpace= "nowrap";
			self.infoText_do.getStyle().fontSmoothing = "antialiased";
			self.infoText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.infoText_do.getStyle().textRendering = "optimizeLegibility";
			self.infoText_do.getStyle().padding = "0px";
			self.infoText_do.getStyle().paddingTop = "4px";
			self.infoText_do.getStyle().textAlign = "center";
			self.infoText_do.getStyle().color = self.mainLabelsColor_str;
			
			//setup close button
			FWDEVPSimpleButton.setPrototype();
			self.closeButton_do = new FWDEVPSimpleButton(self.embedColoseN_img, data.embedWindowClosePathS_str, undefined,
					true,
					data.useHEXColorsForSkin_bl,
					data.normalButtonsColor_str,
					data.selectedButtonsColor_str);
			self.closeButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			self.addChild(self.mainHolder_do);
			self.mainHolder_do.addChild(self.bk_do);
			
			self.linkAndEmbedHolder_do.addChild(self.linkAndEmbedHolderBk_do);
			self.linkAndEmbedHolder_do.addChild(self.embedAndLinkMainLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.linkLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.linkText_do);
			self.linkAndEmbedHolder_do.addChild(self.embedLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.embedText_do);
			self.linkAndEmbedHolder_do.addChild(self.copyLinkButton_do);
			self.linkAndEmbedHolder_do.addChild(self.copyEmbedButton_do);
			
			self.sendMainHolder_do.addChild(self.sendMainHolderBk_do);
			self.sendMainHolder_do.addChild(self.sendMainLabel_do);
			self.sendMainHolder_do.addChild(self.yourEmailLabel_do);
			self.sendMainHolder_do.addChild(self.yourEmailInput_do);
			self.sendMainHolder_do.addChild(self.friendEmailLabel_do);
			self.sendMainHolder_do.addChild(self.friendEmailInput_do);
			self.sendMainHolder_do.addChild(self.sendButton_do);
			
			self.mainHolder_do.addChild(self.linkAndEmbedHolder_do);
			self.mainHolder_do.addChild(self.sendMainHolder_do);
			
			self.mainHolder_do.addChild(self.closeButton_do); 
		};
	
		this.closeButtonOnMouseUpHandler = function(){
			if(!self.isShowed_bl) return;
			self.hide();
		};
		
		this.showFlashButtonInstallError = function(){
			var error = "Please install Adobe Flash Player in order to use this feature! To copy text in the clipboard currently flash is the only safe option. <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Click here to install</a>. <br><br>The video link or embed code can be copyed by selecting the text, right click and copy.";
			self.dispatchEvent(FWDEVPEmbedWindow.ERROR, {error:error});
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
			
			self.maxTextWidth = Math.min(self.stageWidth - 150, 500);
			self.totalWidth = self.maxTextWidth + self.buttonWidth + 40;
			
			if(self.isMobile_bl){
				self.linkText_do.setWidth(self.maxTextWidth + 52);
				self.embedText_do.setWidth(self.maxTextWidth + 52);
			}else{
				self.linkText_do.setWidth(self.maxTextWidth);
				self.embedText_do.setWidth(self.maxTextWidth);
			}
			
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
			var isEmbeddedAndFScreenOnIE11Bug_bl = false;
			
			if(self.stageHeight < 360 || self.stageWidth < 350){
				self.linkText_do.getStyle().whiteSpace= "nowrap";
				self.embedText_do.getStyle().whiteSpace= "nowrap";
			}else{
				self.linkText_do.getStyle().whiteSpace = "normal";
				self.embedText_do.getStyle().whiteSpace= "normal";
			}
			
			if(self.linkLabel_do.screen.offsetHeight < 6) isEmbeddedAndFScreenOnIE11Bug_bl = true;
			
			var embedAndLinkMainLabelHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				embedAndLinkMainLabelHeight = Math.round(self.embedAndLinkMainLabel_do.screen.getBoundingClientRect().height * 100);
			}else{
				embedAndLinkMainLabelHeight = self.embedAndLinkMainLabel_do.getHeight();
			}
			self.embedAndLinkMainLabel_do.setX(16);
			self.linkLabel_do.setX(16);
			self.linkLabel_do.setY(embedAndLinkMainLabelHeight + 14);
			
			
			var linkTextLabelHeight;
			var linkTextHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				linkTextLabelHeight = Math.round(self.linkLabel_do.screen.getBoundingClientRect().height * 100);
				linkTextHeight = Math.round(self.linkText_do.screen.getBoundingClientRect().height * 100);
			}else{
				linkTextLabelHeight = self.linkLabel_do.getHeight();
				linkTextHeight = self.linkText_do.getHeight();
			}
			
			self.linkText_do.setX(10);
			self.linkText_do.setY(self.linkLabel_do.y + linkTextLabelHeight + 5);
			if(self.isMobile_bl){
				self.copyLinkButton_do.setX(-100);
			}else{
				self.copyLinkButton_do.setX(self.maxTextWidth + 30);
			}
			
			self.copyLinkButton_do.setY(self.linkText_do.y + linkTextHeight - self.buttonHeight);
			self.embedLabel_do.setX(16);
			self.embedLabel_do.setY(self.copyLinkButton_do.y + self.copyLinkButton_do.h + 14);
			
			var embedTextHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				embedTextHeight = Math.round(self.embedText_do.screen.getBoundingClientRect().height * 100);
			}else{
				embedTextHeight = self.embedText_do.getHeight();
			}
			self.embedText_do.setX(10);
			self.embedText_do.setY(self.embedLabel_do.y + linkTextLabelHeight + 5);
			if(self.isMobile_bl){
				self.copyEmbedButton_do.setX(-100);
			}else{
				self.copyEmbedButton_do.setX(self.maxTextWidth + 30);
			}
			self.copyEmbedButton_do.setY(self.embedText_do.y + embedTextHeight - self.buttonHeight);
			self.linkAndEmbedHolderBk_do.setY(self.linkLabel_do.y - 9);
			self.linkAndEmbedHolderBk_do.setWidth(self.totalWidth - 2);
			self.linkAndEmbedHolderBk_do.setHeight(self.embedText_do.y + embedTextHeight - 9);
			self.linkAndEmbedHolder_do.setWidth(self.totalWidth);
			self.linkAndEmbedHolder_do.setHeight(self.embedText_do.y + embedTextHeight + 14);
			
			var sendMainLabelHeight;
			var inputHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				sendMainLabelHeight = Math.round(self.sendMainLabel_do.screen.getBoundingClientRect().height * 100);
				inputHeight = Math.round(self.yourEmailInput_do.screen.getBoundingClientRect().height * 100);
			}else{
				sendMainLabelHeight = self.sendMainLabel_do.getHeight();
				inputHeight = self.yourEmailInput_do.getHeight();
			}
			self.sendMainLabel_do.setX(16);
			self.yourEmailLabel_do.setX(16);
			self.yourEmailLabel_do.setY(sendMainLabelHeight + 14);
			
			if(self.stageWidth > 400){
				self.yourEmailInput_do.setX(10);
				self.yourEmailInput_do.setWidth(parseInt(self.totalWidth - 52 - self.buttonWidth)/2);
				self.yourEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				
				self.friendEmailLabel_do.setX(self.yourEmailInput_do.x + self.yourEmailInput_do.w + 26);
				self.friendEmailLabel_do.setY(self.yourEmailLabel_do.y);
				self.friendEmailInput_do.setX(self.yourEmailInput_do.x + self.yourEmailInput_do.w + 20);
				self.friendEmailInput_do.setWidth(parseInt((self.maxTextWidth - 30)/2));
				self.friendEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				self.sendButton_do.setX(self.friendEmailInput_do.x + self.yourEmailInput_do.w + 10);
				self.sendButton_do.setY(self.friendEmailInput_do.y +inputHeight - self.buttonHeight);
			}else{
				self.yourEmailInput_do.setX(10);
				self.yourEmailInput_do.setWidth(self.totalWidth -32);
				self.yourEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				
				self.friendEmailLabel_do.setX(16);
				self.friendEmailLabel_do.setY(self.yourEmailInput_do.y + inputHeight + 14);
				self.friendEmailInput_do.setX(10);
				self.friendEmailInput_do.setY(self.friendEmailLabel_do.y + linkTextLabelHeight + 5);
				self.friendEmailInput_do.setWidth(self.totalWidth - 32);
				
				self.sendButton_do.setX(self.totalWidth - self.buttonWidth - 10);
				self.sendButton_do.setY(self.friendEmailInput_do.y + inputHeight + 10);
			}
			
			self.sendMainHolderBk_do.setY(self.yourEmailLabel_do.y - 9);
			self.sendMainHolderBk_do.setWidth(self.totalWidth - 2);
			self.sendMainHolderBk_do.setHeight(self.sendButton_do.y + self.sendButton_do.h - 9);
			self.sendMainHolder_do.setWidth(self.totalWidth);
			self.sendMainHolder_do.setHeight(self.sendButton_do.y + self.sendButton_do.h + 14);
			
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				totalHeight = Math.round(self.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + self.sendMainHolder_do.screen.getBoundingClientRect().height * 100);
			}else{
				totalHeight = self.linkAndEmbedHolder_do.getHeight() + self.sendMainHolder_do.getHeight();
			}
			
			
			self.linkAndEmbedHolder_do.setX(parseInt((self.stageWidth - self.totalWidth)/2));
			self.linkAndEmbedHolder_do.setY(parseInt((self.stageHeight - totalHeight)/2) - 8);
			self.sendMainHolder_do.setX(parseInt((self.stageWidth - self.totalWidth)/2));
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				self.sendMainHolder_do.setY(Math.round(self.linkAndEmbedHolder_do.y + self.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + 20));
			}else{
				self.sendMainHolder_do.setY(self.linkAndEmbedHolder_do.y + self.linkAndEmbedHolder_do.getHeight() + 20);
			}
		};
		
		//##############################################//
		/* Send email */
		//##############################################//
		this.sendClickHandler = function(){
			var hasError_bl = false;
			if(!self.getValidEmail(self.yourEmailInput_do.screen.value)){
				if(FWDAnimation.isTweening(self.yourEmailInput_do.screen)) return;
				FWDAnimation.to(self.yourEmailInput_do.screen, .1, {css:{backgroundColor:'#FF0000'}, yoyo:true, repeat:3});
				hasError_bl = true;
			}
			if(!self.getValidEmail(self.friendEmailInput_do.screen.value)){
				if(FWDAnimation.isTweening(self.friendEmailInput_do.screen)) return;
				FWDAnimation.to(self.friendEmailInput_do.screen, .1, {css:{backgroundColor:'#FF0000'}, yoyo:true, repeat:3});
				hasError_bl = true;
			}
			if(hasError_bl) return;
			self.sendEmail();
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		this.updateHEXColors = function(normalColor_str, selectedColor_str){
			self.copyEmbedButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			self.copyLinkButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			self.sendButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			self.closeButton_do.updateHEXColors(normalColor_str, selectedColor_str);
		}
		
		//############ send email ####################//
		this.sendEmail = function(){
			if(self.isSending_bl) return;
			self.isSending_bl = true;
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.onChange;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.sendToAFriendPath_str + "?friendMail=" + self.friendEmailInput_do.screen.value + "&yourMail=" + self.yourEmailInput_do.screen.value + "&link=" + encodeURIComponent(self.linkToVideo_str) , true);
				self.xhr.send();
			}catch(e){
				self.showInfo("ERROR", true);
				if(console) console.log(e);
				if(e.message) console.log(e.message);
			}
			self.resetInputs();
		};
		
		this.ajaxOnErrorHandler = function(e){
			self.showInfo("ERROR", true);
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			self.isSending_bl = false;
		};
		
		this.onChange = function(response){
			if(self.xhr.readyState == 4 && self.xhr.status == 200){
				if(self.xhr.responseText == "sent"){
					self.showInfo("SENT");
				}else{
					self.showInfo("ERROR", true);
					if(window.console) console.log("Error The server can't send the email!");
				}
				self.isSending_bl = false;
			}
		};
		
		this.resetInputs = function(){
			self.yourEmailInput_do.screen.value = "";
			self.friendEmailInput_do.screen.value = "";
		};
	
		this.getValidEmail = function(email){
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!emailRegExp.test(email) || email == "") return false;
			return true;
		};
		
		//#############################################//
		/* Set embed data */
		//#############################################//
		this.setEmbedData = function(){
		
			var allUrl = location.href;
			var host = location.protocol + "//" + location.host;
			var pathName = location.pathname;
			var hash = location.hash;
			var search = location.search;
			var pathWithoutHashOrSearch = host + pathName;
		
			search = search.replace(/&?EVPInstanceName=.+/g, "");
			hash = hash.replace(/&?EVPInstanceName=.+/g, "");
			allUrl = allUrl.replace(/&?EVPInstanceName=.+/g, "");
			if(search == "?") search = null;
			
			if(search){
				if(hash){
					self.finalEmbedPath_str = pathWithoutHashOrSearch + search + hash + "&EVPInstanceName=" + parent.instanceName_str;
					self.linkToVideo_str = pathWithoutHashOrSearch + search + hash;
				}else{
					self.finalEmbedPath_str = pathWithoutHashOrSearch + search + "&EVPInstanceName=" + parent.instanceName_str;
					self.linkToVideo_str = pathWithoutHashOrSearch + search;
				}
			}else{
				if(hash){
					self.finalEmbedPath_str = pathWithoutHashOrSearch + hash + "?EVPInstanceName=" + parent.instanceName_str;
					self.linkToVideo_str = pathWithoutHashOrSearch + hash;
				}else{
					self.finalEmbedPath_str = pathWithoutHashOrSearch + "?EVPInstanceName=" + parent.instanceName_str;
					self.linkToVideo_str = pathWithoutHashOrSearch;
				}
			}
		
			self.finalEmbedPath_str = encodeURI(self.finalEmbedPath_str);
			self.linkToVideo_str = encodeURI(self.linkToVideo_str);	
			self.finalEmbedCode_str = "<iframe src='" + self.finalEmbedPath_str + "' width='" + parent.stageWidth + "' height='" + parent.stageHeight + "' frameborder='0' scrolling='no' allowfullscreen></iframe>";
		
			if(FWDEVPUtils.isIE){
				self.linkText_do.screen.innerText = self.linkToVideo_str;
				self.embedText_do.screen.innerText = self.finalEmbedCode_str;
			}else{
				self.linkText_do.screen.textContent = self.linkToVideo_str;
				self.embedText_do.screen.textContent = self.finalEmbedCode_str;
			}
		};	
		
		//#########################################//
		/* show hide info */
		//#########################################//
		this.showInfo = function(text, hasError){
				
			self.infoText_do.setInnerHTML(text);
			self.sendMainHolder_do.addChild(self.infoText_do);
			self.infoText_do.setWidth(self.buttonWidth);
			self.infoText_do.setHeight(self.buttonHeight - 4);
			self.infoText_do.setX(self.sendButton_do.x);
			self.infoText_do.setY(self.sendButton_do.y - 23);

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
			
			self.resetInputs();
			self.setEmbedData();
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
			self.dispatchEvent(FWDEVPEmbedWindow.HIDE_COMPLETE);
		};
	
		this.init();
	};
		
	/* set prototype */
	FWDEVPEmbedWindow.setPrototype = function(){
		FWDEVPEmbedWindow.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPEmbedWindow.ERROR = "error";
	FWDEVPEmbedWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDEVPEmbedWindow.prototype = null;
	window.FWDEVPEmbedWindow = FWDEVPEmbedWindow;
}(window));