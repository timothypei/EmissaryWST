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
// include root scope
    $scope.rowCollection = [];
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
    
    // cancel editing
    $scope.cancel = function(index) {
        if ($scope.editing !== false) {
            $scope.rowCollection[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }       
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        $window.alert("Remove patient from queue? <button>Yes</button><button>Cancel</button>");
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };
}]);
