(function (app) {
    'use strict';

    app.controller('DepartmentCtrl', DepartmentCtrl);

    DepartmentCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', '$userInfo', 'apiService', 'dialogService'];
    function DepartmentCtrl($scope, $rootScope, $window, $filter, $messages, $strings, $userInfo, apiService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var listCompany = [];
        var deptCached = null;

        $scope.init = function (model) {

            console.log(model)

            listCompany = model.ListCompany;
            $scope.companyName = null;

            // user role
            $scope.editable = model.Editable;

            // validate
            $scope.validationOptions = model.Validator;

            // Model search
            $scope.search = {
                CompanyCd: model.CompanyCd
            }

            // Model insert/update
            initBodyValue();

            $scope.control = {
                txtDeptCd: true,
                txtDeptName: true,
                rdActiveFlag: true,
                btnInsert: true,
                btnUpdate: true,
                btnCancel: true,
                linkDeptCd: true
            }

            // Flag show message error search
            $scope.isErrorMessage = false;
            $scope.isBodyMessage = false;

            $scope.searchFn();

        };

        $scope.searchFn = function () {
            // use companyCd
            $scope.model.CompanyCd = $scope.search.CompanyCd;

            var company = $filter('filter')(listCompany, { CompanyCd: $scope.model.CompanyCd });

            if (company.length > 0) {
                $scope.companyName = company[0].CompanyName;
            }

            apiService.get('/api/Department/' + $scope.search.CompanyCd, null, function (response) {
                $scope.isErrorMessage = response.data.isShowMessage;
                $scope.errorMessage = response.data.messages;
                $scope.classMessage = 'alert-warning';

                $scope.listDept = response.data.listDept;

                var mode = -1;
                if ($scope.editable === true) {
                    if (response.data.payRollStatus === true) {
                        mode = MODE_VIEW;
                    } else {
                        mode = MODE_EDIT;
                    }
                } else {
                    mode = MODE_VIEW;
                }

                controlFn(mode);
            },
            function (response) {
                $scope.isErrorMessage = true;
                $scope.errorMessage = response.data;
                $scope.classMessage = 'alert-danger';
                $scope.listDept = [];
            });

            // clear vung nhap
            deptCached = null;
            $scope.cancelFn();

        }

        $scope.insertFn = function () {

            // validate form
            if ($scope.form.deptForm.validate() == false) {
                $scope.form.deptForm.showErrors();
                return;
            }

            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    apiService.put('/api/Department', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        initBodyValue();
                        $scope.searchFn();
                        controlFn(MODE_EDIT);
                        deptCached = null;


                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';

                    })
                }
            });

            
        }

        $scope.updateFn = function () {

            // validate form
            if ($scope.form.deptForm.validate() == false) {
                $scope.form.deptForm.showErrors();
                return;
            }

            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    apiService.post('/api/Department', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        initBodyValue();
                        $scope.searchFn();
                        controlFn(MODE_EDIT);
                        deptCached = null;

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }

            });
        }

        $scope.editModelFn = function (dept, form) {
            $scope.model = {
                Id: dept.Id,
                CompanyCd: dept.CompanyCd,
                DeptCd: dept.DeptCd,
                OldDeptCd: dept.DeptCd,
                DeptName: dept.DeptName,
                ActiveFlag: dept.ActiveFlag,
                UpdatedDt: dept.UpdatedDt
            }
            deptCached = angular.copy($scope.model);
            form.resetForm();
            controlFn(MODE_UPDATE);
        }

        $scope.cancelFn = function () {
            if (deptCached != null) {
                $scope.editModelFn(deptCached, $scope.form.deptForm);
            } else {
                // init data
                initBodyValue();

                if (angular.isDefined($scope.form)) {
                    $scope.form.deptForm.resetForm();
                }
                controlFn(MODE_EDIT);
            }

            // clear message
            $scope.isBodyMessage = false;
            $scope.errorBodyMessage = [];
            $scope.classBodyMessage = '';
        }

        function controlFn(mode) {
            switch (mode) {
                case MODE_VIEW:
                    $scope.control.txtDeptCd = true;
                    $scope.control.txtDeptName = true;
                    $scope.control.rdActiveFlag = true;
                    $scope.control.btnInsert = true;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnCancel = true;
                    $scope.control.linkDeptCd = false;
                    break;
                case MODE_EDIT:
                    $scope.control.txtDeptCd = false;
                    $scope.control.txtDeptName = false;
                    $scope.control.rdActiveFlag = false;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnCancel = false;
                    $scope.control.linkDeptCd = true;
                    break;
                case MODE_UPDATE:
                    $scope.control.txtDeptCd = false;
                    $scope.control.txtDeptName = false;
                    $scope.control.rdActiveFlag = false;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = false;
                    $scope.control.btnCancel = false;
                    $scope.control.linkDeptCd = true;
                    break;
            }
        }

        function initBodyValue() {
            $scope.model = {
                Id: null,
                CompanyCd: null,
                DeptCd: null,
                OldDeptCd: null,
                DeptName: null,
                ActiveFlag: true,
                UpdateDt: null
            }
        }


    }

})(angular.module('KyuyoApp'));