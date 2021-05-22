/* FWDEVPAnnotations */
(function (window){
var FWDEVPAnnotations = function(parent, data){
		
		var self = this;
		var prototype = FWDEVPAnnotations.prototype;
		
		this.source_ar = data.annotations_ar;
		this.ann_ar = [];
		this.totalAnnotations = self.source_ar.length;
		this.showAnnotationsPositionTool_bl = data.showAnnotationsPositionTool_bl;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setupAnnotations();
		};
		
		//##########################################//
		/* setup text containers */
		//##########################################//
		self.setupAnnotations = function(){
			
			for(var i=0; i<self.totalAnnotations; i++){
				
				FWDEVPAnnotation.setPrototype();
				var ann = new FWDEVPAnnotation({
					id:i,
					start:this.source_ar[i].start,
					end:this.source_ar[i].end,
					left:this.source_ar[i].left,
					top:this.source_ar[i].top,
					clickSource:this.source_ar[i].clickSource,
					clickSourceTarget:this.source_ar[i].clickSourceTarget,
					content:this.source_ar[i].content,
					showCloseButton_bl:this.source_ar[i].showCloseButton_bl,
					closeButtonNpath:data.annotationAddCloseNPath_str,
					closeButtonSPath:data.annotationAddCloseSPath_str,
					normalStateClass:this.source_ar[i].normalStateClass,
					selectedStateClass:this.source_ar[i].selectedStateClass,
					showAnnotationsPositionTool_bl:self.showAnnotationsPositionTool_bl,
					parent:self,
					handPath_str:data.handPath_str,
					grabPath_str:data.grabPath_str
				}) 
				
				this.ann_ar[i] = ann;
				
				this.addChild(ann);
			}	
		};
		
		this.update = function(duration){
			
			if(self.totalAnnotations == 0 || duration == 0) return;
			var annotation;
			
			for(var i=0; i<self.totalAnnotations; i++){
				annotation = self.ann_ar[i];
				if(duration <0){
					annotation.hide();
				}else if(duration >= annotation.startTime && duration <= annotation.endTime){
					annotation.show();
					self.position();
				}else{
					annotation.hide();
				}
			}	
		
		};
		
		
		this.position = function(animate){
			
			var selfScale = parent.stageWidth/parent.maxWidth;
			self.setX(Math.round((parent.stageWidth - (selfScale * parent.maxWidth))/2));
			self.setY(Math.round((parent.tempVidStageHeight - (selfScale * parent.maxHeight))/2));
			
			self.scale = parent.stageWidth/parent.maxWidth;
			self.scaleY = self.scale;
			self.scaleX = self.scale;
			
			self.scaleInverse = parent.maxWidth/parent.stageWidth;
			
			if(self.showAnnotationsPositionTool_bl) return;
			for(var i=0; i<self.totalAnnotations; i++){
				var ann_do = this.ann_ar[i];
				//if(ann_do.isShowed_bl){
					var finalX = 0;
					var finalY = 0;
					
					ann_do.setScale2(self.scale);
				
					ann_do.finalX = Math.floor(ann_do.left * self.scaleX);
					ann_do.finalY = Math.floor(ann_do.top * self.scaleY);
					
					if(ann_do.closeButton_do){
						ann_do.closeButton_do.setWidth(ann_do.closeButton_do.buttonWidth * self.scaleInverse);
						ann_do.closeButton_do.setHeight(ann_do.closeButton_do.buttonHeight * self.scaleInverse);
						ann_do.closeButton_do.n_do.setWidth(ann_do.closeButton_do.buttonWidth * self.scaleInverse);
						ann_do.closeButton_do.n_do.setHeight(ann_do.closeButton_do.buttonHeight * self.scaleInverse);
						ann_do.closeButton_do.s_do.setWidth(ann_do.closeButton_do.buttonWidth * self.scaleInverse);
						ann_do.closeButton_do.s_do.setHeight(ann_do.closeButton_do.buttonHeight * self.scaleInverse);
						ann_do.closeButton_do.setX(Math.floor(ann_do.getWidth() - ((ann_do.closeButton_do.w/2))));
						ann_do.closeButton_do.setY(Math.floor(-(ann_do.closeButton_do.h/2)));
					}
					
					if(ann_do.prevFinalX != ann_do.finalX){
						if(animate){
							FWDAnimation.to(ann_do, .8, {x:ann_do.finalX, ease:Expo.easeInOut});
						}else{
							ann_do.setX(ann_do.finalX);
						}
						
					}
				
					if(ann_do.prevFinalY != ann_do.finalY){
						if(animate){
							FWDAnimation.to(ann_do, .8, {y:ann_do.finalY, ease:Expo.easeInOut});
						}else{
							ann_do.setY(ann_do.finalY);
						}
					}
					
					ann_do.prevFinalX = ann_do.finalX;
					ann_do.prevFinalY = ann_do.finalY
				//}
			}

			
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDEVPAnnotations.setPrototype = function(){
		FWDEVPAnnotations.prototype = null;
		FWDEVPAnnotations.prototype = new FWDEVPDisplayObject("div", "absolute");
	};
	
	
	FWDEVPAnnotations.prototype = null;
	window.FWDEVPAnnotations = FWDEVPAnnotations;
}(window));