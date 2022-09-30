(function (app) {
    'use strict';

    app.filter("format", function () {
            return function (input) {
                var args = arguments;
                return input.replace(/\{(\d+)\}/g, function (match, capture) {
                    return args[1 * capture + 1];
                });
            };
        })

        .filter("datetime", ['$strings', function ($strings) {
            return function (input) {
                if (!angular.isString(input))
                    return null;

                var dt = moment(input, 'YYYYMMDD', true);
                if (dt.isValid() === false) {
                    if (input.length === 17) {
                        var sub = input.substr(0, 14);
                        dt = moment(sub, 'YYYYMMDDHHMMSS', true);
                        if(dt.isValid()){
                            return dt.format($strings.DateTimeFormat)
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
                else {
                    if (arguments.length >= 2 && arguments[1] == 'm') {
                        return dt.format($strings.MonthYearFormat)
                    } else {
                        return dt.format($strings.DateFormat)
                    }
                }
            };
        }]);

})(angular.module('KyuyoApp'));