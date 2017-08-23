import {customElement, inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';
import {TemplatingEngine} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';

import {BodyDesigner} from './lib/designers/body-designer';
import {TabsheetDesigner} from './lib/designers/tabsheet-designer';
import {TabDesigner} from './lib/designers/tab-designer';
import {TabBodyDesigner} from './lib/designers/tab-body-designer';
import {GroupDesginer} from './lib/designers/group-designer';
import {InputCompositeDesigner} from './lib/designers/input-composite-designer';
import {HeadingDesigner} from './lib/designers/heading-designer';
import {TemplateDesigner} from './lib/designers/template-designer';

import {InputListener, inputEventType} from 'pragma-views';
import {getDesignerKey} from './pragma-designer-keys';
import {BindingEngine} from 'aurelia-binding';
import {updatePropertiesFromImport} from './lib/dom-helper';

@customElement('pragma-screen-designer')
@inject(Element, EventAggregator, TemplatingEngine, InputListener, BindingEngine, ObserverLocator)
export class PragmaScreenDesigner {
    currentDesigner;
    model;
    highlightElement;
    form;
    showDataSources;

    constructor(element, eventAggregator, templatingEngine, inputListener, bindingEngine, observerLocator) {
        this.element = element;
        this.element.id = "designer";
        this.eventAggregator = eventAggregator;
        this.templatingEngine = templatingEngine;
        this.inputListener = inputListener;
        this.bindingEngine = bindingEngine;
        this.observerLocator = observerLocator;
        this.showDataSources = false;

        this.model = {};
    }

    attached() {
        this.updateAfterImportHandler = this.updateAfterImport.bind(this);
        this.formUpdateEvent = this.eventAggregator.subscribe("form-updated", this.updateAfterImportHandler);

        this.desginerMap = new Map([
            ["body", BodyDesigner],
            ["tabsheet", TabsheetDesigner],
            ["tab", TabDesigner],
            ["tabbody", TabBodyDesigner],
            ["group", GroupDesginer],
            ["input-composite", InputCompositeDesigner],
            ["heading", HeadingDesigner],
            ["template", TemplateDesigner]
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

        this.form = this.element.querySelector("pragma-form");
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

        this.formUpdateEvent.dispose();
        this.formUpdateEvent = null;
        this.updateAfterImportHandler = null;

        this.form = null;
    }

    keyUp(event) {
        if (event.key.toLowerCase() == "escape") {
            this.clearSelection();
        }

        /**
         * Add the following:
         * Up = select item above
         * Down = select item below
         * ctrl + up = move selected item up
         * ctrl + down = move selected item down
         * delete = delete selected item
         */
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
            this.currentDesigner = new type(element, this.eventAggregator, this.templatingEngine, this.bindingEngine, this.observerLocator);
        }
    }

    selectElement(event) {
        this.showDesignerForElement(event.target);
        this.highlight(event.target);
    }

    highlight(event) {
        if(!event) {
            return this.clearSelection();
        }

        const bounds = event.getBoundingClientRect();
        this.highlightElement.classList.remove("hidden");
        this.highlightElement.style.setProperty('--left', bounds.left - this.parentBounds.left);
        this.highlightElement.style.setProperty('--top', bounds.top  - this.parentBounds.top);
        this.highlightElement.style.setProperty('--width', bounds.width);
        this.highlightElement.style.setProperty('--height', bounds.height);
    }

    clearSelection() {
        if (this.currentDesigner != null && this.currentDesigner != undefined) {
            this.currentDesigner.dispose();
            this.currentDesigner = null;
        }

        return this.highlightElement.classList.add("hidden");
    }

    updateAfterImport() {
        updatePropertiesFromImport(this.element);
    }
}