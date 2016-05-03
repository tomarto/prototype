//= wrapped

/**
 * @ngdoc function
 * @name prototype.core.directive:datepickerPopup
 * @desc
 * # datepickerPopup
 * Directive that is used along with Angular-UI's directive with the same name.
 * Since the model used there is formatted as a Date object a new attribute "formattedDate" is added
 * in order to have a String formatted in the date defined in "datepickerPopup" attribute
 */
'use strict';

angular
    .module('prototype.core')
    .directive('datepickerPopup', datepickerPopup);

function datepickerPopup($parse, $filter) {
    return {
        restrict: 'EAC',
        require: '?formattedDate',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                if (newValue && attrs.datepickerPopup) {
                    $parse(attrs.formattedDate).assign(scope, $filter('date')(newValue, attrs.datepickerPopup));
                }
            });

            scope.$watch(attrs.formattedDate, function(newValue, oldValue) {
                if (newValue) {
                    $parse(attrs.ngModel).assign(scope, new Date(newValue));
                }
            });
        }
    }
}
