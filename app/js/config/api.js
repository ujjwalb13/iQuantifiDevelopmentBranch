"use strict";

angular.module('config', [])
.constant('ENV', {
  debug: false,
  apiHost: (
      function () {
        //return 'http://localhost:53205/api';

        return 'http://iquantifi.azurewebsites.net/api';

        if (window.location.hostname.toUpperCase() == 'localhost'.toUpperCase())
          return 'http://localhost:53205/api';
        else
          return window.location.protocol + '//' + window.location.hostname + '/api';

      })(),
  fbAppId: '648677845173289'
})
;