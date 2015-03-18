var IS_MOBILE = true;

angular.module("robobetty")
    .constant("appConfig", {
        isMobile: IS_MOBILE, 
        baseUrl: "http://blue-jay-dev.herokuapp.com/",
        debugMode: true
    });
