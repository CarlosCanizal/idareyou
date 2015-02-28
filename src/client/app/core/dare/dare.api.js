(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('dareApi', dareApi);

  dareApi.$inject = ['$resource','$q','$upload','parse', 'headers'];

  /* @ngInject */
  function dareApi($resource, $q, $upload, parse, headers) {

    var  Dare  = parse.newParseResource(headers.keys , 'Dare');
    var  Response  = parse.newParseResource(headers.keys , 'Invitation');
    var  Message  = parse.newParseResource(headers.keys , 'Message');
    var  Invite = parse.newCloudCodeResource(headers.keys);
    
    var dare = {
      save : save,
      get: get,
      send: send,
      getByKey: getByKey,
      response: response,
      sendMessage: sendMessage,
      getMessages: getMessages,
      saveInvitation: saveInvitation
    };

    return dare;

    function save(user, params, file){
      var deferred = $q.defer();
      var dareObj;
      file = file[0];
      headers.keys['Content-Type'] = file.type;
      $upload.upload({
        url:'https://api.parse.com/1/files/'+file.name,
        method: 'POST',
        headers: headers.keys,
        file: file
      }).then(function(image){
        params['image'] = image.data;
        params['owner'] = {"__type":"Pointer",className:"_User","objectId":user.objectId};
        return Dare.save(params).$promise;
      }).then(function(result){
        dareObj = result;
        return saveInvitation(user, dareObj);
      }).then(function(){
        deferred.resolve(dareObj);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function get(objectId){
      return Dare.get({objectId:objectId}).$promise;
    }

    function send(dare, email){
      return Invite.send({invite:{dare:dare, email:email},'function':'Dare'}).$promise;
    }

    function saveInvitation(user, dare){
      var params = {dare: {"__type":"Pointer",className:"Dare","objectId":dare.objectId}, email: user.username, accepted:true }
      return Response.save(params).$promise;
    }

    function getByKey(key){
      return Response.get({where:{key:key}, include:'dare'}).$promise;
    }

    function response(invitation, response){
      alert(invitation.objectId);
     return Response.update({objectId:invitation.objectId, accepted: response}).$promise; 
    }

    function sendMessage(user,challenge, message){
      var params = {dare:{"__type":"Pointer",className:"Dare","objectId":challenge.objectId},
                    user:{"__type":"Pointer",className:"_User","objectId":user.objectId},
                    message:message};
      return Message.save(params).$promise;
    }

    function getMessages(challengeId){
      var where = {"dare":{"__type":"Pointer","className":"Dare","objectId":challengeId}};
      return Message.query({
              where : where,
              order : 'createdAt'
             }).$promise; 
    }
  }
})();
