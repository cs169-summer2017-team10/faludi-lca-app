angular
    .module('focusLcaApp')
    .controller('AssemblyCtrl', function($scope, $stateParams, Auth, $rootScope, $mdDialog){
        // Assembly data
        if ($stateParams['id']) {
            $scope.assembly = {
                name: 'Existing assembly'
            };
        } else {
            $scope.assembly = {
                name: 'Untitled assembly'
            };
        }

        // Edit Assembly Name
        $scope.editName = false;

        // Expandable/Collapsable Menu Items
        $scope.data = ["Item 1", "Item 2", "Item 3", "Item 4"];
        $scope.toggle = {materials: true, manufacturing: true, transportation: true, use: true, eol: true};

        // Analyze/Graph Dialog
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: 'GraphCtrl',
                templateUrl: 'views/graph.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                title: $scope.assembly.name,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };

        // Scrollable side nav
        // var assemblyCanvas = $('#assembly-canvas');
        // var height = assemblyCanvas.height();
        // var scrollHeight = assemblyCanvas.get(0).scrollHeight;
        // assemblyCanvas.bind('mousewheel', function(e, d) {
        //   if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
        //     e.preventDefault();
        //   }
        // });
        $scope.configScrollbar = {
            autoHideScrollbar: false,
            theme: 'dark',
            advanced:{
                updateOnContentResize: true
            },
            scrollInertia: 0
        };

        // Resizable sidebar
        var min = 300;
        var max = 800;
        var mainmin = 200;
        $('#split-bar').mousedown(function (e) {
            e.preventDefault();
            $(document).mousemove(function (e) {
                e.preventDefault();
                var x = e.pageX - $('#sidebar').offset().left;
                if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {
                    $('#sidebar').css("width", x);
                    $('#main').css("margin-left", x);
                }
            })
        });
        $(document).mouseup(function (e) {
            $(document).unbind('mousemove');
        });
    });
