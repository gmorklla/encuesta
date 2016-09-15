'use strict';

/**
 * @ngdoc function
 * @name encuestaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the encuestaApp
 */
angular.module('encuestaApp')
    .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    		$scope.encuestaData = {}

		$scope.pregunta = 1;
		$rootScope.numPregunta = 1;

		$rootScope.titulo = 'Hotel';

		$scope.btnTxt = 'Siguiente';

		$scope.siguiente = function() {
			slider.noUiSlider.set( $scope.pregunta );
			procesa($scope.pregunta);
		}

		function sinRespuesta() {
			Materialize.toast('Por favor, elige una respuesta.', 4000);
		}

		function procesa(arg) {
			var preguntaAct = 'pre' + arg;
			var indiceAct = arg - 1;
			var indiceNext = arg;
			if($scope[preguntaAct]) {
				if($scope.pregunta == 21) {
					$rootScope.titulo = null;
					$rootScope.gracias = true;
					$scope.encuestaData[preguntaAct] = $scope[preguntaAct];
					console.log($scope.encuestaData);
					$('.pregunta').eq( indiceAct ).addClass('fadeOut');
					$scope.btnTxt = null;
				} else {
					$rootScope.numPregunta++;
					if($scope.pregunta == 7) {
						$rootScope.titulo = 'Evento';
					}
					if($scope.pregunta >= 14 && $scope.pregunta <= 17) {
						$rootScope.subtitulo = 'Ambientación';
						$('.subtitulo').animate({
							height: 27},
							'slow', function() {						
							$('.subtitulo').removeClass('fadeOut').addClass('fadeIn');
							digiere();
						});
					} else {
						$('.subtitulo').removeClass('fadeIn').addClass('fadeOut');
						$('.subtitulo').animate({
							height: 0},
							'slow', function() {										
							digiere();
						});					
						$rootScope.subtitulo = null;
					}
					if($scope.pregunta == 20) {
						$scope.btnTxt = 'Enviar';
					}
					$scope.encuestaData[preguntaAct] = $scope[preguntaAct];
					console.log($scope.encuestaData);
					$('.pregunta').eq( indiceAct ).addClass('fadeOut');
					$scope.pregunta++;
					setTimeout(function(){
						$('.pregunta').eq( indiceNext ).addClass('fadeInRight');
						digiere();
					}, 400);
				}
			} else {
				sinRespuesta();
			}			
		}

		var slider = document.getElementById('sliderTest');
		noUiSlider.create(slider, {
			start: [0],
			connect: 'lower',
			step: 1,
			range: {
				'min': 0,
				'max': 20
			},
			format: wNumb({
				decimals: 0
			})
		});

		slider.setAttribute('disabled', true);

		// Procesa datos que angular todavía no ha digerido
		function digiere() {
			if(!$scope.$$phase) {
				$scope.$digest();
			}                
		}		
    }]);
