(function (app) {
    'use strict';

    app.controller('EmployeeCtrl', EmployeeCtrl);

    EmployeeCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$messages', '$strings', 'apiService', 'dataService'];
    function EmployeeCtrl($scope, $rootScope, $state, $filter, $messages, $strings, apiService, dataService) {

        var listDept = [];
        var MODE_VIEW = 0,
           MODE_NEW = 1,
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
                CompanyId: model.CompanyId,
                DeptCd: null,
                EmployeeNo: null,
                EmployeeName: null
            };
            $scope.onChangeCompany($scope.search.CompanyId)

            $scope.model = {
                CompanyId: model.CompanyId,
                lstInsurance: [],
                lstCertificate: {}
            };
            // initModel();

            $scope.control = {
                comInput: true,
                linkEmpl: true,
                btnInsert: true,
                btnUpdate: true,
                btnDelete: true,
                btnCancel: true

            }

            controlFn(MODE_NEW)

            $scope.useIndex = -1;
            $scope.isBodyMessage = false;
            $scope.searchFn();
        }

        $scope.onChangeCompany = function (companyId) {
            var companyCd = null;
            var company = $filter('filter')($scope.listCompany, { Id: companyId });
            if (company.length > 0) {
                companyCd = company[0].CompanyCd;
            }
            $scope.listDept = $filter('filter')(listDept, { CompanyCd: companyCd });
        }

        $scope.searchFn = function () {

            $scope.search.FromDt = dataService.getDate($scope.search.FromDt1);
            $scope.search.ToDt = dataService.getDate($scope.search.ToDt1);

            apiService.get('api/Employee', { params: $scope.search }, function (response) {
                $scope.lstEmployee = response.data;
                console.log(response.data)
            }, function (response) {

            })
        }

        $scope.importFn = function () {
            apiService.upload('api/Employee/import',$scope.file , function (response) {
            
            
            })
        }

        $scope.changeFile = function (file) {
            if (file !== null) {
                $scope.file = file;
            }
        }


        $scope.insertFn = function () {

            console.log($scope.form.employeeForm.validate())

            // validate form
            if ($scope.form.employeeForm.validate() == false) {
                $scope.form.employeeForm.showErrors();
                return;
            }
        }


        $scope.editFn = function (data, index) {

        console.log(data)

            $scope.model = data;
            $scope.model.BirthDt1 = dataService.getFormatDate(data.BirthDt);
            $scope.model.EntryDt1 = dataService.getFormatDate(data.EntryDt);
            $scope.model.LabourUnionDt1 = dataService.getFormatDate(data.LabourUnionDt);
            $scope.model.ProbationEndDt1 = dataService.getFormatDate(data.ProbationEndDt);
            $scope.model.QuitDt1 = dataService.getFormatDate(data.QuitDt);
            $scope.model.InsuranceUnionMonth1 = dataService.getFormatMonthYear(data.InsuranceUnionMonth);

            if (angular.isString(data.Insurance)) {
                $scope.model.lstInsurance = data.Insurance.split('|');
            } else {
                $scope.model.lstInsurance = [];
            }

            $scope.model.lstCertificate = {};

            // edit list danh sach chung chi
            if (angular.isString(data.CertificateList)) {
                var lstCerti = data.CertificateList.split('|');
                angular.forEach(lstCerti, function (value) {
                    console.log(value)
                    var split = value.split('-');
                    $scope.model.lstCertificate[split[0]] = {
                        fromDt: dataService.getFormatDate(split[1]),
                        toDt: dataService.getFormatDate(split[2]),
                    }
                })
                //$scope.model.lstCertificate = 
                console.log($scope.model.lstCertificate)

            }

            cached = angular.copy(data);
            $scope.useIndex = index;
            //form.resetForm();
            //controlFn(MODE_UPDATE);

        }

        $scope.checkInsurance = function (code) {
            if (angular.isArray($scope.model.lstInsurance)) {
                var _checked = false;
                angular.forEach($scope.model.lstInsurance, function (value) {
                    if (value == code) {
                        _checked = true;
                    }
                })
                return _checked;

            } else {
                return false;
            }
        }

        $scope.toggleInsurance = function (code) {
            if (angular.isArray($scope.model.lstInsurance)) {
                var index = $scope.model.lstInsurance.indexOf(code);
                if (index == -1) {
                    $scope.model.lstInsurance.push(code);
                } else {
                    $scope.model.lstInsurance.splice(index, 1)
                }
            }
        }

        $scope.checkCerticate = function (code) {
            if (angular.isObject($scope.model.lstCertificate)) {
                var _checked = false;
                angular.forEach($scope.model.lstCertificate, function (value, key) {
                    if (key == code) {
                        _checked = true;
                    }
                })
                return _checked;

            } else {
                return false;
            }
        }

        $scope.toggleCerticate = function (code) {
            
            if (angular.isObject($scope.model.lstCertificate)) {

                console.log(typeof $scope.model.lstCertificate[code])

                if (angular.isObject($scope.model.lstCertificate[code])) {

                    delete $scope.model.lstCertificate[code];
                } else {
                    $scope.model.lstCertificate[code] = {
                        fromDt: null,
                        toDt: null
                    }
                }
            }
        }

       

        function controlFn(mode) {
            switch (mode) {
                case MODE_VIEW:
                    $scope.control.comInput = true;
                    $scope.control.linkEmpl = false;
                    $scope.control.btnInsert = true;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = true;
                    break;
                case MODE_NEW:
                    $scope.control.comInput = false;
                    $scope.control.linkEmpl = true;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = false;
                    break;
                case MODE_UPDATE:
                    $scope.control.comInput = false;
                    $scope.control.linkEmpl = true;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = false;
                    $scope.control.btnDelete = false;
                    $scope.control.btnCancel = false;
                    break;
            }
        }

    }

})(angular.module('KyuyoApp'));