export class DesignerBase {
    constructor(element, eventAggregator, templateEngine, bindingEngine) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.templateEngine = templateEngine;
        this.bindingEngine = bindingEngine;
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
        this.eventAggregator.publish("clear-assistant")
    }

    addChildElement(element, context) {
        this.element.appendChild(element);

        this.templateEngine.enhance({
            element: element,
            bindingContext: {
                viewModel: context
            }
        });
    }

}