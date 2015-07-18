var flickarama = angular.module('flickarama', []);

flickarama.controller('ImagesController', function($scope, $http) {
  $scope.tag = 'dctech';
  $scope.client_id = ''
  $scope.something = 'something';
  $scope.currentTime = Date.now();
  $scope.secondsInMonth = 2592000;
  $http.jsonp('https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent?client_id=' + $scope.client_id + '&callback=JSON_CALLBACK')
  .success(function(data, status, headers, config) {
    console.log(data)
  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in angular')
  })
})


