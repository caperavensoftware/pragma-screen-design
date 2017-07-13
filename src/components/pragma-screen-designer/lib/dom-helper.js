export function createTabsheetElement(element) {
    const count = element.querySelectorAll("pragma-tabsheet").length;

    const tab = document.createElement("div");
    tab.id = "tab1";
    tab.setAttribute("data-tab", "New Tab");

    const tabsheet = document.createElement("pragma-tabsheet");
    tabsheet.id = `tabsheet${count + 1}`;
    tabsheet.appendChild(tab);

    return tabsheet;
}

export function createGroupElement() {
    const groupHeader = document.createElement("h2");
    groupHeader.innerText = "Group";

    const group = document.createElement("div");
    group.classList.add("group");
    group.appendChild(groupHeader);

    return group;
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

export function moveElement(currentIndex, nextIndex, parent) {
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