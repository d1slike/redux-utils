'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
var composeReducers = function composeReducers() {
    for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
        reducers[_key] = arguments[_key];
    }

    return function (state, action) {
        return reducers.reduce(function (accumulator, currentReducer) {
            return currentReducer(accumulator, action);
        }, state);
    };
};

exports.default = composeReducers;