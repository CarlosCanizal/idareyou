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
    var  Cloud = parse.newCloudCodeResource(headers.keys);
    
    var dare = {
      save : save,
      get: get,
      send: send,
      getByKey: getByKey,
      response: response,
      sendMessage: sendMessage,
      getMessages: getMessages,
      saveInvitation: saveInvitation,
      getUsers: getUsers,
      upload: upload,
      finishIt: finishIt,
      getAll: getAll
    };

    return dare;

    function save(user, params, file){
      var deferred = $q.defer();
      var dareObj;
      file = file[0];
      this.upload(headers.keys, file).then(function(file){
        params['image'] = file.data;
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

    function upload(headers, file){
      headers['Content-Type'] = file.type;
      console.log(headers);
      return $upload.upload({
        url:'https://api.parse.com/1/files/'+file.name,
        method: 'POST',
        headers: headers,
        file: file
      });
    }

    function get(objectId){
      return Dare.get({objectId:objectId}).$promise;
    }

    function getAll(email){
      
      var where = {email:email};
      return Response.query({where : where, order:'createdAt', include:'dare'}).$promise;
    }

    function send(dare, email){
      return Cloud.send({invite:{dare:dare, email:email},'function':'Dare'}).$promise;
    }

    function saveInvitation(user, dare){
      var params = {dare: {"__type":"Pointer",className:"Dare","objectId":dare.objectId}, email: user.username, accepted:true }
      return Response.save(params).$promise;
    }

    function getByKey(key){
      return Response.get({where:{key:key}, include:'dare'}).$promise;
    }

    function response(invitation, response){
      var ownerId = invitation.dare.owner.objectId;
      return Response.update({objectId:invitation.objectId, accepted: response}).$promise.then(function(){
        return Cloud.send({ownerId:ownerId,challengeResponse:response,'function':'sendResponse'}).$promise;
      }); 
    }

    function sendMessage(user,challenge, message, file){
      var params = {dare:{"__type":"Pointer",className:"Dare","objectId":challenge.objectId},
                    user:{"__type":"Pointer",className:"_User","objectId":user.objectId},
                    message:message};
      if(file){
        return this.upload(headers.keys, file).then(function(file){
          params['file'] = file.data;
          return Message.save(params).$promise;
        });
      }else{
        return Message.save(params).$promise;
      }
    }

    function finishIt(user,challenge, message, file){
      var params = {dare:{"__type":"Pointer",className:"Dare","objectId":challenge.objectId},
                    user:{"__type":"Pointer",className:"_User","objectId":user.objectId},
                    message:message};
      var uploadFile;

      if(file){
        return this.upload(headers.keys, file)
        .then(function(newFile){
          uploadFile = newFile;
          var where = {dare:{"__type":"Pointer",className:"Dare","objectId":challenge.objectId},
                       email:user.username
                      };
          return Response.get({where:where}).$promise;
        }).then(function(result){
          var invitation = result.results[0];
          console.log(invitation);
          return Response.update({objectId: invitation.objectId,completed:true}).$promise;

        }).then(function(){
          params['file'] = uploadFile.data;
          return Message.save(params).$promise;
        });
      }else{
        return Message.save(params).$promise;
      }
    }


    function getMessages(challengeId){
      var where = {"dare":{"__type":"Pointer","className":"Dare","objectId":challengeId}};
      return Message.query({
              where : where,
              order : 'createdAt'
             }).$promise; 
    }

    function getUsers(challengeId){
      var deferred = $q.defer();
      var where = {"dare":{"__type":"Pointer","className":"Dare","objectId":challengeId}};
      Response.query({
                  where : where,
                  order : 'createdAt'
                }).$promise.then(function(result){
                  var users = result.results;
                  var hasAccepted = [];
                  var hasNotAccepted = [];
                  var hasCompleted = [];
                  angular.forEach(users,function(user){
                    if(user.accepted)
                      hasAccepted.push(user);
                    else
                      hasNotAccepted.push(user);

                    if(user.completed)
                      hasCompleted.push(user);

                  });
                  deferred.resolve({all:users,hasAccepted:hasAccepted,hasNotAccepted:hasNotAccepted, hasCompleted:hasCompleted});
                },function(error){
                  deferred.reject(error);
                });
      return deferred.promise;

    }
  }
})();
