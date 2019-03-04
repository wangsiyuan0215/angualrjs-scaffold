/*
 * @Author: siyuan.wang
 * @Date: 2019-01-07 10:08:44
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:07:46
 */

(function(_) {
    'use strict';

    _.angular.module('AppModule').controller('baseController', [
        '$rootScope',
        '$scope',
        '$_config',
        '$_router',
        function($rootScope, $scope, $config, $router) {
            $scope.$on('$locationChangeStart', function() {
                var currentRouteConfig = $router.getRouteConfig();
                if (!currentRouteConfig) return ($scope.header = false);

                $scope.header = {
                    back: 'undefined' === typeof currentRouteConfig.back ? true : !!currentRouteConfig.back,
                    cancel: currentRouteConfig.cancel || false,
                    title: currentRouteConfig.title || '加载中，请稍后...'
                };
            });

            $scope.goBack = function() {
                $scope.header.cancel === true ? $router.close() : $router.goBack();
            };
        }
    ]);
})(window);
