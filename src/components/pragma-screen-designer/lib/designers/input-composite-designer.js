import {DesignerBase} from "./../designer-base";
import template from './../../assistant/input-composite.html!text';

export class InputCompositeDesigner extends DesignerBase {
    label;
    field;
    descriptorField;
    required;
    readonly;
    typeValue;
    inputOptions;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.inputOptions = [
            {
                id: 0,
                title: "text"
            },
            {
                id: 1,
                title: "date"
            },
            {
                id: 2,
                title: "number"
            },
            {
                id: 3,
                title: "boolean"
            },
            {
                id: 4,
                title: "memo"
            },
            {
                id: 5,
                title: "dropdown"
            }
        ];

        this.loadTemplate(template, this);
        this.initialize();
    }

    dispose() {
        this.labelChangedSubscription.dispose();
        this.labelChangedSubscription = null;
        this.labelChangedHandler = null;

        this.fieldChangedSubscription.dispose();
        this.fieldChangedSubscription = null;
        this.fieldChangedHandler = null;

        this.descriptorFieldChangedSubscription.dispose();
        this.descriptorFieldChangedSubscription = null;
        this.descriptorFieldChangedHandler = null;

        this.requiredChangedSubscription.dispose();
        this.requiredChangedSubscription = null;
        this.requiredChangedHandler = null;

        this.readonlyChangedSubscription.dispose();
        this.readonlyChangedSubscription = null;
        this.readonlyChangedHandler = null;

        this.typeValueChangedSubscription.dispose();
        this.typeValueChangedSubscription = null;
        this.typeValueChangedHandler = null;

        super.dispose();
    }

    initialize() {
        this.viewModel = this.element.au["input-composite"].viewModel;

        this.label = this.viewModel.label;
        this.field = "Code";
        this.descriptorField = "Description";
        this.required = false;
        this.readonly = false;

        this.labelChangedHandler = this.labelChanged.bind(this);
        this.labelChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'label')
            .subscribe(this.labelChangedHandler);

        this.fieldChangedHandler = this.fieldChanged.bind(this);
        this.fieldChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'field')
            .subscribe(this.fieldChangedHandler);

        this.descriptorFieldChangedHandler = this.descriptorFieldChanged.bind(this);
        this.descriptorFieldChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'descriptorField')
            .subscribe(this.descriptorFieldChangedHandler);

        this.requiredChangedHandler = this.requiredChanged.bind(this);
        this.requiredChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'required')
            .subscribe(this.requiredChangedHandler);

        this.readonlyChangedHandler = this.readonlyChanged.bind(this);
        this.readonlyChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'readonly')
            .subscribe(this.readonlyChangedHandler);

        this.typeValueChangedHandler = this.typeValueChanged.bind(this);
        this.typeValueChangedSubscription = this.bindingEngine
            .propertyObserver(this, 'typeValue')
            .subscribe(this.typeValueChangedHandler);
    }

    labelChanged(newValue) {
        this.viewModel.label = newValue;
    }

    fieldChanged(newValue) {
        const inputSlot = this.element.querySelector("#inputSlot");
        const input = inputSlot.children[0];
        input.setAttribute("value.bind", newValue);
        input.value = `${newValue} value`
    }

    descriptorFieldChanged(newValue) {
        const descriptorElement = this.element.querySelector('.descriptor-label');
        descriptorElement.innerText = `${newValue} value`;

        if ((newValue || "").length > 0) {
            this.element.setAttribute("descriptor.bind", newValue);
        }
        else {
            this.element.removeAttribute("descriptor.bind");
        }
    }

    requiredChanged(newValue) {

    }

    readonlyChanged(newValue) {

    }

    typeValueChanged(newValue) {
    }
}