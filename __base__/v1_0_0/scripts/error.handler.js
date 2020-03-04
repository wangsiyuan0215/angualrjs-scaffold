/*
 * @Author: SiYuan Wang
 * @Date: 2020-01-08 14:05:04
 * @Description: error.handler
 */

(function(_) {
    var _scriptsElements = document.getElementsByTagName('script'),
        _moduleName = null;

    for (var key in _scriptsElements) {
        if (Object.prototype.hasOwnProperty.call(_scriptsElements, key)) {
            var item = _scriptsElements[key];
            if (item.src.indexOf('error.handler.js?moduleName=') !== -1) {
                item.src.replace(/(\w+)(?:=([^&]*))/g, function(_, key, value) {
                    if (key === 'moduleName') _moduleName = value;
                    return false;
                });
                break;
            }
        }
    }

    if (_moduleName === null) {
        throw new Error('error.handler.js: parameter moduleName is required. eg: error.handler.js?moduleName=xxx');
    }

    var requires = _.angular.module(_moduleName).requires;

    if (requires.indexOf('fc') === -1) {
        throw new Error(
            'error.handler.js: `fc` module is not found, please make sure that your project has required fc module.'
        );
    }

    _.angular
        .module(_moduleName)
        .constant('__CONSTANT__STATUS__', [444, 555, 599])
        .constant('__ERROR_MESSAGE_STATUS__', {
            '-99': '请求超时，请检查网络后再试...',
            401: '当前操作未授权，请先登录...',
            403: '当前登录已失效，请重新登录后再试...',
            404: '很抱歉，你所访问的资源未找到',
            410: '很抱歉，你所访问的资源未找到',
            422: '当创建一个对象时，发生一个验证错误。',
            500: '很抱歉，服务器出错了，请稍后再试',
            502: '很抱歉，请求服务出错，请稍候再试',
            503: '很抱歉，当前服务器目前正在维护，请稍后再试',
            504: '很抱歉，请求超时.'
        })
        .config([
            '$fcProvider',
            '$fc.toastProvider',
            '__CONSTANT__STATUS__',
            '__ERROR_MESSAGE_STATUS__',
            function($fp, $ftp, $status, $lang) {
                /**
                 * @param $fp {{ http: { setErrorHandler: function } }}
                 */
                $fp.http.setErrorHandler(function(error) {
                    if (error.success) return false;

                    var payload = error.payload || {};
                    var errorMessage = (payload.status && $lang[payload.status]) || false;

                    if ($status.indexOf(Number(payload.status)) !== -1) {
                        errorMessage = payload.data && payload.data.message;
                    }

                    errorMessage && $ftp.$get().error(errorMessage);
                });
            }
        ]);
})(window);
