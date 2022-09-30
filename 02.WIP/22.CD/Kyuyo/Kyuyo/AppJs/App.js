(function () {
    'use strict';

    var myApp = angular.module('KyuyoApp', [
         // Angular modules 
         //'datatables',
         'ui.router',
         'ngValidate',
         'blockUI',
         'ui.bootstrap',
         'ngFileUpload',
         'ngAnimate',
         'ngSanitize',
         'MassAutoComplete',
         'fiestah.money'
         //'toastr',
         //'ngCookies',
         //'ngStorage',
         //'cgBusy',
         //'ngSanitize',
         //'bw.paging'
    ]);


    myApp.config(function (blockUIConfig) {

        // Change the default overlay message
        blockUIConfig.message = 'Prosessing.';

        // Change the default delay to 100ms before the blocking is visible
        blockUIConfig.delay = 500;

        // Disable automatically blocking of the user interface
        blockUIConfig.autoBlock = true;

    });

})();