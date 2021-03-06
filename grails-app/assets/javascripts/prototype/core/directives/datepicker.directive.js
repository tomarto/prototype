//= wrapped

angular
    .module('prototype.core')
    .directive('uibDatepickerPopup', uibDatepickerPopup);

/**
 * @ngdoc function
 * @name prototype.core.directive:datepickerPopup
 * @desc
 * # datepickerPopup
 * Directive that is used along with Angular-UI's directive with the same name.
 * Since the model used there is formatted as a Date object a new attribute "formattedDate" is added
 * in order to have a String formatted in the date defined in "datepickerPopup" attribute
 */

function uibDatepickerPopup($parse, $filter) {
    return {
        restrict: 'EAC',
        require: '?formattedDate',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                if(newValue !== undefined && attrs.uibDatepickerPopup) {
                    $parse(attrs.formattedDate).assign(scope, newValue ? $filter('date')(newValue, attrs.uibDatepickerPopup) : null);
                }
            });

            scope.$watch(attrs.formattedDate, function(newValue, oldValue) {
                if(newValue !== undefined) {
                    $parse(attrs.ngModel).assign(scope, newValue ? new Date(newValue) : null);
                }
            });
        }
    }
}
