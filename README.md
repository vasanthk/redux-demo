# Redux Demo

> Predictable state container for JavaScript apps

Simple Demo of [Redux](https://github.com/rackt/redux).
Code from [here](https://github.com/jackielii/simplest-redux-example)

To run this Demo

* `npm install`

* `npm start`

* Open [http://localhost:5000/](http://localhost:5000/) in the browser.

# Summary notes of the [docs](http://rackt.github.io/redux/)

## The Gist

> The whole state of your app is stored in an object tree inside a single store. The only way to change the state tree is to emit an action, an object describing what happened. To specify how the state tree is transformed by the actions, you write pure reducers.

## Main Principles

* The state of your whole application is stored in an object tree inside a single store.

* State is read-only. The only way to mutate the state is to emit an action, an object describing what happened.

* Mutations are written as pure functions. To specify how the state tree is transformed by actions, you write pure reducers.

## Basics

### Actions

Actions are payloads of information that send data from your application to your store. They are only source of information for a store. You send them to the store using *store.dispatch()*

### Action Creators

Action creators are exactly that - functions that create actions. In traditional Flux implementations, action creators trigger a dispatch when invoked. By contrast, in Redux action creators are pure functions with zero side-effects. 

### Reducers

Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of a reducer. The reducer is a pure function that takes the previous state and an action, and returns the next state.

It's called a reducer because it's the type of function you would pass to *Array.prototype.reduce(reducer, ?initialValue)*. It's very important that the reducer stays pure. 

Things you **should never** do inside a reducer:

* Mutate it's arguments.

* Perform side effects like API calls and routing transitions.

**Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

When the app is larger, we can split the reducers into separate files and keep them completely independent and managing different data domains. 

Redux provides an utility called combineReducers() that generate a function that calls your reducers with the slices of state selected according to their keys, and combining their results into a single object again.
 
### Store

Actions represent the facts about 'what happened' and reducers update the state according to those actions.

The Store is the object that brings them together. 

The store has the following responsibilities:

* Holds application state;
* Allows access to state via getState();
* Allows state to be updated via dispatch(action);
* Registers listeners via subscribe(listener)

It’s important to note that you’ll only have a single store in a Redux application. When you want to split your data handling logic, you’ll use reducer composition instead of many stores.

It’s easy to create a store if you have a reducer. We used combineReducers() to combine several reducers into one. We will now import it, and pass it to createStore()

```
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
```

### Data Flow

Redux architecture revolves around a strictly unidirectional data flow.

The data lifecycle in a Redux app follows these 4 steps:
* You call store.dispatch(action)
* The Redux store calls the reducer function you gave it.
* The root reducer might combine the output of multiple reducers into a single tree.
* The Redux store saves the complete state tree returned by the root reducer.

### Usage with React

React bindings are not included in Redux by default. It's available as 'react-redux' on npm and needs to be installed separately.

It is advisable only  top-level components of your app (such as route handlers) are aware of Redux. Components below them should be "dumb" and receive all data via props.

**Connecting to Redux**

* First we need to import 'Provider' from 'react-redux' and wrap the root component around <Provider> before rendering. This makes our store instance available to the components below.
* Then we wrap the components we want to connect to Redux with the connect() function from react-redux. Try to only do this for top-level component or route handlers.

Any component wrapped with the connect call with receive a 'dispatch' function as a prop, and any state it needs from the global state.

The only argument to connect() is a function we call a 'selector'. This function takes the global Redux store's state, and returns the props you need for the component. In the simplest case, you can just return the state given to you, but you may wish to transform it first.

### Middleware

If you've used server-side libraries like Express and Koa, you are familiar with the concept of middleware. In these frameworks, middleware is some code you can put between the framework receiving a request, and framework generating a response.
 
Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the store. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.
 
### Async Actions
 
Even if you call an asynchronous API, you need to dispatch actions to change the stored data, and they will be processed by reducers synchronously. 

Usually, for any API request you'll want to dispatch at least three different kinds of actions:
 
* An action informing the reducers that the request began.
* An action informing the reducers that the request finished succesffully.
* An action informing the reducers that the request failed.
 
### Async Flow
 
Without middleware, Redux store only supports synchronous data flow. This is what you get by default with createStore().

You may enhance createStore() with applyMiddleware(). It is not required, but it lets you express asynchronous actions in a convenient way. 

Asynchronous middleware like redux-thunk or redux-promise wraps the store’s dispatch() method and allows you to dispatch something other than actions, for example, functions or Promises. Any middleware you use can then interpret anything you dispatch, and in turn, can pass actions to the next middleware in chain. For example, a Promise middleware can intercept Promises and dispatch a pair of begin/end actions asynchronously in response to each Promise.

When the last middleware in the chain dispatches an action, it has to be a plain object. This is when the synchronous Redux data flow takes place.

### Migrating to Redux from Flux

* Create a function called `CreateFluxStore(reducer)` that creates a Flux store compatible with your existing app from a reducer function. Internally it might look similar to `createStore` implementation from Redux. Its dispatcher handler should just call the reducer for any action. store the next state, and emit change.
* This allows you to gradually rewrite every Flux Store in your app as a reducer, but still export `createFluxStore(reducer)` so the rest of your app is not aware that this is happening and sees the Flux stores.
* As you rewrite your Stores, you will find that you need to avoid certain `Flux anti-patterns such as fetching API inside the Store, or triggering actions inside the Stores.` Your Flux code will be easier to follow once you port it to be based on reducers!
* When you have ported all of your Flux Stores to be implemented on top of reducers, you can replace the Flux library with a single Redux store, and combine those redicers you already have into one using `combineReducers(reducers)`.
* Now all that's left to do is port the UI to use `react-redux` or equivalent.
* Finally, you might want to begin using some Redux idioms like middleware to further simplify your asynchronous code.

### Reference

[Concept of Mutations](http://skilldrick.co.uk/2010/12/clearing-up-the-confusion-around-javascript-references/)

