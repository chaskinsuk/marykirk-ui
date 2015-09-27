'use strict';

angular.module('marykirkApp.customers', ['ngRoute'])


.controller('CustomersCtrl', ['$scope', '$http', '$location', 'customersFactory',
	function($scope, $http, $location, customersFactory) {
	
//	    $scope.customers = customersFactory.search('buchan');
	
		$scope.currentCustomer = {};
	
		$scope.searchMe = function(){
			customersFactory.search($scope.queryTerm)
					.then(function(data) {
						$scope.customers = data;
					}, function(data) {
						alert(data);
					})
		}
		
		$scope.removeUser = function(id) {
			
			customersFactory.getESCustomerId(id)
			.then(function(esid) {
				customersFactory.removeUser(esid)
				.then(function(data) {
					$scope.messages = data;
				}, function(data) {
					alert(data);
				})
				
			})
		}
		
		$scope.searchMe();
	    $scope.orderProp = 'Surname';
}]);
