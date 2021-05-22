/* FWDEVPController */
(function(){
var FWDEVPController = function(
			data,
			parent
		){
		
		var self = this;
		var prototype = FWDEVPController.prototype;
		
		this.bkLeft_img = data.bkLeft_img;
		this.bkRight_img = data.bkRight_img;
		this.playN_img = data.playN_img;
		this.playS_img = data.playS_img;
		this.pauseN_img = data.pauseN_img;
		this.pauseS_img = data.pauseS_img;
		this.mainScrubberBkLeft_img = data.mainScrubberBkLeft_img;
		this.mainScrubberBkRight_img = data.mainScrubberBkRight_img;
		this.mainScrubberDragLeft_img = data.mainScrubberDragLeft_img;
		this.mainScrubberDragLeftSource = data.mainScrubberDragLeft_img.src;
		this.mainScrubberLine_img = data.mainScrubberLine_img;
		this.volumeScrubberBkLeft_img = data.volumeScrubberBkLeft_img;
		this.volumeScrubberBkRight_img = data.volumeScrubberBkRight_img;
		this.volumeScrubberDragLeft_img = data.volumeScrubberDragLeft_img;
		this.volumeScrubberLine_img = data.volumeScrubberLine_img;
		this.volumeN_img = data.volumeN_img;
		this.volumeS_img = data.volumeS_img;
		this.volumeD_img = data.volumeD_img;
		this.progressLeft_img = data.progressLeft_img;
		this.ytbQualityN_img = data.ytbQualityN_img;
		this.ytbQualityS_img = data.ytbQualityS_img;
		this.ytbQualityD_img = data.ytbQualityD_img;
		this.shareN_img = data.shareN_img;
		this.subtitleN_img = data.subtitleNPath_img;
		this.facebookS_img = data.facebookS_img;
		this.fullScreenN_img = data.fullScreenN_img;
		this.fullScreenS_img = data.fullScreenS_img;
		this.normalScreenN_img = data.normalScreenN_img;
		this.normalScreenS_img = data.normalScreenS_img;
		this.embedN_img = data.embedN_img;
		this.showSubtitileByDefault_bl = data.showSubtitileByDefault_bl;
		
		this.buttons_ar = [];
		this.ytbQuality_ar = null;
		this.ytbButtons_ar = null;
		
		this.pointer_do;
		this.ytbDisabledButton_do = null;
		this.disable_do = null;
		this.mainHolder_do = null;
		this.ytbButtonsHolder_do = null;
		this.playPauseButton_do = null;
		this.mainScrubber_do = null;
		this.mainScrubberBkLeft_do = null;
		this.mainScrubberBkMiddle_do = null;
		this.mainScrubberBkRight_do = null;
		this.mainScrubberDrag_do = null;
		this.mainScrubberDragLeft_do = null;
		this.mainScrubberDragMiddle_do = null;
		this.mainScrubberBarLine_do = null;
		this.mainProgress_do = null;
		this.progressLeft_do = null;
		this.progressMiddle_do = null;
		this.time_do = null;
		this.volumeButton_do = null;
		this.volumeScrubber_do = null;
		this.volumeScrubberBkLeft_do = null;
		this.volumeScrubberBkMiddle_do = null;
		this.volumeScrubberBkRight_do = null;
		this.volumeScrubberDrag_do = null;
		this.volumeScrubberDragLeft_do = null;
		this.volumeScrubberDragMiddle_do = null;
		this.volumeScrubberBarLine_do = null;
		this.ytbQualityButton_do = null;
		this.shareButton_do = null;
		this.fullScreenButton_do = null;
		this.ytbQualityArrow_do = null;
		this.bk_do = null;
		
		this.isMainScrubberOnTop_bl = true;
		this.bkMiddlePath_str = data.bkMiddlePath_str;
		this.mainScrubberBkMiddlePath_str = data.mainScrubberBkMiddlePath_str;
		this.volumeScrubberBkMiddlePath_str = data.volumeScrubberBkMiddlePath_str;
		this.mainScrubberDragMiddlePath_str = data.mainScrubberDragMiddlePath_str;
		this.mainScrubberDragMiddleAddPath_str = data.mainScrubberDragMiddleAddPath_str;
		this.volumeScrubberDragMiddlePath_str = data.volumeScrubberDragMiddlePath_str;
		this.timeColor_str = data.timeColor_str;
		this.progressMiddlePath_str = data.progressMiddlePath_str;
		this.youtubeQualityButtonNormalColor_str = data.youtubeQualityButtonNormalColor_str;
		this.youtubeQualityButtonSelectedColor_str = data.youtubeQualityButtonSelectedColor_str;
		this.youtubeQualityArrowPath_str = data.youtubeQualityArrowPath_str;
		this.controllerBkPath_str = data.controllerBkPath_str;
		this.ytbQualityButtonPointerPath_str = data.ytbQualityButtonPointerPath_str;
		this.subtitleSPath_str = data.subtitleSPath_str;

		this.mainScrubberOffestTop = data.mainScrubberOffestTop;
		this.totalYtbButtons = 0;
		this.stageWidth = 0;
		this.stageHeight = data.controllerHeight;
		this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width;
		this.mainScrubberWidth = 0;
		this.mainScrubberMinWidth = 100;
		this.volumeScrubberWidth = data.volumeScrubberWidth;
		this.scrubbersHeight = this.mainScrubberBkLeft_img.height;
		this.mainScrubberDragLeftWidth = self.mainScrubberDragLeft_img.width;
		this.scrubbersOffsetWidth = data.scrubbersOffsetWidth;
		this.volumeScrubberOffsetRightWidth = data.volumeScrubberOffsetRightWidth;
		this.volume = data.volume;
		this.lastVolume = self.volume;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.spaceBetweenButtons = data.spaceBetweenButtons;
		this.percentPlayed = 0;
		this.percentLoaded = 0;
		this.lastTimeLength = 0;
		this.prevYtbQualityButtonsLength = 0;
		this.pointerWidth = 8;
		this.pointerHeight = 5;
		this.timeOffsetLeftWidth = data.timeOffsetLeftWidth;
		this.timeOffsetRightWidth = data.timeOffsetRightWidth;
		
		self.useHEXColorsForSkin_bl = data.useHEXColorsForSkin_bl; 
		self.normalButtonsColor_str = data.normalButtonsColor_str;
		self.selectedButtonsColor_str = data.selectedButtonsColor_str;

		this.showFullScreenButton_bl = data.showFullScreenButton_bl;
		this.showYoutubeQualityButton_bl = data.showYoutubeQualityButton_bl;
		this.showSubtitleButton_bl = data.showSubtitleButton_bl;
		this.showShareButton_bl = data.showShareButton_bl;
		this.showVolumeScrubber_bl = data.showVolumeScrubber_bl;
		this.allowToChangeVolume_bl = true;
		this.showTime_bl = data.showTime_bl;
		this.showVolumeButton_bl = data.showVolumeButton_bl;
		this.showControllerWhenVideoIsStopped_bl = data.showControllerWhenVideoIsStopped_bl;
		this.showDownloadVideoButton_bl = data.showDownloadVideoButton_bl;
		this.showEmbedButton_bl = data.showEmbedButton_bl;
		this.showPlaybackRateButton_bl = data.showPlaybackRateButton_bl;
		this.isMainScrubberScrubbing_bl = false;
		this.isMainScrubberDisabled_bl = false;
		this.isVolumeScrubberDisabled_bl = false;
		this.isMainScrubberLineVisible_bl = false;
		this.isVolumeScrubberLineVisible_bl = false;
		this.hasYtbButton_bl = false;
		this.isMute_bl = false;
		this.isShowed_bl = true;
		this.areYtbQualityButtonsShowed_bl = true;
		this.repeatBackground_bl = data.repeatBackground_bl;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDEVPDisplayObject("div");
			if(self.repeatBackground_bl){
				self.mainHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.bk_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.bk_do.setScreen(img);
				self.bk_do.setBkColor("#000000");
				self.mainHolder_do.addChild(self.bk_do);
			}
			
			self.mainHolder_do.getStyle().backgroundColor = "#000000";
			
			self.mainHolder_do.setOverflow("visible");
		
			self.addChild(self.mainHolder_do);
			if(self.showYoutubeQualityButton_bl){
				self.ytbQuality_ar = ["hd2160", "hd1440", "highres", "hd1080", "hd720", "large", "medium", "small", "tiny"];
				self.ytbButtons_ar = [];
				self.totalYtbButtons = self.ytbQuality_ar.length;
				self.setupYtbButtons();
			}
		
			self.setupPlayPauseButton();
			self.setupMainScrubber();
			if(self.showTime_bl) self.setupTime();
			if(self.showVolumeButton_bl) self.setupVolumeButton();
			if(self.showVolumeScrubber_bl) self.setupVolumeScrubber();
			if(self.showPlaybackRateButton_bl) self.setupPlaybackRateButton();
			if(self.showYoutubeQualityButton_bl) self.setupYoutubeQualityButton();
			if(self.showSubtitleButton_bl) self.setupSubtitleButton();
			if(self.showShareButton_bl) self.setupShareButton();
			if(self.showEmbedButton_bl) self.setupEmbedButton();
			if(self.showDownloadVideoButton_bl) self.setupDownloadButton();
			if(self.showFullScreenButton_bl) self.setupFullscreenButton();
			
			if(!self.isMobile_bl) self.setupDisable();
			self.hide(false, true);
			if(self.showControllerWhenVideoIsStopped_bl) self.show(true);
		};
		
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.stageWidth;
			self.positionButtons();
			self.setY(parent.stageHeight - self.stageHeight);
			self.hideQualityButtons(false);
			
			if(self.ytbButtonsHolder_do){
				FWDAnimation.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(parent.stageHeight);
			}
			
			if(self.subtitlesButtonsHolder_do){
				FWDAnimation.killTweensOf(self.subtitlesButtonsHolder_do);
				self.subtitlesButtonsHolder_do.setY(parent.stageHeight);
			}
			
			if(self.playbackRatesButtonsHolder_do){
				FWDAnimation.killTweensOf(self.playbackRatesButtonsHolder_do);
				self.playbackRatesButtonsHolder_do.setY(parent.stageHeight);
			}
			self.positionAdsLines();
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			if(!self.stageWidth) return;
			var button;
			var prevButton;
			var hasTime_bl = self.showTime_bl;
			var hasVolumeScrubber_bl = self.volumeScrubber_do;
			
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			
			var buttonsCopy_ar = [];
			for (var i=0; i < self.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = self.buttons_ar[i];
			}
			
			self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != self.mainScrubber_do){
					self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
				}
			};
			
			var testLegnth = 3;
			if(self.hasYtbButton_bl) testLegnth = 4;
			
			while(self.mainScrubberWidth < self.mainScrubberMinWidth && buttonsCopy_ar.length > testLegnth){
				self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
				
				if(self.volumeScrubber_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do), 1);
					self.volumeScrubber_do.setX(-1000);
				}else if(self.time_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
					self.time_do.setX(-1000);
					hasTime_bl = false;
				}else if(self.volumeButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do), 1);
					self.volumeButton_do.setX(-1000);
				}else if(self.volumeScrubber_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do), 1);
					self.volumeScrubber_do.setX(-1000);
					hasVolumeScrubber_bl = false;
				}else if(self.subtitleButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.subtitleButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.subtitleButton_do), 1);
					self.subtitleButton_do.setX(-1000);
				}else if(self.shareButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.shareButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.shareButton_do), 1);
					self.shareButton_do.setX(-1000);
				}else if(self.embedButton_do && FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do) != -1){
					buttonsCopy_ar.splice(FWDEVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do), 1);
					self.embedButton_do.setX(-1000);
				}
				
				/*
				else{
					button = buttonsCopy_ar.splice(buttonsCopy_ar.length - 1, 1)[0];
					button.setX(-1000);
				}
				*/
				
				for (var i=0; i < buttonsCopy_ar.length; i++) {
					button = buttonsCopy_ar[i];
					if(button != self.mainScrubber_do){
						self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
					}
				};
			};
			
			if(hasTime_bl) self.mainScrubberWidth -= self.timeOffsetLeftWidth * 2;
			if(hasVolumeScrubber_bl)  self.mainScrubberWidth -= self.volumeScrubberOffsetRightWidth;
			
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				
				if(i == 0){
					button.setX(self.startSpaceBetweenButtons);
					button.setY(parseInt((self.stageHeight - button.h)/2));
				}else if(button == self.mainScrubber_do){
					prevButton = buttonsCopy_ar[i - 1];
					FWDAnimation.killTweensOf(self.mainScrubber_do);
					self.mainScrubber_do.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
					self.mainScrubber_do.setY(parseInt((self.stageHeight - self.scrubbersHeight)/2));
					self.mainScrubber_do.setWidth(self.mainScrubberWidth);
					self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
					self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
					self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
				}else if(button == self.time_do){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetLeftWidth);
					button.setY(parseInt((self.stageHeight - button.h)/2));
				}else if(button == self.volumeButton_do && hasTime_bl){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetRightWidth);
					button.setY(parseInt((self.stageHeight - button.h)/2));
				}else{
					prevButton = buttonsCopy_ar[i - 1];
					if(hasVolumeScrubber_bl && prevButton == self.volumeScrubber_do){
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.volumeScrubberOffsetRightWidth);
					}else{
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
					}
					button.setY(parseInt((self.stageHeight - button.h)/2));
				}
			};	
			
			if(self.disable_do){
				self.disable_do.setWidth(self.stageWidth);
				self.disable_do.setHeight(self.stageHeight);
			}
			
			if(self.bk_do){
				self.bk_do.setWidth(self.stageWidth);
				self.bk_do.setHeight(self.stageHeight);
			}
			
			if(self.isShowed_bl){
				self.isMainScrubberOnTop_bl = false;
			}else{
				self.isMainScrubberOnTop_bl = true;
				self.positionScrollBarOnTopOfTheController();
			}
			
			if(self.progressMiddle_do) self.progressMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			self.updateMainScrubber(self.percentPlayed);
			self.updatePreloaderBar(self.percentLoaded);
		};
		
		this.positionScrollBarOnTopOfTheController = function(){

			self.mainScrubberWidth = self.stageWidth;
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainScrubber_do.setWidth(self.mainScrubberWidth);
			self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			FWDAnimation.killTweensOf(self.mainScrubber_do);
			self.mainScrubber_do.setX(0);
			if(self.isMainScrubberOnTop_bl || self.isShowed_bl){
				self.mainScrubber_do.setY(- self.mainScrubberOffestTop);
			}else if(self.mainScrubber_do.y != - self.mainScrubberOffestTop){
				self.mainScrubber_do.setY(self.mainScrubber_do.h);
				FWDAnimation.to(self.mainScrubber_do, .8, {y:- self.mainScrubberOffestTop, ease:Expo.easeOut});
			}
			self.isMainScrubberOnTop_bl = true;
		};
		
		
		//###############################//
		/* setup disable */
		//##############################//
		this.setupDisable = function(){
			self.disable_do = new FWDEVPDisplayObject("div");
			if(FWDEVPUtils.isIE){
				self.disable_do.setBkColor("#FFFFFF");
				self.disable_do.setAlpha(0);
			}
		};
		
		//##########################################//
		/* Setup playback rate button */
		//##########################################//
		this.playbackRatesSource_ar = data.defaultPlaybackRate_ar;
		this.playbackRateButtons_ar = [];
		this.totalPlaybackRateButtons = 6;
		this.arePlaybackRateButtonsShowed_bl = true;
		if(!this.showPlaybackRateButton_bl) this.arePlaybackRateButtonsShowed_bl = false;
		
		this.setupPlaybackRateButton = function(){
			FWDEVPSimpleButton.setPrototype();
			self.playbackRateButton_do = new FWDEVPSimpleButton(data.playbackRateNPath_img,
														 data.playbackRateSPath_str, 
														 undefined, 
														 true,
														 self.useHEXColorsForSkin_bl,
														 self.normalButtonsColor_str,
														 self.selectedButtonsColor_str);
		
			self.buttons_ar.push(self.playbackRateButton_do);
			self.playbackRateButton_do.setY(parseInt((self.stageHeight - self.playbackRateButton_do.h)/2));
			self.playbackRateButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.playbackRateButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playbackRateButton_do);
			
			
			self.disablePlaybackRateButton();
			self.setupPlaybackRateButtons();
			
		}
		
		this.playbackRateButtonMouseUpHandler = function(){
			if(self.arePlaybackRateButtonsShowed_bl){
				self.hidePlaybackRateButtons(true);
			}else{
				self.showPlaybackRateButtons(true);
			}
		};
		
		this.disablePlaybackRateButton = function(){
			if(self.playbackRateButton_do) self.playbackRateButton_do.disable();
		};
		
		this.enablePlaybackRateButton = function(){
			if(self.playbackRateButton_do) self.playbackRateButton_do.enable();
		};
		
		
		
		this.removePlaybackRateButton = function(){
			if(!self.playbackRateButton_do) return;
			if(FWDEVPUtils.indexOfArray(self.buttons_ar, self.playbackRateButton_do) != -1){
				self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.playbackRateButton_do), 1);
				self.playbackRateButton_do.setX(-300);
				self.positionButtons();
			}
		};
		
		this.addPlaybackRateButton = function(){
			if(!self.playbackRateButton_do) return;
			
			if(FWDEVPUtils.indexOfArray(self.buttons_ar, self.playbackRateButton_do) == -1){
				if(self.ytbQualityButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.ytbQualityButton_do) != -1){
					self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.ytbQualityButton_do), 0, self.playbackRateButton_do);
				}else if(self.subtitleButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.subtitleButton_do) != -1){
					self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.subtitleButton_do), 0, self.playbackRateButton_do);
				}else if(self.shareButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.shareButton_do) != -1){
					self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.shareButton_do), 0, self.playbackRateButton_do);
				}else if(self.fullScreenButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do) != -1){
					self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do), 0, self.playbackRateButton_do);
				}else{
					self.buttons_ar.splice(self.buttons_ar.length, 0, self.playbackRateButton_do);
				}
				self.positionButtons();
			}
		};
		
		//###################################################//
		/* Setup PlaybackRatebuttons */
		//###################################################//
		this.updatePlaybackRateButtons = function(playbackRates, playbackRateIndex){
			if(!self.playbackRateButton_do) return;
			//self.playbackRateButton_do.enable();
			self.positionAndResizePlaybackRateButtons(playbackRates);
			setTimeout(function(){
				//playbackRateIndex = self.playbackRatesSource_ar.length - 1 - playbackRateIndex;
				self.disablePlaybackRateButtons(playbackRateIndex);
			},65);
			self.prevplaybackRateIndex = playbackRateIndex;
		};	
		
		this.setupPlaybackRateButtons = function(){
			
			self.playbackRatesButtonsHolder_do = new FWDEVPDisplayObject("div");
			self.playbackRatesButtonsHolder_do.setOverflow("visible");
			
			if(self.repeatBackground_bl){
				self.playbackRatesButtonsHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.playbackRatesButtonsBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.playbackRatesButtonsBackground_do.setScreen(img);
				self.playbackRatesButtonsHolder_do.addChild(self.playbackRatesButtonsBackground_do);
			}
			
			self.playbackRatesButtonsHolder_do.setX(300);
			self.playbackRatesButtonsHolder_do.setY(-300);
			parent.main_do.addChild(self.playbackRatesButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = self.ytbQualityButtonPointerPath_str;
			self.playbackRatesPonter_do = new FWDEVPDisplayObject("img");
			self.playbackRatesPonter_do.setScreen(img);
			self.playbackRatesPonter_do.setWidth(self.pointerWidth);
			self.playbackRatesPonter_do.setHeight(self.pointerHeight);
			self.playbackRatesButtonsHolder_do.addChild(self.playbackRatesPonter_do);
	
			
			var img = new Image();
			img.src = self.youtubeQualityArrowPath_str;
			self.playbackRateQualityArrow_do = new FWDEVPDisplayObject("img");
			self.playbackRateQualityArrow_do.setScreen(img);
			self.playbackRateQualityArrow_do.setX(7);
			self.playbackRateQualityArrow_do.setWidth(5);
			self.playbackRateQualityArrow_do.setHeight(7);
			self.playbackRatesButtonsHolder_do.addChild(self.playbackRateQualityArrow_do);
			
			var btn;
			
			for(var i=0; i<self.totalPlaybackRateButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton("no source", 
						self.youtubeQualityButtonNormalColor_str, 
						self.youtubeQualityButtonSelectedColor_str,
						undefined,
						i);
				
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, self.plbkQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, self.plbkQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, self.plbkQualityClick);
				self.playbackRateButtons_ar[i] = btn;
				self.playbackRatesButtonsHolder_do.addChild(btn);
			}
			self.positionAndResizePlaybackRateButtons(self.playbackRatesSource_ar);
			self.hidePlaybackRateButtons(false);
		};
		
		this.plbkQualityOver = function(e){
			self.setPlaybackRateArrowPosition(e.target);
		};
		
		this.plbkQualityOut = function(e){
			self.setPlaybackRateArrowPosition(undefined);
		};
		
		this.plbkQualityClick = function(e){
			self.startAtPlaybackRate = e.id;
			self.disablePlaybackRateButtons(self.startAtPlaybackRate);
			self.hidePlaybackRateButtons(true);
			self.dispatchEvent(FWDEVPController.CHANGE_PLAYBACK_RATES, {rate:self.playbackRatesSource_ar[e.id]});
		};
		
		this.positionAndResizePlaybackRateButtons = function(ar){
			if(!ar) return;
			
			var totalButtons = ar.length;
			if(self.prevplaybackRatesQualityButtonsLength == totalButtons) return;
			this.prevplaybackRatesQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<totalButtons; i++){
				btn = self.playbackRateButtons_ar[i];
				if(ar[i] == 1){
					btn.updateText("normal");
				}else{
					btn.updateText(ar[i]);
				}
				
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<totalButtons; i++){
					btn = self.playbackRateButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
				
				for(var i=0; i<totalButtons; i++){
					btn = self.playbackRateButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
				
				totalHeight = startY + 5;
				self.playbackRatesPonter_do.setX(parseInt((totalWidth - self.playbackRatesPonter_do.w)/2));
				self.playbackRatesPonter_do.setY(totalHeight);
				if(self.playbackRatesButtonsBackground_do){	
					self.playbackRatesButtonsBackground_do.setWidth(totalWidth);
					self.playbackRatesButtonsBackground_do.setHeight(totalHeight);
				}
				self.playbackRatesButtonsHolder_do.setWidth(totalWidth);
				self.playbackRatesButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		this.disablePlaybackRateButtons = function(index){
			for(var i=0; i<self.totalPlaybackRateButtons; i++){
				btn = self.playbackRateButtons_ar[i];
				if(i == index){
					FWDAnimation.killTweensOf(self.playbackRateQualityArrow_do);
					self.playbackRateQualityArrow_do.setY(btn.y + parseInt((btn.h - self.playbackRateQualityArrow_do.h)/2) - 1);
					btn.disable();
					self.playbackRateDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
		
			/*
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720" || curQualityLevel == "hd1440" || curQualityLevel == "hd2160"){
				self.playbackRateButton_do.showDisabledState();
			}else{
				self.playbackRateButton_do.hideDisabledState();
			}
			*/
		};
		
		this.setPlaybackRateArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = self.playbackRateDisabledButton_do.y + parseInt((self.playbackRateDisabledButton_do.h - self.playbackRateQualityArrow_do.h)/2 - 1);
			}else{
				curY = target.y + parseInt((target.h - self.playbackRateQualityArrow_do.h)/2 - 1);
			}
			FWDAnimation.killTweensOf(self.playbackRateQualityArrow_do);
			FWDAnimation.to(self.playbackRateQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		this.showPlaybackRateButtons = function(animate){
			if(self.arePlaybackRateButtonsShowed_bl) return;
			self.hideQualityButtons();
			self.arePlaybackRateButtonsShowed_bl = true;
			//var finalX = parseInt(self.playbackRateButton_do.x + (parseInt(self.playbackRateButton_do.w - self.playbackRatesButtonsHolder_do.w)/2));
			//var finalY = parseInt(- self.playbackRatesButtonsHolder_do.h - 6);
			var finalX = parseInt(self.playbackRateButton_do.x + (parseInt(self.playbackRateButton_do.w - self.playbackRatesButtonsHolder_do.w)/2));
			var finalY = parseInt(parent.stageHeight - self.stageHeight - self.playbackRatesButtonsHolder_do.h - 6);
			
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointerdown", self.hideplaybackRatesButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.addEventListener("mousedown", self.hideplaybackRatesButtonsHandler);
				}
				window.addEventListener("touchstart", self.hideplaybackRatesButtonsHandler);
			}
			
			self.playbackRatesButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(self.playbackRatesButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.playbackRatesButtonsHolder_do);
				self.playbackRatesButtonsHolder_do.setY(finalY);
			}
		};
	
		this.hidePlaybackRateButtons = function(animate){
			if(!self.arePlaybackRateButtonsShowed_bl || !self.showPlaybackRateButton_bl) return;
			self.arePlaybackRateButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(self.playbackRatesButtonsHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				FWDAnimation.to(self.playbackRatesButtonsHolder_do, .6, {y:parent.stageHeight, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.playbackRatesButtonsHolder_do);
				//self.playbackRatesButtonsHolder_do.setY(self.stageHeight);
				self.playbackRatesButtonsHolder_do.setY(parent.stageHeight);
			}
			
			
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", self.hideplaybackRatesButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.removeEventListener("mousedown", self.hideplaybackRatesButtonsHandler);
				}
				window.removeEventListener("touchstart", self.hideplaybackRatesButtonsHandler);
			}
		};
		
		this.hideplaybackRatesButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(self.playbackRateButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(self.playbackRatesButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			self.hidePlaybackRateButtons(true);
		};
		
		
		
		
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupAdsLines = function(linesAr){
			if(this.createdAdsOnce_bl) return;
			if(!this.linesHolder_do){
				this.linesHolder_do = new FWDEVPDisplayObject("div");
				this.linesHolder_do.setOverflow("visible");
				this.mainScrubber_do.addChild(this.linesHolder_do);
			}
			this.createdAdsOnce_bl = true;
			this.lines_ar = linesAr;
		
			if(this.lines_ar){
				var line;
				this.line_ar = [];
				for(var i=0; i<this.lines_ar.length; i++){
					line = new FWDEVPDisplayObject("div");
					line.getStyle().background = "url('" + data.adLinePat_str + "') repeat-x";
					line.timeStart = linesAr[i].timeStart;
					line.setWidth(2);
					line.setHeight(self.mainScrubberDragLeft_img.height);
					line.isUsed_bl = false;
					line.isShowed_bl = false;
					line.setAlpha(0);
					this.line_ar[i] = line;
					this.linesHolder_do.addChild(line);
				}
			}
			self.totalDuration = 0;
		};
		
		this.hideAdsLines = function(){
			if(self.linesHolder_do) self.linesHolder_do.setX(-5000);
			if(this.line_ar){
				for(var i=0; i<this.line_ar.length; i++){
					this.line_ar[i].setAlpha(0);
					this.line_ar[i].isShowed_bl = false;
				}
			}
		}
		
		this.positionAdsLines = function(totalDuration){
			if(totalDuration) self.totalDuration = totalDuration;
			
			if(parent.isAdd_bl){
				this.linesHolder_do.setX(-5000);
			}else{
				this.linesHolder_do.setX(0);
			}
			
			if(this.line_ar){
				var line;
				for(var i=0; i<this.line_ar.length; i++){
					line = this.line_ar[i];
					line.setX(Math.round((line.timeStart/self.totalDuration) * self.mainScrubberWidth) - 1);
					if(line.x < 0) line.setX(0);
					if(!line.isUsed_bl && self.totalDuration != 0 && !line.isShowed_bl){
						FWDAnimation.to(line, 1, {alpha:1, ease:Expo.easeOut});
						line.isShowed_bl = true;
					}
				}
			}
		}
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){
			//setup background bar
			self.mainScrubber_do = new FWDEVPDisplayObject("div");
			self.mainScrubber_do.setHeight(self.scrubbersHeight);
			
			self.mainScrubberBkLeft_do = new FWDEVPDisplayObject("img");
			self.mainScrubberBkLeft_do.setScreen(self.mainScrubberBkLeft_img);
			
			self.mainScrubberBkRight_do = new FWDEVPDisplayObject("img");
			self.mainScrubberBkRight_do.setScreen(self.mainScrubberBkRight_img);
			
			var middleImage = new Image();
			middleImage.src = self.mainScrubberBkMiddlePath_str;
			
			//if(self.isMobile_bl){
				self.mainScrubberBkMiddle_do = new FWDEVPDisplayObject("div");	
				self.mainScrubberBkMiddle_do.getStyle().background = "url('" + self.mainScrubberBkMiddlePath_str + "') repeat-x";
			//}else{
				//self.mainScrubberBkMiddle_do = new FWDEVPDisplayObject("img");
				//self.mainScrubberBkMiddle_do.setScreen(middleImage);
			//}
				
			self.mainScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			self.mainProgress_do = new FWDEVPDisplayObject("div");
			self.mainProgress_do.setHeight(self.scrubbersHeight);
		
			self.progressLeft_do = new FWDEVPDisplayObject("img");
			self.progressLeft_do.setScreen(self.progress);
			
			middleImage = new Image();
			middleImage.src = self.progressMiddlePath_str;
			
			self.progressMiddle_do = new FWDEVPDisplayObject("div");	
			self.progressMiddle_do.getStyle().background = "url('" + self.progressMiddlePath_str + "') repeat-x";
		
			self.progressMiddle_do.setHeight(self.scrubbersHeight);
			self.progressMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			self.mainScrubberDrag_do = new FWDEVPDisplayObject("div");
			self.mainScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			
			if(self.useHEXColorsForSkin_bl){
				self.mainScrubberDragLeft_do = new FWDEVPDisplayObject("div");
				self.mainScrubberDragLeft_do.setWidth(self.mainScrubberDragLeft_img.width + 20);
				self.mainScrubberDragLeft_do.setHeight(self.mainScrubberDragLeft_img.height + 20);
				self.mainScrubberDragLeft_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.mainScrubberDragLeft_img, self.normalButtonsColor_str).canvas;
				self.mainScrubberDragLeft_do.screen.appendChild(self.mainScrubberDragLeft_canvas);	
			}else{
				self.mainScrubberDragLeft_do = new FWDEVPDisplayObject("img");
				self.mainScrubberDragLeft_do.setScreen(self.mainScrubberDragLeft_img);
			}
			
			self.mainScrubberMiddleImage = new Image();
			self.mainScrubberMiddleImage.src = self.mainScrubberDragMiddlePath_str;
			self.volumeScrubberDragMiddle_do = new FWDEVPDisplayObject("div");
			
			if(self.useHEXColorsForSkin_bl){
				self.mainScrubberDragMiddle_do = new FWDEVPDisplayObject("div");
				self.mainScrubberMiddleImage.onload = function(){
					var testCanvas = FWDEVPUtils.getCanvasWithModifiedColor(self.mainScrubberMiddleImage, self.normalButtonsColor_str, true);
					self.mainSCrubberMiddleCanvas = testCanvas.canvas;
					self.mainSCrubberDragMiddleImageBackground = testCanvas.image;
					self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
					setTimeout(function(){
						self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
					},50)
				}
			}else{
				self.mainScrubberDragMiddle_do = new FWDEVPDisplayObject("div");	
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddlePath_str + "') repeat-x";
			}
			
		
			self.mainScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			self.mainScrubberBarLine_do = new FWDEVPDisplayObject("img");
			self.mainScrubberBarLine_do.setScreen(self.mainScrubberLine_img);
			self.mainScrubberBarLine_do.setAlpha(0);
			self.mainScrubberBarLine_do.hasTransform3d_bl = false;
			self.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.buttons_ar.push(self.mainScrubber_do);
			
			//add all children
			self.mainScrubber_do.addChild(self.mainScrubberBkLeft_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkMiddle_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkRight_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragLeft_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragMiddle_do);
			self.mainProgress_do.addChild(self.progressLeft_do);
			self.mainProgress_do.addChild(self.progressMiddle_do);
			self.mainScrubber_do.addChild(self.mainProgress_do);
			self.mainScrubber_do.addChild(self.mainScrubberDrag_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainHolder_do.addChild(self.mainScrubber_do);
		
			if(!self.disableVideoScrubber_bl){
				if(self.hasPointerEvent_bl){
					self.mainScrubber_do.screen.addEventListener("pointerover", self.mainScrubberOnOverHandler);
					self.mainScrubber_do.screen.addEventListener("pointerout", self.mainScrubberOnOutHandler);
					self.mainScrubber_do.screen.addEventListener("pointerdown", self.mainScrubberOnDownHandler);
				}else if(self.screen.addEventListener){	
					if(!self.isMobile_bl){
						self.mainScrubber_do.screen.addEventListener("mouseover", self.mainScrubberOnOverHandler);
						self.mainScrubber_do.screen.addEventListener("mouseout", self.mainScrubberOnOutHandler);
						self.mainScrubber_do.screen.addEventListener("mousedown", self.mainScrubberOnDownHandler);
					}
					self.mainScrubber_do.screen.addEventListener("touchstart", self.mainScrubberOnDownHandler);
				}
			}
			
			self.disableMainScrubber();
			self.updateMainScrubber(0);
		};
		
		this.mainScrubberOnOverHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnOutHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnDownHandler =  function(e){
			if(self.isMainScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
		
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.mainScrubberWidth;
		
			if(self.disable_do) self.addChild(self.disable_do);
			self.updateMainScrubber(percentScrubbed);
			
			self.dispatchEvent(FWDEVPController.START_TO_SCRUB);
			self.dispatchEvent(FWDEVPController.SCRUB, {percent:percentScrubbed});
			
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointermove", self.mainScrubberMoveHandler);
				window.addEventListener("pointerup", self.mainScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", self.mainScrubberMoveHandler);
				window.addEventListener("mouseup", self.mainScrubberEndHandler);		
				window.addEventListener("touchmove", self.mainScrubberMoveHandler);
				window.addEventListener("touchend", self.mainScrubberEndHandler);
			}
		};
		
		this.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/self.mainScrubberWidth;
			self.updateMainScrubber(percentScrubbed);
			self.dispatchEvent(FWDEVPController.SCRUB, {percent:percentScrubbed});
		};
		
		this.mainScrubberEndHandler = function(e){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				self.mainScrubberMoveHandler(e);
			}
			*/
			self.dispatchEvent(FWDEVPController.STOP_TO_SCRUB);
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointermove", self.mainScrubberMoveHandler);
				window.removeEventListener("pointerup", self.mainScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", self.mainScrubberMoveHandler);
				window.removeEventListener("mouseup", self.mainScrubberEndHandler);		
				window.removeEventListener("touchmove", self.mainScrubberMoveHandler);
				window.removeEventListener("touchend", self.mainScrubberEndHandler);
			}
		};
		
		this.disableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = true;
			self.mainScrubber_do.setButtonMode(false);
			self.mainScrubberEndHandler();
			self.updateMainScrubber(0);
			self.updatePreloaderBar(0);
		};
		
		this.enableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = false;
			self.mainScrubber_do.setButtonMode(true);
		};
		
		this.updateMainScrubber = function(percent){
			if(!self.mainScrubber_do) return;
			
			var finalWidth = parseInt(percent * self.mainScrubberWidth); 
			if(isNaN(finalWidth)) return;
			
			self.percentPlayed = percent;
			if(!FWDEVPlayer.hasHTML5Video && finalWidth >= self.mainProgress_do.w) finalWidth = self.mainProgress_do.w;
			
			if(finalWidth < 1 && self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:1});
			}
			self.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updatePreloaderBar = function(percent){
			if(!self.mainProgress_do) return;
			
			self.percentLoaded = percent;
			var finalWidth = parseInt(Math.max(0,self.percentLoaded * self.mainScrubberWidth)); 
			
			if(self.percentLoaded >= 0.98){
				self.mainProgress_do.setY(-30);
			}else if(self.mainProgress_do.y != 0 && self.percentLoaded!= 1){
				self.mainProgress_do.setY(0);
			}
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = Math.max(0,self.mainScrubberWidth - self.scrubbersOffsetWidth);
			if(finalWidth < 0) finalWidth = 0;
			self.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup play button */
		//################################################//
		this.setupPlayPauseButton = function(){
			FWDEVPComplexButton.setPrototype();
			self.playPauseButton_do = new FWDEVPComplexButton(
					self.playN_img,
					data.playSPath_str,
					self.pauseN_img,
					data.pauseSPath_str,
					true,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str
			);
			
			self.buttons_ar.push(self.playPauseButton_do);
			self.playPauseButton_do.setY(parseInt((self.stageHeight - self.playPauseButton_do.buttonHeight)/2));
			self.playPauseButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, self.playButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playPauseButton_do);
		};
		
		this.showPlayButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(1);
		};
		
		this.showPauseButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(0);
		};
		
		this.playButtonMouseUpHandler = function(){
			if(self.playPauseButton_do.currentState == 0){
				self.dispatchEvent(FWDEVPController.PAUSE);
			}else{
				self.dispatchEvent(FWDEVPController.PLAY);
			}
		};
		
		//##########################################//
		/* Setup embed button */
		//#########################################//
		this.setupEmbedButton = function(){
			FWDEVPSimpleButton.setPrototype();
			self.embedButton_do = new FWDEVPSimpleButton(self.embedN_img,
														 data.embedPathS_str, 
														 undefined, 
														 true,
														 self.useHEXColorsForSkin_bl,
														 self.normalButtonsColor_str,
														 self.selectedButtonsColor_str);
			self.embedButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.embedButtonOnMouseUpHandler);
			self.embedButton_do.setY(parseInt((self.stageHeight - self.embedButton_do.h)/2));
			self.buttons_ar.push(self.embedButton_do);
			self.mainHolder_do.addChild(self.embedButton_do);
		};
	
		this.embedButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDEVPController.SHOW_EMBED_WINDOW);
		};
		
		//###################################################//
		/* Setup youtube quality buttons */
		//###################################################//
		this.setupYtbButtons = function(){
			self.ytbButtonsHolder_do = new FWDEVPDisplayObject("div");
			self.ytbButtonsHolder_do.setOverflow("visible");
			if(self.repeatBackground_bl){
				self.ytbButtonsHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.ytbButtonBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.ytbButtonBackground_do.setScreen(img);
				self.ytbButtonsHolder_do.addChild(self.ytbButtonBackground_do);
			}
			
			self.ytbButtonsHolder_do.setX(300);
			self.ytbButtonsHolder_do.setY(-300);
			parent.main_do.addChild(self.ytbButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = self.ytbQualityButtonPointerPath_str;
			self.pointer_do = new FWDEVPDisplayObject("img");
			self.pointer_do.setScreen(img);
			self.pointer_do.setWidth(self.pointerWidth);
			self.pointer_do.setHeight(self.pointerHeight);
			self.ytbButtonsHolder_do.addChild(self.pointer_do);
	
			
			var img = new Image();
			img.src = self.youtubeQualityArrowPath_str;
			self.ytbQualityArrow_do = new FWDEVPDisplayObject("img");
			self.ytbQualityArrow_do.setScreen(img);
			self.ytbQualityArrow_do.setX(7);
			self.ytbQualityArrow_do.setWidth(5);
			self.ytbQualityArrow_do.setHeight(7);
			
			
			var btn;
			
			for(var i=0; i<self.totalYtbButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton(self.ytbQuality_ar[i], 
						self.youtubeQualityButtonNormalColor_str, 
						self.youtubeQualityButtonSelectedColor_str,
						data.hdPath_str,
						i);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, self.ytbQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, self.ytbQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, self.ytbQualityClick);
				self.ytbButtons_ar[i] = btn;
				self.ytbButtonsHolder_do.addChild(btn);
				
			}
			self.ytbButtonsHolder_do.addChild(self.ytbQualityArrow_do);
			self.hideQualityButtons(false);
		};
		
		this.ytbQualityOver = function(e){
			self.setYtbQualityArrowPosition(e.target);
		};
		
		this.ytbQualityOut = function(e){
			self.setYtbQualityArrowPosition(undefined);
		};
		
		this.ytbQualityClick = function(e){
			//if(parent.videoType_str == FWDEVPlayer.VIDEO) self.disableQualityButtons(e.target.label_str);
			self.hideQualityButtons(true);
			self.dispatchEvent(FWDEVPController.CHANGE_YOUTUBE_QUALITY, {quality:e.target.label_str, id:e.id});
		};
		
		this.positionAndResizeYtbQualityButtons = function(ar){
			if(!ar) return;
			var totalButtons = ar.length;
			if(self.prevYtbQualityButtonsLength == totalButtons) return;
			this.prevYtbQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<totalButtons; i++){
				btn = self.ytbButtons_ar[i];
				btn.updateText(ar[i]);
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<self.totalYtbButtons; i++){
					btn = self.ytbButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
				
				for(var i=0; i<self.totalYtbButtons; i++){
					btn = self.ytbButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
			
				totalHeight = startY + 5;
				self.pointer_do.setX(parseInt((totalWidth - self.pointer_do.w)/2));
				self.pointer_do.setY(totalHeight);
				if(self.ytbButtonBackground_do){
					self.ytbButtonBackground_do.setWidth(totalWidth);
					self.ytbButtonBackground_do.setHeight(totalHeight);
				}
				self.ytbButtonsHolder_do.setWidth(totalWidth);
				self.ytbButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		this.disableQualityButtons = function(curQualityLevel){
			
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720" || curQualityLevel == "hd1440" || curQualityLevel == "hd2160"){
				self.ytbQualityButton_do.showDisabledState();
			}else{
				self.ytbQualityButton_do.hideDisabledState();
			}
			
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				
				if(btn.label_str == curQualityLevel){
					FWDAnimation.killTweensOf(self.ytbQualityArrow_do);
					if(btn.y != 0){
						self.ytbQualityArrow_do.setY(btn.y + Math.round((btn.h - self.ytbQualityArrow_do.h)/2));
						self.ytbDisabledButton_do = btn;
					}
					
					btn.disable();
				}else{
					btn.enable();
				}
			}
		};
		
		this.setYtbQualityArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = self.ytbDisabledButton_do.y + Math.round((self.ytbDisabledButton_do.h - self.ytbQualityArrow_do.h)/2);
			}else{
				curY = target.y + Math.round((target.h - self.ytbQualityArrow_do.h)/2);
			}
			
			FWDAnimation.killTweensOf(self.ytbQualityArrow_do);
			FWDAnimation.to(self.ytbQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		this.showQualityButtons = function(animate){
			if(self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			self.hideSubtitleButtons();
			self.areYtbQualityButtonsShowed_bl = true;
			//var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			//var finalY = parseInt(- self.ytbButtonsHolder_do.h - 6);
			var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			var finalY = parseInt(parent.stageHeight - self.stageHeight - self.ytbButtonsHolder_do.h - 6);
			
			if(window.hasPointerEvent_bl){
				window.addEventListener("pointerdown", self.hideQualityButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.addEventListener("mousedown", self.hideQualityButtonsHandler);
				}
				window.addEventListener("touchstart", self.hideQualityButtonsHandler);
			}
			
			self.ytbButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(self.ytbButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(finalY);
			}
		};
	
		this.hideQualityButtons = function(animate){
			if(!self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			self.areYtbQualityButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(self.ytbButtonsHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				FWDAnimation.to(self.ytbButtonsHolder_do, .6, {y:parent.stageHeight, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.ytbButtonsHolder_do);
				//self.ytbButtonsHolder_do.setY(self.stageHeight);
				self.ytbButtonsHolder_do.setY(parent.stageHeight);
			}
			
			if(window.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", self.hideQualityButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.removeEventListener("mousedown", self.hideQualityButtonsHandler);
				}
				window.removeEventListener("touchstart", self.hideQualityButtonsHandler);
			}
		};
		
		
		//##########################################//
		/* Setup youtube quality button */
		//##########################################//
		this.setupYoutubeQualityButton = function(){
			FWDEVPSimpleButton.setPrototype();
			self.ytbQualityButton_do = new FWDEVPSimpleButton(
					self.ytbQualityN_img,
					data.ytbQualitySPath_str,
					data.ytbQualityDPath_str,
					true,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str
			);
		
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.setY(parseInt((self.stageHeight - self.ytbQualityButton_do.h)/2));
			self.ytbQualityButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.ytbQualityMouseUpHandler);
			self.mainHolder_do.addChild(self.ytbQualityButton_do);
		};
		
		this.ytbQualityMouseUpHandler = function(){
			if(self.areYtbQualityButtonsShowed_bl){
				self.hideQualityButtons(true);
			}else{
				self.showQualityButtons(true);
			}
		};
		
		this.hideQualityButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(self.ytbQualityButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(self.ytbButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			self.hideQualityButtons(true);
		};
		
		this.addYtbQualityButton = function(){
			if(self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = true;
			
			if(self.shareButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.shareButton_do) != -1){
				self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.shareButton_do), 0, self.ytbQualityButton_do);
			}else if(self.fullScreenButton_do && FWDEVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do) != -1){
				self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do), 0, self.ytbQualityButton_do);
			}else{
				self.buttons_ar.splice(self.buttons_ar.length, 0, self.ytbQualityButton_do);
			}
			
			self.ytbQualityButton_do.disable();
			self.ytbQualityButton_do.rotation = 0;
			self.ytbQualityButton_do.setRotation(self.ytbQualityButton_do.rotation);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			
			self.positionButtons();
		};
		
		this.removeYtbQualityButton = function(){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = false;
			self.buttons_ar.splice(FWDEVPUtils.indexOfArray(self.buttons_ar, self.ytbQualityButton_do), 1);
			
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			self.positionButtons();
		};
		
		this.updateQuality = function(qualityLevels, curQualityLevel){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl || parent.isAdd_bl) return;
			self.positionAndResizeYtbQualityButtons(qualityLevels);
			setTimeout(function(){
				self.disableQualityButtons(curQualityLevel);
			},65);
			
		};	
		
		//##########################################//
		/* Setup subtitle button */
		//##########################################//
		this.showSubtitleButton_bl
		this.subtitlesSource_ar = data.subtitles_ar;
		this.subtitleButtons_ar = [];
		this.totalSubttleButtons = 10;
		
		this.setupSubtitleButton = function(){
			FWDEVPComplexButton.setPrototype();
			self.subtitleButton_do = new FWDEVPComplexButton(
					data.showSubtitleNPath_img,
					data.showSubtitleSPath_str,
					data.hideSubtitleNPath_img,
					data.hideSubtitleSPath_str,
					true,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str
			);
			
			self.buttons_ar.push(self.subtitleButton_do);
			self.subtitleButton_do.setY(parseInt((self.stageHeight - self.subtitleButton_do.h)/2));
			self.subtitleButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, self.subtitleButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.subtitleButton_do);
			
			self.setupSubtitleButtons();
			
			if(location.protocol.indexOf("file:") != -1) self.disableSubtitleButton();
			
			if(parent.subtitle_do.showSubtitileByDefault_bl) self.subtitleButton_do.setButtonState(0);
		}
		
		this.subtitleButtonMouseUpHandler = function(){
			/*
			if(self.subtitleButton_do.currentState == 1){
				self.dispatchEvent(FWDEVPController.SHOW_SUBTITLE);
				self.subtitleButton_do.setButtonState(0);
			}else{
				self.dispatchEvent(FWDEVPController.HIDE_SUBTITLE);
				self.subtitleButton_do.setButtonState(1);
			}
			*/
			if(self.areSubtitleButtonsShowed_bl){
				self.hideSubtitleButtons(true);
			}else{
				self.showSubtitleButtons(true);
			}
		};
		
		this.disableSubtitleButton = function(){
			if(self.subtitleButton_do) self.subtitleButton_do.disable();
		};
		
		this.enableSubtitleButton = function(){
			if(self.subtitleButton_do) self.subtitleButton_do.enable();
		};
	
		
		//###################################################//
		/* Setup subtitlebuttons */
		//###################################################//
		this.updateSubtitleButtons = function(subtitles, subtitleIndex){
			if(!self.subtitleButton_do) return;
			self.subtitleButton_do.enable();
			self.positionAndResizeSubtitleButtons(subtitles);
			setTimeout(function(){
				subtitleIndex = self.subtitlesSource_ar.length - 1 - subtitleIndex;
				self.disableSubtitleButtons(subtitleIndex);
			},65);
			self.prevSubtitleIndex = subtitleIndex;
		};	
		
		this.setupSubtitleButtons = function(){
			self.subtitlesButtonsHolder_do = new FWDEVPDisplayObject("div");
			self.subtitlesButtonsHolder_do.setOverflow("visible");
			if(self.repeatBackground_bl){
				self.subtitlesButtonsHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.subtitlesButtonsBackground_do = new FWDEVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.subtitlesButtonsBackground_do.setScreen(img);
				self.subtitlesButtonsHolder_do.addChild(self.subtitlesButtonsBackground_do);
			}
			
			self.subtitlesButtonsHolder_do.setX(300);
			self.subtitlesButtonsHolder_do.setY(-300);
			parent.main_do.addChild(self.subtitlesButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = self.ytbQualityButtonPointerPath_str;
			self.subtitlesPonter_do = new FWDEVPDisplayObject("img");
			self.subtitlesPonter_do.setScreen(img);
			self.subtitlesPonter_do.setWidth(self.pointerWidth);
			self.subtitlesPonter_do.setHeight(self.pointerHeight);
			self.subtitlesButtonsHolder_do.addChild(self.subtitlesPonter_do);
	
			
			var img = new Image();
			img.src = self.youtubeQualityArrowPath_str;
			self.subtitleQualityArrow_do = new FWDEVPDisplayObject("img");
			self.subtitleQualityArrow_do.setScreen(img);
			self.subtitleQualityArrow_do.setX(7);
			self.subtitleQualityArrow_do.setWidth(5);
			self.subtitleQualityArrow_do.setHeight(7);
			self.subtitlesButtonsHolder_do.addChild(self.subtitleQualityArrow_do);
			
			var btn;
			
			for(var i=0; i<self.totalSubttleButtons; i++){
				FWDEVPYTBQButton.setPrototype();
				btn = new FWDEVPYTBQButton("no source", 
						self.youtubeQualityButtonNormalColor_str, 
						self.youtubeQualityButtonSelectedColor_str,
						data.hdPath_str,
						i);
				
				btn.addListener(FWDEVPYTBQButton.MOUSE_OVER, self.sbtQualityOver);
				btn.addListener(FWDEVPYTBQButton.MOUSE_OUT, self.sbtQualityOut);
				btn.addListener(FWDEVPYTBQButton.CLICK, self.sbtQualityClick);
				self.subtitleButtons_ar[i] = btn;
				self.subtitlesButtonsHolder_do.addChild(btn);
			}
			self.hideSubtitleButtons(false);
		};
		
		this.sbtQualityOver = function(e){
			self.setSubtitleArrowPosition(e.target);
		};
		
		this.sbtQualityOut = function(e){
			self.setSubtitleArrowPosition(undefined);
		};
		
		this.sbtQualityClick = function(e){
			self.startAtSubtitle = e.id;
			self.disableSubtitleButtons(self.startAtSubtitle);
			self.hideSubtitleButtons(true);
			self.dispatchEvent(FWDEVPController.CHANGE_SUBTITLE, {id:self.subtitlesSource_ar.length -1 - e.id});
		};
		
		this.positionAndResizeSubtitleButtons = function(ar){
			if(!ar) return;
			
			var totalButtons = ar.length;
			if(self.prevSubtitlesQualityButtonsLength == totalButtons) return;
			this.prevSubtitlesQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;

			for(var i=0; i<totalButtons; i++){
				btn = self.subtitleButtons_ar[i];
				btn.updateText(ar[i]["label"]);
				btn.setFinalSize();
			}
			
			setTimeout(function(){
				for(var i=0; i<self.totalSubttleButtons; i++){
					btn = self.subtitleButtons_ar[i];
					if(i < totalButtons){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
				
				for(var i=0; i<self.totalSubttleButtons; i++){
					btn = self.subtitleButtons_ar[i];
					if(btn.dumy_do.w < totalWidth){
						btn.setWidth(totalWidth);
						btn.dumy_do.setWidth(totalWidth);
					}
				}
				
				totalHeight = startY + 5;
				self.subtitlesPonter_do.setX(parseInt((totalWidth - self.subtitlesPonter_do.w)/2));
				self.subtitlesPonter_do.setY(totalHeight);
				if(self.subtitlesButtonsBackground_do){	
					self.subtitlesButtonsBackground_do.setWidth(totalWidth);
					self.subtitlesButtonsBackground_do.setHeight(totalHeight);
				}
				self.subtitlesButtonsHolder_do.setWidth(totalWidth);
				self.subtitlesButtonsHolder_do.setHeight(totalHeight);
			}, 60);
		};
		
		this.disableSubtitleButtons = function(index){
			for(var i=0; i<self.totalSubttleButtons; i++){
				btn = self.subtitleButtons_ar[i];
				if(i == index){
					FWDAnimation.killTweensOf(self.subtitleQualityArrow_do);
					self.subtitleQualityArrow_do.setY(btn.y + parseInt((btn.h - self.subtitleQualityArrow_do.h)/2) + 1);
					btn.disable();
					self.subtitleDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
			if(self.subtitlesSource_ar.length -1 - index == 0){
				self.subtitleButton_do.setButtonState(0);
			}else{
				self.subtitleButton_do.setButtonState(1);
			}
			
			
			
			/*
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720" || curQualityLevel == "hd1440" || curQualityLevel == "hd2160"){
				self.subtitleButton_do.showDisabledState();
			}else{
				self.subtitleButton_do.hideDisabledState();
			}
			*/
		};
		
		this.setSubtitleArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = self.subtitleDisabledButton_do.y + parseInt((self.subtitleDisabledButton_do.h - self.subtitleQualityArrow_do.h)/2);
			}else{
				curY = target.y + parseInt((target.h - self.subtitleQualityArrow_do.h)/2);
			}
			FWDAnimation.killTweensOf(self.subtitleQualityArrow_do);
			FWDAnimation.to(self.subtitleQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		this.showSubtitleButtons = function(animate){
			if(self.areSubtitleButtonsShowed_bl) return;
			self.hideQualityButtons();
			self.areSubtitleButtonsShowed_bl = true;
			//var finalX = parseInt(self.subtitleButton_do.x + (parseInt(self.subtitleButton_do.w - self.subtitlesButtonsHolder_do.w)/2));
			//var finalY = parseInt(- self.subtitlesButtonsHolder_do.h - 6);
			var finalX = parseInt(self.subtitleButton_do.x + (parseInt(self.subtitleButton_do.w - self.subtitlesButtonsHolder_do.w)/2));
			var finalY = parseInt(parent.stageHeight - self.stageHeight - self.subtitlesButtonsHolder_do.h - 6);
			
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointerdown", self.hideSubtitlesButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.addEventListener("mousedown", self.hideSubtitlesButtonsHandler);
				}
				window.addEventListener("touchstart", self.hideSubtitlesButtonsHandler);
			}
			
			self.subtitlesButtonsHolder_do.setX(finalX);
		
			if(animate){
				FWDAnimation.to(self.subtitlesButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.subtitlesButtonsHolder_do);
				self.subtitlesButtonsHolder_do.setY(finalY);
			}
		};
	
		this.hideSubtitleButtons = function(animate){
			if(!self.areSubtitleButtonsShowed_bl || !self.showSubtitleButton_bl) return;
			self.areSubtitleButtonsShowed_bl = false;
			if(animate){
				//FWDAnimation.to(self.subtitlesButtonsHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				FWDAnimation.to(self.subtitlesButtonsHolder_do, .6, {y:parent.stageHeight, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.subtitlesButtonsHolder_do);
				//self.subtitlesButtonsHolder_do.setY(self.stageHeight);
				self.subtitlesButtonsHolder_do.setY(parent.stageHeight);
			}
			
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", self.hideSubtitlesButtonsHandler);
			}else{
				if(!self.isMobile_bl){
					window.removeEventListener("mousedown", self.hideSubtitlesButtonsHandler);
				}
				window.removeEventListener("touchstart", self.hideSubtitlesButtonsHandler);
			}
		};
		
		this.hideSubtitlesButtonsHandler = function(e){
			var vc = FWDEVPUtils.getViewportMouseCoordinates(e);	
			if(FWDEVPUtils.hitTest(self.subtitleButton_do.screen, vc.screenX, vc.screenY)
			   || FWDEVPUtils.hitTest(self.subtitlesButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			self.hideSubtitleButtons(true);
		};
		
		
	
		//##########################################//
		/* Setup facebook button */
		//##########################################//
		this.setupShareButton = function(){
			
			FWDEVPSimpleButton.setPrototype();
			self.shareButton_do = new FWDEVPSimpleButton(
					self.shareN_img,
					data.shareSPath_str,
					undefined,
					true,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str
			);
			
			self.buttons_ar.push(self.shareButton_do);
			self.shareButton_do.setY(parseInt((self.stageHeight - self.shareButton_do.h)/2));
			self.shareButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.facebookButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.shareButton_do);
		};
		
	
		this.facebookButtonMouseUpHandler = function(){
			self.dispatchEvent(FWDEVPController.SHARE);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		this.setupDownloadButton = function(){
			FWDEVPSimpleButton.setPrototype();
			self.downloadButton_do = new FWDEVPSimpleButton(data.downloadN_img, data.downloadSPath_str, undefined, true, self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str);
			//self.downloadButton_do.addListener(FWDEVPSimpleButton.SHOW_TOOLTIP, self.downloadButtonShowToolTipHandler);
			self.downloadButton_do.addListener(FWDEVPSimpleButton.MOUSE_UP, self.downloadButtonOnMouseUpHandler);
			//self.downloadButton_do.setY(parseInt((self.stageHeight - self.downloadButton_do.h)/2));
			self.buttons_ar.push(self.downloadButton_do);
			self.mainHolder_do.addChild(self.downloadButton_do); 
		};
		
		this.downloadButtonShowToolTipHandler = function(e){
			//self.showToolTip(self.downloadButton_do, self.downloadButtonToolTip_do, e.e);
		};
		
		this.downloadButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDEVPController.DOWNLOAD_VIDEO);
		};
		
		//##########################################//
		/* Setup fullscreen button */
		//##########################################//
		this.setupFullscreenButton = function(){
			
			FWDEVPComplexButton.setPrototype();
			self.fullScreenButton_do = new FWDEVPComplexButton(
					self.fullScreenN_img,
					data.fullScreenSPath_str,
					self.normalScreenN_img,
					data.normalScreenSPath_str,
					true,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str
			);
			
			self.buttons_ar.push(self.fullScreenButton_do);
			self.fullScreenButton_do.setY(parseInt((self.stageHeight - self.fullScreenButton_do.buttonHeight)/2));
			self.fullScreenButton_do.addListener(FWDEVPComplexButton.MOUSE_UP, self.fullScreenButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.fullScreenButton_do);
		};
		
		this.showFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(1);
		};
		
		this.showNormalScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(0);
		};
		
		this.setNormalStateToFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setNormalState();
			self.hideQualityButtons(false);
		};
		
		this.fullScreenButtonMouseUpHandler = function(){
			
			if(self.fullScreenButton_do.currentState == 1){
				self.dispatchEvent(FWDEVPController.FULL_SCREEN);
			}else{
				self.dispatchEvent(FWDEVPController.NORMAL_SCREEN);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		this.setupTime = function(){
			self.time_do = new FWDEVPDisplayObject("div");
			self.time_do.hasTransform3d_bl = false;
			self.time_do.hasTransform2d_bl = false;
			self.time_do.setBackfaceVisibility();
			self.time_do.getStyle().fontFamily = "Arial";
			self.time_do.getStyle().fontSize= "12px";
			self.time_do.getStyle().whiteSpace= "nowrap";
			self.time_do.getStyle().textAlign = "center";
			self.time_do.getStyle().color = self.timeColor_str;
			self.time_do.getStyle().fontSmoothing = "antialiased";
			self.time_do.getStyle().webkitFontSmoothing = "antialiased";
			self.time_do.getStyle().textRendering = "optimizeLegibility";	
			self.mainHolder_do.addChild(self.time_do);
			self.updateTime("00:00/00:00");
			self.buttons_ar.push(self.time_do);
		};
		
		this.updateTime = function(time){
			if(!self.time_do) return;
			self.time_do.setInnerHTML(time);
			
			if(self.lastTimeLength != time.length){
				self.time_do.w = self.time_do.getWidth();
				self.positionButtons();
				
				setTimeout(function(){
					self.time_do.w = self.time_do.getWidth();
					self.time_do.h = self.time_do.getHeight();
					self.time_do.setY(parseInt((self.stageHeight - self.time_do.h)/2) + 1);
					self.positionButtons();
				}, 50);
				self.lastTimeLength = time.length;
			}
		};
		
		//##########################################//
		/* Setup volume button */
		//#########################################//
		this.setupVolumeButton = function(){
			FWDEVPVolumeButton.setPrototype();
			self.volumeButton_do = new FWDEVPVolumeButton(self.volumeN_img, data.volumeSPath_str, data.volumeDPath_str,
					self.useHEXColorsForSkin_bl,
					self.normalButtonsColor_str,
					self.selectedButtonsColor_str);
			self.volumeButton_do.addListener(FWDEVPVolumeButton.MOUSE_UP, self.volumeOnMouseUpHandler);
			self.volumeButton_do.setY(parseInt((self.stageHeight - self.volumeButton_do.h)/2));
			self.buttons_ar.push(self.volumeButton_do);
			self.mainHolder_do.addChild(self.volumeButton_do); 
			if(!self.allowToChangeVolume_bl) self.volumeButton_do.disable();
		};
		
		this.volumeOnMouseUpHandler = function(){
			var vol = self.lastVolume;
			
			if(self.isMute_bl){
				vol = self.lastVolume;
				self.isMute_bl = false;
			}else{
				vol = 0.000001;
				self.isMute_bl = true;
			};
			self.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		this.setupVolumeScrubber = function(){
			//setup background bar
			self.volumeScrubber_do = new FWDEVPDisplayObject("div");
			self.volumeScrubber_do.setHeight(self.scrubbersHeight);
			
			self.volumeScrubberBkLeft_do = new FWDEVPDisplayObject("img");
			self.volumeScrubberBkLeft_do.setScreen(self.volumeScrubberBkLeft_img);
			
			self.volumeScrubberBkRight_do = new FWDEVPDisplayObject("img");
			self.volumeScrubberBkRight_do.setScreen(self.volumeScrubberBkRight_img);
			
			var middleImage = new Image();
			middleImage.src = self.volumeScrubberBkMiddlePath_str;
			
			i//f(self.isMobile_bl){
				self.volumeScrubberBkMiddle_do = new FWDEVPDisplayObject("div");	
				self.volumeScrubberBkMiddle_do.getStyle().background = "url('" + self.volumeScrubberBkMiddlePath_str + "') repeat-x";
			//}else{
				//self.volumeScrubberBkMiddle_do = new FWDEVPDisplayObject("img");
				//self.volumeScrubberBkMiddle_do.setScreen(middleImage);
			//}
				
			self.volumeScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			self.volumeScrubberDrag_do = new FWDEVPDisplayObject("div");
			self.volumeScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			
			if(self.useHEXColorsForSkin_bl){
				self.volumeScrubberDragLeft_do = new FWDEVPDisplayObject("div");
				self.volumeScrubberDragLeft_do.setWidth(self.volumeScrubberDragLeft_img.width);
				self.volumeScrubberDragLeft_do.setHeight(self.volumeScrubberDragLeft_img.height);
				self.volumeScrubberDragLeft_canvas = FWDEVPUtils.getCanvasWithModifiedColor(self.volumeScrubberDragLeft_img, self.normalButtonsColor_str).canvas;
				self.volumeScrubberDragLeft_do.screen.appendChild(self.volumeScrubberDragLeft_canvas);	
			}else{
				self.volumeScrubberDragLeft_do = new FWDEVPDisplayObject("img");
				self.volumeScrubberDragLeft_do.setScreen(self.volumeScrubberDragLeft_img);
			}
			
			
			if(!self.useHEXColorsForSkin_bl){
				self.volumeScrubberDragMiddle_do = new FWDEVPDisplayObject("div");	
				self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}
			
			self.volumeScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
		
			self.volumeScrubberBarLine_do = new FWDEVPDisplayObject("img");
			self.volumeScrubberBarLine_do.setScreen(self.volumeScrubberLine_img);
			
			self.volumeScrubberBarLine_do.setAlpha(0);
			self.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			self.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.volumeScrubber_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubberBkMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.volumeScrubberBkRight_do.setX(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.volumeScrubberDragMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			//add all children
			self.volumeScrubber_do.addChild(self.volumeScrubberBkLeft_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkRight_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragLeft_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDrag_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			
			self.buttons_ar.push(self.volumeScrubber_do);
			
			self.mainHolder_do.addChild(self.volumeScrubber_do);
		
			
			if(!self.disableVideoScrubber_bl){
				if(self.hasPointerEvent_bl){
					self.volumeScrubber_do.screen.addEventListener("pointerover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.addEventListener("pointerout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.addEventListener("pointerdown", self.volumeScrubberOnDownHandler);
				}else if(self.screen.addEventListener){	
					if(!self.isMobile_bl){
						self.volumeScrubber_do.screen.addEventListener("mouseover", self.volumeScrubberOnOverHandler);
						self.volumeScrubber_do.screen.addEventListener("mouseout", self.volumeScrubberOnOutHandler);
						self.volumeScrubber_do.screen.addEventListener("mousedown", self.volumeScrubberOnDownHandler);
					}
					self.volumeScrubber_do.screen.addEventListener("touchstart", self.volumeScrubberOnDownHandler);
				}
			}
			
			self.enableVolumeScrubber();
			self.updateVolumeScrubber(self.volume);
		};
		
		this.volumeScrubberOnOverHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnOutHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnDownHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			if(self.disable_do) self.addChild(self.disable_do);
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
			
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointermove", self.volumeScrubberMoveHandler);
				window.addEventListener("pointerup", self.volumeScrubberEndHandler);
			}else{
				window.addEventListener("mousemove", self.volumeScrubberMoveHandler);
				window.addEventListener("mouseup", self.volumeScrubberEndHandler);		
				window.addEventListener("touchmove", self.volumeScrubberMoveHandler);
				window.addEventListener("touchend", self.volumeScrubberEndHandler);
			}	
		};
		
		this.volumeScrubberMoveHandler = function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
		};
		
		this.volumeScrubberEndHandler = function(){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointermove", self.volumeScrubberMoveHandler);
				window.removeEventListener("pointerup",  self.volumeScrubberEndHandler);
			}else{
				window.removeEventListener("mousemove", self.volumeScrubberMoveHandler);
				window.removeEventListener("mouseup",  self.volumeScrubberEndHandler);		
				window.removeEventListener("touchmove", self.volumeScrubberMoveHandler);
				window.removeEventListener("touchend", self.volumeScrubberEndHandler);
			}
		};
		
		this.disableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = true;
			self.volumeScrubber_do.setButtonMode(false);
			self.volumeScrubberEndHandler();
		};
		
		this.enableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = false;
			self.volumeScrubber_do.setButtonMode(true);
		};
		
		this.updateVolumeScrubber = function(percent){
			var finalWidth = parseInt(percent * self.volumeScrubberWidth); 
			self.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > self.volumeScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.volumeScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updateVolume = function(volume, preventEvent){
			if(!self.showVolumeScrubber_bl) return;
			self.volume = volume;
			if(self.volume <= 0.000001){
				self.isMute_bl = true;
				self.volume = 0.000001;
			}else if(self.voume >= 1){
				self.isMute_bl = false;
				self.volume = 1;
			}else{
				self.isMute_bl = false;
			}
			
			if(self.volume == 0.000001){
				if(self.volumeButton_do) self.volumeButton_do.setDisabledState();
			}else{
				if(self.volumeButton_do) self.volumeButton_do.setEnabledState();
			}
			
			if(self.volumeScrubberBarLine_do) self.updateVolumeScrubber(self.volume);
			if(!preventEvent) self.dispatchEvent(FWDEVPController.CHANGE_VOLUME, {percent:self.volume});
		};
		
		//###################################//
		/* show / hide */
		//###################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			setTimeout(self.positionButtons, 200);
		};
		
		this.hide = function(animate, hideForGood){
			if(!self.isShowed_bl && !hideForGood) return;
			self.isShowed_bl = false;
			var offsetY = 0;
			if(hideForGood) offsetY = self.mainScrubberOffestTop;
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:self.stageHeight + offsetY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(self.stageHeight + offsetY);
			}
			self.hideQualityButtons(true);
			self.hidePlaybackRateButtons(true);
			self.hideSubtitleButtons(true);
		};
		
		this.updateHexColorForScrubber = function(isAdd){
			if(isAdd){
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddleAddPath_str + "') repeat-x";
				self.mainScrubberDragLeft_do.screen.src = data.mainScrubberDragLeftAddPath_str;
			}else{
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddlePath_str + "') repeat-x";
				self.mainScrubberDragLeft_do.screen.src = self.mainScrubberDragLeftSource;
			}
		}
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		self.updateHEXColors = function(normalColor_str, selectedColor_str){
			
			self.normalColor_str = normalColor_str;
			self.selectedColor_str = selectedColor_str;
		
			FWDEVPUtils.changeCanvasHEXColor(self.mainScrubberDragLeft_img, self.mainScrubberDragLeft_canvas, normalColor_str);
			try{
				FWDEVPUtils.changeCanvasHEXColor(self.volumeScrubberDragLeft_img, self.volumeScrubberDragLeft_canvas, normalColor_str);
			}catch(e){}
			
			var newCenterImage = FWDEVPUtils.changeCanvasHEXColor(self.mainScrubberMiddleImage, self.mainSCrubberMiddleCanvas, normalColor_str, true);
			self.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
			try{
				if(self.volumeScrubberDragMiddle_do) self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
			}catch(e){}
			
			self.playPauseButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.playbackRateButton_do) self.playbackRateButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.subtitleButton_do) self.subtitleButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.volumeButton_do) self.volumeButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.ytbQualityButton_do) self.ytbQualityButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.shareButton_do) self.shareButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.embedButton_do) self.embedButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			if(self.fullScreenButton_do) self.fullScreenButton_do.updateHEXColors(normalColor_str, selectedColor_str);
			
			if(self.time_do) self.time_do.getStyle().color = normalColor_str;
				
			if(self.ytbButtons_ar){
				for(var i=0; i<self.totalYtbButtons; i++){
					var btn = self.ytbButtons_ar[i];
					if(btn){
						btn.normalColor_str = normalColor_str;
						btn.selectedColor_str = selectedColor_str;
						if(btn.isSelected_bl){
							btn.setSelectedState();
						}else{
							btn.setNormalState();
						}
					}
				}
			}
			
			if(self.playbackRateButtons_ar){
				for(var i=0; i<self.playbackRateButtons_ar.length; i++){
					var btn = self.playbackRateButtons_ar[i];
					if(btn){
						btn.normalColor_str = normalColor_str;
						btn.selectedColor_str = selectedColor_str;
						if(btn.isSelected_bl){
							btn.setSelectedState();
						}else{
							btn.setNormalState();
						}
					}
				}
			}
			
			if(self.subtitleButtons_ar){
				for(var i=0; i<self.totalSubttleButtons; i++){
					var btn = self.subtitleButtons_ar[i];
					if(btn){
						btn.normalColor_str = normalColor_str;
						btn.selectedColor_str = selectedColor_str;
						if(btn.isSelected_bl){
							btn.setSelectedState();
						}else{
							btn.setNormalState();
						}
					}
				}
			}
			
		}
	
		this.init();
	};
	
	/* set prototype */
	FWDEVPController.setPrototype = function(){
		FWDEVPController.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPController.DOWNLOAD_VIDEO = "downloadVideo";
	FWDEVPController.SHOW_SUBTITLE = "showSubtitle";
	FWDEVPController.HIDE_SUBTITLE = "hideSubtitle";
	FWDEVPController.SHARE = "share";
	FWDEVPController.FULL_SCREEN = "fullScreen";
	FWDEVPController.NORMAL_SCREEN = "normalScreen";
	FWDEVPController.PLAY = "play";
	FWDEVPController.PAUSE = "pause";
	FWDEVPController.START_TO_SCRUB = "startToScrub";
	FWDEVPController.SCRUB = "scrub";
	FWDEVPController.STOP_TO_SCRUB = "stopToScrub";
	FWDEVPController.CHANGE_VOLUME = "changeVolume";
	FWDEVPController.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality";
	FWDEVPController.SHOW_EMBED_WINDOW = "showEmbedWindow";
	FWDEVPController.CHANGE_SUBTITLE = "changeSubtitle";
	FWDEVPController.CHANGE_PLAYBACK_RATES = "changePlaybackRates";
	
	
	FWDEVPController.prototype = null;
	window.FWDEVPController = FWDEVPController;
	
}(window));