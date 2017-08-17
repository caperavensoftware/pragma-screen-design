import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {isMobile, Schema, TemplateConstructor} from 'pragma-views';

@inject(EventAggregator, TemplateConstructor)
export class Welcome {
    eventAggregator;
    @bindable selectedTemplateId;

    constructor(eventAggregator, templateConstructor) {
        this.eventAggregator = eventAggregator;
        this.templateConstructor = templateConstructor;
    }

    attached() {
        const formElement = document.querySelector("pragma-form");
        this.form = formElement.au["pragma-form"].viewModel;
        this.formContainer = formElement.querySelector(".form-container");

        this.schema = new Schema();
        this.schema.body.elements = [];
        const template = this.schema.templates.add();
        template.name = "Body Template";

        this.form.schema = this.schema;
        this.schema.body.elements.push({
            "element": "template",
            "template": 1
        });

        this.templateConstructor.jsonObj = this.schema;
    }

    import() {
        this.clear();
        this.form.import();
    }

    export() {
        this.form.export();
    }

    clear() {
        this.formContainer.innerHTML = "";
        this.form.clear();
    }

    addTemplate() {
        const template = this.schema.templates.add();
        this.selectedTemplateId = template.id;
        this.form.loadTemplates();
    }

    selectedTemplateIdChanged(newValue, oldValue) {
        if (oldValue != null) {
            const template = this.schema.templates.find(item => item.id == oldValue);
            this.templateConstructor.domToTemplate(this.formContainer, template);
            this.form.loadTemplates();
        }

        this.form.showSchemaTemplate(newValue);
    }
}