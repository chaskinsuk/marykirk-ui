var marykirkServices = angular.module('marykirkApp.custServices', ['ngRoute', 'elasticsearch']);

marykirkServices.factory('customerFactory', ['$q', 'esFactory', function($q, esFactory) {
	  var client = esFactory({
	    // host: $location.host() + ':9200'
		  host: '10.0.0.161:9200'
	  });
	  
	  var getCustomer = function(id) {
		    var deferred = $q.defer();
		    var query = {
		      match: {
		        id: id
		      }
		    };

		    client.search({
		      index: 'marykirk',
		      type: 'customer',
		      body: {
		        query: query
		      }
		    }).then(function(result) {
		      var ii = 0, hits_in, hits_out = [];

		      hits_in = (result.hits || {}).hits || [];

		      for(; ii < hits_in.length; ii++) {
		        hits_out.push(hits_in[ii]._source.customer);
		      }

		      deferred.resolve(hits_out);
		    }, deferred.reject);

		    return deferred.promise;
		  };

		  var saveUpdate = function(esid, customer) {
			  var deferred = $q.defer();
			  
			  client.index({
				  index: 'marykirk',
				  type: 'customer',
				  id: esid,
				  body: {
					  customer
				  }
			  }).then(function(result) {
				  
				  var created = result.created;
				  var msg = "Saved";
				  if (!created) {
					  msg = "Error: failed to save";
				  }
				  
				  deferred.resolve(msg);
			  }, function(error) { 
				  
			      deferred.reject(error);
			  });
			  
			  return deferred.promise;
		  };
		  
		  var getESCustomerId = function(id) {
				var deferred = $q.defer();
				var query = {
					match : {
						id : id
					}
				};
				
				client.search({
					index : 'marykirk',
					type : 'customer',
					body : {
						query : query
					}
				}).then(function(result) {
					var ii = 0, hits_in, hits_out = [];

					hits_in = (result.hits || {}).hits || [];

					for (; ii < hits_in.length; ii++) {
						hits_out.push(hits_in[ii]._id);
					}

					deferred.resolve(hits_out[0]);
				}, function(error) {
					
					deferred.reject;
				});
				return deferred.promise;
			};
			
		  // Since this is a factory method, we return an object representing
			// the actual service.
		  return {
			  getCustomer: getCustomer, 
			  saveUpdate: saveUpdate,
			  getESCustomerId: getESCustomerId
		  };
		  
		  

			 
}]);