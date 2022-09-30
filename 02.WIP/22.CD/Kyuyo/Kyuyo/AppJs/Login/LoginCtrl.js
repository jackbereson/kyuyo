(function (app) {
    'use strict';

    app.controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$messages', '$strings', 'apiService'];
    function LoginCtrl($scope, $rootScope, $state, $filter, $messages, $strings, apiService) {

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
                    document.location.href = '/Menu';
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