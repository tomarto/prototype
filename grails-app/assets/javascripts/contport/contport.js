//= wrapped
//= require /angular/angular
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /jquery/jquery
//= require_self
//= require /contport/core/contport.core
//= require /contport/index/contport.index
//= require /contport/facturas/contport.facturas
//= require /contport/routes

angular
    .module('contport', [
        'contport.core',
        'contport.index',
        'contport.facturas',
        'ui.router'
    ]);
