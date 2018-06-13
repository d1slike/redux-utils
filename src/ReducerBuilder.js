class Reducer {
    initialState = {};
    map = {};

    constructor(initialState) {
        this.initialState = initialState;
    }

    when = (actionType, mapper) => {
        if (Array.isArray(actionType)) {
            actionType.forEach(type => (this.map[type] = mapper));
        } else {
            this.map[actionType] = mapper;
        }
        return this;
    };

    toFunction = () => (state = this.initialState, action) => {
        const mapper = this.map[action.type];
        if (mapper) {
            return mapper(state, action);
        }
        return state;
    };
}

const createReducer = (initialState = {}) => new Reducer(initialState);

export default createReducer;
