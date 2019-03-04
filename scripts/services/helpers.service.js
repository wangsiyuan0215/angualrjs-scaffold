/*
 * @Author: siyuan.wang
 * @Date: 2019-03-04 14:06:54
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-04 14:06:54
 */
(function(_) {
    'use strict';

    _.angular.module('AppModule').factory('$_helpers', [
        '$q',
        '$timeout',
        function($q, $timeout) {
            function __timeFormatter(dateString, format) {
                var _date = new Date(dateString),
                    _regFormatter = {
                        'M+': _date.getMonth() + 1,
                        'd+': _date.getDate(),
                        'H+': _date.getHours(),
                        'm+': _date.getMinutes(),
                        's+': _date.getSeconds()
                    };

                if (/(Y+|y+)/.test(format)) {
                    format = format.replace(RegExp.$1, ('' + _date.getFullYear()).slice(-RegExp.$1.length));
                }

                _.angular.forEach(_regFormatter, function(item, index) {
                    if (new RegExp('(' + index + ')').test(format)) {
                        format = format.replace(RegExp.$1, ('00' + item).slice(-RegExp.$1.length));
                    }
                });

                return format;
            }

            function __toString(param) {
                if ('undefined' === typeof param || param === null || 'boolean' === typeof param) return '';
                if ('number' === typeof param || 'string' === typeof param) return '' + param;
                return Object.prototype.toString.call(param);
            }

            function __fixedTo2(param) {
                var _paramFloat = parseFloat(param);
                return (isNaN(_paramFloat) ? 0.0 : _paramFloat).toFixed(2);
            }

            /**
             * promise 序列执行方法
             *
             * promises 是以函数（若有参数，则为前者函数返回的结果）为项的数组
             * 如果执行的 promise/函数 需要上一个 promise/函数 执行返回的结果,
             * 需要将其结果当做参数传递到当前执行的函数中
             * 同时，若函数为 Promise 类型，
             * 那么 catch 需要以 return $q.reject(some reason..) 的形式进行传递或捕获。
             * 具体使用，请参照 prescription/index.controller.js
             *
             * eg: __promiseSequence([
             *      function A(): a,
             *      function B(a: form A): b
             * ])
             *
             * @param promises
             * @returns {Promise}
             * @private
             */
            function __promiseSequence(promises) {
                var result = $q.resolve();
                _.angular.forEach(promises, function(promise) {
                    result = result.then(promise).catch(function(error) {
                        return $q.reject(error);
                    });
                });

                return result;
            }

            /**
             * 倒计时（1s）构造函数
             *
             * 若要使用，请使用 new 创建对象，如：
             *
             *      new $helpers.$$CountDown(continueCB: function, timeoutCB: function)
             *
             * @param continueCB 相隔 1s 执行的回调方法
             * @param timeoutCB 倒计时到 0 时所执行的回调函数
             * @returns {boolean}
             * @private
             */
            function __CountDown(continueCB, timeoutCB) {
                function noop() {}
                this.timer = null;
                this.continued = false;
                this.timeoutCB = timeoutCB || noop;
                this.continueCB = continueCB || noop;
            }

            /**
             * 开始执行倒计时
             *
             * @param targetExpireTimestamp 目标超时的时间戳
             * @returns {__CountDown}
             */
            __CountDown.prototype.start = function(targetExpireTimestamp) {
                this.continued = true;
                this.targetExpireTimestamp = targetExpireTimestamp;
                this.__run(this.continueCB, this.timeoutCB);

                return this;
            };
            __CountDown.prototype.__run = function(continueCB, timeoutCB) {
                if (!this.continued) return false;

                var offsetTimestamp = this.targetExpireTimestamp - Date.now();

                if (offsetTimestamp <= 0) {
                    console.log('countDown：closed...');
                    this.timer && $timeout.cancel(this.timer);
                    return timeoutCB();
                }

                var self = this;
                this.timer = $timeout(function() {
                    self.timer && $timeout.cancel(self.timer);
                    self.__run(continueCB, timeoutCB);
                }, 1000 - new Date().getMilliseconds());

                continueCB(offsetTimestamp);

                return this;
            };
            /**
             * 取消倒计时
             * @returns {__CountDown}
             */
            __CountDown.prototype.cancel = function() {
                this.continued = false;
                this.timer && $timeout.cancel(this.timer);

                return this;
            };

            return {
                // Constructor
                $$CountDown: __CountDown,

                fixedTo2: __fixedTo2,
                timeFormatter: __timeFormatter,
                transfer2String: __toString,
                promiseSequence: __promiseSequence
            };
        }
    ]);
})(window);
