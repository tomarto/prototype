//= wrapped
//= require_self
//= require_tree directives
//= require_tree services

var constant = {
   api: {
       user: {
           login: 'api/login',
           logout: 'api/logout',
           get: 'api/user',
           register: 'api/user/register'
       },
       actions: 'api/actions'
   },
   login: {
       error: 'An error ocurred while logging in. Please try again later.'
   }
}

angular.module('prototype.core', [])
    .constant('constant', constant);
