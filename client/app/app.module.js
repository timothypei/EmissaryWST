'use strict';

angular.module('robobetty', ['ui.router', 'ui.bootstrap',
  'widget',
  'dashboard',
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
      })
      .state('dashboard',{
        url:'/dashboard',
        templateUrl: 'views/components/dashboard/main/views/dashboard.html'
      })
      .state('doctors', {
        url: '/doctors',
        templateUrl: 'views/components/dashboard/doctors/views/doctors.html'
      });
  }
);