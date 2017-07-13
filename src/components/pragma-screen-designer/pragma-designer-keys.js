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

    return null;
}