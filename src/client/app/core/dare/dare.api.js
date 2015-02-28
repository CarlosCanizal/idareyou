(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('dareApi', dareApi);

  dareApi.$inject = ['$resource','$q','parse', 'headers'];

  /* @ngInject */
  function dareApi($resource, $q, parse, headers) {

    var  Dare  = parse.newParseResource(headers.parse , 'Dare');

    var dare = {
      getAll : getAll
    };

    return dare;

    function getAll(){
      return Dare.query().$promise;
    }

  }
})();
