(function (app) {
    'use strict';

    app.controller('SpecialInsuranceCtrl', SpecialInsuranceCtrl);
    SpecialInsuranceCtrl.$inject = ['$scope', '$rootScope', '$window', '$filter', '$messages', '$strings', 'apiService', 'dataService', 'dialogService'];
    function SpecialInsuranceCtrl($scope, $rootScope, $window, $filter, $messages, $strings, apiService, dataService, dialogService) {

        var MODE_VIEW = 0,
            MODE_EDIT = 1,
            MODE_UPDATE = 2,
            TIME_OUT = 1500;
        var specialiInsuranceCached = null;

        $scope.init = function (model) {
            // validate
            $scope.validationOptions = model.Validator;
            $scope.listSpecialInsurance = model.ListSpeIn;
            $scope.validationOptions = model.Validator;
            $scope.search = {
                CompanyCd: model.CompanyCd,
                AbsenceDescriptionSearch: null,
                EffectiveDtFrom: null,
                EffectiveDtTo: null
            };
            $scope.control = {
                linkSpecialInsuranceCd: true
            }
            $scope.model = {
            Id: null,
            AbsenceNo:null,
            AbsenceDescription: null,
            InsuRate: null,
            EffectiveDt: null,
            UpdateDt: null
            }
            convertToDateFromListSpecialInsurancies();
        }
        // return a date string is format
        function convertToDateStringFormat(strDate, char) {
            // default: yyyy-mm-dd
            var rs = strDate.substr(0, 4) + char + strDate.substr(4, 2) + char + strDate.substr(6, 2);
            return rs;
        }
        // convert from string of server to date angularjs
        function convertToDateFromListSpecialInsurancies() {
            angular.forEach($scope.listSpecialInsurance, function (e) {
                e.EffectiveDt = new Date(convertToDateStringFormat(e.EffectiveDt, '-'));
            });
        }
        // Delete to Database
        $scope.deleteFn = function () {
            dialogService.confirm({ message: $messages.ConfirmDelete }, function (confirm) {
                if (confirm) {
                    var param = {
                        Id: $scope.model.Id,
                        UpdateDt: $scope.model.UpdateDt
                    }
                    apiService.del('/api/SpecialInsurance', { params: param }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.model.AbsenceNo = '';
                        $scope.model.AbsenceDescription = '';
                        $scope.model.EffectiveDt = '';
                        $scope.searchFn();
                        cached = null;

                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }
            });
        }


        $scope.searchFn = function () {
            $scope.search.AbsenceDescriptionSearch = $scope.search.absenceDescription;
            $scope.search.EffectiveDtFrom = $scope.search.fromEffectiveDate;
            $scope.search.EffectiveDtTo = $scope.search.toEffectiveDate;
            if (!isNullorEmpty($scope.search.EffectiveDtFrom)) {
                $scope.search.EffectiveDtFrom = $scope.search.EffectiveDtFrom.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
            }
            if (!isNullorEmpty($scope.search.EffectiveDtTo)) {
                $scope.search.EffectiveDtTo = $scope.search.EffectiveDtTo.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
            }
            apiService.get('api/SpecialInsurance/', { params: $scope.search }, function (response) {
                $scope.listSpecialInsurance = response.data.ListSpeIn;
                $scope.search.absenceDescription = '';
                $scope.search.fromEffectiveDate = '';
                $scope.search.toEffectiveDate = '';
                convertToDateFromListSpecialInsurancies();
                $scope.isErrorMessage = false;
                console.log(response.data);
                var mode = MODE_VIEW;
                if ($scope.editable === true) {
                    mode = MODE_EDIT;
                }
            }, function (response) {
                $scope.isErrorMessage = true;
                $scope.errorMessage = response.data.Messages;
                $scope.classMessage = 'alert-warning';
                $scope.listSpecialInsurance = response.data.listSpecialInsurance;
            });
        }
        //mode update
        $scope.updateFn = function () {
            $scope.isBodyMessage = false;
            // Confirm update
            dialogService.confirm({ message: $messages.ConfirmUpdate }, function (confirm) {
                if (confirm) {
                    $scope.model.EffectiveDt = $scope.model.EffectiveDt.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
                    apiService.put('/api/SpecialInsurance', $scope.model, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';

                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.model.AbsenceNo = '';
                        $scope.model.AbsenceDescription = '';
                        $scope.model.EffectiveDt = '';
                        $scope.searchFn();
                       
                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                    })
                }

            });
        }

        //edit
        $scope.editModelFn = function (specialInsurance, form) {
            function yyyymmdd(dateIn) {
                var yyyy = dateIn.getFullYear();
                var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
                var dd = dateIn.getDate();
                if (dd < 10) {
                    return String("0" + dd + "/" + mm + "/" + yyyy);
                    if (mm < 10) {
                        return String(dd + "/" + "0" + mm + "/" + yyyy);
                    }
                }
                return String(dd + "/" + mm + "/" + yyyy); // Leading zeros for mm and dd
            }
            var today = specialInsurance.EffectiveDt;
            console.log(yyyymmdd(today));
           $scope.model = {
               Id: specialInsurance.Id,
                AbsenceNo: specialInsurance.AbsenceNo,
                AbsenceDescription: specialInsurance.AbsenceDescription,
                EffectiveDt: yyyymmdd(today),
               UpdateDt:specialInsurance.UpdateDt,
            }
            
           specialiInsuranceCached = angular.copy($scope.model);
        }
        $scope.insertFn = function () {
            $scope.isBodyMessage = false;
            dialogService.confirm({ message: $messages.ConfirmCreate }, function (confirm) {
                if (confirm) {
                    setDataInput();
                    //if (!isNullorEmpty($scope.model.EffectiveDtFrom)) {
                    //    //$scope.search.EffectiveDtFrom = $scope.search.EffectiveDtFrom.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1');
                    //    $scope.search.EffectiveDtFrom = convertToDateStringFormat($scope.search.EffectiveDtFrom);
                    //}
                    apiService.post('/api/SpecialInsurance', $scope.paramInput, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-success';
                        $window.setTimeout(function () {
                            $scope.isBodyMessage = false;
                            $scope.$apply();
                        }, TIME_OUT);
                        $scope.model.AbsenceNo = '';
                        $scope.model.AbsenceDescription = '';
                        $scope.model.EffectiveDt = '';
                        $scope.searchFn();
                    }, function (response) {
                        $scope.isBodyMessage = true;
                        $scope.errorBodyMessage = response.data;
                        $scope.classBodyMessage = 'alert-danger';
                        $scope.listSpecialInsurance = response.data.listSpecialInsurance;
                    })
                }
            });
        }

        // set data of area input 
        function setDataInput()
        {
            $scope.paramInput = {
                Id:$scope.model.Id,
                AbsenceNo: $scope.model.AbsenceNo,
                AbsenceDescription: $scope.model.AbsenceDescription,
                EffectiveDt: $scope.model.EffectiveDt.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$2$1'),
            };
        }
        // check null or empty
        function isNullorEmpty(object) {
            if (typeof object === 'undefined' || object === null || object == "") {
                return true;
            }
            return false;
        }

    }

})(angular.module('KyuyoApp'));