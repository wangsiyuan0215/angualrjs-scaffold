/*
 * @Author: siyuan.wang
 * @Date: 2019-01-07 12:25:21
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:40:16
 *
 * Routes Configuration
 */

(function(_) {
    'use strict';

    _.angular.module('AppModule').config([
        '$_config',
        '$_language',
        '$fcProvider',
        '$routeProvider',
        function($config, $lang, $fp, $rp) {
            console.info('## current version is ', $config.version);
            $fp.http.setTimeout(10000);
            $rp
                .when('/error', {
                    templateUrl: 'html/pages/error.html',
                    controller: 'errorController',
                    config: {
                        back: false,
                        cancel: false,
                        title: $lang.headers.error
                    }
                })
                .otherwise({ redirectTo: '/error' });
        }
    ]);
})(window);
