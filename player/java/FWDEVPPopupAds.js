/* FWDEVPPopupAds */
(function (window){
var FWDEVPPopupAds = function(parent, data){
		
		var self = this;
		var prototype = FWDEVPPopupAds.prototype;
		
		this.parent = parent;
		this.main_do = null;
		this.reader = null;
		this.subtitiles_ar = null;
		
		this.totalAds = 0;
		self.popupAds_ar;
		self.popupAdsButtons_ar;
		
		this.hasText_bl = false;
		this.isLoaded_bl = false;
		this.isMobile_bl = FWDEVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDEVPUtils.hasPointerEvent;
		this.showSubtitleByDefault_bl = data.showSubtitleByDefault_bl;
		this.setSizeOnce_bl = false;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			//self.getStyle().pointerEvents = "none";
			self.getStyle().cursor = "default";
			self.setBkColor("#FF0000")
			self.setVisible(false);
		};
	
		//##########################################//
		/* Reset popup buttons ads */
		//##########################################//
		this.resetPopups = function(popupAds_ar){
			self.hideAllPopupButtons(true);
			
			self.popupAds_ar = popupAds_ar;
			self.totalAds = self.popupAds_ar.length;
			
			var popupAdButton;
			self.popupAdsButtons_ar = [];
			
			for(var i=0; i<self.totalAds; i++){
				FWDEVPPopupAddButton.setPrototype();
				popupAdButton = new FWDEVPPopupAddButton(
						self,
						self.popupAds_ar[i].imagePath,
						self.popupAds_ar[i].timeStart,
						self.popupAds_ar[i].timeEnd,
						self.popupAds_ar[i].link,
						self.popupAds_ar[i].trget,
						i,
						data.popupAddCloseNPath_str,
						data.popupAddCloseSPath_str,
						data.showPopupAdsCloseButton_bl
				);
				self.popupAdsButtons_ar[i] = popupAdButton;
				self.addChild(popupAdButton);
			}
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		this.update = function(duration){
			
			if(self.totalAds == 0) return;
			var popupAdButton;
			
			for(var i=0; i<self.totalAds; i++){
				popupAdButton = self.popupAdsButtons_ar[i];
				if(duration >= popupAdButton.start && duration <= popupAdButton.end){
					popupAdButton.show();
				}else{
					popupAdButton.hide();
				}
			}	
		};
		
		this.position = function(animate){
			if(self.totalAds == 0) return;
			var popupAdButton;
			
			for(var i=0; i<self.totalAds; i++){
				popupAdButton = self.popupAdsButtons_ar[i];
				popupAdButton.resizeAndPosition(animate);
			}	
		};
		
		this.hideAllPopupButtons = function(remove){
			if(self.totalAds == 0) return;
			var popupAdButton;
			
			for(var i=0; i<self.totalAds; i++){
				popupAdButton = self.popupAdsButtons_ar[i];
				popupAdButton.hide(remove);
			}	
			if(remove){
				self.popupAdsButtons_ar = null;
				self.totalAds = 0;
			}
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDEVPPopupAds.setPrototype = function(){
		FWDEVPPopupAds.prototype = new FWDEVPDisplayObject("div");
	};
	
	FWDEVPPopupAds.LOAD_ERROR = "error";
	FWDEVPPopupAds.LOAD_COMPLETE = "complete";
	
	
	FWDEVPPopupAds.prototype = null;
	window.FWDEVPPopupAds = FWDEVPPopupAds;
}(window));