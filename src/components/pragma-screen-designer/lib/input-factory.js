import {createElement} from './dom-helper';

export function createInputFor(label, field, descriptor, inputType, required, readonly) {
    if (readonly) {
        return createReadOnly(label, field, descriptor);
    }

    const it = inputType.toLowerCase();

    switch(it) {
        case 'text': return createInput(label, field, descriptor, required, it);
        case 'date': return createInput(label, field, descriptor, required, it);
        case 'number': return createInput(label, field, descriptor, required, it);
        case 'boolean': return createBoolean(label, field, descriptor, required, it);
        case 'memo': return createTextArea(label, field, descriptor, required, it);
    }
}

export function createTemplate() {
    const container = createElement("div", {"data-template": -1}, "Please select a template to use", ["card", "default-padding"]);
    return container;
}

function createReadOnly(label, field, descriptor) {
    const input = createElement("div");
    input.innerText = `${field} value`;

    return createInputComposite(label, field, descriptor, false, "text", input);
}

function createInput(label, field, descriptor, required, type) {
    const input = createElement("input", {
        "type": type,
        "value": `${field} value`
    });

    const composite = createInputComposite(label, field, descriptor, required, type, input);
    return composite;
}

function createTextArea(label, field, descriptor, required, type) {
    const input = createElement("textarea", {
        "value": `${field} value`
    });

    const composite = createInputComposite(label, field, descriptor, required, type, input);
    return composite;
}

function createInputComposite(label, field, descriptor, required, type, child) {
    const composite = createElement("input-composite", {
        "data-binding-label": label,
        "data-binding-field": field,
        "data-binding-descriptor": descriptor,
        "data-binding-required": required,
        "data-binding-readonly": false,
        "data-binding-inputType": type,
        "label": label,
        "descriptor": `${descriptor} value`
    }, null, null, child);

    if (required == true) {
        composite.setAttribute("required", true);
    }

    return composite;
}

function createBoolean(label, field, descriptor, required, type, child) {
    const inputElement = createElement("input", {"type": "checkbox"});
    const labelElement = createElement("label", null, label);

    return createElement("div", {
        "data-binding-label": label,
        "data-binding-field": field,
        "data-binding-descriptor": descriptor,
        "data-binding-required": required,
        "data-binding-readonly": false,
        "data-binding-inputType": type,
    }, null, ["checkbox-composite", "half-margin-bottom"], [inputElement, labelElement]);
}
