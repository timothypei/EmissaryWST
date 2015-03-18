// var IS_MOBILE = true;

angular.module("robobetty")
    .constant("appConfig", {
        isMobile: IS_MOBILE || false, 
        baseUrl: "http://blue-jay-dev.herokuapp.com/",
        debugMode: false
    });
