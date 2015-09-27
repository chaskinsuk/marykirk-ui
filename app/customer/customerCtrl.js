'use strict';

angular.module('marykirkApp.customer', ['ngRoute'])

.controller('CustomerCtrl', ['$scope', '$routeParams', '$location', 'customerFactory',
                                  function($scope, $routeParams, $location, customerFactory) {
	$scope.currentCustomer = $routeParams.customerRec;
	
	$scope.TitleList = {
			'Mr' : 'Mr',
			'Mrs' : 'Mrs',
			'Ms' : 'Ms',
			'Dr' : 'Dr',
			'Prof' : 'Prof'
	}
	
	$scope.getCust = function(){
		customerFactory.getCustomer($scope.currentCustomer)
				.then(function(data) {
					$scope.customer = data[0];
				}, function(error) {
					alert(data);
					console.trace(error.message);
				})
	};
	
	$scope.cancelEdit = function() {
		$location.path('#/customers/');
	}
	
	$scope.saveUpdate = function() {
		
		if ($scope.customer.id != null) {
			customerFactory.getESCustomerId($scope.customer.id)
				.then(function(esid) {
					customerFactory.saveUpdate(esid, $scope.customer)
					.then(function(data) {
						// navigate back to list
						$location.url('/customers');
					}, function(error) {
						$scope.messages = "Error:" + error.message;
						// keep current page
					})
					
			})
		} else {
			
			// generate an id
			$scope.customer.id = generateGuid();
			customerFactory.saveUpdate(null, $scope.customer)
			.then(function(data) {
				// navigate back to list
				$location.url('/customers');
			}, function(error) {
				$scope.messages = "Error:" + error.message;
				// keep current page
			})
		}
	};
	
	var generateGuid = function () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	};
		
	var removeRootElement = function (obj) {
	    var numKeys = 0,
	        rootKey;
	    
	    // Iterate through keys in object and confirm there's only a single root
	    for (var key in obj) {
	        
	        // Skip built in
	        if (!obj.hasOwnProperty(key)) continue;
	        
	        // Assign current key as root
	        rootKey = key;
	        
	        // Increment key counter
	        numKeys++;
	        
	        // Stop if there's more than one key
	        if (numKeys === 2) { break; }
	    }
	    
	    // If there is a single root, transfer its contents (if applicable) to
	    // a new object to return
	    if (numKeys === 1) {
	        var newObj = {},
	            rootObj = obj[rootKey];
	        
	        if (typeof rootObj === "object") {
	            for (var key in rootObj) {                
	                if (rootObj.hasOwnProperty(key)) {
	                    newObj[key] = rootObj[key];
	                }
	            }
	            
	            return newObj;
	        }
	    }
	    
	    return obj;
	};

	
	
	$scope.getCust();
	
}]);