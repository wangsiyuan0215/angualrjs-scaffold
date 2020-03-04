/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-26 11:18:26
 * @Description: language
 */
(function(_) {
    _.angular.module('AppModule').constant('$language', {
        headers: {
            default: 'Loading...',
            welcome: '欢迎'
        },
        emptyMessages: {},
        errorMessages: {
            timeout: '请求超时，请检查网络后再试...'
        },
        successMessages: {},
        confirmMessages: {}
    });
})(window);
