"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

            var mapper = _this.map[action.type];
            if (mapper) {
                return mapper(state, action);
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