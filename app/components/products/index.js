/**
 * Created by eduardo on 2/14/15.
 */

require('angular');

angular.module('products', []);
var prodSpecs = require('./specs/product-specs');
var prodDesc = require('./description/product-description');
var prodGal = require('./gallery/product-gallery');
var prodRev = require('./reviews/product-reviews');
var prodTabs = require('./tabs/product-tabs');

angular.module('products').directive('productSpecs', prodSpecs.dir);

angular.module('products').directive('productReviews', prodRev.dir);

angular.module('products').directive('productGallery', prodGal.dir);

angular.module('products').directive('productDescription', prodDesc.dir);

angular.module('products').directive('productTabs', prodTabs.dir);

module.exports = angular.module('products');