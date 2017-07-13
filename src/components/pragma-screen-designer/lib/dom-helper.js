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

export function createInputComposite() {
    const input = createElement("input", {
        "type": "text",
        "value.bind": "code"
    });

    const composite = createElement("input-composite", {
        "label.bind": "label",
        "descriptor.bind": "description"
    }, null, null, input);

    return composite;
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