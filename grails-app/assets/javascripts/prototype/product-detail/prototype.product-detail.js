//= wrapped
//= require /ng-file-upload/ng-file-upload
//= require /ng-file-upload/ng-file-upload-shim
//= require_self
//= require product-detail.constant
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

angular
    .module('prototype.productDetail', [
        'prototype.core',
        'ngFileUpload'
    ]);
