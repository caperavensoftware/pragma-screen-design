import {createElement} from './dom-helper';

export function createInputFor(label, field, descriptor, inputType, required, readonly) {
    if (readonly) {
        return createReadOnly(label, field, descriptor);
    }

    switch(inputType.toLowerCase()) {
        case 'text': return createInput(label, field, descriptor, required, "text");
        case 'date': return createInput(label, field, descriptor, required, "date");
        case 'number': return createInput(label, field, descriptor, required, "number");
    }
}

function createReadOnly(label, field, descriptor) {
    const input = createElement("div", {
        "data-binding-field": field
    });
    input.innerText = `${field} value`;

    const composite = createElement("input-composite", {
        "data-binding-field": field,
        "data-binding-descriptor": descriptor,
        "data-binding-required": false,
        "data-binding-readonly": true,
        "label": label,
        "descriptor": `${descriptor} value`
    }, null, null, input);

    return composite;
}

function createInput(label, field, descriptor, required, type) {
    const input = createElement("input", {
        "data-binding-field": field,
        "data-binding-required": required,
        "type": type,
        "value": `${field} value`
    });

    const composite = createElement("input-composite", {
        "data-binding-field": field,
        "data-binding-descriptor": descriptor,
        "data-binding-required": required,
        "data-binding-readonly": false,
        "data-binding-inptType": type,
        "label": label,
        "descriptor": `${descriptor} value`
    }, null, null, input);

    if (required == true) {
        composite.setAttribute("required", true);
    }

    return composite;
}