import {moveElementOnParent} from './dom-helper';

export class DesignerBase {
    constructor(element, eventAggregator, templateEngine, bindingEngine, observerLocator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.templateEngine = templateEngine;
        this.bindingEngine = bindingEngine;
        this.observerLocator = observerLocator;
    }

    dispose() {
        this.unload();
        this.element = null;
        this.eventAggregator = null;
        this.templateEngine = null;
    }

    loadTemplate(template, viewModel) {
        const html = template.replace("<template>", "").replace("</template>", "");
        this.eventAggregator.publish("assistant", {
            view: html,
            viewModel: viewModel
        })
    };

    unload() {
        this.eventAggregator.publish("clear-assistant");
    }

    addChildElement(element, context, target) {
        const parent = target || this.element;

        parent.appendChild(element);
        this.enhance(element, context);
    }

    enhance(element, context) {
        this.templateEngine.enhance({
            element: element,
            bindingContext: context
        });
    }

    delete() {
        this.element.parentElement.removeChild(this.element);
        this.unload();
    }

    moveUp() {
        this.moveItem(-1);
    }

    moveDown() {
        this.moveItem(1);
    }

    moveItem(direction) {
        const element = this.element;

        const children = Array.from(element.parentElement.children);
        const currentIndex = children.indexOf(element);
        const nextIndex = currentIndex + direction;

        moveElementOnParent(currentIndex, nextIndex, element.parentElement);

        requestAnimationFrame(_ => {
            this.eventAggregator.publish("design-highlight", this.element);
        });
    }
}