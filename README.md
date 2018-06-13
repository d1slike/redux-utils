# redux-reducer-utils

[![npm version](https://badge.fury.io/js/redux-reducer-utils.svg)](https://badge.fury.io/js/redux-reducer-utils)
[![Build Status](https://travis-ci.org/d1slike/redux-utils.svg?branch=master)](https://travis-ci.org/d1slike/redux-utils)
[![Coverage Status](https://coveralls.io/repos/d1slike/redux-utils/badge.svg?branch=master)](https://coveralls.io/r/d1slike/redux-utils?branch=master)

Lightweight, no dependency library for redux reducers

* [Install](#Install)
* [Reducer creator](#Reducer-creation)
* [Reducer composer](#Reducer-composition)

## Install
```
npm install --save redux-reducer-utils
```
Or
```
yarn add redux-reducer-utils
```
## Usage

### Reducer creation
``createReducer`` provides more declarative way to describe redux reducer

Just call ``createReducer`` with initial state as argument and then
invoke chain ``when`` to register actions handlers, finally call ``toFunction`` to build reducer

```javascript
import {createReducer} from 'redux-reducer-utils';

const initialState = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

const reducer = createReducer(initialState)
    .when(ACTION_TYPE_1, (state, action) => ({
        ...state,
        a: state.a + action.payload,
    }))
    .when(ACTION_TYPE_4, (state, action) => ({
        ...state,
        c: state.c + action.payload,
    }))
    .toFunction();
```

Here comparison classic reducer description with ``createReducer`` way
```javascript
const ACTION_TYPE_1 = 'ACTION_TYPE_1';
const ACTION_TYPE_2 = 'ACTION_TYPE_2';
const ACTION_TYPE_3 = 'ACTION_TYPE_3';
const ACTION_TYPE_4 = 'ACTION_TYPE_4';

const initialState = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

const classicReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_1:
            return {
                ...state,
                a: state.a + action.payload,
            };
        case ACTION_TYPE_2:
        case ACTION_TYPE_3:
            return {
                ...state,
                b: state.b + action.payload,
            };
        case ACTION_TYPE_4:
            return {
                ...state,
                c: state.c + action.payload,
            };
        default:
            return state;
    }
};

const withCreateReducer = createReducer(initialState)
    .when(ACTION_TYPE_1, (state, action) => ({
        ...state,
        a: state.a + action.payload,
    })) //if you need the same handler for two or more actions types, just put array to first argument
    .when([ACTION_TYPE_2, ACTION_TYPE_3], (state, action) => ({
        ...state,
        b: state.b + action.payload,
    }))
    .when(ACTION_TYPE_4, (state, action) => ({
        ...state,
        c: state.c + action.payload,
    }))
    .toFunction();
```

### Reducer composition

``composeReducers`` This function can help with reducers horizontal scaling

Every _i_ reducer has access to _i-1_ state
```javascript
import {composeReducers} from 'redux-reducer-utils';

const SOME_ACTION = 'SOME_ACTION';

const initialStateFirst = {
    a: 1,
    b: 2,
};

const initialStateSecond = {
    c: 3,
    d: 3,
};

const firstReducer = (state = initialStateFirst, action) => {
    //...some actions handlers
};

const secondReducer = (state = initialStateSecond, action) => {
    //...here you have access to state from firstReducer
    switch (action.type) {
        case SOME_ACTION:
            return {
                ...state,
                a: state.a + action.payload,
            };
        default:
            return state;
    }
};

export const composedReducer = composeReducers(firstReducer, secondReducer, /*...any number of reducers*/);
```
