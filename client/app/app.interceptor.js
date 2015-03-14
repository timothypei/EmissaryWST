angular.module('robobetty')
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push('middleware');
}])
.factory('middleware', function(appConfig, VIEW_NAMESPACE) {
	return {
		request: function(config) {
			if(appConfig.isMobile) {
				debugger	
		            // Check if config url starts with views namespace
		            if(config.url.indexOf(VIEW_NAMESPACE) != 0) {
		            	config.url = "//example.com/api/" + config.url;
		            	return config;
		            }
		        }
		    }
		}
	});
