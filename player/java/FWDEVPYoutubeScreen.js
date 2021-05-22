/* thumbs manager */
(function(window){
	
	var FWDEVPYoutubeScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDEVPYoutubeScreen.prototype;
		
		this.main_do = null;
		this.ytb = null;
		
		this.lastQuality_str = "auto";
		
		this.volume = volume;
		
		this.updateVideoId_int;
		this.updatePreloadId_int;
		
		this.controllerHeight = parent.data.controllerHeight;
		this.hasHours_bl = false;
		this.hasBeenCreatedOnce_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = false;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isPausedInEvent_bl = true;
		this.isShowed_bl = true;
		this.isCued_bl = false;
		this.isQualityArrayDisapatched_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.hasTransform3d_bl = false;
			self.hasTransform2d_bl = false;
			self.setBackfaceVisibility();
			parent.main_do.addChildAt(self, 0);
			self.resizeAndPosition();
			self.setupVideo();
			self.setupDisableClick();
			self.setWidth(1);
			self.setHeight(1);
		};
		
		//#####################################//
		/* Setup disable click */
		//#####################################//
		this.setupDisableClick = function(){
			self.disableClick_do = new FWDEVPDisplayObject("div");
			self.disableClick_do.setBkColor(parent.backgroundColor_str);
			
			self.addChild(self.disableClick_do);
		};
		
		this.showDisable = function(){
			if(!parent.tempVidStageWidth || self.disableClick_do.w == self.stageWidth) return;
			self.disableClick_do.setWidth(parent.tempVidStageWidth);
			if(FWDEVPUtils.isIphone){	
				self.disableClick_do.setHeight(parent.tempVidStageHeight - self.controllerHeight);
			}else{
				self.disableClick_do.setHeight(parent.tempVidStageHeight);
			}
		};
		
		this.hideDisable = function(){
			if(self.disableClick_do.w == 0) return;
			self.disableClick_do.setWidth(0);
			self.disableClick_do.setHeight(0);
			
		};
	
		//###############################################//
		/* Setup youtube video */
		//##############################################//
		this.setupVideo = function(){
			if(self.ytb) return;
			
			self.main_do = new FWDEVPDisplayObject("div");
			self.main_do.hasTransform3d_bl = false;
			self.main_do.hasTransform2d_bl = false;
			self.main_do.screen.setAttribute("id", parent.instanceName_str + "youtube");
			self.main_do.getStyle().width = "100%";
			self.main_do.getStyle().height = "100%";
			self.main_do.setBackfaceVisibility();
			self.addChild(self.main_do);
			
			self.ytb = new YT.Player(parent.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0,
					playsinline:1
			  	},
			  	events: {
			  		"onReady":self.playerReadyHandler,
			  		"onError":self.playerErrorHandler,
			  		"onStateChange":self.stateChangeHandler,
			  		"onPlaybackQualityChange":self.qualityChangeHandler
			  	}
		    });
		};
		
		this.playerReadyHandler = function(){
			if(self.ytb && !self.ytb.playVideo && !self.ytb.cueVideoById){
				self.updateReadyId_int = setInterval(function(){
					self.playerReadyHandler();
				}, 50);
				return;
			}else{
				clearInterval(self.updateReadyId_int);
			}
			
			self.resizeAndPosition();
			self.dispatchEvent(FWDEVPYoutubeScreen.READY);
			self.hasBeenCreatedOnce_bl = true;
		};
		
		this.stateChangeHandler = function(e){
			//if(logger) logger.log(e.data + " " + parent.instanceName_str + " " + self.isCued_bl)
			/*
			if(e.data == -1 && self.isCued_bl && self.isMobile_bl){
				
				if(self.isStopped_bl){
					self.isStopped_bl = false;
				}
				FWDEVPlayer.stopAllVideos(parent);
			}'*/
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!self.isSafeToBeControlled_bl){
					self.isStopped_bl = false;
					
					self.isSafeToBeControlled_bl = true;
					
					self.isPlaying_bl = true;
					self.hasHours_bl = Math.floor(self.ytb.getDuration() / (60 * 60)) > 0;
					self.setVolume(parent.volume);
					
					self.startToUpdate();
					self.startToPreload();
					if(!self.isMobile_bl) self.ytb.seekTo(0.000001);
					if(!self.isMobile_bl) self.setQuality(self.lastQuality_str);
					
					if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
						self.dispatchEvent(FWDEVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality(), levels:self.ytb.getAvailableQualityLevels()});
					}
					self.setPlaybackRate();
				    self.dispatchEvent(FWDEVPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				if(self.isPausedInEvent_bl) self.dispatchEvent(FWDEVPYoutubeScreen.PLAY);
				self.isPausedInEvent_bl = false;
				self.hasError_bl = false;
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!self.isSafeToBeControlled_bl) return;
				//self.isStopped_bl = false;
				if(!self.isPausedInEvent_bl) self.dispatchEvent(FWDEVPYoutubeScreen.PAUSE);
				self.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(self.ytb.getCurrentTime() && self.ytb.getCurrentTime() > 0 && self.isSafeToBeControlled_bl){
					//self.isStopped_bl = false;
					setTimeout(function(){self.dispatchEvent(FWDEVPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!self.isStopped_bl){
					self.dispatchEvent(FWDEVPYoutubeScreen.CUED);
				}
				self.isCued_bl = true;
			}
		};
		
		this.qualityChangeHandler = function(e){
			if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
				self.dispatchEvent(FWDEVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality()});
			}
		};
		
		this.playerErrorHandler = function(e){
			self.isPausedInEvent_bl = true;
			
			if(self.isStopped_bl || self.hasError_bl || !self.sourcePath_str) return;
			
			var error_str = "";
			self.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			
			self.dispatchEvent(FWDEVPYoutubeScreen.ERROR, {text:error_str});
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(){
			if(!parent.tempVidStageWidth) return;
			self.setX(-1);
			self.setY(-1);
			self.setWidth(parent.tempVidStageWidth + 2);
			self.setHeight(parent.tempVidStageHeight + 2);
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			if(sourcePath) self.sourcePath_str = sourcePath;
			self.ytb.cueVideoById(self.sourcePath_str);
			if(!self.isMobile_bl) self.isStopped_bl = false;
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			
			FWDEVPlayer.curInstance = parent;
			self.isPlaying_bl = true;
			self.hasError_bl = false;
			
				self.ytb.playVideo();
				self.startToUpdate();
			
			if(!self.isMobile_bl) self.isStopped_bl = false;
		};

		this.pause = function(){
			if(self.isStopped_bl || self.hasError_bl) return;
			self.isPlaying_bl = false;
			try{
				self.ytb.pauseVideo();
			}catch(e){}
			self.stopToUpdate();
		};
		
		this.togglePlayPause = function(){
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		//###########################################//
		/* Updates ... */
		//###########################################//
		this.startToUpdate = function(){
			clearInterval(self.updateVideoId_int);
			self.updateVideoId_int = setInterval(self.updateVideo, 500);
		};
		
		this.stopToUpdate = function(){
			clearInterval(self.updateVideoId_int);
		};
		
		this.updateVideo = function(){
			var percentPlayed; 
			if(!self.ytb){
				stopToUpdate();
				return;
			}
			if (!self.allowScrubing_bl) {
				percentPlayed = self.ytb.getCurrentTime() /self.ytb.getDuration();
				self.dispatchEvent(FWDEVPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.ytb.getDuration());
			var curTime = self.formatTime(self.ytb.getCurrentTime());
			
			self.dispatchEvent(FWDEVPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:parseInt(self.ytb.getCurrentTime())});
		};
		
		this.startToPreload = function(){
			clearInterval(self.preloadVideoId_int);
			self.updatePreloadId_int = setInterval(self.updateProgress, 500);
		};
		
		this.stopToPreload = function(){
			clearInterval(self.updatePreloadId_int);
		};
		
		this.updateProgress = function(){
			if(!self.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = self.ytb.getVideoLoadedFraction();
			
			self.dispatchEvent(FWDEVPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//###########################################//
		/* Event handlers */
		//###########################################//	
		this.stop = function(){
			if(self.isStopped_bl) return;
			//if(logger) logger.log("# YTB stop #" + parent.instanceName_str);
			
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.isCued_bl = false;
			self.allowScrubing_bl = false;
			self.isSafeToBeControlled_bl = false;
			self.isQualityArrayDisapatched_bl = false;
			self.isPausedInEvent_bl = true;
			clearInterval(self.updateReadyId_int);
			self.stopToUpdate();
			self.stopToPreload();
			self.stopVideo();
			self.dispatchEvent(FWDEVPYoutubeScreen.STOP);
			self.dispatchEvent(FWDEVPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDEVPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		this.destroyYoutube = function(){
			if(self.main_do){
				self.main_do.screen.removeAttribute("id", parent.instanceName_str + "youtube");
				self.main_do.destroy();
				self.main_do = null;
			}
			if(self.ytb) self.ytb.destroy();
			self.ytb = null;
		};
		
		this.stopVideo = function(){
			//if(!self.isMobile_bl) 
			if(self.ytb && self.ytb.cueVideoById) self.ytb.cueVideoById(self.sourcePath_str);
			//self.ytb.seekTo(0);
			//self.ytb.clearVideo();
			//self.ytb.stopVideo();
		};

		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = true;
		};
		
		this.scrubbAtTime = function(duration){
			if(!self.isSafeToBeControlled_bl) return;
			
			self.ytb.seekTo(duration);
		}
		
		this.stopToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent){
			if(!self.isSafeToBeControlled_bl) return;
			self.ytb.seekTo(percent * self.ytb.getDuration());
		};
		
		this.setPlaybackRate = function(rate){
			if(!self.ytb || self.isMobile_bl) return;
			if(rate) self.rate = rate;
			if(self.ytb && self.ytb.setPlaybackRate) self.ytb.setPlaybackRate(self.rate);
		};
	
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.ytb) self.ytb.setVolume(vol * 100);
		};
		
		//###############################################//
		/* set quality */
		//###############################################//
		this.setQuality = function(quality){
			self.lastQuality_str = quality;
			self.ytb.setPlaybackQuality(quality);
		};
		
		this.formatTime = function(secs){
			var hours = Math.floor(secs / (60 * 60));
			
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    
		    if(isNaN(seconds)) return "00:00";
			if(self.hasHours_bl){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};
		
	
		this.init();
	};

	/* set prototype */
	FWDEVPYoutubeScreen.setPrototype = function(){
		FWDEVPYoutubeScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPYoutubeScreen.READY = "ready";
	FWDEVPYoutubeScreen.ERROR = "error";
	FWDEVPYoutubeScreen.UPDATE = "update";
	FWDEVPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDEVPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDEVPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPYoutubeScreen.PLAY = "play";
	FWDEVPYoutubeScreen.PAUSE = "pause";
	FWDEVPYoutubeScreen.STOP = "stop";
	FWDEVPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDEVPYoutubeScreen.CUED = "cued";
	FWDEVPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDEVPYoutubeScreen = FWDEVPYoutubeScreen;

}(window));