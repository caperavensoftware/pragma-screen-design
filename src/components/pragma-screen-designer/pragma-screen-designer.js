import {customElement, inject} from 'aurelia-framework';
import {TemplatingEngine} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';

import {BodyDesigner} from './lib/designers/body-designer';
import {TabsheetDesigner} from './lib/designers/tabsheet-designer';
import {TabDesigner} from './lib/designers/tab-designer';
import {TabBodyDesigner} from './lib/designers/tab-body-designer';
import {GroupDesginer} from './lib/designers/group-designer';
import {InputCompositeDesigner} from './lib/designers/input-composite-designer';

import {InputListener, inputEventType} from 'pragma-views';
import {getDesignerKey} from './pragma-designer-keys';
import {BindingEngine} from 'aurelia-binding';

@customElement('pragma-screen-designer')
@inject(Element, EventAggregator, TemplatingEngine, InputListener, BindingEngine)
export class PragmaScreenDesigner {
    currentDesigner;
    model;

    constructor(element, eventAggregator, templatingEngine, inputListener, bindingEngine) {
        this.element = element;
        this.element.id = "designer";
        this.eventAggregator = eventAggregator;
        this.templatingEngine = templatingEngine;
        this.inputListener = inputListener;
        this.bindingEngine = bindingEngine;

        this.model = {};
    }

    attached() {
        this.desginerMap = new Map([
            ["body", BodyDesigner],
            ["tabsheet", TabsheetDesigner],
            ["tab", TabDesigner],
            ["tabbody", TabBodyDesigner],
            ["group", GroupDesginer],
            ["input-composite", InputCompositeDesigner]
        ]);

        this.showDesignerForElement(this.element.querySelector('[ref="detailsElement"]'));

        this.selectElementHandler = this.selectElement.bind(this);
        this.inputListener.addEvent(
            this.element,
            inputEventType.click,
            this.selectElementHandler,
            true);
    }

    detached() {
        this.inputListener.removeEvent(this.element, inputEventType.click);
        this.selectElementHandler = null;

        this.desginerMap.clear();

        if (this.currentDesigner) {
            this.currentDesigner.dispose();
        }
    }

    showDesignerForElement(element) {
        if (!element) {
            return null;
        }

        const key = getDesignerKey(element);

        if (!key) {
            return;
        }

        console.log(key);

        if (this.desginerMap.has(key)) {
            if (this.currentDesigner) {
                this.currentDesigner.dispose();
            }

            const type = this.desginerMap.get(key);
            this.currentDesigner = new type(element, this.eventAggregator, this.templatingEngine, this.bindingEngine);
        }
    }

    selectElement(event) {
        this.showDesignerForElement(event.target);
    }

}