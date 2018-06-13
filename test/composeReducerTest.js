/* global describe, it, before */

import chai from 'chai';
import {composeReducers, createReducer} from '../src';
import {combineReducers, createStore} from 'redux';

chai.expect();

const expect = chai.expect;

let store;
let reducer;
let reducer2;
let reducer3;
let reducer4;

describe('Test 2 composed reducer init', () => {
    before(() => {
        reducer = createReducer({
            a: 1,
        }).toFunction();
        reducer2 = (state = {b: 2}, action) => state;
        const composedReducer = composeReducers(reducer, reducer2);
        store = createStore(composedReducer);
    });
    describe('Test init', () => {
        it('should deep equal {a: 1, b: 2}', () => {
            expect(store.getState()).to.deep.equal({a: 1, b: 2});
        });
    });
});

describe('Test 1 composed reducer init', () => {
    before(() => {
        reducer2 = (state = {b: 2}, action) => state;
        const composedReducer = composeReducers(reducer2);
        store = createStore(composedReducer);
    });
    describe('Test init', () => {
        it('should deep equal {b: 2}', () => {
            expect(store.getState()).to.deep.equal({b: 2});
        });
    });
});

describe('Test 4 composed reducer init', () => {
    before(() => {
        reducer = createReducer({
            a: 1,
        }).toFunction();
        reducer2 = (state = {b: 2}, action) => state;
        reducer3 = (state = {c: 3}, action) => state;
        reducer4 = (state = {d: 4}, action) => state;
        const composedReducer = composeReducers(reducer, reducer2, reducer4, reducer3);
        store = createStore(composedReducer);
    });
    describe('Test init', () => {
        it('should deep equal {a: 1, b: 2, c: 3, d: 4}', () => {
            expect(store.getState()).to.deep.equal({
                a: 1, b: 2, c: 3, d: 4,
            });
        });
    });
});

describe('Complex test with combine reducers', () => {
    before(() => {
        reducer = createReducer({
            a: 1,
        })
            .when('ACTION_1', (state, action) => ({
                ...state,
                a: state.a + action.payload,
            }))
            .toFunction();
        reducer2 = (state = {b: 1}, action) => {
            switch (action.type) {
                case 'ACTION_1':
                    return {
                        ...state,
                        b: state.b + action.payload,
                    };
                case 'ACTION_2':
                    return {
                        ...state,
                        a: state.a - action.payload,
                    };
                default:
                    return state;
            }
        };
        reducer3 = createReducer({c: 1})
            .when('ACTION_3', (state, action) => ({
                ...state,
                c: state.c + action.payload,
            }))
            .toFunction();
        reducer4 = createReducer({d: 1})
            .when('ACTION_4', state => ({
                ...state,
                b: state.b + 10,
                d: 0,
            }))
            .toFunction();
        const part1 = composeReducers(reducer, reducer2);
        const part2 = composeReducers(reducer, reducer2, reducer3, reducer4);
        store = createStore(
            combineReducers({
                part1,
                part2,
            }),
            {},
        );
    });
    describe('Test init', () => {
        it('full initialized combined state', () => {
            expect(store.getState()).to.deep.equal({
                part1: {a: 1, b: 1},
                part2: {
                    a: 1, b: 1, c: 1, d: 1,
                },
            });
        });
    });
    describe('Test state mutation', () => {
        it('should inc', () => {
            store.dispatch({type: 'ACTION_1', payload: 1});
            store.dispatch({type: 'ACTION_2', payload: 1});
            expect(store.getState()).to.deep.equal({
                part1: {a: 1, b: 2},
                part2: {
                    a: 1, b: 2, c: 1, d: 1,
                },
            });
        });
        it('should set 0 ', () => {
            store.dispatch({type: 'ACTION_4', payload: 1});
            store.dispatch({type: 'ACTION_3', payload: 1});
            expect(store.getState()).to.deep.equal({
                part1: {a: 1, b: 2},
                part2: {
                    a: 1, b: 12, c: 2, d: 0,
                },
            });
        });
    });
});
