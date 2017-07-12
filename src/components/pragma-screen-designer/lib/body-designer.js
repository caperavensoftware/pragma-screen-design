import {DesignerBase} from "./designer-base";
import template from './../assistant/body.html!text';

export class BodyDesigner extends DesignerBase {
    hasTabsheet;

    constructor(element, eventAggregator, templatingEngine) {
        super(element, eventAggregator, templatingEngine);

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
        const count = this.element.querySelectorAll("pragma-tabsheet").length;

        const tab = document.createElement("div");
        tab.id = "tab1";
        tab.setAttribute("data-tab", "New Tab");

        const tabsheet = document.createElement("pragma-tabsheet");
        tabsheet.id = `tabsheet${count + 1}`;
        tabsheet.appendChild(tab);

        this.addChildElement(tabsheet, this);
        this.hasTabsheet = true;
    }
}