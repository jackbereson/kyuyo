
// Logic
var dfd = $.Deferred();
// Define module angularJS
var app = angular.module("ItemPlanApplication", ['ngAnimate', 'fiestah.money']);
// Setting config $http service
app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(true);
});
// Define controller for angularJS
app.controller("ItemPlanController", function ($scope, $http, $filter, ItemPlanData) {

    $scope.setHeader = function (selectedYear) {
        // Set header for table
        $scope.headerPLAN = {};
        $scope.headerPLAN.Text = "PLAN";
        $scope.headerPLAN.ID = "plan"
        $scope.headerPLAN.Class = "row-header";
        $scope.headerPTERM = {};
        $scope.headerPTERM.Text = "P-TERM";
        $scope.headerPTERM.ID = "pterm";
        $scope.headerPTERM.Class = "col-p-term";
        $scope.headerJAN = {};
        $scope.headerJAN.Text = "JAN";
        $scope.headerJAN.ID = "jan";
        $scope.headerJAN.Class = "";
        $scope.headerFEB = {};
        $scope.headerFEB.Text = "FEB";
        $scope.headerFEB.ID = "feb";
        $scope.headerFEB.Class = "";
        $scope.headerMAR = {};
        $scope.headerMAR.Text = "MAR";
        $scope.headerMAR.ID = "mar";
        $scope.headerMAR.Class = "";
        $scope.headerAPR = {};
        $scope.headerAPR.Text = "APR";
        $scope.headerAPR.ID = "apr";
        $scope.headerAPR.Class = "";
        $scope.headerMAY = {};
        $scope.headerMAY.Text = "MAY";
        $scope.headerMAY.ID = "may";
        $scope.headerMAY.Class = "";
        $scope.headerJUN = {};
        $scope.headerJUN.Text = "JUN";
        $scope.headerJUN.ID = "jun";
        $scope.headerJUN.Class = "";
        $scope.headerH1TOTAL = {};
        $scope.headerH1TOTAL.Text = "H1 TOTAL";
        $scope.headerH1TOTAL.ID = "H1";
        $scope.headerH1TOTAL.Class = "figure-total";
        $scope.headerJUL = {};
        $scope.headerJUL.Text = "JUL";
        $scope.headerH1TOTAL.ID = "jul";
        $scope.headerJUL.Class = "";
        $scope.headerAUG = {};
        $scope.headerAUG.Text = "AUG";
        $scope.headerAUG.ID = "aug";
        $scope.headerAUG.Class = "";
        $scope.headerSEP = {};
        $scope.headerSEP.Text = "SEP";
        $scope.headerSEP.ID = "sep";
        $scope.headerSEP.Class = "";
        $scope.headerOCT = {};
        $scope.headerOCT.Text = "OCT";
        $scope.headerOCT.ID = "oct";
        $scope.headerOCT.Class = "";
        $scope.headerNOV = {};
        $scope.headerNOV.Text = "NOV";
        $scope.headerNOV.ID = "nov";
        $scope.headerNOV.Class = "";
        $scope.headerDEC = {};
        $scope.headerDEC.Text = "DEC";
        $scope.headerDEC.ID = "dec";
        $scope.headerDEC.Class = "";
        $scope.headerH2TOTAL = {};
        $scope.headerH2TOTAL.Text = "H2 TOTAL";
        $scope.headerH2TOTAL.ID = "H2";
        $scope.headerH2TOTAL.Class = "figure-total";
        $scope.headerYEAR = {};
        $scope.headerYEAR.Text = "YEAR";
        $scope.headerYEAR.ID = "year";
        $scope.headerYEAR.Class = "figure-year";
        switch ($scope.currentMonth) {
            case 1:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerJAN.Class = "current-month";
                }
                else {
                    $scope.headerJAN.Class = "";
                }
                break;
            case 2:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerFEB.Class = "current-month";
                }
                else {
                    $scope.headerFEB.Class = "";
                }
                break;
            case 3:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerMAR.Class = "current-month";
                }
                else {
                    $scope.headerMAR.Class = "";
                }
                break;
            case 4:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerAPR.Class = "current-month";
                } else {
                    $scope.headerAPR.Class = "";
                }
                break;
            case 5:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerMAY.Class = "current-month";
                } else {
                    $scope.headerMAY.Class = "";
                }
                break;
            case 6:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerJUN.Class = "current-month";
                } else {
                    $scope.headerJUN.Class = "";
                }
                break;
            case 7:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerJUL.Class = "current-month";
                }
                else {
                    $scope.headerJUL.Class = "";
                }
                break;
            case 8:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerAUG.Class = "current-month";
                } else {
                    $scope.headerAUG.Class = "";
                }
                break;
            case 9:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerSEP.Class = "current-month";
                } else {
                    $scope.headerSEP.Class = "";
                }
                break;
            case 10:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerOCT.Class = "current-month";
                } else {
                    $scope.headerOCT.Class = "";
                }
                break;
            case 11:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerNOV.Class = "current-month";
                } else {
                    $scope.headerNOV.Class = "";
                }
                break;
            case 12:
                if (selectedYear == $scope.currentYear) {
                    $scope.headerDEC.Class = "current-month";
                } else {
                    $scope.headerDEC.Class = "";
                }
                break;
            default:
                // Do nothing
                break;
        }
        $scope.headerTerm0 = [$scope.headerPLAN, $scope.headerPTERM];
        $scope.headerTerm1 = [
        $scope.headerJAN, $scope.headerFEB, $scope.headerMAR, $scope.headerAPR, $scope.headerMAY, $scope.headerJUN, $scope.headerH1TOTAL
        ];
        $scope.headerTerm2 = [
        $scope.headerJUL, $scope.headerAUG, $scope.headerSEP, $scope.headerOCT, $scope.headerNOV, $scope.headerDEC, $scope.headerH2TOTAL, $scope.headerYEAR
        ];
        // list of headers
        $scope.swapHeaders();
    }
    // Swap header Between header1 and header2
    $scope.swapHeaders = function () {
        if (!$scope.isShowTwoYear) {
            $scope.headers = $scope.headerTerm1.concat($scope.headerTerm2);
        }
        else {
            $scope.headers = $scope.headerTerm2.concat($scope.headerTerm1);
        }
    }
    // Fucntion changeStatus, set text of field status depend on status of Item Plan
    $scope.changeStatus = function (selectedPlanStatus) {
        $scope.statusClass = ['item-status', 'status-open', 'role-hq'];
        switch (selectedPlanStatus) {
            case 1:// Status = 1, Text is "OPEN"
                $scope.selectedPlanStatusText = "OPEN";
                if ($scope.rodeID == 1 || $scope.rodeID == 2 || $scope.rodeID == 3) {
                    $scope.statusClass = ['item-status', 'status-open', 'role-hq'];
                    $scope.StatusTextColor = "Red";
                }
                else {
                    $scope.statusClass = ['item-status', 'status-open', 'role-nso'];
                    $scope.StatusTextColor = "Green";
                }
                $scope.ShowButtonRequest = false;
                break;
            case 2:
            case 3:
            case 4:
            case 5:// Status =2(Submitted), status =3(request for resubmission) set text to "SUBMITTED"
                if ($scope.rodeID == 1 || $scope.rodeID == 2 || $scope.rodeID == 3) {
                    $scope.statusClass = ['item-status', 'status-submitted', 'role-hq'];
                    $scope.StatusTextColor = "Green";
                }
                else {
                    $scope.statusClass = ['item-status', 'status-submitted', 'role-nso'];
                    $scope.StatusTextColor = "Red";
                }
                $scope.selectedPlanStatusText = "SUBMITTED";
                if ($scope.selectedYear >= $scope.currentYear) {
                    $scope.ShowButtonRequest = true;
                }
                if (selectedPlanStatus == 2 || selectedPlanStatus == 4) {
                    $scope.TextButtonRequest = "Request for resubmission";
                }
                else {
                    $scope.TextButtonRequest = "Cancel request";
                }

                break;
            default:
                $scope.selectedPlanStatusText = "UNDEFINED";
                break;
        }
    }
    // refresh data display
    $scope.refreshDataDisplay = function (swapHeader) {
        // Reset data of 2 table
        $scope.NPSSItemPlanListToDisplay = {};
        $scope.NPSSItemPlanListCustomerToDisplay = [];
        // In case show 2 year in table
        if (!swapHeader) {
            if ($("#TermRight").hasClass("term-2")) {
                $("#TermRight").removeClass("term-2");
            }
            if ($("#TermRight").hasClass("term-1")) {
                $("#TermRight").removeClass("term-1");
            }
            if ($("#TermLeft").hasClass("term-2")) {
                $("#TermLeft").removeClass("term-2");
            }
            if ($("#TermLeft").hasClass("term-1")) {
                $("#TermLeft").removeClass("term-1");
            }
        }
        if ($scope.isShowTwoYear) {
            $("#TermRight").addClass("term-1");
            $("#TermLeft").addClass("term-2");
            if ($scope.selectedYear1 == $scope.currentYear) {
                if ($("#TermRight").hasClass("current-term")) {
                    $("#TermRight").removeClass("current-term");
                }
                if ($("#TermLeft").hasClass("current-term")) {
                    $("#TermLeft").removeClass("current-term");
                }
                $("#TermLeft").addClass("current-term");
            } else {
                if ($("#TermLeft").hasClass("current-term")) {
                    $("#TermLeft").removeClass("current-term");
                }
                if ($("#TermRight").hasClass("current-term")) {
                    $("#TermRight").removeClass("current-term");
                }
            }
            $scope.selectedPlanStatus = $scope.NPSSItemPlanList[$scope.selectedPlan2].Status;
            $scope.changeStatus($scope.selectedPlanStatus);
            // set data for NPSSItemPlanListToDisplay as plan1
            angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern, function (value, key) {
                $scope.NPSSItemPlanListToDisplay[value.PlanName] = cloneObject(value);
            });
            // in case plan2 is null
            if ($scope.NPSSItemPlanList[$scope.selectedPlan2] == null) {
                // clone plan from plan1
                $scope.NPSSItemPlanList[$scope.selectedPlan2] = cloneObject($scope.NPSSItemPlanList[$scope.selectedPlan1]);
                $scope.NPSSItemPlanList[$scope.selectedPlan2].isNewPlan = true;
                var k = 0;
                // set value as new plan
                angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern, function (value, key) {
                    // plan2 is plan of next year, therfore PTerm value is set to H2 of plan1
                    value.PatternValuePTerm = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern)[k]].PatternValueH2;
                    value.PatternValueJan = 0;
                    value.PatternValueFeb = 0;
                    value.PatternValueMar = 0;
                    value.PatternValueApr = 0;
                    value.PatternValueMay = 0;
                    value.PatternValueJun = 0;
                    value.PatternValueH1 = 0;
                    value.PatternValueJul = 0;
                    value.PatternValueAug = 0;
                    value.PatternValueSep = 0;
                    value.PatternValueOct = 0;
                    value.PatternValueNov = 0;
                    value.PatternValueDec = 0;
                    value.PatternValueH2 = 0;
                    value.PatternValueYear = 0;
                    k++;
                });
                k = 0;
                // set data for customer table
                angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer, function (value, key) {
                    value.SalesPTerm = $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[k]].SalesH2;
                    value.SalesJan = 0;
                    value.SalesFeb = 0;
                    value.SalesMar = 0;
                    value.SalesApr = 0;
                    value.SalesMay = 0;
                    value.SalesJun = 0;
                    value.SalesH1 = 0;
                    value.SalesJul = 0;
                    value.SalesAug = 0;
                    value.SalesSep = 0;
                    value.SalesOct = 0;
                    value.SalesNov = 0;
                    value.SalesDec = 0;
                    value.SalesH2 = 0;
                    value.SalesYear = 0;
                    k++;
                });
            }
            // in case plan2 not null, set data from plan 2 to table Plan
            if ($scope.NPSSItemPlanList[$scope.selectedPlan2] != null) {
                var listPattern = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern;
                for (var i = 0; i < Object.keys($scope.NPSSItemPlanListToDisplay).length; i++) {
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueJan = listPattern[Object.keys(listPattern)[i]].PatternValueJan;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueFeb = listPattern[Object.keys(listPattern)[i]].PatternValueFeb;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueMar = listPattern[Object.keys(listPattern)[i]].PatternValueMar;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueApr = listPattern[Object.keys(listPattern)[i]].PatternValueApr;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueMay = listPattern[Object.keys(listPattern)[i]].PatternValueMay;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueJun = listPattern[Object.keys(listPattern)[i]].PatternValueJun;
                    $scope.NPSSItemPlanListToDisplay[Object.keys($scope.NPSSItemPlanListToDisplay)[i]].PatternValueH1 = listPattern[Object.keys(listPattern)[i]].PatternValueH1;
                }
            }
            angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer, function (value, key) {
                $scope.NPSSItemPlanListCustomerToDisplay.push(cloneObject(value));
            });
            // in case plan2 not null, set data from plan 2 to table Customer
            if ($scope.NPSSItemPlanList[$scope.selectedPlan2] != null) {
                var listNPSSItemCustomer = $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer;
                for (var i = 0; i < $scope.NPSSItemPlanListCustomerToDisplay.length; i++) {
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesJan = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesJan;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesFeb = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesFeb;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesMar = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesMar;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesApr = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesApr;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesMay = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesMay;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesJun = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesJun;
                    $scope.NPSSItemPlanListCustomerToDisplay[i].SalesH1 = listNPSSItemCustomer[Object.keys(listNPSSItemCustomer)[i]].SalesH1;
                }
            }
            // set text for header term and button prev, next term
            $scope.PrevText = "(" + $scope.selectedYear1 + " H1 ~ " + $scope.selectedYear1 + " H2) ";
            $scope.NextText = " (" + $scope.selectedYear2 + " H1 ~ " + $scope.selectedYear2 + " H2) ";
            $scope.HeaderTerm1Text = $scope.selectedYear1 + " - Term2";
            $scope.HeaderTerm2Text = $scope.selectedYear2 + " - Term1";
            $scope.StockMthRatioHeader = $scope.NPSSItemPlanList[$scope.selectedPlan2].StockMthRatioHeader.toFixed(2);
            $scope.StandardTurnOverRatio = $scope.NPSSItemPlanList[$scope.selectedPlan2].StandardTurnOverRatio;
        }
        else {// in case show 1 year only
            if (!swapHeader) {
                $("#TermRight").addClass("term-2");
                $("#TermLeft").addClass("term-1");
                if ($scope.selectedYear == $scope.currentYear && $scope.currentMonth <= 6) {
                    if ($("#TermRight").hasClass("current-term")) {
                        $("#TermRight").removeClass("current-term");
                    }
                    if ($("#TermLeft").hasClass("current-term")) {
                        $("#TermLeft").removeClass("current-term");
                    }
                    $("#TermLeft").addClass("current-term");
                } else if ($scope.selectedYear == $scope.currentYear && $scope.currentMonth > 6) {
                    if ($("#TermLeft").hasClass("current-term")) {
                        $("#TermLeft").removeClass("current-term");
                    }
                    if ($("#TermRight").hasClass("current-term")) {
                        $("#TermRight").removeClass("current-term");
                    }
                    $("#TermRight").addClass("current-term");
                }
                else {
                    if ($("#TermRight").hasClass("current-term")) {
                        $("#TermRight").removeClass("current-term");
                    }
                    if ($("#TermLeft").hasClass("current-term")) {
                        $("#TermLeft").removeClass("current-term");
                    }
                }
            }
            $scope.selectedPlanStatus = $scope.NPSSItemPlanList[$scope.selectedPlan].Status;
            $scope.changeStatus($scope.selectedPlanStatus);
            if ($scope.isHadItemPlan) {// if have item plan set data for table plan
                angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern, function (value, key) {
                    $scope.NPSSItemPlanListToDisplay[value.PlanName] = cloneObject(value);
                });
                angular.forEach($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer, function (value, key) {
                    $scope.NPSSItemPlanListCustomerToDisplay.push(cloneObject(value));
                });
                // set text for header term and button prev, next term
                $scope.PrevText = "(" + ($scope.selectedYear - 1) + " H2 ~ " + $scope.selectedYear + " H1) ";
                $scope.NextText = " (" + ($scope.selectedYear) + " H2 ~ " + ($scope.selectedYear + 1) + " H1) ";
                $scope.HeaderTerm1Text = $scope.selectedYear + " - Term1";
                $scope.HeaderTerm2Text = $scope.selectedYear + " - Term2";
                $scope.StockMthRatioHeader = $scope.NPSSItemPlanList[$scope.selectedPlan].StockMthRatioHeader.toFixed(2);
                $scope.StandardTurnOverRatio = $scope.NPSSItemPlanList[$scope.selectedPlan].StandardTurnOverRatio;
            }
        }
        // refresh CSS class
        if (!swapHeader) {
            if ($scope.isShowTwoYear) {
                $scope.setHeader($scope.selectedYear1);
            }
            else {
                $scope.setHeader($scope.selectedYear);
            }
            setTimeout(function () {
                $scope.$apply(function () {
                    $('.selectpicker').selectpicker('refresh');
                    setAllTableHeight();
                });
            }, 100);
            paintTable();
        }

    }
    // new item plan for clone
    $scope.newPlan = function (year) {
        var itemPlanResult = cloneObject($scope.NPSSItemPlanList[$scope.selectedPlanOld]);
        if (year >= $scope.currentYear) {
            itemPlanResult.Status = 1;
        }
        else {
            itemPlanResult.Status = 2;
        }
        angular.forEach(itemPlanResult.listPattern, function (value) {
            value.PatternValuePTerm = 0;
            value.PatternValueJan = 0;
            value.PatternValueFeb = 0;
            value.PatternValueMar = 0;
            value.PatternValueApr = 0;
            value.PatternValueMay = 0;
            value.PatternValueJun = 0;
            value.PatternValueH1 = 0;
            value.PatternValueJul = 0;
            value.PatternValueAug = 0;
            value.PatternValueSep = 0;
            value.PatternValueOct = 0;
            value.PatternValueNov = 0;
            value.PatternValueDec = 0;
            value.PatternValueH2 = 0;
            value.PatternValueYear = 0;
        });
        angular.forEach(itemPlanResult.listNPSSItemCustomer, function (value, key) {
            value.SalesPTerm = 0;
            value.SalesJan = 0;
            value.SalesFeb = 0;
            value.SalesMar = 0;
            value.SalesApr = 0;
            value.SalesMay = 0;
            value.SalesJun = 0;
            value.SalesH1 = 0;
            value.SalesJul = 0;
            value.SalesAug = 0;
            value.SalesSep = 0;
            value.SalesOct = 0;
            value.SalesNov = 0;
            value.SalesDec = 0;
            value.SalesH2 = 0;
            value.SalesYear = 0;
        });
        itemPlanResult.StockMthRatioHeader = $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.ItemDropdownList.selectedItemID].StockMonthRatio;
        return itemPlanResult;
    }
    // set item code for list
    $scope.setItemCodeList = function () {
        $scope.ItemCodeArray = convertToArray($scope.ItemDropdownList.List[$scope.selectedItemDropdownList]);
    }
    // set data for model
    $scope.setData = function (data, init) {
        $scope.NPSSItemPlanList = data.NPSSItemPlanList;
        $scope.NPSSItemPlanListToDisplay = [];
        $scope.NPSSItemPlanListCustomerToDisplay = [];
        $scope.selectedBusinessID = data.SelectedBusinessID;
        $scope.selectedDivisionID = data.SelectedDivisionID;
        $scope.selectedDivisionLevel = data.SelectedDivisionLevel;
        $scope.selectedCategoryID = data.SelectedCategoryID;
        $scope.selectedCategoryID1 = data.SelectedCategoryID1;
        $scope.selectedCategoryID2 = data.SelectedCategoryID2;
        $scope.selectedCategoryID3 = data.SelectedCategoryID3;
        $scope.selectedItemID = data.SelectedItemID;
        $scope.selectedCompanyID = data.SelectedCompanyID;
        $scope.selectedDivisionDropdownList = data.SelectedDivisionDropdownList;
        $scope.DivisionDropdownList = {};
        $scope.DivisionDropdownList.selectedDivisionID = $scope.selectedDivisionID;
        $scope.DivisionDropdownList.List = data.DivisionDropdownList;
        $scope.selectedCategory1DropdownList = data.SelectedCategory1DropdownList;
        $scope.CategoryLevel1DropdownList = {};
        $scope.CategoryLevel1DropdownList.selectedCategoryID1 = data.SelectedCategoryID1;
        $scope.CategoryLevel1DropdownList.List = data.CategoryLevel1DropdownList;
        $scope.selectedCategory2DropdownList = data.SelectedCategory2DropdownList;
        $scope.CategoryLevel2DropdownList = {};
        $scope.CategoryLevel2DropdownList.selectedCategoryID2 = data.SelectedCategoryID2;
        $scope.CategoryLevel2DropdownList.List = data.CategoryLevel2DropdownList;
        $scope.selectedCategory3DropdownList = data.SelectedCategory3DropdownList;
        $scope.CategoryLevel3DropdownList = {};
        $scope.CategoryLevel3DropdownList.selectedCategoryID3 = data.SelectedCategoryID3;
        $scope.CategoryLevel3DropdownList.List = data.CategoryLevel3DropdownList;
        $scope.CompanyDropdownList = {};
        $scope.CompanyDropdownList.selectedCompanyID = $scope.selectedCompanyID;
        $scope.CompanyDropdownList.List = data.CompanyDropdownList;
        $scope.CompanyDropdownList.IsDropdownList = false;
        if (getLengthObject($scope.CompanyDropdownList.List) > 1) {
            $scope.CompanyDropdownList.IsDropdownList = true;
        }
        $scope.selectedItemDropdownList = data.SelectedItemDropdownList;
        $scope.ItemDropdownList = {};
        $scope.ItemDropdownList.selectedItemID = $scope.selectedItemID;
        $scope.ItemDropdownList.List = data.ItemDropdownList;
        $scope.isHadItemPlan = data.IsHadItemPlan;
        $scope.isHadItem = data.IsHadItem;
        $scope.isHadCategory = data.IsHadCategory;
        $scope.divisionStatus = data.DivisionStatus;
        if ($scope.isShowTwoYear && init && $scope.isHadItemPlan) {
            $scope.isMinYear = false;
            $scope.isMaxYear = false;
            $scope.currentTermClick(false);
        }
        else {
            if ($scope.isHadItem) {
                if ($scope.isHadItemPlan) {
                    $scope.refreshDataDisplay();
                }
            }
        }
        $scope.itemActiveEndPeriodMonth = data.ItemActiveEndPeriodMonth;
        $scope.itemActiveEndPeriodYear = data.ItemActiveEndPeriodYear;
        $scope.itemActiveStartPeriodMonth = data.ItemActiveStartPeriodMonth;
        $scope.itemActiveStartPeriodYear = data.ItemActiveStartPeriodYear;
        $scope.ErrorMessage = data.ErrorMessage;
        $scope.InforMessage = data.InforMessage;
        $scope.WarningMessageList = data.WarningMessageList;
        $scope.ErrorMessageList = data.ErrorMessageList;
        $scope.ErrorSystemMessage = data.ErrorSystemMessage;
        $scope.oldNPSSItemPlanList = cloneObject($scope.NPSSItemPlanList);
        $scope.oldNPSSItemPlanListToDisplay = cloneObject($scope.NPSSItemPlanListToDisplay);
        $scope.oldNPSSItemPlanListCustomerToDisplay = cloneObject($scope.NPSSItemPlanListCustomerToDisplay);
        $scope.OldStockMthRatioHeader = $scope.StockMthRatioHeader;
        $scope.OldStandardTurnOverRatio = $scope.StandardTurnOverRatio;
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
                setAllTableHeight();
            });
        }, 100);
        paintTable();
        $scope.cancelClick();
    };
    // initalize function
    $scope.initialize = function () {
        var model = ItemPlanData.npssItemPlanModel;
        $scope.rodeID = ItemPlanData.RoleID;
        $scope.userInformation = model.UserInformation;
        $scope.minYear = model.MinYear;
        $scope.maxYear = model.MaxYear;
        $scope.currentYear = model.CurrentYear;
        $scope.currentMonth = model.CurrentMonth;
        $scope.isShowTwoYear = model.IsShowTwoYear;
        $scope.isShowTwoYearCurrent = model.IsShowTwoYearCurrent;
        $scope.selectedYear1 = model.CurrentYear;
        $scope.selectedYear2 = model.CurrentYear + 1;
        $scope.selectedPlan1 = model.SelectedBusinessID + "." + model.SelectedDivisionID + "." + model.SelectedCategoryID + "." + model.SelectedItemID + "." + model.SelectedCompanyID + "." + model.SelectedYear1;
        $scope.selectedPlan2 = model.SelectedBusinessID + "." + model.SelectedDivisionID + "." + model.SelectedCategoryID + "." + model.sSelectedItemID + "." + model.SelectedCompanyID + "." + model.SelectedYear2;
        $scope.selectedYear = model.CurrentYear;
        $scope.selectedPlan = model.SelectedBusinessID + "." + model.SelectedDivisionID + "." + model.SelectedCategoryID + "." + model.SelectedItemID + "." + model.SelectedCompanyID + "." + model.SelectedYear;
        $scope.selectedPlanOld = $scope.selectedPlan;
        $scope.setData(model, true);
        $scope.isMinYear = false;
        $scope.isMaxYear = false;
        $scope.actionPopup = null;
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        $scope.isSubmit = false;
        $('#item-plan-loading').hide();
    }
    // catch changed item event
    $scope.itemChanged = function (action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.ItemDropdownList.selectedItemID != null) {
            $scope.selectedItemID = $scope.ItemDropdownList.selectedItemID;
        }
        else {
            $scope.selectedItemID = -1;
        }
        if ($scope.selectedItemID == -1) {
            return;
        }
        $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
        $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
        $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
        // In case the new selected item did not have data yet, get data from server
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/ItemChanged',
            data: {
                selectedDivisionID: $scope.selectedDivisionID,
                selectedCategoryID: $scope.selectedCategoryID,
                selectedCompanyID: $scope.selectedCompanyID,
                selectedItemID: $scope.selectedItemID,
                selectedItemDropdownList: $scope.selectedItemDropdownList
            }
        }).success(function (data, status, headers, config) {
            $('#item-plan-loading').hide();
            if (data) {
                $scope.setData(data, false);
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    };
    // catch changed category level 3 event
    $scope.category3Changed = function (action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.CategoryLevel3DropdownList.selectedCategoryID3 != null) {
            $scope.selectedCategoryID3 = $scope.CategoryLevel3DropdownList.selectedCategoryID3;
        }
        else {
            $scope.selectedCategoryID3 = -1;
        }
        if ($scope.selectedCategoryID3 != -1) {
            // In case the new selected category level 3 did not have data yet, get data from server
            $('#item-plan-loading').show();
            $http({
                method: 'POST',
                url: '/ItemPlan/Category3Changed',
                data: {
                    selectedDivisionID: $scope.selectedDivisionID,
                    selectedCategoryID1: $scope.selectedCategoryID1,
                    selectedCategoryID2: $scope.selectedCategoryID2,
                    selectedCategoryID3: $scope.selectedCategoryID3
                }
            }).success(function (data, status, headers, config) {
                setAllTableHeight();
                if (data) {
                    $('#item-plan-loading').hide();
                    $scope.setData(data, false);
                    if (!data.ErrorMessage && !$scope.ErrorSystemMessage && $scope.isHadItem) {
                        $scope.selectedCategoryID = $scope.selectedCategoryID3;
                        $scope.itemChanged();
                    }
                    if (data.InforMessage != null) {
                        $scope.isInforMessage = true;
                    }
                    if (data.ErrorMessage != null) {
                        $scope.isErrorMessage = true;
                    }
                }
                else {
                    redirecToErrorPage();
                }
            }).error(function (data, status, headers, config) {
                redirecToErrorPage();
            });
        }
        else {
            $scope.category2Changed();
        }
    };
    // catch changed category level 2 event
    $scope.category2Changed = function (changeCat3, action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.CategoryLevel2DropdownList.selectedCategoryID2 != null) {
            $scope.selectedCategoryID2 = $scope.CategoryLevel2DropdownList.selectedCategoryID2;
        }
        else {
            $scope.selectedCategoryID2 = -1;
        }
        if ($scope.selectedCategoryID2 != -1) {
            if ($scope.selectedDivisionLevel > 2) {
                // In case the new selected category level 2 did not have data yet, get data from server
                $('#item-plan-loading').show();
                $http({
                    method: 'POST',
                    url: '/ItemPlan/Category2Changed',
                    data: {
                        selectedDivisionID: $scope.selectedDivisionID,
                        selectedCategoryID1: $scope.selectedCategoryID1,
                        selectedCategoryID2: $scope.selectedCategoryID2
                    }
                }).success(function (data, status, headers, config) {
                    if (data) {
                        $('#item-plan-loading').hide();
                        $scope.setData(data, false);
                        if (data.ErrorMessage == null && $scope.ErrorSystemMessage == null) {
                            if ($scope.selectedDivisionLevel > 2 && changeCat3) {
                                $scope.category3Changed();
                            } else {
                                $scope.selectedCategoryID = $scope.selectedCategoryID2;
                                $scope.itemChanged();
                            }
                        }
                        if (data.InforMessage != null) {
                            $scope.isInforMessage = true;
                        }
                        if (data.ErrorMessage != null) {
                            $scope.isErrorMessage = true;
                        }
                    }
                    else {
                        redirecToErrorPage();
                    }
                }).error(function (data, status, headers, config) {
                    redirecToErrorPage();
                });
            }
            else {
                // Get list item from server
                $('#item-plan-loading').show();
                $http({
                    method: 'POST',
                    url: '/ItemPlan/Category2Changed',
                    data: {
                        selectedDivisionID: $scope.selectedDivisionID,
                        selectedCategoryID1: $scope.selectedCategoryID1,
                        selectedCategoryID2: $scope.selectedCategoryID2
                    }
                }).success(function (data, status, headers, config) {
                    if (data) {
                        $('#item-plan-loading').hide();
                        $scope.setData(data, false);
                        if (data.ErrorMessage == null && $scope.ErrorSystemMessage == null) {
                            $scope.itemChanged();
                        }
                        if (data.InforMessage != null) {
                            $scope.isInforMessage = true;
                        }
                        if (data.ErrorMessage != null) {
                            $scope.isErrorMessage = true;
                        }
                    }
                    else {
                        redirecToErrorPage();
                    }
                }).error(function (data, status, headers, config) {
                    redirecToErrorPage();
                });
            }
        }
        else {
            $scope.category1Changed(false);
        }
    };
    // catch changed category level 1 event
    $scope.category1Changed = function (changeCat2, action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.CategoryLevel1DropdownList.selectedCategoryID1 != null) {
            $scope.selectedCategoryID1 = $scope.CategoryLevel1DropdownList.selectedCategoryID1;
        }
        else {
            $scope.selectedCategoryID1 = -1;
        }
        if ($scope.selectedCategoryID1 != -1) {
            if ($scope.selectedDivisionLevel > 1) {
                // In case the new selected category level 1 did not have data yet, get data from server
                $('#item-plan-loading').show();
                $http({
                    method: 'POST',
                    url: '/ItemPlan/Category1Changed',
                    data: {
                        selectedDivisionID: $scope.selectedDivisionID,
                        selectedCategoryID1: $scope.selectedCategoryID1
                    }
                }).success(function (data, status, headers, config) {
                    if (data) {
                        $('#item-plan-loading').hide();
                        $scope.setData(data, false);
                        if (data.ErrorMessage == null && $scope.ErrorSystemMessage == null) {
                            if ($scope.selectedDivisionLevel > 1 && changeCat2) {
                                $scope.category2Changed();
                            } else {
                                $scope.selectedCategoryID = $scope.selectedCategoryID1;
                                $scope.itemChanged();
                            }
                        }
                        if (data.InforMessage != null) {
                            $scope.isInforMessage = true;
                        }
                        if (data.ErrorMessage != null) {
                            $scope.isErrorMessage = true;
                        }
                    }
                    else {
                        redirecToErrorPage();
                    }
                }).error(function (data, status, headers, config) {
                    redirecToErrorPage();
                });
            }
            else {
                // Get list item from server
                $('#item-plan-loading').show();
                $http({
                    method: 'POST',
                    url: '/ItemPlan/Category1Changed',
                    data: {
                        selectedDivisionID: $scope.selectedDivisionID,
                        selectedCategoryID1: $scope.selectedCategoryID1
                    }
                }).success(function (data, status, headers, config) {
                    if (data) {
                        $('#item-plan-loading').hide();
                        $scope.setData(data, false);
                        if (data.ErrorMessage == null && $scope.ErrorSystemMessage == null) {
                            $scope.itemChanged();
                        }
                        if (data.InforMessage != null) {
                            $scope.isInforMessage = true;
                        }
                        if (data.ErrorMessage != null) {
                            $scope.isErrorMessage = true;
                        }
                    }
                    else {
                        redirecToErrorPage();
                    }
                }).error(function (data, status, headers, config) {
                    redirecToErrorPage();
                });
            }
        }
        else {
            // Error
            redirecToErrorPage();
        }
    };
    // catch changed category level 3 event
    $scope.divisionChanged = function (action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.DivisionDropdownList.selectedDivisionID != null) {
            $scope.selectedDivisionID = $scope.DivisionDropdownList.selectedDivisionID;
            $scope.selectedDivisionLevel = $scope.DivisionDropdownList.List[$scope.selectedDivisionDropdownList][$scope.selectedDivisionID].Division.DivisionLevel;
        }
        else {
            $scope.selectedDivisionID = -1;
        }
        // In case the new selected division did not have data yet, get data from server
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/DivisionChanged',
            data: {
                selectedDivisionID: $scope.selectedDivisionID
            }
        }).success(function (data, status, headers, config) {
            setAllTableHeight();
            if (data) {
                $('#item-plan-loading').hide();
                $scope.setData(data, false);
                if (data.ErrorMessage == null && $scope.ErrorSystemMessage == null) {
                    $scope.category1Changed();
                }
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    };
    // catch changed company level 3 event
    $scope.companyChanged = function (action) {
        $scope.cancelClick(true);
        if (action != null && action != "undefined" && $scope.isChange) {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[1].replace("{0}", $scope.ItemDropdownList.List[$scope.selectedItemDropdownList][$scope.selectedItemID].ItemCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if ($scope.CompanyDropdownList.selectedCompanyID != null) {
            $scope.selectedCompanyID = $scope.CompanyDropdownList.selectedCompanyID;
        }
        else {
            $scope.selectedCompanyID = -1;
        }
        $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
        $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
        $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
        // In case the new selected company did not have data yet, get data from server
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/CompanyChanged',
            data: {
                selectedCompanyID: $scope.selectedCompanyID
            }
        }).success(function (data, status, headers, config) {
            if (data) {
                $('#item-plan-loading').hide();
                $scope.setData(data, false);
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    };
    // catch event for click OK popup event
    $scope.doActionPopup = function (action, save, isSubmit) {
        if (save) {
            $scope.saveClick(isSubmit);
        }
        switch (action) {
            case "changedDivision":
                $scope.divisionChanged();
                break;
            case "changedCategory1":
                $scope.category1Changed();
                break;
            case "changedCategory2":
                $scope.category2Changed();
                break;
            case "changedCategory3":
                $scope.category3Changed();
                break;
            case "changedItem":
                $scope.itemChanged();
                break;
            case "changedCompany":
                $scope.companyChanged();
            case "submitClick":
                if (save) {
                    $scope.submitClick();
                }
                break;
            default:
                return;
        }
    }
    // Catch Prev Term Click event
    $scope.prevTermClick = function (refreshDataDisplay) {
        // in case isMinYear do nothing
        if (refreshDataDisplay) {
            if ($scope.isMinYear) {
                return;
            }
            // reset isMaxYear
            if ($scope.isMaxYear) {
                $scope.isMaxYear = false;
            }
            if (!$scope.isShowTwoYear) {// If show only 1 year in table, change to show 2 year and decrease the year by 1
                $scope.isShowTwoYear = !$scope.isShowTwoYear;
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.selectedYear = $scope.selectedYear - 1;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
                $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
                $scope.refreshDataDisplay();
            }
            else {// If show only 2 year in table, change to show 1 year.
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.isShowTwoYear = !$scope.isShowTwoYear;
                $scope.isHadItemPlan = true;
                $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
                $scope.refreshDataDisplay();
                if ($scope.minYear > $scope.selectedYear - 1) {
                    $scope.isMinYear = true;
                }
            }
            $scope.swapHeaders();
        }
        else {
            if (!$scope.isShowTwoYear) {// If show only 1 year in table, change to show 2 year and decrease the year by 1
                var selectedYear2temp = $scope.selectedYear2;
                var selectedYeartemp = $scope.selectedYear;
                var selectedYear1temp = $scope.selectedYear1;
                var selectedPlan1temp = $scope.selectedPlan1;
                var selectedPlan2temp = $scope.selectedPlan2;
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.selectedYear = $scope.selectedYear - 1;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
                $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
                $scope.inputTenderPtojectChanged(7);
                $scope.selectedYear2 = selectedYear2temp;
                $scope.selectedYear = $scope.selectedYear;
                $scope.selectedYear1 = $scope.selectedYear1;
                $scope.selectedPlan1 = $scope.selectedPlan1;
                $scope.selectedPlan2 = $scope.selectedPlan2;
            }
            else {// If show only 2 year in table, change to show 1 year.
                var selectedYear2temp = $scope.selectedYear2;
                var selectedYear1temp = $scope.selectedYear1;
                var selectedPlantemp = $scope.selectedPlan;
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.isHadItemPlan = true;
                $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
                $scope.inputTenderPtojectChanged(1);
                $scope.selectedYear2 = selectedYear2temp;
                $scope.selectedYear1 = selectedYear1temp;
                $scope.selectedPlan = selectedPlantemp;
            }
        }
    }
    // Catch Next Term button click
    $scope.nextTermClick = function (refreshDataDisplay) {
        if (refreshDataDisplay) {
            if ($scope.isMaxYear) {
                return;
            }
            if ($scope.isMinYear) {
                $scope.isMinYear = false;
            }
            if (!$scope.isShowTwoYear) {// If show only 1 year in table, change to show 2 year and increase the year by 1.
                $scope.isShowTwoYear = !$scope.isShowTwoYear;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedYear2 = $scope.selectedYear + 1;
                $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
                $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
                $scope.refreshDataDisplay();
            }
            else {// If show only 2 year in table, change to show 1 year.
                $scope.selectedYear = $scope.selectedYear + 1;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.isShowTwoYear = !$scope.isShowTwoYear;
                $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
                $scope.refreshDataDisplay();
                if ($scope.maxYear < $scope.selectedYear + 1) {
                    $scope.isMaxYear = true;
                }
            }
            $scope.swapHeaders();
        }
        else {
            if (!$scope.isShowTwoYear) {// If show only 1 year in table, change to show 2 year and increase the year by 1.
                var selectedYear1temp = $scope.selectedYear1;
                var selectedYear2temp = $scope.selectedYear2;
                var selectedPlan1temp = $scope.selectedPlan1;
                var selectedPlan2temp = $scope.selectedPlan2;
                var selectedYeartemp = $scope.selectedYear;
                var selectedPlantemp = $scope.selectedPlan;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedYear2 = $scope.selectedYear + 1;
                $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
                $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
                $scope.inputTenderPtojectChanged(7, true);
                if ($scope.selectedYear + 1 <= $scope.currentYear + 1) {
                    $scope.selectedYear = $scope.selectedYear + 1;
                    $scope.selectedYear1 = $scope.selectedYear;
                    $scope.selectedYear2 = $scope.selectedYear;
                    $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
                    $scope.inputTenderPtojectChanged(1, true, true);
                }

                $scope.selectedYear = selectedYeartemp;
                $scope.selectedPlan = selectedPlantemp;

                $scope.selectedYear1 = selectedYear1temp;
                $scope.selectedYear2 = selectedYear2temp;
                $scope.selectedPlan1 = selectedPlan1temp;
                $scope.selectedPlan2 = selectedPlan2temp;
            }
            else {// If show only 2 year in table, change to show 1 year.
                var selectedYeartemp = $scope.selectedYear;
                var selectedYear1temp = $scope.selectedYear1;
                var selectedYear2temp = $scope.selectedYear2;
                var selectedPlantemp = $scope.selectedPlan;
                $scope.selectedYear = $scope.selectedYear + 1;
                $scope.selectedYear1 = $scope.selectedYear;
                $scope.selectedYear2 = $scope.selectedYear;
                $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
                $scope.inputTenderPtojectChanged(1, true);
                $scope.selectedYear = selectedYeartemp;
                $scope.selectedYear1 = selectedYear1temp;
                $scope.selectedYear2 = selectedYear2temp;
                $scope.selectedPlan = selectedPlantemp;
            }
        }
    }
    // Catch Current button click
    $scope.currentTermClick = function (swapHeader) {
        if ($scope.isMaxYear) {
            $scope.isMaxYear = false;
        }
        if ($scope.isMinYear) {
            $scope.isMinYear = false;
        }
        if (!$scope.isShowTwoYearCurrent) {
            $scope.isShowTwoYear = $scope.isShowTwoYearCurrent;
            $scope.selectedYear = $scope.currentYear;
            $scope.selectedYear1 = $scope.selectedYear;
            $scope.selectedYear2 = $scope.selectedYear;
            $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
            $scope.refreshDataDisplay();
        }
        else {
            $scope.isShowTwoYear = $scope.isShowTwoYearCurrent;
            $scope.selectedYear = $scope.currentYear;
            $scope.selectedYear1 = $scope.selectedYear;
            $scope.selectedYear2 = $scope.selectedYear + 1;
            $scope.selectedPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear;
            $scope.selectedPlan1 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear1;
            $scope.selectedPlan2 = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + $scope.selectedYear2;
            $scope.refreshDataDisplay(swapHeader);
        }
        $scope.swapHeaders();
    }

    // Catch button Save click
    $scope.saveClick = function (isSubmit) {
        $scope.isChange = false;
        // Call service to Save data to database
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/SaveItemPlan',
            data: {
                NPSSItemPlanList: JSON.stringify($scope.NPSSItemPlanList)
            }
        }).success(function (data, status, headers, config) {
            if (data) {
                if (!isSubmit) {
                    $('#item-plan-loading').hide();
                    $scope.setData(data, false);
                    $scope.oldNPSSItemPlanList = cloneObject($scope.NPSSItemPlanList);
                    $scope.oldNPSSItemPlanListToDisplay = cloneObject($scope.NPSSItemPlanListToDisplay);
                    $scope.oldNPSSItemPlanListCustomerToDisplay = cloneObject($scope.NPSSItemPlanListCustomerToDisplay);
                }
                if (data.InforMessage != null && !isSubmit) {
                    $scope.isInforMessage = true;
                }
                if (data.ErrorMessage != null && !isSubmit) {
                    $scope.isErrorMessage = true;
                }
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    // Catch button Cancel click
    $scope.cancelClick = function (clearMessage) {
        $scope.isInforMessage = false;
        $scope.isErrorMessage = false;
        if (!clearMessage) {
            $scope.NPSSItemPlanList = cloneObject($scope.oldNPSSItemPlanList);
            $scope.NPSSItemPlanListToDisplay = cloneObject($scope.oldNPSSItemPlanListToDisplay);
            $scope.NPSSItemPlanListCustomerToDisplay = cloneObject($scope.oldNPSSItemPlanListCustomerToDisplay);
            $scope.StockMthRatioHeader = $scope.OldStockMthRatioHeader;
            $scope.StandardTurnOverRatio = $scope.OldStandardTurnOverRatio;
            $scope.isChange = false;
        }
    }

    // Catch button Submit all item in division click
    $scope.submitClick = function (action) {
        $scope.isSubmit = true;
        if (action != null && action != "undefined") {
            $scope.actionPopup = action;
            $scope.warningMessage = $scope.WarningMessageList[0].replace("{0}", $scope.DivisionDropdownList.List[$scope.selectedDivisionDropdownList][$scope.DivisionDropdownList.selectedDivisionID].Division.DivisionCode);
            $('#SaveChangeConfirm').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.isChange = false;
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/SubmitWholeDivision',
            data: {
                divisionID: $scope.selectedDivisionID,
                companyID: $scope.selectedCompanyID
            }
        }).success(function (data, status, headers, config) {
            if (data) {
                $('#item-plan-loading').hide();
                $scope.setData(data, false);
                $scope.oldNPSSItemPlanList = cloneObject($scope.NPSSItemPlanList);
                $scope.oldNPSSItemPlanListToDisplay = cloneObject($scope.NPSSItemPlanListToDisplay);
                $scope.oldNPSSItemPlanListCustomerToDisplay = cloneObject($scope.NPSSItemPlanListCustomerToDisplay);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
        $scope.isSubmit = false;
    }

    // Catch button Submit all item in division click
    $scope.requestResubmissionClick = function () {
        // Call service to Save data to database
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/RequestForResubmissionWholeDivision',
            data: {
                divisionID: $scope.selectedDivisionID,
                companyID: $scope.selectedCompanyID,
                status: $scope.selectedPlanStatus
            }
        }).success(function (data, status, headers, config) {
            if (data) {
                $('#item-plan-loading').hide();
                $scope.setData(data, false);
                if (data.InforMessage != null) {
                    $scope.isInforMessage = true;
                }
                if (data.ErrorMessage != null) {
                    $scope.isErrorMessage = true;
                }
            }
            else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }

    // Catch button Export Excel click
    $scope.exportExcelClick = function () {
        // Call service to Save data to database
        $('#item-plan-loading').show();
        $http({
            method: 'POST',
            url: '/ItemPlan/ExportExcel',
            data: {
                NPSSItemPlanListToDisplay: JSON.stringify($scope.NPSSItemPlanListToDisplay),
                NPSSItemPlanListCustomerToDisplay: JSON.stringify($scope.NPSSItemPlanListCustomerToDisplay),
                selectedDivisionID: $scope.selectedDivisionID,
                selectedCategoryID: $scope.selectedCategoryID,
                selectedItemID: $scope.selectedItemID,
                selectedCompanyID: $scope.selectedCompanyID,
                isShowTwoYear: $scope.isShowTwoYear,
                selectedYear: $scope.selectedYear,
                selectedYear1: $scope.selectedYear1,
                selectedYear2: $scope.selectedYear2,
                StockMthRatioHeader: $scope.StockMthRatioHeader,
                selectedPlanStatusText: $scope.selectedPlanStatusText,
                StatusTextColor: $scope.StatusTextColor,
                StandardTurnOverRatio: $scope.StandardTurnOverRatio
            }
        }).success(function (data, status, headers, config) {
            if (data) {
                window.location = "/ItemPlan/DownloadExcel?fileName=" + data.FileName;
                $('#item-plan-loading').hide();
            } else {
                redirecToErrorPage();
            }
        }).error(function (data, status, headers, config) {
            redirecToErrorPage();
        });
    }
    //Auto summing sales for H1, H2 ,Year of Customer
    $scope.autoSummingSalesCustomer = function (customer, customerObj1, customerObj2) {
        customer.SalesH1 = customer.SalesJan + customer.SalesFeb + customer.SalesMar + customer.SalesApr + customer.SalesMay + customer.SalesJun;
        customer.SalesH2 = customer.SalesJul + customer.SalesAug + customer.SalesSep + customer.SalesOct + customer.SalesNov + customer.SalesDec;
        customerObj1.SalesH1 = customerObj1.SalesJan + customerObj1.SalesFeb + customerObj1.SalesMar + customerObj1.SalesApr + customerObj1.SalesMay + customerObj1.SalesJun;
        customerObj1.SalesH2 = customerObj1.SalesJul + customerObj1.SalesAug + customerObj1.SalesSep + customerObj1.SalesOct + customerObj1.SalesNov + customerObj1.SalesDec;
        customerObj1.SalesYear = customerObj1.SalesH1 + customerObj1.SalesH2;
        if (!$scope.isShowTwoYear) {
            customer.SalesYear = customer.SalesH1 + customer.SalesH2;
        }
        else {
            customerObj2.SalesH1 = customerObj2.SalesJan + customerObj2.SalesFeb + customerObj2.SalesMar + customerObj2.SalesApr + customerObj2.SalesMay + customerObj2.SalesJun;
            customerObj2.SalesH2 = customerObj2.SalesJul + customerObj2.SalesAug + customerObj2.SalesSep + customerObj2.SalesOct + customerObj2.SalesNov + customerObj2.SalesDec;
            customerObj2.SalesYear = customerObj2.SalesH1 + customerObj2.SalesH2;
            customer.SalesYear = customerObj1.SalesYear;
        }
        customerObj2.SalesPTerm = customerObj1.SalesH2;
    }
    // Input custoemr Sales changed
    $scope.inputSalesCustomerChanged = function (month) {
        $scope.isChange = true;
        var nextYearPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + ($scope.selectedYear + 1);
        if (!$scope.isShowTwoYear) {
            switch (month) {
                case 1:
                    if (($scope.currentMonth == 1 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJan = parseFloat(value.SalesJan) || 0;
                            value.SalesJan = value.SalesJan.toString().replace(".", "").replace("-", "");
                            value.SalesJan = parseInt(value.SalesJan) || 0;
                            if (value.SalesJan < 0) {
                                value.SalesJan = -value.SalesJan;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan += value.SalesJan;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesJan = value.SalesJan;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(1);
                    }
                    break;
                case 2:
                    if (($scope.currentMonth <= 2 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesFeb = parseFloat(value.SalesFeb) || 0;
                            value.SalesFeb = value.SalesFeb.toString().replace(".", "").replace("-", "");
                            value.SalesFeb = parseInt(value.SalesFeb) || 0;
                            if (value.SalesFeb < 0) {
                                value.SalesFeb = -value.SalesFeb;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb += value.SalesFeb;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesFeb = value.SalesFeb;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(2);
                    }
                    break;
                case 3:
                    if (($scope.currentMonth <= 3 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesMar = parseFloat(value.SalesMar) || 0;
                            value.SalesMar = value.SalesMar.toString().replace(".", "").replace("-", "");
                            value.SalesMar = parseInt(value.SalesMar) || 0;
                            if (value.SalesMar < 0) {
                                value.SalesMar = -value.SalesMar;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar += value.SalesMar;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesMar = value.SalesMar;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(3);
                    }
                    break;
                case 4:
                    if (($scope.currentMonth <= 4 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesApr = parseFloat(value.SalesApr) || 0;
                            value.SalesApr = value.SalesApr.toString().replace(".", "").replace("-", "");
                            value.SalesApr = parseInt(value.SalesApr) || 0;
                            if (value.SalesApr < 0) {
                                value.SalesApr = -value.SalesApr;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr += value.SalesApr;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesApr = value.SalesApr;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(4);
                    }
                    break;
                case 5:
                    if (($scope.currentMonth <= 5 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesMay = parseFloat(value.SalesMay) || 0;
                            value.SalesMay = value.SalesMay.toString().replace(".", "").replace("-", "");
                            value.SalesMay = parseInt(value.SalesMay) || 0;
                            if (value.SalesMay < 0) {
                                value.SalesMay = -value.SalesMay;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay += value.SalesMay;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesMay = value.SalesMay;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(5);
                    }
                    break;
                case 6:
                    if (($scope.currentMonth <= 6 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJun = parseFloat(value.SalesJun) || 0;
                            value.SalesJun = value.SalesJun.toString().replace(".", "").replace("-", "");
                            value.SalesJun = parseInt(value.SalesJun) || 0;
                            if (value.SalesJun < 0) {
                                value.SalesJun = -value.SalesJun;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun += value.SalesJun;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesJun = value.SalesJun;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(6);
                    }
                    break;
                case 7:
                    if (($scope.currentMonth <= 7 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJul = parseFloat(value.SalesJul) || 0;
                            value.SalesJul = value.SalesJul.toString().replace(".", "").replace("-", "");
                            value.SalesJul = parseInt(value.SalesJul) || 0;
                            if (value.SalesJul < 0) {
                                value.SalesJul = -value.SalesJul;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul += value.SalesJul;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesJul = value.SalesJul;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(7);
                    }
                    break;
                case 8:
                    if (($scope.currentMonth <= 8 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesAug = parseFloat(value.SalesAug) || 0;
                            value.SalesAug = value.SalesAug.toString().replace(".", "").replace("-", "");
                            value.SalesAug = parseInt(value.SalesAug) || 0;
                            if (value.SalesAug < 0) {
                                value.SalesAug = -value.SalesAug;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug += value.SalesAug;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesAug = value.SalesAug;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(8);
                    }
                    break;
                case 9:
                    if (($scope.currentMonth <= 9 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesSep = parseFloat(value.SalesSep) || 0;
                            value.SalesSep = value.SalesSep.toString().replace(".", "").replace("-", "");
                            value.SalesSep = parseInt(value.SalesSep) || 0;
                            if (value.SalesSep < 0) {
                                value.SalesSep = -value.SalesSep;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep += value.SalesSep;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesSep = value.SalesSep;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(9);
                    }
                    break;
                case 10:
                    if (($scope.currentMonth <= 10 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesOct = parseFloat(value.SalesOct) || 0;
                            value.SalesOct = value.SalesOct.toString().replace(".", "").replace("-", "");
                            value.SalesOct = parseInt(value.SalesOct) || 0;
                            if (value.SalesOct < 0) {
                                value.SalesOct = -value.SalesOct;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct += value.SalesOct;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesOct = value.SalesOct;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(10);
                    }
                    break;
                case 11:
                    if (($scope.currentMonth <= 11 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesNov = parseFloat(value.SalesNov) || 0;
                            value.SalesNov = value.SalesNov.toString().replace(".", "").replace("-", "");
                            value.SalesNov = parseInt(value.SalesNov) || 0;
                            if (value.SalesNov < 0) {
                                value.SalesNov = -value.SalesNov;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov += value.SalesNov;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesNov = value.SalesNov;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(11);
                    }
                    break;
                case 12:
                    if (($scope.currentMonth <= 12 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesDec = parseFloat(value.SalesDec) || 0;
                            value.SalesDec = value.SalesDec.toString().replace(".", "").replace("-", "");
                            value.SalesDec = parseInt(value.SalesDec) || 0;
                            if (value.SalesDec < 0) {
                                value.SalesDec = -value.SalesDec;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec += value.SalesDec;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]].SalesDec = value.SalesDec;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[nextYearPlan].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(12);
                    }
                    break;
                default:
                    console.log('Error month')
                    break;
            }
        }
        else {
            switch (month) {
                case 1:
                    if (($scope.currentMonth == 1 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJan = parseFloat(value.SalesJan) || 0;
                            value.SalesJan = value.SalesJan.toString().replace(".", "").replace("-", "");
                            value.SalesJan = parseInt(value.SalesJan) || 0;
                            if (value.SalesJan < 0) {
                                value.SalesJan = -value.SalesJan;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan += value.SalesJan;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesJan = value.SalesJan;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(1);
                    }
                    break;
                case 2:
                    if (($scope.currentMonth <= 2 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesFeb = parseFloat(value.SalesFeb) || 0;
                            value.SalesFeb = value.SalesFeb.toString().replace(".", "").replace("-", "");
                            value.SalesFeb = parseInt(value.SalesFeb) || 0;
                            if (value.SalesFeb < 0) {
                                value.SalesFeb = -value.SalesFeb;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb += value.SalesFeb;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesFeb = value.SalesFeb;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(2);
                    }
                    break;
                case 3:
                    if (($scope.currentMonth <= 3 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesMar = parseFloat(value.SalesMar) || 0;
                            value.SalesMar = value.SalesMar.toString().replace(".", "").replace("-", "");
                            value.SalesMar = parseInt(value.SalesMar) || 0;
                            if (value.SalesMar < 0) {
                                value.SalesMar = -value.SalesMar;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar += value.SalesMar;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesMar = value.SalesMar;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(3);
                    }
                    break;
                case 4:
                    if (($scope.currentMonth <= 4 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesApr = parseFloat(value.SalesApr) || 0;
                            value.SalesApr = value.SalesApr.toString().replace(".", "").replace("-", "");
                            value.SalesApr = parseInt(value.SalesApr) || 0;
                            if (value.SalesApr < 0) {
                                value.SalesApr = -value.SalesApr;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr += value.SalesApr;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesApr = value.SalesApr;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(4);
                    }
                    break;
                case 5:
                    if (($scope.currentMonth <= 5 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesMay = parseFloat(value.SalesMay) || 0;
                            value.SalesMay = value.SalesMay.toString().replace(".", "").replace("-", "");
                            value.SalesMay = parseInt(value.SalesMay) || 0;
                            if (value.SalesMay < 0) {
                                value.SalesMay = -value.SalesMay;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay += value.SalesMay;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesMay = value.SalesMay;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(5);
                    }
                    break;
                case 6:
                    if (($scope.currentMonth <= 6 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJun = parseFloat(value.SalesJun) || 0;
                            value.SalesJun = value.SalesJun.toString().replace(".", "").replace("-", "");
                            value.SalesJun = parseInt(value.SalesJun) || 0;
                            if (value.SalesJun < 0) {
                                value.SalesJun = -value.SalesJun;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun += value.SalesJun;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]].SalesJun = value.SalesJun;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(6);
                    }
                    break;
                case 7:
                    if (($scope.currentMonth <= 7 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesJul = parseFloat(value.SalesJul) || 0;
                            value.SalesJul = value.SalesJul.toString().replace(".", "").replace("-", "");
                            value.SalesJul = parseInt(value.SalesJul) || 0;
                            if (value.SalesJul < 0) {
                                value.SalesJul = -value.SalesJul;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul += value.SalesJul;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesJul = value.SalesJul;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(7);
                    }
                    break;
                case 8:
                    if (($scope.currentMonth <= 8 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesAug = parseFloat(value.SalesAug) || 0;
                            value.SalesAug = value.SalesAug.toString().replace(".", "").replace("-", "");
                            value.SalesAug = parseInt(value.SalesAug) || 0;
                            if (value.SalesAug < 0) {
                                value.SalesAug = -value.SalesAug;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug += value.SalesAug;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesAug = value.SalesAug;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(8);
                    }
                    break;
                case 9:
                    if (($scope.currentMonth <= 9 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesSep = parseFloat(value.SalesSep) || 0;
                            value.SalesSep = value.SalesSep.toString().replace(".", "").replace("-", "");
                            value.SalesSep = parseInt(value.SalesSep) || 0;
                            if (value.SalesSep < 0) {
                                value.SalesSep = -value.SalesSep;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep += value.SalesSep;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesSep = value.SalesSep;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(9);
                    }
                    break;
                case 10:
                    if (($scope.currentMonth <= 10 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesOct = parseFloat(value.SalesOct) || 0;
                            value.SalesOct = value.SalesOct.toString().replace(".", "").replace("-", "");
                            value.SalesOct = parseInt(value.SalesOct) || 0;
                            if (value.SalesOct < 0) {
                                value.SalesOct = -value.SalesOct;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct += value.SalesOct;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesOct = value.SalesOct;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(10);
                    }
                    break;
                case 11:
                    if (($scope.currentMonth <= 11 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesNov = parseFloat(value.SalesNov) || 0;
                            value.SalesNov = value.SalesNov.toString().replace(".", "").replace("-", "");
                            value.SalesNov = parseInt(value.SalesNov) || 0;
                            if (value.SalesNov < 0) {
                                value.SalesNov = -value.SalesNov;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov += value.SalesNov;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesNov = value.SalesNov;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(11);
                    }
                    break;
                case 12:
                    if (($scope.currentMonth <= 12 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        // Set Sales = auto summing Sales of customer
                        $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec = 0;
                        var i = 0;
                        angular.forEach($scope.NPSSItemPlanListCustomerToDisplay, function (value, key) {
                            value.SalesDec = parseFloat(value.SalesDec) || 0;
                            value.SalesDec = value.SalesDec.toString().replace(".", "").replace("-", "");
                            value.SalesDec = parseInt(value.SalesDec) || 0;
                            if (value.SalesDec < 0) {
                                value.SalesDec = -value.SalesDec;
                            }
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec += value.SalesDec;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]].SalesDec = value.SalesDec;
                            $scope.autoSummingSalesCustomer(value, $scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan1].listNPSSItemCustomer)[i]], $scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer[Object.keys($scope.NPSSItemPlanList[$scope.selectedPlan2].listNPSSItemCustomer)[i]]);
                            i++;
                        });
                        $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec;
                        $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales']);
                        $scope.inputTenderPtojectChanged(12);
                    }
                    break;
                default:
                    console.log('Error month')
                    break;
            }
        }
    }
    // Auto summing H1, H2, Year for pattern
    $scope.autoSummingPatternValue = function (pattern, patternObj1, patternObj2) {
        if (pattern) {
            pattern.PatternValueH1 = pattern.PatternValueJan + pattern.PatternValueFeb + pattern.PatternValueMar + pattern.PatternValueApr + pattern.PatternValueMay + pattern.PatternValueJun;
            pattern.PatternValueH2 = pattern.PatternValueJul + pattern.PatternValueAug + pattern.PatternValueSep + pattern.PatternValueOct + pattern.PatternValueNov + pattern.PatternValueDec;
        }
        patternObj1.PatternValueH1 = patternObj1.PatternValueJan + patternObj1.PatternValueFeb + patternObj1.PatternValueMar + patternObj1.PatternValueApr + patternObj1.PatternValueMay + patternObj1.PatternValueJun;
        patternObj1.PatternValueH2 = patternObj1.PatternValueJul + patternObj1.PatternValueAug + patternObj1.PatternValueSep + patternObj1.PatternValueOct + patternObj1.PatternValueNov + patternObj1.PatternValueDec;
        patternObj1.PatternValueYear = patternObj1.PatternValueH1 + patternObj1.PatternValueH2;
        if (patternObj1.PlanName == 'StockMthRatio') {
            patternObj1.PatternValueH1 = parseFloat(patternObj1.PatternValueH1).toFixed(2);
            patternObj1.PatternValueH2 = parseFloat(patternObj1.PatternValueH2).toFixed(2);
            patternObj1.PatternValueYear = parseFloat(patternObj1.PatternValueYear).toFixed(2);
        }
        if (!$scope.isShowTwoYear) {
            if (pattern) {
                pattern.PatternValueYear = pattern.PatternValueH1 + pattern.PatternValueH2;
            }
        }
        else {
            patternObj2.PatternValueH1 = patternObj2.PatternValueJan + patternObj2.PatternValueFeb + patternObj2.PatternValueMar + patternObj2.PatternValueApr + patternObj2.PatternValueMay + patternObj2.PatternValueJun;
            patternObj2.PatternValueH2 = patternObj2.PatternValueJul + patternObj2.PatternValueAug + patternObj2.PatternValueSep + patternObj2.PatternValueOct + patternObj2.PatternValueNov + patternObj2.PatternValueDec;
            patternObj2.PatternValueYear = patternObj2.PatternValueH1 + patternObj2.PatternValueH2;
            if (pattern) {
                pattern.PatternValueYear = patternObj1.PatternValueYear;
            }
            if (patternObj2.PlanName == 'StockMthRatio') {
                patternObj2.PatternValueH1 = parseFloat(patternObj2.PatternValueH1).toFixed(2);
                patternObj2.PatternValueH2 = parseFloat(patternObj2.PatternValueH2).toFixed(2);
                patternObj2.PatternValueYear = parseFloat(patternObj2.PatternValueYear).toFixed(2);
            }
        }
        if (pattern) {
            if (pattern.PlanName == 'StockMthRatio') {
                pattern.PatternValueH1 = parseFloat(pattern.PatternValueH1).toFixed(2);
                pattern.PatternValueH2 = parseFloat(pattern.PatternValueH2).toFixed(2);
                pattern.PatternValueYear = parseFloat(pattern.PatternValueYear).toFixed(2);
            }
        }
        patternObj2.PatternValuePTerm = patternObj1.PatternValueH2;
    }

    // Input tender/project changed
    $scope.inputTenderPtojectChanged = function (month, isNextYear, isNextofNextYear) {
        $scope.isChange = true;
        if ((!$scope.isShowTwoYear && !isNextYear) || isNextofNextYear) {
            var lastYearPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + ($scope.selectedYear - 1);
            var nextYearPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + ($scope.selectedYear + 1);
            switch (month) {
                case 1:
                    if (($scope.currentMonth == 1 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                        if (!isNextYear) {
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan =
                            $scope.NPSSItemPlanList[lastYearPlan].listPattern['Stock'].PatternValueDec +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJan -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueAug) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJan =
                            $scope.NPSSItemPlanList[lastYearPlan].listPattern['Stock'].PatternValueDec +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueJan -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJan;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueAug) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJan = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJan / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJan = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(2, isNextYear, isNextofNextYear);
                    break;
                case 2:
                    if (($scope.currentMonth <= 2 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueFeb -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueSep) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueFeb =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJan +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueFeb -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueFeb;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueSep) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueFeb = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueFeb / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueFeb = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(3, isNextYear, isNextofNextYear);
                    break;
                case 3:
                    if (($scope.currentMonth <= 3 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueMar -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMar =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueFeb +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueMar -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueMar;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueOct) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMar = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMar / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMar = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(4, isNextYear, isNextofNextYear);
                    break;
                case 4:
                    if (($scope.currentMonth <= 4 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueApr -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueApr =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMar +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueApr -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueApr;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueNov) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueApr = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueApr / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueApr = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(5, isNextYear, isNextofNextYear);
                    break;
                case 5:
                    if (($scope.currentMonth <= 5 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueMay -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMay =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueApr +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueMay -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueMay;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[lastYearPlan].listPattern['Sales'].PatternValueDec) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMay = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMay / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueMay = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(6, isNextYear, isNextofNextYear);
                    break;
                case 6:
                    if (($scope.currentMonth <= 6 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJun -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJun =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueMay +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueJun -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJun;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJan) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJun = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJun / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJun = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(7, isNextYear, isNextofNextYear);
                    break;
                case 7:
                    if (($scope.currentMonth <= 7 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJul -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJul =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJun +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueJul -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueJul;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueFeb) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJul = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJul / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueJul = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(8, isNextYear, isNextofNextYear);
                    break;
                case 8:
                    if (($scope.currentMonth <= 8 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueAug -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueAug =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueJul +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueAug -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueAug;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMar) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueAug = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueAug / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueAug = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(9, isNextYear, isNextofNextYear);
                    break;
                case 9:
                    if (($scope.currentMonth <= 9 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueSep -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueSep =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueAug +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueSep -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueSep;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueApr) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueSep = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueSep / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueSep = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(10, isNextYear, isNextofNextYear);
                    break;
                case 10:
                    if (($scope.currentMonth <= 10 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueOct -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueOct =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueSep +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueOct -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueOct -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueOct;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueMay) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueOct = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueOct / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueOct = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(11, isNextYear, isNextofNextYear);
                    break;
                case 11:
                    if (($scope.currentMonth <= 11 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueNov -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueNov =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueOct +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueNov -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueNov -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueNov;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJun) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueNov = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueNov / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueNov = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(12, isNextYear, isNextofNextYear);
                    break;
                case 12:
                    if (($scope.currentMonth <= 12 && $scope.selectedYear == $scope.currentYear) || $scope.selectedYear > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec =
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueDec -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueDec =
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueNov +
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Income'].PatternValueDec -
                            $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueDec -
                           $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['TenderProject'].PatternValueDec;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Sales'].PatternValueJul) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueDec = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['Stock'].PatternValueDec / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'].PatternValueDec = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[nextYearPlan].listPattern['StockMthRatio']);
                        }
                    }
                    if (!isNextYear) {
                        $scope.nextTermClick();
                    }
                    break;
                default:
                    console.log('Error month')
                    break;
            }
        }
        else {
            switch (month) {
                case 1:
                    if (($scope.currentMonth == 1 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueDec +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJan -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJan / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJan = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJan;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJan =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueDec +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueJan -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueJan;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJan = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJan / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJan = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(2, isNextYear, isNextofNextYear);
                    break;
                case 2:
                    if (($scope.currentMonth <= 2 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJan +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueFeb -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueFeb / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueFeb = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueFeb;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueFeb =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJan +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueFeb -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueFeb;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueFeb = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueFeb / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueFeb = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(3, isNextYear, isNextofNextYear);
                    break;
                case 3:
                    if (($scope.currentMonth <= 3 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueFeb +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueMar -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMar / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMar = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMar;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMar =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueFeb +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueMar -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueMar;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMar = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMar / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMar = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(4, isNextYear, isNextofNextYear);
                    break;
                case 4:
                    if (($scope.currentMonth <= 4 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMar +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueApr -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueApr / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueApr = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueApr;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueApr =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMar +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueApr -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueApr -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueApr;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueApr = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueApr / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueApr = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(5, isNextYear, isNextofNextYear);
                    break;
                case 5:
                    if (($scope.currentMonth <= 5 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueApr +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueMay -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueMay / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMay = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueMay;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMay =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueApr +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueMay -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMay -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueMay;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMay = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMay / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueMay = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(6, isNextYear, isNextofNextYear);
                    break;
                case 6:
                    if (($scope.currentMonth <= 6 && $scope.selectedYear2 == $scope.currentYear) || $scope.selectedYear2 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMay +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJun -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJan) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJun / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJun = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJun;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJun =
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueMay +
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Income'].PatternValueJun -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJun -
                            $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject'].PatternValueJun;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueFeb +
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Sales'].PatternValueJan) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJun = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock'].PatternValueJun / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio'].PatternValueJun = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    if (!isNextYear) {
                        $scope.nextTermClick();
                    }
                    break;
                case 7:
                    if (($scope.currentMonth <= 7 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJun +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueJul -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueFeb) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueJul / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueJul = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueJul;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJul =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJun +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueJul -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueJul;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMar +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueFeb) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueJul = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJul / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueJul = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(8, isNextYear, isNextofNextYear);
                    break;
                case 8:
                    if (($scope.currentMonth <= 8 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJul +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueAug -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMar) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueAug / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueAug = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueAug;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueAug =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueJul +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueAug -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueAug;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMar) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueAug = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueAug / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueAug = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(9, isNextYear, isNextofNextYear);
                    break;
                case 9:
                    if (($scope.currentMonth <= 9 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueAug +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueSep -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueSep / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueSep = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueSep;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueSep =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueAug +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueSep -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueSep;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueApr) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueSep = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueSep / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueSep = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(10, isNextYear, isNextofNextYear);
                    break;
                case 10:
                    if (($scope.currentMonth <= 10 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueSep +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueOct -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueOct / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueOct = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueOct;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueOct =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueSep +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueOct -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueOct;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueMay) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueOct = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueOct / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueOct = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(11, isNextYear, isNextofNextYear);
                    break;
                case 11:
                    if (($scope.currentMonth <= 11 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueOct +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueNov -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueNov / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueNov = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueNov;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueNov =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueOct +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueNov -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueNov;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJun) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueNov = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueNov / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueNov = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(12, isNextYear, isNextofNextYear);
                    break;
                case 12:
                    if (($scope.currentMonth <= 12 && $scope.selectedYear1 == $scope.currentYear) || $scope.selectedYear1 > $scope.currentYear) {
                        if (!isNextYear) {
                            // Set Stock =  LM.Stock + TM.Incoming - TM.Sales  - TM.TenderProject
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = parseFloat($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec) || 0;
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec.toString().replace(".", "").replace("-", "");
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = parseInt($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec) || 0;
                            if ($scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec < 0) {
                                $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec = -$scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            }
                            $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueNov +
                            $scope.NPSSItemPlanListToDisplay['Income'].PatternValueDec -
                            $scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec -
                            $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['TenderProject'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['Stock']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanListToDisplay['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanListToDisplay['Stock'].PatternValueDec / average;
                                $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec = parseFloat(result.toFixed(2));
                            }
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueDec = $scope.NPSSItemPlanListToDisplay['StockMthRatio'].PatternValueDec;
                            $scope.autoSummingPatternValue($scope.NPSSItemPlanListToDisplay['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                        else {
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueDec =
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueNov +
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Income'].PatternValueDec -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec -
                            $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'].PatternValueDec;
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['TenderProject'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['TenderProject']);
                            // Set Stock-Mth Ratio =  Stock/(Average of the past 5 month Sales + TM.Sales)
                            var average = ($scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueDec +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueNov +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueOct +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueSep +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueAug +
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Sales'].PatternValueJul) / 6;
                            if (average == 0) {
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueDec = 0;
                            }
                            else {
                                average = parseFloat(average) || 0;
                                var result = $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['Stock'].PatternValueDec / average;
                                $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'].PatternValueDec = parseFloat(result.toFixed(2));
                            }
                            $scope.autoSummingPatternValue(null, $scope.NPSSItemPlanList[$scope.selectedPlan1].listPattern['StockMthRatio'], $scope.NPSSItemPlanList[$scope.selectedPlan2].listPattern['StockMthRatio']);
                        }
                    }
                    $scope.inputTenderPtojectChanged(1, isNextYear, isNextofNextYear);
                    break;
                default:
                    console.log('Error month')
                    break;
            }
        }
    }
    // Input stock Mth Ratio Header changed
    $scope.inputStockMthRatioHeaderChanged = function () {
        $scope.isChange = true;
        $scope.StockMthRatioHeader = parseFloat($scope.StockMthRatioHeader) || 0;
        if (!$scope.isShowTwoYear) {
            $scope.NPSSItemPlanList[$scope.selectedPlan].StockMthRatioHeader = $scope.StockMthRatioHeader;
        }
        else {
            $scope.NPSSItemPlanList[$scope.selectedPlan2].StockMthRatioHeader = $scope.StockMthRatioHeader;
        }
    }
    // Input Standard TurnOver Ratio Changed
    $scope.inputStandardTurnOverRatioChanged = function () {
        if ($scope.rodeID == 5 || $scope.selectedPlanStatus == 1) {
            return;
        }
        $scope.isChange = true;
        $scope.StandardTurnOverRatio = parseFloat($scope.StandardTurnOverRatio) || 0;
        $scope.StandardTurnOverRatio = $scope.StandardTurnOverRatio > MAXDECIMAL ? MAXDECIMAL : $scope.StandardTurnOverRatio;
        if (!$scope.isShowTwoYear) {
            $scope.NPSSItemPlanList[$scope.selectedPlan].StandardTurnOverRatio = $scope.StandardTurnOverRatio;
        }
        else {
            $scope.NPSSItemPlanList[$scope.selectedPlan2].StandardTurnOverRatio = $scope.StandardTurnOverRatio;
        }
        $scope.calculatePurchase($scope.currentYear);
        $scope.calculatePurchase($scope.currentYear + 1);
        $scope.refreshDataDisplay(true);
        $scope.nextTermClick();
    }
    // calculate Purchase
    $scope.calculatePurchase = function (year) {
        var lastPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + (year - 1);
        var currentPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + year;
        var nextPlan = $scope.selectedBusinessID + "." + $scope.selectedDivisionID + "." + $scope.selectedCategoryID + "." + $scope.selectedItemID + "." + $scope.selectedCompanyID + "." + (year + 1);
        var lastPattern = $scope.NPSSItemPlanList[lastPlan].listPattern;
        var currentPattern = $scope.NPSSItemPlanList[currentPlan].listPattern;
        var nextPattern = $scope.NPSSItemPlanList[nextPlan].listPattern;
        var avgSales = 0;
        // purchase of Jan
        if (($scope.currentMonth == 1 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueJan = ((currentPattern["Sales"].PatternValueFeb + lastPattern["TenderProject"].PatternValueFeb) * $scope.StandardTurnOverRatio - lastPattern["Stock"].PatternValueDec + currentPattern["Sales"].PatternValueJan + currentPattern["TenderProject"].PatternValueJan).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueJan = parseInt(currentPattern["Purchase"].PatternValueJan);
        currentPattern["Income"].PatternValueJan = currentPattern["Purchase"].PatternValueJan;
        if (($scope.currentMonth == 1 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueJan = lastPattern["Stock"].PatternValueDec + currentPattern["Income"].PatternValueJan - currentPattern["Sales"].PatternValueJan - currentPattern["TenderProject"].PatternValueJan;
            avgSales = parseFloat(((lastPattern["Sales"].PatternValueAug + lastPattern["Sales"].PatternValueSep + lastPattern["Sales"].PatternValueOct + lastPattern["Sales"].PatternValueNov + lastPattern["Sales"].PatternValueDec + currentPattern["Sales"].PatternValueJan) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueJan = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueJan = parseFloat((currentPattern["Stock"].PatternValueJan / avgSales).toFixed(2));
            }
        }

        // purchase of Feb
        if (($scope.currentMonth <= 2 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueFeb = ((currentPattern["Sales"].PatternValueFeb + currentPattern["TenderProject"].PatternValueFeb) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueJan + currentPattern["Sales"].PatternValueFeb + currentPattern["TenderProject"].PatternValueFeb).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueFeb = parseInt(currentPattern["Purchase"].PatternValueFeb);
        currentPattern["Income"].PatternValueFeb = currentPattern["Purchase"].PatternValueFeb;
        if (($scope.currentMonth <= 2 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueFeb = currentPattern["Stock"].PatternValueJan + currentPattern["Income"].PatternValueFeb - currentPattern["Sales"].PatternValueFeb - currentPattern["TenderProject"].PatternValueFeb;
            avgSales = parseFloat(((lastPattern["Sales"].PatternValueSep + lastPattern["Sales"].PatternValueOct + lastPattern["Sales"].PatternValueNov + lastPattern["Sales"].PatternValueDec + currentPattern["Sales"].PatternValueJan + currentPattern["Sales"].PatternValueFeb) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueFeb = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueFeb = parseFloat((currentPattern["Stock"].PatternValueFeb / avgSales).toFixed(2));
            }
        }

        // purchase of Mar
        if (($scope.currentMonth <= 3 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueMar = ((currentPattern["Sales"].PatternValueFeb + currentPattern["TenderProject"].PatternValueMar) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueFeb + currentPattern["Sales"].PatternValueMar + currentPattern["TenderProject"].PatternValueMar).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueMar = parseInt(currentPattern["Purchase"].PatternValueMar);
        currentPattern["Income"].PatternValueMar = currentPattern["Purchase"].PatternValueMar;
        if (($scope.currentMonth <= 3 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueMar = currentPattern["Stock"].PatternValueFeb + currentPattern["Income"].PatternValueMar - currentPattern["Sales"].PatternValueMar - currentPattern["TenderProject"].PatternValueMar;
            avgSales = parseFloat(((lastPattern["Sales"].PatternValueOct + lastPattern["Sales"].PatternValueNov + lastPattern["Sales"].PatternValueDec + currentPattern["Sales"].PatternValueJan + currentPattern["Sales"].PatternValueFeb + currentPattern["Sales"].PatternValueMar) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueMar = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueMar = parseFloat((currentPattern["Stock"].PatternValueMar / avgSales).toFixed(2));
            }
        }

        // purchase of Apr
        if (($scope.currentMonth <= 4 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueApr = ((currentPattern["Sales"].PatternValueFeb + currentPattern["TenderProject"].PatternValueApr) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueMar + currentPattern["Sales"].PatternValueApr + currentPattern["TenderProject"].PatternValueApr).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueApr = parseInt(currentPattern["Purchase"].PatternValueApr);
        currentPattern["Income"].PatternValueApr = currentPattern["Purchase"].PatternValueApr;
        if (($scope.currentMonth <= 4 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueApr = currentPattern["Stock"].PatternValueMar + currentPattern["Income"].PatternValueApr - currentPattern["Sales"].PatternValueApr - currentPattern["TenderProject"].PatternValueApr;
            avgSales = parseFloat(((lastPattern["Sales"].PatternValueNov + lastPattern["Sales"].PatternValueDec + currentPattern["Sales"].PatternValueJan + currentPattern["Sales"].PatternValueFeb + currentPattern["Sales"].PatternValueMar + currentPattern["Sales"].PatternValueApr) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueApr = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueApr = parseFloat((currentPattern["Stock"].PatternValueApr / avgSales).toFixed(2));
            }
        }

        // purchase of May
        if (($scope.currentMonth <= 5 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueMay = ((currentPattern["Sales"].PatternValueMay + currentPattern["TenderProject"].PatternValueMay) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueApr + currentPattern["Sales"].PatternValueMay + currentPattern["TenderProject"].PatternValueMay).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueMay = parseInt(currentPattern["Purchase"].PatternValueMay);
        currentPattern["Income"].PatternValueMay = currentPattern["Purchase"].PatternValueMay;
        if (($scope.currentMonth <= 5 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueMay = currentPattern["Stock"].PatternValueApr + currentPattern["Income"].PatternValueMay - currentPattern["Sales"].PatternValueMay - currentPattern["TenderProject"].PatternValueMay;
            avgSales = parseFloat(((lastPattern["Sales"].PatternValueDec + currentPattern["Sales"].PatternValueJan + currentPattern["Sales"].PatternValueFeb + currentPattern["Sales"].PatternValueMar + currentPattern["Sales"].PatternValueApr + currentPattern["Sales"].PatternValueMay) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueMay = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueMay = parseFloat((currentPattern["Stock"].PatternValueMay / avgSales).toFixed(2));
            }
        }

        // purchase of Jun
        if (($scope.currentMonth <= 6 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueJun = ((currentPattern["Sales"].PatternValueJun + currentPattern["TenderProject"].PatternValueJun) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueMay + currentPattern["Sales"].PatternValueJun + currentPattern["TenderProject"].PatternValueJun).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueJun = parseInt(currentPattern["Purchase"].PatternValueJun);
        currentPattern["Income"].PatternValueJun = currentPattern["Purchase"].PatternValueJun;
        if (($scope.currentMonth <= 6 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueJun = currentPattern["Stock"].PatternValueMay + currentPattern["Income"].PatternValueJun - currentPattern["Sales"].PatternValueJun - currentPattern["TenderProject"].PatternValueJun;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueJan + currentPattern["Sales"].PatternValueFeb + currentPattern["Sales"].PatternValueMar + currentPattern["Sales"].PatternValueApr + currentPattern["Sales"].PatternValueMay + currentPattern["Sales"].PatternValueJun) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueJun = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueJun = parseFloat((currentPattern["Stock"].PatternValueJun / avgSales).toFixed(2));
            }
        }

        currentPattern["Purchase"].PatternValueH1 = currentPattern["Purchase"].PatternValueJan + currentPattern["Purchase"].PatternValueFeb + currentPattern["Purchase"].PatternValueMar + currentPattern["Purchase"].PatternValueApr + currentPattern["Purchase"].PatternValueMay + currentPattern["Purchase"].PatternValueJun;

        currentPattern["Income"].PatternValueH1 = currentPattern["Income"].PatternValueJan + currentPattern["Income"].PatternValueFeb + currentPattern["Income"].PatternValueMar + currentPattern["Income"].PatternValueApr + currentPattern["Income"].PatternValueMay + currentPattern["Income"].PatternValueJun;

        currentPattern["Stock"].PatternValueH1 = currentPattern["Stock"].PatternValueJan + currentPattern["Stock"].PatternValueFeb + currentPattern["Stock"].PatternValueMar + currentPattern["Stock"].PatternValueApr + currentPattern["Stock"].PatternValueMay + currentPattern["Stock"].PatternValueJun;

        currentPattern["StockMthRatio"].PatternValueH1 = currentPattern["StockMthRatio"].PatternValueJan + currentPattern["StockMthRatio"].PatternValueFeb + currentPattern["StockMthRatio"].PatternValueMar + currentPattern["StockMthRatio"].PatternValueApr + currentPattern["StockMthRatio"].PatternValueMay + currentPattern["StockMthRatio"].PatternValueJun;

        // purchase of Jul
        if (($scope.currentMonth <= 7 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueJul = ((currentPattern["Sales"].PatternValueJul + currentPattern["TenderProject"].PatternValueJul) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueJun + currentPattern["Sales"].PatternValueJul + currentPattern["TenderProject"].PatternValueJul).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueJul = parseInt(currentPattern["Purchase"].PatternValueJul);
        currentPattern["Income"].PatternValueJul = currentPattern["Purchase"].PatternValueJul;
        if (($scope.currentMonth <= 7 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueJul = currentPattern["Stock"].PatternValueJun + currentPattern["Income"].PatternValueJul - currentPattern["Sales"].PatternValueJul - currentPattern["TenderProject"].PatternValueJul;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueFeb + currentPattern["Sales"].PatternValueMar + currentPattern["Sales"].PatternValueApr + currentPattern["Sales"].PatternValueMay + currentPattern["Sales"].PatternValueJun + currentPattern["Sales"].PatternValueJul) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueJul = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueJul = parseFloat((currentPattern["Stock"].PatternValueJul / avgSales).toFixed(2));
            }
        }

        // purchase of Aug
        if (($scope.currentMonth <=8 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueAug = ((currentPattern["Sales"].PatternValueAug + currentPattern["TenderProject"].PatternValueAug) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueJul + currentPattern["Sales"].PatternValueAug + currentPattern["TenderProject"].PatternValueAug).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueAug = parseInt(currentPattern["Purchase"].PatternValueAug);
        currentPattern["Income"].PatternValueAug = currentPattern["Purchase"].PatternValueAug;
        if (($scope.currentMonth <= 8 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueAug = currentPattern["Stock"].PatternValueJul + currentPattern["Income"].PatternValueAug - currentPattern["Sales"].PatternValueAug - currentPattern["TenderProject"].PatternValueAug;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueMar + currentPattern["Sales"].PatternValueApr + currentPattern["Sales"].PatternValueMay + currentPattern["Sales"].PatternValueJun + currentPattern["Sales"].PatternValueJul + currentPattern["Sales"].PatternValueAug) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueAug = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueAug = parseFloat((currentPattern["Stock"].PatternValueAug / avgSales).toFixed(2));
            }
        }

        // purchase of Sep
        if (($scope.currentMonth <= 9 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueSep = ((currentPattern["Sales"].PatternValueSep + currentPattern["TenderProject"].PatternValueSep) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueAug + currentPattern["Sales"].PatternValueSep + currentPattern["TenderProject"].PatternValueSep).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueSep = parseInt(currentPattern["Purchase"].PatternValueSep);
        currentPattern["Income"].PatternValueSep = currentPattern["Purchase"].PatternValueSep;
        if (($scope.currentMonth <= 9 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueSep = currentPattern["Stock"].PatternValueAug + currentPattern["Income"].PatternValueSep - currentPattern["Sales"].PatternValueSep - currentPattern["TenderProject"].PatternValueSep;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueApr + currentPattern["Sales"].PatternValueMay + currentPattern["Sales"].PatternValueJun + currentPattern["Sales"].PatternValueJul + currentPattern["Sales"].PatternValueAug + currentPattern["Sales"].PatternValueSep) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueSep = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueSep = parseFloat((currentPattern["Stock"].PatternValueSep / avgSales).toFixed(2));
            }
        }

        // purchase of Oct
        if (($scope.currentMonth <= 10 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueOct = ((currentPattern["Sales"].PatternValueOct + currentPattern["TenderProject"].PatternValueOct) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueSep + currentPattern["Sales"].PatternValueOct + currentPattern["TenderProject"].PatternValueOct).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueOct = parseInt(currentPattern["Purchase"].PatternValueOct);
        currentPattern["Income"].PatternValueOct = currentPattern["Purchase"].PatternValueOct;
        if (($scope.currentMonth <= 10 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueOct = currentPattern["Stock"].PatternValueSep + currentPattern["Income"].PatternValueOct - currentPattern["Sales"].PatternValueOct - currentPattern["TenderProject"].PatternValueOct;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueMay + currentPattern["Sales"].PatternValueJun + currentPattern["Sales"].PatternValueJul + currentPattern["Sales"].PatternValueAug + currentPattern["Sales"].PatternValueSep + currentPattern["Sales"].PatternValueOct) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueOct = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueOct = parseFloat((currentPattern["Stock"].PatternValueOct / avgSales).toFixed(2));
            }
        }

        // purchase of Nov
        if (($scope.currentMonth <= 11 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueNov = ((currentPattern["Sales"].PatternValueNov + currentPattern["TenderProject"].PatternValueNov) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueOct + currentPattern["Sales"].PatternValueNov + currentPattern["TenderProject"].PatternValueNov).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueNov = parseInt(currentPattern["Purchase"].PatternValueNov);
        currentPattern["Income"].PatternValueNov = currentPattern["Purchase"].PatternValueNov;
        if (($scope.currentMonth <= 11 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueNov = currentPattern["Stock"].PatternValueOct + currentPattern["Income"].PatternValueNov - currentPattern["Sales"].PatternValueNov - currentPattern["TenderProject"].PatternValueNov;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueJun + currentPattern["Sales"].PatternValueJul + currentPattern["Sales"].PatternValueAug + currentPattern["Sales"].PatternValueSep + currentPattern["Sales"].PatternValueOct + currentPattern["Sales"].PatternValueNov) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueNov = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueNov = parseFloat((currentPattern["Stock"].PatternValueNov / avgSales).toFixed(2));
            }
        }

        // purchase of Dec
        if (($scope.currentMonth <= 12 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Purchase"].PatternValueDec = ((currentPattern["Sales"].PatternValueDec + currentPattern["TenderProject"].PatternValueDec) * $scope.StandardTurnOverRatio - currentPattern["Stock"].PatternValueNov + currentPattern["Sales"].PatternValueDec + currentPattern["TenderProject"].PatternValueDec).toFixed(0);
        }
        currentPattern["Purchase"].PatternValueDec = parseInt(currentPattern["Purchase"].PatternValueDec);
        currentPattern["Income"].PatternValueDec = currentPattern["Purchase"].PatternValueDec;
        if (($scope.currentMonth <= 12 && year == $scope.currentYear) || year > $scope.currentYear) {
            currentPattern["Stock"].PatternValueDec = currentPattern["Stock"].PatternValueNov + currentPattern["Income"].PatternValueDec - currentPattern["Sales"].PatternValueDec - currentPattern["TenderProject"].PatternValueDec;
            avgSales = parseFloat(((currentPattern["Sales"].PatternValueJul + currentPattern["Sales"].PatternValueAug + currentPattern["Sales"].PatternValueSep + currentPattern["Sales"].PatternValueOct + currentPattern["Sales"].PatternValueNov + currentPattern["Sales"].PatternValueDec) / 6).toFixed(2));
            if (avgSales == 0) {
                currentPattern["StockMthRatio"].PatternValueDec = 0;
            }
            else {
                currentPattern["StockMthRatio"].PatternValueDec = parseFloat((currentPattern["Stock"].PatternValueDec / avgSales).toFixed(2));
            }
        }

        currentPattern["Purchase"].PatternValueH2 = currentPattern["Purchase"].PatternValueJul + currentPattern["Purchase"].PatternValueAug + currentPattern["Purchase"].PatternValueSep + currentPattern["Purchase"].PatternValueOct + currentPattern["Purchase"].PatternValueNov + currentPattern["Purchase"].PatternValueDec;

        currentPattern["Income"].PatternValueH2 = currentPattern["Income"].PatternValueJul + currentPattern["Income"].PatternValueAug + currentPattern["Income"].PatternValueSep + currentPattern["Income"].PatternValueOct + currentPattern["Income"].PatternValueNov + currentPattern["Income"].PatternValueDec;

        currentPattern["Stock"].PatternValueH2 = currentPattern["Stock"].PatternValueJul + currentPattern["Stock"].PatternValueAug + currentPattern["Stock"].PatternValueSep + currentPattern["Stock"].PatternValueOct + currentPattern["Stock"].PatternValueNov + currentPattern["Stock"].PatternValueDec;

        currentPattern["StockMthRatio"].PatternValueH2 = currentPattern["StockMthRatio"].PatternValueJul + currentPattern["StockMthRatio"].PatternValueAug + currentPattern["StockMthRatio"].PatternValueSep + currentPattern["StockMthRatio"].PatternValueOct + currentPattern["StockMthRatio"].PatternValueNov + currentPattern["StockMthRatio"].PatternValueDec;

        currentPattern["Purchase"].PatternValueYear = currentPattern["Purchase"].PatternValueH1 + currentPattern["Purchase"].PatternValueH2;

        currentPattern["Income"].PatternValueYear = currentPattern["Income"].PatternValueH1 + currentPattern["Income"].PatternValueH2;

        currentPattern["Stock"].PatternValueYear = currentPattern["Stock"].PatternValueH1 + currentPattern["Stock"].PatternValueH2;

        currentPattern["StockMthRatio"].PatternValueYear = currentPattern["StockMthRatio"].PatternValueH1 + currentPattern["StockMthRatio"].PatternValueH2;
    }

    // Format year month
    $scope.getYearMonthFormat = function (yearMonth) {
        var year = yearMonth.substring(0, 4);
        var month = yearMonth.substring(4, 6);

        return month + "/" + year;
    }
});

// filter customer
app.filter('filterCustomer', function () {
    return function (items, letter) {
        var filtered = [];
        if (!letter) {
            return items;
        }
        angular.forEach(items, function (v) {
            if (v.Customer.CustomerCode.toLowerCase().indexOf(letter.toLowerCase()) != -1 || v.Customer.CustomerAbbreviation.toLowerCase().indexOf(letter.toLowerCase()) != -1) {
                filtered.push(v);
            }
        })
        return filtered;
    };
});

// order object
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
    return function (object) {
        if (!angular.isObject(object)) return object;

        var array = [];
        var keys = Object.keys(object).sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < keys.length;i++) {
            array.push(object[keys[i]]);
        }
        return array;
    }
});

// Order object
app.filter('orderObjectByProperty', function () {
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

//Design

$(document).ready(function () {
    paintTable();
    setAllTableHeight();
    $('#item-code').selectpicker({
        container: '.item-plan-code'
    });

    var displayBtn = $('.item-plan-code .bootstrap-select>button');
    $('#item-code.selectpicker').on('shown.bs.select', function (e) {
        var searchBox = $('.item-plan-code .bs-container.open .bs-searchbox');
        displayBtn.hide();
        $(this).parent().append(searchBox);
        $(this).parent().find('.bs-searchbox').show();
    }).on('hide.bs.select', function (e) {
        $(this).parent().find('button').show();
        $(this).parent().find('.bs-searchbox').hide();
    });
});

$('.table-term-navigation a').click(function () {
    setAllTableHeight();
});

function paintTable() {
    //Set color for table by condition. All class can be control by change class in table header
    //If 1st term expand 7 columns
    if ($('.col-term').hasClass('term-1')) {
        $('.term-1').attr('colspan', 7);
    }

    //If 2nd term expand 8 columns
    if ($('.col-term').hasClass('term-2')) {
        $('.term-2').attr('colspan', 8);
    }
    $('.term-1>span').remove();
    $('.term-2>span').remove();

    if ($('.col-term').hasClass('current-term')) {
        //Add text Current
        $('.col-term.current-term>span').remove();
        $('.col-term.current-term').append('<span>(CURRENT)</span>');
    }
}

//set height for customer table to scroll
$(window).resize(function () {
    setAllTableHeight();
});

// nsoScreenChange();
$(document).on('click', '#menu-toggle', function () {
    paintTable();
    setAllTableHeight();
});

//on page load 
$(window).resize();

function setAllTableHeight() {
    //Set height for table customer
    var h_page_header = $('.page-header').height();
    var h_search = $('.advance-form').height();
    var h_footer = $('.table-term-navigation').height();
    var the_whole_screen = $('#page-content-wrapper').height();

    var allTableWrapper = the_whole_screen - h_page_header - h_search - 30;
    $('#main-content-zone').height(allTableWrapper);

    var h_table_plan = (allTableWrapper * 2) / 3;
    var h_table_plan = allTableWrapper - h_table_cus_actual;
    var h_table_plan_actual = $('#item-plan-wrapper table').height();
    var h_table_plan_display = h_table_plan_actual > h_table_plan ? h_table_plan : h_table_plan_actual;

    var h_table_cus = allTableWrapper - h_table_plan_display;
    var h_table_cus_actual = $('#nso-item-plan-table-customer-wrapper table').height() + 140;
    var h_table_cus_display = h_table_cus_actual > h_table_cus ? h_table_cus : h_table_cus_actual;
    $('#nso-item-plan-table-customer-wrapper').height(h_table_cus_display - 139);
    $('.customer-fixed-header').height(h_table_cus_display - 76);


    // 57 is the padding top for fixed header
    $('#item-plan-wrapper').height(h_table_plan_display+20);
    $('.item-plan-parent-wrapper').height(h_table_plan_display+50);

    //Table customer
    var cwidthNoScroll = $('#nso-item-plan-table-plan')[0].clientWidth;
    var cwidthHaveScroll = $('#nso-item-plan-table-plan')[0].getBoundingClientRect().width;

    var tableCustomer = $('#nso-item-plan-table-customer-wrapper');
    if (scrollbarVisible(tableCustomer[0])) {
        $('#nso-item-plan-table-customer thead').width(cwidthHaveScroll);
        $('#nso-item-plan-table-customer tfoot').width(cwidthHaveScroll);
    } else {
        $('#nso-item-plan-table-customer thead').width(cwidthNoScroll);
        $('#nso-item-plan-table-customer tfoot').width(cwidthNoScroll);
    }

    //Table item plan
    var pwidthNoScroll = $('#nso-item-plan-table-plan')[0].clientWidth;
    var pwidthHaveScroll = $('#nso-item-plan-table-plan')[0].getBoundingClientRect().width;

    var tablePlan = $('.item-plan-parent-wrapper');
    if (scrollbarVisible(tablePlan[0])) {
        $('#item-plan-wrapper thead').width(pwidthHaveScroll);
    } else {
        $('#item-plan-wrapper thead').width(pwidthNoScroll);
    }
    var countWidthTd = 0;
    var leftTerm = 0;
    var rightTerm = 0;
    var figureYearPos;
    $('table#nso-item-plan-table-customer>thead>tr.table-header-match-below-col>td').each(function () {
        if ($(this).hasClass('figure-year')) {
            figureYearPos = $(this).index();
        }
    });
    var firstTDs = 0;
    var countKeyTdWidth = 0;

    $('table#nso-item-plan-table-plan>tbody>tr:first>td').each(function () {
        var tdIndex = $(this).index();
        var tdIndexLength = $(this).width();
        $('table#nso-item-plan-table-customer>thead>tr>td').eq(tdIndex).width(tdIndexLength);
        $('table#nso-item-plan-table-plan>thead>tr.table-header-match-below-col>td').eq(tdIndex).width(tdIndexLength);
    });
}

//Check whether if has scrollbar or not
function scrollbarVisible(element) {
    return element.scrollHeight > element.clientHeight;
}
