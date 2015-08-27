/**
 * Simplest example
 *
 * Source: https://github.com/jackielii/simplest-redux-example/
 */

import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

// React Component
class Counter extends Component {
  render() {
    const {value, onIncreaseClick} = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    );
  }
}

// Action
const increaseAction = {type: 'increase'};

// Reducer
function counter(state = {count: 0}, action = {type: ''}) {
  let count = state.count;
  switch (action.type) {
    case 'increase':
      return {count: count + 1};
    default:
      return state;
  }
}

// Store
let store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  };
}

// Connected Component
// Any component wrapped with connect() call will receive a dispatch function as a prop, and any state it needs from the global state.
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <App/>}
  </Provider>,
  document.getElementById('root')
);

