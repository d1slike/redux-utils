import createReducer from '../src/ReducerBuilder';

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
    }))
    .when([ACTION_TYPE_2, ACTION_TYPE_3], (state, action) => ({
        ...state,
        b: state.b + action.payload,
    }))
    .when(ACTION_TYPE_4, (state, action) => ({
        ...state,
        c: state.c + +action.payload,
    }))
    .toFunction();


