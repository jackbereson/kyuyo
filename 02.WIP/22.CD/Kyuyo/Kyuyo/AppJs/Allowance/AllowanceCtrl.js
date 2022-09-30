(function (app) {
    'use strict';

    app.controller('AllowanceCtrl', AllowanceCtrl);

    AllowanceCtrl.$inject = ['$scope', '$rootScope', '$state', '$filter', '$messages', '$strings', 'apiService'];
    function AllowanceCtrl($scope, $rootScope, $state, $filter, $messages, $strings, apiService) {

        var MODE_VIEW = 0,
           MODE_NEW = 1,
           MODE_UPDATE = 2,
           TIME_OUT = 1500;

        $scope.init = function (model) {
            

            $scope.model = {
                AllowanceFlg: '1'
            }

            $scope.control = {
                txtFile: false,
                rdType: false,
                cmbGroupCd: false,
                calEffectiveDt: false,
                txtAllowanceCd: false,
                txtAllowanceName: false,
                numValueOffical: false,
                numValueProb: false,
                cmbUnit: false,
                ckbProbFlag: false,
                numRate: false,
                ckbPolicy1: false,
                ckbPolicy2: false,
                linkAllowanceCd: false, // edit only init Screen
                btnBrowse: false,
                btnImport: false,
                btnExport: false,
                btnInsert: false,
                btnUpdate: false,
                btnDelete: false,
                btnCancel: false
            };


            controlFn(MODE_NEW)
        };

       

        function controlFn(mode) {
            switch (mode) {
                case MODE_NEW:
                    $scope.control = {
                        txtFile: false,
                        rdType: false,
                        cmbGroupCd: false,
                        calEffectiveDt: false,
                        txtAllowanceCd: false,
                        txtAllowanceName: false,
                        numValueOffical: false,
                        numValueProb: false,
                        cmbUnit: false,
                        ckbProbFlag: false,
                        numRate: false,
                        ckbPolicy1: false,
                        ckbPolicy2: false,
                        btnBrowse: false,
                        btnImport: false,
                        btnExport: false,
                        btnInsert: false,
                        btnUpdate: true,
                        btnDelete: true,
                        btnCancel: false
                    };
                    break;

                case MODE_UPDATE:
                    $scope.control = {
                        txtFile: false,
                        rdType: false,
                        cmbGroupCd: false,
                        calEffectiveDt: false,
                        txtAllowanceCd: false,
                        txtAllowanceName: false,
                        numValueOffical: false,
                        numValueProb: false,
                        cmbUnit: false,
                        ckbProbFlag: false,
                        numRate: false,
                        ckbPolicy1: false,
                        ckbPolicy2: false,
                        btnBrowse: false,
                        btnImport: false,
                        btnExport: false,
                        btnInsert: true,
                        btnUpdate: false,
                        btnDelete: false,
                        btnCancel: false
                    };
                    break;

                case MODE_VIEW:
                    $scope.control = {
                        txtFile: true,
                        rdType: true,
                        cmbGroupCd: true,
                        calEffectiveDt: true,
                        txtAllowanceCd: true,
                        txtAllowanceName: true,
                        numValueOffical: true,
                        numValueProb: true,
                        cmbUnit: true,
                        ckbProbFlag: true,
                        numRate: true,
                        ckbPolicy1: true,
                        ckbPolicy2: true,
                        btnBrowse: true,
                        btnImport: true,
                        btnExport: true,
                        btnInsert: true,
                        btnUpdate: true,
                        btnDelete: true,
                        btnCancel: true
                    };
                    break;
            }
        }

    }

})(angular.module('KyuyoApp'));