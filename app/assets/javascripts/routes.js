angular
    .module('focusLcaApp')
    .config(function($stateProvider, $urlRouterProvider){
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
                    assembly: ['$stateParams', 'assemblies', function($stateParams, assemblies) {
                        return assemblies.get($stateParams.id);
                    }]
                }
            })
            .state('assembly-edit', {
                url: '/assembly/{id}',
                templateUrl: 'views/assembly.html',
                controller: 'AssemblyCtrl',
                resolve: {
                    assembly: ['$stateParams', 'assemblies', function($stateParams, assemblies) {
                        return assemblies.get($stateParams.id);
                    }]
                }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            });
        $urlRouterProvider.otherwise('/home')
    });
