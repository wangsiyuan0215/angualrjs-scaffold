/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-26 11:22:42
 * @Description: config.config
 */

(function(_) {
    _.angular.module('AppModule').constant('$config', {
        defaultPage: 1,
        defaultPageSize: 10,
        defaultCurrency: '0.00',
        defaultDateFormat: 'yyyy-MM-dd',
        requestSuccessfulCode: 'SUCCESS'
    });
})(window);
