import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {isMobile} from 'pragma-views';

@inject(EventAggregator)
export class Welcome {
    eventAggregator;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // if (isMobile) {
        //     this.eventAggregator.publish("show-assistant", true);
        // }
    }

    import() {
        this.clear();

        const pragmaform = document.querySelector("pragma-form");
        pragmaform.au["pragma-form"].viewModel.import();
    }

    export() {
        const pragmaform = document.querySelector("pragma-form");
        pragmaform.au["pragma-form"].viewModel.export();
    }

    clear() {
        const pragmaform = document.querySelector("pragma-form");
        pragmaform.au["pragma-form"].viewModel.clear();
        pragmaform.querySelector(".form-container").innerHTML = "";
    }
}