# Redux Demo
Playing around with [redux](https://github.com/rackt/redux).

> Predictable state container for JavaScript apps

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

Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

### Reference

[Concept of Mutations](http://skilldrick.co.uk/2010/12/clearing-up-the-confusion-around-javascript-references/)

