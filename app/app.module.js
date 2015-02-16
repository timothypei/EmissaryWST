'use strict';

angular.module('robobetty', ['ui.router', 'ngCookies'])

  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('doctors', {
                url: '/doctors',
                controller: 'doctorsCtrl',
                templateUrl: 'components/dashboard/doctors/doctors.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);



