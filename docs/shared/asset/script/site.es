import sanitize from 'angular-sanitize';
import './vendor/humane';
import './vendor/angular-ui-router.js';

export default angular.module('docs', ['ui.router', sanitize, 'cwel']);
