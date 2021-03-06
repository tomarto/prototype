//= wrapped
//= require /angular/angular
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /angular/angular-messages
//= require /jquery/jquery
//= require_self
//= require /prototype/core/prototype.core
//= require /prototype/layout/prototype.layout
//= require /prototype/login/prototype.login
//= require /prototype/register/prototype.register
//= require /prototype/index/prototype.index
//= require /prototype/actions/prototype.actions
//= require /prototype/routes

angular
    .module('prototype', [
        'prototype.core',
        'prototype.layout',
        'prototype.login',
        'prototype.register',
        'prototype.index',
        'prototype.actions',
        'ngMessages',
        'ui.router'
    ]);
