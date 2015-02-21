app.controller('safeCtrl', ['$scope', function ($scope) {

    var Names = ['David Fincher', 'Mardy Bum', 'Alex Turner', 'Haruki Murakami'];
    var Email = ['powell@ucsd.edu', 'peter@ucsd.edu', 'robo@ucsd.edu', '112@ucsd.edu'];
    var Doc_Number = ['234-984-1239', '259-038-9173', '383-484-0274', '383-292-4842'];
    var id = 1;

    function generateRandomItem(id) {

        var docName = Names[Math.floor(Math.random() * 3)];
        var phoneNum = Doc_Number[Math.floor(Math.random() * 3)];
        var docEmail = Email[Math.floor(Math.random() * 3)];

        return {
            id: id,
            Name: docName,
            Phone: phoneNum,
            Email: docEmail
        }
    }

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
}]);