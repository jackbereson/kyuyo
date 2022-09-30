(function (app) {
    'use strict';

    app.controller('AuthorityCtrl', AuthorityCtrl);

    AuthorityCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function AuthorityCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dataService, dialogService) {

        var lstRole = [];
        var lstRoleSave = [];
        var TIME_OUT = 1500;

        $scope.ACCESS_VIEW = 'VIEW';
        $scope.ACCESS_EDIT = 'EDIT';

        $scope.init = function (model) {
            $scope.listEmployee = model.ListEmployee;
            $scope.editable = model.Editable;
            $scope.usedIndex = -1;
            $scope.disableControl = true;
            //$scope.employeeDto = null;

            $scope.isShowMessage = false;
            $scope.errorMessage = [];
            $scope.classBodyMessage = null;

            $scope.accessCompany = {};



        }

        $scope.useEmployee = function (emp, index, callback) {

            if ($scope.usedIndex == index)
                return;

            $scope.isShowMessage = false;
            $scope.errorMessage = [];
            $scope.classBodyMessage = null;

            if (!$scope.diffRole()) {
                // TODO show dialog config
                dialogService.confirm({ message: $messages.ConfirmUpdateSelected, btnCancel: true }, function (confirm) {
                    if (confirm === true) {
                        // check update success
                        updateData(function (success) {
                            if (success) {
                                selectEmpProsess(emp, index);

                                // return true
                                if (angular.isFunction(callback)) {
                                    callback(true);
                                }

                            } else {
                                // return false
                                if (angular.isFunction(callback)) {
                                    callback(false);
                                }
                            }
                        })
                    } else if (confirm === false) {
                        selectEmpProsess(emp, index);
                        // return true
                        if (angular.isFunction(callback)) {
                            callback(true);
                        }
                    } else {
                        if (angular.isFunction(callback)) {
                            callback();
                        }
                    }
                })
            } else {
                selectEmpProsess(emp, index);

                // return true
                if (angular.isFunction(callback)) {
                    callback(true);
                }

            }

        }

        function selectEmpProsess(emp, index) {
            $scope.usedIndex = index;
            lstRole = [];
            var roles = [];
            if (angular.isDefined(emp.ScreenAccess)) {
                roles = emp.ScreenAccess.split('|');
            }
            $scope.accessCompany = {};
            angular.forEach(roles, function (role) {
                var split = role.split('_');
                lstRole.push({
                    screenId: split[0],
                    access: split[1],
                    companys: split[2].split('#')
                });
                $scope.accessCompany[split[0]] = split[2].split('#');
            });

            // backup role list
            lstRoleSave = angular.copy(lstRole);
            $scope.disableControl = false;
        }

        $scope.checkedMenu = function (screenId) {
            var _checked = false;
            angular.forEach(lstRole, function (role) {
                if (role.screenId == screenId) {
                    _checked = true;
                }
            })
            return _checked;
        };

        $scope.toggleMenuFn = function (screenId) {

            var index = -1;
            angular.forEach(lstRole, function (role, i) {
                if (role.screenId == screenId) {
                    index = i;
                }
            });

            if (index == -1) {
                lstRole.push({
                    screenId: screenId,
                    access: $scope.ACCESS_EDIT
                });
                $scope.accessCompany[screenId] = [];
            }
            else {
                lstRole.splice(index, 1);
                $scope.accessCompany[screenId] = [];

            }
        }

        $scope.addFn = function () {
            $scope.errorMessage = [];
            $scope.isShowMessage = false;

            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    if ($scope.employeeDto == null) {
                        $scope.isShowMessage = true;
                        $scope.errorMessage.push($messages.ErrorNoSelectEmp);
                        $scope.classBodyMessage = 'alert-danger';
                        return;
                    }
                    var emp = $filter('filter')($scope.listEmployee, { EmployeeNo: $scope.employeeDto.EmployeeNo });
                    if (emp.length != 0) {
                        $scope.isShowMessage = true;
                        $scope.errorMessage.push($messages.ErrorSelectEmp);
                        $scope.classBodyMessage = 'alert-danger';
                        return;
                    } else {
                        var len = $scope.listEmployee.length;
                        var newEmp = {
                            EmployeeNo: $scope.employeeDto.EmployeeNo,
                            EmployeeName: $scope.employeeDto.EmployeeName
                        }

                        $scope.useEmployee(newEmp, len, function (success) {
                            if (success === true) {
                                // Used new Emp
                                $scope.listEmployee.push(newEmp);
                                $scope.employeeDto = null;
                            }
                            if (angular.isUndefined(success)) {
                                $scope.employeeDto = null;
                            }
                        })
                    }
                }
            })
        }

        $scope.deleteFn = function () {

            $scope.errorMessage = [];
            $scope.isShowMessage = false;

            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    if ($scope.usedIndex == -1) {
                        $scope.isShowMessage = true;
                        $scope.errorMessage.push($messages.ErrorNoSelectEmp);
                        $scope.classBodyMessage = 'alert-danger';
                        return;
                    }

                    apiService.del('api/Authority/' + $scope.listEmployee[$scope.usedIndex].EmployeeNo, null, function (response) {
                        $scope.listEmployee.splice($scope.usedIndex, 1);
                        $scope.disableControl = true;
                        $scope.usedIndex = -1;
                    }, function (response) {
                        $scope.isShowMessage = true;
                        $scope.errorMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            })
        }

        $scope.updateFn = function (callback) {

            $scope.isShowMessage = false;
            $scope.errorMessage = [];
            $scope.classBodyMessage = null;

            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    if ($scope.usedIndex == -1) {
                        $scope.isShowMessage = true;
                        $scope.errorMessage.push($messages.ErrorNoSelectEmp);
                        $scope.classBodyMessage = 'alert-danger';
                        return;
                    }
                    updateData(callback);
                }
                else {
                    // return true
                    if (angular.isFunction(callback)) {
                        callback(true);
                    }
                }
            })

        }

        function updateData(callback) {
            var _valid = true;
            var newRole = $.map(lstRole, function (v) {
                if ($scope.accessCompany[v.screenId].length === 0) {
                    _valid = false;
                }
                return v.screenId + '_' + v.access + '_' + $scope.accessCompany[v.screenId].join('#');
            }).join('|');

            if (_valid === false) {
                $scope.errorMessage = [];
                $scope.isShowMessage = true;
                $scope.errorMessage = [$messages.ErrorNoSelectCompany];
                $scope.classBodyMessage = 'alert-danger';

                if (angular.isFunction(callback)) {
                    callback(false);
                }
                return;
            }

            var selected = angular.copy($scope.listEmployee[$scope.usedIndex]);
            selected.ScreenAccess = newRole;
            apiService.post('api/Authority', selected, function (response) {

                $scope.listEmployee[$scope.usedIndex].Id = response.data.Id;
                $scope.listEmployee[$scope.usedIndex].ScreenAccess = newRole;
                $scope.listEmployee[$scope.usedIndex].UpdatedDt = response.data.UpdatedDt;

                $scope.usedIndex = -1;
                lstRoleSave = [];
                lstRole = [];

                $scope.isShowMessage = true;
                $scope.errorMessage.push($messages.DataUpdated);
                $scope.classBodyMessage = 'alert-success';

                $window.setTimeout(function () {
                    $scope.isShowMessage = false;
                    $scope.$apply();
                }, TIME_OUT);

                $scope.disableControl = true;

                // return true
                if (angular.isFunction(callback)) {
                    callback(true);
                }
            }, function (response) {

                $scope.isShowMessage = true;
                $scope.errorMessage = response.data;
                $scope.classBodyMessage = 'alert-danger';

                // return false
                if (angular.isFunction(callback)) {
                    callback(false);
                }
            })
        }

        $scope.checkedRole = function (screenId, roleCd) {
            var _checked = false;
            angular.forEach(lstRole, function (role) {
                if (role.screenId == screenId) {
                    _checked = role.access == roleCd;
                }
            })
            return _checked;
        }

        $scope.setRoleFn = function (screenId, roleCd) {
            angular.forEach(lstRole, function (role) {
                if (role.screenId == screenId) {
                    role.access = roleCd;
                }
            });
        }

        // check change access role
        $scope.diffRole = function () {
            // check list menu
            if (lstRoleSave.length != lstRole.length) return false;
            var _return = true;
            angular.forEach(lstRoleSave, function (bak) {
                var filter = {
                    screenId: bak.screenId,
                    access: bak.access
                }
                var check = $filter('filter')(lstRole, filter);
                if (check.length == 0) {
                    _return = false;
                } else {
                    // check list access company
                    var companys = $scope.accessCompany[bak.screenId];
                    if (bak.companys.length != companys.length) {
                        _return = false;
                    } else {
                        angular.forEach(bak.companys, function (v) {
                            var com = $filter('filter')(companys, v)
                            if (com.length == 0) {
                                _return = false;
                            }
                        })
                    }
                }
            });
            return _return;
        }


    }

})(angular.module('KyuyoApp'));