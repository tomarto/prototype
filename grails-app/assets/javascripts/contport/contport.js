//= wrapped
//= require /angular/angular
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /jquery/jquery
//= require_self
//= require /contport/core/contport.core
//= require /contport/layout/contport.layout
//= require /contport/login/contport.login
//= require /contport/register/contport.register
//= require /contport/index/contport.index
//= require /contport/actions/contport.actions
//= require /contport/facturas/contport.facturas
//= require /contport/routes

angular
    .module('contport', [
        'contport.core',
        'contport.layout',
        'contport.login',
        'contport.register',
        'contport.index',
        'contport.actions',
        'contport.facturas',
        'ui.router'
    ]);
