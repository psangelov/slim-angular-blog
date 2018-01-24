angular.module('app.brand.add.controller', [])
    .controller('BrandAddController', function($state,$scope,$localstorage,Api,Url) {

    $scope.user = $localstorage.get('userId');
    $scope.error = false;
    $scope.brandsForm = {name: '', logo: '', is_active: is_active};
    
    // function to register user
    $scope.createBrand = function(){
        Api.$post(Url.brands.create(),$scope.brandsForm)
            .success(function(data) {
                $state.go('home');
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };
});
