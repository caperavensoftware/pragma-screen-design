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
}