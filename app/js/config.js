"use strict";

angular.module('config', [])
.constant('ENV', {
    debug: false,
    apiHost: (
        function () {
            return 'http://iquantifi.azurewebsites.net/api';
        })(),
    fbAppId: '648677845173289'
})
;
