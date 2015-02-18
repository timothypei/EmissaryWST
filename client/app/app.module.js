'use strict';

angular.module('robobetty', ['ui.router',
  'widget',
  'products'])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('products', {
        url: '/product',
        templateUrl: 'views/product.html'
      });

  });

