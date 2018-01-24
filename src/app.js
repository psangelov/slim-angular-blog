angular.module('app.core', ['app.core.url','app.core.api']);
angular.module('app.home', ['app.home.controller']);
angular.module('app.user', ['app.user.register.controller','app.user.login.controller','app.user.logout.controller']);
angular.module('app.article', ['app.article.add.controller','app.article.view.controller','app.article.edit.controller']);
angular.module('app', ['ngRoute', 'ui.router', 'app.core', 'app.home', 'app.user', 'app.article',
    'app.localstorage'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/home/home.html',
        controller: 'HomeController'
    })
    .state('userRegister', {
        url: '/user/register',
        templateUrl: 'src/user/user-register.html',
        controller: 'UserRegisterController'
    })
    .state('userLogin', {
        url: '/user/login',
        templateUrl: 'src/user/user-login.html',
        controller: 'UserLoginController'
    })
    .state('userLogout', {
        url: '/user/logout',
        controller: 'UserLogoutController'
    })
    .state('articleAdd', {
        url: '/article/add',
        templateUrl: 'src/article/article-add.html',
        controller: 'ArticleAddController'
    })
    .state('articleEdit', {
        url: '/article/edit/:id',
        templateUrl: 'src/article/article-edit.html',
        controller: 'ArticleEditController'
    })
    .state('articleView', {
        url: '/article/view/:id',
        templateUrl: 'src/article/article-view.html',
        controller: 'ArticleViewController'
    });

  $locationProvider.html5Mode(true);
});

