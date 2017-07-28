import {DesignerBase} from "./../designer-base";
import template from './../../assistant/input-composite.html!text';
import {createInputFor} from "./../input-factory";

export class InputCompositeDesigner extends DesignerBase {
    label;
    field;
    descriptorField;
    required;
    readonly;
    typeValue;
    inputOptions;

    options;

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
        this.options = {};

        const inputType = this.element.getAttribute("data-binding-inptType");

        this.typeValue = this.inputOptions.find(item => item.title == inputType);
        this.label = this.element.getAttribute("data-binding-label");
        this.field = this.element.getAttribute("data-binding-field");
        this.descriptorField = this.element.getAttribute("data-binding-descriptor");
        this.required = (this.element.getAttribute("data-binding-required") || "false").toLowerCase() == "true";
        this.readonly = (this.element.getAttribute("data-binding-readonly") || "false").toLowerCase() == "true";

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
        this.element.setAttribute("data-binding-label", newValue);

        if (this.element.nodeName.toLowerCase() == "input-composite") {
            this.element.setAttribute("label", newValue);
            this.element.querySelector('[ref="labelControl"]').innerText = newValue;
        }
        else {
            this.element.querySelector('label').innerText = newValue;
        }
    }

    fieldChanged(newValue) {
        this.element.setAttribute("data-binding-field", newValue);

        if (this.element.tagName.toLowerCase() == "input-composite") {
            const inputSlot = this.element.querySelector("#inputSlot");
            const input = inputSlot.children[0];
            const valueTypes = ["input", "textarea"];

            if (valueTypes.indexOf(input.nodeName.toLowerCase()) > -1) {
                if (this.typeValue.title == "text") {
                    input.setAttribute("value.bind", newValue);
                    input.value = `${newValue} value`;
                }
            }
            else {
                input.innerText = `${newValue} value`;
            }
        }
    }

    descriptorFieldChanged(newValue) {
        this.element.setAttribute("data-binding-descriptor", newValue);

        if (this.element.tagName.toLowerCase() == "input-composite") {
            this.element.au["input-composite"].viewModel.descriptor = `${newValue} value`;
        }
    }

    requiredChanged(newValue) {
        if (newValue == true) {
            this.required = newValue;
            this.readonly = !newValue;
        }

        this.element.setAttribute("required", newValue);
        this.element.setAttribute("data-binding-required", newValue);

        if (this.element.tagName.toLowerCase() == "input-composite") {
            this.element.au["input-composite"].viewModel.required = newValue;
        }
    }

    readonlyChanged(newValue) {
        if (newValue == true) {
            this.readonly = newValue;
            this.required = !newValue;
        }

        const newElement = createInputFor(this.label, this.field, this.descriptorField, this.typeValue.title, this.required, this.readonly);
        this.element.parentElement.replaceChild(newElement, this.element);
        this.element = newElement;
        this.enhance(this.element, null);

        this.element.setAttribute("data-binding-readonly", newValue);

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });
    }

    typeValueChanged(newValue) {
        const newElement = createInputFor(this.label, this.field, this.descriptorField, this.typeValue.title, this.required, this.readonly);
        this.element.parentElement.replaceChild(newElement, this.element);
        this.element = newElement;
        this.enhance(this.element, null);

        this.element.setAttribute("data-binding-readonly", newValue);

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });

        this.options.allowDescriptor = (newValue || {title: ""}).title.toLowerCase() != "boolean";
    }
}