//= require_tree .
//= require npm-dependencies

angular.module('assembly', ['assembly.controller'])
    .config([
        '$httpProvider',
        '$locationProvider',
        function ($httpProvider, $locationProvider) {

            $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }]);