'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', function($http) {
      var checkinModal = '';
      this.getTheme = function(id){
      	 console.log(id);
      	 console.log("getThemes");
      	 var path = '/api/'+id+'/theme';
         console.log(path);
      	 return $http.get('/api/' + id + '/theme');
      };  	
  	  this.getForms = function(id) {
  	  	console.log(id);
  	  	console.log("getForms");
  	  	var url = '/api/form/template/company/'+id;
  	  	console.log(url);
        return $http.get(url);
      };

      this.setModal = function(data){
        checkinModal = data;
      };

      this.closeModal = function(){
        checkinModal.dismiss('cancel');
      };
  }]);