angular.module('app.article.view.controller', []).controller('ArticleViewController', 
    function($scope,$stateParams,$localstorage,Api,Url) {

    $scope.error = false;
    $scope.user = $localstorage.get('userId');
    
    // get article article
    Api.$get(Url.articles.view($stateParams.id))
        .success(function(data) {
            $scope.article = data;
        }).error(function(data) {
            // handle error response
            $scope.errorMessage = data.message;
            $scope.error = true;
        });
});
