(function (app) {
    'use strict';

    app.controller('SalaryCalculateCtrl', SalaryCalculateCtrl);

    SalaryCalculateCtrl.$inject = ['$scope', '$rootScope', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function SalaryCalculateCtrl($scope, $rootScope, $filter, $messages, $strings, apiService, dataService, dialogService) {

        $scope.APP_FLAG_CALC = "0";      // đang tính lương
        $scope.APP_FLAG_REQU = "1";      // Yêu cầu xác nhận
        $scope.APP_FLAG_APPR = "2";      // approved
        $scope.APP_FLAG_CLOS = "3";      // closing

        var editable = false;

        $scope.init = function (model) {
            console.log(model)
            $scope.listUnit = model.ListUnit;
            $scope.listCompany = model.ListCompany;
            $scope.closingTxt = model.ClosingTxt;

            $scope.validationOptions = model.Validator;
            $scope.validationSearchOptions = model.SearchValidator;

            $scope.exchangeRate = {
                USD: {
                    Rate: '',
                    EffectiveDt1: ''
                },
                JPY: {
                    Rate: '',
                    EffectiveDt1: ''
                }
            }

            $scope.search = {
                CompanyCd: null,
                YearMonth1: ''
            }

            $scope.disabled = {
                btnPayroll: true,
                btnClose: true,
                btnExport: true,
                btnConfirm: true,
                btnImport: true,
                btnBounus: true,
                btnArrear: true,
                btnImportWorkingTime: true,
                btnCalculateAll: true,
                btnRequest: true,
                btnCancelled: true,
                cbGroupCal: true,
                txtRate: true,
                txtEdit: true,
                btnFilter: true
            }

            $scope.model = {};
            initModel();
        }

        $scope.searchFn = function () {

            if (!$scope.form.salaryCalculateSearchForm.validate()) {
                toastr.error($scope.form.salaryCalculateSearchForm.errorList().join('<br>'));
                return;
            };

            $scope.model.CompanyId = $scope.search.CompanyId;
            var company = $filter('filter')($scope.listCompany, { Id: $scope.model.CompanyId });
            if (company.length > 0) {
                $scope.companyName = company[0].CompanyName;
                $scope.yearMonth = $scope.search.YearMonth1;
                $scope.model.YearMonth = dataService.getDate($scope.search.YearMonth1);
                $scope.search.YearMonth = dataService.getDate($scope.search.YearMonth1);
            }

            apiService.get('/api/SalaryCalculate', { params: $scope.search }, function (response) {

                $scope.startDt = response.data.StartDt;
                $scope.listFomular = response.data.ListFormula;
                $scope.listSalary = response.data.ListSalary;
                $scope.closingTxt = response.data.ClosingTxt;
                $scope.model.UpdatedDts = getUpdatedDts();

                // edit controll
                $scope.disabled.btnFilter = false;
                initModel();

                switch (response.data.AppFlag) {
                    case $scope.APP_FLAG_CALC:
                        editable = true;
                        $scope.disabled.btnPayroll = response.data.Disable5;
                        $scope.disabled.cbGroupCal = response.data.Disable5;
                        $scope.disabled.txtRate = response.data.Disable5;
                        $scope.disabled.btnBounus = response.data.Disable5;
                        $scope.disabled.btnArrear = response.data.Disable2;
                        $scope.disabled.btnImport = response.data.Disable5;
                        $scope.disabled.btnImportWorkingTime = response.data.Disable5;
                        $scope.disabled.btnCalculateAll = response.data.Disable2;
                        $scope.disabled.btnExport = false;
                        $scope.disabled.btnRequest = response.data.Disable5;
                        $scope.disabled.btnConfirm = true;
                        $scope.disabled.btnCancelled = true;
                        $scope.disabled.btnClose = true;
                        break;

                    case $scope.APP_FLAG_REQU:
                        editable = false;
                        $scope.disabled.btnPayroll = true;
                        $scope.disabled.cbGroupCal = true;
                        $scope.disabled.txtRate = true;
                        $scope.disabled.btnBounus = true;
                        $scope.disabled.btnArrear = true;
                        $scope.disabled.btnImport = true;
                        $scope.disabled.btnImportWorkingTime = true;
                        $scope.disabled.btnCalculateAll = true;
                        $scope.disabled.btnExport = false;
                        $scope.disabled.btnRequest = true;
                        $scope.disabled.btnConfirm = response.data.Disable3;
                        $scope.disabled.btnCancelled = response.data.Disable5;
                        $scope.disabled.btnClose = true;
                        break;
                    case $scope.APP_FLAG_APPR:
                        editable = false;
                        $scope.disabled.btnPayroll = true;
                        $scope.disabled.cbGroupCal = true;
                        $scope.disabled.txtRate = true;
                        $scope.disabled.btnBounus = true;
                        $scope.disabled.btnArrear = true;
                        $scope.disabled.btnImport = true;
                        $scope.disabled.btnImportWorkingTime = true;
                        $scope.disabled.btnCalculateAll = true;
                        $scope.disabled.btnExport = false;
                        $scope.disabled.btnRequest = true;
                        $scope.disabled.btnConfirm = true;
                        $scope.disabled.btnCancelled = response.data.Disable5;
                        $scope.disabled.btnClose = response.data.Disable4;
                        break;

                    case $scope.APP_FLAG_CLOS:
                        editable = false;
                        $scope.disabled.btnPayroll = true;
                        $scope.disabled.cbGroupCal = true;
                        $scope.disabled.txtRate = true;
                        $scope.disabled.btnBounus = true;
                        $scope.disabled.btnArrear = true;
                        $scope.disabled.btnImport = true;
                        $scope.disabled.btnImportWorkingTime = true;
                        $scope.disabled.btnCalculateAll = true;
                        $scope.disabled.btnExport = false;
                        $scope.disabled.btnRequest = true;
                        $scope.disabled.btnConfirm = true;
                        $scope.disabled.btnCancelled = true;
                        $scope.disabled.btnClose = true;
                        break;

                    default:
                        editable = true;
                        $scope.disabled.txtRate = response.data.Disable5;
                        $scope.disabled.cbGroupCal = response.data.Disable5;
                        $scope.disabled.txtRate = response.data.Disable5;
                        $scope.disabled.btnPayroll = response.data.Disable5;
                        $scope.disabled.btnBounus = response.data.Disable5;
                        $scope.disabled.btnArrear = response.data.Disable2;
                        $scope.disabled.btnImport = response.data.Disable5;
                        $scope.disabled.btnImportWorkingTime = response.data.Disable5;
                        $scope.disabled.btnCalculateAll = response.data.Disable2;
                        $scope.disabled.btnExport = true;
                        $scope.disabled.btnRequest = true;
                        $scope.disabled.btnConfirm = true;
                        $scope.disabled.btnCancelled = true;
                        $scope.disabled.btnClose = true;
                        break;
                }

            }, function (response) {
                toastr.error(response.data.join('<br>'));
            })

        }

        $scope.disableBtnCal = function(){
            return $scope.disabled.btnBounus && $scope.disabled.btnArrear
                && $scope.disabled.btnImportWorkingTime && $scope.disabled.btnCalculateAll
                && $scope.disabled.btnConfirm && $scope.disabled.btnCancelled;
        }

        $scope.closingFn = function () {
            apiService.post('/api/SalaryCalculate/closing/' + $scope.model.CompanyId, null, function (response) {
                $scope.closingTxt = response.data;
                $scope.searchFn();
            }, function (response) {
                toastr.error(response.data.join('<br>'));
            })
        }

        $scope.confirmFn = function (flag) {

            var message = null;
            var params = {
                CompanyId: $scope.model.CompanyId,
                YearMonth: $scope.model.YearMonth,
                AppFlag: -1,
                UpdatedDts: $scope.model.UpdatedDts
            }

            switch (flag) {
                case $scope.APP_FLAG_CALC:  // ⑨ [Khi click button "Hủy xác nhận"]
                    message = $messages.CancelCal;
                    params.AppFlag = 0
                    break;
                case $scope.APP_FLAG_REQU:  // ⑦ [Khi click button "Yêu cầu xác nhận"]
                    message = $messages.RequestCal;
                    params.AppFlag = 1
                    break;
                case $scope.APP_FLAG_APPR:  // ⑧ [Khi click button "Xác nhận"]
                    message = $messages.ConfirmCal;
                    params.AppFlag = 2
                    break;
                case $scope.APP_FLAG_CLOS:  // ⑩ [Khi click button "Kết sổ"]
                    message = $messages.ClosingCal;
                    params.AppFlag = 3
                    break;
            }

            dialogService.confirm({ message: message }, function (confirm) {
                if (confirm) {
                    apiService.post('/api/SalaryCalculate/confirm', params, function (response) {
                        toastr.success(response.data.Message);
                        $scope.closingTxt = response.data.ClosingTxt;

                        //カ. Lấy lại danh sách lương nhân viên và dữ liệu lương
                        $scope.searchFn();
                    }, function (response) {
                        toastr.error(response.data.join('<br>'));
                    })
                }
            })
        }

        $scope.importFn = function () {

        }

        $scope.getRateFn = function (unit) {

            var params = {
                CompanyId: $scope.model.CompanyId,
                YearMonth: $scope.model.YearMonth,
                Unit: unit
            }

            apiService.get('/api/SalaryCalculate/exchangeRate', { params: params }, function (response) {
                $scope.exchangeRate[unit] = response.data;
                $scope.exchangeRate[unit].EffectiveDt1 = dataService.getFormatDate(response.data.EffectiveDt)
            }, function (response) {
                toastr.error(response.data.join('<br>'));
            })
        }

        $scope.editFn = function (salary, index) {

            $scope.disabled.txtEdit = !editable;

            $scope.selected = index;
            $scope.model.EmployeeName = salary.EmployeeName;
            $scope.model.EmployeeNo = salary.EmployeeNo;
            $scope.model.Status = salary.Status;
            $scope.model.Other = salary.Other;
            $scope.model.OtherUnit = salary.OtherUnit;

            if (angular.isUndefined($scope.model.OtherUnit)) {
                $scope.model.OtherUnit = $scope.listUnit[0].Cd;
            }

            $scope.model.OtherRemark = salary.OtherRemark;
            $scope.model.Sabbtical100 = salary.Sabbtical100;
            $scope.model.Sabbtical300 = salary.Sabbtical300;
        }

        $scope.updateFn = function () {
            $scope.form.UpdateForm.resetForm();
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    if (!$scope.form.UpdateForm.validate()) {
                        toastr.error($scope.form.UpdateForm.errorList().join('<br>'));
                        return;
                    };

                    apiService.post('/api/SalaryCalculate', $scope.model, function (response) {
                        toastr.success(response.data);
                        //カ. Lấy lại danh sách lương nhân viên và dữ liệu lương
                        $scope.searchFn();
                    }, function (response) {
                        toastr.error(response.data.join('<br>'));
                    })
                }
            })
        }

        // router
        $scope.goToBounus = function () {
            document.location.href = '/Bonus?companyId=' + $scope.model.CompanyId + '&yearMonth=' + dataService.getYearMonth($scope.yearMonth);
        }

        $scope.goToArrear = function () {
            document.location.href = '/SalaryArrear?companyId=' + $scope.model.CompanyId + '&yearMonth=' + dataService.getDate($scope.yearMonth);
        }

        $scope.goToImportWorkingTime = function () {
            document.location.href = '/ImportWorkingTime?companyId=' + $scope.model.CompanyId + '&yearMonth=' + dataService.getDate($scope.yearMonth);
        }

        $scope.goToReportList = function () {
            document.location.href = '/ReportList?companyId=' + $scope.model.CompanyId + '&yearMonth=' + dataService.getDate($scope.yearMonth);
        }
        // Calculate for a Person Salary
        $scope.calculatePersonSalary = function () {
            // Show message confirm 
            $scope.input = {
                    EmployeeName: "Nhân viên A"
                };
            dialogService.confirm({ message: "Bắt đầu tính lương cho nhân viên " + $scope.input.EmployeeName + "có phải không?" }, function (confirm) {
                if (confirm) {
                    //$scope.paramInput = {
                    //    CompanyId: $scope.input.CompanyId,
                    //    YearMonth: $scope.search.YearMonth.substr(3, 4) + $scope.search.YearMonth.substr(0, 2)
                    //};

                    // dummy data
                    $scope.paramInput = {
                        CompanyId: '4',
                        YearMonth: '12/2016'
                    };
                    var url = 'api/SalaryCalculate/calculatePersonSalary';
                    apiService.post(url, $scope.paramInput, function (response) {
                        toastr.success(response.data.Message);
                        //apiService.download(response.data.LogFile);
                    }, function (response) {
                        // Show error message
                        toastr.error(response.data);
                    });
                }
            });
        }

        // Check to require before Calculate for a Person Salary
        function checkBeforeCalculate() {
            // check USD Rate
            if (isNullorEmpty($scope.exchangeRate.USD.Rate)) {
                toastr.error($messages.AlertRequiredImport);
                return;
            }
            // check USD Effective Date
            if (isNullorEmpty($scope.exchangeRate.USD.EffectiveDt1)) {
                toastr.error($messages.AlertRequiredImport);
                return;
            }
            // check JPY Rate
            if (isNullorEmpty($scope.exchangeRate.JPY.Rate)) {
                toastr.error($messages.AlertRequiredImport);
                return;
            }
            // check JPY Effective Date
            if (isNullorEmpty($scope.exchangeRate.JPY.EffectiveDt1)) {
                toastr.error($messages.AlertRequiredImport);
                return;
            }
            // check Employee
            if (isNullorEmpty($scope.input.EmployeeName)) {
                toastr.error($messages.AlertRequiredImport);
                return;
            }

        }

        // check null or empty
        function isNullorEmpty(object) {
            if (typeof object === 'undefined' || object === null || object == "") {
                return true;
            }
            return false;
        }

        function initModel() {
            $scope.disabled.txtEdit = true;
            $scope.selected = -1;
            $scope.model.EmployeeName = null;
            $scope.model.EmployeeNo = null;
            $scope.model.Status = null;
            $scope.model.Other = null;
            $scope.model.OtherUnit = null;

            if (angular.isUndefined($scope.model.OtherUnit)) {
                $scope.model.OtherUnit = $scope.listUnit[0].Cd;
            }

            $scope.model.OtherRemark = null;
            $scope.model.Sabbtical100 = null;
            $scope.model.Sabbtical300 = null;
        }

        function getUpdatedDts() {
            if (!angular.isArray($scope.listSalary)) {
                return [];
            }
            else {
                return $filter('filter')($scope.listSalary, function (item) {
                    return item.Id != 0;
                }).map(function (item) {
                    return {
                        Id: item.Id,
                        UpdatedDt: item.UpdatedDt
                    }
                })
            }
        }
    }

})(angular.module('KyuyoApp'));