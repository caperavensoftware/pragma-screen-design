import {DesignerBase} from "./../designer-base";
import template from './../../assistant/body.html!text';
import {createTabsheetElement, createGroupElement} from './../dom-helper';

export class BodyDesigner extends DesignerBase {
    hasTabsheet;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.loadTemplate(template, this);
        this.initialize();
    }

    dispose() {
        this.unload();
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
}