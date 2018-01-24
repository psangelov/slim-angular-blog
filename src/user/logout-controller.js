angular.module('app.user.logout.controller', [])
    .controller('UserLogoutController', function($scope,$localstorage,Api,Url,$state) {

    $scope.user = $localstorage.clear();
    $state.go('home');

});
