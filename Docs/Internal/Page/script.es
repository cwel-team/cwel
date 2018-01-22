import '../../../Cwel/Script/main';
import app from '../Shared/Asset/Script/site';
const contentful = require('contentful');

app.directive('test', () => {
    return {
        link(scope) {
            scope.greet = 'hello';
        },
    };
});

console.log("I'm homepage!");


let site;
const client = contentful.createClient({
  space: 'yxnc72m9rwc9',
  accessToken: 'becc6f5bad7201fc61c75cca9ef657609a3599aae89b5cd5ed215f9f7656cdca',
  resolveLinks: true
})

// gets all entries of a space
// client.getEntries()
// .then((res) => {
//     site = res.items[0];
//     console.log(site);
// })
// .catch(console.error)

// gets all content types
client.getContentTypes()
.then((res) => console.log(res.items))
.catch(console.error)

app.service('contentful', ($rootScope) => {
    return {
        getPageData(name, callback) {
            client.getEntries({
                'fields.title': name, // pages are missing an id to use, currently using page title
            })
            .then((res) => {
                $rootScope.$applyAsync(() => callback(res.items[0].fields));
            })
            .catch(console.error)
        },
        getPageTitles(callback) {
            client.getEntries()
            .then((res) => {
                 $rootScope.$applyAsync(() => callback(res.items.map( item => item.fields)));
            })
            .catch(console.error)
        },
    }
});

app.controller('content', ($scope, $stateParams, contentful) => {
    contentful.getPageData($stateParams.name, (res) => {
        $scope.title = res.title;
        $scope.body = res.body;
    });
});

app.controller('navRender', ($scope, contentful) => {
    contentful.getPageTitles((res) => {
        console.log(res)
        $scope.pages = res;
    });
})

app.config(function($stateProvider, $urlRouterProvider, $qProvider) {
    $urlRouterProvider.otherwise('/landing')
    $stateProvider

        .state('page', {
            url: '/:name',
            templateUrl: './Layout/content',
            controller: 'content'
        });

    $qProvider.errorOnUnhandledRejections(false);
})



// Old setup

// let site;
// const client = contentful.createClient({
//   space: '3rpovp1abf8h',
//   accessToken: '9aaf6788a131e94000e20646d94d7dbb2f0722044b22f1852244fdbd8e46742b',
//   resolveLinks: true
// })
// client.getEntries({
//     'fields.name': 'CWEL Docs',
//     content_type: 'site'
// })
// .then((res) => {
//     site = res.items[0];
//     console.log(site.fields.pages);
// })
// .catch(console.error)

// app.service('contentful', ($rootScope) => {
//     return {
//         getPageData(name, callback) {
//             client.getEntries({
//                 'fields.id': name,
//                 content_type: 'page'
//             })
//             .then((res) => {
//                 $rootScope.$applyAsync(() => callback(res.items[0].fields));
//             })
//             .catch(console.error)
//         },
//         getPageTitles(callback) {
//             client.getEntries({
//                 content_type: 'page',
//             })
//             .then((res) => {
//                  $rootScope.$applyAsync(() => callback(res.items.map( item => item.fields)));
//             })
//             .catch(console.error)
//         }
//     }
// });

// app.controller('content', ($scope, $stateParams, contentful) => {
//     contentful.getPageData($stateParams.name, (res) => {
//         $scope.title = res.title;
//         $scope.content = res.content;
//     });
// });

// app.controller('navRender', ($scope, contentful) => {
//     contentful.getPageTitles((res) => {
//         $scope.pages = res;
//     });
// })

// app.config(function($stateProvider, $urlRouterProvider, $qProvider) {
//     $urlRouterProvider.otherwise('/landing')
//     $stateProvider

//         .state('page', {
//             url: '/:name',
//             templateUrl: './Layout/content',
//             controller: 'content'
//         });

//     $qProvider.errorOnUnhandledRejections(false);
// })
