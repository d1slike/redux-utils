const composeReducers = (...reducers) => (state, action) =>
    reducers.reduce(
        (accumulator, currentReducer) => currentReducer(accumulator, action),
        state,
    );

export default composeReducers;