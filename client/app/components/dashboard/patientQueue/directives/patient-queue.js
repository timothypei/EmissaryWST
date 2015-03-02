angular.module('dashboard')
  .directive('patientQueue', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/patientQueue/views/patients.html',
      controller: 'SafeController',
      controllerAs: 'safeCtrl'
    };
  })
  .controller('SafeController', ['$scope', '$modal', function ($scope, $modal) {

    var Names = ['David Fincher', 'Mardy Bum', 'Alex Turner', 'Haruki Murakami'];
    var Email = ['powell@ucsd.edu', 'peter@ucsd.edu', 'robo@ucsd.edu', '112@ucsd.edu'];
    var Phone = ["(626)342-0347", "(234)343-3489", "(232)342-0193", "(342)347-2938"];
    var id = 1;

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }


    //add employee info
    $scope.addEmployee = function(row){
      if(row != null){
        $scope.row.Time = new Date().toLocaleTimeString().replace(/:\d+ /, ' '); 
        $scope.rowCollection.push(row);
        $scope.row = {};
        id++;
      }
    };

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    /*$scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };*/

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };

    $scope.openPatientModal = function(row){
        var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/patientQueue/views/patient-modal.html',
          controller: 'PatientModalController',
          size: 'md',
          backdrop: true,
          resolve: {
            item: function () {
              $scope.selectedPatient = row;
              return $scope.selectedPatient;
            }
          }
        });
    };

    function generateRandomItem(id) {
        var patName = Names[Math.floor(Math.random() * 4)];
        var docName = Names[Math.floor(Math.random() * 4)];

        return {
            id: id,
            Name: patName,
            Doctor: docName,
            Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
        };
    }

}]);
