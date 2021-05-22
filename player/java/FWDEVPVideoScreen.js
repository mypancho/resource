/* thumbs manager */
(function(window){
	
	var FWDEVPVideoScreen = function(parent, backgroundColor_str, volume){
		
		var self = this;
		var prototype = FWDEVPVideoScreen.prototype;
	
		this.video_el = null;
	
		this.sourcePath_str = null;
		
		this.backgroundColor_str = backgroundColor_str;
		
		this.controllerHeight = parent.data.controllerHeight;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.lastPercentPlayed = 0;
		this.volume = volume;
		this.curDuration = 0;
		this.countNormalMp3Errors = 0;
		this.countShoutCastErrors = 0;
		this.maxShoutCastCountErrors = 5;
		this.maxNormalCountErrors = 1;
		
		this.disableClickForAWhileId_to;
		
		this.greenScreenTolerance = parent.data.greenScreenTolerance;
		
		this.disableClick_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = true;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.hasPlayedOnce_bl = false;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.hastStaredToPlayHLS_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setupVideo();
			self.setBkColor(self.backgroundColor_str);
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupVideo = function(){
			if(self.video_el == null){
				self.video_el = document.createElement("video");
				self.screen.appendChild(self.video_el);
				self.video_el.controls = false;
				self.video_el.volume = self.volume;
				self.video_el.WebKitPlaysInline = true;
				self.video_el.playsinline = true;
				self.video_el.setAttribute("playsinline", "");
				self.video_el.setAttribute("webkit-playsinline", "");
				self.video_el.style.position = "relative";
				self.video_el.style.left = "0px";
				self.video_el.style.top = "0px";
				self.video_el.style.width = "100%";
				self.video_el.style.height = "100%";
				self.video_el.style.margin = "0px";
				self.video_el.style.padding = "0px";
				self.video_el.style.maxWidth = "none";
				self.video_el.style.maxHeight = "none";
				self.video_el.style.border = "none";
				self.video_el.style.lineHeight = "0";
				self.video_el.style.msTouchAction = "none";
				if(parent.isAdd_bl){
					self.setPlaybackRate(1);
				}else{
					self.setPlaybackRate(parent.data.defaultPlaybackRate_ar[parent.data.startAtPlaybackIndex]);
				}
				
				
				self.screen.appendChild(self.video_el);
			}
			
			self.video_el.addEventListener("error", self.errorHandler);
			self.video_el.addEventListener("canplay", self.safeToBeControlled);
			self.video_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.video_el.addEventListener("progress", self.updateProgress);
			self.video_el.addEventListener("timeupdate", self.updateVideo);
			self.video_el.addEventListener("pause", self.pauseHandler);
			self.video_el.addEventListener("play", self.playHandler);
			if(!FWDEVPUtils.isIE){
				self.video_el.addEventListener("waiting", self.startToBuffer);
			}
			self.video_el.addEventListener("playing", self.stopToBuffer);
			self.video_el.addEventListener("ended", self.endedHandler);
			
		};	
		
		
		this.destroyVideo = function(){
			if(self.video_el){
				self.video_el.removeEventListener("error", self.errorHandler);
				self.video_el.removeEventListener("canplay", self.safeToBeControlled);
				self.video_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.video_el.removeEventListener("progress", self.updateProgress);
				self.video_el.removeEventListener("timeupdate", self.updateVideo);
				self.video_el.removeEventListener("pause", self.pauseHandler);
				self.video_el.removeEventListener("play", self.playHandler);
				if(!FWDEVPUtils.isIE){
					self.video_el.removeEventListener("waiting", self.startToBuffer);
				}
				self.video_el.removeEventListener("playing", self.stopToBuffer);
				self.video_el.removeEventListener("ended", self.endedHandler);
				if(self.isMobile_bl){	
					self.screen.removeChild(self.video_el);
					self.video_el = null;
				}else{
					self.video_el.style.visibility = "hidden";
					self.video_el.src = "";
					self.video_el.load();
				}
			}
		};
		
		this.startToBuffer = function(overwrite){
			self.dispatchEvent(FWDEVPVideoScreen.START_TO_BUFFER);
		};
		
		this.stopToBuffer = function(){
			self.dispatchEvent(FWDEVPVideoScreen.STOP_TO_BUFFER);
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			if(parent.videoType_str != FWDEVPlayer.VIDEO) return
			var error_str;
			self.hasError_bl = true;
			
			if(self.video_el.networkState == 0){
				error_str = "error 'self.video_el.networkState = 0'";
			}else if(self.video_el.networkState == 1){
				error_str = "error 'self.video_el.networkState = 1'";
			}else if(self.video_el.networkState == 2){
				error_str = "'self.video_el.networkState = 2'";
			}else if(self.video_el.networkState == 3){
				error_str = "source not found <font color='#FF0000'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.video_el.networkState);
			self.dispatchEvent(FWDEVPVideoScreen.ERROR, {text:error_str });
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
			if(parent.is360 && self.renderer){
				self.camera.aspect = self.stageWidth / self.stageHeight;
				self.camera.updateProjectionMatrix();
				self.renderer.setSize(self.stageWidth, self.stageHeight);
			}
			self.resizeGR();
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			if(parent.is360 || parent.isGR && self.video_el){
				self.video_el.style.visibility = "hidden";
			}
			self.sourcePath_str = sourcePath;
			
			if(self.video_el) self.stop();
			if(self.video_el && FWDEVPUtils.isIphone) self.video_el.src = sourcePath;
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite, reHLS){
			FWDEVPlayer.curInstance = parent;
			if(self.isStopped_bl && parent.videoType_str != FWDEVPlayer.HLS_JS || reHLS){
				self.initVideo();
				self.play();
				self.isPlaying_bl = true;
				self.hastStaredToPlayHLS_bl = true;
				self.startToBuffer(true);
			}else if(!self.video_el.ended || overwrite){
				try{
					self.hasError_bl = false;
					self.isStopped_bl = false;
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.hastStaredToPlayHLS_bl = true;
					self.video_el.play();
					self.safeToBeControlled();
					if(FWDEVPUtils.isIE) self.dispatchEvent(FWDEVPVideoScreen.PLAY);
				}catch(e){};
			}
			
			if(parent.is360){
				self.add360Vid();
			}else if(parent.isGR){
				self.addGreenScreen();
			}
		};
		
		this.initVideo = function(){
			
			self.isPlaying_bl = false;
			self.hasError_bl = false;
			self.allowScrubing_bl = false;
			self.isStopped_bl = false;
			self.setupVideo();
			self.setVolume();
			self.video_el.src = self.sourcePath_str;
		}

		this.pause = function(){
			if(self == null || self.isStopped_bl || self.hasError_bl) return;
			if(!self.video_el.ended){
				try{
					self.video_el.pause();
					self.isPlaying_bl = false;
					if(FWDEVPUtils.isIE) self.dispatchEvent(FWDEVPVideoScreen.PAUSE);
				}catch(e){};
			}
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
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			//self.stop360Render();
			self.stopGRRender();
			self.dispatchEvent(FWDEVPVideoScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDEVPVideoScreen.START);
				self.isStartEventDispatched_bl = true;
			}
			if(parent.is360){
				self.start360Render();
			}else if(parent.isGR){
				self.startGRRender();
			}
			self.dispatchEvent(FWDEVPVideoScreen.PLAY);
		};
		
		this.endedHandler = function(){
			self.dispatchEvent(FWDEVPVideoScreen.PLAY_COMPLETE);
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		this.stop = function(overwrite){
			if((self == null || self.video_el == null || self.isStopped_bl) && !overwrite) return;
			
			//logger.log("# VID stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hastStaredToPlayHLS_bl = false;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			self.stop360Render();
			self.stopGRRender();
			
			if(self.contextGR2){
				self.contextGR2.save();
				self.contextGR2.globalCompositeOperation = 'copy';
				self.contextGR2.fillStyle = 'rgba(0,0,0,0)';
				//draw shape to cover up stuff underneath
				self.contextGR2.fill();
				self.contextGR2.restore();
			}
			if(self.contains(self.canvasGR2)) self.removeChild(self.canvasGR2);
			self.destroyVideo();
			self.dispatchEvent(FWDEVPVideoScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			self.dispatchEvent(FWDEVPVideoScreen.STOP);
			self.stopToBuffer();
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			if(parent.videoType_str == FWDEVPlayer.HLS_JS && !self.hastStaredToPlayHLS_bl) return;
			if(!self.isSafeToBeControlled_bl){
				parent.resizeHandler();
				self.stopToScrub();
				self.hasHours_bl = Math.floor(self.video_el.duration / (60 * 60)) > 0;
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				if(!parent.is360 && !parent.isGR) self.video_el.style.visibility = "visible";
				self.dispatchEvent(FWDEVPVideoScreen.SAFE_TO_SCRUBB);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			if(parent.videoType_str == FWDEVPlayer.HLS_JS && !self.hastStaredToPlayHLS_bl) return;
			var buffered;
			var percentLoaded = 0;
			
			if(self.video_el.buffered.length > 0){
				buffered = self.video_el.buffered.end(self.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.video_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDEVPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		this.updateVideo = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.video_el.currentTime /self.video_el.duration;
				self.dispatchEvent(FWDEVPVideoScreen.UPDATE, {percent:percentPlayed});
			}
		
			var totalTime = FWDEVPVideoScreen.formatTime(self.video_el.duration);
			var curTime = FWDEVPVideoScreen.formatTime(self.video_el.currentTime);
			
			
			if(!isNaN(self.video_el.duration)){
				self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:parseInt(self.video_el.currentTime)});
			}else{
				self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
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
			self.video_el.currentTime = duration;
			var totalTime = FWDEVPVideoScreen.formatTime(self.video_el.duration);
			var curTime = FWDEVPVideoScreen.formatTime(self.video_el.currentTime);
			self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
		}
		
		this.scrub = function(percent, e){
			//if(!self.allowScrubing_bl) return;
			if(e) self.startToScrub();
			try{
				self.video_el.currentTime = self.video_el.duration * percent;
				var totalTime = FWDEVPVideoScreen.formatTime(self.video_el.duration);
				var curTime = FWDEVPVideoScreen.formatTime(self.video_el.currentTime);
				self.dispatchEvent(FWDEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		this.replay = function(){
			self.scrub(0);
			self.play();
		};
		
		
		this.setPlaybackRate = function(rate){
			if(!self.video_el) return;
			self.video_el.defaultPlaybackRate = rate;
			self.video_el.playbackRate = rate;
		}
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.video_el) self.video_el.volume = self.volume;
		};
		
		
		
		//###############################################//
		/* Setup green screen */
		//###############################################//
		this.addGreenScreen = function(){
			if(!self.canvasGR2){
				self.canvasGR1 = new FWDEVPDisplayObject('canvas');
				self.contextGR1 = self.canvasGR1.screen.getContext('2d');
				self.canvasGR2 = new FWDEVPDisplayObject('canvas');
				self.contextGR2 = self.canvasGR2.screen.getContext('2d');
			}
			//self.addChild(self.canvasGR2);
			self.video_el.style.visibility = "hidden";
			self.renderFR();
		}
		
		this.startGRRender = function(){
			self.isGRRendering_bl = true;
			if(FWDEVPUtils.isLocal) return;
			if(!self.contains(self.canvasGR2)) self.addChild(self.canvasGR2);
			cancelAnimationFrame(self.requestId);
			self.requestId = requestAnimationFrame(self.renderFR);
		}
		
		this.stopGRRender = function(){
			self.isGRRendering_bl = false;
			cancelAnimationFrame(self.requestId);
			
		}
		
		this.renderFR = function(){
			if(FWDEVPUtils.isLocal) return;
			if(self.isGRRendering_bl) cancelAnimationFrame(self.requestId);
			
			if(self.contextGR1){
				if(self.video_el.videoWidth != 0 && self.prevCurCavasGRWidth != self.video_el.videoWidth){
					self.canvasGR1.screen.width = self.video_el.videoWidth;
					self.canvasGR1.screen.height = self.video_el.videoHeight;
					self.canvasGR2.screen.width = self.video_el.videoWidth;
					self.canvasGR2.screen.height = self.video_el.videoHeight;
				}
				self.prevCurCavasGRWidth = self.video_el.videoWidth;
				
				self.contextGR1.drawImage(self.video_el, 0, 0, self.canvasGR1.screen.width, self.canvasGR1.screen.height);
				var imageData = self.contextGR1.getImageData(0, 0,  self.canvasGR1.screen.width, self.canvasGR1.screen.height);
				var data = imageData.data;
				
				// iterate over all pixels
				for(var i = 0, n = data.length; i < n; i += 4) {
				var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
					if(diff < self.greenScreenTolerance) {
						data[i + 3] = 0;
					}
				}
				self.contextGR2.putImageData(imageData, 0, 0);
			}
			
			self.resizeGR();
			
			self.requestId = requestAnimationFrame(self.renderFR);
		}
		
		this.resizeGR =  function(){
			if(parent.isGR && self.canvasGR2){
				self.canvasGR2.setWidth(self.stageWidth);
				//self.canvasGR2.setHeight(self.stageHeight);
				self.canvasGR2.setX(Math.round((parent.stageWidth - self.stageWidth)/2));
				self.canvasGR2.setY(Math.round((parent.stageHeight - self.canvasGR2.getHeight())/2));
			}
		}
			
		
		//###############################################//
		/* Setup 360 vid */
		//###############################################//
		this.add360Vid = function(){
			if(self.renderer){
				self.screen.appendChild(self.renderer.domElement);
				return;
			}
			
			self.renderer = new THREE.WebGLRenderer({ antialias: true });
			self.renderer.setSize(self.stageWidth, self.stageHeight);
			self.renderer.domElement.style.position = "absolute";
			self.renderer.domElement.style.left = "0px";
			self.renderer.domElement.style.top = "0px";
			self.renderer.domElement.style.margin = "0px";
			self.renderer.domElement.style.padding = "0px";
			self.renderer.domElement.style.maxWidth = "none";
			self.renderer.domElement.style.maxHeight = "none";
			self.renderer.domElement.style.border = "none";
			self.renderer.domElement.style.lineHeight = "1";
			self.renderer.domElement.style.backgroundColor = "transparent";
			self.renderer.domElement.style.backfaceVisibility = "hidden";
			self.renderer.domElement.style.webkitBackfaceVisibility = "hidden";
			self.renderer.domElement.style.MozBackfaceVisibility = "hidden";	
			self.renderer.domElement.style.MozImageRendering = "optimizeSpeed";	
			self.renderer.domElement.style.WebkitImageRendering = "optimizeSpeed";
			self.screen.appendChild(self.renderer.domElement);
			
			self.scene = new THREE.Scene();
			
			self.video_el.setAttribute('crossorigin', 'anonymous');
			
			self.canvas = document.createElement('canvas');
			self.context = self.canvas.getContext('2d');
			//document.documentElement.appendChild(self.canvas);
			
			if(FWDEVPUtils.isFirefox){
				self.videoTexture = new THREE.Texture(self.video_el);
			}else{
				self.videoTexture = new THREE.Texture(self.canvas);
			}
			
			self.videoTexture.minFilter = THREE.LinearFilter;
			self.videoTexture.magFilter = THREE.LinearFilter;
			self.videoTexture.format = THREE.RGBFormat;

			self.cubeGeometry = new THREE.SphereGeometry(500, 60, 40);
			self.sphereMat = new THREE.MeshBasicMaterial({map: self.videoTexture});
			self.sphereMat.side = THREE.BackSide;
			self.cube = new THREE.Mesh(self.cubeGeometry, self.sphereMat);
			self.scene.add(self.cube);

			self.camera = new THREE.PerspectiveCamera(45, self.stageWidth / self.stageHeight, 0.1, 10000);
			self.camera.position.y = 0;
			self.camera.position.z = 500;
			self.camera.position.x = 0;

			self.scene.add(self.camera);
			
			self.controls = new THREE.OrbitControls(self.camera, parent.dumyClick_do.screen);
			self.controls.enableDamping = true;
			self.controls.enableZoom = false; 
			self.controls.dampingFactor = 0.25;
			self.controls.maxDistance = 500;
			self.controls.minDistance = 500;
			self.controls.rotateLeft(90 * Math.PI/180);
			
			self.controls.enabled=true;
			self.render();
		}
		
		this.start360Render = function(){
			self.is360Rendering_bl = true;
			cancelAnimationFrame(self.requestId);
			self.requestId = requestAnimationFrame(self.render);
		}
		
		this.stop360Render = function(){
			self.is360Rendering_bl = false;
			if(!self.camera) return;
			self.camera.position.y = 0;
			self.camera.position.z = 500;
			self.camera.position.x = 0;
			cancelAnimationFrame(self.requestId);
			try{
				self.screen.removeChild(self.renderer.domElement);
			}catch(e){};
		}
		
		this.render = function(){
			if(!self.camera) return;
			if(self.is360Rendering_bl) cancelAnimationFrame(self.requestId);
			if( self.video_el.readyState === self.video_el.HAVE_ENOUGH_DATA ){
				self.videoTexture.needsUpdate = true;
			}
			
			if(!FWDEVPUtils.isFirefox && self.context){
				if(self.video_el.videoWidth != 0){
					self.canvas.width = self.video_el.videoWidth;
					self.canvas.height = self.video_el.videoHeight;
				}
				self.context.save();
				self.context.scale(-1,1);
				self.context.drawImage(self.video_el,0,0,self.canvas.width * -1,self.canvas.height);
				self.context.restore();
			}
		
			self.controls.update();
			self.renderer.render(self.scene, self.camera);
			self.requestId = requestAnimationFrame(self.render);
		}
		
		
		FWDEVPVideoScreen.formatTime = function(secs){
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
	FWDEVPVideoScreen.setPrototype = function(){
		FWDEVPVideoScreen.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPVideoScreen.ERROR = "error";
	FWDEVPVideoScreen.UPDATE = "update";
	FWDEVPVideoScreen.UPDATE_TIME = "updateTime";
	FWDEVPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDEVPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDEVPVideoScreen.START = "start";
	FWDEVPVideoScreen.PLAY = "play";
	FWDEVPVideoScreen.PAUSE = "pause";
	FWDEVPVideoScreen.STOP = "stop";
	FWDEVPVideoScreen.PLAY_COMPLETE = "playCompvare";
	FWDEVPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDEVPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDEVPVideoScreen = FWDEVPVideoScreen;

}(window));