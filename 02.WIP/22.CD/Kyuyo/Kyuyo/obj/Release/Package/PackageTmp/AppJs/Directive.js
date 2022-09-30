(function (app) {
    'use strict';

    app.directive('datePicker', ['$strings', function ($strings) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.on('blur', function (e) {
                    ngModelCtrl.$setViewValue(e.target.value)
                })

                element.datepicker({
                    language: 'vi',
                    autoclose: true,
                    todayHighlight: true,
                    format: $strings.DateFormat.toLowerCase(),
                });

                scope.$watch(attrs.ngModel, function () {
                    element.datepicker('update');
                });

            }
        }
    }])

    .directive('datePickerMonth', ['$strings', function ($strings) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                element.on('blur', function (e) {
                    ngModelCtrl.$setViewValue(e.target.value)
                })

                element.datepicker({
                    language: 'vi',
                    autoclose: true,
                    todayHighlight: true,
                    format: $strings.MonthYearFormat.toLowerCase(),
                    minViewMode: 1,
                    startView: 1
                });

                scope.$watch(attrs.ngModel, function () {
                    element.datepicker('update');
                });
            }
        }
    }])

    .directive('appDisabled', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var disabled = String(attrs['appDisabled']) === 'true';
                element.prop('disabled', disabled);
                element.selectpicker('refresh');
            }
        }
    })
    .directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return val != null ? parseInt(val, 10) : null;
                });
                ngModel.$formatters.push(function (val) {
                    return val != null ? '' + val : null;
                });
            }
        };
    })

    .directive('selectpicker', ['$parse', '$timeout', '$strings', function ($parse, $timeout, $strings) {
        return {
            restrict: 'A',
            require: '?ngModel',
            priority: 10,
            link: function (scope, element, attrs, ngModel) {
                function refresh(newVal) {
                    scope.$applyAsync(function () {
                        if (attrs.ngOptions && /track by/.test(attrs.ngOptions)) element.val(newVal);
                        element.selectpicker('refresh');
                    });
                }

                $timeout(function () {
                    element.selectpicker({
                        style: 'btn-default',
                        container: 'body',
                        noneSelectedText: $strings.PleaseSelect
                    });
                    element.selectpicker('refresh');
                });

                ngModel.$render = function () {
                    scope.$evalAsync(function () {
                        element.selectpicker('refresh');
                    });
                }

                if (attrs.ngModel) {
                    scope.$watch(attrs.ngModel, function (newVal) {
                        $timeout(function () {
                            element.val(newVal);
                            element.selectpicker('refresh');
                        });
                    }, true);
                }

                if (attrs.ngDisabled) {
                    scope.$watch(attrs.ngDisabled, refresh, true);
                }

                scope.$on('$destroy', function () {
                    $timeout(function () {
                        element.selectpicker('destroy');
                    });
                });
            }
        };
    }])

    .directive('appSearchEmployee', ['$parse', 'dialogService', function ($parse, dialogService) {
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'template/SearchEmployee/Component',
            scope:{
                ngDefaultCompany: "=ngDefaultCompany"
            },
            link: function (scope, elem, attrs, ngModel) {
                var useInfo = {
                    companyId: attrs.defaultCompany,
                    multiCompany: attrs.multiple === 'true',
                };

                scope.modelDirective = {}

                scope.$watch('ngDefaultCompany', function () {
                    if (angular.isDefined(scope.ngDefaultCompany)) {
                        useInfo.companyId = scope.ngDefaultCompany;
                    }
                });

                scope.class = attrs.class;

                scope.searchDirectiveFn = function () {
                    dialogService.taglib(useInfo, function (data) {
                        if (data != null) {
                            ngModel.$setViewValue(data);
                        }
                    });
                }

                // update viewValue
                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function (newValue) {
                    if (newValue == null || newValue == undefined) {
                        scope.modelDirective.EmployeeName = null;
                    } else {
                        scope.modelDirective.EmployeeName = newValue.EmployeeName;
                        scope.modelDirective.EmployeeNo = newValue.EmployeeNo;
                    }
                });

            }

        };
    }]);

})(angular.module('KyuyoApp'));