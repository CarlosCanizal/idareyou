(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('dareApi', dareApi);

  dareApi.$inject = ['$resource','$q','$upload','parse', 'headers'];

  /* @ngInject */
  function dareApi($resource, $q, $upload, parse, headers) {

    var  Dare  = parse.newParseResource(headers.keys , 'Dare');
    

    var dare = {
      save : save
    };

    return dare;

    function save(params, file){
      file = file[0];
      headers.keys['Content-Type'] = file.type;
      return $upload.upload({
        url:'https://api.parse.com/1/files/'+file.name,
        method: 'POST',
        headers: headers.keys,
        file: file
      }).then(function(image){
        params['image'] = image.data;
        return Dare.save(params).$promise;
      })
    }
  }
})();
