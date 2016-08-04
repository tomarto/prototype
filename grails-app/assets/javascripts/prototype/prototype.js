//= wrapped
//= require /angular/angular
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /jquery/jquery
//= require_self
//= require /prototype/core/prototype.core
//= require /prototype/index/prototype.index
//= require /prototype/comprobantes/prototype.comprobantes
//= require /prototype/routes

angular
    .module('prototype', [
        'prototype.core',
        'prototype.index',
        'prototype.comprobantes',
        'ui.router'
    ]);
