'use strict';

angular.module('robobetty', ['ui.router',
  'widget',
  'product'])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('product', {
        url: '/product',
        templateUrl: 'views/product.html'
      });

  });

