import '../../../../../Cwel/Script/main';
import app from '../../../Shared/Asset/Script/site';

app.directive('test', () => {
    return {
        restrict: 'A',
        link: (scope, el) => {
            scope.stuff = 'awesome';
            console.log(el);
        },
    };
});

console.log("I'm a grid!");
