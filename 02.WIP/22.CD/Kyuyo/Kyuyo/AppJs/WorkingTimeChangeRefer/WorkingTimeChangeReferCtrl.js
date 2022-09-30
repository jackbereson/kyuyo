(function (app) {
    'use strict';

    app.controller('WorkingTimeChangeReferCtrl', WorkingTimeChangeReferCtrl);
    WorkingTimeChangeReferCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];

    function WorkingTimeChangeReferCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var cached = null;

        // flag
        var FLAG_NO = "0";
        var FLAG_YES = "1";

        // Init for form
        $scope.init = function (model) {
            $scope.listCompanies = [];
            $scope.listMonths = [];
          

            $scope.search = {
                CompanyId: model.CompanyId,
                YearMonth: null,
                PayDesc: null,
                Month: null
            };

            $scope.input = {
                CompanyName: null,
                YearMonth: null,
                Id: null,
                EmployeeNo: null,
                PayType: null,
                PayDesc: null,
                Value: null,
                Unit: null,
                DistributionFlag: "0",
                DistributionMonths: null,
                UpdatedDt: null
            };

            $scope.control = {
                comInput: true,
                rdIdPassport: true,
                linkDependent: true,
                btnInsert: true,
                btnUpdate: true,
                btnDelete: true,
                btnCancel: true,
            }

            $scope.useIndex = -1;
          
            setDataInit(model);
        }

      

        // Compare file
        $scope.compareFn = function () {
            // Show message confirm 
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                if (validateInsertUpdate() == false) {
                    return;
                }
                if (confirm) {
                    if (isNullorEmpty($scope.compareFile)) {
                        toastr.error($messages.CompareFile);
                        return;
                    }

                    // Call Import API
                    var companyCd = null;
                    var company = $filter('filter')($scope.listCompanies, { Id: $scope.search.CompanyId });
                    if (company.length > 0) {
                        companyCd = company[0].CompanyCd;
                    }
                    $scope.paramInput = {
                        YearMonth: $scope.search.YearMonth.substr(3, 4) + $scope.search.YearMonth.substr(0, 2),
                        CompareFile: $scope.compareFile.name,
                        CompanyCode: companyCd
                    };
                    var url = '/api/WorkingTimeChangeRefer/compare/' + $scope.paramInput.YearMonth + '/' + $scope.paramInput.CompareFile.replace('.', '_') + 
                    + '/' + $scope.paramInput.CompanyCode;
                    apiService.upload(url, $scope.compareFile, function (response) {
                        toastr.success(response.data.Message);
                        //apiService.download(response.data.LogFile);
                    }, function (response) {
                        // Show error message
                        toastr.error(response.data);
                    });
                }
            });
        }

        // Import file
        $scope.importFn = function () {
          
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                if (confirm) {
                    // valid fields on screen
                    if (validateInsertUpdate() == false) {
                        return;
                    }

                    // Check file
                    if (isNullorEmpty($scope.importFile)) {
                        toastr.error($messages.AlertRequiredImport);
                        return;
                    }

                    var company = $filter('filter')($scope.listCompanies, { Id: $scope.search.CompanyId });
                    if (company.length > 0) {
                       var companyCode = company[0].CompanyCd;
                    }


                    var url = 'api/WorkingTimeChangeRefer/import/' + companyCode
                                        + '/' + $scope.search.CompanyId + '/'
                                        + $scope.search.YearMonth.replace('/', '')
                                        + '/' + $scope.search.Month.replace('/', '');

                    apiService.upload(url, $scope.importFile, function (response) {
                        toastr.success(response.data.Message);
                        apiService.download(response.data.LogFile);
                    }, function (response) {
                        // Show error message
                        toastr.error(response.data);
                    });
                   
                }
            });
        }

        // Change compare file
        $scope.changeCompareFile = function (file) {
            if (file !== null) {
                $scope.compareFile = file;
            }
        }

        // Change import file
        $scope.changeImportFile = function (file) {
            if (file !== null) {
                $scope.importFile = file;
            }
        }

        // Set data init of server to client
        function setDataInit(dataModel) {
            $scope.listCompanies = dataModel.ListCompanies;
            $scope.FirstDaySalary = dataModel.FirstDaySalary;
            

         
            $scope.validationOptions = dataModel.Validator;
            // user role
            $scope.editable = dataModel.Editable;
            if ($scope.editable === true) {
                controlFn(MODE_EDIT);
            } else {
                controlFn(MODE_VIEW);
            }
        }

        // Check null or empty
        function isNullorEmpty(object) {
            if (typeof object === 'undefined' || object === null || object == "") {
                return true;
            }
            return false;
        }

        // Reset data of Form is blank
        function resetForm() {
            $scope.input.Id = null;
            $scope.input.EmployeeNo = null;
        }

        // Check Validate in Client
        function validateInsertUpdate() {
            if ($scope.form.workingTimeChangeReferForm.validate() == false) {
                var errorsStr = "";
                angular.forEach($scope.form.workingTimeChangeReferForm.errorList(), function (value, key) {
                    errorsStr += value + '<br>';
                }, []);
                toastr.error(errorsStr);
                return false;
            }

            return true;
        }


        // control Mode
        function controlFn(mode) {
            switch (mode) {
                case MODE_VIEW:
                    $scope.control.comInput = true;
                    $scope.control.linkDependent = false;
                    $scope.control.btnInsert = true;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = true;
                    break;
                case MODE_EDIT:
                    $scope.control.comInput = false;
                    $scope.control.linkDependent = true;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = false;
                    break;
                case MODE_UPDATE:
                    $scope.control.comInput = false;
                    $scope.control.linkDependent = true;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = false;
                    $scope.control.btnDelete = false;
                    $scope.control.btnCancel = false;
                    break;
            }
        }
    }

})(angular.module('KyuyoApp'));