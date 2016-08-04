//= wrapped
//= require /chartjs/Chart
//= require /chartjs/angular-chart
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

angular
    .module('prototype.comprobantes', [
        'prototype.core',
        'chart.js'
    ]);
