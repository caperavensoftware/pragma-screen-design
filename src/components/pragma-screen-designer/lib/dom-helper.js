export function createTabsheetElement(element) {
    const count = element.querySelectorAll("pragma-tabsheet").length;

    const tab = createElement("div", {
        "id": "tab1",
        "data-tab": "New Tab"
    });

    const tabsheet = createElement("pragma-tabsheet", {
        "id": `tabsheet${count + 1}`
    }, null, null, tab);

    return tabsheet;
}

export function createGroupElement() {
    return createElement("group", {"title": "Group", "expanded": true});
}

export function createHeading() {
    return createElement("h3", null, "Heading");
}

export function getSelectedTabsheetBody(element) {
    let selectedHeaderItem = element.querySelector('.tabsheet-bar-item[aria-selected="true"]');
    if (!selectedHeaderItem) {
        selectedHeaderItem = element.querySelector('.tabsheet-bar').children[0];
    }

    const tabId = selectedHeaderItem.getAttribute("for");
    const target = element.querySelector(`#${tabId}`);
    return target;
}

export function setInnerText(element, query, text) {
    const eToChange = element.querySelector(query);

    if (eToChange) {
        eToChange.innerText = text;
    }
}

export function getInnerText(element, query) {
    const eToCheck = element.querySelector(query);

    if (eToCheck) {
        return eToCheck.innerText;
    }

    return "";
}

export function getParentElemet(element, query) {
    if (!element) {
        return null;
    }

    if (element.matches(query)) {
        return element;
    }

    return getParentElemet(element.parentElement, query);
}

export function moveElementOnParent(currentIndex, nextIndex, parent) {
    const children = Array.from(parent.children);

    if (nextIndex > children.length - 1 || nextIndex < 0) {
        return;
    }

    const currentElement = children[currentIndex];
    const nextElement = children[nextIndex];

    if (currentIndex > nextIndex) {
        parent.insertBefore(currentElement, nextElement);
    }
    else
    {
        parent.insertBefore(nextElement, currentElement)
    }

}

export function createElement(type, attributes, innerText, classes, children) {
    const element = document.createElement(type);

    if (attributes) {
        const keys = Object.keys(attributes);
        for (let key of keys) {
            element.setAttribute(key, attributes[key]);
        }
    }

    if (innerText) {
        element.innerText = innerText;
    }

    if (classes) {
        for (let c of classes) {
            element.classList.add(c);
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            for (let child of children) {
                element.appendChild(child);
            }
        }
        else
        {
            element.appendChild(children);
        }
    }

    return element;
}

export function updatePropertiesFromImport(element) {
    updateInputCompositeForDesign(element);
}

function updateInputCompositeForDesign(element) {
    const controls = element.querySelectorAll("input-composite");

    for(let control of controls) {
        const label = control.getAttribute("label");
        const descriptorField = (control.getAttribute("descriptor.bind") || "").replace("model.", "");
        const required = control.hasAttribute("required") || control.hasAttribute('required="true"');
        let readonly = false;
        let field = "";

        const inputSlot = control.querySelector("#inputSlot");
        const content = inputSlot.children[0];

        if (content.nodeName == "DIV") {
            readonly = true;
        }

        if (content.nodeName == "INPUT") {
            field = content.getAttribute("value.bind").replace("model.", "");
        }

        control.setAttribute("data-binding-inputType", getInputType(content));
        control.setAttribute("data-binding-label", label);
        control.setAttribute("data-binding-field", field);
        control.setAttribute("data-binding-descriptor", descriptorField);
        control.setAttribute("data-binding-required", required);
        control.setAttribute("data-binding-readonly", readonly);

        content.value = `${field} value`;
        control.au["input-composite"].viewModel.descriptor = `${descriptorField} value`;
    }
}

function getInputType(control) {
    if (control.nodeName == "INPUT") {
        const type = control.getAttribute("type");

        if (["text", "date", "number"].indexOf(type) > -1) {
            return type;
        }

        if (type == "checkbox") {
            return "boolean";
        }
    }

    if (control.nodeName == "TEXTAREA") {
        return "memo;"
    }

    if (control.nodeName == "SELECT") {
        return "dropdown";
    }
}

export function getPragmaFormParent(element) {
    if (element == null || element == undefined) {
        return null;
    }

    if (element.tagName.toLowerCase() == "pragma-form") {
        return element;
    }

    return getPragmaFormParent(element.parentElement);
}