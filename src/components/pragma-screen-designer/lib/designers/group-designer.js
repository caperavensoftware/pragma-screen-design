import {DesignerBase} from "./../designer-base";
import template from './../../assistant/group.html!text';
import {getInnerText, setInnerText, getParentElemet, moveElementOnParent} from './../dom-helper';

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

        this.title = getInnerText(this.element, "h2");
    }

    dispose() {
        this.titleSubscription.dispose();
        this.titleSubscription = null;
        this.titleChangedHandler = null;

        super.dispose();
    }

    titleChanged(newValue) {
        setInnerText(this.element, 'h2', newValue);
    }

    delete() {
        this.element.parentElement.removeChild(this.element);
        this.unload();
    }

    moveUp() {
        this.moveGroup(-1);
    }

    moveDown() {
        this.moveGroup(1);
    }

    moveGroup(direction) {
        const children = Array.from(this.element.parentElement.children);
        const currentIndex = children.indexOf(this.element);
        const nextIndex = currentIndex + direction;

        moveElementOnParent(currentIndex, nextIndex, this.element.parentElement);
    }
}