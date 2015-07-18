var flickarama = angular.module('flickarama', []);

flickarama.controller('ImagesController', function($scope, $http) {
  $scope.tag = 'dctech';
  $scope.client_id = 'e8f708f2b0344f42b2e28293c234e69a'
  $scope.something = 'something';
  $scope.currentTime = Math.floor(Date.now()/ 1000);
  $scope.secondsInMonth = 2592000;
  $scope.secondsAMonthAgo = $scope.currentTime - $scope.secondsInMonth;
  var urlThatWorks = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent?client_id=' + $scope.client_id + '&min_timestamp=' + $scope.secondsAMonthAgo + '&max_timestamp=' + $scope.currentTime + '&count=' + 1000 + '&callback=JSON_CALLBACK';
  var workingOnThisUrl = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/search?lat=*&lng=*&min_timestamp=' + $scope.secondsAMonthAgo + '&max_timestamp=' + $scope.currentTime + '&client_id=' + $scope.client_id + '&callback=JSON_CALLBACK';
  $scope.workingOnThisUrl = workingOnThisUrl;
  $scope.urlThatWorks = urlThatWorks;
  $http.jsonp(urlThatWorks)
  .success(function(data, status, headers, config) {
    console.log(data)
  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in angular')
  })
})


