'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var composeReducers = function composeReducers() {
    for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
        reducers[_key] = arguments[_key];
    }

    (0, _invariant2.default)(reducers.length, 'At least one reducer is required');
    reducers.forEach(function (r, index) {
        return (0, _invariant2.default)(typeof r === 'function', '%s reducer is not a function', index);
    });

    if (reducers.length === 1) {
        return function (state, action) {
            return reducers[0](state, action);
        };
    } else if (reducers.length === 2) {
        return function (state, action) {
            if (!state) {
                var first = reducers[0](undefined, action);
                return _extends({}, first, reducers[1](undefined, action));
            } else {
                var _first = reducers[0](state, action);
                return reducers[1](_first, action);
            }
        };
    } else {
        return function (state, action) {
            if (!state) {
                return reducers.reduce(function (accumulator, currentReducer) {
                    return _extends({}, accumulator, currentReducer(state, action));
                }, state);
            } else {
                return reducers.reduce(function (accumulator, currentReducer) {
                    return currentReducer(accumulator, action);
                }, state);
            }
        };
    }
};

exports.default = composeReducers;