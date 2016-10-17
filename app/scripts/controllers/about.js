'use strict';

/**
 * @ngdoc function
 * @name encuestaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the encuestaApp
 */
angular.module('encuestaApp')
    .controller('AboutCtrl', ['$scope', '$rootScope', 'FirebaseRTData', '_', function($scope, $rootScope, FirebaseRTData, _) {

        $scope.currentPage = 0;

        $scope.prevNext = function (arg) {
            if(arg == 1) {
                if($scope.currentPage !== 0) {
                    $scope.currentPage = $scope.currentPage - 1;
                }                
            } else {
                if($scope.currentPage !== $scope.paginacion - 1) {
                    $scope.currentPage = $scope.currentPage + 1;
                }                
            }
        }

        var refAllTests = FirebaseRTData.ref('cuestionarios');

        $rootScope.noIns = true;

        $scope.resultados = {};
        $scope.numeroDeTest = 0;
        $scope.graficas = {};

        // Consulta base de tests
        $scope.checkFirebaseAll = function() {
            refAllTests.once("value").then(function(snapshot) {
                $scope.tests = [];
                var testNumber = _.size(snapshot.val());
                //console.log(testNumber);
                $scope.numeroDeTest = testNumber;
                var leidos = 0;
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val();
                    $scope.tests.push(childData);
                    digiere();
                    leidos++;
                    if (leidos == testNumber) {
                        //console.log($scope.tests);
                        procesandoData();
                    }
                });
            });
        }

        $scope.checkFirebaseAll();

        function procesandoData() {
            $scope.paginacion = Math.ceil($scope.tests.length/5);
            digiere();
            for (var i = 0; i < $scope.tests.length; i++) {
                var obj = $scope.tests[i];
                for (var key in obj) {
                    if (!$scope.resultados[key]) {
                        $scope.resultados[key] = [];
                    }
                    $scope.resultados[key].push(obj[key]);
                    // console.log(key, obj[key]);
                }
            }
            //console.info($scope.resultados);
            makingGraph();
        }

        function makingGraph() {
            var prefix = 'pre';
            for (var i = 1; i < 21; i++) {
                var keyName = prefix + i;
                //console.log($scope.resultados[keyName]);
                for (var j = 0; j < $scope.resultados[keyName].length; j++) {
                    //console.log($scope.resultados[keyName][j]);
                    switch ($scope.resultados[keyName][j]) {
                        case '1':
                            $scope.resultadosProcesados[keyName].excelente += 1;
                            break;
                        case '2':
                            $scope.resultadosProcesados[keyName].muyBueno += 1;
                            break;
                        case '3':
                            $scope.resultadosProcesados[keyName].bueno += 1;
                            break;
                        case '4':
                            $scope.resultadosProcesados[keyName].regular += 1;
                            break;
                        case '5':
                            $scope.resultadosProcesados[keyName].malo += 1;
                            break;
                    }
                }

                var excelente = $scope.resultadosProcesados[keyName].excelente;
                var muyBueno = $scope.resultadosProcesados[keyName].muyBueno;
                var bueno = $scope.resultadosProcesados[keyName].bueno;
                var regular = $scope.resultadosProcesados[keyName].regular;
                var malo = $scope.resultadosProcesados[keyName].malo;
                var graficaName = 'grafica' + i;
                $scope.graficas[graficaName] = [excelente, muyBueno, bueno, regular, malo];

            }
            grafica();
            //console.log($scope.resultadosProcesados);

        }

        function grafica() {
            var prefix = 'grafica';
            for (var i = 1; i < 21; i++) {
                var graphName = prefix + i;
                var selectName = '.' + prefix + i;

                var x = d3.scale.linear()
                    .domain([0, d3.max($scope.graficas[graphName])])
                    .range([10, 100]);

                d3.select(selectName)
                    .selectAll("div")
                    .data($scope.graficas[graphName])
                    .enter().append("div")
                    .style("width", function(d) {
                        return x(d) + "px"; })
                    .text(function(d) {
                        return d; });
            }
        }

        $scope.resultadosProcesados = {
            pre1: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre2: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre3: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre4: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre5: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre6: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre7: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre8: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre9: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre10: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre11: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre12: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre13: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre14: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre15: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre16: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre17: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre18: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre19: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            },
            pre20: {
                excelente: 0,
                muyBueno: 0,
                bueno: 0,
                regular: 0,
                malo: 0
            }
        };

        // Procesa datos que angular todavía no ha digerido
        function digiere() {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
    }]);
