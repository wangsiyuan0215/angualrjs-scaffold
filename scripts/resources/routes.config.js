/*
 * @Author: SiYuan Wang
 * @Date: 2020-01-07 21:43:01
 * @Description: routes.config
 */

(function(_) {
    _.angular.module('AppModule').decorator('$routesConfig', [
        '$delegate',
        '$language',
        function($delegate, $lang) {
            $delegate[0].show = false;
            $delegate[0].name = $lang.headers.default;
            
            return $delegate.concat([
                {
                    key: 'welcome',
                    show: false,
                    path: '/welcome',
                    name: $lang.headers.welcome,
                    templateUrl: 'html/welcome.html',
                    controller: 'welcome.ctrl'
                },
                {
                    path: '*',
                    redirect: '/error'
                }
            ]);
        }
    ]);
})(window);
