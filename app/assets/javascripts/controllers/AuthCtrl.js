angular
    .module('focusLcaApp')
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$scope', '$rootScope', 'Auth', '$state'];

function AuthCtrl($scope, $rootScope, Auth, $state){
    var config = {headers: {'X-HTTP-Method-Override': 'POST'}};

    $scope.register = function(){
        Auth.register($scope.user, config).then(function(user){
            $rootScope.user = user;
            alert("Thanks for signing up, " + user.username);
            $state.go('home');
        },
        error(response));
    };

    $scope.login = function(){
        Auth.login($scope.user, config).then(function(user){
            $rootScope.user = user;
            alert("You're all signed in, " + user.username);
            $state.go('home');
        },
        error(response));
    }
}

function error(response) {
    alert(response.data.error)
}