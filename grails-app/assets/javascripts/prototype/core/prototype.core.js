//= wrapped
//= require /bootstrap/bootstrap
//= require /bootstrap/ui-bootstrap-tpls
//= require /angular-treasure-overlay-spinner/treasure-overlay-spinner.min
//= require /ngstorage/ngStorage
//= require /angularjs-toaster/toaster
//= require /rangy/rangy-core
//= require /rangy/rangy-selectionsaverestore
//= require /textAngular/textAngular-sanitize
//= require /textAngular/textAngularSetup
//= require /textAngular/textAngular
//= require_self
//= require_tree controllers
//= require_tree directives
//= require_tree services

angular
    .module('prototype.core', [
        'ui.bootstrap',
        'ngStorage',
        'ngSanitize',
        'treasure-overlay-spinner',
        'toaster',
        'textAngular'
    ]);
