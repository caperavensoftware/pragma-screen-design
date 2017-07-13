import {DesignerBase} from "./../designer-base";
import {createGroupElement, getSelectedTabsheetBody} from "./../dom-helper";
import template from './../../assistant/tab-body.html!text';

export class TabBodyDesigner extends DesignerBase {
    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);
        this.loadTemplate(template, this);
    }

    dispose() {
        super.dispose();
    }

    addGroup() {
        const target = getSelectedTabsheetBody(this.element);
        const group = createGroupElement();
        target.appendChild(group);
    }


}