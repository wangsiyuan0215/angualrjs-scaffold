/*
 * @Author: SiYuan Wang
 * @Date: 2020-01-06 17:40:55
 * @Description: routes
 */

(function(_) {
    var _scriptsElements = document.getElementsByTagName('script'),
        _moduleName = null;

    for (var key in _scriptsElements) {
        if (Object.prototype.hasOwnProperty.call(_scriptsElements, key)) {
            var item = _scriptsElements[key];
            if (item.src.indexOf('routes.render.js?moduleName=') !== -1) {
                item.src.replace(/(\w+)(?:=([^&]*))/g, function(_, key, value) {
                    if (key === 'moduleName') _moduleName = value;
                    return false;
                });
                break;
            }
        }
    }

    if (_moduleName === null) {
        throw new Error('routes.render.js: parameter moduleName is required. eg: routes.render.js?moduleName=xxx');
    }
    
    _.angular
        .module(_moduleName)
        .value('$routesConfig', [
            {
                key: 'error',
                path: '/error',
                name: '出错啦...',
                template:
                    '<div style="height: 100%;padding: 2rem 0.3rem 0;text-align: center;background-color: white;">' +
                    '<img style="width: 5.2rem;height: 3.12rem;vertical-align: top;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;" src="{{errorImage}}" alt="">' +
                    '<p style="margin: 0.4rem 0.6rem 0;color: #333;font-size: 0.28rem;line-height: 0.6rem;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;" ng-bind-html="errorMessage"></p>' +
                    '</div>',
                controller: 'error'
            }
        ])
        .constant('errorTypes', {
            404: '404',
            info: 'info',
            card: 'no_card',
            content: 'no_content',
            network: 'no_network',
            order: 'no_order',
            service: 'no_service'
        })
        .config([
            '$routeProvider',
            '$routesConfigProvider',
            function($rp, $rc) {
                var currentRoutes = $rp,
                    keys = [];

                angular.forEach($rc.$get(), function(item) {
                    if (keys.indexOf(item.key) !== -1)
                        throw new Error(
                            'Warning: Encountered two routes with the same key, `.' +
                                item.key +
                                '`. Keys should be unique.'
                        );

                    keys.push(item.key);

                    if (item.path && (item.name || item.redirect)) {
                        var path = item.path;

                        'path' in item && delete item.path;

                        currentRoutes =
                            path === '*'
                                ? currentRoutes.otherwise({ redirectTo: item.redirect })
                                : currentRoutes.when(
                                    path,
                                    angular.extend(item, item.redirect ? { redirectTo: item.redirect } : {})
                                );
                    }
                });
            }
        ])
        .controller('error', [
            '$sce',
            '$scope',
            '$location',
            'errorTypes',
            function($sce, $scope, $location, errorTypes) {
                
                var prefixedUrl4image = 'https://h5.ihrss.neusoft.com/ihrss/fc/yx/assets/images/placeholders/';
                
                var errorType = errorTypes[$location.search().type || '404'] || errorTypes['404'],
                    errorMessage = $location.search().message;
                
                $scope.back = function() {
                    window.history.go(-1);
                };
                $scope.errorImage = prefixedUrl4image + errorType + '@2x.png';
                $scope.errorMessage = $sce.trustAsHtml(
                    errorMessage
                        ? decodeURIComponent(errorMessage)
                        : '「未找到你要访问的页面」<br /><span class="font__highlight--gray">请您检查所访问的路径是否正确</span>'
                );
            }
        ]);
})(window);
