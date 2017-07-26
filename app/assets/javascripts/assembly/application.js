//= require_tree .

//= require angular
//= require angular-drag-and-drop-lists

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