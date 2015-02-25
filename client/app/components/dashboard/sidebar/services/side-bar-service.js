'use strict';

angular.module('dashboard')
  .service('SidebarService', ['$state', function($state) {
      this.getSidebarOptions = function() {
      	switch($state.current.name){
      		case 'home':
      			break;
      		case 'product':
      			break;
      		case 'dashboard':
      			return [{'option':'Change Background', 'icon': 'menu-icon fa fa-users'},
      			{'option':'Preview', 'icon':'menu-icon fa fa-check-square-o'}];
      		case 'doctors':
      			break;
      	}
      };

      this.getSidebarHeader = function(){
      	switch($state.current.name){
      		case 'home':
      			break;
      		case 'product':
      			break;
      		case 'dashboard':
      			return 'Sign In Settings';
      		case 'doctors':
      			break;
      	}
      };

  }]);