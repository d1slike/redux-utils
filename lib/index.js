'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
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