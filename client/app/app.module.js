'use strict';

angular.module('robobetty', ['ui.router',
  'widget',
  'product', 'dashboard','ngCookies','ui.bootstrap'])

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
      })
      .state('dashboard',{
        url:'/dashboard',
        templateUrl: 'views/dashboard.html'
      });

  });

