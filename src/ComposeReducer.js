import invariant from 'invariant';

const composeReducers = (...reducers) => {
    invariant(reducers.length, 'At least one reducer is required');
    reducers.forEach((r, index) =>
        invariant(typeof r === 'function', '%s reducer is not a function', index));

    if (reducers.length === 1) {
        return (state, action) => reducers[0](state, action);
    } else if (reducers.length === 2) {
        return (state, action) => {
            if (!state) {
                const first = reducers[0](undefined, action);
                return {...first, ...reducers[1](undefined, action)};
            }
            const first = reducers[0](state, action);
            return reducers[1](first, action);
        };
    }
    return (state, action) => {
        if (!state) {
            return reducers.reduce(
                (accumulator, currentReducer) => ({
                    ...accumulator,
                    ...currentReducer(undefined, action),
                }),
                state,
            );
        }
        return reducers.reduce(
            (accumulator, currentReducer) => currentReducer(accumulator, action),
            state,
        );
    };
};

export default composeReducers;
