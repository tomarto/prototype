//= wrapped

angular
    .module('prototype.productDetail')
    .controller('ProductDetailCtrl', ProductDetailCtrl);

function ProductDetailCtrl($filter) {
    var vm = this;

    vm.multipleCheckboxChecked = multipleCheckboxChecked;
    vm.addToCart = addToCart;

    init();

    function init() {
        vm.product = {
            name: 'Corsair GS600 600 Watt PSU',
            shortDescription: 'The Corsair Gaming Series GS600 is the ideal price/performance choice for mid-spec gaming PC',
            price: 1234.00,
            inStock: true,
            longDescription: 'The Corsair Gaming Series GS600 power supply is the ideal price-performance solution for building or upgrading a Gaming PC. A single +12V rail provides up to 48A of reliable, continuous power for multi-core gaming PCs with multiple graphics cards. The ultra-quiet, dual ball-bearing fan automatically adjusts its speed according to temperature, so it will never intrude on your music and games. Blue LEDs bathe the transparent fan blades in a cool glow. Not feeling blue? You can turn off the lighting with the press of a button.<h3>Corsair Gaming Series GS600 Features:</h3><li>It supports the latest ATX12V v2.3 standard and is backward compatible with ATX12V 2.2 and ATX12V 2.01 systems</li><li>An ultra-quiet 140mm double ball-bearing fan delivers great airflow at an very low noise level by varying fan speed in response to temperature</li><li>80Plus certified to deliver 80% efficiency or higher at normal load conditions (20% to 100% load)</li><li>0.99 Active Power Factor Correction provides clean and reliable power</li><li>Universal AC input from 90~264V — no more hassle of flipping that tiny red switch to select the voltage input!</li><li>Extra long fully-sleeved cables support full tower chassis</li><li>A three year warranty and lifetime access to Corsair’s legendary technical support and customer service</li><li>Over Current/Voltage/Power Protection, Under Voltage Protection and Short Circuit Protection provide complete component safety</li><li>Dimensions: 150mm(W) x 86mm(H) x 160mm(L)</li><li>MTBF: 100,000 hours</li><li>Safety Approvals: UL, CUL, CE, CB, FCC Class B, TÜV, CCC, C-tick</li>'
        };
        vm.controls = [
            // TODO: Remove
            {
                type: 'dropdown',
                templateUrl: '/prototype/product-detail/dropdownOption.html',
                // Set by user
                name: 'size',
                displayName: 'Size',
                dropdownOptions: [{value: 'XS'}, {value: 'S'}, {value: 'M'}, {value: 'L'}, {value: 'XL'}],
                // Set by user
                value: ''
            },
            {
                type: 'checkbox',
                templateUrl: '/prototype/product-detail/singleCheckbox.html',
                // Set by user
                name: 'giftWrapping',
                displayName: 'Add Gift Wrapping?',
                // Set by user
                value: false
            },
            {
                type: 'checkboxGroup',
                templateUrl: '/prototype/product-detail/multipleCheckbox.html',
                // Set by user
                name: 'extras',
                displayName: 'Extras',
                checkBoxOptions: [
                    {name: 'Case', value: false},
                    {name: 'Short', value: false}
                ],
                // Set by user
                value: []
            },
            {
                type: 'texbox',
                templateUrl: '/prototype/product-detail/textbox.html',
                // Set by user
                name: 'name',
                displayName: 'Name',
                // Set by user
                value: ''
            },
            {
                type: 'texarea',
                templateUrl: '/prototype/product-detail/texarea.html',
                // Set by user
                name: 'details',
                displayName: 'Details',
                // Set by user
                value: ''
            },
            {
                type: 'radioButton',
                templateUrl: '/prototype/product-detail/radioButton.html',
                // Set by user
                name: 'gender',
                displayName: 'Gender',
                radioButtonOptions: [
                    {name: 'Male'},
                    {name: 'Female'}
                ],
                // Set by user
                value: ''
            },
            {
                type: 'fileUpload',
                templateUrl: '/prototype/product-detail/fileUpload.html',
                // Set by user
                name: 'logo',
                displayName: 'Logo'
                // Set by user
            }
            // TODO: END Remove
        ];
    }

    function multipleCheckboxChecked(option, checkboxOption) {
        var selection = $filter('filter')(option.value, {name: checkboxOption.name}, true)[0];
        if(selection) {
            option.value.splice(option.value.indexOf(selection), 1);
        } else {
            option.value.push({name: checkboxOption.name, value: checkboxOption.value});
        }
    }

    function addToCart() {
        var data = {};
        angular.forEach(vm.controls, function(control) {
            data[control.name] = control.value;
        });
        console.log(data);
    }



    // TODO: Move to another view
    vm.isAddingControl = false;
    vm.controlToAdd = {};
    vm.controlsAvailable = [
        {
            type: 'dropdown',
            typeName: 'Dropdown',
            templateUrl: '/prototype/product-detail/dropdownOption.html',
            value: ''
        },
        {
            type: 'checkbox',
            typeName: 'Checkbox',
            templateUrl: '/prototype/product-detail/singleCheckbox.html',
            value: false
        },
        {
            type: 'checkboxGroup',
            typeName: 'Checkbox Group',
            templateUrl: '/prototype/product-detail/multipleCheckbox.html',
            value: []
        },
        {
            type: 'texbox',
            typeName: 'Text Box',
            templateUrl: '/prototype/product-detail/textbox.html',
            value: ''
        },
        {
            type: 'texarea',
            typeName: 'Text Area',
            templateUrl: '/prototype/product-detail/texarea.html',
            value: ''
        },
        {
            type: 'radioButton',
            typeName: 'Radio Button',
            templateUrl: '/prototype/product-detail/radioButton.html',
            value: ''
        },
        {
            type: 'fileUpload',
            typeName: 'File Upload',
            templateUrl: '/prototype/product-detail/fileUpload.html'
        }
    ];

    vm.reset = reset;
    vm.saveControl = saveControl;
    vm.addValueToDropdown = addValueToDropdown;
    vm.addValueToCheckbox = addValueToCheckbox;
    vm.addValueToRadio = addValueToRadio;

    function reset() {
        vm.controlToAdd.name = '';
        vm.controlToAdd.displayName = '';
        vm.controlToAdd.dropdownOptions = [];
        vm.controlToAdd.checkBoxOptions = [];
        vm.controlToAdd.radioButtonOptions = [];
    }

    function saveControl() {
        vm.controls.push(angular.copy(vm.controlToAdd));
        reset();
        vm.controlToAdd = {};
        vm.isAddingControl = false;
    }

    function addValueToDropdown() {
        if(!vm.controlToAdd.dropdownOptions) {
            vm.controlToAdd.dropdownOptions = [];
        }
        vm.controlToAdd.dropdownOptions.push({value: ''});
    }

    function addValueToCheckbox() {
        if(!vm.controlToAdd.checkBoxOptions) {
            vm.controlToAdd.checkBoxOptions = [];
        }
        vm.controlToAdd.checkBoxOptions.push({name: '', value: false});
    }

    function addValueToRadio() {
        if(!vm.controlToAdd.radioButtonOptions) {
            vm.controlToAdd.radioButtonOptions = [];
        }
        vm.controlToAdd.radioButtonOptions.push({name: ''});
    }
    // TODO: END Move to another view
}
