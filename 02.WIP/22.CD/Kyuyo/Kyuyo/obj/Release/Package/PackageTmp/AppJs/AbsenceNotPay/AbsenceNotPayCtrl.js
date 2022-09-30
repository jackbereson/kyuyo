(function (app) {
    'use strict';

    app.controller('AbsenceNotPayCtrl', AbsenceNotPayCtrl);
    AbsenceNotPayCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];
    function AbsenceNotPayCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var cached = null;
        var listDepartments = [];

        var DATETIME_FORMAT = "yyyyMMddHHmmssfff";
        var DATE_FORMAT = "yyyyMMdd";

        // Init for form
        $scope.init = function (model) {
            $scope.listCompanies = [];

            $scope.search = {
                CompanyId: model.CompanyId,
                DeptCd: null,
                EmployeeNo: null,
                EmployeeName: null
            };

            $scope.input = {
                CompanyName: null,
                Id: null,
                EmployeeNo: null,
                AbsenceNo: null,
                FromDt: null,
                ToDt: null,
                StartWorkDt: null,
                UpdatedDt: null
            };

            $scope.employeeDto = {
                EmployeeNo: null,
                EmployeeName: null
            }

            $scope.control = {
                comInput: true,
                rdIdPassport: true,
                linkDependent: true,
                btnInsert: true,
                btnUpdate: true,
                btnDelete: true,
                btnCancel: true,
            }

            setDataInit(model);
            $scope.onChangeCompany($scope.search.CompanyId);
        }

        // Search: get list AbsenceNotPay
        $scope.searchFn = function () {
            $scope.search.CompanyId = $scope.search.CompanyId;
            $scope.search.DeptCd = $scope.search.DeptCd;
            $scope.search.EmployeeNo = $scope.search.EmployeeNo;
            $scope.search.EmployeeName = $scope.search.EmployeeName;

            apiService.get('api/AbsenceNotPay', { params: $scope.search }, function (response) {
                $scope.listLongtermAbsences = angular.fromJson(response.data.ListLongtermAbsences);
                convertToDateFromListLongterm();
                $scope.errorMessage = response.data.Messages;
                $scope.isErrorMessage = response.data.ShowMessage;
                if ($scope.editable === true) {
                    controlFn(MODE_EDIT);
                } else {
                    controlFn(MODE_VIEW);
                }
            });

            // clear cache
            cached = null;
            // reset form
            resetForm();
        }

        // Insert to Database
        $scope.insertFn = function () {
            // Confirm insert
            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (validateInsertUpdate() == false) {
                    return;
                }
                if (confirm) {
                    setDataToInput();
                    apiService.post('/api/AbsenceNotPay', $scope.paramInput, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();
                        cached = null;
                        resetForm();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            });
        }

        // Update to Database
        $scope.updateFn = function () {
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    if (validateInsertUpdate() == false) {
                        return;
                    }
                    setDataToInput();
                    apiService.put('/api/AbsenceNotPay', $scope.paramInput, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();
                        cached = null;
                        resetForm();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }

            });
        }

        // Delete to Database
        $scope.deleteFn = function () {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    var param = {
                        id: $scope.input.Id,
                        updatedDt: $scope.input.UpdatedDt
                    }
                    apiService.del('/api/AbsenceNotPay', { params: param }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();
                        cached = null;
                        resetForm();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            });
        }

        // Cancel
        $scope.cancelFn = function () {
            if (cached != null) {
                $scope.doEditDataFn(cached);
            } else {
                resetForm();
                if (angular.isDefined($scope.form)) {
                    $scope.form.absenceNotPayForm.resetForm();
                }
            }

            if ($scope.classBodyMessage !== 'alert-success') {
                // clear message
                $scope.isBodyMessage = false;
                $scope.errorBodyMessage = [];
                $scope.classBodyMessage = '';
            }
        }

        // Set data init of server to client
        function setDataInit(dataModel) {
            $scope.listCompanies = dataModel.ListCompanies;
            listDepartments = dataModel.ListDepartments;
            $scope.listAbsenceDescriptions = angular.fromJson(dataModel.ListAbsenceDescriptions);
            var dummyAbsenceDescription = { Id: -1, AbsenceNo: '', AbsenceDescription: $strings.PleaseSelect };
            $scope.listAbsenceDescriptions.unshift(dummyAbsenceDescription);
            $scope.listLongtermAbsences = angular.fromJson(dataModel.ListLongtermAbsences);
            $scope.validationOptions = dataModel.Validator;
            // user role
            $scope.editable = dataModel.Editable;
            convertToDateFromListLongterm();
            if ($scope.editable === true) {
                controlFn(MODE_EDIT);
            } else {
                controlFn(MODE_VIEW);
            }
        }

        // OnChange by company
        $scope.onChangeCompany = function (companyId) {
            var companyCd = null;
            var company = $filter('filter')($scope.listCompanies, { Id: companyId });
            if (company.length > 0) {
                companyCd = company[0].CompanyCd;
                $scope.input.CompanyName = company[0].CompanyName;
            }
            $scope.listDepartments = $filter('filter')(listDepartments, { CompanyCd: companyCd });
        }

        // Process to click hyperlink on table
        $scope.doEditDataFn = function (longtermAbsence) {
            $scope.input.Id = longtermAbsence.Id;
            $scope.input.UpdatedDt = longtermAbsence.UpdatedDt;
            $scope.employeeDto = {
                EmployeeNo: longtermAbsence.EmployeeNo,
                EmployeeName: longtermAbsence.EmployeeName
            }
            $scope.input.EmployeeNo = longtermAbsence.EmployeeNo;
            $scope.input.AbsenceNo = longtermAbsence.AbsenceNo;
            $scope.input.FromDt = $filter('date')(longtermAbsence.FromDt, "dd/MM/yyyy");
            $scope.input.ToDt = $filter('date')(longtermAbsence.ToDt, "dd/MM/yyyy");
            $scope.input.StartWorkDt = $filter('date')(longtermAbsence.StartWorkDt, "dd/MM/yyyy");

            // copy model to cache
            cached = angular.copy(longtermAbsence);
            controlFn(MODE_UPDATE);
        }

        // Convert from string of server to date angularjs
        function convertToDateFromListLongterm() {
            angular.forEach($scope.listLongtermAbsences, function (e) {
                e.FromDt = new Date(e.FromDt);
                e.ToDt = new Date(e.ToDt);
                e.StartWorkDt = new Date(e.StartWorkDt);
                e.UpdatedDt = e.UpdatedDt.replace(/([-.:T])/g, "");
            });
        }

        // Check null or empty
        function isNullorEmpty(object) {
            if (typeof object === 'undefined' || object === null || object == "") {
                return true;
            }
            return false;
        }

        // Set data to area input of form
        function setDataToInput() {
            $scope.paramInput = {
                Id: $scope.input.Id,
                EmployeeNo: $scope.employeeDto.EmployeeNo,
                AbsenceNo: $scope.input.AbsenceNo,
                FromDt: $scope.input.FromDt.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1'),
                ToDt: $scope.input.ToDt.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1'),
                StartWorkDt: $scope.input.StartWorkDt.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1'),
                UpdatedDt: $scope.input.UpdatedDt
            };
        }

        // Reset data of Form is blank
        function resetForm() {
            $scope.input.Id = null;
            $scope.input.EmployeeNo = null;
            $scope.input.AbsenceNo = null;
            $scope.input.FromDt = null;
            $scope.input.ToDt = null;
            $scope.input.StartWorkDt = null;
            $scope.input.UpdatedDt = null;
            $scope.employeeDto = {
                EmployeeNo: null,
                EmployeeName: null
            }
        }

        // Check Validate in Client
        function validateInsertUpdate() {
            $scope.isBodyMessage = false;

            //validate form
            if (isNullorEmpty($scope.employeeDto.EmployeeNo))
            {
                //$strings
                //return false;
            }

            if ($scope.form.absenceNotPayForm.validate() == false) {
                $scope.form.absenceNotPayForm.showErrors();
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