/* FWDEVPSubtitle */
(function (window){
var FWDEVPSubtitle = function(parent, data){
		
		var self = this;
		var prototype = FWDEVPSubtitle.prototype;
		
		this.main_do = null;
		this.reader = null;
		this.subtitiles_ar = null;
		
		this.hasText_bl = false;
		this.isLoaded_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		this.showSubtitileByDefault_bl = data.showSubtitileByDefault_bl;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			//self.getStyle().pointerEvents = "none";
			self.getStyle().cursor = "default";
			self.setupTextContainer();
			self.setWidth(parent.maxWidth);
			self.getStyle().margin = "auto";			
			self.hide();
		};
		
		//##########################################//
		/* setup text containers */
		//##########################################//
		self.setupTextContainer = function(){
			this.text_do = new FWDEVPTransformDisplayObject("div");
			self.text_do.getStyle().pointerEvents = "none";
			//self.text_do.getStyle().cursor = "default";
			this.text_do.hasTransform3d_bl = false;
			this.text_do.setBackfaceVisibility();
			this.text_do.getStyle().transformOrigin = "50% 0%";
			this.text_do.setWidth(parent.maxWidth);
			this.text_do.getStyle().textAlign = "center";
			
			this.text_do.getStyle().fontSmoothing = "antialiased";
			this.text_do.getStyle().webkitFontSmoothing = "antialiased";
			this.text_do.getStyle().textRendering = "optimizeLegibility";
			this.addChild(this.text_do);
		};
		
		//##########################################//
		/* Load subtitle */
		//##########################################//
		self.loadSubtitle = function(path){
			self.text_do.setX(-5000);
			if(location.protocol.indexOf("file:") != -1) return;
			self.subtitiles_ar = [];
			self.stopToLoadSubtitle();
			self.sourceURL_str = path;
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.onLoad;
			self.xhr.onerror = self.onError;
			
			try{
				self.xhr.open("get", self.sourceURL_str + "?rand=" + parseInt(Math.random() * 99999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.facebookAPIErrorHandler();
			}
		};
		
		this.onLoad = function(e){
			var response;
			
			if(self.xhr.readyState == 4){
				if(self.xhr.status == 404){
					self.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Subtitle file path is not found: <font color='#FF0000'>" + self.sourceURL_str + "</font>"});
				}else if(self.xhr.status == 408){
					self.dispatchEvent(FWDEVPData.LOAD_ERROR, {text:"Loadiong subtitle file file request load timeout!"});
				}else if(self.xhr.status == 200){
					if(window.JSON){
						self.subtitle_txt = self.xhr.responseText;
					}else{
						self.subtitle_txt = self.xhr.responseText;
					}
					if(self.isShowed_bl) self.show();
					
					//self.text_do.setX(-5000);
					self.parseSubtitle(self.subtitle_txt)
					self.prevText = "none";
					if(self.showSubtitileByDefault_bl){
						setTimeout(function(){
							self.show();
							self.text_do.setX(0);
							self.updateSubtitle(parent.currentSecconds);
							//FWDAnimation.to(self, .8, {alpha:1, ease:Expo.easeOut});
						}, 400);
					}
				}
			}
			
			self.dispatchEvent(FWDEVPSubtitle.LOAD_COMPLETE);
		};
		
		this.onError = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			self.dispatchEvent(FWDEVPSubtitle.LOAD_ERROR, {text:"Error loading subtitle file : <font color='#FF0000'>" + self.sourceURL_str + "</font>."});
		};
		
		//####################################################//
		/* Stop to load subtitile */
		//####################################################//
		this.stopToLoadSubtitle = function(){
			if(self.xhr != null){
				try{self.xhr.abort();}catch(e){}
				self.xhr.onreadystatechange = null;
				self.xhr.onerror = null;
				self.xhr = null;
			}
			this.isLoaded_bl = false;
		};
		
		//##########################################//
		/* parse subtitle */
		//##########################################//
		self.parseSubtitle = function(file_str){
			 self.isLoaded_bl = true;
			 function strip(s) {
		        return s.replace(/^\s+|\s+$/g,"");
		     }
			 
			file_str = file_str.replace(/\r\n|\r|\n/g, '\n');
			
			file_str = strip(file_str);

		    var srt_ = file_str.split('\n\n');
		    
		    var cont = 0;

		    for(s in srt_) {
		        var st = srt_[s].split('\n');

		        if(st.length >=2) {
		            n = st[0];

		            i = strip(st[1].split(' --> ')[0]);
		            o = strip(st[1].split(' --> ')[1]);
		            t = st[2];

		            if(st.length > 2) {
		                for(j=3; j<st.length;j++)
		                  t += '<br>'+st[j];
		            }
		            
		            //define variable type as Object
		            self.subtitiles_ar[cont] = {};
		            self.subtitiles_ar[cont].number = n;
		            self.subtitiles_ar[cont].start = i;
		            self.subtitiles_ar[cont].end = o;
		            self.subtitiles_ar[cont].startDuration =  FWDEVPSubtitle.getDuration(i);
		            self.subtitiles_ar[cont].endDuration = FWDEVPSubtitle.getDuration(o);
		            self.subtitiles_ar[cont].text = "<p class='EVPSubtitle'>" + t + "</p>";
		        }
		        
		        cont++;
		    }
		};
		
		
		//#####################################//
		/* Update text */
		//#####################################//
		this.updateSubtitle = function(duration){
			if(!self.isLoaded_bl) return;
		
			var start;
			var end;
			var text = "";
			for(var i=0; i<self.subtitiles_ar.length; i++){
				start = self.subtitiles_ar[i].startDuration;
				end = self.subtitiles_ar[i].endDuration;
			
				if(start <= duration + 1 && end > duration + 1){
					text = self.subtitiles_ar[i].text
					break;
				};
			}
			
			if(self.prevText != text){
				var totalWidth;
				self.text_do.setInnerHTML(text);
				//self.text_do.setX(-5000);
				self.setAlpha(0);
				setTimeout(function(){
					self.setAlpha(1);
					self.position();
				}, 300);
				self.hasText_bl = true;
			}
			self.prevText = text;
		};
		
		this.position = function(animate){
			if(!self.isLoaded_bl) return;
			
			var finalY;
			self.setX(Math.round((parent.tempVidStageWidth - self.w)/2));
			
			var scale = Math.min(2, parent.stageWidth/parent.maxWidth);
		
			self.text_do.setScale2(scale);
			var textHeight = self.text_do.getHeight() * scale;
			
			if(parent.controller_do){
				if(parent.controller_do.isShowed_bl){
					finalY = parseInt(parent.stageHeight - parent.controller_do.h - textHeight);
				}else{
					finalY = parseInt(parent.stageHeight - textHeight - 10);
				}	
			}else{
				finalY = parseInt(parent.stageHeight - textHeight);
			}
			
			//self.text_do.setX(parseInt((parent.stageWidth - self.text_do.getWidth())/2));
			
			FWDAnimation.killTweensOf(self.text_do)
			if(animate){
				FWDAnimation.to(self.text_do, .8, {y:finalY, ease:Expo.easeInOut});
			}else{
				self.text_do.setY(finalY)
			}
		};
		
		this.show = function(){
			self.setVisible(true);
		};
		
		this.hide = function(){
			self.setVisible(false);
		}
		
		self.init();
	};
	
	FWDEVPSubtitle.getDuration = function(str){
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var duration = 0;
		
		str = str.split(":");
		
		hours = str[0];
		if(hours[0] == "0" && hours[1] != "0"){
			hours = parseInt(hours[1]);
		}
		if(hours == "00") hours = 0;
		
		minutes = str[1];
		if(minutes[0] == "0" && minutes[1] != "0"){
			minutes = parseInt(minutes[1]);
		}
		if(minutes == "00") minutes = 0;
		
		secs = parseInt(str[2].replace(/,.*/ig, ""));
		if(secs[0] == "0" && secs[1] != "0"){
			secs = parseInt(secs[1]);
		}
		if(secs == "00") secs = 0;
		
		if(hours != 0){
			duration += (hours * 60 * 60)
		}
		
		if(minutes != 0){
			duration += (minutes * 60)
		}
		
		duration += secs;
		
		return duration;
	 }
	
	/* set prototype */
	FWDEVPSubtitle.setPrototype = function(){
		FWDEVPSubtitle.prototype = null;
		FWDEVPSubtitle.prototype = new FWDEVPTransformDisplayObject("div");
	};
	
	FWDEVPSubtitle.LOAD_ERROR = "error";
	FWDEVPSubtitle.LOAD_COMPLETE = "complete";
	
	
	FWDEVPSubtitle.prototype = null;
	window.FWDEVPSubtitle = FWDEVPSubtitle;
}(window));