(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('parse', parse);

  parse.$inject = ['$resource'];

  /* @ngInject */
  function parse($resource) {

    var factory = {
      newParseResource: newParseResource,
      newRegisterResource: newRegisterResource,
      newCloudCodeResource: newCloudCodeResource,
      newLoginResource: newLoginResource,
      newUserResource: newUserResource,
      newUploadResource : newUploadResource
    };

    return factory;

    function newLoginResource(headers) {
      return $resource(
        'https://api.parse.com/1/login',
        {
        },
        { 
          'login':    {method:'GET', headers: headers}
        }
      );
    }

    function newUploadResource(headers, file) { 
      console.log(file);
      return $resource(
        'https://api.parse.com/1/files/'+file.name,
        {
          file: file,
          contentType: false,
          processData: false
        },
        { 
          'upload':    {method:'POST', headers: headers, 'content-type':file.type}
        }
      );
    }

    function newRegisterResource(headers) {
      return $resource(
        'https://api.parse.com/1/users',
        {
        },
        { 
          'save':    {method:'POST', headers: headers}
        }
      );
    }

    function newUserResource(headers) {
      return $resource(
        'https://api.parse.com/1/users/:objectId',
        {          
          objectId: '@objectId'
        },
        { 
          'currentUser':{method:'GET', headers: headers},
          'get':        {method:'GET', headers: headers},
          'update':     {method:'PUT', headers: headers}
        }
      );
    }

    function newParseResource(headers, parseClass) {
      return $resource(
        'https://api.parse.com/1/classes/:class/:objectId',
        {
          objectId: '@objectId',
          class: parseClass
        },
        { 
          'get':    {method:'GET', headers: headers},
          'save':   {method:'POST', headers: headers},
          'update': {method:'PUT', headers: headers},
          'query':  {method:'GET', headers: headers },
          'remove': {method:'DELETE', headers: headers},
          'delete': {method:'DELETE', headers: headers} 
        }
      );
    }

    function newCloudCodeResource(headers){
      return $resource(
        'https://api.parse.com/1/functions/:function',
        {
          function: '@function'
        },
        {
          'query': {method: 'POST', headers:headers},
          'save' : {method: 'POST', headers:headers},
          'get'  : {method: 'POST', headers:headers},
          'delete'  : {method: 'POST', headers:headers},
        }
      );
    }
  }
})();