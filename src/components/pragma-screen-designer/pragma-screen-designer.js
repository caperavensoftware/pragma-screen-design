import {customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BodyDesigner} from './lib/body-designer';
import {TemplatingEngine} from 'aurelia-templating';
import {InputListener} from 'pragma-views';

@customElement('pragma-screen-designer')
@inject(Element, EventAggregator, TemplatingEngine, InputListener)
export class PragmaScreenDesigner {
    currentDesigner;

    constructor(element, eventAggregator, templatingEngine, inputListener) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.templatingEngine = templatingEngine;
        this.inputListener = inputListener;
    }

    attached() {
        this.desginerMap = new Map([
            ["body", BodyDesigner]
        ]);

        this.showDesignerForElement(this.element.querySelector(".body"));
    }

    detached() {
        this.desginerMap.clear();

        if (this.currentDesigner) {
            this.currentDesigner.dispose();
        }
    }

    showDesignerForElement(element) {
        if (!element.dataset || !element.dataset.designer) {
            return;
        }

        const key = element.dataset.designer;

        if (this.desginerMap.has(key)) {
            if (this.currentDesigner) {
                this.currentDesigner.dispose();
            }

            const type = this.desginerMap.get(key);
            this.currentDesigner = new type(element, this.eventAggregator, this.templatingEngine);
        }
    }

}