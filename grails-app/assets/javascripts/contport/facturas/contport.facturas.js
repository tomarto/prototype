//= wrapped
//= require /chartjs/Chart
//= require /chartjs/angular-chart
//= require /ng-file-upload/ng-file-upload
//= require /ng-file-upload/ng-file-upload-shim
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

angular
    .module('contport.facturas', [
        'contport.core',
        'chart.js',
        'ngFileUpload'
    ]);
