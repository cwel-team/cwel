import '../../../Cwel/Script/main';
import app from '../Shared/Asset/Script/site';

app.directive('test', () => {
    return {
        link(scope) {
            scope.greet = 'hello';
        },
    };
});

console.log("I'm homepage!");
