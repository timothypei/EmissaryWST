'use strict';

angular.module('robobetty', ['ui.router', 'ui.bootstrap',
  'widget',
  'product',
  'DashboardFormBuilderModule'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/components/home/views/home.html'
      })
      .state('createForm', {
        url: '/createform',
        controller: 'FormCreateController',
        templateUrl: 'views/components/dashboard/formBuilder/views/create.html'
      })
      .state('product', {
        url: '/product',
        templateUrl: 'views/components/product/views/product.html'
      });
  }
);

