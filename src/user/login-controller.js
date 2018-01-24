angular.module('app.user.login.controller', [])
    .controller('UserLoginController', function($scope,$localstorage,Api,Url,$state) {

    $scope.error = false;
    $scope.userForm = {email: '', password: ''};
    $scope.user = $localstorage.get('userId');
    
    // function to register user
    $scope.loginUser = function(){
        Api.$post(Url.user.login(),$scope.userForm)
            .success(function(data) {
                $localstorage.set('userId',parseInt(data.id));
                $state.go('home');
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };

});
