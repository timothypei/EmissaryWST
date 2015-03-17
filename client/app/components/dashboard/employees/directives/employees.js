'use strict';

angular.module('dashboard')
  .directive('employees', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/employees/views/employees.html',
      controller: 'EmployeeController',
      controllerAs: 'employeeCtrl'
    };
  })
  .controller('EmployeeController', ['$scope', '$window', '$modal', 'filterFilter', '$http', '$rootScope',
    function ($scope, $window, $modal, filterFilter, $http, $rootScope) {
    // include root slecope
	$("#toaster").hide();					// Hide toaster
    $scope.rowCollection = [
        {
            id: 1,
            Name: "Angelique De Castro",
            PhoneNumber: "(626) 484-0871",
            Email: "ajdecast@ucsd.edu"
        },
        {
            id: 2,
            Name: "Brian Soe",
            PhoneNumber: "(343) 982-2390",
            Email: "bsoe@ucsd.edu"
        },
        {
            id: 3,
            Name: "Andrew Du",
            PhoneNumber: "(019) 348-8210",
            Email: "angelique@ucsd.edu"
        },
        {
            id: 4,
            Name: "Timmy Kua",
            PhoneNumber: "(932) 231-1133",
            Email: "tikua@ucsd.edu"
        },
        {
            id: 5,
            Name: "Scott Upton",
            PhoneNumber: "(342) 930-1232",
            Email: "supton@ucsd.edu"
        },
        {
            id: 6,
            Name: "Lynn Vo",
            PhoneNumber: "(234) 458-2343",
            Email: "lvo@ucsd.edu"
        },
        {
            id: 7,
            Name: "Delia Doe",
            PhoneNumber: "(234) 432-2343",
            Email: "ddoe@ucsd.edu"
        },
        {
            id: 8,
            Name: "Daniel Mariano",
            PhoneNumber: "(234) 458-2343",
            Email: "dmariano@ucsd.edu"
        },
				{
            id: 9,
            Name: "Mandy Ngo",
            PhoneNumber: "(123) 456-789",
            Email: "mandyngo@ucsd.edu"
        },
				{
            id: 10,
            Name: "John Smith",
            PhoneNumber: "(626) 484-0871",
            Email: "johnsmith@ucsd.edu"
        },
        {
            id: 11,
            Name: "Kevin Zhang",
            PhoneNumber: "(345) 982-2390",
            Email: "kevingz@ucsd.edu"
        },
        {
            id: 12,
            Name: "Karen Lo",
            PhoneNumber: "(019) 348-8210",
            Email: "karenlo@ucsd.edu"
        },
        {
            id: 13,
            Name: "Wesley Yao",
            PhoneNumber: "(938) 231-1133",
            Email: "Wesyao@ucsd.edu"
        },
        {
            id: 14,
            Name: "Dylan Moz",
            PhoneNumber: "(342) 930-1232",
            Email: "dylanmoz@ucsd.edu"
        },
        {
            id: 15,
            Name: "Eduardo Aguilar",
            PhoneNumber: "(234) 458-2343",
            Email: "edag@ucsd.edu"
        },
        {
            id: 16,
            Name: "Krishna Kolli",
            PhoneNumber: "(257) 432-2343",
            Email: "Krishna@ucsd.edu"
        },
        {
            id: 17,
            Name: "Jason Tan",
            PhoneNumber: "(234) 458-2343",
            Email: "jason@ucsd.edu"
        },
				{
            id: 18,
            Name: "Connor Nicholson",
            PhoneNumber: "(123)456-789",
            Email: "Nick@ucsd.edu"
        },
				{
            id: 19,
            Name: "Phat Huynh",
            PhoneNumber: "(257) 432-2343",
            Email: "phat@ucsd.edu"
        },
        {
            id: 20,
            Name: "Jason Wang",
            PhoneNumber: "(234) 458-2343",
            Email: "jason@ucsd.edu"
        },
				{
            id: 21,
            Name: "John Doe",
            PhoneNumber: "(123) 456-789",
            Email: "John@ucsd.edu"
        },
				{
            id: 22,
            Name: "Patient One",
            PhoneNumber: "(234) 458-2343",
            Email: "patient1@ucsd.edu"
        },
				{
            id: 23,
            Name: "Patient Two",
            PhoneNumber: "(123) 456-789",
            Email: "patient2@ucsd.edu"
        }
				
    ];

    var id = 1;
    $scope.newField = {};
    $scope.editing = false;
    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    
    $scope.checkIfEmptyTable = function(){
        return ($scope.displayedCollection.length === 0);
    };

    //edit a row
    $scope.editRowCollection = function(row) {
        $scope.editing = $scope.rowCollection.indexOf(row);
        $scope.newField = angular.copy(row);
    };
    
    // cancel editing
    $scope.cancel = function(row) {
    	$scope.rowCollection[$scope.editing] = $scope.newField;
    	$scope.displayedCollection = $scope.rowCollection;
    };

    //remove employee confirmation modal
    $scope.removeEmployee = function(row){
        var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/employees/views/employee-remove.html',
          controller: 'EmployeeRemoveController',
          size: 'md',
          backdrop: true,
          resolve: {
            item: function () {
                $scope.selectedPatient = row;
                return $scope.selectedPatient; 
            }
          }
        }).result.then(function(result){
            $scope.row = result;
            var index = $scope.rowCollection.indexOf($scope.row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
                $scope.row = {};
            }
        });
    };

    // multiple remove instance
    $scope.removeMultiple = function(row){
        var modalInstance = $modal.open({
            templateUrl: 'views/components/dashboard/employees/views/employee-remove-multiple.html',
            controller: 'EmployeeRemoveMultipleController',
            size: 'md',
            backdrop: true,
            resolve: {
              item: function () {
                $scope.selectedEmployees = row;
                return $scope.selectedEmployees; 
              }
            }
          }).result.then(function(result){
            $scope.selectedEmployees = result;
            $scope.removeMultipleFinal($scope.selectedEmployees);
          });
    };

    // removeMultiple helper function to return unselected rows
    $scope.removeMultipleFinal = function(row){
        $scope.rowCollection = filterFilter($scope.rowCollection, function(row){
            if(row.selected){
                $http.delete('/api/employee/' + row.id)
                    .success(function(data, status, headers, config) {
                        console.log("Removed id", data);
                    })
                    .error(function(data, status, headers, config) {
                        console.log("Could not remove employee id.", data);
                        console.log("Trying to remove from database by email");
                        $http.get('/api/employee/admin/' + $rootScope.admin_id)
                            .success(function(data, status, headers, config) {
                                for(var j=0; j<data.length; j++){
                                    if(row.Email == data[j].email){
                                        console.log("Found! Removing ", row.Email);
                                        $http.delete('/api/employee/' + data[j]._id)
                                        .success(function(data, status, headers, config) {
                                            console.log("Removed id", data);
                                        })
                                        .error(function(data, status, headers, config) {
                                            console.log("Completely failed to remove employee", data);
                                        });
                                    }
                                }
                            })
                            .error(function(data, status, headers, config) {
                                console.log("Could not retrieve and remove emlpoyees", data);
                            });
                    });
            } 
            return !row.selected;
        });
    };

    //add employee info
    $scope.submitForm = function(row){
      $scope.rowCollection.unshift(row);
      $scope.row = {};
      $scope.addForm.name.$setPristine();
      $scope.addForm.number.$setPristine();
      $scope.addForm.email.$setPristine();
    };

    //open add employee form
    $scope.openModal = function(){
    	var modalInstance = $modal.open({
    		templateUrl: 'views/components/dashboard/employees/views/employees-modal.html',
    		controller: 'EmployeeModalController',
    		size: 'md',
    		backdrop: true,
    		resolve: {}
    	}).
    	result.then(function(result){
            var phone = result.PhoneNumber;
    		$scope.rowCollection.unshift(result = {
                Name:result.Name,
                PhoneNumber:'('+phone.substring(0,3)+') '+phone.substring(3,6)+'-'+phone.substring(6,10),
                Email:result.Email
            });
            
			//on click show it
            $("#toaster").fadeIn();
			//5 second then hide it
			setTimeout(function() {
				$("#toaster").fadeOut();
			}, 2000);

            $http.post('/api/employee', 
                {
                _admin_id: $rootScope.admin_id,
                name: result.Name,
                email: result.Email,
                phone_number: phone
                })
            .success(function(data, status, headers, config) {
              console.log("Employee Added", data);
              $scope.rowCollection[$scope.rowCollection.length -1].id = data._id;

            })
            .error(function(data, status, headers, config) {
              console.log("Employee failed to add", data, status, headers);
            });
    	});
    };
}]);
	
	
