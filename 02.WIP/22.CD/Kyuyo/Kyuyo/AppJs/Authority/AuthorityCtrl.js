(function (app) {
    'use strict';

    app.controller('AuthorityCtrl', AuthorityCtrl);

    AuthorityCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function AuthorityCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dataService, dialogService) {

        $scope.lstRole = {};
        var lstRoleSave = {};

        $scope.ACCESS_VIEW = 'VIEW';
        $scope.ACCESS_EDIT = 'EDIT';
        $scope.ACCESS_CAL = 'CALC';
        $scope.ACCESS_CONF = 'CONF';
        $scope.ACCESS_CLOSE = 'CLOS';

        $scope.TYPE_SING = 1;
        $scope.TYPE_MUL = 2;


        $scope.init = function (model) {
            $scope.listEmployee = model.ListEmployee;
            $scope.editable = model.Editable;
            $scope.usedIndex = -1;
            $scope.disableControl = true;
            $scope.employeeDto = null;
        }

        $scope.useEmployee = function (emp, index, callback) {

            if ($scope.usedIndex == index)
                return;
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
            $scope.lstRole = {};
            var roles = [];
            if (angular.isDefined(emp.ScreenAccess)) {
                roles = emp.ScreenAccess.split('|');
            }
            angular.forEach(roles, function (role) {
                var split = role.split('_');
                var roleCode = split[1].split(',');
                var companys = split[2].split(',');

                $scope.lstRole[split[0]] = [];

                angular.forEach(roleCode, function (code, k) {
                    $scope.lstRole[split[0]].push({
                        code: code,
                        companys: companys[k].split('#')
                    });
                })
            });

            console.log($scope.lstRole)
            // backup role list
            lstRoleSave = angular.copy($scope.lstRole);
            $scope.disableControl = false;
        }

        $scope.checkedMenu = function (screenId) {
            var _checked = false;
            angular.forEach($scope.lstRole, function (role, id) {
                if (id == screenId) {
                    _checked = true;
                }
            })
            return _checked;
        };

        $scope.toggleMenuFn = function (screenId, type) {

            if (angular.isUndefined($scope.lstRole[screenId])) {
                if (type == $scope.TYPE_SING) {
                    $scope.lstRole[screenId] = [{
                        code: $scope.ACCESS_EDIT,
                        companys: []
                    }]
                }
                else {
                    $scope.lstRole[screenId] = [];
                }
            }
            else {
                delete $scope.lstRole[screenId];
            }
        }

        $scope.addFn = function () {

            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    if ($scope.employeeDto == null) {
                        toastr.error($messages.ErrorNoSelectEmp);
                        return;
                    }
                    var emp = $filter('filter')($scope.listEmployee, { EmployeeNo: $scope.employeeDto.EmployeeNo });
                    if (emp.length != 0) {
                        toastr.error($messages.ErrorSelectEmp);
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

            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    if ($scope.usedIndex == -1) {
                        toastr.error($messages.ErrorNoSelectEmp);
                        return;
                    }

                    apiService.del('api/Authority/' + $scope.listEmployee[$scope.usedIndex].EmployeeNo, null, function (response) {
                        $scope.listEmployee.splice($scope.usedIndex, 1);
                        $scope.disableControl = true;
                        $scope.usedIndex = -1;
                    }, function (response) {
                        toastr.error(response.data);
                    })
                }
            })
        }

        $scope.updateFn = function (callback) {

            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    if ($scope.usedIndex == -1) {
                        toastr.error($messages.ErrorNoSelectEmp);

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

            angular.forEach($scope.lstRole, function (role) {
                if (role.length == 0) {
                    _valid = false;
                }
            });
            if (_valid === false) {
                toastr.error($messages.ErrorNoSelectMode);
                if (angular.isFunction(callback)) {
                    callback(false);
                }
                return;
            }

            angular.forEach($scope.lstRole, function (role) {
                if (role.length == 0) {
                    _valid = false;
                } else {
                    angular.forEach(role, function (e) {
                        if (e.companys.length == 0) {
                            _valid = false;
                        }
                    })
                }
            })
            if (_valid === false) {
                toastr.error($messages.ErrorNoSelectCompany);
                if(angular.isFunction(callback)) {
                    callback(false);
                }
                return;
            }

            var newRole = $.map($scope.lstRole, function (v, k) {
                return k + '_' + $.map(v, function (e) { return e.code }).join(',') + '_' + $.map(v, function (e) { return e.companys.join('#') }).join(',');
            }).join('|');

            var selected = angular.copy($scope.listEmployee[$scope.usedIndex]);
            selected.ScreenAccess = newRole;
            apiService.post('api/Authority', selected, function (response) {

                $scope.listEmployee[$scope.usedIndex].Id = response.data.Id;
                $scope.listEmployee[$scope.usedIndex].ScreenAccess = newRole;
                $scope.listEmployee[$scope.usedIndex].UpdatedDt = response.data.UpdatedDt;

                $scope.usedIndex = -1;
                lstRoleSave = {};
                $scope.lstRole = {};

                toastr.success($messages.DataUpdated);

                $scope.disableControl = true;

                // return true
                if (angular.isFunction(callback)) {
                    callback(true);
                }
            }, function (response) {
                toastr.error(response.data);
                // return false
                if (angular.isFunction(callback)) {
                    callback(false);
                }
            })
        }

        $scope.checkedRole = function (screenId, roleCd) {
            if (angular.isDefined($scope.lstRole[screenId])) {
                var _checked = false;
                angular.forEach($scope.lstRole[screenId], function (e) {
                    if (e.code == roleCd) {
                        _checked = true;
                    }
                })
                return _checked;
            }
            return false;
        }

        $scope.setRoleFn = function (screenId, roleCd, type) {
            if (angular.isDefined($scope.lstRole[screenId])) {
                if (type == $scope.TYPE_SING) {
                    $scope.lstRole[screenId][0].code = roleCd;
                } else {
                    var _index = -1;
                    angular.forEach($scope.lstRole[screenId], function (e, k) {
                        if (e.code == roleCd) {
                            _index = k;
                        }
                    })

                    if (_index == -1) {
                        $scope.lstRole[screenId].push({
                            code: roleCd,
                            companys: []
                        })
                    } else {
                        $scope.lstRole[screenId].splice(_index, 1);
                    }
                }
            }
        }

        $scope.getIndex = function (screenId, roleCd) {
            var _index = -1;
            angular.forEach($scope.lstRole[screenId], function (e, k) {
                if (e.code == roleCd) {
                    _index = k;
                }
            })
            return _index;
        }

        // check change access role
        $scope.diffRole = function () {

            // check list menu
            if (Object.keys($scope.lstRole).length != Object.keys(lstRoleSave).length) return false;
            var _return = true;
            angular.forEach(lstRoleSave, function (bak, id) {
                if (angular.isUndefined($scope.lstRole[id])) {
                    _return = false;
                } else {
                    if (bak.length != $scope.lstRole[id].length) {
                        _return = false;
                    } else {
                        angular.forEach(bak, function (role) {
                            var data = $filter('filter')($scope.lstRole[id], { code: role.code });
                            if (data.length == 0) {
                                _return = false;
                            } else {
                                var companys = data[0].companys;
                                if (role.companys.length != companys.length) {
                                    _return = false;
                                } else {
                                    angular.forEach(role.companys, function (e) {
                                        if (companys.indexOf(e) == -1) {
                                            _return = false;
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            });

            return _return;
        }


    }

})(angular.module('KyuyoApp'));