/* FWDEVPAnnotation */
(function (window){
var FWDEVPAnnotation = function(props_obj){
		
		var self = this;
		var prototype = FWDEVPAnnotation.prototype;
		
		this.id = props_obj.id;
		this.startTime = props_obj.start;
		this.endTime = props_obj.end;
		this.htmlContent_str = props_obj.content;
		this.left = props_obj.left;
		this.top = props_obj.top;
		this.showCloseButton_bl = props_obj.showCloseButton_bl;
		this.clickSource = props_obj.clickSource;
		this.clickSourceTarget = props_obj.clickSourceTarget;
		this.closeButtonNpath = props_obj.closeButtonNpath;
		this.closeButtonSPath = props_obj.closeButtonSPath;
		this.normalStateClass = props_obj.normalStateClass;
		this.selectedStateClass = props_obj.selectedStateClass;
		this.showAnnotationsPositionTool_bl = props_obj.showAnnotationsPositionTool_bl;
		this.parent = props_obj.parent;
		this.curX = this.left;
		this.curY = this.top;
		
		this.handPath_str = props_obj.handPath_str;
		this.grabPath_str = props_obj.grabPath_str;
		
		this.dummy_do = null;
		this.isShowed_bl = false;
		this.isClosed_bl = false;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setAlpha(0);
			self.setVisible(false);
			
			if(FWDEVPUtils.hasTransform2d){
				this.getStyle().transformOrigin = "0% 0%";
			}
			
			this.screen.innerHTML = this.htmlContent_str;
			this.screen.className = this.normalStateClass;
			this.setBackfaceVisibility();
			this.getStyle().fontSmoothing = "antialiased";
			this.getStyle().webkitFontSmoothing = "antialiased";
			this.getStyle().textRendering = "optimizeLegibility";
			
			this.dummy_do = new FWDEVPDisplayObject("div");
			this.dummy_do.getStyle().width = "100%";
			this.dummy_do.getStyle().height = "100%";
			this.addChild(this.dummy_do);
		
			setTimeout(function(){
				self.w = self.getWidth();
				self.h = self.getHeight();
			}, 100);
			
			if(self.showCloseButton_bl && !self.showAnnotationsPositionTool_bl){
				FWDEVPSimpleSizeButton.setPrototype();
				self.closeButton_do = new FWDEVPSimpleSizeButton(
						self.closeButtonNpath, 
						self.closeButtonSPath,
						21,
						21
						);
			    self.closeButton_do.setScale2(0);
				self.closeButton_do.addListener(FWDEVPSimpleSizeButton.CLICK, self.closeClickButtonCloseHandler);
				self.closeButton_do.getStyle().position = "absolute";
				self.addChild(self.closeButton_do);
			}
			
			if(self.showAnnotationsPositionTool_bl){
				self.info_do = new FWDEVPDisplayObject("div");
				self.info_do.getStyle().backgroundColor = "#FFFFFF";
				self.info_do.getStyle().boxShadow = "2px 2px 2px #888888;";
				
				this.info_do.getStyle().fontSmoothing = "antialiased";
				this.info_do.getStyle().webkitFontSmoothing = "antialiased";
				this.info_do.getStyle().textRendering = "optimizeLegibility";
				this.addChild(this.info_do);
				
				setTimeout(function(){
					self.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> data-left=" + Math.round(self.curX * self.parent.scaleInverse)  + "</div><div style='padding:4px; margin:4px; color:#000000;'> data-top=" + Math.round(self.curY * self.parent.scaleInverse)  + "</div>";
					
					self.setX(Math.round(self.curX * self.parent.scale));
					self.setY(Math.round(self.curY * self.parent.scale));
				}, 100)
				if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
						self.screen.addEventListener("pointerdown", self.selfOnDownHandler);
					}else{
						self.screen.addEventListener("touchdown", self.selfOnDownHandler);
					}
				}else{
					if(window.addEventListener){
						self.screen.addEventListener("mousedown", self.selfOnDownHandler);		
					}
				}
				self.getStyle().cursor = 'url(' + self.handPath_str + '), default';
			}
		
			if(self.clickSource && !self.showAnnotationsPositionTool_bl){
				self.dummy_do.setButtonMode(true);
				self.dummy_do.screen.addEventListener("click", this.onClickHandler);
				self.dummy_do.screen.addEventListener("mouseover", this.onMouseOverHandler);
				self.dummy_do.screen.addEventListener("mouseout", this.onMouseOutHandler);
			}
			
			
		};
		
		this.selfOnDownHandler =  function(e){
			if(e.preventDefault) e.preventDefault();
			
			self.getStyle().cursor = 'url(' + self.grabPath_str + '), default';
			self.parent.addChild(self);
			
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			self.startX = viewportMouseCoordinates.screenX - self.parent.getGlobalX();
			self.startY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			self.curX = self.x;
			self.curY = self.y;
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("pointermove", self.selfMoveHandler);
					window.addEventListener("pointerup", self.selfEndHandler);
				}else{
					window.addEventListener("touchmove", self.selfMoveHandler);
					window.addEventListener("touchend", self.selfEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.selfMoveHandler);
					window.addEventListener("mouseup", self.selfEndHandler);		
				}
			}
		};
		
		this.selfMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			self.localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX();
			self.localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			
			self.curX = self.x;
			self.curY = self.y;
			self.curX += (self.localX - self.startX);
			self.curY += (self.localY - self.startY);
			
			self.setX(self.curX);
			self.setY(self.curY);
			self.startX = viewportMouseCoordinates.screenX - self.parent.getGlobalX();
			self.startY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			
			self.info_do.screen.innerHTML = "<div style='padding:4px; maring:4px; color:#000000'> data-left=" + Math.round(self.curX * self.parent.scaleInverse)  + "</div><div style='padding:4px; margin:4px; color:#000000;'> data-top=" + Math.round(self.curY * self.parent.scaleInverse)  + "</div>";
		};
		
		this.selfEndHandler = function(e){
			self.getStyle().cursor = 'url(' + self.handPath_str + '), default';
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("pointermove", self.selfMoveHandler);
					window.removeEventListener("pointerup", self.selfEndHandler);
				}else{
					window.removeEventListener("touchmove", self.selfMoveHandler);
					window.removeEventListener("touchend", self.selfEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.selfMoveHandler);
					window.removeEventListener("mouseup", self.selfEndHandler);		
				}
			}
		};
		
		this.onMouseOverHandler = function(e){
			self.setSelectedAtate();
		};
		
		this.onMouseOutHandler = function(e){
			self.setNormalState();
		};
		
		this.onClickHandler = function(){
			if(self.clickSource.indexOf("http") != -1){
				window.open(self.clickSource, self.target);
			}else{
				eval(self.clickSource);
			}
		};
		
		this.closeClickButtonCloseHandler = function(){
			self.hide();
			self.isClosed_bl = true;
		};
	
		this.show = function(){
			if(this.isShowed_bl || this.isClosed_bl) return;
			self.isShowed_bl = true;
			self.setVisible(true);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .8, {alpha:1, ease:Quint.easeOut});
			if(self.closeButton_do) FWDAnimation.to(self.closeButton_do, .8, {scale:1, delay:.2, ease:Elastic.easeOut});
		};
		
		this.hide = function(){
			if(!this.isShowed_bl) return;
			FWDAnimation.killTweensOf(self);
			self.isShowed_bl = false;
			self.setVisible(false);
			self.setAlpha(0);
			if(self.closeButton_do){
				FWDAnimation.killTweensOf(self.closeButton_do);
				self.closeButton_do.setScale2(0);
			}
		};
		
		this.setNormalState = function(){
			if(!self.selectedStateClass) return;
			FWDAnimation.to(self.screen, .8, {className:self.normalStateClass, ease:Quint.easeOut});
		};
		
		this.setSelectedAtate = function(){
			if(!self.selectedStateClass) return;
			FWDAnimation.to(self.screen, .8, {className:self.selectedStateClass, ease:Quint.easeOut});
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDEVPAnnotation.setPrototype = function(){
		FWDEVPAnnotation.prototype = null;
		if(FWDEVPUtils.hasTransform2d){
			FWDEVPAnnotation.prototype = new FWDEVPTransformDisplayObject("div");
		}else{
			FWDEVPAnnotation.prototype = new FWDEVPDisplayObject("div", "absolute");
		}
	};
	
	
	FWDEVPAnnotation.prototype = null;
	window.FWDEVPAnnotation = FWDEVPAnnotation;
}(window));