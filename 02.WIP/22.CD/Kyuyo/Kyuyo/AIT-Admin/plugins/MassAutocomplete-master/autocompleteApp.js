var app = angular.module('autocompleteApp', ['ngSanitize', 'MassAutoComplete']);

app.controller('autocompleteCtrl', function ($scope, $sce, $q) {
    $scope.dirty = {};

    var states = ['Alabama', 'Alaska', 'California', /* ... */];

    function suggest_state(term) {
        var q = term.toLowerCase().trim();
        var results = [];

        // Find first 10 states that start with `term`.
        for (var i = 0 ;  i < states.length && results.length < 10; i++) {
            var state = states[i];
            if (state.toLowerCase().indexOf(q) === 0)
                results.push({ label: state, value: state });
        }

        return results;
    }

    $scope.autocomplete_options = {
        suggest: suggest_state
    };

    $scope.onChange = function () {
        $scope.dirty.value = $scope.dirty.valueTmp;
    }
});