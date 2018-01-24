angular.module('app.article.add.controller', [])
    .controller('ArticleAddController', function($state,$scope,$localstorage,Api,Url) {

    $scope.user = $localstorage.get('userId');
    $scope.error = false;
    $scope.articleForm = {title: '', content: '', user: $scope.user};
    
    // function to register user
    $scope.createArticle = function(){
        Api.$post(Url.articles.create(),$scope.articleForm)
            .success(function(data) {
                $state.go('home');
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };
});
