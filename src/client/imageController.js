var flickarama = angular.module('flickarama', []);

flickarama.controller('ImagesController', function($scope, $http) {
  $scope.tag = 'dctech';
  $scope.client_id = 'e8f708f2b0344f42b2e28293c234e69a'
  $scope.currentTime = Math.floor(Date.now()/ 1000);
  $scope.secondsInMonth = 2592000;
  $scope.secondsAMonthAgo = $scope.currentTime - $scope.secondsInMonth;

  // Instagram Call
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent?client_id=' + $scope.client_id + '&min_timestamp=' + $scope.secondsAMonthAgo + '&max_timestamp=' + $scope.currentTime + '&count=' + 1000 + '&callback=JSON_CALLBACK';
  $http.jsonp(instagramUrl)
  .success(function(data, status, headers, config) {
    var instagramPhotoArray = data.data;
    console.log(instagramPhotoArray[0])
  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in instagram angular')
  })


  // Flickr Call
  $scope.api_key = 'd99bf6642cce654ec8deb8f81b5519ee'
  var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + $scope.api_key + '&text=' + $scope.tag + '&min_upload_date=' + $scope.secondsAMonthAgo + '&format=json&jsoncallback=?';
  $scope.flickrUrl = flickrUrl;
  $http.get(flickrUrl)
  .success(function(data, status, headers, config) {
    var flickrObject = JSON.parse(data.substring(14, data.length - 1))
    var flickrPhotoArray = flickrObject.photos.photo;
    console.log(flickrPhotoArray)

    var commentCountArray = [];

    flickrPhotoArray.forEach(function(x) {
      var commentCall = 'https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=' + $scope.api_key + '&photo_id=' + x.id + '&format=json'
      $http.get(commentCall)
      .success(function(data, status, headers, config) {
        var commentObject = JSON.parse(data.substring(14, data.length - 1));

        var commentCount = commentObject.comments.comment.length;

        // recreate instagram object and append to the instagram array
      })
      .error(function(data, status, headers, config) {
        console.log('there was an error')
      })

    })



  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in flickr angular')
  })


})


