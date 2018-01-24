angular.module('app.core.url', []).service('Url', function () {
    var urlHelper = {};
    var apiUrl = 'http://blog.loc/api/public/index.php/api';

    urlHelper.articles = {
        list: function () { return apiUrl + '/article/list'; },
        create: function () { return apiUrl + '/article/create'; },
        view: function (id) { return apiUrl + '/article/view/' + id; },
        delete: function () { return apiUrl + '/article/delete'; },
        edit: function (id) { return apiUrl + '/article/edit/' + id; },
    };

    urlHelper.user = {
        register: function () { return apiUrl + '/user/register'; },
        login: function () { return apiUrl + '/user/login'; }
    };

    return urlHelper;
});
