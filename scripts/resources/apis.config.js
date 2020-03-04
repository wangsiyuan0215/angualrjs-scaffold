/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-26 11:22:46
 * @Description: apis.config
 */

(function(_) {
    var prefixed = '/demo/api';

    _.angular.module('AppModule').constant('$apis', {
        demoApi: prefixed + '/demo'
    });
})(window);
