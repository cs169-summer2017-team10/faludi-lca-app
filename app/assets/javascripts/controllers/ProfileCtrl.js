angular
  .module('focusLcaApp')
  .controller('ProfileCtrl', function($scope, $rootScope, Auth){
    $scope.hello = "Hello World"
    $scope.editProfile = false;
  })
