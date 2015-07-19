var flickarama = angular.module('flickarama', []);

flickarama.controller('ImagesController', function($scope, $http) {
  $scope.tag = 'dctech';
  $scope.IG_client_id = 'e8f708f2b0344f42b2e28293c234e69a'
  $scope.currentTime = Math.floor(Date.now()/ 1000);
  $scope.secondsInMonth = 2592000;
  $scope.secondsAMonthAgo = $scope.currentTime - $scope.secondsInMonth;

  // Instagram Call
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent?client_id=' + $scope.IG_client_id + '&min_timestamp=' + $scope.secondsAMonthAgo + '&max_timestamp=' + $scope.currentTime + '&count=' + 10000 + '&callback=JSON_CALLBACK';
  $http.jsonp(instagramUrl)
  .success(function(data, status, headers, config) {
    var instagramPhotoArray = data.data;

    $scope.imagesArray = instagramPhotoArray;
  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in the instagram call in ImagesController')
  })

  // Flickr Call
  $scope.api_key = 'd99bf6642cce654ec8deb8f81b5519ee'
  var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + $scope.api_key + '&text=' + $scope.tag + '&min_upload_date=' + $scope.secondsAMonthAgo + '&format=json&jsoncallback=?';
  $scope.flickrUrl = flickrUrl;
  $http.get(flickrUrl)
  .success(function(data, status, headers, config) {

    var flickrObject = deFlickrify(data);

    var flickrPhotoArray = flickrObject.photos.photo;

    flickrPhotoArray.forEach(function(x) {
      var commentCall = 'https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=' + $scope.api_key + '&photo_id=' + x.id + '&format=json'
      $http.get(commentCall)
      .success(function(data, status, headers, config) {

        var commentObject = deFlickrify(data);

        var commentCount = commentObject.comments.comment.length;

        // getting images for the photo id
        var imageCall = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + $scope.api_key + '&photo_id=' + x.id + '&format=json'
        $http.get(imageCall)
        .success(function(data, status, headers, config) {

          var imageObject = deFlickrify(data);

          var firstImage = imageObject.sizes.size[4];

          $scope.imagesArray.push({images: {low_resolution: {url: firstImage.source}}, comments: {comments: commentObject, count: commentCount}});
        })
        .error(function(data, status, headers, config) {
          console.log('there was an error in the flickr image call of the image controller')
        })



      })
      .error(function(data, status, headers, config) {
        console.log('there was an error')
      })

    })

  })
  .error(function(data, status, headers, config) {
    console.log('theres been an error in the flickr call of the ImageController')
  })


})

// Helper methods
// Cleans up and parses returned flickr data into a JSON object.

function deFlickrify(data) {
  return JSON.parse(data.substring(14, data.length - 1));
}


