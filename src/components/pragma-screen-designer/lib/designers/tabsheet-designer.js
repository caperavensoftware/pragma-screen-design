import {DesignerBase} from "./../designer-base";
import {findParentElement} from './../findParentElement';
import template from './../../assistant/tabsheet.html!text';

export class TabsheetDesigner extends DesignerBase {
    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);
        this.tabsheetId = findParentElement(this.element, "pragma-tabsheet").id;
        this.loadTemplate(template, this);
    }

    dispose() {
        super.dispose();
    }

    addTab() {
        this.eventAggregator.publish('addTab', {
            id: this.tabsheetId
        })
    }
}