//= require angular
//= require angular-drag-and-drop-lists
//= require angular-materialize
angular.module('assembly', ['assembly.controller'])
    .config([
        '$httpProvider',
        '$locationProvider',
        function ($httpProvider, $locationProvider) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }]);