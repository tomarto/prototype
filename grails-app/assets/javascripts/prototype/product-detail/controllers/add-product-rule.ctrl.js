//= wrapped

angular
    .module('prototype.productDetail')
    .controller('AddProductRuleCtrl', AddProductRuleCtrl);

function AddProductRuleCtrl(productDetailConstants, ruleService, toasterService) {
    var vm = this;

    vm.rule = {};

    vm.addNewControl = addNewControl;
    vm.generateControls = generateControls;
    vm.removeControlFromRule = removeControlFromRule;
    vm.reset = reset;
    vm.addValueToDropdown = addValueToDropdown;
    vm.removeValueFromDropdown = removeValueFromDropdown;
    vm.addValueToCheckbox = addValueToCheckbox;
    vm.removeValueFromCheckbox = removeValueFromCheckbox;
    vm.addValueToRadio = addValueToRadio;
    vm.removeValueFromRadio = removeValueFromRadio;
    vm.save = save;

    init();

    function init() {
        addNewControl();
    }

    function addNewControl() {
        if(!vm.rule.controls) {
            vm.rule.controls = [];
        }
        vm.rule.controls.push({});
    }

    function generateControls() {
        return angular.copy(productDetailConstants.controlsAvailable);
    }

    function removeControlFromRule(index) {
        vm.rule.controls.splice(index, 1);
    }

    function reset(control) {
        if(control) {
            control.name = '';
            control.displayName = '';
            control.dropdownOptions = [];
            control.checkBoxOptions = [];
            control.radioButtonOptions = [];
        }
        switch(control.type) {
            case 'dropdown':
                addValueToDropdown(control);
                break;
            case 'checkboxGroup':
                addValueToCheckbox(control);
                break;
            case 'radioButton':
                addValueToRadio(control)
                break;
        }
    }

    function addValueToDropdown(control) {
        if(!control.dropdownOptions) {
            control.dropdownOptions = [];
        }
        control.dropdownOptions.push({value: ''});
    }

    function removeValueFromDropdown(index, control) {
        control.dropdownOptions.splice(index, 1);
    }

    function addValueToCheckbox(control) {
        if(!control.checkBoxOptions) {
            control.checkBoxOptions = [];
        }
        control.checkBoxOptions.push({name: '', value: 'false'});
    }

    function removeValueFromCheckbox(index, control) {
        control.checkBoxOptions.splice(index, 1);
    }

    function addValueToRadio(control) {
        if(!control.radioButtonOptions) {
            control.radioButtonOptions = [];
        }
        control.radioButtonOptions.push({name: '', value: 'false'});
    }

    function removeValueFromRadio(index, control) {
        control.radioButtonOptions.splice(index, 1);
    }

    function save() {
        ruleService.save(vm.rule)
            .then(function(success) {
                toasterService.success(success.message);
                list();
            })
            .catch(function(error) {
                toasterService.error(error.message);
            });
    }

    function list() {
        ruleService.list()
            .then(function(success) {
                toasterService.success('Success');
                console.log(success);
            })
            .catch(function(error) {
                toasterService.error(error.message);
                console.log(error);
            });
    }
}
