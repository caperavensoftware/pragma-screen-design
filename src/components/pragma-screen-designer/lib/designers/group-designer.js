import {DesignerBase} from "./../designer-base";
import template from './../../assistant/group.html!text';
import {setInnerText, getParentElemet, moveElementOnParent, createHeading} from './../dom-helper';
import {createInputFor} from './../input-factory';

export class GroupDesginer extends DesignerBase {
    title;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.element = getParentElemet(this.element, ".group");

        this.loadTemplate(template, this);
        this.initializeObserver();
    }

    initializeObserver() {
        this.titleChangedHandler = this.titleChanged.bind(this);

        this.titleSubscription = this.bindingEngine
            .propertyObserver(this, 'title')
            .subscribe(this.titleChangedHandler);

        this.title = this.element.parentElement.getAttribute("title");
    }

    dispose() {
        this.titleSubscription.dispose();
        this.titleSubscription = null;
        this.titleChangedHandler = null;

        super.dispose();
    }

    titleChanged(newValue) {
        this.element.parentElement.setAttribute("title", newValue);
        setInnerText(this.element, 'h3', newValue);
    }

    delete() {
        this.element.parentElement.removeChild(this.element);
        this.unload();
    }

    moveItem(direction) {
        const group = this.element.parentElement;

        const children = Array.from(group.parentElement.children);
        const currentIndex = children.indexOf(group);
        const nextIndex = currentIndex + direction;

        moveElementOnParent(currentIndex, nextIndex, group.parentElement);

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });
    }

    addField() {
        const input = createInputFor("label", "code", "descriptor", "text", false, false);
        this.addChildElement(input, null);
    }

    addHeading() {
        const heading = createHeading();
        this.addChildElement(heading, this);
    }
}