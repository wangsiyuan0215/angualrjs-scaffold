/*
 * @Author: siyuan.wang
 * @Date: 2019-01-08 14:15:44
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-01-08 15:39:41
 */

(function(_) {
    'use strict';

    var lodash = _._;
    _.angular.module('AppModule').factory('$_element', [
        function() {
            return {
                element: lodash.curry(function _$(selector) {
                    var _$doms = _.document.querySelectorAll(selector),
                        _$dom = _$doms.length && _$doms.length === 1 ? _$doms[0] : _$doms;
                    return _.angular.element(_$dom);
                }),
                removeClass: lodash.curry(function _removeClass(className, dom) {
                    return _.angular.element(dom).removeClass(className);
                }),
                addClass: lodash.curry(function _addClass(className, dom) {
                    return _.angular.element(dom).addClass(className);
                })
            };
        }
    ]);
})(window);
