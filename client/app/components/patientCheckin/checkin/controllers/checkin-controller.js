'use strict';

angular.module('checkin')
  .controller('CheckinController', ['$scope','$timeout', '$location', 'CheckinService', function($scope,$timeout,$location, CheckinService){

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
        
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
  }]);
