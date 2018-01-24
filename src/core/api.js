angular.module('app.core.api', []).factory("Api", function ($http, $rootScope, $location, $q, $localstorage) {
  
  function encodeUriQuery(val) {
    return encodeURIComponent(val)
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/g,  "$")
      .replace(/%2C/gi, ",")
      .replace(/%3B/gi, ";")
      .replace(/%20/g,  "+")
      .replace(/%7B/g,  "{")
      .replace(/%7D/g,  "}")
      .replace(/%5B/g,  "[")
      .replace(/%5D/g,  "]")
      .replace(/%22/g,  '"')
      .replace(/%5C/g,  "\\");
  }

  var queryUrl = function (path, requestData) {
      if(!angular.isObject(requestData)) {
        return path;
      }
      var keys = Object.keys(requestData);
      var queryParts = [];

      for(var k = 0; k < keys.length; k++) {
        var key = keys[k];
        var value = requestData[key];
        if(angular.isObject(value)) {
          value = JSON.stringify(value);
        }
        queryParts.push(encodeUriQuery(key) + "=" + encodeUriQuery(value));
      }
      return path + ( queryParts.length ? "?" + queryParts.join( "&" ) : "" );
  };

  var apiRequest = function(method, path, requestData) {
    var options = { method: method, url: path, data: requestData || {} };
    var headers = {};
    if (method == "postFile") {
      headers[ "Content-Type" ] = undefined;  // To ensure multipart boundary is added
      options.method = "post";
      options.transformRequest = angular.identity;
    }
    //var token = Auth.getToken();
    //if (token) {
      //headers["Authentication-Token"] = token;
   // }
    headers["Access-Control-Allow-Origin"] = '*';
    options.headers = headers;

    var callbacks = {};
    var canceler = $q.defer();
    options.timeout = canceler.promise;
    console.log(options);
    $http(options)
      .success(function (data, status, headers, config) {
        if(callbacks.success) { callbacks.success( data, status, headers, config ); }
      })
      .error( function (data, status, headers, config) {
        if (data && data.expired) {
          document.getElementById('no-access').style.display = 'block';
        }
        if (callbacks.error) { callbacks.error(data, status, headers, config); }
      });

    var methods = {
      $cancel: function () {
        canceler.resolve( "Request canceled" );
      },
      success: function (callback) {
        callbacks.success = callback;
        return methods;
      },
      error: function (callback) {
        callbacks.error = callback;
        return methods;
      }
    };

    return methods;
  };

  return {
    $get:      function(path, query, requestData) {       return apiRequest("get", queryUrl(path, query), requestData); },
    $post:     function(path, requestData) { return apiRequest("post", path, requestData); },
    $postFile: function(path, requestData) { return apiRequest("postFile", path, requestData); },
    $put:      function(path, requestData) { return apiRequest("put", path, requestData); },
    $patch:    function(path, requestData) { return apiRequest("patch", path, requestData); },
    $options:  function(path, query) {       return apiRequest("options", queryUrl(path, query) ); },
    $delete:   function(path) {              return apiRequest("delete", path, {}); }
  };
});