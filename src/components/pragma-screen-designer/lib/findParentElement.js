export function findParentElement(element, query) {
    if (!element) {
        return null;
    }

    if (element.matches(query)) {
        return element;
    }

    return findParentElement(element.parentElement, query);
}