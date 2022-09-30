'use strict'
var REGEX_CODE = /[^a-zA-Z 0-9]+/g;
// Define angualarJS controller
var app = angular.module('CustomerApplication', ['ngAnimate', 'ui.sortable']);
app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(true);
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});
app.controller('CustomerController', function ($scope, $http, $filter, CustomerData) {
    // List Customer for select NSO-Planner
    $scope.CustomerTypeListForNSO = {
        3: { ID: 3, Value: "CBP" },
        4: { ID: 4, Value: "Customers" }
    };
    // List Customer for select IT-Admin
    $scope.CustomerTypeListForIT = {
        2: { ID: 2, Value: "NSO" },
        3: { ID: 3, Value: "CBP" }
    };
    // List Customer for select HQ-Users
    $scope.CustomerTypeListForHQ = {
        3: { ID: 3, Value: "CBP" }
    };
    // Display in console summary or not
    $scope.DisplayInConsoleSummary = {
        true: { ID: true, Value: "Yes" },
        false: { ID: false, Value: "No" }
    };

    // Set data for model
    $scope.setData = function (data, init) {
        $scope.selectedDivisionID = data.SelectedDivisionID;
        $scope.selectedCompanyID = data.SelectedCompanyID;
        if ($scope.RoleID == 1 || $scope.RoleID == 2 || $scope.RoleID == 3) {
            $scope.CustomerTypeFilterListDropDownList.selectedCustomerType = -1;
            if ($scope.selectedCompanyID == 1) {
                if ($scope.RoleID == 1)
                {
                    $scope.CustomerTypeFilterListDropDownList.List = cloneObject($scope.CustomerTypeListForIT);
                }
                else {
                    $scope.CustomerTypeFilterListDropDownList.List = cloneObject($scope.CustomerTypeListForHQ);
                }
                $scope.isActiveCreation = true;
            }
            else {
                $scope.CustomerTypeFilterListDropDownList.List = cloneObject($scope.CustomerTypeListForNSO);
                $scope.isActiveCreation = false;
            }
            $scope.CustomerTypeFilterListDropDownList.List[-1] = { ID: -1, Value: "ALL" };
            $scope.CompanyDropdownList = {};
            $scope.CompanyDropdownList.selectedCompanyID = $scope.selectedCompanyID;
            $scope.CompanyDropdownList.List = cloneObject(data.CompanyDropdownList);
        }
        else if ($scope.RoleID == 5) {
            $scope.isActiveCreation = true;
        }
        $scope.ListCustomerTable = data.ListCustomerTable;
        $scope.userInformation = data.UserInformation;
        $scope.ListCountries = data.ListCountries;
        $scope.ErrorMessage = data.ErrorMessage;
        $scope.InforMessage = data.InforMessage;
        $scope.InforMessagePopup = data.InforMessagePopup;
        $scope.ErrorMessagePopup = data.ErrorMessagePopup;
        $scope.WarningMessage = data.WarningMessage;
        $scope.DisplayCustomerList = convertObjectPropertyToArray($scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID]);
        $scope.DisplayCustomerList.sort(function (a, b) { return (a.Priority < 0 || b.Priority < 0) ? b.Priority - a.Priority : a.Priority - b.Priority })
        $scope.OldDisplayCustomerList = [];
        angular.forEach($scope.DisplayCustomerList, function (customer) {
            $scope.OldDisplayCustomerList.push(cloneObject(customer));
        });
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
            });
        }, 100);
    };

    // Initalize function
    $scope.Initialize = function () {
        $scope.RoleID = CustomerData.RoleID;
        $scope.CustomerTypeFilterListDropDownList = {};
        $scope.setData(CustomerData.customerModel, true)
        $scope.CustomerTypeListDropDownList = {};
        $scope.DivisionDropDownList = {};
        $scope.DivisionDropDownList.selectedDivisionID = parseInt(Object.keys(CustomerData.customerModel.ListDivisionAccess)[0]);
        $scope.DivisionDropDownList.List = cloneObject(CustomerData.customerModel.ListDivisionAccess);
        $scope.CountriesDropDownList = {};
        $scope.CountriesDropDownList.List = cloneObject(CustomerData.customerModel.ListCountries);
        $scope.CountriesDropDownList.selectedCountryID = $filter("orderByCountry")($scope.CountriesDropDownList.List, "ISOCode")[0].CountryID;
        $scope.CountriesFilterDropDownList = {};
        $scope.CountriesFilterDropDownList.selectedCountryID = -1;
        $scope.CountriesFilterDropDownList.List = cloneObject(CustomerData.customerModel.ListCountries);
        $scope.CountriesFilterDropDownList.List[-1] = { CountryID: -1, DisplayName: "ALL", ISOCode: "ALL" };
        if ($scope.RoleID == 5) {
            $scope.CustomerTypeListDropDownList.selectedCustomerType = 4;
            $scope.CustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForNSO);
            $scope.CustomerTypeFilterListDropDownList.selectedCustomerType = -1;
            $scope.CustomerTypeFilterListDropDownList.List = cloneObject($scope.CustomerTypeListForNSO);
            $scope.CustomerTypeFilterListDropDownList.List[-1] = { ID: -1, Value: "ALL" };
        }
        else if ($scope.RoleID == 1 || $scope.RoleID == 2 || $scope.RoleID == 3) {
            if ($scope.RoleID == 1) {
                $scope.CustomerTypeListDropDownList.selectedCustomerType = 3;
                $scope.CustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForIT);
            }
            else {
                $scope.CustomerTypeListDropDownList.selectedCustomerType = 3;
                $scope.CustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForHQ);
            }
            $scope.ConsoleSummaryDisplayDropDownList = {};
            $scope.ConsoleSummaryDisplayDropDownList.selectedValue = true;
            $scope.ConsoleSummaryDisplayDropDownList.List = cloneObject($scope.DisplayInConsoleSummary);
            $scope.ConsoleSummaryDisplayFilterDropDownList = {};
            $scope.ConsoleSummaryDisplayFilterDropDownList.selectedValue = -1;
            $scope.ConsoleSummaryDisplayFilterDropDownList.List = {};
            $scope.ConsoleSummaryDisplayFilterDropDownList.List[-1] = { ID: -1, Value: "ALL" };
            $scope.ConsoleSummaryDisplayFilterDropDownList.List[true] = { ID: true, Value: "Yes" }
            $scope.ConsoleSummaryDisplayFilterDropDownList.List[false] = { ID: false, Value: "No" }
        }
        $scope.companyAbbreviation = CustomerData.customerModel.CompanyAbbreviation;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        $scope.isInforMessagePopup = false;
        $scope.isErrorMessagePopup = false;
        $scope.isChange = false;
        $scope.isChangeEdit = false;
        $scope.WarningMessageDisplay = "";
        $scope.CustomerIDtoDelete = null;
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
            });
        }, 100);
        $('#customer-loading').hide();
    }

    // catch customer code input change
    $scope.checkCustomerCode = function () {
        if ($scope.CustomerCodeInput) {
            $scope.CustomerCodeInput = $scope.CustomerCodeInput.split(" ").join("");
            $scope.CustomerCodeInput = $scope.CustomerCodeInput.replace(REGEX_CODE, '');
        }
        if ($scope.CustomerCodeFilter) {
            $scope.CustomerCodeFilter = $scope.CustomerCodeFilter.split(" ").join("");
            $scope.CustomerCodeFilter = $scope.CustomerCodeFilter.replace(REGEX_CODE, '');
        }
        if ($scope.PopupCustomerCodeInput) {
            $scope.PopupCustomerCodeInput = $scope.PopupCustomerCodeInput.split(" ").join("");
            $scope.PopupCustomerCodeInput = $scope.PopupCustomerCodeInput.replace(REGEX_CODE, '');
        }
    }

    // Disable space key
    $scope.RestrictSpace = function ($event) {
        if ($event.keyCode == 32) {
            $event.preventDefault();
            return false;
        }
    }

    // catch Reset button click event
    $scope.ResetClick = function () {
        $scope.CustomerCodeInput = "";
        $scope.CustomerNameInput = "";
        $scope.CustomerAbbreviationInput = "";
        $scope.CountriesDropDownList.selectedCountryID = $filter("orderByCountry")($scope.CountriesDropDownList.List, "ISOCode")[0].CountryID;
        if ($scope.RoleID == 5) {
            $scope.CustomerTypeListDropDownList.selectedCustomerType = 4;
        }
        else if ($scope.RoleID == 1 || $scope.RoleID == 2 || $scope.RoleID == 3) {
            $scope.CustomerTypeListDropDownList.selectedCustomerType = 3;
            $scope.ConsoleSummaryDisplayDropDownList.selectedValue = true;
        }
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        $scope.isInforMessagePopup = false;
        $scope.isErrorMessagePopup = false;
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
            });
        }, 100);
    }

    // catch edit customer click event
    $scope.OpenPopup = function (CustomerID) {
        $scope.PopupCustomerID = CustomerID;
        $scope.PopupCustomerCodeInput = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CustomerCode;
        $scope.PopupCustomerNameInput = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CustomerName;
        $scope.PopupCustomerAbbreviationInput = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CustomerAbbreviation;
        $scope.PopupCountriesDropDownList = {};
        $scope.PopupCountriesDropDownList.selectedCountryID = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CountryID;
        $scope.PopupCountriesDropDownList.List = cloneObject(CustomerData.customerModel.ListCountries);
        $scope.PopupCustomerTypeListDropDownList = {}
        $scope.PopupCustomerTypeListDropDownList.selectedCustomerType = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CustomerType;
        if ($scope.RoleID == 5) {
            $scope.PopupCustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForNSO);
        }
        else if ($scope.RoleID == 1 || $scope.RoleID == 2 || $scope.RoleID == 3) {
            if ($scope.selectedCompanyID == 1) {
                if ($scope.RoleID == 1) {
                    $scope.PopupCustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForIT);
                }
                else {
                    $scope.PopupCustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForHQ);
                }
            }
            else {
                $scope.PopupCustomerTypeListDropDownList.List = cloneObject($scope.CustomerTypeListForNSO);
            }
            $scope.PopupConsoleSummaryDisplayDropDownList = {};
            $scope.PopupConsoleSummaryDisplayDropDownList.selectedValue = $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].ConsoleSummaryDisplay;;
            $scope.PopupConsoleSummaryDisplayDropDownList.List = cloneObject($scope.DisplayInConsoleSummary);
        }
        $scope.isInforMessagePopup = false;
        $scope.isErrorMessagePopup = false;
        $('#edit-cus').modal({
            backdrop: 'static',
            keyboard: false
        });
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
            });
        }, 100);
    }

    // catch create Click event
    $scope.CreateCustomerClick = function () {
        if (!$scope.CustomerCodeInput || !$scope.CustomerAbbreviationInput || !$scope.CustomerNameInput || !$scope.isActiveCreation) {
            return;
        }
        else {
            $('#customer-loading').show();
            $http({
                method: 'POST',
                url: '/Customer/CreateCustomer',
                data: {
                    customerCode: $scope.CustomerCodeInput,
                    customerName: $scope.CustomerNameInput,
                    customerType: $scope.CustomerTypeListDropDownList.selectedCustomerType,
                    consoleSummaryDisplay: $scope.ConsoleSummaryDisplayDropDownList?$scope.ConsoleSummaryDisplayDropDownList.selectedValue:false,
                    countryID: $scope.CountriesDropDownList.selectedCountryID,
                    customerAbbreviation: $scope.CustomerAbbreviationInput,
                    divisionID: $scope.DivisionDropDownList.selectedDivisionID
                }
            }).success(function (data, status, headers, config) {
                console.debug(data);
                if (data != null) {
                    $scope.setData(data, false);
                    if (data.InforMessage != null) {
                        $scope.ResetClick();
                        $scope.isInforMessage = true;
                    }
                    else {
                        $scope.isInforMessage = false;
                    }
                    if (data.ErrorMessage != null) {
                        $scope.isErrorMessage = true;
                    }
                    else {
                        $scope.isErrorMessage = false;
                    }
                }
                else {
                    redirecToErrorPage();
                }
                $('#customer-loading').hide();
            }).error(function (data, status, headers, config) {
                redirecToErrorPage();
            });
        }
    }

    // catch update Click event
    $scope.UpdateCustomerClick = function () {
        if (!$scope.PopupCustomerCodeInput || !$scope.PopupCustomerAbbreviationInput || !$scope.PopupCustomerNameInput) {
            return;
        }
        else {
            $('#customer-loading').show();
            $http({
                method: 'POST',
                url: '/Customer/UpdateCustomer',
                data: {
                    customerID: $scope.PopupCustomerID,
                    customerCode: $scope.PopupCustomerCodeInput,
                    customerName: $scope.PopupCustomerNameInput,
                    customerType: $scope.PopupCustomerTypeListDropDownList.selectedCustomerType,
                    consoleSummaryDisplay: $scope.PopupConsoleSummaryDisplayDropDownList?$scope.PopupConsoleSummaryDisplayDropDownList.selectedValue:false,
                    countryID: $scope.PopupCountriesDropDownList.selectedCountryID,
                    customerAbbreviation: $scope.PopupCustomerAbbreviationInput,
                    divisionID: $scope.DivisionDropDownList.selectedDivisionID
                }
            }).success(function (data, status, headers, config) {
                console.debug(data);
                if (data != null) {
                    $scope.setData(data, false);
                    if (data.InforMessagePopup != null) {
                        $scope.isInforMessagePopup = true;
                    }
                    else {
                        $scope.isInforMessagePopup = false;
                    }
                    if (data.ErrorMessagePopup != null) {
                        $scope.isErrorMessagePopup = true;
                    }
                    else {
                        $scope.isErrorMessagePopup = false;
                    }
                    if (!data.InforMessagePopup && !data.ErrorMessagePopup) {
                        $("#edit-cus").modal('hide');
                    }
                    $('#customer-loading').hide();
                }
                else {
                    redirecToErrorPage();
                }
            }).error(function (data, status, headers, config) {
                redirecToErrorPage();
            });
        }
    }

    // show popup confirm
    $scope.showPopupConfirm = function () {
        var resultCheck = false;
        if ($scope.PopupCustomerCodeInput != $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID]
            [$scope.PopupCustomerID].CustomerCode || $scope.PopupCustomerNameInput != $scope.ListCustomerTable
            [$scope.selectedDivisionID + "." + $scope.selectedCompanyID][$scope.PopupCustomerID].CustomerName ||
            $scope.PopupCustomerAbbreviationInput != $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID]
            [$scope.PopupCustomerID].CustomerAbbreviation ||
            $scope.PopupCountriesDropDownList.selectedCountryID != $scope.ListCustomerTable
            [$scope.selectedDivisionID + "." + $scope.selectedCompanyID][$scope.PopupCustomerID].CountryID ||
            $scope.PopupCustomerTypeListDropDownList.selectedCustomerType != $scope.ListCustomerTable
            [$scope.selectedDivisionID + "." + $scope.selectedCompanyID][$scope.PopupCustomerID].CustomerType) {
            resultCheck = true;
        }
        if ($scope.RoleID == 1 || $scope.RoleID == 2 || $scope.RoleID == 3) {
            if ($scope.PopupConsoleSummaryDisplayDropDownList.selectedValue != $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][$scope.PopupCustomerID].ConsoleSummaryDisplay) {
                resultCheck = true;
            }
        }
        if (resultCheck) {
            $("#cancel-confirmation").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
        else {
            $("#edit-cus").modal('hide');
        }
    }

    // Close Edit popup
    $scope.doCloseEditPopup = function () {
        $("#edit-cus").modal('hide');
    }

    // catch update Click event
    $scope.DeleteCustomerClick = function (CustomerID) {
        if (CustomerID) {
            $scope.CustomerIDtoDelete = CustomerID;
            $scope.WarningMessageDisplay = $scope.WarningMessage.replace("{0}", $scope.ListCustomerTable[$scope.selectedDivisionID + "." + $scope.selectedCompanyID][CustomerID].CustomerCode);
            $("#delete-confirmation").modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $('#customer-loading').show();
        $http({
            method: 'POST',
            url: '/Customer/DeleteCustomer',
            data: {
                customerID: $scope.CustomerIDtoDelete,
                divisionID: $scope.DivisionDropDownList.selectedDivisionID
            }
        }).success(function (data, status, headers, config) {
            console.debug(data);
            if (data != null) {
                $scope.setData(data, false);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                else {
                    $scope.isInforMessage = false;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
                else {
                    $scope.isErrorMessage = false;
                }
            }
            else {
                redirecToErrorPage();
            }
            $('#customer-loading').hide();
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    // catch Changed Division event
    $scope.DivisionChanged = function () {
        $scope.isChange = false;
        $('#customer-loading').show();
        $http({
            method: 'POST',
            url: '/Customer/DivisionChanged',
            data: {
                selectedDivisionID: $scope.DivisionDropDownList.selectedDivisionID,
                selectedCompanyID: $scope.selectedCompanyID
            }
        }).success(function (data, status, headers, config) {
            console.debug(data);
            if (data != null) {
                $scope.setData(data, false);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                else {
                    $scope.isInforMessage = false;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
                else {
                    $scope.isErrorMessage = false;
                }
            }
            else {
                redirecToErrorPage();
            }
            $('#customer-loading').hide();
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    // catch Changed Company event
    $scope.CompanyChanged = function () {
        $scope.isChange = false;
        $('#customer-loading').show();
        $http({
            method: 'POST',
            url: '/Customer/CompanyChanged',
            data: {
                selectedDivisionID: $scope.DivisionDropDownList.selectedDivisionID,
                selectedCompanyID: $scope.CompanyDropdownList.selectedCompanyID
            }
        }).success(function (data, status, headers, config) {
            console.debug(data);
            if (data != null) {
                $scope.setData(data, false);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                else {
                    $scope.isInforMessage = false;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
                else {
                    $scope.isErrorMessage = false;
                }
            }
            else {
                redirecToErrorPage();
            }
            $('#customer-loading').hide();
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    // catch Save Priority click event
    $scope.PrioritySave = function () {
        $scope.isChange = false;
        $('#customer-loading').show();
        $http({
            method: 'POST',
            url: '/Customer/PrioritySave',
            data: {
                selectedDivisionID: $scope.DivisionDropDownList.selectedDivisionID,
                selectedCompanyID: $scope.CompanyDropdownList.selectedCompanyID,
                DisplayCustomerList: JSON.stringify($scope.DisplayCustomerList)
            }
        }).success(function (data, status, headers, config) {
            console.debug(data);
            if (data != null) {
                $scope.setData(data, false);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                else {
                    $scope.isInforMessage = false;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
                else {
                    $scope.isErrorMessage = false;
                }
            }
            else {
                redirecToErrorPage();
            }
            $('#customer-loading').hide();
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    //catch reset priority event
    $scope.ResetPriority = function () {
        $scope.DisplayCustomerList = [];
        angular.forEach($scope.OldDisplayCustomerList, function (customer) {
            $scope.DisplayCustomerList.push(cloneObject(customer));
        });
        $scope.isChange = false;
    }

    // Drag drag sortable
    $scope.sortableOptions = {
        update: function (e, ui) {
            if (ui.item.sortable.model.Priority < 0 || $scope.DisplayCustomerList[ui.item.sortable.dropindex].Priority < 0) {
                ui.item.sortable.cancel();
            }
            else {
                $scope.isChange = true;
                $scope.DisplayCustomerList[ui.item.sortable.index].Priority = $scope.DisplayCustomerList[ui.item.sortable.dropindex].Priority;
                // move up
                if (ui.item.sortable.dropindex < ui.item.sortable.index) {
                    // swap priority
                    for (var i = ui.item.sortable.dropindex; i < ui.item.sortable.index; i++) {
                        $scope.DisplayCustomerList[i].Priority += 1;
                    }
                }
                    // move down
                else if (ui.item.sortable.dropindex > ui.item.sortable.index) {
                    // swap priority
                    for (var i = ui.item.sortable.index +1; i <= ui.item.sortable.dropindex; i++) {
                        $scope.DisplayCustomerList[i].Priority -= 1;
                    }
                }
            }
        }
    };
});

// filter customer
app.filter('filterCustomer', function () {
    return function (items, customerCode, customerName, customerAbbr, customerType, consoleSummaryDisplay, countryID) {
        var filtered = [];
        if (!customerCode && !customerName && !customerAbbr && (customerType == -1 || !customerType)
            && (consoleSummaryDisplay == -1) && (countryID == -1 || !countryID)) {
            return items;
        }
        angular.forEach(items, function (value) {
            if ((!customerCode ? true : value.CustomerCode.toLowerCase().indexOf(customerCode.toLowerCase()) != -1)
                && (!customerName ? true : value.CustomerName.toLowerCase().indexOf(customerName.toLowerCase()) != -1)
                && (!customerAbbr ? true : value.CustomerAbbreviation.toLowerCase().indexOf(customerAbbr.toLowerCase()) != -1)
                && ((!customerType || customerType == -1) ? true : value.CustomerType == customerType)
                && (consoleSummaryDisplay == -1 ? true : value.ConsoleSummaryDisplay == consoleSummaryDisplay)
                && ((!countryID || countryID == -1) ? true : value.CountryID == countryID)) {
                filtered.push(value);
            }
        })
        return filtered;
    };
});

// Order customer
app.filter('orderCustomerBy', function () {
    return function (object, attribute) {
        if (!angular.isObject(object)) return object;

        var array = [];
        for (var objectKey in object) {
            array.push(object[objectKey]);
        }
        array.sort(function (a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            if (a < 0 || b < 0) {
                return b - a;
            }
            return a - b;
        });
        return array;
    }
});

// Order object
app.filter('orderObjectBy', function () {
    return function (object, attribute) {
        if (!angular.isObject(object)) return object;

        var array = [];
        for (var objectKey in object) {
            array.push(object[objectKey]);
        }
        array.sort(function (a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return a - b;
        });
        return array;
    }
});

// Order object
app.filter('orderByCountry', function () {
    return function (object, attribute) {
        if (!angular.isObject(object)) return object;

        var array = [];
        for (var objectKey in object) {
            array.push(object[objectKey]);
        }
        array.sort(function (a, b) {
            var t1 = a[attribute];
            var t2 = b[attribute];
            if (t1.toLowerCase() == 'all') return -1;
            if (t2.toLowerCase() == 'all') return 1;
            if (t1 < t2) return -1;
            else return 1;
            return 0;
        });
        return array;
    }
});