"use strict";

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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.composeReducers = exports.createReducer = undefined;

var _ComposeReducer = require('./ComposeReducer');

var _ComposeReducer2 = _interopRequireDefault(_ComposeReducer);

var _ReducerBuilder = require('./ReducerBuilder');

var _ReducerBuilder2 = _interopRequireDefault(_ReducerBuilder);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

exports.createReducer = _ReducerBuilder2.default;
exports.composeReducers = _ComposeReducer2.default;
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createStore = require('redux/lib/createStore');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reducer = function Reducer(initialState) {
    var _this = this;

    _classCallCheck(this, Reducer);

    this.initialState = {};
    this.map = {};

    this.when = function (actionType, mapper) {
        if (Array.isArray(actionType)) {
            actionType.forEach(function (type) {
                return _this.map[type] = mapper;
            });
        } else {
            _this.map[actionType] = mapper;
        }
        return _this;
    };

    this.toFunction = function () {
        return function () {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initialState;
            var action = arguments[1];

            if (action.type) {
                if (action.type === _createStore.ActionTypes.INIT && state) {
                    return _extends({}, state, _this.initialState);
                }
                var mapper = _this.map[action.type];
                if (mapper) {
                    return mapper(state, action);
                } else {
                    return state;
                }
            }
            return state;
        };
    };

    this.initialState = initialState;
};

var createReducer = function createReducer() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Reducer(initialState);
};

exports.default = createReducer;
