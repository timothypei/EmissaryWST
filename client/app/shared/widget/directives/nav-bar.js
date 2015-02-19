angular.module('widget')
  .directive('navBar', function favBarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'views/nav-bar.html'
    };
  });