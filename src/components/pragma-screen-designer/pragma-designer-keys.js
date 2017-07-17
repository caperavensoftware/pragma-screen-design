export function getDesignerKey(element) {
    console.log(element);

    if (element.matches('[ref="detailsElement"]')) {
        return "body";
    }

    if (element.classList.contains('tabsheet-bar')) {
        return "tabsheet";
    }

    if (element.classList.contains('tabsheet-bar-item')) {
        return "tab";
    }

    if (element.classList.contains('checkbox-composite')) {
        return 'input-composite';
    }

    if (element.tagName.toLowerCase() == 'pragma-tabsheet') {
        const length = element.querySelectorAll(".tabsheet-bar-item").length;
        return length > 0 ? "tabbody" : 'tabsheet';
    }

    if (element.classList.contains('group')) {
        return 'group';
    }

    if (element.tagName.toLowerCase() == "input-composite") {
        return 'input-composite';
    }

    return null;
}