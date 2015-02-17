'use strict';

angular.module('robobetty', ['ui.router', 'products'])
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
      })
      .state('about', {
        url: '/about',
        templateUrl: 'NEED TO DO THIS'
      });

  });

