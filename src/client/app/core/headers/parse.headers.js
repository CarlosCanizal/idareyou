(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('headers', headers);

  headers.$inject = [];

  /* @ngInject */
  function headers() {

    return {
      keys: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'YnRatM5KWSmzt9JABAFOaXbM1VAa66NudB9arFBr',
        'X-Parse-REST-API-Key': 'DphMVuhkcHST7YvmymmvvE2BERVhb0HKh0JiauAc'
      }
    };
  }
})();
