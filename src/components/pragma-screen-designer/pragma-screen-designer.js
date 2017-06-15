import {customElement, inject, bindable} from 'aurelia-framework';
import {DynamicViewLoader, populateTemplate, TemplateParser, isMobile, InputListener, inputEventType } from 'pragma-views';

@customElement('pragma-screen-designer')
@inject(Element, DynamicViewLoader, InputListener)
export class PragmaScreenDesigner {
    dynamicViewLoader;
    detailsElement;

    @bindable schema;

    /**
     * Constructor
     * @param element
     */
    constructor(element, dynamicViewLoader, inputListener) {
        this.element = element;
        this.dynamicViewLoader = dynamicViewLoader;
        this.inputListener = inputListener;
        this.templateParser = new TemplateParser("model");
    }

    /**
     * Aurelia life cycle event
     */
    attached() {
        this.clickHandler = isMobile() ? this.clickMobile.bind(this) : this.click.bind(this);
        this.inputListener.addEvent(this.detailsElement, inputEventType.click, this.clickHandler);
    }

    /**
     * Aurelia life cycle event
     */
    detached() {
        this.inputListener.removeEvent(this.detailsElement, inputEventType.click);
        this.clickHandler = null;
    }

    /**
     * Aurelia event when schema changed
     */
    schemaChanged() {
        this.templateParser.parse(this.schema).then(html => this.changeDetailTemplate(html));
    }

    /**
     * Display this html in the details page
     */
    changeDetailTemplate(templateHtml) {
        this.dynamicViewLoader.load(templateHtml, this.detailsElement, this);
    }

    /**
     * Process click event
     * @param event
     */
    click(event) {
        const selectedElement = document.elementFromPoint(event.clientX, event.clientY);
        this.processSelected(selectedElement);
    }

    clickMobile(event) {
        const selectedElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        this.processSelected(selectedElement);
    }

    processSelected(element) {
        console.log(element);
    }
}