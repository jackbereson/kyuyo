(function (app) {
    'use strict';

    app.controller('PolicyCtrl', PolicyCtrl);
    PolicyCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];
    function PolicyCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {
        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;

        $scope.search = {
            PolicyName: "",
            EffectiveDtFrom: null,
            EffectiveDtTo: null
        };

        // init for form
        $scope.init = function (model) {
            $scope.listGroupNames = [];
            $scope.listCurrencies = [];
            $scope.listReferences = [];
            setDataInit(model);
        }

        // search: get list Policy
        $scope.searchFn = function () {

            $scope.search.PolicyName = $scope.form.search.policyName;
            $scope.search.EffectiveDtFrom = $scope.form.search.effectiveDtFrom;
            $scope.search.EffectiveDtTo = $scope.form.search.effectiveDtTo;

            $scope.search.EffectiveDtFrom = $scope.search.EffectiveDtFrom.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
            $scope.search.EffectiveDtTo = $scope.search.EffectiveDtTo.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
            if (!isNullorEmpty($scope.search.EffectiveDtFrom)
                && !isNullorEmpty($scope.search.EffectiveDtTo)) {
                if (parseInt($scope.search.EffectiveDtFrom) > parseInt($scope.search.EffectiveDtTo)) {
                    $scope.errorMessage = [];
                    $scope.errorMessage.push("Ngày sau phải lớn hơn hoặc bằng ngày trước.");
                    $scope.isErrorMessage = true;
                    return;
                }
            }

            apiService.get('api/Policy', { params: $scope.search }, function (response) {
                $scope.listPolicies = response.data.ListPolicies;
                convertToDateFromListPolicies();
                $scope.errorMessage = response.data.Messages;
                $scope.isErrorMessage = response.data.ShowMessage;
            });
        }

        // set data init of server to client
        function setDataInit(dataModel) {
            $scope.listPolicies = dataModel.ListPolicies;
            $scope.listGroupNames = angular.fromJson(dataModel.ListGroupNames);
            var dummyGroupName = { GroupName: $strings.PleaseSelect };
            $scope.listGroupNames.unshift(dummyGroupName);
            $scope.listCurrencies = dataModel.ListCurrencies;
            var dummyCurrency = { Id: -1, Cd: "-1", Value: $strings.PleaseSelect };
            $scope.listCurrencies.unshift(dummyCurrency);
            $scope.listReferences = angular.fromJson(dataModel.ListReferences);
            var dummyReference = { PolicyCd: "-1", PolicyName: $strings.PleaseSelect };
            $scope.listReferences.unshift(dummyReference);
            convertToDateFromListPolicies();
        }

        // return a date string is format
        function convertToDateStringFormat(strDate, char) {
            // default: yyyy-mm-dd
            var rs = strDate.substr(0, 4) + char + strDate.substr(4, 2) + char + strDate.substr(6, 2);
            return rs;
        }

        // return a date string is format
        function convertToDateString(strDate) {
            // default: yyyymmdd
            var rs = strDate.substr(0, 4) + strDate.substr(4, 2) + strDate.substr(6, 2);
            return rs;
        }

        // convert from string of server to date angularjs
        function convertToDateFromListPolicies() {
            angular.forEach($scope.listPolicies, function (e) {
                e.EffectiveDt = new Date(convertToDateStringFormat(e.EffectiveDt, '-'));
            });
        }

        // check null or empty
        function isNullorEmpty(object) {
            if (typeof object === 'undefined' || object === null || object == "") {
                return true;
            }
            return false;
        }
    }


})(angular.module('KyuyoApp'));