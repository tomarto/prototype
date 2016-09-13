package com.prototype.product.response

class ControlResponse {

    String type
    String templateUrl
    String name
    String displayName
    def value

    List<OptionResponse> dropdownOptions
    List<OptionResponse> checkBoxOptions
    List<OptionResponse> radioButtonOptions
}
