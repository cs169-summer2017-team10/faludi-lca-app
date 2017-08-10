angular
    .module('focusLcaApp')
    .config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routesConfig($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl',
            onEnter: function(Auth, $state){
                Auth.currentUser().then(function(){
                    $state.go('home')
                })
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl',
            onEnter: function(Auth, $state){
                Auth.currentUser().then(function(){
                    $state.go('home')
                })
            }
        })
        .state('assembly-new', {
            url: '/assembly',
            templateUrl: 'views/assembly.html',
            controller: 'AssemblyCtrl',
            resolve: {
                assembly: ['$stateParams', 'assembliesFactory', function($stateParams, assembliesFactory) {
                    return null;
                }]
            }
        })
        .state('assembly-edit', {
            url: '/assembly/{id}',
            templateUrl: 'views/assembly.html',
            controller: 'AssemblyCtrl',
            resolve: {
                assembly: ['$stateParams', 'assembliesFactory', function($stateParams, assembliesFactory) {
                    return assembliesFactory.get($stateParams.id);
                }]
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        });
    $urlRouterProvider.otherwise('/home')
}
