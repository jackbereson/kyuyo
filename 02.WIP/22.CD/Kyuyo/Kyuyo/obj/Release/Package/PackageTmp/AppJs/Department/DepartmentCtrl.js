(function (app) {
    'use strict';

    app.controller('DepartmentCtrl', DepartmentCtrl);

    DepartmentCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];
    function DepartmentCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var listCompany = [];
        var deptCached = null;

        $scope.init = function (model) {

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

            $scope.model = {
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

            //// Flag show message error search
            //$scope.isErrorMessage = false;
            //$scope.isBodyMessage = false;

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
                //$scope.isErrorMessage = false;
                $scope.listDept = response.data;

                var mode = MODE_VIEW;
                if ($scope.editable === true) {
                    mode = MODE_EDIT;
                }

                controlFn(mode);
            },
            function (response) {
                //$scope.isErrorMessage = true;
                $scope.errorMessage = response.data.Messages;
                //$scope.classMessage = 'alert-warning';
                toastr["warning"]($scope.errorMessage);

                $scope.listDept = response.data.listDept;

                controlFn(MODE_VIEW);
            });

            // clear vung nhap
            deptCached = null;
            $scope.cancelFn();

        }

        $scope.insertFn = function () {
            $scope.isBodyMessage = false;
            $scope.form.deptForm.resetForm();

            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    // validate form
                    if ($scope.form.deptForm.validate() == false) {
                        $scope.isBodyMessage = false;
                        $scope.form.deptForm.showErrors();
                        return;
                    }

                    apiService.put('/api/Department', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        //$scope.classBodyMessage = 'alert-success';

                        toastr["success"]($scope.errorBodyMessage);

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        //$scope.classBodyMessage = 'alert-danger';

                        toastr["error"]($scope.errorBodyMessage);
                    })
                }
            });


        }

        $scope.updateFn = function () {
            $scope.isBodyMessage = false;
            $scope.form.deptForm.resetForm();

            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    // validate form
                    if ($scope.form.deptForm.validate() == false) {
                        $scope.isBodyMessage = false;
                        $scope.form.deptForm.showErrors();
                        return;
                    }

                    apiService.post('/api/Department', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
    
                        $scope.errorBodyMessage = response.data;
                        //$scope.classBodyMessage = 'alert-success';
                        toastr["success"]($scope.errorBodyMessage);

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);

                        $scope.searchFn();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        //$scope.classBodyMessage = 'alert-danger';
                        toastr["error"]($scope.errorBodyMessage);
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

            if ($scope.classBodyMessage !== 'alert-success') {
                // clear message
                $scope.isBodyMessage = false;
                $scope.errorBodyMessage = [];
                $scope.classBodyMessage = '';
            }
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

            $scope.model.Id = null,
            $scope.model.DeptCd = null,
            $scope.model.OldDeptCd = null,
            $scope.model.DeptName = null,
            $scope.ActiveFlag = null,
            $scope.updateDt = null;
        }


    }

})(angular.module('KyuyoApp'));