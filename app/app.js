'use strict';

// Declare app level module which depends on views, and components
angular.module('marykirkApp', [
  'ngRoute',
  'smart-table',
  'marykirkApp.customer',
  'marykirkApp.customers',
  'marykirkApp.services',
  'marykirkApp.custServices',
  'marykirkApp.version'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/customers', {
	    templateUrl: 'customers/customer-list.html',
	    controller: 'CustomersCtrl'
	}).
	when('/customers/:customerRec', {
	    templateUrl: 'customer/customer-detail.html',
	    controller: 'CustomerCtrl'
	}).
    otherwise({redirectTo: '/customers'
    });
}]);
