//= wrapped
//= require_self

var constant = {
    controlsAvailable: [
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
    ]
};

angular
    .module('prototype.productDetail')
    .constant('productDetailConstants', constant);
