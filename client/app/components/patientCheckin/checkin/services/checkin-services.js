'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', '$rootScope', function CheckinService($http, $rootScope) {
                  console.log("========================" + $rootScope);

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
      
      this.formData = {};
      
      this.submitForm = function (form) {
           // console.log("YAYYYY submit ");
        //    console.log($rootScope);
            return $http.post('api/form/patient/', {
                _admin_id: $rootScope.admin_id,
                form : form,
            });
      };

      this.checkinPatient = function (patient_name) {
          //  console.log("YAYYYY checkin ");
            //console.log($rootScope);
            console.log(patient_name);
            return $http.post('api/patient/checkin', {
                _admin_id: $rootScope.admin_id,
                name : patient_name
            });
      };
  }]);