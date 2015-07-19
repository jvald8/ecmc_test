// simple testing to describe the image controller

describe('ImagesController', function() {
  beforeEach(module('flickarama'));

  var imagesController;
  var httpBackend;
  var scope;

  beforeEach(
    inject(function($injector, $controller, $rootScope) {
      scope = $rootScope.$new();
      imagesController = $controller('ImagesController', {
        $scope: scope
      })
    }));

  it('images controller isn\'t null!', function() {
    expect(imagesController).not.toBe(null);
  });

  it('default search tag set to dctech', function() {
    expect(scope.tag).toEqual('dctech');
  });

  it('ig client id isn\'t empty, and app can make IG call', function() {
    expect(scope.IG_client_id).not.toEqual('');
  });

});
