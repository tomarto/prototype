package com.prototype.product

import com.prototype.product.command.RuleCommand
import com.prototype.product.response.ControlResponse
import com.prototype.product.response.OptionResponse
import grails.transaction.Transactional

@Transactional
class RuleService {

    private static final def VALUES_BY_TYPE = [
        'dropdown': '',
        'checkbox': false,
        'checkboxGroup': new ArrayList<>(),
        'texbox': '',
        'texarea': '',
        'radioButton': ''
    ]

    def springSecurityService

    def list() {
        List<List<ControlResponse>> rulesResponse = new ArrayList<>()
        List<ControlResponse> controlsResponse
        Rule.findAllByUsername(springSecurityService.currentUser.username).each { rule ->
            controlsResponse = new ArrayList<>()
            ControlResponse controlResponse
            rule.controls.each {control ->
                controlResponse = new ControlResponse()
                controlResponse.type = control.type
                controlResponse.templateUrl = control.templateUrl
                controlResponse.name = control.name
                controlResponse.displayName = control.displayName
                controlResponse.value = VALUES_BY_TYPE.get(control.type)
                if('dropdown'.equals(controlResponse.type)) {
                    controlResponse.dropdownOptions = new ArrayList<>()
                    control?.dropdownOptions?.each {dropdownOption ->
                        controlResponse.dropdownOptions.add(new OptionResponse(value: dropdownOption.value))
                    }
                } else if('checkboxGroup'.equals(controlResponse.type)) {
                    controlResponse.checkBoxOptions = new ArrayList<>()
                    control?.checkBoxOptions?.each {checkboxOption ->
                        controlResponse.checkBoxOptions.add(new OptionResponse(name: checkboxOption.name, value: false))
                    }
                } else if('radioButton'.equals(controlResponse.type)) {
                    controlResponse.radioButtonOptions = new ArrayList<>()
                    control?.radioButtonOptions?.each {radioButtonOption ->
                        controlResponse.radioButtonOptions.add(new OptionResponse(name: radioButtonOption.name, value: false))
                    }
                }
                controlsResponse.add(controlResponse)
            }

            rulesResponse.add(controlsResponse)
        }

        return rulesResponse
    }

    def save(RuleCommand command) {
        Rule rule = new Rule(
                name: command.name,
                displayName: command.displayName,
                username: springSecurityService.currentUser.username)

        command?.controls?.each {commandControl ->
            Control control = new Control(
                    type: commandControl.type,
                    typeName: commandControl.typeName,
                    name: commandControl.name,
                    displayName: commandControl.displayName,
                    templateUrl: commandControl.templateUrl,
                    value: commandControl.value)

            commandControl?.dropdownOptions?.each {dropdownOption ->
                control.addToDropdownOptions(new Option(name: dropdownOption.name, value: dropdownOption.value))
            }
            commandControl?.checkBoxOptions?.each {checkboxOption ->
                control.addToCheckBoxOptions(new Option(name: checkboxOption.name, value: checkboxOption.value))
            }
            commandControl?.radioButtonOptions?.each {radioButtonOption ->
                control.addToRadioButtonOptions(new Option(name: radioButtonOption.name, value: radioButtonOption.value))
            }

            rule.addToControls(control)
        }

        rule.save()

        return [message: 'Rule has been successfully saved']
    }
}
