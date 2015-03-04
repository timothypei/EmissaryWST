angular.module('dashboard')
  .directive('doctorsTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/doctors/views/doctors.html',
      controller: 'SafeController',
      controllerAs: 'safeCtrl'
    };
  })
  .controller('SafeController', ['$scope', '$window', function ($scope, $window) {
// include root slecope
    $scope.rowCollection = [
        {
            id: 1,
            Name: "Angelique De Castro",
            PhoneNumber: "(626)484-0871",
            Email: "ajdecast@ucsd.edu"
        },
        {
            id: 2,
            Name: "Brian Soe",
            PhoneNumber: "(343)982-2390",
            Email: "bsoe@ucsd.edu"
        },
        {
            id: 3,
            Name: "Andrew Du",
            PhoneNumber: "(019)348-8210",
            Email: "adu@ucsd.edu"
        },
        {
            id: 4,
            Name: "Tim Kua",
            PhoneNumber: "(932)231-1133",
            Email: "tkua@ucsd.edu"
        },
        {
            id: 5,
            Name: "Scott Upton",
            PhoneNumber: "(342)930-1232",
            Email: "supton@ucsd.edu"
        },
        {
            id: 6,
            Name: "Lynn Vo",
            PhoneNumber: "(234)458-2343",
            Email: "lvo@ucsd.edu"
        },
        {
            id: 7,
            Name: "Delia Doe",
            PhoneNumber: "(234)432-2343",
            Email: "ddoe@ucsd.edu"
        },
        {
            id: 8,
            Name: "Daniel Mariano",
            PhoneNumber: "(234)458-2343",
            Email: "dmariano@ucsd.edu"
        }
    ];
    $scope.newField = {};
    $scope.editing = false;

    //add employee info
    $scope.addEmployee = function(row){
        $scope.rowCollection.push(row);
        $scope.row = {};
        id++;
    };

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //edit a row
    $scope.editRowCollection = function(field) {
        $scope.editing = $scope.rowCollection.indexOf(field);
        $scope.newField = angular.copy(field);
    };
    
    // save edit
    $scope.saveField = function(index) {
        if ($scope.editing !== false) {
            $scope.rowCollection[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }       
    };
    
    // cancel editing FIX THIS
    $scope.cancel = function(index) {
        if ($scope.editing !== false) {
            //$scope.rowCollection[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }
    };

    //remove to the real data holder
    $scope.removeItem = function(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };
}]);
