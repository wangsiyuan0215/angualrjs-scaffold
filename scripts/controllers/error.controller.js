/*
 * @Author: siyuan.wang
 * @Date: 2019-03-04 14:09:39
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:09:39
 */

(function(_) {
    'use strict';

    _.angular.module('AppModule').controller('errorController', [
        '$scope',
        '$_router',
        '$_language',
        function($scope, $router, $lang) {
            var delta = $router.$l.search().delta;
            var errorMessage = $router.$l.search().errorMessage;

            $scope.delta = delta;
            $scope.goBack = $router.goBack;
            $scope.errorMessage = errorMessage
                ? decodeURIComponent(errorMessage)
                : $lang.errorMessages.errorNull;
        }
    ]);
})(window);
