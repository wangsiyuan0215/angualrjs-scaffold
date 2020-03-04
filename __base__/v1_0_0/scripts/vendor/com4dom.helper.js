/*
 * @Author: siyuan.wang
 * @Date: 2019-01-18 00:12:55
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-01-18 22:52:26
 */
(function(context, name, factory) {
    'use strict';

    /* eslint no-undef: ["off"] */
    if ('object' === typeof module && 'object' === typeof exports) {
        module.exports = factory();
    } else if ('function' === typeof define && 'object' === typeof define.amd && define.amd) {
        define(function() {
            return factory();
        });
    } else if ('object' === typeof exports) {
        exports[name] = factory();
    } else {
        context[name] = factory();
    }
})(this || window, 'com4dom', function _dom_helper() {
    'use strict';

    /* eslint no-undef: ["off"] */
    function __getScreenSize() {
        var _width = window.innerWidth,
            _height = window.innerHeight;

        if ('number' !== typeof _width) {
            var _property =
                document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
            return [_property.clientWidth, _property.clientHeight];
        }

        return [_width, _height];
    }

    function Com4Dom() {}

    // ========== viewport ===============
    /**
     * @namespace viewport
     * @method getWidth {function: number}
     * @method getHeight {function: number}
     * @method getScrollTop {function: number}
     */
    Com4Dom.prototype.viewport = {};
    Com4Dom.prototype.viewport.getWidth = function _getWidth() {
        return __getScreenSize()[0];
    };
    Com4Dom.prototype.viewport.getHeight = function _getHeight() {
        return __getScreenSize()[1];
    };
    Com4Dom.prototype.viewport.getScrollTop = function _getScrollTop() {
        return document.compatMode === 'CSS1Compat'
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
    }

    // ============= event ===============
    /**
     * @namespace event
     * @method getEvent {function(event: object): object}
     * @method getTarget {function(event: object): object}
     * @method preventDefault {function(event: object): void}
     * @method stopPropagation {function(event: object): void}
     * @method on {function(element: HTMLElement, eventName: string, handler: function(object): void, options: boolean|object): object}
     * @method off {function(element: HTMLElement, eventName: string, handler: function(object): void, options: boolean|object): object}
     */
    Com4Dom.prototype.event = {};
    Com4Dom.prototype.event.getEvent = function _eventGetter(event) {
        return event ? event : window.event;
    };
    Com4Dom.prototype.event.getTarget = function _targetGetter(event) {
        return event.target || window.event.srcElement;
    };
    Com4Dom.prototype.event.preventDefault = function _preventDefault(event) {
        if (event.preventDefault) event.preventDefault();
        else event.returnValue = false;
    };
    Com4Dom.prototype.event.stopPropagation = function _stopPropagation(event) {
        return event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    }
    Com4Dom.prototype.event.on = function _eventOn(element, eventName, handler, options) {
        var _self = this;
        function _handler(event) {
            var _event = _self.getEvent(event);

            return 'function' === typeof handler && handler(_event);
        }
        if (element.addEventListener) {
            element.addEventListener(eventName, _handler, options || false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, _handler);
        } else {
            element['on' + eventName] = _handler;
        }
        return {
            $element: element,
            $handler: _handler,
            $options: options || false,
            $eventName: eventName
        };
    };
    Com4Dom.prototype.event.off = function _eventOff(element, eventName, handler, options) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, handler, options || false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + eventName, handler);
        } else {
            element['on' + eventName] = null;
        }
        return {
            $element: element,
            $handler: handler,
            $options: options || false,
            $eventName: eventName
        };
    };

    return new Com4Dom();
});
