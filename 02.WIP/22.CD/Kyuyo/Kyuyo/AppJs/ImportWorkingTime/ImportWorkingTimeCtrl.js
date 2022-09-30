(function (app) {
    'use strict';

    app.controller('ImportWorkingTimeCtrl', ImportWorkingTimeCtrl);

    ImportWorkingTimeCtrl.$inject = ['$scope', '$rootScope', '$filter', '$messages', '$strings', 'apiService', 'dialogService', 'dataService'];
    function ImportWorkingTimeCtrl($scope, $rootScope, $filter, $messages, $strings, apiService, dialogService, dataService) {

        $scope.init = function (model) {
            $scope.validationOptions = model.Validator;
            $scope.listCompany = model.ListCompany;
            $scope.disable = model.IsDisable;

            $scope.model = {
                CompanyId: model.CompanyId,
                YearMonth: dataService.getFormatMonthYear(model.YearMonth),
                Type: 0
            }
        }

        $scope.importFn = function () {
            $scope.form.importWTForm.resetForm();
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                if (confirm) {
                    if (!$scope.form.importWTForm.validate()) {
                        toastr.error($scope.form.importWTForm.errorList())
                        return;
                    }
                    apiService.upload('api/ImportWorkingTime/' + $scope.model.CompanyId + '/' + $scope.model.Type + '/' + dataService.getDate($scope.model.YearMonth), $scope.file, function (response) {
                        apiService.download(response.data.LogFile);
                        toastr.warning(response.data.Message);
                        $scope.file = null;
                    }, function (response) {
                        toastr.error(response.data);
                    })
                }
            })
        }

        $scope.changeFile = function (file) {
            if (file !== null) {
                $scope.file = file;
            }
        }

    }

})(angular.module('KyuyoApp'));