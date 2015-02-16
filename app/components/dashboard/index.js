/**
 * Created by eduardo on 2/14/15.
 */

require('angular');
angular.module('robobetty', []);

(function(module) {
var dashboardCtrl = require('./main/dashboard');
var dashboardHeaderCtrl = require('./main/header');
var dashboardSidebarCtrl = require('./main/sidebar');

var doctors = require('./doctors/doctors');

var formBuilder = require('./formBuilder/formBuilder');

angular.module('robobetty').controller('dashboardCtrl', dashboardCtrl.dir);
angular.module('robobetty').controller('dashboardHeaderCtrl', dashboardHeaderCtrl.dir);
angular.module('robobetty').controller('dashboardSidebarCtrl', dashboardSidebarCtrl.dir);

module.exports = angular.module('robobetty');
})(module);