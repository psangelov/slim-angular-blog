angular.module('app.brands.edit.controller', [])
    .controller('BrandEditController', function($stateParams,$state,$scope,$localstorage,Api,Url) {

    $scope.user = $localstorage.get('userId');
    $scope.error = false;
    $scope.brandsForm = {name: '', logo: '', is_active: is_active};
    
    // get brand
    Api.$get(Url.brands.view($stateParams.id))
        .success(function(data) {
            $scope.brandsForm.name = data.name;
            $scope.brandsForm.logo = data.logo;
            $scope.brandsForm.is_active = data.is_active;
        }).error(function(data) {
            // handle error response
            $scope.errorMessage = data.message;
            $scope.error = true;
        });

    // function to edit brand
    $scope.editBrand = function(){
        Api.$post(Url.brands.edit($stateParams.id),$scope.brandsForm)
            .success(function(data) {
                $state.go('home');
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };
});
