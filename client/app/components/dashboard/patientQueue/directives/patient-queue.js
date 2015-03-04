'use strict';

angular.module('dashboard')
  .directive('patientQueue', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/patientQueue/views/patients.html',
      controller: 'SafeController2',
      controllerAs: 'safeCtrl2'
    };
  })
  .controller('SafeController2', ['$scope', '$modal', function ($scope, $modal) {

    $scope.rowCollection = [
      {
        id: 1,
        Name: "Meg Whitman",
        Doctor: "Soe",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 2,
        Name: "Pooja Sankar",
        Doctor: "Kua",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 3,
        Name: "Marissa Mayer",
        Doctor: "Soe",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 4,
        Name: "Elizabeth Holmes",
        Doctor: "Kua",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 5,
        Name: "Sam Altman",
        Doctor: "Du",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 6,
        Name: "Pooja Sankar",
        Doctor: "Kua",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 7,
        Name: "Meg Whitman",
        Doctor: "Soe",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 8,
        Name: "Marissa Mayer",
        Doctor: "Soe",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 9,
        Name: "Martine Rothhblatt",
        Doctor: "Soe",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 10,
        Name: "Elizabeth Holmes",
        Doctor: "Kua",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 11,
        Name: "Angelique De Castro",
        Doctor: "Du",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      },
      {
        id: 12,
        Name: "Sam Altman",
        Doctor: "Du",
        Time: new Date().toLocaleTimeString().replace(/:\d+ /, ' ')
      }
    ];

    /*
    //add patient info
    $scope.addPatient = function(row){
      if(row != null){
        $scope.row.Time = new Date().toLocaleTimeString().replace(/:\d+ /, ' '); 
        $scope.rowCollection.push(row);
        $scope.row = {};
        id++;
      }
    };
    */

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //edit patient information
    /*
    $scope.openPatientModal = function(row){
        var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/patientQueue/views/patient-modal.html',
          controller: 'PatientModalController',
          size: 'md',
          backdrop: true,
          resolve: {
            item: function () {
              $scope.doctor = 
              $scope.selectedPatient = row;
              return $scope.selectedPatient;
            }
          }
        });
    };*/

    //remove to the real data holder modal
    $scope.removeItem = function(row){
        var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/patientQueue/views/patient-remove.html',
          controller: 'PatientRemoveController',
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
          }
        });
    };

    //delete row
    /*$scope.deleteRow = function(row){
      var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }*/
}]);
