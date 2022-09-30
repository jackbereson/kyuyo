(function (app) {
    'use strict';

    app.factory('apiService', apiService);
    app.service('dialogService', dialogService);
    app.service('dataService', dataService);

    apiService.$inject = ['$http', 'Upload', '$rootScope', '$messages'];
    function apiService($http, Upload, $rootScope, $messages) {
        var service = {
            get: get,
            post: post,
            put: put,
            del: del,
            upload: upload
        };

        function get(url, config, success, failure) {

            return $http.get(url, config)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        errorHanller(failure, error);
                    });
        }

        function post(url, data, success, failure) {
            return $http.post(url, data)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        errorHanller(failure, error);
                    });
        }

        function put(url, data, success, failure) {
            return $http.put(url, data)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        errorHanller(failure, error);
                    });
        }

        function del(url, config, success, failure) {

            return $http.delete(url, config)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        errorHanller(failure, error);
                    });
        }

        function upload(url, data, success, failure) {

            var fd = new FormData();
            fd.append('file', data);
           return  $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (result) {
                success(result);
            }, function (error) {
                errorHanller(failure, error);
            });


            return Upload.upload({
                url: url,
                data: data
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }

        function errorHanller(failure, error) {
            if (error.status == '401') {
                document.location.href = '/Error/Index/2';
            }
            if (error.status == '500') {
                 document.location.href = '/Error/Index/3';
            }
            else if (failure != null) {
                failure(error);
            }
        }

        return service;
    }


    // dialogService
    dialogService.$inject = ['$uibModal'];
    function dialogService($uibModal) {
        var service = {
            alert: alert,
            confirm: confirm,
            taglib: taglib
        }

        function alert(data) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: '/template/popup/alert',
                controller: 'dialog.alertCtrl',
                size: 'md',
                backdrop  : 'static',
                keyboard  : false,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });
        };

        function confirm(data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: '/template/popup/confirm',
                controller: 'dialog.confirmCtrl',
                backdrop: 'static',
                size: 'md',
                keyboard: false,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                return callback(result);
            }, function () {
                return callback();
            });
            /*end modal*/
        }

        function taglib(data, callback) {
            /*begin modal*/
            var modalInstance = $uibModal.open({
                templateUrl: 'template/SearchEmployee/Popup',
                controller: 'dialog.searchEmployeeCtrl',
                backdrop: 'static',
                size: 'md',
                keyboard: false,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                return callback(data);
            }, function () {
                return callback(null);
            });
            /*end modal*/
        }

        return service;
    }

    dataService.$inject = ['$strings'];
    function dataService($strings) {
        var service = {
            getDate: getDate,
            getFormatDate: getFormatDate,
            getFormatMonthYear: getFormatMonthYear
        }

        // convert dateformat from DTO to view
        function getFormatDate(val) {
            if (!angular.isString(val))
                return null;

            var dt = moment(val, 'YYYYMMDD', true);
            if (dt.isValid() === false) {
                return null;
            }
            else {
                return dt.format($strings.DateFormat)
            }
        }

        // convert dateformat from DTO to view
        function getFormatMonthYear(val) {
            if (!angular.isString(val))
                return null;

            var dt = moment(val, 'YYYYMMDD', true);
            if (dt.isValid() === false) {
                return null;
            }
            else {
                return dt.format($strings.MonthYearFormat)
            }
        }

        // convert dateformat from view to DTO
        function getDate(val) {
            if (!angular.isString(val))
                return null;
            // paser DD/MM/YYYY
            var dt = moment(val, $strings.DateFormat, true);
            if (dt.isValid() === false) {
                // try paser MM/YYYY
                dt = moment(val, $strings.MonthYearFormat, true);
                if (dt.isValid() === false) {
                    return val;
                }
            }
            return dt.format('YYYYMMDD');
        }

        return service;
    }



})(angular.module('KyuyoApp'));