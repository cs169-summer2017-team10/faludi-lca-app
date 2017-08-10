angular
    .module('focusLcaApp')
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$scope', '$rootScope', 'Auth', '$state'];

function AuthCtrl($scope, $rootScope, Auth, $state){
    var config = {headers: {'X-HTTP-Method-Override': 'POST'}};

    $scope.register = function(){
        Auth.register($scope.user, config).then(login_register(user, "Thanks for signing up, "),
        error(response));
    };

    $scope.login = function(){
        Auth.login($scope.user, config).then(login_register(user, "You're signed in, "),
        error(response));
    }
}

function login_register(user, message) {
    $rootScope.user = user;
    alert(message + user.username);
    $state.go('home');
}

function error(response) {
    alert(response.data.error)
}