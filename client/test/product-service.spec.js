describe('Product Service', function() {

  beforeEach(module('product'));

  var ProductService;
  var http;

  beforeEach(inject(function(_ProductService_, _$httpBackend_) {
    ProductService = _ProductService_;
    http = _$httpBackend_;
  }));

  describe('When getProducts in invoked', function() {

    beforeEach(function() {
      http
        .expectGET('https://blue-jay.herokuapp.com/api/products')
        .respond(200, {name: "fooo"});
      ProductService.getProducts();
      http.flush();
    });

    it('it should call http get', function() {
      http.verifyNoOutstandingExpectation();
      http.verifyNoOutstandingRequest();
    });

  });

});