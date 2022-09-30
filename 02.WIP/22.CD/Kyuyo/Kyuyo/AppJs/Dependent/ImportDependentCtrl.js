(function (app) {
    'use strict';
    app.controller('ImportDependentCtrl', ImportDependentCtrl);

    ImportDependentCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function ImportDependentCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dataService, dialogService) {

        var listDept = [];
        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            TIME_OUT = 1500;
        var cached = null;

        $scope.init = function (model) {
            $scope.listCompany = model.ListCompany;
            listDept = model.ListDept;
            // user role
            $scope.editable = model.Editable;

            $scope.search = {
                CompanyCd: model.CompanyCd,
                DeptCd: null,
                EmployeeNo: null,
                EmployeeName: null
            };

            $scope.model = {
                CompanyCd: model.CompanyCd
            };

            initModel();

            $scope.control = {
                file: true,
                linkDependent: true,
                btnImport: true,
                btnSelectFile: true,
                btnExportTemplate: true,
            }

            $scope.onChangeCompany(model.CompanyCd);
            $scope.useIndex = -1;
            $scope.searchFn();
        }

        $scope.changeFile = function (file) {
            if (file !== null) {
                $scope.file = file;
            }
        }

        // import excel file 
        $scope.importFn = function () {
            // Show message confirm 
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                if (confirm) {
                    // Check file
                    if ($scope.file == undefined) {
                        toastr.error($messages.AlertRequiredImport);
                    } else {
                        // Call Import API
                        var url = '/api/Dependent/import/' + $scope.search.CompanyCd;
                        apiService.upload(url, $scope.file, function (response) {
                            toastr.success(response.data.Message);
                            apiService.download(response.data.LogFile);
                            $scope.searchFn();
                            
                        }, function (response) {
                            // Show error message
                            toastr.error(response.data);
                        });
                    }
                }
            });
        }


        // Onchange company
        $scope.onChangeCompany = function (companyCd) {
            $scope.listDept = $filter('filter')(listDept, { CompanyCd: companyCd });
        }

        $scope.deleteFn = function (elm) {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    var param = {
                        id: elm.Id,
                        updatedDt: elm.UpdatedDt,
                    }
                    apiService.del('/api/Dependent', { params: param}, function (response) {
                        toastr.success(response.data);
                        $scope.searchFn();
                        cached = null;

                    }, function (response) {
                        toastr.error(response.data);
                    })
                }
            });
        }

        $scope.searchFn = function () {

            $scope.model.CompanyCd = $scope.search.CompanyCd;
            var company = $filter('filter')($scope.listCompany, { CompanyCd: $scope.model.CompanyCd });
            if (company.length > 0) {
                $scope.model.CompanyId = company[0].Id;
                $scope.companyName = company[0].CompanyName;
            }

            apiService.get('api/Dependent', { params: $scope.search }, function (response) {
                $scope.lstDependent = response.data;
                for (var i = 0 ; i < $scope.lstDependent.length ; i++) {
                    $scope.lstDependent[i].FromMonth = formatDate($scope.lstDependent[i].FromMonth);
                    $scope.lstDependent[i].ToMonth = formatDate($scope.lstDependent[i].ToMonth);
                }
                //$scope.isErrorMessage = false;
                if ($scope.editable === true) {
                    controlFn(MODE_EDIT);
                } else {
                    controlFn(MODE_VIEW);
                }
            }, function (response) {
                $scope.lstDependent = response.data.ListDependent;
                $scope.errorMessage = response.data.Messages;
                $scope.isErrorMessage = true;
                controlFn(MODE_VIEW);
            })

            // clear vung nhap
            cached = null;
            $scope.cancelFn();
        }

        // format YearMon MM/YYYY
        function formatDate(date) {
            if (date != "" && date != undefined) {
                var str = '01' + date;
                return str.substring(2, 4) + '/' + str.substring(4, 8);
            } else {
                return date;
            }
        }

        $scope.cancelFn = function () {
            if (cached != null) {
                $scope.editFn(cached, $scope.useIndex);
            } else {
                // init data
                initModel();
                controlFn(MODE_EDIT);
            }
        }

        $scope.editFn = function (data, index) {
            $scope.model.IdPassportFlag = angular.isDefined(data.IdPassport);
            $scope.model.Id = data.Id;
            // copy model to Input
            $scope.employeeDto = {
                EmployeeNo: data.EmployeeNo,
                EmployeeName: data.EmployeeName
            }
            if ($scope.model.IdPassportFlag) {
                $scope.model.Dependent1 = data.Dependent;
                $scope.model.Birthday1 = dataService.getFormatDate(data.BirthDt);
                $scope.model.DependentTaxCode = data.DependentTaxCode;
                $scope.model.IdPassport = data.IdPassport;

                $scope.model.Dependent2 = null;
                $scope.model.Birthday2 = null;
                $scope.model.Number = null;
                $scope.model.NumberBook = null;
                $scope.model.RegisterPlace = null;
            }
            else {
                $scope.model.Dependent1 = null;
                $scope.model.Birthday1 = null;
                $scope.model.DependentTaxCode = null;
                $scope.model.IdPassport = null;

                $scope.model.Dependent2 = data.Dependent;
                $scope.model.Birthday2 = dataService.getFormatDate(data.BirthDt);
                $scope.model.Number = data.Number;
                $scope.model.NumberBook = data.NumberBook;
                $scope.model.RegisterPlace = data.RegisterPlace;
            }

            $scope.model.Relationship = data.Relationship;
            $scope.model.Nationality = data.Nationality;
            $scope.model.FromDt1 = dataService.getFormatMonthYear(data.FromDt);
            $scope.model.ToDt1 = dataService.getFormatMonthYear(data.ToDt);
            $scope.model.UpdatedDt = data.UpdatedDt;

            $scope.useIndex = index;
            $scope.form.dependentForm.resetForm();

            // copy model
            cached = angular.copy(data);
            controlFn(MODE_UPDATE);

        }

        function controlFn(mode) {
            switch (mode) {
                case MODE_VIEW:
                    $scope.control.file = true;
                    $scope.control.linkDependent = true;
                    $scope.control.btnImport = true;
                    $scope.control.btnSelectFile = true;
                    $scope.control.btnExportTemplate = true;
                    break;
                case MODE_EDIT:
                    $scope.control.file = false;
                    $scope.control.linkDependent = false;
                    $scope.control.btnImport = false;
                    $scope.control.btnSelectFile = false;
                    $scope.control.btnExportTemplate = false;
                    break;
            }
        }

        function initModel() {

            $scope.model.IdPassportFlag = true;
            $scope.model.Id = null;
            $scope.employeeDto = null;
            $scope.EmployeeNo = null;
            $scope.model.Dependent1 = null;
            $scope.model.Birthday1 = null;
            $scope.model.DependentTaxCode = null;
            $scope.model.IdPassport = null;
            $scope.model.Dependent2 = null;
            $scope.model.Birthday2 = null;
            $scope.model.Number = null;
            $scope.model.NumberBook = null;
            $scope.model.RegisterPlace = null;
            $scope.model.Relationship = null;
            $scope.model.Nationality = null;
            $scope.model.FromDt1 = null;
            $scope.model.ToDt1 = null;
            $scope.model.UpdatedDt = null;

            $scope.useIndex = -1;
        }

        // edit EmployeeNo
        $scope.$watch('employeeDto', function () {
            if ($scope.employeeDto == null) {
                $scope.model.EmployeeNo = null;
            }
            else {
                $scope.model.EmployeeNo = $scope.employeeDto.EmployeeNo;
            }

        })

    }

  

})(angular.module('KyuyoApp'));

