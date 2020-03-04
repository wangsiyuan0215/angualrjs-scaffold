/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-26 11:22:38
 * @Description: router.service
 */

(function(_) {
    _.angular.module('AppModule').factory('$_router', [
        '$route',
        '$location',
        function($route, $location) {
            function handler4encodingParams (params) {
                return _.R.reduce(
                    function(acc, key) {
                        return (acc[key] = encodeURIComponent(params[key])), acc;
                    },
                    {},
                    _.R.keys(params)
                );
            }
            function navigate (path, params) {
                $location
                    .search('')
                    .search(handler4encodingParams(params))
                    .path(path);
            }
        
            return {
                $r: $route,
                $l: $location,
                back: function () {
                    return window.history.back();
                },
                replace: function(path, params) {
                    navigate(path, params);
                    $location.replace();
                },
                navigate: navigate,
                toError: function(errorMsg) {
                    $location
                        .search('')
                        .search('message', encodeURIComponent(errorMsg.toString()))
                        .path('/error');
                    $location.replace();
                }
            };
        }
    ]);
})(window);
