'use strict';

angular.module('dashboard')
  .controller('PatientQueueCtrl', ['$scope', '$modal', function ($scope, $modal) {
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

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);
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
}]);
