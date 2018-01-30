import '../../../Cwel/Script/main';
import app from '../Shared/Asset/Script/site';
const contentful = require('contentful');

// Date
app.controller('docs', ($scope) => {
    $scope.date = new Date();
})

// Nav
app.directive('navitem', ($rootScope) => {
    return {
        scope: {
            text: '=',
            items: '=',
            name: '=',
        },
        templateUrl: 'shared/layout/nav-item.html',
        link(scope, element) { }
    }
});

// Contentful
const client = contentful.createClient({
  space: 'yxnc72m9rwc9',
  accessToken: 'becc6f5bad7201fc61c75cca9ef657609a3599aae89b5cd5ed215f9f7656cdca',
  resolveLinks: true
})

app.service('contentful', ($rootScope) => {
    class Contentful {
        getContentTypes(callback) {
            client.getContentTypes()
            .then((res) => {
                $rootScope.$applyAsync(() => callback(res.items));
            })
            .catch(console.error)
        }
        getPageData(name, type, callback) {
            client.getEntries({
                content_type: type,
                'fields.name': name,
            })
            .then((res) => {
                console.log(res)
                $rootScope.$applyAsync(() => callback(res.items[0].fields));
            })
            .catch(console.error)
        }
        getPageLinks(callback) {
            client.getEntry('2xvviTT5768UOcCMYwskCA') // Nav ID
            .then((configRes) => {

                client.getEntries({
                    content_type: 'component',
                    select: 'fields.name,fields.title',
                })
                .then((componentRes) => {
                    $rootScope.$applyAsync(() => {
                        let config = configRes.fields.config;

                        for (let item of config) {
                            if (item.name === 'component') {
                                item.items = componentRes.items.map(item => {
                                    item.fields.text = item.fields.title;
                                    return item.fields;
                                });
                            }
                        }
                        callback(config);
                    })
                })
                .catch(console.error)

            })
            .catch(console.error)
            
        }
    }
    return new Contentful;
});

app.controller('content', ($scope, $stateParams, contentful) => {
    contentful.getPageData($stateParams.name, 'guide', (res) => {
        $scope.title = res.title;
        $scope.body = res.body;
    });
});

app.controller('navRender', ($scope, contentful) => {
    $scope.pages = [];
    contentful.getPageLinks((res) => {
        $scope.pages = $scope.pages.concat(res);
    });
})

app.config(function($stateProvider, $urlRouterProvider, $qProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider

        .state('component', {
            url: '/component/:name',
            templateUrl: './Layout/content',
            controller: 'content'
        })

        .state('nested', {
            url: '/:type/:name',
            templateUrl: './Layout/content',
            controller: 'content'
        })

        .state('page', {
            url: '/{name:[^/]+}',
            templateUrl: './Layout/content',
            controller: 'content'
        })

        .state('landing', {
            url: '/',
            templateUrl: './Layout/landing',
            controller: function() {}
        })

    $qProvider.errorOnUnhandledRejections(false);
})

