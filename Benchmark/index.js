const Redux = require("redux");
const Benchmark = require("benchmark");
const Utils = require("../lib/index");
const _ = require("lodash");
const benchmarks = require('beautify-benchmark');

const init = {
    a: 1
};

const ACTION_1 = 'ACTION_1';
const ACTION_2 = 'ACTION_2';
const ACTION_3 = 'ACTION_3';
const ACTION_4 = 'ACTION_4';
const ACTION_5 = 'ACTION_5';
const ACTION_6 = 'ACTION_6';
const ACTION_7 = 'ACTION_7';
const ACTION_8 = 'ACTION_8';
const ACTION_9 = 'ACTION_9';
const ACTION_10 = 'ACTION_10';


const generateDefaultReducer = (actionsCount, initialState) => {
    let script = '(state = ' + JSON.stringify(initialState) + ', action) => {' +
        'switch(action.type) {';
    const switches = _.range(1, actionsCount + 1).map(i => 'case "ACTION_' + i + '": return state;')
        .join('\n');
    return eval(script + switches + 'default: return state;}}');

};

const generateObjectReducer = (actionsCount, initialState) => {
    const reducer = Utils.createReducer(initialState);
    _.range(1, actionsCount + 1)
        .forEach(i => reducer.when('ACTION_' + i, state => state));
    return reducer.toFunction();
};

const defaultReducer10 = generateDefaultReducer(10, init);
const reducerAsObject10 = generateObjectReducer(10, init);
const defaultReducer100 = generateDefaultReducer(100, init);
const reducerAsObject100 = generateObjectReducer(100, init);

const d_10 = {};
const o_10 = {};
const d_100 = {};
const o_100 = {};

_.range(1, 10).forEach(i => {
    d_10['reducer' + i] = defaultReducer10;
    o_10['reducer' + i] = reducerAsObject10;
    d_100['reducer' + i] = defaultReducer100;
    o_100['reducer' + i] = reducerAsObject100;
});


const d_10_store = Redux.createStore(Redux.combineReducers(d_10));
const o_10_store = Redux.createStore(Redux.combineReducers(o_10));
const d_100_store = Redux.createStore(Redux.combineReducers(d_100));
const o_100_store = Redux.createStore(Redux.combineReducers(o_100));

const suite = new Benchmark.Suite;

const action1 = {type: ACTION_1, payload: 'payload'};
const action2 = {type: ACTION_5, payload: 'payload'};
const action3 = {type: ACTION_10, payload: 'payload'};
const action4 = {type: 'ACTION_25'};
const action5 = {type: 'ACTION_50'};
const action6 = {type: 'ACTION_75'};
const action7 = {type: 'ACTION_100'};

suite.add('reducer as function, 10', () => {
    d_10_store.dispatch(action1);
    d_10_store.dispatch(action2);
    d_10_store.dispatch(action3);
}).add('reducer as object, 10', () => {
    o_10_store.dispatch(action1);
    o_10_store.dispatch(action2);
    o_10_store.dispatch(action3);
}).add('reducer as function, 100', () => {
    d_100_store.dispatch(action1);
    //d_100_store.dispatch(action4);
    d_100_store.dispatch(action5);
    //d_100_store.dispatch(action6);
    d_100_store.dispatch(action7);
}).add('reducer as object, 100', () => {
    o_100_store.dispatch(action1);
    //o_100_store.dispatch(action4);
    o_100_store.dispatch(action5);
    //o_100_store.dispatch(action6);
    o_100_store.dispatch(action7);
}).on('cycle', function (event) {
    console.log(String(event.target));
    benchmarks.add(event.target)
}).on('complete', function (event) {
    //console.log('Fastest is ' + this.filter('fastest').map('name'));
    benchmarks.log();
}).run();