'use strict';

angular.module('robobetty', ['ui.router', 'ui.bootstrap',
  'widget',
  'product'])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('createForm', {
        url: '/createform',
        controller: 'CreateCtrl',
        templateUrl: 'views/create.html'
      })
      .state('product', {
        url: '/product',
        templateUrl: 'views/product.html'
      });
  });

