(function (app) {
    'use strict';

    app.controller('SalaryCtrl', SalaryCtrl);

    SalaryCtrl.$inject = ['$scope', '$rootScope', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function SalaryCtrl($scope, $rootScope, $filter, $messages, $strings, apiService, dataService, dialogService) {

        $scope.IMPORT = 0;
        $scope.IMPORT_NEW = 1;
    
        $scope.CnstMode = {
            MODE_EDIT: 1,
            MODE_VIEW : 2,
            MODE_UPDATE : 3
        } 
        // use to check some fields disable or not    
        $scope.isProductSalaryCheck = false;
      

        // Constructor 
        $scope.init = function (model) {
            $scope.currentSelected = null;
            // List company
            $scope.listCompany = model.ListCompany;
            // List dept
            $scope.listDept = model.ListDept;
            // user role
            $scope.editable = model.Editable;
            //
            $scope.listOTType = model.OTType;
            // 
            $scope.foreignCur = model.ForeignCur;

            $scope.SalaryFormula = model.SalaryFormula;

            $scope.EmployeeObject = null;

            $scope.mode = model.Mode;
          
            $scope.search = {
                CompanyCd: model.CompanyCd,
                CompanyId: null,
                CompanyName: null,
                DeptCd: null,
                EmployeeNo: null,
                EmployeeName: null
            };

            $scope.useIndex = -1;

            $scope.selectedCompany = {
                CompanyId: null,
                CompanyName: null,
            }

            var company = $filter('filter')($scope.listCompany, { CompanyCd: $scope.search.CompanyCd });
            if (company.length > 0) {
                $scope.selectedCompany.CompanyId = company[0].Id;
                $scope.selectedCompany.CompanyName = company[0].CompanyName;
            }

            $scope.allData = {
                CompanyId: null,// 2
                CompanyCd: null,// 3
                EmployeeNo: null,  // 4
                EffectiveDt: '', // 5
                BasicSalary: null, // 6
                ForeignCur: 'VND',// 7
                AutoCal: false, // 8
                Rate: 0, // 9
                ProbationSalary: null, // 10
                // 11
                InsuranceCalSalary: null, // 12
                UnitInsuranceSalary: null,
                // 13
                InsuranceCalSalaryRate: null, // 14
                PriceHours:null,
                UnitPriceHours: 'VND', // 16
                AccountNo: null, // 18
                BankName: null,  // 19
                SalaryUnit: 'VND',// 20
                ProductSalary: false,
                OTType: 0, // 21
                SalaryFormular: 0,// 22
                Allowance: model.Allowance,  // 23
                Subsidize: model.Subsidize, // 24
                ListSalary: null,
            }

            //$scope.isDisableEmp = ($scope.mode == $scope.CnstMode.MODE_VIEW
            //    || $scope.mode == $scope.CnstMode.MODE_UPDATE);
            $scope.isDisableEmp = true;

            $scope.changeUnitBasicSalary();
            $scope.getBaseOnProductSalary();
        }

        // 2. Get List Dept When Change Company
        $scope.onChangeCompany = function (companyCd) {
            $scope.listDept = $filter('filter')($scope.listDept, { CompanyCd: companyCd });
        }

        // 3. Search Info
        $scope.searchFnc = function () {
            var company = $filter('filter')($scope.listCompany, { CompanyCd: $scope.search.CompanyCd });

            $scope.mode = $scope.CnstMode.MODE_EDIT;
            $scope.currentSelected = null;
            if (company.length > 0) {
                $scope.search.CompanyId = company[0].Id;
                $scope.search.CompanyName = company[0].CompanyName

                $scope.selectedCompany.CompanyId = company[0].Id;
                $scope.selectedCompany.CompanyName = company[0].CompanyName;
            }

            $scope.EmployeeObject = null;

            apiService.get('api/Salary', { params: $scope.search },
                function (response) {

                    $scope.data = response.data;
                    // 
                    $scope.foreignCur = $scope.data.ForeignCur;

                    $scope.allData = {
                        CompanyId: null,// 2
                        CompanyCd: $scope.search.CompanyCd,// 3
                        EmployeeNo: null,  // 4
                        EffectiveDt: null, // 5
                        BasicSalary: null, // 6
                        UnitBasicSalary: 'VND',// 7
                        AutoCal: false, // 8
                        Rate: 0, // 9
                        ProbationSalary: null, // 10
                        // 11
                        InsuranceCalSalary: null, // 12
                        UnitInsuranceSalary: null,
                        // 13
                        InsuranceCalSalaryRate: null, // 14
                        PriceHours: null,
                        UnitPriceHours: 'VND', // 16
                        AccountNo: null, // 18
                        BankName: null,  // 19
                        SalaryUnit: 'VND',// 20
                        ProductSalary: false,
                        OTType: 0, // 21
                        SalaryFormular: 0,// 22
                        Allowance: $scope.data.Allowances,  // 23
                        Subsidize: $scope.data.Subsidizes, // 24
                        ListSalary: $scope.data.LstSalary,
                    }
                    $scope.changeUnitBasicSalary();
                    $scope.getBaseOnProductSalary();
                });
           
           
           
        }

        // thanhtv
        // Import prosess
        $scope.importFn = function (type) {
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                if (confirm) {
                    var file = null;
                    if (type == $scope.IMPORT) {
                        file = $scope.file;
                    } else if (type == $scope.IMPORT_NEW) {
                        file = $scope.fileNew;
                    }

                    if (file == null) {
                        toastr.error($messages.NoFileSelect);
                        return;
                    }
                    
                    apiService.upload('api/Salary/Import/' + $scope.selectedCompany.CompanyId + '/' + type, file, function (response) {
                        apiService.download(response.data.LogFile);
                        toastr.warning(response.data.Messages.join("<br>"));
                        $scope.file = null;
                    }, function (response) {
                        toastr.error(response.data);
                    })
                }
            })
        }

        $scope.changeFile = function (file, type) {
            if (file !== null) {
                if (type == $scope.IMPORT) {
                    $scope.file = file;
                } else if (type == $scope.IMPORT_NEW) {
                    $scope.fileNew = file;
                }
            }
        }

        // 10,11 .Change basic salary
        $scope.calProbationSalary = function () {
            if ($scope.allData.AutoCal && !isNullOrUndefined($scope.allData.Rate)) {
                // set value for probationSalary = basicSalary * rate
                $scope.allData.ProbationSalary = $scope.allData.BasicSalary * $scope.allData.Rate / 100;
            } else if (!$scope.allData.AutoCal) {
                $scope.allData.Rate = null;
            }
        }

        // 12
        $scope.changeUnitBasicSalary = function () {
            $scope.allData.UnitInsuranceSalary = $scope.allData.UnitBasicSalary
        }

        //13
        $scope.changeUnitPriceHours = function () {
            $scope.allData.UnitInsuranceSalary = $scope.allData.UnitPriceHours;
        }


        //14
        $scope.insertFn = function () {
            // edit Data to submit
            $scope.allData.CompanyCd = $scope.search.CompanyCd;
            $scope.changeEmployee();

            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    apiService.put('api/Salary', $scope.allData,
                      function (response) {
                          $scope.searchFnc();
                          toastr.success(response.data.Messages);
                      }, function (response) {
                          // Show error message
                          showMessage(false, response.data.Messages);
                      });
                }
            });
        }

        // 15
        $scope.selectRowToUpdate = function (elm, index) {
            $scope.useIndex = index;
            $scope.mode = $scope.CnstMode.MODE_UPDATE;
            $scope.currentSelected = jQuery.extend(true, {}, elm);
            updateAllData(elm, $scope.mode);
            $scope.getBaseOnProductSalary();
            
        }

        // 15
        $scope.updateFn = function () {
            console.log($scope.allData);
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    apiService.post('api/Salary', $scope.allData, function (response) {
                        $scope.searchFnc();
                        toastr.success(response.data.Messages);
                        //console.log(response)
                    }, function (response) {
                        showMessage(false, response.data.Messages);
                    })
                }
            });
        }

        // 16. Delete data
        $scope.deleteFn = function () {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    var param = {
                        id: $scope.allData.Id,
                        updatedDt: $scope.allData.UpdatedDt,
                        companyCd: $scope.allData.CompanyCd,
                        companyId: $scope.allData.CompanyId,
                    }

                    apiService.del('api/Salary', { params: param }, function (response) {
                        $scope.searchFnc();
                        toastr.success(response.data.Messages);
                        //console.log(response)
                    }, function (response) {
                        showMessage(false, response.data.Messages);
                    })
                }
            });
        }

        // 17. Cancle data on screen
        $scope.cancelFn = function () {
            if (!isNullOrUndefined($scope.allData.Id)) {
                var elm = jQuery.extend(true, {}, $scope.currentSelected);
                updateAllData(elm, $scope.mode);
            } else {
                $scope.searchFnc();
            }
        }
        
       

        function updateAllData(elm, state) {
           
            if (state == $scope.CnstMode.MODE_UPDATE) {
                $scope.EmployeeObject = elm.EmployeeObject;
                $scope.allData = {
                    Id: elm.Id,
                    CompanyId: $scope.search.CompanyId,// 2
                    CompanyCd: $scope.search.CompanyCd,// 3
                    EmployeeNo: elm.EmployeeNo,  // 4
                    EffectiveDt: dataService.getFormatDate(elm.EffectiveDt), // 5
                    BasicSalary: elm.BasicSalaryOffical, // 6
                    UnitBasicSalary: elm.Unit,// 7
                    AutoCal: false, // 8
                    Rate: null, // 9
                    ProbationSalary: elm.BasicSalaryProbasion, // 10
                    // 11
                    InsuranceCalSalary: elm.SalaryCalSocialInsu, // 12
                    UnitInsuranceSalary: elm.Unit,
                    // 13
                    InsuranceCalSalaryRate: elm.ExchangeRateSocialInsuSal, // 14
                    PriceHours: elm.SalaryHour,
                    UnitPriceHours: elm.Unit, // 16
                    AccountNo: elm.BankAccount, // 18
                    BankName: elm.BankName,  // 19
                    SalaryUnit: elm.SalaryUnit,// 20
                    ProductSalary: elm.ProductSalary,
                    OTType: elm.OtType, // 21
                    SalaryFormular: elm.FormulaCd,// 22
                    Allowance: elm.Allowance,  // 23
                    Subsidize: elm.Subsidize, // 24
                    UpdatedDt: elm.UpdatedDt,
                    ListSalary: $scope.data.LstSalary,
                }

                for (var i = 0 ; i < $scope.allData.Allowance.length; i++) {
                    $scope.allData.Allowance[i].EffectiveFrom = dataService.getFormatDate(elm.Allowance[i].EffectiveFrom);
                    $scope.allData.Allowance[i].EffectiveTo = dataService.getFormatDate(elm.Allowance[i].EffectiveTo);
                }

                for (var i = 0 ; i < $scope.allData.Subsidize.length; i++) {
                    $scope.allData.Subsidize[i].EffectiveFrom = dataService.getFormatDate(elm.Subsidize[i].EffectiveFrom);
                    $scope.allData.Subsidize[i].EffectiveTo = dataService.getFormatDate(elm.Subsidize[i].EffectiveTo);
                }
            }
        }

        function isNullOrUndefined(str) {
            if (str === null || str === undefined || str === "") {
                return true;
            }
            return false;
        }

        function showMessage(isOk, messages) {
            var listMessage = "";
            angular.forEach(messages, function (value, key) {
                listMessage += value + '<br>';
            }, []);

            if (isOk) {
                toastr.success(listMessage);
            } else {
                toastr.error(listMessage);
            }
        }

        $scope.changeEmployee = function () {
            if (!isNullOrUndefined($scope.EmployeeObject)) {
                $scope.allData.EmployeeNo = $scope.EmployeeObject.EmployeeNo;
            }
        }
        // basic salary mode
        $scope.getBaseOnProductSalary = function ()
        {
            if($scope.mode ==  $scope.CnstMode.MODE_VIEW || ($scope.mode ==  $scope.CnstMode.MODE_UPDATE && 
                $scope.allData.ProductSalary)) {
                $scope.isProductSalaryCheck = true;
            } else {
                $scope.isProductSalaryCheck = false;
            }
        }
    }

})(angular.module('KyuyoApp'));