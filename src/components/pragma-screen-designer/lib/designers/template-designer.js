import {DesignerBase} from "./../designer-base";
import template from './../../assistant/template.html!text';
import {getPragmaFormParent} from './../../lib/dom-helper';
import {TemplateParser} from 'pragma-views';
import {updatePropertiesFromImport} from './../dom-helper';

export class TemplateDesigner extends DesignerBase {
    schema;
    selectedTemplateId;

    constructor(element, eventAggregator, templateEngine, bindingEngine, observerLocator) {
        super(element, eventAggregator, templateEngine, bindingEngine, observerLocator);
        this.templateParser = new TemplateParser("model");
        this.loadTemplate(template, this);
        this.initialize();

        this.selectedTemplateIdObserver = this.observerLocator.getObserver(this, "selectedTemplateId");
        this.selectedTemplateIdChangedHandler = this.selectedTemplateIdChanged.bind(this);
        this.selectedTemplateIdObserver.subscribe(this.selectedTemplateIdChangedHandler);

        this.selectedTemplateId = this.element.dataset.template;
    }

    dispose() {
        this.selectedTemplateIdObserver.unsubscribe(this.selectedTemplateIdChangedHandler);
        this.selectedTemplateIdObserver = null;
        this.selectedTemplateIdChangedHandler = null;

        super.dispose();
    }

    initialize() {
        this.form = getPragmaFormParent(this.element).au["pragma-form"].viewModel;
        this.schema = this.form.schema;
    }

    selectedTemplateIdChanged(newValue) {
        if (newValue == 1) {
            return;
        }

        this.element.dataset.template = newValue;
        const template = this.schema.templates.find(item => item.id == newValue);
        if (template) {
            this.element.innerHTML = `Template: ${template.name}`;

            // const html = this.templateParser.parseElements(template.elements);
            // this.element.innerHTML = html;
            // this.enhance(this.element, null);
            //
            // const controls = updatePropertiesFromImport(this.element);
            //
            // for(let control of controls) {
            //     this.enhance(control, null);
            // }
            //
            // this.element.classList.remove("card");
            // this.element.classList.remove("default-padding");
        }

        this.eventAggregator.publish("design-highlight", this.element);
    }

    edit() {
        if (this.selectedTemplateId != 1) {
            this.eventAggregator.publish("show-template", this.selectedTemplateId);
        }
    }
}