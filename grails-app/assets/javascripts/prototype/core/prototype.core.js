//= wrapped
//= require /bootstrap/bootstrap
//= require /bootstrap/ui-bootstrap-tpls
//= require /angular-treasure-overlay-spinner/treasure-overlay-spinner.min
//= require /ngstorage/ngStorage
//= require /angularjs-toaster/toaster
//= require_self
//= require_tree controllers
//= require_tree directives
//= require_tree services

angular
    .module('prototype.core', [
        'ui.bootstrap',
        'ngStorage',
        'treasure-overlay-spinner',
        'toaster'
    ]);
