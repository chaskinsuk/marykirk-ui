'use strict';

describe('marykirkApp.version module', function() {
  beforeEach(module('marykirkApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
