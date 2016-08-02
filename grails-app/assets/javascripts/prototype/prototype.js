//= wrapped
//= require /angular/angular
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /jquery/jquery
//= require /bootstrap/bootstrap
//= require /bootstrap/ui-bootstrap-tpls
//= require /angular-treasure-overlay-spinner/treasure-overlay-spinner.min
//= require /ngstorage/ngStorage
//= require /d3/d3
//= require /angular-charts/angular-charts
//= require_self
//= require /prototype/core/prototype.core
//= require /prototype/index/prototype.index
//= require /prototype/routes

angular
    .module('prototype', [
        'prototype.core',
        'prototype.index',
        'ui.router',
        'ui.bootstrap',
        'ngStorage',
        'treasure-overlay-spinner',
        'angularCharts'
    ]);
