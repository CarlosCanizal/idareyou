angular
.module('app')
.run(run);

run.$inject = ['$rootScope', '$state', 'userApi'];

function run($rootScope, $state, userApi) {
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    if(toState.data && toState.data.access && !userApi.currentUser()){
      event.preventDefault();
      $state.go('user');
    }

    if(toState.name == "user" && userApi.currentUser()){
      event.preventDefault();
      $state.go('challenges');
    }

  });
}

