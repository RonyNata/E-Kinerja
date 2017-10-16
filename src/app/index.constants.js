/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('eKinerja')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    // .constant('API', 'http://localhost:8080/api/');
    // .constant('API', 'http://192.168.1.219:8080/api/');
    .constant('API', 'http://10.2.1.32:8080/api/');
})();
