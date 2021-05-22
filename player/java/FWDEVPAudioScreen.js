/* thumbs manager */
(function(window){
	
	var FWDEVPAudioScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDEVPAudioScreen.prototype;
	
		this.audio_el = null;
	
		this.sourcePath_str = null;
		
		this.lastPercentPlayed = 0;
		this.volume = volume;
		this.curDuration = 0;
		this.countNormalMp3Errors = 0;
		this.countShoutCastErrors = 0;
		this.maxShoutCastCountErrors = 5;
		this.maxNormalCountErrors = 1;
		this.testShoutCastId_to;
		
		this.audioVisualizerLinesColor_str = FWDEVPUtils.hexToRgb(parent.data.audioVisualizerLinesColor_str);
		this.audioVisualizerCircleColor_str = FWDEVPUtils.hexToRgb(parent.data.audioVisualizerCircleColor_str);
			
		
		this.preload_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = true;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.hasPlayedOnce_bl = false;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isShoutcast_bl = false;
		this.isNormalMp3_bl = false;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setupAudio();
			if(!FWDEVPUtils.isLocal) self.setupSpectrum();
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(width, height){
			if(width){
				self.stageWidth = width;
				self.stageHeight = height;
			}
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.resizeSpectrumCanvas()
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupAudio = function(){
			if(self.audio_el == null){
				self.audio_el = document.createElement("audio");
				self.screen.appendChild(self.audio_el);
				self.audio_el.controls = false;
				self.audio_el.preload = "auto";
				self.audio_el.volume = self.volume;
				//self.audio_el.crossOrigin = "anonymous";
				self.setPlaybackRate(parent.data.defaultPlaybackRate_ar[parent.data.startAtPlaybackIndex]);
			}
			
			self.audio_el.addEventListener("error", self.errorHandler);
			self.audio_el.addEventListener("canplay", self.safeToBeControlled);
			self.audio_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.audio_el.addEventListener("progress", self.updateProgress);
			self.audio_el.addEventListener("timeupdate", self.updateAudio);
			self.audio_el.addEventListener("pause", self.pauseHandler);
			self.audio_el.addEventListener("play", self.playHandler);
			self.audio_el.addEventListener("ended", self.endedHandler);
		};
		
		this.destroyAudio = function(){
			if(self.audio_el){
				self.audio_el.removeEventListener("error", self.errorHandler);
				self.audio_el.removeEventListener("canplay", self.safeToBeControlled);
				self.audio_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.audio_el.removeEventListener("progress", self.updateProgress);
				self.audio_el.removeEventListener("timeupdate", self.updateAudio);
				self.audio_el.removeEventListener("pause", self.pauseHandler);
				self.audio_el.removeEventListener("play", self.playHandler);
				self.audio_el.removeEventListener("ended", self.endedHandler);
				self.audio_el.removeEventListener("waiting", self.startToBuffer);
				self.audio_el.removeEventListener("playing", self.stopToBuffer);
				self.audio_el.src = "";
				self.audio_el.load();
			}
			//try{
			//	self.screen.removeChild(self.audio_el);
			//}catch(e){}
			//self.audio_el = null;
		};
		
		this.startToBuffer = function(overwrite){
			self.dispatchEvent(FWDEVPVideoScreen.START_TO_BUFFER);
		};
		
		this.stopToBuffer = function(){
			self.dispatchEvent(FWDEVPVideoScreen.STOP_TO_BUFFER);
		};
		
		this.togglePlayPause = function(){
			if(self == null) return;
			if(!self.isSafeToBeControlled_bl) return;
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			if(self.sourcePath_str == null || self.sourcePath_str == undefined) return;
			
			if(self.isNormalMp3_bl && self.countNormalMp3Errors <= self.maxNormalCountErrors){
				self.stop();
				self.testShoutCastId_to = setTimeout(self.play, 200);
				self.countNormalMp3Errors ++;
				return;
			}
			
			if(self.isShoutcast_bl && self.countShoutCastErrors <= self.maxShoutCastCountErrors && self.audio_el.networkState == 0){
				self.testShoutCastId_to = setTimeout(self.play, 200);
				self.countShoutCastErrors ++;
				return;
			}
			
			var error_str;
			self.hasError_bl = true;
			self.stop();
			
			if(self.audio_el.networkState == 0){
				error_str = "error 'self.audio_el.networkState = 1'";
			}else if(self.audio_el.networkState == 1){
				error_str = "error 'self.audio_el.networkState = 1'";
			}else if(self.audio_el.networkState == 2){
				error_str = "'self.audio_el.networkState = 2'";
			}else if(self.audio_el.networkState == 3){
				error_str = "source not found <font color='#FF0000'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.audio_el.networkState);
			
			self.dispatchEvent(FWDEVPAudioScreen.ERROR, {text:error_str });
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			
			self.sourcePath_str = sourcePath;
			
			/*
			var paths_ar = self.sourcePath_str.split(",");
			var formats_ar = FWDEVP.getAudioFormats;
			//console.log("PATHS " +  "[" + paths_ar + "]");
			//console.log("FORMATS " + "[" + formats_ar + "]");
			//console.log("#################")
			
			for(var i=0; i<paths_ar.length; i++){
				var path = paths_ar[i];
				paths_ar[i] = FWDEVPUtils.trim(path);
			}
			
			loop1:for(var j=0; j<paths_ar.length; j++){
				var path = paths_ar[j];
				for(var i=0; i<formats_ar.length; i++){
					var format = formats_ar[i];
					if(path.indexOf(format) != -1){
						self.sourcePath_str = path;			
						break loop1;
					}
				}
			}
			*/
			
			clearTimeout(self.testShoutCastId_to);
			
			
			if(self.sourcePath_str.indexOf(";") != -1){
				self.isShoutcast_bl = true;
				self.countShoutCastErrors = 0;
			}else{
				self.isShoutcast_bl = false;
			}
			
			if(self.sourcePath_str.indexOf(";") == -1){
				self.isNormalMp3_bl = true;
				self.countNormalMp3Errors = 0;
			}else{
				self.isNormalMp3_bl = false;
			}
			
			
			self.lastPercentPlayed = 0;
			if(self.audio_el) self.stop(true);
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			if(self.isStopped_bl){
				self.isPlaying_bl = false;
				self.hasError_bl = false;
				self.allowScrubing_bl = false;
				self.isStopped_bl = false;
				//if(self.audio_el == null)	
				self.setupAudio();
				self.audio_el.src = self.sourcePath_str;
				//self.audio_el.load();
				self.play();
				self.setVisible(true);
			}else if(!self.audio_el.ended || overwrite){
				try{
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.audio_el.play();
					
					if(FWDEVPUtils.isIE) self.dispatchEvent(FWDEVPAudioScreen.PLAY);
				}catch(e){};
			}
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};

		this.pause = function(){
			if(self == null) return;
			if(self.audio_el == null) return;
			if(!self.audio_el.ended){
				//try{
					self.audio_el.pause();
					self.isPlaying_bl = false;
					if(FWDEVPUtils.isIE) self.dispatchEvent(FWDEVPAudioScreen.PAUSE);
				//}catch(e){};
				
			}
		};
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			self.stopSpectrum();
			self.dispatchEvent(FWDEVPAudioScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDEVPAudioScreen.START);
				self.isStartEventDispatched_bl = true;
			}
		
			self.startSpectrum();
			self.dispatchEvent(FWDEVPAudioScreen.PLAY);
		};
		
		this.endedHandler = function(){
			self.dispatchEvent(FWDEVPAudioScreen.PLAY_COMPLETE);
		};
		
		this.stop = function(overwrite){
			
			if((self == null || self.audio_el == null || self.isStopped_bl) && !overwrite) return;
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			self.setVisible(false);
			clearTimeout(self.testShoutCastId_to);
			self.stopSpectrum();
			self.audio_el.pause();
			self.destroyAudio();
			self.dispatchEvent(FWDEVPAudioScreen.STOP);
			self.dispatchEvent(FWDEVPAudioScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDEVPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			if(!self.isSafeToBeControlled_bl){
				self.hasHours_bl = Math.floor(self.audio_el.duration / (60 * 60)) > 0;
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				self.dispatchEvent(FWDEVPAudioScreen.SAFE_TO_SCRUBB);
				self.dispatchEvent(FWDEVPAudioScreen.SAFE_TO_UPDATE_VOLUME);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(self.audio_el.buffered.length > 0){
				buffered = self.audio_el.buffered.end(self.audio_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.audio_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.audio_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDEVPAudioScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		this.updateAudio = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.audio_el.currentTime /self.audio_el.duration;
				self.dispatchEvent(FWDEVPAudioScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.audio_el.duration);
			var curTime = self.formatTime(self.audio_el.currentTime);
			
			
			if(!isNaN(self.audio_el.duration)){
				self.dispatchEvent(FWDEVPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:Math.round(self.audio_el.currentTime)});
			}else{
				self.dispatchEvent(FWDEVPAudioScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:Math.round(self.audio_el.currentTime)});
			}
			self.lastPercentPlayed = percentPlayed;
			self.curDuration = curTime;
		};
		
		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			self.allowScrubing_bl = false;
		};
		
		this.scrubbAtTime = function(duration){
			self.audio_el.currentTime = duration;
			var totalTime = FWDEVPVideoScreen.formatTime(self.audio_el.duration);
			var curTime = FWDEVPVideoScreen.formatTime(self.audio_el.currentTime);
			self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
		};
		
		this.scrub = function(percent, e){
			if(self.audio_el == null || !self.audio_el.duration) return;
			if(e) self.startToScrub();
			try{
				self.audio_el.currentTime = self.audio_el.duration * percent;
				var totalTime = self.formatTime(self.audio_el.duration);
				var curTime = self.formatTime(self.audio_el.currentTime);
				self.dispatchEvent(FWDEVPAudioScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		this.replay = function(){
			self.scrub(0);
			self.play();
		};
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.audio_el) self.audio_el.volume = self.volume;
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
		
		this.setPlaybackRate = function(rate){
			if(!self.audio_el) return;
			if(rate == 0.25) rate = "0.5";
			
			self.audio_el.defaultPlaybackRate = rate;
			self.audio_el.playbackRate = rate;
		}
		
		//####################################################//
		/* Spectrum visualizer */
		//###################################################//
		this.setupSpectrum = function(){
			var audioContextTest = window.AudioContext || window.webkitAudioContext;
			if(this.canvas_do || !audioContextTest) return;
			if(FWDEVPAudioScreen.countAudioContext > 4) return;
			FWDEVPAudioScreen.countAudioContext ++;
			this.canvas_do = new FWDEVPDisplayObject("canvas");
			
			this.addChild(this.canvas_do);
			
			this.canvas = this.canvas_do.screen;
			this.ctx = this.canvas.getContext("2d");
			
			this.resizeSpectrumCanvas();
			
		
			if(!audioContextTest) return;
			this.context = new audioContextTest();
			this.analyser = this.context.createAnalyser();
			// route audio playback
			this.source = this.context.createMediaElementSource(this.audio_el);
			this.source.connect(this.analyser);
			this.analyser.connect(this.context.destination);
			
			this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
			this.renderSpectrum();
		}
		
		this.resizeSpectrumCanvas =  function(){
			if(!self.canvas_do) return;
			self.canvas_do.setWidth(self.stageWidth);
			self.canvas_do.setHeight(self.stageHeight);
			self.canvas.width  = self.stageWidth;
			self.canvas.height = self.stageHeight;
		}
		
		
		// give vars an initial real value to validate
		self.bars = 200;
		if(FWDEVPUtils.isMobile) self.bars = 100;
		self.react_x = 0;
		self.react_y = 0;
		self.radius = 0;
		self.deltarad = 0;
		self.shockwave = 0;
		self.rot = 0;
		self.intensity = 0;
		self.isSeeking = 0;
		self.center_x;
		self.center_y;
		
		
		this.renderSpectrum = function() {
			if(!self.canvas_do) return;
			self.resizeSpectrumCanvas(); // for some reason i have to resize the self.canvas every update or else the framerate decreases over time
						
			var grd = self.ctx.createLinearGradient(0, 0, 0, self.canvas.height);
			grd.addColorStop(0, "rgba(0, 0, 0, 1)");
			grd.addColorStop(1, "rgba(0, 0, 0, 1)");

			self.ctx.fillStyle = grd;
			self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
			
			self.ctx.fillStyle = "rgba(255, 255, 255, " + (self.intensity * 0.0000125 - 0.4) + ")";
			self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
				
			self.rot = self.rot + self.intensity * 0.0000001;
				
			self.react_x = 0;
			self.react_y = 0;
						
			self.intensity = 0;
						
			self.analyser.getByteFrequencyData(self.fbc_array);
			
			for (var i = 0; i < self.bars; i++) {
				rads = Math.PI * 2 / self.bars;
								
				bar_x = self.center_x;
				bar_y = self.center_y;
			
				var limit =  self.stageHeight/3;
				if(isNaN(limit)) limit = 10;
				bar_height = Math.round(self.fbc_array[i]/256 * limit)
				
				bar_width = Math.round(bar_height * 0.02);
								
				bar_x_term = self.center_x + Math.cos(rads * i + self.rot) * (self.radius + bar_height);
				bar_y_term = self.center_y + Math.sin(rads * i + self.rot) * (self.radius + bar_height);
								
				self.ctx.save();
				
				var lineColor = self.audioVisualizerLinesColor_str;
								
				self.ctx.strokeStyle = lineColor;
				self.ctx.lineWidth = bar_width;
				self.ctx.beginPath();
				self.ctx.moveTo(bar_x, bar_y);
				self.ctx.lineTo(bar_x_term, bar_y_term);
				self.ctx.stroke();
							
				self.react_x += Math.cos(rads * i + self.rot) * (self.radius + bar_height);
				self.react_y += Math.sin(rads * i + self.rot) * (self.radius + bar_height);
							
				self.intensity += bar_height;
			}
						
			self.center_x = self.canvas.width / 2 - (self.react_x * 0.007);
			self.center_y = self.canvas.height / 2 - (self.react_y * 0.007);
						
			radius_old = self.radius;
			self.radius =  25 + (self.intensity * 0.002);
			self.deltarad = self.radius - radius_old;
						
			self.ctx.fillStyle = self.audioVisualizerCircleColor_str;
			self.ctx.beginPath();
			self.ctx.arc(self.center_x, self.center_y, self.radius + 2, 0, Math.PI * 2, false);
			self.ctx.fill();
			
			// self.shockwave effect			
			self.shockwave += 60;
						
			self.ctx.lineWidth = 15;
			self.ctx.strokeStyle = self.audioVisualizerCircleColor_str;
			self.ctx.beginPath();
			self.ctx.arc(self.center_x, self.center_y, self.shockwave + self.radius, 0, Math.PI * 2, false);
			self.ctx.stroke();
						
						
			if (self.deltarad > 15) {
				self.shockwave = 0;
				
				self.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
				self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
				
				self.rot = self.rot + 0.4;
			}
			
			self.startSpectrum();
			
		}
		
		this.startSpectrum = function(){
			if(!self.canvas_do) return;
			self.stopSpectrum();
			self.spectrumAnimationFrameId = window.requestAnimationFrame(self.renderSpectrum);
		}
		
		this.stopSpectrum = function(){
			if(!self.canvas_do) return;
			cancelAnimationFrame(self.spectrumAnimationFrameId);
		}
		

	
		this.init();
	};

	/* set prototype */
	FWDEVPAudioScreen.setPrototype = function(){
		FWDEVPAudioScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPAudioScreen.countAudioContext = 0;
	FWDEVPAudioScreen.ERROR = "error";
	FWDEVPAudioScreen.UPDATE = "update";
	FWDEVPAudioScreen.UPDATE = "update";
	FWDEVPAudioScreen.UPDATE_TIME = "updateTime";
	FWDEVPAudioScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDEVPAudioScreen.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume";
	FWDEVPAudioScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPAudioScreen.START = "start";
	FWDEVPAudioScreen.PLAY = "play";
	FWDEVPAudioScreen.PAUSE = "pause";
	FWDEVPAudioScreen.STOP = "stop";
	FWDEVPAudioScreen.PLAY_COMPLETE = "playComplete";



	window.FWDEVPAudioScreen = FWDEVPAudioScreen;

}(window));