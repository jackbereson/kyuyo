(function (app) {
    'use strict';

    app.controller('ReportListCtrl', ReportListCtrl);
    ReportListCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];
    function ReportListCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {
       

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;

        var cached = null;
        // Constructor 
        $scope.init = function (model) {
            $scope.reportLists = model.ReportLists;
        }
      
    }

})(angular.module('KyuyoApp'));