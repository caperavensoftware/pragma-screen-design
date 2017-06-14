import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {PragmaScreenDesigner} from './../../../src/components/pragma-screen-designer/pragma-screen-designer';

describe('PragmaScreenDesigner Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaScreenDesigner(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaScreenDesigner()).to.throw("Cannot call a class as a function");
    });
});