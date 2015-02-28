(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('dareApi', dareApi);

  dareApi.$inject = ['$resource','$q','$upload','parse', 'headers'];

  /* @ngInject */
  function dareApi($resource, $q, $upload, parse, headers) {

    var  Dare  = parse.newParseResource(headers.keys , 'Dare');
    var Invite = parse.newCloudCodeResource(headers.keys);
    
    var dare = {
      save : save,
      get: get,
      send: send
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
      });
    }

    function get(objectId){
      return Dare.get({objectId:objectId}).$promise;
    }

    function send(dare, email){
      return Invite.send({invite:{dare:dare, email:email},'function':'Dare'}).$promise;
    }
  }
})();
