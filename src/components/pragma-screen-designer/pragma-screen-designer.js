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
    highlightElement;

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

        this.highlightHandler = this.highlight.bind(this);
        this.highlightEvent = this.eventAggregator.subscribe("design-highlight", this.highlightHandler);
        this.highlightElement = this.element.querySelector('.designer-highlight');

        this.parentBounds = this.element.getBoundingClientRect();

        this.keyUpHandler = this.keyUp.bind(this);
        document.addEventListener("keydown", this.keyUpHandler);
    }

    detached() {
        this.inputListener.removeEvent(this.element, inputEventType.click);
        this.selectElementHandler = null;

        this.desginerMap.clear();

        if (this.currentDesigner) {
            this.currentDesigner.dispose();
        }

        this.highlightEvent.dispose();
        this.highlightHandler = null;
        this.highlightElement = null;

        document.removeEventListener("keydown", this.keyUpHandler);
        this.keyUpHandler = null;
    }

    keyUp(event) {
        if (event.key.toLowerCase() == "escape") {
            this.currentDesigner.dispose();
            this.currentDesigner = null;
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
        this.highlight(event.target);
    }

    highlight(event) {
        if(!event) {
            return this.highlightElement.classList.add("hidden");
        }

        const bounds = event.getBoundingClientRect();
        this.highlightElement.classList.remove("hidden");
        this.highlightElement.style.setProperty('--left', bounds.left - this.parentBounds.left);
        this.highlightElement.style.setProperty('--top', bounds.top  - this.parentBounds.top);
        this.highlightElement.style.setProperty('--width', bounds.width);
        this.highlightElement.style.setProperty('--height', bounds.height);
    }
}