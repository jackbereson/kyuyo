(function (app) {
    'use strict';

    app.controller('EmployeeCtrl', EmployeeCtrl);
    app.controller('InfoChangeCtrl', InfoChangeCtrl);
    app.controller('EmpDeptCtrl', EmpDeptCtrl);

    EmployeeCtrl.$inject = ['$scope', '$rootScope', '$uibModal', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function EmployeeCtrl($scope, $rootScope, $uibModal, $filter, $messages, $strings, apiService, dataService, dialogService) {

        var listDept = [],
            listInsurance = [],
            listTitle = [];
        var validatorDept = {};

        var valueInfoChange = {};
        var lstCertificate = [];
        var MODE_VIEW = 0,
           MODE_NEW = 1,
           MODE_UPDATE = 2,
           TIME_OUT = 1500;
        var cached = null;

        $scope.init = function (model) {
            $scope.listCompany = model.ListCompany;
            listDept = model.ListDept;

            $scope.listEmployeeType = model.ListEmployeeType;
            $scope.listWorkingPlace = model.ListWorkingPlace;
            $scope.listLevel = model.ListLevel;
            $scope.listLevelGroup = model.ListLevelGroup;
            $scope.listContractForm = model.ListContractForm;
            $scope.listContractType = model.ListContractType;
            $scope.listInsuCode = model.ListInsuCode;
            listInsurance = model.ListInsurance;
            $scope.validationOptions = model.Validator;

            validatorDept = model.ValidatorDept;

            angular.forEach(model.ListCertificate, function (elm) {
                $scope.validationOptions.rules['CartiFrom-' + elm.AllowanceCd] = {
                    required: true,
                    date: $strings.DateFormat
                }
                $scope.validationOptions.rules['CartiTo-' + elm.AllowanceCd] = {
                    date: $strings.DateFormat,
                    future: ['#calCartiFrom-' + elm.AllowanceCd, $strings.DateFormat, "true"]
                }

                $scope.validationOptions.messages['CartiFrom-' + elm.AllowanceCd] = {
                    required: $messages.M009RequiredCertificate,
                    date: $messages.M009DateFormat
                }
                $scope.validationOptions.messages['CartiTo-' + elm.AllowanceCd] = {
                    date: $messages.M009DateFormat,
                    future: $messages.M009FutureCertificate

                }

            })

            console.log($scope.validationOptions);

            // user role
            $scope.editable = model.Editable;

            $scope.search = {
                CompanyId: model.CompanyId,
                DeptCd: null,
                EmployeeNo: null,
                EmployeeName: null,
                HistoryFlag: false,
                // FromDt1: dataService.getFormatDate(model.DateNow),
                ToDt1: dataService.getFormatDate(model.DateNow),
            };
            $scope.onChangeCompany($scope.search.CompanyId)

            $scope.model = {
                CompanyId: 0,
                CompanyCd: null,
                lstInsurance: [],
                lstCertificate: {},
                Gender: 'M',
                PIT: false
            };

            $scope.model.CompanyId = $scope.search.CompanyId;
            var company = $filter('filter')($scope.listCompany, { Id: $scope.model.CompanyId });
            if (company.length > 0) {
                $scope.companyName = company[0].CompanyName;
            }

            // initModel();

            $scope.control = {
                comInput: true,
                txtEmpCd: true,
                linkEmpl: true,
                btnAddDept: true,
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

            $scope.model.CompanyId = $scope.search.CompanyId;
            var company = $filter('filter')($scope.listCompany, { Id: $scope.model.CompanyId });
            if (company.length > 0) {
                $scope.companyName = company[0].CompanyName;
            }

            apiService.get('api/Employee', { params: $scope.search }, function (response) {
                $scope.lstEmployee = response.data.ListEmployee;

                $scope.listEmployeeType = response.data.ListEmployeeType;
                $scope.listWorkingPlace = response.data.ListWorkingPlace;
                $scope.listLevel = response.data.ListLevel;
                $scope.listLevelGroup = response.data.ListLevelGroup;
                $scope.listContractType = response.data.ListContractType;
                listTitle = response.data.ListTitle;

                console.log(response.data)
            }, function (response) {

            })
        }

        $scope.importFn = function () {
            //apiService.upload('api/Employee/import',$scope.file , function (response) {


            //})

            apiService.post('api/Employee', null, function (response) {


            })

        }

        $scope.changeFile = function (file) {
            if (file !== null) {
                $scope.file = file;
            }
        }


        $scope.insertFn = function () {

            $scope.form.employeeForm.resetForm();
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    // validate form
                    if ($scope.form.employeeForm.validate() == false) {
                        toastr.error($scope.form.employeeForm.errorList());
                        return;
                    }

                    /*begin modal*/
                    var modalInstance = $uibModal.open({
                        templateUrl: 'employee/infoChange',
                        controller: 'InfoChangeCtrl',
                        backdrop: 'static',
                        size: 'md',
                        keyboard: false,
                        resolve: {
                            data: function () {
                                return $scope.model;
                            },
                            validator: function () {
                                return $scope.validationOptions;
                            },
                            value: function () {
                                var data = {
                                    EmployeeType: getEmployeeType(MODE_NEW),
                                    Email: {
                                        value: $scope.model.Email,
                                        modified: false,
                                        disable: !angular.isString($scope.model.Email) || $scope.model.Email.length == 0
                                    },
                                    Address: {
                                        value: $scope.model.Address,
                                        modified: false,
                                        disable: !angular.isString($scope.model.Address) || $scope.model.Address.length == 0
                                    },
                                    WorkPlace: getWorkingPlace(MODE_NEW),
                                    Level: getLevel(MODE_NEW),
                                    LevelGroup: getLevelGroup(MODE_NEW),
                                    ContractForm: getContractForm(MODE_NEW),
                                    ContractType: getContractType(MODE_NEW),
                                    StandardHours: {
                                        value: $scope.model.StandardHours,
                                        modified: false,
                                        disable: false
                                    },
                                    Hospital: {
                                        value: $scope.model.Hospital,
                                        modified: false,
                                        disable: !angular.isString($scope.model.Hospital) || $scope.model.Hospital.length == 0
                                    },
                                    Insurances: getInsurance(MODE_NEW),
                                    PIT: {
                                        value: $scope.model.PIT === true ? '●' : null,
                                        modified: false,
                                        disable: $scope.model.PIT === false
                                    }
                                }
                                return data;
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {

                        $scope.model.EmpTypeEffectiveDt = result.EmpTypeEffectiveDt;
                        $scope.model.EmailEffectiveDt = result.EmailEffectiveDt;
                        $scope.model.AddressEffectiveDt = result.AddressEffectiveDt;
                        $scope.model.WorkPlaceEffectiveDt = result.WorkPlaceEffectiveDt;
                        $scope.model.LevelEffctiveDt = result.LevelEffctiveDt;
                        $scope.model.LevelGroupEffectiveDt = result.LevelGroupEffectiveDt;
                        $scope.model.ContractFormEffectiveDt = result.ContractFormEffectiveDt;
                        $scope.model.ContractTypeEffectiveDt = result.ContractTypeEffectiveDt;
                        $scope.model.StandardHoursEffeciveDt = result.StandardHoursEffeciveDt;
                        $scope.model.HospitalEffectiveDt = result.HospitalEffectiveDt;
                        $scope.model.InsuranceEffectiveDt = result.InsuranceEffectiveDt;
                        $scope.model.PITEffectiveDt = result.PITEffectiveDt;

                        // convert datetime
                        // convert list
                        editModelToSubmit();

                        apiService.put('api/Employee', $scope.model, function (response) {
                            toastr.success(response.data);
                            console.log(response)
                        }, function (response) {
                            toastr.error(response.data);
                            console.log(response)
                        })

                    });
                    /*end modal*/
                }
            })
        }


        $scope.updateFn = function () {

            $scope.form.employeeForm.resetForm();
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    // validate form
                    if ($scope.form.employeeForm.validate() == false) {
                        toastr.error($scope.form.employeeForm.errorList());
                        return;
                    }

                    /*begin modal*/
                    var modalInstance = $uibModal.open({
                        templateUrl: 'employee/infoChange',
                        controller: 'InfoChangeCtrl',
                        backdrop: 'static',
                        size: 'md',
                        keyboard: false,
                        resolve: {
                            data: function () {
                                return $scope.model;
                            },
                            validator: function () {
                                return $scope.validationOptions;
                            },
                            value: function () {
                                var data = {
                                    EmployeeType: getEmployeeType(MODE_UPDATE),
                                    Email: {
                                        value: $scope.model.Email,
                                        modified: cached.Email != $scope.model.Email,
                                        disable: !angular.isString($scope.model.Email) || $scope.model.Email.length == 0
                                    },
                                    Address: {
                                        value: $scope.model.Address,
                                        modified: cached.Address != $scope.model.Address,
                                        disable: !angular.isString($scope.model.Address) || $scope.model.Address.length == 0
                                    },
                                    WorkPlace: getWorkingPlace(MODE_UPDATE),
                                    Level: getLevel(MODE_UPDATE),
                                    LevelGroup: getLevelGroup(MODE_UPDATE),
                                    ContractForm: getContractForm(MODE_UPDATE),
                                    ContractType: getContractType(MODE_UPDATE),
                                    StandardHours: {
                                        value: $scope.model.StandardHours,
                                        modified: parseFloat(cached.StandardHours) !== parseFloat($scope.model.StandardHours),
                                        disable: false
                                    },
                                    Hospital: {
                                        value: $scope.model.Hospital,
                                        modified: cached.Hospital != $scope.model.Hospital,
                                        disable: !angular.isString($scope.model.Hospital) || $scope.model.Hospital.length == 0
                                    },
                                    Insurances: getInsurance(MODE_UPDATE),
                                    PIT: {
                                        value: $scope.model.PIT === true ? '●' : null,
                                        modified: cached.PIT !== $scope.model.PIT,
                                        disable: $scope.model.PIT === false
                                    }
                                }
                                return data;
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {

                        $scope.model.EmpTypeEffectiveDt = result.EmpTypeEffectiveDt;
                        $scope.model.EmailEffectiveDt = result.EmailEffectiveDt;
                        $scope.model.AddressEffectiveDt = result.AddressEffectiveDt;
                        $scope.model.WorkPlaceEffectiveDt = result.WorkPlaceEffectiveDt;
                        $scope.model.LevelEffctiveDt = result.LevelEffctiveDt;
                        $scope.model.LevelGroupEffectiveDt = result.LevelGroupEffectiveDt;
                        $scope.model.ContractFormEffectiveDt = result.ContractFormEffectiveDt;
                        $scope.model.ContractTypeEffectiveDt = result.ContractTypeEffectiveDt;
                        $scope.model.StandardHoursEffeciveDt = result.StandardHoursEffeciveDt;
                        $scope.model.HospitalEffectiveDt = result.HospitalEffectiveDt;
                        $scope.model.InsuranceEffectiveDt = result.InsuranceEffectiveDt;
                        $scope.model.PITEffectiveDt = result.PITEffectiveDt;

                        // convert datetime
                        // convert list
                        editModelToSubmit();

                        apiService.post('api/Employee', $scope.model, function (response) {
                            toastr.success(response.data);
                            console.log(response)
                        }, function (response) {
                            toastr.error(response.data);
                            console.log(response)
                        })

                    });
                    /*end modal*/
                }
            })
        }

        // Edit value popup

        // Get value Employee type
        function getEmployeeType(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.EmployeeType == null
            };
            angular.forEach($scope.listEmployeeType, function (value) {
                if (value.Cd == $scope.model.EmployeeType) {
                    result.value = value.Remark;
                }
            })
            if (mode == MODE_UPDATE && cached.EmployeeType != $scope.model.EmployeeType) {
                result.modified = true;
            }
            return result;
        }

        function getWorkingPlace(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.WorkPlace == null
            };
            angular.forEach($scope.listWorkingPlace, function (value) {
                if (value.Cd == $scope.model.WorkPlace) {
                    result.value = value.Remark;
                }
            })

            if (mode == MODE_UPDATE && cached.WorkPlace != $scope.model.WorkPlace) {
                result.modified = true;
            }
            return result;
        }

        function getLevel(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.Level == null
            };
            angular.forEach($scope.listLevel, function (value) {
                if (value.Cd == $scope.model.Level) {
                    result.value = value.Remark;
                }
            })

            if (mode == MODE_UPDATE && cached.Level != $scope.model.Level) {
                result.modified = true;
            }
            return result;
        }

        function getLevelGroup(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.LevelGroup == null
            };
            angular.forEach($scope.listLevelGroup, function (value) {
                if (value.Cd == $scope.model.LevelGroup) {
                    result.value = value.Value;
                }
            })
            if (mode == MODE_UPDATE && cached.LevelGroup != $scope.model.LevelGroup) {
                result.modified = true;
            }
            return result;
        }

        function getContractForm(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.ContractForm == null
            };
            angular.forEach($scope.listContractForm, function (value) {
                if (value.Cd == $scope.model.ContractForm) {
                    result.value = value.Value;
                }
            })
            if (mode == MODE_UPDATE && cached.ContractForm != $scope.model.ContractForm) {
                result.modified = true;
            }
            return result;
        }

        function getContractType(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.ContractType == null
            };
            angular.forEach($scope.listContractType, function (value) {
                if (value.Cd == $scope.model.ContractType) {
                    result.value = value.Value;
                }
            })
            if (mode == MODE_UPDATE && cached.ContractType != $scope.model.ContractType) {
                result.modified = true;
            }
            return result;
        }

        function getInsurance(mode) {
            var result = {
                value: null,
                modified: false,
                disable: $scope.model.lstInsurance.length == 0
            };

            result.value = listInsurance.map(function (value) {
                if ($scope.checkInsurance(value.PolicyCd)) {
                    return value.PolicyName;
                } else {
                    return null;
                }
            }).filter(function (value) {
                return value !== null;
            }).join(', ');


            if (mode == MODE_UPDATE && diffInsu()) {
                result.modified = true;
            }
            return result;
        }

        function diffInsu() {
            var result = false;
            var cachedInsu = [];
            if (angular.isString(cached.Insurance)) {
                cachedInsu = cached.Insurance.split('|');
            }
            if (cachedInsu.length !== $scope.model.lstInsurance.length) return true;

            angular.forEach(cachedInsu, function (value) {
                if ($scope.model.lstInsurance.indexOf(value) === -1) {
                    result = true;
                }
            });
            return result;
        }

        $scope.editFn = function (data, index) {

            // get list Department
            searchEmpDept(data.EmployeeNo);

            $scope.model = {};

            $scope.model = angular.copy(data);

            console.log(data)

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
            lstCertificate = [];

            // edit list danh sach chung chi
            if (angular.isString(data.CertificateList)) {
                var lstCerti = data.CertificateList.split('|');
                angular.forEach(lstCerti, function (value) {
                    console.log(value)
                    var split = value.split('-');
                    $scope.model.lstCertificate[split[0]] = {
                        fromDt: dataService.getFormatDate(split[1]),
                        toDt: dataService.getFormatDate(split[2])
                    }
                    lstCertificate.push(split[0]);
                })
            }

            cached = angular.copy(data);
            $scope.useIndex = index;
            $scope.form.employeeForm.resetForm();
            controlFn(MODE_UPDATE);
        }

        $scope.addDeptFn = function () {

            var model = {
                listDepartment: $scope.listDept = $filter('filter')(listDept, { CompanyCd: $scope.model.CompanyCd }),
                listTitle: listTitle,
                validator: validatorDept,
                mode: MODE_NEW
            }

            var data = {
                Id: null,
                CompanyCd: $scope.model.CompanyCd,
                EmployeeNo: $scope.model.EmployeeNo,
                DeptCd: model.listDepartment[0].DeptCd,
                Title: model.listTitle[0].Remark,
                StartDt: '',
                InactiveDt: '',
                MainFlag: false
            }
            popupDepartment(data, model);
        }

        $scope.editDeptFn = function (dept) {

            var model = {
                listDepartment: $scope.listDept = $filter('filter')(listDept, { CompanyCd: $scope.model.CompanyCd }),
                listTitle: listTitle,
                validator: validatorDept,
                mode: MODE_UPDATE
            }

            var data = {
                Id: dept.Id,
                CompanyCd: dept.CompanyCd,
                EmployeeNo: dept.EmployeeNo,
                DeptCd: dept.DeptCd,
                Title: dept.Title,
                StartDt: dept.StartDt,
                InactiveDt: dept.InactiveDt,
                MainFlag: dept.MainFlag,
                UpdatedDt: dept.UpdatedDt
            }
            popupDepartment(data, model);
        }

        $scope.delDeptFn = function (dept) {
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    apiService.del('api/Employee/dept/' + dept.Id + '/' + dept.UpdatedDt, null, function (response) {
                        toastr.success(response.data);
                        searchEmpDept(dept.EmployeeNo);
                    }, function (response) {
                        toastr.error(response.data);
                    })
                }
            })
        }

        function popupDepartment(data, model) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: 'employee/dept',
                controller: 'EmpDeptCtrl',
                backdrop: 'static',
                size: 'md',
                keyboard: false,
                resolve: {
                    data: function () {
                        return data;
                    },
                    model: function () {
                        return model;
                    }
                }
            });

            modalInstance.result.then(function () {
                searchEmpDept(data.EmployeeNo);
            });
            /*end modal*/
        }

        function searchEmpDept(empNo) {
            apiService.get('api/Employee/dept/' + empNo, null, function (response) {
                $scope.lstEmpDept = response.data;
            })
        }

        function editModelToSubmit() {

            $scope.model.BirthDt = dataService.getDate($scope.model.BirthDt1);
            $scope.model.EntryDt = dataService.getDate($scope.model.EntryDt1);
            $scope.model.LabourUnionDt = dataService.getDate($scope.model.LabourUnionDt1);
            $scope.model.ProbationEndDt = dataService.getDate($scope.model.ProbationEndDt1);
            $scope.model.QuitDt = dataService.getDate($scope.model.QuitDt1);
            $scope.model.InsuranceUnionMonth = dataService.getDate($scope.model.InsuranceUnionMonth1);
            $scope.model.Insurance = $scope.model.lstInsurance.join('|');

            $scope.model.Certificate = lstCertificate.map(function (e) {
                var ceriti = $scope.model.lstCertificate[e];
                return e + '-' + dataService.getDate(ceriti.fromDt) + '-' + dataService.getDate(ceriti.toDt);
            }).join('|');

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
            if (angular.isObject(lstCertificate)) {
                var _checked = false;
                angular.forEach(lstCertificate, function (value) {
                    if (value == code) {
                        _checked = true;
                    }
                })
                return _checked;
            } else {
                return false;
            }
        }

        $scope.toggleCerticate = function (code) {
            if (angular.isArray(lstCertificate)) {
                var index = lstCertificate.indexOf(code);
                if (index == -1) {
                    lstCertificate.push(code);
                    $scope.model.lstCertificate[code] = {
                        fromDt: null,
                        toDt: null
                    }
                } else {
                    lstCertificate.splice(index, 1);
                    delete $scope.model.lstCertificate[code];
                }
            }
        }



        function controlFn(mode) {
            switch (mode) {
                case MODE_VIEW:
                    $scope.control.comInput = true;
                    $scope.control.txtEmpCd = true;
                    $scope.control.linkEmpl = false;
                    $scope.control.btnAddDept = true;
                    $scope.control.btnInsert = true;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = true;
                    break;
                case MODE_NEW:
                    $scope.control.comInput = false;
                    $scope.control.txtEmpCd = false;
                    $scope.control.linkEmpl = true;
                    $scope.control.btnAddDept = true;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = true;
                    $scope.control.btnDelete = true;
                    $scope.control.btnCancel = false;
                    break;
                case MODE_UPDATE:
                    $scope.control.comInput = false;
                    $scope.control.txtEmpCd = true;
                    $scope.control.linkEmpl = true;
                    $scope.control.btnAddDept = false;
                    $scope.control.btnInsert = false;
                    $scope.control.btnUpdate = false;
                    $scope.control.btnDelete = false;
                    $scope.control.btnCancel = false;
                    break;
            }
        }

    }


    InfoChangeCtrl.$inject = ['$scope', '$uibModalInstance', '$messages', 'dataService', 'data', 'value', 'validator'];
    function InfoChangeCtrl($scope, $uibModalInstance, $messages, dataService, data, value, validator) {

        $scope.dataInfo = value;
        $scope.validationOptions = validator;
        $scope.model = {
            EmpTypeEffectiveDt: $scope.dataInfo.EmployeeType.disable ? null : dataService.getFormatDate(data.EmpTypeEffectiveDt),
            EmailEffectiveDt: $scope.dataInfo.Email.disable ? null : dataService.getFormatDate(data.EmailEffectiveDt),
            AddressEffectiveDt: $scope.dataInfo.Address.disable ? null : dataService.getFormatDate(data.AddressEffectiveDt),
            WorkPlaceEffectiveDt: $scope.dataInfo.WorkPlace.disable ? null : dataService.getFormatDate(data.WorkPlaceEffectiveDt),
            LevelEffctiveDt: $scope.dataInfo.Level.disable ? null : dataService.getFormatDate(data.LevelEffctiveDt),
            LevelGroupEffectiveDt: $scope.dataInfo.LevelGroup.disable ? null : dataService.getFormatDate(data.LevelGroupEffectiveDt),
            ContractFormEffectiveDt: $scope.dataInfo.ContractForm.disable ? null : dataService.getFormatDate(data.ContractFormEffectiveDt),
            ContractTypeEffectiveDt: $scope.dataInfo.ContractType.disable ? null : dataService.getFormatDate(data.ContractTypeEffectiveDt),
            StandardHoursEffeciveDt: dataService.getFormatDate(data.StandardHoursEffeciveDt),
            HospitalEffectiveDt: $scope.dataInfo.Hospital.disable ? null : dataService.getFormatDate(data.HospitalEffectiveDt),
            InsuranceEffectiveDt: $scope.dataInfo.Insurances.disable ? null : dataService.getFormatDate(data.InsuranceEffectiveDt),
            PITEffectiveDt: $scope.dataInfo.PIT.disable ? null : dataService.getFormatDate(data.PITEffectiveDt),
        };

        $scope.okFn = function () {

            // validate form
            if ($scope.form.infoChange.validate() == false) {
                toastr.error($scope.form.infoChange.errorList());
                return;
            }

            $uibModalInstance.close(editReturnData($scope.model));
        };

        $scope.cancelFn = function () {
            $uibModalInstance.dismiss();
        };

        function editReturnData(obj) {
            return {
                EmpTypeEffectiveDt: dataService.getDate(obj.EmpTypeEffectiveDt),
                EmailEffectiveDt: dataService.getDate(obj.EmailEffectiveDt),
                AddressEffectiveDt: dataService.getDate(obj.AddressEffectiveDt),
                WorkPlaceEffectiveDt: dataService.getDate(obj.WorkPlaceEffectiveDt),
                LevelEffctiveDt: dataService.getDate(obj.LevelEffctiveDt),
                LevelGroupEffectiveDt: dataService.getDate(obj.LevelGroupEffectiveDt),
                ContractFormEffectiveDt: dataService.getDate(obj.ContractFormEffectiveDt),
                ContractTypeEffectiveDt: dataService.getDate(obj.ContractTypeEffectiveDt),
                StandardHoursEffeciveDt: dataService.getDate(obj.StandardHoursEffeciveDt),
                HospitalEffectiveDt: dataService.getDate(obj.HospitalEffectiveDt),
                InsuranceEffectiveDt: dataService.getDate(obj.InsuranceEffectiveDt),
                PITEffectiveDt: dataService.getDate(obj.PITEffectiveDt),
            }
        }
    }


    EmpDeptCtrl.$inject = ['$scope', '$uibModalInstance', '$messages', 'dataService', 'apiService', 'data', 'model'];
    function EmpDeptCtrl($scope, $uibModalInstance, $messages, dataService, apiService, data, model) {

        var MODE_NEW = 1,
           MODE_UPDATE = 2;

        $scope.model = angular.copy(data);

        $scope.model.StartDt1 = dataService.getFormatDate($scope.model.StartDt)
        $scope.model.InactiveDt1 = dataService.getFormatDate($scope.model.InactiveDt)

        $scope.listDepartment = model.listDepartment;
        $scope.listTitle = model.listTitle;
        $scope.validationOptions = model.validator;
        $scope.disableInput = true;

        if (model.mode == MODE_NEW) {
            $scope.disableInput = false;
        }

        $scope.okFn = function () {
            // validate form
            if ($scope.form.empDept.validate() == false) {
                toastr.error($scope.form.empDept.errorList());
                return;
            }

            $scope.model.StartDt = dataService.getDate($scope.model.StartDt1);
            $scope.model.InactiveDt = dataService.getDate($scope.model.InactiveDt1);

            if (model.mode == MODE_NEW) {
                apiService.put('api/Employee/dept/', $scope.model, function (response) {
                    toastr.success(response.data);
                    $uibModalInstance.close();
                }, function (response) {
                    toastr.error(response.data);
                })
            } else if (model.mode == MODE_UPDATE) {
                apiService.post('api/Employee/dept/', $scope.model, function (response) {
                    toastr.success(response.data);
                    $uibModalInstance.close();
                }, function (response) {
                    toastr.error(response.data);
                })
            }
        };

        $scope.cancelFn = function () {
            $uibModalInstance.dismiss();
        };
    }

})(angular.module('KyuyoApp'));