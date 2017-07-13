export function getDesignerKey(element) {
    console.log(element);

    if (element.classList.contains('designer-body')) {
        return "body";
    }

    if (element.classList.contains('tabsheet-bar')) {
        return "tabsheet";
    }

    if (element.classList.contains('tabsheet-bar-item')) {
        return "tab";
    }

    if (element.tagName.toLowerCase() == 'pragma-tabsheet') {
        const length = element.querySelectorAll(".tabsheet-bar-item").length;
        return length > 0 ? "tabbody" : 'tabsheet';
    }

    if (element.classList.contains('group')) {
        return 'group';
    }

    if (element.tagName.toLowerCase() == "h2") {
        return element.parentElement.classList.contains('group') ? 'group' : 'title'
    }

    return null;
}