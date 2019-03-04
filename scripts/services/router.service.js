/*
 * @Author: siyuan.wang
 * @Date: 2019-01-07 10:05:28
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:06:29
 */

(function(_) {
    'use strict';

    _.angular.module('AppModule').factory('$_router', [
        '$route',
        '$location',
        '$_config',
        '$j2j',
        function($route, $location, $config, $j2j) {
            var __getRouteConfig = function() {
                return (
                    ($route.routes[$location.path()] && $route.routes[$location.path()].config) ||
                    false
                );
            };
            return {
                $r: $route,
                $l: $location,
                goBack: function(delta) {
                    window.history.go(delta || -1);
                },
                close: function() {
                    $j2j.requestForNative($config.nativeEvents.closeSelf, false);
                },
                getRouteConfig: __getRouteConfig,
                toErrorWithReplacing: function(errorMsg, delta) {
                    $location
                        .search('')
                        .search('errorMessage', encodeURIComponent(errorMsg.toString()))
                        .search('delta', delta || -1)
                        .path('/error');
                    $location.replace();
                }
            };
        }
    ]);
})(window);
