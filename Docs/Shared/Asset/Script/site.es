import sanitize from 'angular-sanitize';
import './Vendor/humane';
import './Vendor/angular-ui-router.js';

export default angular.module('docs', ['ui.router', sanitize]);
