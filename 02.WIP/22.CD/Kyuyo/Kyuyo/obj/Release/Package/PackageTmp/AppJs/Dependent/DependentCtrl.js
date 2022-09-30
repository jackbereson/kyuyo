(function (app) {
    'use strict';

    app.controller('DependentCtrl', DependentCtrl);

    DependentCtrl.$inject = ['$scope', '$rootScope','$window', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function DependentCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dataService, dialogService) {

        var listDept = [];
        var MODE_VIEW = 0,
           MODE_EDIT = 1,
           MODE_UPDATE = 2,
           TIME_OUT = 1500;
        var cached = null;

        $scope.init = function (model) {
            
            $scope.listCompany = model.ListCompany;
            listDept = model.ListDept;
            $scope.validationOptions = model.Validator;
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
                comInput: true,
                rdIdPassport: true,
                linkDependent: true,
                btnInsert: true,
                btnUpdate: true,
                btnDelete: true,
                btnCancel: true,
            }

            $scope.onChangeCompany(model.CompanyCd);
            // flag message 
            $scope.isBodyMessage = false;
            $scope.useIndex = -1;
            $scope.searchFn();
        }

        $scope.onChangeCompany = function (companyCd) {
            $scope.listDept = $filter('filter')(listDept, { CompanyCd: companyCd });
        }

        $scope.insertFn = function () {
            if (validateInsertUpdate() == false) {
                return;
            }
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    apiService.put('/api/Dependent', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            });
        }


        $scope.updateFn = function () {
            if (validateInsertUpdate() == false) {
                return;
            }
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    apiService.post('/api/Dependent', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            });
        }

        function validateInsertUpdate() {
            $scope.isBodyMessage = false;

            // validate form
            if ($scope.form.dependentForm.validate() == false) {
                $scope.form.dependentForm.showErrors();
                return false;
            }

            if ($scope.model.IdPassportFlag) {
                $scope.model.BirthDt = dataService.getDate($scope.model.Birthday1);
                $scope.model.Dependent = $scope.model.Dependent1;
            } else {
                $scope.model.BirthDt = dataService.getDate($scope.model.Birthday2);
                $scope.model.Dependent = $scope.model.Dependent2;
            }
            $scope.model.FromDt = dataService.getDate($scope.model.FromDt1);
            $scope.model.ToDt = dataService.getDate($scope.model.ToDt1);

            return true;
        }

        $scope.deleteFn = function () {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    var param = {
                        id: $scope.model.Id,
                        updatedDt: $scope.model.UpdatedDt
                    }
                    apiService.del('/api/Dependent', { params: param}, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();
                        cached = null;

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
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

        $scope.cancelFn = function () {

            console.log(cached)

            if (cached != null) {
                console.log(cached)
                $scope.editFn(cached, $scope.useIndex);
            } else {
                // init data
                initModel();
                if (angular.isDefined($scope.form)) {
                    $scope.form.dependentForm.resetForm();
                }
                controlFn(MODE_EDIT);
            }

            if ($scope.classBodyMessage !== 'alert-success') {
                // clear message
                $scope.isBodyMessage = false;
                $scope.errorBodyMessage = [];
                $scope.classBodyMessage = '';
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

        $scope.changeTypeFn = function (type) {

            if ($scope.model.IdPassportFlag !== type) {
                $scope.model.DependentTaxCode = null;
                $scope.model.IdPassport = null;
                $scope.model.Dependent1 = null;
                $scope.model.Dependent2 = null;
                $scope.model.Birthday1 = null;
                $scope.model.Birthday2 = null;
                $scope.model.Number = null;
                $scope.model.NumberBook = null;
            }
            $scope.model.IdPassportFlag = type;

        }

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