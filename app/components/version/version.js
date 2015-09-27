'use strict';

angular.module('marykirkApp.version', [
  'marykirkApp.version.interpolate-filter',
  'marykirkApp.version.version-directive'
])

.value('version', '0.1');
