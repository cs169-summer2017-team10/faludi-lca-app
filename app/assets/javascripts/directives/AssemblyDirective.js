angular
  .module('focusLcaApp')
  .directive('assemblyCanvas', function NavBar(){
    return {
      templateUrl: 'views/assembly.html',
      controller: 'AssemblyCtrl'
    }
})
