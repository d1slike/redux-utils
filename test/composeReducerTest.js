/* global describe, it, before */

import chai from 'chai';
import {createReducer} from '../lib/index';
import {createStore} from 'redux';

chai.expect();

const expect = chai.expect;

let store;
let reducer;

describe('Test init', () => {
    before(() => {
        reducer = createReducer({
            a: 1
        }).toFunction();
        store = createStore(reducer, {});
    });
    describe('Test init', () => {
        it('should return a = 1', () => {
            expect(store.getState().a).to.be.equal(1);
        });
    });
});


