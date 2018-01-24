angular.module('app.home.controller', [])
    .controller('HomeController', function($state,$scope,$localstorage,Api,Url) {

    $scope.user = $localstorage.get('userId');
    $scope.error = false;
    // get articles
    $scope.getArticle = function(){
        Api.$get(Url.articles.list())
            .success(function(data) {
                $scope.articles = data;
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = 'Error from server';
                $scope.error = true;
            });
    };
    

    $scope.deleteArticle = function(id){
        var params = {'article': id, 'user': $scope.user};
        if (confirm("Are you sure?")){
            Api.$post(Url.articles.delete(),params)
                .success(function(data) {
                     $scope.getArticle();
                }).error(function(data) {
                    // handle error response
                    $scope.errorMessage = data.message;
                    $scope.error = true;
                    $scope.getArticle();
                });
        }
    };

     $scope.getArticle();
});
