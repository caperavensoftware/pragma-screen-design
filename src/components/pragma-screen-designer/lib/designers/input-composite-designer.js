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
    }
}