/* Data */
(function(window){
	
	var FWDEVPFacebookShare = function(appId){
		
		var self = this;
		var prototype = FWDEVPFacebookShare.prototype;
		
		this.appId = parseInt(appId);
	
		var hasStartedToConnect_bl = false;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.checkFBRoot();
			if(!window.fbAsyncInit) self.connect();
		};
		
		//#############################################//
		/* Checking fb_root div */
		//#############################################//
		this.checkFBRoot = function(){
			var fbRoot_el = Boolean(document.getElementById("fb-root"));
			if(!fbRoot_el){
				fbRoot_el = document.createElement("div");
				fbRoot_el.id = "fb-root";
				document.getElementsByTagName("body")[0].appendChild(fbRoot_el);
			}
		};
		
		//#############################################//
		/* Setup facebook */
		//#############################################//
		this.connect = function(){
			if(self.hasStartedToConnect_bl) return;
			self.hasStartedToConnect_bl = true;
		
			
			window.fbAsyncInit = function() {
				FB.init({
					appId: self.appId,
					status: true,
					cookie: true,
					xfbml: true,
					oauth: true
			});
				
			// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
			// for any authentication related change, such as login, logout or session refresh. This means that
			// whenever someone who was previously logged out tries to log in again, the correct case below 
			// will be handled. 
			FB.Event.subscribe('auth.authResponseChange', function(response) {
				// Here we specify what we do with the response anytime this event occurs. 
				if (response.status === 'connected') {
					// The response object is returned with a status field that lets the app know the current
					// login status of the person. In this case, we're handling the situation where they 
					// have logged in to the app.
				}else{
					// In this case, the person is not logged into Facebook, so we call the login() 
					// function to prompt them to do so. Note that at this stage there is no indication
					// of whether they are logged into the app. If they aren't then they'll see the Login
					// dialog right after they log in to Facebook. 
					// The same caveats as above apply to the FB.login() call here.
				    FB.login();
				}
			});
		};
		  		
		(function(d) {
			var js, id = 'facebook-jssdk';
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement('script');
			js.id = id;
			js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			d.getElementsByTagName('body')[0].appendChild(js);
			}(document));
		};
		
		this.share = function(link, caption, picture){
			FB.ui({
				  method: 'feed',
				  link: link,
				  caption: caption,
				  picture:picture
			}, function(response){});
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDEVPFacebookShare.setPrototype = function(){
		FWDEVPFacebookShare.prototype = new FWDEVPEventDispatcher();
	};
	
	FWDEVPFacebookShare.prototype = null;
	
	window.FWDEVPFacebookShare = FWDEVPFacebookShare;
}(window));