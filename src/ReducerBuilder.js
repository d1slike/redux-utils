export const INIT_ACTION = '@@redux/INIT';

class Reducer {

    initialState = {};
    map = {};

    constructor(initialState) {
        this.initialState = initialState;
    }

    when = (actionType, mapper) => {
        if (Array.isArray(actionType)) {
            actionType.forEach(type => this.map[type] = mapper);
        } else {
            this.map[actionType] = mapper;
        }
        return this;
    };

    toFunction = () => (state = this.initialState, action) => {
        if (action.type === INIT_ACTION && state) {
            return {...state, ...this.initialState};
        }
        const mapper = this.map[action.type];
        if (mapper) {
            return mapper(state, action);
        } else {
            return state;
        }
    };
}

const createReducer = (initialState = {}) => new Reducer(initialState);

export default createReducer;