import composeReducers from '../src/ComposeReducer';

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