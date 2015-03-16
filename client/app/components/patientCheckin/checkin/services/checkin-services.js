'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', '$rootScope', function CheckinService($http, $rootScope) {

    var checkinModal = '';

    //function that gets the theme of the user based off the user id passed in
    this.getTheme = function(id){
      	 console.log(id);
      	 console.log("getThemes");
      	 var path = '/api/'+id+'/theme';
         console.log(path);
      	 return $http.get('/api/' + id + '/theme');
      }; 
      
      //returns the template for the form based off the user id passed in
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
                form : form
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
    
      // This function takes in the checkinModal data
      this.setModal = function(data){
        checkinModal = data;
      };

      // Closes the checkinModal - 
      this.closeModal = function(){
        if(checkinModal != ''){
          checkinModal.dismiss('cancel'); 
        }else{
          console.log("Error, modal not set");
        }
      };
  }]);