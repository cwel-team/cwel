import '../cwel/script/main';
import app from './shared/asset/script/site';
import './shared/asset/script/docsExample';

const contentful = require('contentful');
const marked = require('marked');
const prism = require('prismjs');

app.factory('markdownService', () => {
    const renderer = new marked.Renderer();

    // Markdown render helpers
    function htmlEscapeToText(text) {
        return text.replace(/\[0-9]*;|&amp;/g, (escapeCode) => {
            if (escapeCode.match(/amp/)) {
                return '&';
            }
            return String.fromCharCode(escapeCode.match(/[0-9]+/));
        });
    }

    renderer.code = (text, language) => {
        const html = prism.highlight(text, prism.languages[language] || '');
        return `<pre ng-non-bindable><code class="language-${language}">${html}</code></pre>`;
    };

    renderer.table = (header, body) => {
        return `
        <table class="table">
            <thead>${header}</thead>
            <tbody>${body}</tbody>
        </table>`;
    };
    renderer.link = (href, title, text) => {
        return `<a href="${  href  }">${  text  }</a>`;
    };

    renderer.paragraph = (text) => {
        return `${htmlEscapeToText(text)}\r\n`;
    };

    renderer.heading = (text, level) => {
        if (level === 1) {
            return `<h1 class="h1"><span class="h1__text">${  text  }<span></h1>`;
        }
        if (level === 2) {
            return `<h2 class="h2"><span class="h2__text">${  text  }</span></h2>`;
        }
        return `<h${ level }>${  text  }</h${ level }>`;
    };

    renderer.image = () => {
        return '';
    };

    return {
        render(body) {
            if (!body) return '';
            return marked(body, {
                renderer,
            });
        },
    };
});

// Date
app.controller('docs', ($scope) => {
    $scope.date = new Date();
});

// Nav
app.directive('navitem', ($state, $stateParams) => {
    return {
        scope: {
            text: '=',
            items: '=',
            name: '=',
            filter: '=',
        },
        templateUrl: 'shared/layout/nav-item.html',
        link: (scope) => {
            scope.open = $state.includes(scope.name);

            if ($state.includes('overview')) {
                scope.open = $stateParams.type === scope.name;
            }
        },
    };
});

app.service('promiseApply', ($rootScope, $q) => {
    return (promise) => {
        const deferred = $q.defer();
        promise.then(val => $rootScope.$apply(() => deferred.resolve(val)));
        return deferred.promise;
    };
});

app.factory('contentfulService', ($rootScope, promiseApply) => {
    // Contentful
    const client = contentful.createClient({
        space: 'yxnc72m9rwc9',
        accessToken: 'becc6f5bad7201fc61c75cca9ef657609a3599aae89b5cd5ed215f9f7656cdca',
        resolveLinks: true,
    });

    return {
        getContentTypes() {
            return promiseApply(
                client.getContentTypes()
                .catch(console.error));
        },
        getPageData(name, type) {
            return promiseApply(
                client.getEntries({
                    content_type: type,
                    'fields.name': name,
                })
                .then(res => res.items[0].fields)
                .catch(console.error));
        },
        getPageLinks() {
            return promiseApply(client.getEntry('2xvviTT5768UOcCMYwskCA') // Nav ID
            .then((configRes) => {
                return client.getEntries({
                    content_type: 'component',
                    select: 'fields.name,fields.title',
                })
                .then((componentRes) => {
                    const config = configRes.fields.config;
                    config.forEach((item) => {
                        if (item.name === 'component') {
                            item.items = componentRes.items.map((itemRes) => {
                                itemRes.fields.text = itemRes.fields.title;
                                return itemRes.fields;
                            });
                        }
                    });
                    return config;
                });
            })
            .catch(console.error));
        },
        getEntries(type) {
            return promiseApply(client.getEntries({
                content_type: type,
                select: 'fields.name,fields.title,fields.logo',
            }).then((res) => {
                return res.items.map(item => item.fields);
            }));
        },
    };
});

app.controller('content', ($scope, $stateParams, contentfulService) => {
    contentfulService.getPageData($stateParams.name, $stateParams.type || 'guide')
    .then((content) => {
        $scope.title = content.title;
        $scope.body =  content.body;
        $scope.type = $stateParams.type;
    });
});

app.controller('component', ($scope, $state, $stateParams, contentfulService) => {
    contentfulService.getPageData($stateParams.name, 'component')
    .then((content) => {
        $scope.name = content.name;
        $scope.title = content.title;
        $scope.type = 'component';
        $scope.items = ['code', 'usage', 'design', 'service'];

        $scope.tabVisible = (item) => {
            $scope.hideTab = !content[item];
        };

        if (!$stateParams.tab) {
            for (let i = 0; i < $scope.items.length; i += 1) {
                if (content[$scope.items[i]] != null) {
                    $state.go('component.tab', { tab: $scope.items[i] });
                    return;
                }
            }
        }
        $scope.body = content[$stateParams.tab];
    });
});

app.controller('overview', ($scope, $state, $stateParams, contentfulService) => {
    contentfulService.getEntries($stateParams.type).then((components) => {
        $scope.components = components;
    });

    $scope.getUrl = (component) => {
        let type = $stateParams.type;

        if (type === 'guide') {
            type = 'page';
        }

        return $state.href(type, { name: component.name });
    };
});

app.controller('navRender', ($scope, contentfulService) => {
    $scope.pages = [];
    contentfulService.getPageLinks().then((content) => {
        $scope.pages = $scope.pages.concat(content);
    });
});

app.filter('markdown', ($sce, markdownService) => {
    return value => $sce.trustAsHtml(markdownService.render(value));
});

app.filter('capitalize', () => {
    return (input) => {
        return input ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});

// Routing
app.config(($stateProvider, $urlRouterProvider, $qProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('overview', {
        url: '/:type/overview',
        templateUrl: '/templates/overview',
        controller: 'overview',
    })
    .state('component', {
        url: '/component/:name',
        templateUrl: '/templates/component',
        controller: 'component',
    })
    .state('component.tab', {
        url: '/:tab',
        template: '<div class="container container--docs" ng-bind-html="body | markdown"></div>',
        controller: 'component',
    })

    .state('nested', {
        url: '/:type/:name',
        templateUrl: '/templates/content',
        controller: 'content',
    })

    .state('page', {
        url: '/{name:[^/]+}',
        templateUrl: '/templates/content',
        controller: 'content',
    })

    .state('landing', {
        url: '/',
        templateUrl: '/templates/landing',
    });

    $qProvider.errorOnUnhandledRejections(false);
})
.run(($rootScope) => {
    $rootScope.loaded = true;
});
