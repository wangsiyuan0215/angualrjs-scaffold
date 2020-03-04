/*
 * @Author: SiYuan Wang
 * @Date: 2020-01-07 15:31:11
 * @Description: template4literal
 */

(function(_) {
    var _scriptsElements = document.getElementsByTagName('script'),
        _moduleName = null;

    for (var key in _scriptsElements) {
        if (Object.prototype.hasOwnProperty.call(_scriptsElements, key)) {
            var item = _scriptsElements[key];
            if (item.src.indexOf('template.filter.js?moduleName=') !== -1) {
                item.src.replace(/(\w+)(?:=([^&]*))/g, function(_, key, value) {
                    if (key === 'moduleName') _moduleName = value;
                    return false;
                });
                break;
            }
        }
    }

    if (_moduleName === null) {
        throw new Error('template.filter.js: parameter moduleName is required. eg: template.filter.js?moduleName=xxx');
    }
    
    _.angular.module(_moduleName).filter('template', function() {
        return function(format) {
            var index = 0,
                arg4parent = arguments;

            return format.replace(/%s/g, function() {
                return arg4parent[++index];
            });
        };
    });
})(window);
