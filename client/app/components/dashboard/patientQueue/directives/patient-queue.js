'use strict';

angular.module('dashboard')
  .controller('PatientQueueCtrl', ['$scope', '$modal', '$rootScope', 'socket', 'DoctorService',
   function ($scope, $modal, $rootScope, socket, DoctorService) {
    var d = new Date();

    //How many milliseconds in a minute
    var MINUTE_VAL = 60000;

    //The maximum number of minutes patients should wait before warning notification pops up on queue
    var EXPECTED_WAITING_TIME = 20;

    socket.on('request_id', function(){
      if($rootScope.admin_id){
        socket.emit('_admin_id', {_admin_id:$rootScope.admin_id});
      }else{
        console.log("Socket cannot connect. No AdminId Found.");
      }
    });

    socket.on('queue_updated', function(data) { 
      console.log("queueaaa", data);
      console.log("rowCollection", $scope.rowCollection);
      /*if(data){
        $scope.rowCollection = [];
        for(var i=0; i<data.length; i++){
          $scope.rowCollection.push({
            Name: data[i].name,
            Doctor: DoctorService.getRandomDoctor(),
            Time: data[i].checkin_time
          });
        }
      }*/
      //$scope.rowCollection = data;
      //$scope.displayedCollection = $scope.rowCollection;
    }); 

    socket.on('patient_added', function(data) { 
      console.log("patient addeeed", data);
      console.log("roww collection", $scope.rowCollection);
      var newDoctor = DoctorService.getRandomDoctor();
      $scope.rowCollection.push({
        Name: data.name,
        Doctor: newDoctor,
        Time: data.checkin_time
      });
      $scope.displayedCollection = $scope.rowCollection;
    }); 

    $scope.rowCollection = [
      {
        id: 1,
        Name: "Meg Whitman",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 31)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 31)).valueOf()
      },
      
      {
        id: 2,
        Name: "Pooja Sankar",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 27)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 27)).valueOf()
      },
      
      {
        id: 3,
        Name: "Marissa Mayer",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 22)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 22)).valueOf()
      },
      {
        id: 4,
        Name: "Elizabeth Holmes",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 19)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 19)).valueOf()
      },
      {
        id: 5,
        Name: "Sam Altman",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 15)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 15)).valueOf()
      },
      {
        id: 6,
        Name: "Pooja Sankar",
        Doctor: "Kua",
        Time: new Date(d.valueOf()-(MINUTE_VAL * 10)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 10)).valueOf()
      },
      {
        id: 7,
        Name: "Meg Whitman",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 7)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 7)).valueOf()
      },
      {
        id: 8,
        Name: "Marissa Mayer",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 6)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 6)).valueOf()
      },
      {
        id: 9,
        Name: "Martine Rothhblatt",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 4)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 4)).valueOf()
      },
      {
        id: 10,
        Name: "Elizabeth Holmes",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 4)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 4)).valueOf()
      },
      {
        id: 11,
        Name: "Angelique De Castro",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 2)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 2)).valueOf()
      },
      {
        id: 12,
        Name: "Sam Altman",
        Doctor: DoctorService.getRandomDoctor(),
        Time: new Date(d.valueOf()-(MINUTE_VAL * 1)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(d.valueOf()-(MINUTE_VAL * 1)).valueOf()
      }
      
    ];

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //Checks if patients have exceeded expected maximum waiting time
    $scope.checkIfLongWait = function(checkin){
        var currTime = (new Date()).valueOf();
        return ((currTime - checkin) >= (MINUTE_VAL * EXPECTED_WAITING_TIME));

    }

    //Checks if no results from search
    $scope.checkIfEmptyTable = function(){
        return ($scope.displayedCollection.length == 0);
    }
    
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
          socket.emit('queue_updated', $scope.rowCollection);
        }
      });
    };
}]);
