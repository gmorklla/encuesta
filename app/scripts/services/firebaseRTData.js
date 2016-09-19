'use strict';

/**
 * @ngdoc service
 * @name encuestaApp.RTData
 * @description: request get genérico
 * # RTData
 * Factory in the encuestaApp.
 */
angular.module('encuestaApp')
    .factory('FirebaseRTData', [function() {

        return {
            ref: function (path) {
            	return firebase.database().ref(path);
            }
        };

    }]);