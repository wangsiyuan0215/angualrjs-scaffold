/*
 * @Author: siyuan.wang
 * @Date: 2019-03-04 14:04:19
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:47:40
 */

(function(_) {
    'use strict';

    _.angular.module('AppModule').constant('$_language', {
        headers: {
            error: '出错了'
        },
        errorMessages: {
            errorNull: '未知错误发生啦，请稍后再试...'
        }
    });
})(window);
