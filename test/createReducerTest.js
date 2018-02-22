/* global describe, it, before */

import chai from 'chai';
import {createStore} from 'redux';
import {createReducer} from '../src';

chai.expect();

const expect = chai.expect;

let store;
let reducer;

describe('Test init', () => {
    before(() => {
        reducer = createReducer({
            a: 1
        }).toFunction();
        store = createStore(reducer);
    });
    describe('Test init', () => {
        it('should return a = 1', () => {
            expect(store.getState().a).to.be.equal(1);
        });
    });
});

describe('Test init', () => {
    before(() => {
        reducer = createReducer().toFunction();
        store = createStore(reducer);
    });
    describe('Test reducer with default initial state', () => {
        it('should be empty object', () => {
            expect(store.getState()).to.deep.equal({});
        });
    });
});

describe('Test state mutation', () => {
    before(() => {
        reducer = createReducer({
            a: 1,
            b: 2
        })
            .when('ACTION', (state, action) => {
                return {
                    ...state,
                    a: state.a + action.payload,
                }
            })
            .when(['ACTION3', 'ACTION4'], (state, action) => ({
                ...state,
                a: state.a - 1,
                b: state.b + action.payload,
            }))
            .toFunction();
        store = createStore(reducer);
    });
    describe('Test init', () => {
        it('should return a = 1', () => {
            store.dispatch({type: 'ACTION1', payload: 2});
            store.dispatch({type: 'ACTION', payload: 10});
            expect(store.getState()).to.deep.equal({a: 11, b: 2});

            store.dispatch({type: 'ACTION3', payload: 1});
            expect(store.getState()).to.deep.equal({a: 10, b: 3});

            store.dispatch({type: 'ACTION4', payload: 1});
            expect(store.getState()).to.deep.equal({a: 9, b: 4});
        });
        it('should do nothing', () => {
            const oldState = store.getState();
            store.dispatch({payload: 999, type: 'aaaa'});
            expect(store.getState()).to.be.equal(oldState);
        })
    });
});

