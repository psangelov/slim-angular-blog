angular.module('app.user.register.controller', []).controller('UserRegisterController', function($scope,$localstorage,Api,Url) {

    $scope.error = false;
    $scope.success = false;
    $scope.userForm = {email: '', password: '', repeat: ''};
    $scope.user = $localstorage.get('userId');

    // function to register user
    $scope.registerUser = function(){
        Api.$post(Url.user.register(),$scope.userForm)
            .success(function(data) {
                $scope.success = true;
                $scope.error = false;
                $scope.successMessage = data.message;
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };
});
