/* global describe, it, before */

import chai from 'chai';
import {composeReducers, createReducer} from '../src';
import {createStore} from 'redux';

chai.expect();

const expect = chai.expect;

let store;
let reducer;
let reducer2;

describe('Test init', () => {
    before(() => {
        reducer = createReducer({
            a: 1
        }).toFunction();
        reducer2 = (state = {b: 2}, action) => {
            return state;
        };
        const composedReducer = composeReducers(reducer, reducer2);
        store = createStore(composedReducer, {});
    });
    describe('Test init', () => {
        it('should deep equal {a: 1, b: 2}', () => {
            expect(store.getState()).to.deep.equal({a: 1, b: 2});
        });
    });
});


