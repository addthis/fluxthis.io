# Immutable Reducer Stores

## Basics

This article assumes you already have a base understanding of Immutable Stores, which fluxthis provides.


## Reducing State

In the context of flux; A reducer is simply a function which takes two arguments, the previous state, and the next action which has been dispatched. This function then returns the new store state -

```js
actionListener: function (state, nextAction) {
  return ...; // Return the new state
}
```

For instance, if we wanted to write a reducer which counted numbers we could write the following -

```js
incrementCount: function (state, action) {
  return state + 1;
}
```

More often than not we would want to store our entire store's state within a single ImmutableJS Map.

An example of this would be -


```js
var myStore = new ImmutableReducerStore({
    init: function () {
        this.defaultState = Immutable.fromJS({ 
            names: {}
        });

        // Map action methods to private methods.
        this.bindActions(
            Actions.SET_NAME, this.setNameValue
        );
    },

    public: {
        getState() {
          return this.state;
        }
    },

    private: {
        // Update private, Immutable values
        setNameValue: function (state, action) {
            var id = action.id;
            var name = action.name;

            return state.update('names', function (names) {
              return names.set(id, name);
            });
        }
    }
});
```

One benefit of storing all state within a single ImmutableJS object is the ability to easily reset your stores. For instance -

```js
var myStore = new ImmutableReducerStore({
    init: function () {
        this.defaultState = Immutable.fromJS({ 
            names: {}
        });

        // Map action methods to private methods.
        this.bindActions(
            Actions.SET_NAME, this.setNameValue,
            Actions.RESET, this.resetState
        );
    },

    public: {
        getState() {
          return this.state;
        }
    },

    private: {
        resetState: function (state, action) {
          return this.defaultState; // It is easy to reset store state
        }

        // Update private, Immutable values
        setNameValue: function (state, action) {
            var id = action.id;
            var name = action.name;

            return state.update('names', function (names) {
              return names.set(id, name);
            });
        }
    }
});
```

### Best Practices

We recommend that your private reducer functions are `pure`, that is to say they will always return the same results when given the same inputs. A reducer function should not mutate state directly on the store, or rely upon non-determinstic data - such as setting the current Date / accessing `Math.random()` etc.
