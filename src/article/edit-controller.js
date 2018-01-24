angular.module('app.article.edit.controller', [])
    .controller('ArticleEditController', function($stateParams,$state,$scope,$localstorage,Api,Url) {

    $scope.user = $localstorage.get('userId');
    $scope.error = false;
    $scope.owner = true;
    $scope.articleForm = {title: '', content: '', user: $scope.user};
    
    // get article article
    Api.$get(Url.articles.view($stateParams.id))
        .success(function(data) {
            if ($scope.user != data.user){
                $scope.errorMessage = 'This article is not yours to edit';
                $scope.error = true;
                $scope.owner = false;
            } else {
                $scope.articleForm.title = data.title;
                $scope.articleForm.content = data.content;
            }
        }).error(function(data) {
            // handle error response
            $scope.errorMessage = data.message;
            $scope.error = true;
        });

    // function to register user
    $scope.editArticle = function(){
        Api.$post(Url.articles.edit($stateParams.id),$scope.articleForm)
            .success(function(data) {
                $state.go('home');
            }).error(function(data) {
                // handle error response
                $scope.errorMessage = data.message;
                $scope.error = true;
            });
    };
});
