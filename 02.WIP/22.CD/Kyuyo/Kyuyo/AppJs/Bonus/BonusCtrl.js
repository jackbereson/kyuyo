(function (app) {
    'use strict';

    app.controller('BonusCtrl', BonusCtrl);
    BonusCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dialogService'];

    function BonusCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var cached = null;

        // flag
        var FLAG_NO = "0";
        var FLAG_YES = "1";

        // Init for form
        $scope.init = function (model) {
            $scope.listCompanies = [];
            $scope.listCurrencies = [];

            $scope.search = {
                CompanyId: model.CompanyId,
                YearMonth: null,
                PayDesc: null
            };

            $scope.input = {
                CompanyId: null,
                CompanyName: null,
                YearMonth: null,
                Id: null,
                EmployeeNo: null,
                PayType: null,
                PayDesc: null,
                Value: null,
                Unit: null,
                DistributionFlag: "0",
                DistributionMonths: null,
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

            $scope.useIndex = -1;
            setDataInit(model);
            $scope.onChangeCompany($scope.search.CompanyId);
        }

        // Use for Autocompele JQuery
        function suggest(term) {
            var list = $scope.listDescriptions;
            var q = term.toLowerCase().trim();
            var results = [];

            // Find first 10 states that start with `term`.
            for (var i = 0 ; i < list.length && results.length < 10; i++) {
                var item = list[i].PayDesc;
                if (item.toLowerCase().indexOf(q) === 0)
                    results.push({ label: item, value: item });
            }

            return results;
        }

        // Autocomplete options
        $scope.autocomplete_options = {
            suggest: suggest
        };

        // Search: get list Bonus
        $scope.searchFn = function () {
            // remove selected of current row in table
            $scope.useIndex = -1;
            $scope.search.CompanyId = $scope.search.CompanyId;
            var companyCd = null;
            var company = $filter('filter')($scope.listCompanies, { Id: $scope.search.CompanyId });
            if (company.length > 0) {
                companyCd = company[0].CompanyCd;
            }
            // onChange after Search
            $scope.onChangeCompany($scope.search.CompanyId);
            $scope.onChangeMonthYear();
            var tmpYearMonth = $scope.input.YearMonth;
            if (!isNullorEmpty(tmpYearMonth)) {
                $scope.search.YearMonth = tmpYearMonth.substr(3, 4) + tmpYearMonth.substr(0, 2);
            }
            $scope.search.PayDesc = $scope.search.PayDesc;
            apiService.get('api/Bonus', { params: $scope.search }, function (response) {
                // return fomat is frist of YearMonth
                $scope.search.YearMonth = tmpYearMonth;
                $scope.listOtherPays = response.data.ListOtherPays;
                convertToDateFromListOtherPay();
                $scope.errorMessage = response.data.Messages;
                $scope.isErrorMessage = response.data.ShowMessage;
                if ($scope.editable === true) {
                    controlFn(MODE_EDIT);
                } else {
                    controlFn(MODE_VIEW);
                }
            }, function (response) {
                toastr.warning(response.data.Messages);
                $scope.listOtherPays = response.data.ListOtherPays;
                controlFn(MODE_VIEW);
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
                    // remove selected of current row in table
                    $scope.useIndex = -1;
                    setDataToInput();
                    apiService.post('/api/Bonus', $scope.paramInput, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-success';
                        toastr.success($scope.errorBodyMessage);
                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.searchFn();
                        cached = null;
                        resetForm();
                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-danger';
                        toastr.error($scope.errorBodyMessage);
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
                    // remove selected of current row in table
                    $scope.useIndex = -1;
                    setDataToInput();
                    apiService.put('/api/Bonus', $scope.paramInput, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-success';
                        toastr.success($scope.errorBodyMessage);
                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.searchFn();
                        cached = null;
                        resetForm();
                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-danger';
                        toastr.error($scope.errorBodyMessage);
                    })
                }
            });
        }

        // Delete to Database
        $scope.deleteFn = function () {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    // remove selected of current row in table
                    $scope.useIndex = -1;
                    var param = {
                        companyId: $scope.input.CompanyId,
                        id: $scope.input.Id,
                        updatedDt: $scope.input.UpdatedDt,
                        yearMonth: $scope.input.YearMonth.substr(3, 4) + $scope.input.YearMonth.substr(0, 2)
                    }
                    apiService.del('/api/Bonus', { params: param }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-success';
                        toastr.success($scope.errorBodyMessage);
                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.searchFn();
                        cached = null;
                        resetForm();

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data.Messages;
                        $scope.classBodyMessage = 'alert-danger';
                        toastr.error($scope.errorBodyMessage);
                    })
                }
            });
        }

        // Cancel
        $scope.cancelFn = function () {
            if (cached != null) {
                $scope.doEditDataFn(cached, $scope.form.bonusForm);
            } else {
                resetForm();
                if (angular.isDefined($scope.form)) {
                    $scope.form.bonusForm.resetForm();
                }
            }

            if ($scope.classBodyMessage !== 'alert-success') {
                // clear message
                $scope.isBodyMessage = false;
                $scope.errorBodyMessage = [];
                $scope.classBodyMessage = '';
            }
        }

        // Import file
        $scope.importFn = function () {
            // Show message confirm 
            dialogService.confirm({ message: $messages.ConfirmImport }, function (confirm) {
                // Check to require before Import file
                if (isErrorCheckBeforeImport()) {
                    return;
                }
                if (confirm) {
                    $scope.paramInput = {
                        CompanyId: $scope.input.CompanyId,
                        YearMonth: $scope.search.YearMonth.substr(3, 4) + $scope.search.YearMonth.substr(0, 2),
                        DistributionFlag: $scope.input.DistributionFlag,
                        DistributionMonths: $scope.input.DistributionMonths,
                    };
                    var url = 'api/Bonus/import/' + $scope.paramInput.CompanyId + '/' + $scope.paramInput.YearMonth
                    + '/' + $scope.paramInput.DistributionFlag + '/' + $scope.paramInput.DistributionMonths;
                    apiService.upload(url, $scope.file, function (response) {
                        toastr.success(response.data.Message);
                        apiService.download(response.data.LogFile);
                        $scope.searchFn();
                        cached = null;
                        resetForm();
                    }, function (response) {
                        // Show error message
                        toastr.error(response.data);
                    });
                }
            });
        }

        // Change file
        $scope.changeFile = function (file) {
            if (file !== null) {
                $scope.file = file;
            }
        }

        // Check to require before Import file
        function isErrorCheckBeforeImport() {
            if (isNullorEmpty($scope.file)) {
                toastr.error($messages.AlertRequiredImport);
                return true;
            }

            if ($scope.input.DistributionFlag == "0") {
                dialogService.confirm({ message: $messages.ErrorDistribution }, function (confirm) {
                    if (!confirm) {
                        return true;
                    }
                });
            }
            else {
                if (isNullorEmpty($scope.input.DistributionMonths)) {
                    toastr.error($messages.RequiredDistributionMonths);
                    return true;
                }
            }

            return false;
        }

        // Set data init of server to client
        function setDataInit(dataModel) {
            $scope.listCompanies = dataModel.ListCompanies;
            $scope.listCurrencies = dataModel.ListCurrencies;
            $scope.listDescriptions = dataModel.ListDescriptions;
            $scope.input.Unit = dataModel.ListCurrencies[0].Cd;
            $scope.search.YearMonth = dataModel.DefaultYearMonth.substr(4, 2) + "/" + dataModel.DefaultYearMonth.substr(0, 4);
            $scope.input.YearMonth = $scope.search.YearMonth;
            $scope.listOtherPays = dataModel.ListOtherPays;
            $scope.validationOptions = dataModel.Validator;
            // user role
            $scope.editable = dataModel.Editable;
            convertToDateFromListOtherPay();
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
                $scope.input.CompanyId = angular.copy($scope.search.CompanyId);
            }
        }

        // onChange by YearMonth
        $scope.onChangeMonthYear = function () {
            $scope.input.YearMonth = $scope.search.YearMonth;
        }

        // Process to click hyperlink on table
        $scope.doEditDataFn = function (otherPay, bonusForm, index) {
            $scope.useIndex = index;
            $scope.input.Id = otherPay.Id;
            $scope.input.UpdatedDt = otherPay.UpdatedDt;
            $scope.employeeDto = {
                EmployeeNo: otherPay.EmployeeNo,
                EmployeeName: otherPay.EmployeeName
            }
            $scope.input.EmployeeNo = otherPay.EmployeeNo;
            $scope.input.PayDesc = otherPay.PayDesc;

            $scope.input.Value = otherPay.Value;
            //$scope.input.Unit = otherPay.Unit;
            var currency = $filter('filter')($scope.listCurrencies, { Value: otherPay.Unit });
            if (currency.length > 0) {
                $scope.input.Unit = currency[0].Cd;
            }
            $scope.input.DistributionFlag = otherPay.DistributionFlag;
            $scope.input.DistributionMonths = otherPay.DistributionMonths;

            // copy model to cache
            cached = angular.copy(otherPay);
            bonusForm.resetForm();
            controlFn(MODE_UPDATE);
        }

        // Convert from string of server to date angularjs
        function convertToDateFromListOtherPay() {
            angular.forEach($scope.listOtherPays, function (e) {
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

        // Set data to area input of Form
        function setDataToInput() {
            var tmpYearMonth = null;
            if (!isNullorEmpty($scope.input.YearMonth)) {
                tmpYearMonth = $scope.input.YearMonth.substr(3, 4) + $scope.input.YearMonth.substr(0, 2);
            }

            var unitValue = "";
            var currency = $filter('filter')($scope.listCurrencies, { Cd: $scope.input.Unit });
            if (currency.length > 0) {
                unitValue = currency[0].Value;
            }
            $scope.paramInput = {
                Id: $scope.input.Id,
                EmployeeNo: $scope.employeeDto.EmployeeNo,
                PayType: FLAG_YES,
                PayDesc: $scope.input.PayDesc,
                Value: $scope.input.Value,
                Unit: unitValue,
                YearMonth: tmpYearMonth,
                DistributionFlag: $scope.input.DistributionFlag,
                DistributionMonths: $scope.input.DistributionMonths,
                UpdatedDt: $scope.input.UpdatedDt,
                CompanyId: $scope.input.CompanyId
            };
        }

        // Reset data of Form is blank
        function resetForm() {
            $scope.input.Id = null;
            $scope.input.EmployeeNo = null;
            $scope.input.PayType = null;
            $scope.input.PayDesc = null;
            $scope.input.Value = null;
            $scope.input.DistributionFlag = FLAG_NO;
            $scope.input.DistributionMonths = null;
            $scope.input.UpdatedDt = null;
            $scope.employeeDto = {
                EmployeeNo: null,
                EmployeeName: null
            }
            $scope.file = null;
            $scope.input.Unit = $scope.listCurrencies[0].Cd;
        }

        // Check Validate in Client
        function validateInsertUpdate() {
            $scope.isBodyMessage = false;
            if ($scope.form.bonusForm.validate() == false) {
                var errorsStr = "";
                angular.forEach($scope.form.bonusForm.errorList(), function (value, key) {
                    errorsStr += value + '<br>';
                }, []);
                toastr.error(errorsStr);
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

    var DEFAULT_PRECISION = 2;

    app.directive('currencyInput', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                $element.addClass('numberInput');
                var separators = {
                    'thousands': $filter('number')(1000).substr(1, 1),
                    'decimal': $filter('number')(1.1).substr(1, 1)
                }

                var decimalEntered = true;
                var listener = function () {
                    var value = $element.val().split(separators.thousands).join('').split(separators.decimal).join('.');
                    if (decimalEntered) {
                        decimalEntered = false;
                        return;
                    }
                    if (value.indexOf('.') > 1 && value.slice(-1) == '0') { $element.val(value); return; }
                    //$element.val($filter('number')(value));
                    // sonvh: add DEFAULT_PRECISION(fractionSize) in $filter
                    $element.val($filter('number')(value, DEFAULT_PRECISION));
                }

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.split(separators.thousands).join('').split(separators.decimal).join('.');
                })

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('number')(ngModelCtrl.$viewValue, false))
                }

                $element.bind('change', listener)
                $element.bind('keypress', function (event) {
                    var key = event.which;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 0 || key == 8 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return
                    }
                    // ignore all other keys which we do not need
                    if (
                        String.fromCharCode(key) != separators.thousands
                        && String.fromCharCode(key) != separators.decimal
                        && !(48 <= key && key <= 57)
                        && String.fromCharCode(key) != '-'
                        ) {
                        event.preventDefault();
                        return;
                    }
                    if (String.fromCharCode(key) == separators.decimal) decimalEntered = true;
                    $browser.defer(listener) // Have to do this or changes don't get picked up properly
                })

                $element.bind('paste cut', function () {
                    $browser.defer(listener)
                })
            }
        }
    })

})(angular.module('KyuyoApp'));