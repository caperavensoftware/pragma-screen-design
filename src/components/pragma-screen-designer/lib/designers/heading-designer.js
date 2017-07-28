import {DesignerBase} from "./../designer-base";
import template from './../../assistant/heading.html!text';
import {moveElementOnParent} from './../dom-helper';

export class HeadingDesigner extends DesignerBase {
    title;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.loadTemplate(template, this);
        this.initializeObserver();
    }

    initializeObserver() {
        this.titleChangedHandler = this.titleChanged.bind(this);

        this.titleSubscription = this.bindingEngine
            .propertyObserver(this, 'title')
            .subscribe(this.titleChangedHandler);

        this.title = this.element.innerHTML;
    }

    dispose() {
        this.titleSubscription.dispose();
        this.titleSubscription = null;
        this.titleChangedHandler = null;

        super.dispose();
    }

    titleChanged(newValue) {
        this.element.innerHTML = newValue;
    }

    delete() {
        this.element.parentElement.removeChild(this.element);
        this.unload();
    }

    moveItem(direction) {
        const heading = this.element;

        const children = Array.from(heading.parentElement.children);
        const currentIndex = children.indexOf(heading);
        const nextIndex = currentIndex + direction;

        moveElementOnParent(currentIndex, nextIndex, heading.parentElement);

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });
    }
}