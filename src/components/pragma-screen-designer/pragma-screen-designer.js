import {customElement, inject} from 'aurelia-framework';

@customElement('pragma-screen-designer')
@inject(Element)
export class PragmaScreenDesigner {
    constructor(element) {
        this.element = element;

        // define handlers
        // this.actionHandler = this.action.bind(this);
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}