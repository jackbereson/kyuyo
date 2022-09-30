(function (app) {
    'use strict';

    app.controller('DependentCtrl', DependentCtrl);

    DependentCtrl.$inject = ['$scope', '$rootScope', '$filter', '$messages', '$strings', 'apiService'];
    function DependentCtrl($scope, $rootScope, $filter, $messages, $strings, apiService) {

        $scope.init = function (validOpts) {
            $scope.auth = {
                UserCode: 'thanhtv',
                Password: '123'
            },

            $scope.errMessages = [];
            console.log(validOpts)
            $scope.validationOptions = validOpts;
        }

        $scope.login = function () {
            apiService.post('/api/login', $scope.auth, function (response) {
                $rootScope.appState = response.data;
                console.log(response)
                if (response.data.IsAuthenticate === true) {
                    document.location.href = '/Home';
                }
            }, function (response) {
                if (angular.isArray(response.data)) {
                    $scope.errMessages = response.data;
                } else if (angular.isString(response.data)) {
                    $scope.errMessages = [response.data];
                }
            })
        }

    }

})(angular.module('KyuyoApp'));