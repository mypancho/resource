/* hider */
(function (window){
	
    var FWDEVPHider = function(screenToTest, screenToTest2, hideDelay){
    	
    	var self = this;
    	var prototype = FWDEVPHider.prototype;
   
    	this.screenToTest = screenToTest;
    	this.screenToTest2 = screenToTest2;
    	this.hideDelay = hideDelay;
    	this.globalX = 0;
    	this.globalY = 0;
	
		this.currentTime;
    	this.checkIntervalId_int;
    	
    	this.hideCompleteId_to;
    	
    	this.hasInitialTestEvents_bl = false;
    	this.addSecondTestEvents_bl = false;
    	this.dispatchOnceShow_bl = true;
    	this.dispatchOnceHide_bl = false;
    	this.isStopped_bl = true;
    	this.isMobile_bl = FWDEVPUtils.isMobile;
    	this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
    	
		self.init = function(){};
	
		self.start = function(){
			self.currentTime = new Date().getTime();
			clearInterval(self.checkIntervalId_int);
			self.checkIntervalId_int = setInterval(self.update, 100);
			self.addMouseOrTouchCheck();
			self.isStopped_bl = false;
		};
		
		self.stop = function(){
			clearInterval(self.checkIntervalId_int);
			self.isStopped_bl = true;
			self.removeMouseOrTouchCheck();
			self.removeMouseOrTouchCheck2();
		};
		
		self.addMouseOrTouchCheck = function(){	
			if(self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = true;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.addEventListener("pointerdown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.addEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.addEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.addEventListener){
				window.addEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.removeMouseOrTouchCheck = function(){	
			if(!self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = false;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.removeEventListener("pointerdown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.removeEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.removeEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.removeEventListener){
				window.removeEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.addMouseOrTouchCheck2 = function(){	
			if(self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = true;
			if(self.screenToTest.screen.addEventListener){
				self.screenToTest.screen.addEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.attachEvent){
				self.screenToTest.screen.attachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		self.removeMouseOrTouchCheck2 = function(){	
			if(!self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = false;
			if(self.screenToTest.screen.removeEventListener){
				self.screenToTest.screen.removeEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.detachEvent){
				self.screenToTest.screen.detachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		this.secondTestMoveDummy = function(){
			self.removeMouseOrTouchCheck2();
			self.addMouseOrTouchCheck();
		};
		
		self.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDEVPUtils.getViewportMouseCoordinates(e);	
			
			if(self.globalX != viewportMouseCoordinates.screenX
			   && self.globalY != viewportMouseCoordinates.screenY){
				self.currentTime = new Date().getTime();
			}
			
			self.globalX = viewportMouseCoordinates.screenX;
			self.globalY = viewportMouseCoordinates.screenY;
			
			if(!self.isMobile_bl){
				if(!FWDEVPUtils.hitTest(self.screenToTest.screen, self.globalX, self.globalY)){
					self.removeMouseOrTouchCheck();
					self.addMouseOrTouchCheck2();
				}
			}
		};
	
		self.update = function(e){
			if(new Date().getTime() > self.currentTime + self.hideDelay){
				if(self.dispatchOnceShow_bl){	
					self.dispatchOnceHide_bl = true;
					self.dispatchOnceShow_bl = false;	
					self.dispatchEvent(FWDEVPHider.HIDE);
					clearTimeout(self.hideCompleteId_to);
					self.hideCompleteId_to = setTimeout(function(){
						self.dispatchEvent(FWDEVPHider.HIDE_COMPLETE);
					}, 1000);
				}
			}else{
				if(self.dispatchOnceHide_bl){
					clearTimeout(self.hideCompleteId_to);
					self.dispatchOnceHide_bl = false;
					self.dispatchOnceShow_bl = true;
					self.dispatchEvent(FWDEVPHider.SHOW);
				}
			}
		};

		self.reset = function(){
			clearTimeout(self.hideCompleteId_to);
			self.currentTime = new Date().getTime();
			self.dispatchEvent(FWDEVPHider.SHOW);
		};
		
		/* destroy */
		self.destroy = function(){
		
			self.removeMouseOrTouchCheck();
			clearInterval(self.checkIntervalId_int);
			
			self.screenToTest = null;
			
			screenToTest = null;
			
			self.init = null;
			self.start = null;
			self.stop = null;
			self.addMouseOrTouchCheck = null;
			self.removeMouseOrTouchCheck = null;
			self.onMouseOrTouchUpdate = null;
			self.update = null;
			self.reset = null;
			self.destroy = null;
			
			prototype.destroy();
			prototype = null;
			self = null;
			FWDEVPHider.prototype = null;
		};
		
		self.init();
     };
     
	 FWDEVPHider.HIDE = "hide";
	 FWDEVPHider.SHOW = "show";
	 FWDEVPHider.HIDE_COMPLETE = "hideComplete";
	 
	 FWDEVPHider.setPrototype = function(){
		 FWDEVPHider.prototype = new FWDEVPEventDispatcher();
	 };
	 

	 window.FWDEVPHider = FWDEVPHider;
}(window));