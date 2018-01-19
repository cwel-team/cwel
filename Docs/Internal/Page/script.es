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

const client = contentful.createClient({
  space: '3rpovp1abf8h',
  accessToken: '9aaf6788a131e94000e20646d94d7dbb2f0722044b22f1852244fdbd8e46742b',
  resolveLinks: true
})

client.getEntries({
    'fields.name': 'CWEL Docs',
    content_type: 'site'
})
.then((res) => {
    const site = res.items[0];
    console.log(site.fields.pages);
})
.catch(console.error)

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/landing')
    $stateProvider

        .state('landing', {
            url: '/landing',
            template: '<div>Landing</div>'
        })

        .state('getting-started', {
            url: '/getting-started',
            template: '<div>getting-started</div>'
        }) 

})







// const entryID = '24DPGBDeGEaYy8ms4Y8QMQ';

// app.controller('outputTest', ($scope) => {

//     client.getEntries({
//         'sys.id': entryID,
//     })
//     .then((res) => {
//         $scope.$apply( () => {
//             $scope.title = res.items[0].fields.title;
//             $scope.description = res.items[0].fields.categoryDescription;
//         }) 
//         // console.log(res)
//     })
//     .catch((err) => {
//         console.log('Error getting the posts ', err);
//     });

//     // Gets all content types from space, this will allow us to create the nav
//     client.getContentTypes()
//     .then((res) => {
//         $scope.$apply( () => {
//             var nav = []
//             for (var i=0; i < res.length; i++) {
//                 nav.push(res.items[i].name)
//             }
//             $scope.nav = nav;
//         });
//         $scope.nav = res.items[0].name
//         console.log(res.items)
//     })
//     .catch(console.error)

//     // Gets all entries from space
//     // client.getEntries()
//     // .then((response) => console.log(response.items))
//     // .catch(console.error)
// });
