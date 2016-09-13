package com.prototype.product

import grails.transaction.Transactional
import org.springframework.beans.BeanUtils

@Transactional
class RuleService {

    def springSecurityService

    def list() {
        return Option.list()
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

        return rule
    }
}
