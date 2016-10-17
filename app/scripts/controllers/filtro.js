'use strict';

/**
 * @ngdoc function
 * @name encuestaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the encuestaApp
 */
angular.module('encuestaApp')
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
