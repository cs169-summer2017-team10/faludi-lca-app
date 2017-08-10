angular
    .module('focusLcaApp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', 'assembliesFactory', '$rootScope', 'Auth'];

function ProfileCtrl($scope, assembliesFactory, $rootScope, Auth){
    $scope.hello = "Hello World";
    $scope.editProfile = false;

    Auth.currentUser().then(function(user) {
        assembliesFactory.getByUserId(user.id);
        $scope.user = user;
        $scope.assemblies = assembliesFactory.assemblies;
    }, function(error) {
        console.log('unauthenticated error')
    });

    $scope.selected = [];

    $scope.query = {
        order: 'name'
    };
}