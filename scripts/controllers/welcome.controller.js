/*
 * @Author: siyuan.wang
 * @Date: 2020/3/4 2:02 PM
 * @Description: welcome.controller
 */

(function(_) {
    _.angular.module('AppModule').controller('welcome.ctrl', [
        '$scope',
        function($scope) {
            $scope.date = new Date();
        }
    ]);
})(window);
