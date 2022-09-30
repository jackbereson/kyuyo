'use strict'
var app = angular.module('authority', []);
app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(true);
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

app.controller("AuthorityCtrl", function ($scope, $window, $http, authorityForm) {
    //Init
    $scope.doInit = function () {
        $('#authority-page').show();
        var authorityModel = authorityForm.form;
        $scope.form = {};
        $scope.form.adAcccount = '';
        $scope.form.userName = '';
        $scope.form.userCompany = {};
        $scope.form.userCompany.List = authorityModel.UserCompany;
        $scope.form.userCompany.selectedUserCompany = authorityModel.UserCompany[0].CustomerCode;
        $scope.form.userRole = {};
        $scope.form.userRole.List = authorityModel.UserRoles;
        $scope.form.userRole.selectedRoleID = authorityModel.UserRoles[0].RoleID;
        $scope.form.userRole.userLoginRolePriority = authorityModel.UserInfo.RoleObj.Priority;
        $scope.form.businessUnit = {};
        $scope.form.businessUnit.ID = authorityModel.UserInfo.SelectedBusinessDivision.BusinessUnit.BusinessUnitID;
        $scope.form.businessUnit.Code = authorityModel.UserInfo.SelectedBusinessDivision.BusinessUnit.BusinessUnitCode;

        $scope.form.companyAccess = {};
        $scope.form.companyAccess.List = authorityModel.UserInfo.UserMasterObj.CompanyAccess;
        $scope.form.companyAccess.selectedItems = '';

        $scope.form.divisionAccess = {};
        $scope.form.divisionAccess.List = authorityModel.UserInfo.SelectedBusinessDivision.DivisionsAccess;
        $scope.form.divisionAccess.selectedItems = '';

        $scope.form.userList = {};
        $scope.form.userList.List = $scope.updateDisplayName(authorityModel.UserList, $scope.form.userCompany.List);

        $scope.form.userList.allRole = {};
        $scope.form.userList.allRole.List = authorityModel.AllRoles;
        $scope.form.userList.allRole.selectedAllRoleID = -1;

        $scope.form.userList.companyFilter = {};
        $scope.form.userList.companyFilter.List = authorityModel.UserCompany;
        $scope.form.userList.companyFilter.selectedCompany = [];

        $scope.form.userList.divisionFilter = {};
        $scope.form.userList.divisionFilter.List = authorityModel.Divisions;
        $scope.form.userList.divisionFilter.selectedDivision = [];

        $scope.form.userInfo = authorityModel.UserInfo;
        $scope.form.availableUsers = authorityModel.AvailableUsers;
        $scope.form.availableUsersTemp = authorityModel.AvailableUsers;

        //init autocomplete
        $scope.doInitAutoComplete($scope.form.availableUsers, false);

        //Init button area
        $scope.btnCreateAuthority = false;
        $scope.btnUpdateAuthority = false;

        //Init errors
        $scope.doErrorRefresh();

        //If NSO-Planner
        if ($scope.form.userRole.selectedRoleID == 5) {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.userRoleChange(true);
                });
            }, 100);
        }
        $('#authority-loading').hide();
    }

    //Init autoComplete
    $scope.doInitAutoComplete = function (userData, updateSourceFlag) {
        var userArray = [];
        angular.forEach(userData, function (value, key) {
            var obj = {};
            obj.ADAccount = value.ADAccount;
            obj.Username = value.Username;
            obj.Department = value.Department;
            userArray.push(obj);
        });
        if (updateSourceFlag) {
            $('#authority-ad').typeahead('destroy');
            $('#authority-username').typeahead('destroy');
        }
        // AD account
        var adAccount = new Bloodhound({
            datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.ADAccount); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: userArray
        });
        // initialize the bloodhound suggestion engine
        adAccount.initialize();
        // instantiate the typeahead UI
        $('#authority-ad').typeahead(null, {
            displayKey: 'ADAccount',
            source: adAccount.ttAdapter(),
            showHintOnFocus: true
        });

        //Username
        var username = new Bloodhound({
            datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.Username); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: userArray
        });
        // initialize the bloodhound suggestion engine
        username.initialize();

        // instantiate the typeahead UI
        $('#authority-username').typeahead(null, {
            displayKey: 'Username',
            source: username.ttAdapter(),
            templates: {
                suggestion: function (data) {
                    return '<div><strong>' + data.Username + '</strong><p>' + data.Department + '</p></div>';
                }
            },
            showHintOnFocus: true
        });
    }

    //when clicks on user item
    $scope.showEditAuthorityPopup = function (adAccount, businessUnitID) {
        $scope.editAuthority = {};
        $http({
            method: 'POST',
            url: '/Authority/GetUserInfoForUpdate',
            data: {
                adAccount: adAccount,
                businessUnitID: businessUnitID
            }
        }).then(function successCallback(response) {
            var data = response.data;
            if (!$.isEmptyObject(data)) {
                $scope.editAuthority.userName = data.UserMasterObj.Username;
                $scope.editAuthority.adAccount = data.UserMasterObj.ADAccount;
                $scope.editAuthority.LastModifiedBy = data.UserMasterObj.LastModifiedBy;
                $scope.editAuthority.companyCode = data.UserMasterObj.GlobalCompanyCode;
                $scope.editAuthority.companyAbbreviation = data.UserMasterObj.GlobalCompanyAbbreviationName;
                $scope.editAuthority.userRole = {};
                $scope.editAuthority.userRole.List = $scope.form.userRole.List;
                $scope.editAuthority.userRole.selectedRoleID = data.UserMasterObj.RoleID;
                $scope.editAuthority.userRole.selectedRoleName = data.RoleObj.RoleName;
                $scope.editAuthority.userRole.originalRoleID = data.UserMasterObj.RoleID;
                if (data.RoleObj.Priority > $scope.form.userRole.userLoginRolePriority) {
                    $scope.editAuthority.componentEnable = true;
                } else {
                    $scope.editAuthority.componentEnable = false;
                }
                // For division access
                var divisionAccessArray = createArrayFromString(data.SelectedBusinessDivision.DivisionsAccessString, ',');
                $scope.editAuthority.divisionAccess = {};
                $scope.editAuthority.divisionAccess.List = $scope.form.divisionAccess.List;
                var divisionAccessListTemp = $scope.form.divisionAccess.List;
                var divisionCodeAccessArrayTemp = [];
                var selecteDivisionAccess = [];
                $.each(divisionAccessListTemp, function (index, value) {
                    divisionCodeAccessArrayTemp.push(value.Division.DivisionCode);
                });
                $.each(divisionAccessArray, function (index, value) {
                    if (isInArray(divisionCodeAccessArrayTemp, value)) {
                        selecteDivisionAccess.push(value);
                    }
                });
                $scope.editAuthority.divisionAccess.selectedDivisionAccess = selecteDivisionAccess;
                $scope.editAuthority.divisionAccess.selectedDivisionAccessDisplay = data.SelectedBusinessDivision.DivisionsAccessString.replace(/,/g, ', ');

                // For company access
                var companyAccessArray = createArrayFromString(data.UserMasterObj.StringCompanyAccess, ',');
                $scope.editAuthority.companyAccess = {};
                var companyAccessListTemp = $scope.form.companyAccess.List;
                if (!$scope.editAuthority.componentEnable) {
                    companyAccessListTemp = cloneObject($scope.form.userCompany.List);
                }
                var companysCodeAccesArrayTemp = [];
                var selecteCompanyAccess = [];
                var selecteCompanyAccessDisplay = '';
                $.each(companyAccessListTemp, function (index, value) {
                    if (value.CustomerAbbreviation == 'CSPL') {
                        value.CustomerAbbreviation = 'DOM';
                    }
                    companysCodeAccesArrayTemp.push(value.CustomerCode);
                    if (selecteCompanyAccessDisplay.length > 0) {
                        selecteCompanyAccessDisplay += ', ';
                    }
                    selecteCompanyAccessDisplay += value.CustomerAbbreviation;
                });
                $.each(companyAccessArray, function (index, value) {
                    if (isInArray(companysCodeAccesArrayTemp, value)) {
                        selecteCompanyAccess.push(value);
                    }
                });
                $scope.editAuthority.companyAccess.selectedCompanyAccess = selecteCompanyAccess;
                $scope.editAuthority.companyAccess.selectedCompanyAccessDisplay = selecteCompanyAccessDisplay;
                $scope.editAuthority.companyAccess.List = companyAccessListTemp;
                $scope.editAuthority.companyAccess.beforeChange = selecteCompanyAccess;

                // apply
                setTimeout(function () {
                    $scope.$apply(function () {
                        $('#edit-authority .selectpicker').selectpicker('refresh');
                        $scope.userRoleChange(false);
                    });
                }, 200)

                // show modal
                $('#edit-authority').modal({
                    backdrop: 'static',
                    keyboard: false
                }); 

                var jsonInit = {};
                jsonInit.roleID = data.UserMasterObj.RoleID;
                jsonInit.companyAccess = selecteCompanyAccess;
                jsonInit.divisionAccess = selecteDivisionAccess;
                $('#json-item-init').val(JSON.stringify(jsonInit));
            }
            else {
                //error
                redirecToErrorPage();
            }
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //When changes user company
    $scope.userCompanyChange = function () {
        if ($scope.form.userCompany.selectedUserCompany != 'ACB') {
            $scope.form.userRole.List = [];
            angular.forEach(authorityForm.form.UserRoles, function (value) {
                if (value.RoleID == 5 || value.RoleID == 6) {
                    $scope.form.userRole.List.push(value);
                }
            });
        }
        else {
            $scope.form.userRole.List = authorityForm.form.UserRoles;
        }
        $http({
            method: 'POST',
            url: '/Authority/ChangeUserCompany',
            data: {
                adAccountUserLogin: $scope.form.userInfo.UserMasterObj.ADAccount,
                userCompanyCode: $scope.form.userCompany.selectedUserCompany
            }
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.form.availableUsers = data;
            $scope.doInitAutoComplete(data, true);
            $scope.doReset(false, true);
            $scope.userRoleChange(true);
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //when changes user role
    $scope.userRoleChange = function (formFlag) {
        if (formFlag) { // true: main screen, false: popup
            var companyChkList = $("#authority-main-company").find('input[type="checkbox"]');
            if ($scope.form.userRole.selectedRoleID == 5) {
                $.each(companyChkList, function (i, e) {
                    if ($(e).attr('value') == $scope.form.userCompany.selectedUserCompany) {
                        $(e).prop('checked', true); // checked
                    } else {
                        $(e).prop('checked', false); // unchecked
                        $(e).prop('disabled', 'disabled');
                        if (!$(e).parent().hasClass("disabled")) {
                            $(e).parent().addClass('disabled');
                        }
                    }
                });
            } else {
                $.each(companyChkList, function (i, e) {
                    if (isInArray($scope.form.companyAccess.beforeChange, $(e).attr('value'))) {
                        $(e).prop('checked', true); // checked
                        $(e).prop('disabled', '');
                        if ($(e).parent().hasClass("disabled")) {
                            $(e).parent().removeClass('disabled');
                        }
                    } else {
                        $(e).prop('checked', false); // unchecked
                        $(e).prop('disabled', '');
                        if ($(e).parent().hasClass("disabled")) {
                            $(e).parent().removeClass('disabled');
                        }
                    }
                });
            }
            $scope.doUpdateStateBtnCreateAuthority();
        } else {
            if ($scope.editAuthority.userRole.selectedRoleID == 5) {
                var companyAccessListTemp = $scope.editAuthority.companyAccess.List;
                var companysCodeAccesArrayTemp = [];
                var selectedCompanyAccess = [];
                $.each(companyAccessListTemp, function (index, value) {
                    companysCodeAccesArrayTemp.push(value.CustomerCode);
                });
                if (isInArray(companysCodeAccesArrayTemp, $scope.editAuthority.companyCode)) {
                    selectedCompanyAccess.push($scope.editAuthority.companyCode);
                }
                $scope.editAuthority.companyAccess.selectedCompanyAccess = selectedCompanyAccess;
                var options = $('#edit-authority .selectpicker.company-access > option');
                $.each(options, function (i, e) {
                    if ($(e).prop('value') != 'string:' + selectedCompanyAccess) {
                        $(e).prop('disabled', true);
                    }
                });
            } else {
                var options = $('#edit-authority .selectpicker.company-access > option');
                $scope.editAuthority.companyAccess.selectedCompanyAccess = $scope.editAuthority.companyAccess.beforeChange;
                $.each(options, function (i, e) {
                    $(e).prop('disabled', false);
                });
            }
            $scope.doUpdateStateBtnUpdateAuthority();
            setTimeout(function () {
                $scope.$apply(function () {
                    $('#edit-authority .selectpicker.company-access').selectpicker('refresh');
                });
            }, 200)
        }
    }

    //When changes access company
    $scope.updateSelectedAccessCompanyBeforeChange = function (flag) {
        // flag = true: main page
        // falg = false: [Edit Authority] popup
        if (flag) {
            var companyChkList = $("#authority-main-company").find('input[type="checkbox"]');
            $scope.form.companyAccess.beforeChange = [];
            $.each(companyChkList, function (i, e) {
                if ($(e).prop('checked')) {
                    $scope.form.companyAccess.beforeChange.push($(e).attr('value'));
                }
            });
        } else {
            $scope.editAuthority.companyAccess.beforeChange = $scope.editAuthority.companyAccess.selectedCompanyAccess;
            $scope.doUpdateStateBtnUpdateAuthority();
        }
       
    }

    //When clicks on delete buton of each user item
    $scope.showDeleteConfirmationDialog = function (adAccount) {
        $scope.form.deletedAdAcccount = adAccount;
        $('#delete-confirmation').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    //Create authority
    $scope.doCreateAuthority = function () {
        if (!$scope.btnCreateAuthority) {
            return;
        }
        $('#authority-loading').show();
        var selectedDivisionAcessString = '';
        var selectedcompanyAcessString = '';
        var companyChkList = $("#authority-main-company").find('input[type="checkbox"]');
        $.each(companyChkList, function (i, e) {
            if ($(e).prop('checked')) {
                if (selectedcompanyAcessString.length > 0) {
                    selectedcompanyAcessString = selectedcompanyAcessString + ',';
                }
                selectedcompanyAcessString += $(e).attr('value');
            }
        });
        var divisionChkList = $("#authority-main-division").find('input[type="checkbox"]');
        $.each(divisionChkList, function (i, e) {
            if ($(e).prop('checked')) {
                if (selectedDivisionAcessString.length > 0) {
                    selectedDivisionAcessString = selectedDivisionAcessString + ',';
                }
                selectedDivisionAcessString += $(e).attr('value');
            }
        });
        var selectedRoleName = '';
        $.each($scope.form.userRole.List, function (index, value) {
            if (value.RoleID == $scope.form.userRole.selectedRoleID) {
                selectedRoleName = value.RoleName;
                return;
            }
        });
        var statusFlag = 0;
        if ($scope.form.userRole.originalRoleID != $scope.form.userRole.selectedRoleID
            || $scope.form.companyAccess.selectedItems != selectedcompanyAcessString
            || $scope.form.divisionAccess.selectedItems != selectedDivisionAcessString) {
            statusFlag = 1;
        }
        $scope.form.success = {};
        $scope.form.errors = [];
     
        $http({
            method: 'POST',
            url: '/Authority/CreateAuthority',
            data: {
                selectedADAccount: $("#authority-ad").val(),
                username: $("#authority-username").val(),
                businessUnitID: $scope.form.businessUnit.ID,
                originalRoleID: $scope.form.userRole.originalRoleID,
                selectedRoleID: $scope.form.userRole.selectedRoleID,
                selectedRoleName: selectedRoleName,
                divisionAccess: selectedDivisionAcessString,
                companyAccess: selectedcompanyAcessString,
                companyCode: $scope.form.userCompany.selectedUserCompany,
                status: statusFlag
            }
        }).then(function successCallback(response) {
            var data = response.data;
            if (!$.isEmptyObject(data)) {
                if (data.length == 1 && data[0].ErrorCode == 0) {
                    $scope.doReset(false, true);
                    $scope.doGetUpdatedUserList();
                    var objSuccessItem = {};
                    objSuccessItem.ErrorCode = 0;
                    objSuccessItem.ErrorMessage = data[0].ErrorMessage;
                    $scope.form.success = objSuccessItem;
                    $scope.form.warnings = {};
                } else {
                    $scope.form.errors = data;
                }
                $('#authority-loading').hide();
            } else {
                //error
                redirecToErrorPage();
            }
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //update user list table
    $scope.doGetUpdatedUserList = function () {
        $http({
            method: 'POST',
            url: '/Authority/GetUpdatedUserInfoList',
        }).then(function successCallback(response) {
            var data = response.data;
            if ($.isEmptyObject(data)) {
                $scope.form.userList.List = [];
            } else {
                $scope.form.userList.List = $scope.updateDisplayName(data, $scope.form.userCompany.List);
                if ($scope.form.userList.List.length > 0) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $('.selectpicker.filter').selectpicker('refresh');
                        });
                    }, 100);
                }
            }
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //get updated user list
    $scope.updateDisplayName = function (userList, companyList) {
        $.each(userList, function (index, value) {
            var companyAccessArray = createArrayFromString(value.UserMasterObj.StringCompanyAccess, ',');
            var stringCompanyAccessDisplay = ''
            $.each(companyList, function (index1, company) {
                if (isInArray(companyAccessArray, company.CustomerCode)) {
                    if (stringCompanyAccessDisplay.length > 0) {
                        stringCompanyAccessDisplay += ', ';
                    }
                    if (company.CustomerAbbreviation == 'CSPL') {
                        stringCompanyAccessDisplay += 'DOM';
                    } else {
                        stringCompanyAccessDisplay += company.CustomerAbbreviation;
                    }
                }
            });
            userList[index].UserMasterObj.StringCompanyAccessDisplay = stringCompanyAccessDisplay;
            var divisionsAccessStringDisplay = userList[index].SelectedBusinessDivision.DivisionsAccessString;
            userList[index].SelectedBusinessDivision.DivisionsAccessStringDisplay = divisionsAccessStringDisplay.replace(/,/g, ', ');
        });
        return userList;
    }

    //When clicks on Ok buton in confirmation delete dialog
    $scope.doDeleteUserAuthority = function () {
        $('#authority-loading').show();
        var selectedADAccount = $scope.form.deletedAdAcccount;
        $http({
            method: 'POST',
            url: '/Authority/DeleteUserItem',
            data: {
                selectedADAccount: selectedADAccount,
                businessUnitID: $scope.form.businessUnit.ID
            }
        }).then(function successCallback(response) {
            var data = response.data;
            if (data == 1 || data == 2) {
                $('#delete-confirmation').modal('hide');
                var userList = [];
                $.each($scope.form.userList.List, function (index, value) {
                    if (selectedADAccount != value.UserMasterObj.ADAccount) {
                        userList.push(value);
                    }
                });
                $scope.form.userList.List = userList;
                $scope.doReset(false, true);
                $('#authority-loading').hide();
            } else {
                //error
                redirecToErrorPage();
            }
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //When clicks on update buton in edit authority popup
    $scope.doUpdate = function () {
        if (!$scope.btnUpdateAuthority) {
            return;
        }
        $('#authority-loading').show();
        $scope.editAuthority.errorList = [];
        var selectedDivisionAcessString = createStringFromArray($scope.editAuthority.divisionAccess.selectedDivisionAccess, ',')
        var selectedcompanyAcessString = createStringFromArray($scope.editAuthority.companyAccess.selectedCompanyAccess, ',')
        $.each($scope.editAuthority.userRole.List, function (index, value) {
            if (value.RoleID == $scope.editAuthority.userRole.selectedRoleID) {
                $scope.editAuthority.userRole.selectedRoleName = value.RoleName;
                return;
            }
        });
        var statusFlag = 0;
        var jsonAfter = {};
        jsonAfter.roleID = $scope.editAuthority.userRole.selectedRoleID;
        jsonAfter.companyAccess = $scope.editAuthority.companyAccess.selectedCompanyAccess;
        jsonAfter.divisionAccess = $scope.editAuthority.divisionAccess.selectedDivisionAccess;
        var jsonInitString = $('#json-item-init').val();
        var jsonAfterString = JSON.stringify(jsonAfter);
        if (jsonInitString != jsonAfterString) {
            statusFlag = 1; // input changed
        }
        $http({
            method: 'POST',
            url: '/Authority/UpdateAuthority',
            data: {
                selectedADAccount: $scope.editAuthority.adAccount,
                businessUnitID: $scope.form.businessUnit.ID,
                originalRoleID: $scope.editAuthority.userRole.originalRoleID,
                selectedRoleID: $scope.editAuthority.userRole.selectedRoleID,
                selectedRoleName: $scope.editAuthority.userRole.selectedRoleName,
                divisionAccess: selectedDivisionAcessString,
                companyAccess: selectedcompanyAcessString,
                companyCode: $scope.editAuthority.companyCode,
                status: statusFlag
            }
        }).then(function successCallback(response) {
            var data = response.data;
            if ($.isEmptyObject(data)) {
                $('#edit-authority').modal('hide');
                $scope.doGetUpdatedUserList();
                $scope.doReset(false, true);
            } else {
                $scope.editAuthority.errorList = data;
            }
            $('#authority-loading').hide();
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //When clicks on reset button
    $scope.doReset = function (userCompanyFlag, userFlag) {
        $scope.doErrorRefresh();
        if (userFlag) {
            $scope.form.adAcccount = '';
            $scope.form.userName = '';
            $("#authority-username").typeahead('val', '');
            $("#authority-ad").typeahead('val', '');
        }
        if (userCompanyFlag) {
            $scope.form.userCompany.selectedUserCompany = $scope.form.userCompany.List[0].CustomerCode;
            $scope.userCompanyChange();
        }
        $scope.form.userRole.selectedRoleID = $scope.form.userRole.List[0].RoleID;
        $scope.form.userRole.originalRoleID = -1;
        setTimeout(function () {
            $scope.$apply(function () {
                $('.selectpicker').selectpicker('refresh');
            });
        }, 200);
        var companyChkList = $("#authority-main-company").find('input[type="checkbox"]');
        $.each(companyChkList, function (i, e) {
            $(e).prop('checked', false); // unchecked
            $(e).prop('disabled', ''); // unchecked
            if ($(e).parent().hasClass("disabled")) { 
                $(e).parent().removeClass('disabled');
            }
        });
        var divisionChkList = $("#authority-main-division").find('input[type="checkbox"]');
        $.each(divisionChkList, function (i, e) {
            $(e).prop('checked', false); // unchecked
        });
        $scope.form.companyAccess.beforeChange = [];
        $scope.userRoleChange(true);
        $scope.btnCreateAuthority = false;
    }

    //Load selected user info
    $scope.loadSelectedUserInfo = function (userAccount, isADAccount, onChangeEvent) {
        //flag = true, userAccount is ADAccount
        //flag = false, userAccount is username
        $http({
            method: 'POST',
            url: '/Authority/GetUserInfo',
            data: {
                userAccount: userAccount,
                isADAccount: isADAccount,
                userCompanyCode: $scope.form.userCompany.selectedUserCompany
            }
        }).then(function successCallback(response) {
            $scope.doReset(false, false);
            var data = response.data;
            if (!$.isEmptyObject(data) && !$.isEmptyObject(data.Obj) && (data.ErrorCode == 0 || data.ErrorCode == 2)) {
                $scope.form.adAcccount = data.Obj.UserMasterObj.ADAccount;
                $scope.form.username = data.Obj.UserMasterObj.Username;
                $("#authority-username").typeahead('val', $scope.form.username);
                $("#authority-ad").typeahead('val', $scope.form.adAcccount);
                $scope.form.companyAccess.selectedItems = data.Obj.UserMasterObj.StringCompanyAccess;
                $scope.form.divisionAccess.selectedItems = '';
                var businessDivisions = data.Obj.BusinessDivision;
                if (!$.isEmptyObject(businessDivisions)) {
                    $.each(businessDivisions, function (key, value) {
                        if (!$.isEmptyObject(value.BusinessUnit)
                            && value.BusinessUnit.BusinessUnitID == $scope.form.businessUnit.ID) {
                            $scope.form.divisionAccess.selectedItems = value.DivisionsAccessString;
                            return;
                        }
                    });
                } else {
                    $scope.form.divisionAccess.selectedItems = '';
                }
                if (data.Obj.UserMasterObj.RoleID != null) {
                    if (data.Obj.UserMasterObj.RoleID == -1) {
                        $scope.form.userRole.selectedRoleID = $scope.form.userRole.List[0].RoleID;
                        $scope.form.userRole.originalRoleID = -1;
                    }
                    else {
                        $scope.form.userRole.selectedRoleID = data.Obj.UserMasterObj.RoleID;
                        $scope.form.userRole.originalRoleID = $scope.form.userRole.selectedRoleID;
                    }
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $('.selectpicker.form-user-role').selectpicker('refresh');
                        });
                    }, 200);
                }

                var companyChkList = $("#authority-main-company").find('input[type="checkbox"]');
                $scope.form.companyAccess.beforeChange = [];
                if ($scope.form.companyAccess.selectedItems.length > 0) {
                    var companyAccess = $scope.form.companyAccess.selectedItems.split(",");
                    $.each(companyChkList, function (i, e) {
                        if (isInArray(companyAccess, $(e).attr('value'))) {
                            $(e).prop('checked', true); // checked
                            $scope.form.companyAccess.beforeChange.push($(e).attr('value'));
                        }
                    });
                }
                var divisionChkList = $("#authority-main-division").find('input[type="checkbox"]');
                if ($scope.form.divisionAccess.selectedItems.length > 0) {
                    var divisionAccess = $scope.form.divisionAccess.selectedItems.split(",");
                    $.each(divisionChkList, function (i, e) {
                        if (isInArray(divisionAccess, $(e).attr('value'))) {
                            $(e).prop('checked', true); // checked
                        }
                    });
                }
                $scope.doUpdateStateBtnCreateAuthority();
                $scope.userRoleChange(true);
                if (data.ErrorCode == 2) {
                    var objWarningItem = {};
                    objWarningItem.ErrorMessage = data.ErrorMessage;
                    objWarningItem.ErrorCode = 2;
                    $scope.form.warnings.push(objWarningItem);
                }
            } else if (!$.isEmptyObject(data) && data.ErrorCode == 1) {
                var objErrorItem = {};
                objErrorItem.ErrorMessage = data.ErrorMessage;
                objErrorItem.ErrorCode = 1;
                $scope.form.errors.push(objErrorItem);
                if (onChangeEvent) {
                    if (isADAccount) {
                        $("#authority-username").val('');
                    } else {
                        $("#authority-ad").val('');
                    }
                }
            } else {
                //error
                redirecToErrorPage();
            }
        }, function errorCallback(response) {
            //error
            redirecToErrorPage();
        });
    }

    //when clicks on cancle buton
    $scope.doCancel = function () {
        var jsonAfter = {};
        jsonAfter.roleID = $scope.editAuthority.userRole.selectedRoleID;
        jsonAfter.companyAccess = $scope.editAuthority.companyAccess.selectedCompanyAccess;
        jsonAfter.divisionAccess = $scope.editAuthority.divisionAccess.selectedDivisionAccess;
        var jsonInitString = $('#json-item-init').val();
        var jsonAfterString = JSON.stringify(jsonAfter);
        if (jsonInitString != jsonAfterString) {
            $('#cancel-confirmation').modal({
                backdrop: 'static',
                keyboard: false
            });
            return;
        }
        $scope.doCloseEditAuthorityPopup();
    }

    //Close [Edit authority] popup
    $scope.doCloseEditAuthorityPopup = function () {
        $('#edit-authority').modal('hide');
    }

    //refresh error message area
    $scope.doErrorRefresh = function () {
        $scope.form.errors = [];
        $scope.form.warnings = [];
        $scope.form.success = {};
    }

    //update state of button
    $scope.doUpdateStateBtnCreateAuthority = function () {
        var nCompanyAccess = $("#authority-main-company input:checked").length;
        var nDivisionAccess = $("#authority-main-division input:checked").length;
        var stateFlag = false;
        if (nCompanyAccess > 0 && nDivisionAccess > 0 && $("#authority-ad").val().length > 0) {
            stateFlag = true;
        }
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.btnCreateAuthority = stateFlag;
            });
        }, 100);
    }

    //update state of button
    $scope.doUpdateStateBtnUpdateAuthority = function () {
        if ($scope.editAuthority.companyAccess.selectedCompanyAccess.length > 0
            && $scope.editAuthority.divisionAccess.selectedDivisionAccess.length > 0
            && $scope.editAuthority.componentEnable) {
            $scope.btnUpdateAuthority = true;
        } else {
            $scope.btnUpdateAuthority = false;
        }
    }

    //document ready
    angular.element(document).ready(function () {
        jQuery('#authority-username').on('typeahead:selected', function (e, datum) {
            $("#authority-ad").typeahead('val', datum.ADAccount);
            $scope.form.adAcccount = datum.ADAccount;
            $scope.form.userName = datum.Username;
            $scope.loadSelectedUserInfo(datum.ADAccount, true);
        })
        jQuery('#authority-ad').on('typeahead:selected', function (e, datum) {
            $("#authority-username").typeahead('val', datum.Username);
            $scope.form.adAcccount = datum.ADAccount;
            $scope.form.userName = datum.Username;
            $scope.loadSelectedUserInfo(datum.ADAccount, true);
        })

        jQuery('#authority-username').on('change', function () {
            if ($("#authority-username").val() == '') {
                $scope.$apply(function () {
                    $scope.doReset(false, true);
                });
            } else {
                $scope.loadSelectedUserInfo($("#authority-username").val(), false, true);
            }
        });

        $("#authority-ad").on('change', function () {
            if ($("#authority-ad").val() == '') {
                $scope.$apply(function () {
                    $scope.doReset(false, true);
                });
            } else {
                if ($("#authority-ad").val().length > 0) {
                    $scope.loadSelectedUserInfo($("#authority-ad").val(), true, true);
                }
            }
        });

        $("#authority-main-company input[type=checkbox]").on("click", function () {
            $scope.doUpdateStateBtnCreateAuthority();
        });

        $("#authority-main-division input[type=checkbox]").on("click", function () {
            $scope.doUpdateStateBtnCreateAuthority();
        });
    });
});

app.filter('userListFilter', function () {
    return function (items, adAccount, username, roleID, divisionCodeList, companyCodeList) {
        var filtered = [];
        if (!adAccount && !username && roleID == -1
            && divisionCodeList.length == 0 && companyCodeList.length == 0) {
            return items;
        }
        angular.forEach(items, function (value) {
            var divisionAccessArray = createArrayFromString(value.SelectedBusinessDivision.DivisionsAccessString, ',');
            var companyAccessArray = createArrayFromString(value.UserMasterObj.StringCompanyAccess, ',');
            if ((!adAccount || value.UserMasterObj.ADAccount.toLowerCase().indexOf(adAccount.toLowerCase()) != -1)
                && (!username || value.UserMasterObj.Username.toLowerCase().indexOf(username.toLowerCase()) != -1)
                && ((roleID != -1 && value.UserMasterObj.RoleID == roleID) || roleID == -1)
                && (divisionCodeList.length == 0 || (divisionCodeList.length > 0 && isArray1InArray2(divisionCodeList, divisionAccessArray)))
                && (companyCodeList.length == 0 || (companyCodeList.length > 0 && isArray1InArray2(companyCodeList, companyAccessArray)))) {
                filtered.push(value);
            }
        })
        return filtered;
    };
});