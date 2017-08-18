import {DesignerBase} from "./../designer-base";
import template from './../../assistant/body.html!text';
import {createTabsheetElement, createGroupElement, createHeading} from './../dom-helper';
import {createInputFor, createTemplate} from './../input-factory';

export class BodyDesigner extends DesignerBase {
    hasTabsheet;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.loadTemplate(template, this);
        this.initialize();
    }

    dispose() {
        super.dispose();
    }

    initialize() {
        const tabsheet = this.element.querySelector('pragma-tabsheet');
        this.hasTabsheet = tabsheet != undefined;
    }

    addTabsheet() {
        const tabsheet = createTabsheetElement(this.element);

        this.addChildElement(tabsheet, this);
        this.hasTabsheet = true;
    }

    addGroup() {
        const group = createGroupElement();
        this.addChildElement(group, this);
    }

    addHeading() {
        const heading = createHeading();
        this.addChildElement(heading, this);
    }

    addField() {
        const input = createInputFor("label", "code", "descriptor", "text", false, false);
        this.addChildElement(input, null);
    }

    addTemplate() {
        const template = createTemplate();
        this.addChildElement(template, this);
    }
}