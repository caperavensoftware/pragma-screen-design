import {DesignerBase} from "./../designer-base";
import template from './../../assistant/tab.html!text';
import {getParentElemet} from './../dom-helper';

export class TabDesigner extends DesignerBase {
    title;

    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        super(element, eventAggregator, templateEngine, bindingEngine);

        this.initializeObserver();
        this.title = element.innerText;
        this.loadTemplate(template, this);
    }

    dispose() {
        this.titleSubscription.dispose();
        this.titleSubscription = null;
        this.titleChangedHandler = null;
        super.dispose();
    }

    initializeObserver() {
        this.titleChangedHandler = this.titleChanged.bind(this);

        this.titleSubscription = this.bindingEngine
            .propertyObserver(this, 'title')
            .subscribe(this.titleChangedHandler)
    }

    titleChanged(newValue, oldValue) {
        this.element.innerText = newValue;
    }

    delete() {
        const parentId = getParentElemet(this.element, "pragma-tabsheet").id;
        const id = this.element.getAttribute("for");

        this.eventAggregator.publish('removeTab', {
            id: parentId,
            tabId: id
        });

        this.unload();
    }

    moveItem(direction) {
        const children = Array.from(this.element.parentElement.children);
        const currentIndex = children.indexOf(this.element);
        const nextIndex = currentIndex + direction;

        const canMove = (direction == -1 && nextIndex > -1) || (direction == 1 && nextIndex < children.length);

        if (canMove) {
            this.eventAggregator.publish('moveTab', {
                fromIndex: currentIndex,
                toIndex: nextIndex,
            })
        }

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });
    }
}