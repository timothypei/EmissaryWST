/**
 * Created by Leland on 2/7/2016.
 */
angular.module('signup').controller('signupController', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService) {

    $scope.user = {email: '', password: '', company_name: '', company_phone_number: '', credit_card: ''};
    // NOTE: Not sure why I need this misc object but doing plain $scope.property is not allowing complete data binding
    //       Perhaps a namespace issue?
    $scope.misc = {number: '', pass: '', err: false, check: false, errorMessage: ''};

    $scope.imgs = ['images/themes/pink_trees.jpg',
        'images/themes/city0.jpg',
        'images/themes/city1.jpg'];

    $scope.selectedImg = { value: '' };
    //TODO: Pass the selected image to the rootScope


    //NOTE: These properties are not being updated in the view in real-time
    /*
    $scope.number = '';
    $scope.pass = '';
    $scope.err = false;
    $scope.check = false;
    $scope.errorMessage = '';
    */

    $scope.reg = function() {
        $scope.user.company_phone_number = '';

        // make sure $scope.number is not null before calling toString()
        if ($scope.misc.number != null){
            console.log(typeof $scope.user.company_phone_number);
            $scope.user.company_phone_number = $scope.misc.number.toString();
        }
        // TODO: What happens if $scope.misc.number is null?

        // make sure there is a string in all of these properties
        if ($scope.user.email == '' || $scope.user.password == '' || $scope.user.company_name == '' ||
            $scope.user.company_phone_number == ''){
            $scope.misc.errorMessage = 'Please provide company name, phone number, email, and password';
            return;
        }

        // passwords do not match
        else if ($scope.misc.pass != $scope.user.password) {
            $scope.misc.errorMessage = 'Please make sure the passwords match';
            return;
        }

        // password is less than length 4
        else if ($scope.misc.pass.length < 4){
            $scope.misc.errorMessage = 'Password must be at least 4 characters long';
            return;
        }

        // phone number is less than length 10 or 11
        else if ($scope.user.company_phone_number.length != 10 && $scope.user.company_phone_number != 11){
            $scope.misc.errorMessage = 'Phone number should be 10-11 numbers long';
            return;
        }

        // user did not agree to terms
        else if (!$scope.misc.check){
            $scope.misc.errorMessage = 'You must agree to terms and conditions';
            return;
        }

        // all signup forms are valid
        else {
            // pass in data that users input into forms
            AuthService.reg($scope.user)
                .success(function (data) {
                    $rootScope.token = data.token;
                    $rootScope.number = data.company_phone_number;
                    $rootScope.company_name = data.company_name;
                    $rootScope.admin_id = data.admin_id;
                    $rootScope.email = $scope.user.email;
                    $location.path('/thankyou');
                    return data;
                })
                .error(function (err) {
                    $scope.misc.errorMessage = 'You already created an account';
                    return err;
                });


        }



    };

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function () {
        console.log($scope.formData);
        alert('check console for formData');
    };
}]);