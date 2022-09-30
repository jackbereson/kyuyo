(function (app) {
    'use strict';

    app.controller('CommonCtrl', CommonCtrl);
    app.controller('dialog.alertCtrl', AlertCtrl);
    app.controller('dialog.confirmCtrl', ConfirmCtrl);
    app.controller('dialog.searchEmployeeCtrl', SearchEmployeeCtrl);


    CommonCtrl.$inject = ['$scope', '$rootScope', '$filter', '$messages', '$strings', 'apiService'];
    function CommonCtrl($scope, $rootScope, $filter, $messages, $strings, apiService) {

        $scope.logout = function () {
            apiService.get('/api/Authority/logout', null, function () {
                $rootScope.appState = null;
                document.location.href = '/';
            })
        }

    };


    AlertCtrl.$inject = ['$scope', '$uibModalInstance', 'data'];
    function AlertCtrl($scope, $uibModalInstance, data) {
        $scope.data = data || {};

        $scope.data.title = $scope.data.title || "Alert !";
        $scope.data.messages = $scope.data.messages || [];
        if ($scope.data.messages.length == 0)
            $scope.data.messages.push($scope.data.message || "Oops!");

        $scope.okFn = function () {
            $uibModalInstance.close();
        };
    }


    ConfirmCtrl.$inject = ['$scope', '$uibModalInstance', '$messages', 'data'];
    function ConfirmCtrl($scope, $uibModalInstance, $messages, data) {
        $scope.data = data || {};

        $scope.data.title = $scope.data.title || $messages.ConfirmTitle;

        $scope.okFn = function () {
            $uibModalInstance.close(true);
        };

        $scope.noFn = function () {
            $uibModalInstance.close(false);
        };

        $scope.cancelFn = function () {
            $uibModalInstance.dismiss();
        };
    }

    SearchEmployeeCtrl.$inject = ['$scope', '$uibModalInstance', '$filter', '$messages', 'apiService', 'data'];
    function SearchEmployeeCtrl($scope, $uibModalInstance, $filter, $messages, apiService, data) {

        var listDept = [];

        $scope.search = {
            CompanyId: data.companyId,
            DeptCd: null,
            EmployeeNo: null,
            EmployeeName: null
        };

        $scope.isMessage = false;

        $scope.disableCompanyCd = data.multiCompany == false;

        // get init data
        apiService.get('api/taglib/init', null, function (response) {
            $scope.listCompany = response.data.ListCompany;
            listDept = response.data.ListDept;
            $scope.validationOptions = response.data.Validator;
            // init deptCd
            $scope.onChangeCompany($scope.search.CompanyId);
            getEmployeeWithOutDepartment();
        });

        $scope.onChangeCompany = function (companyId) {
            var companyCd = null;
            var company = $filter('filter')($scope.listCompany, { Id: companyId });
            if (company.length > 0) {
                companyCd = company[0].CompanyCd;
            }

            $scope.listDept = $filter('filter')(listDept, { CompanyCd: companyCd });

            console.log($scope.search)
        }

        $scope.searchFn = function () {
            $scope.isMessage = false;
            if (!isNullorEmpty($scope.search.DeptCd)) {
                apiService.get('api/taglib', { params: $scope.search }, function (response) {
                    $scope.listSearchEmployeeResult = response.data;
                }, function (response) {
                    $scope.isMessage = true;
                    $scope.errorMessage = response.data;
                    $scope.listSearchEmployeeResult = [];
                })
            } else {
                getEmployeeWithOutDepartment();
            }
        }

        $scope.cancelFn = function () {
            $uibModalInstance.dismiss();
        };

        // get record of listSearchEmployeeResult
        $scope.getRecordSearchEmployeeResult = function (record) {
            $uibModalInstance.close(record);
        }

        function getEmployeeWithOutDepartment() {
            $scope.isMessage = false;
            apiService.get('api/taglib/getEmployeeWithOutDepartment', { params: $scope.search }, function (response) {
                $scope.listSearchEmployeeResult = angular.fromJson(response.data);
            }, function (response) {
                $scope.isMessage = true;
                $scope.errorMessage = response.data;
                $scope.listSearchEmployeeResult = [];
            })
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