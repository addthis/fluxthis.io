# Non-Immutable Stores (aka Object Oriented Store)

## Basics

Here is what the
[Flux Docs](https://facebook.github.io/flux/docs/overview.html#stores)
have to say about a store:


>Stores contain the application state and logic.
Their role is somewhat similar to a model in a traditional MVC, but they
manage the state of many objects — they do not represent a
single record of data like ORM models do. Nor are they the same
as Backbone's collections. More than simply managing a collection
of ORM-style objects, stores manage the application state for a
particular domain within the application.

## ObjectOriented Store

We realize that there are use cases when an [Immutable Store](/#/docs/immutable-stores) is not ideal, one of
those could be when performance matters.
Another reason could be you slowly want to migrate to FluxThis without drastic refactors.

### Requiring

You can require the store individually, with some type of es6 loader:

```js
var ObjectOrientedStore = require('fluxthis/src/ObjectOrientedStore.es6');
```

or you can require a built version of the store that doesn't need es6
compilation.

```js
var ObjectOrientedStore = require('fluxthis').ObjectOrientedStore;
```
### Constructing

```js
var myStore = new ObjectOrientedStore(options);
```

#### Options
- `displayName` Human readable name for debugging *required*
- `private` An object of private methods used to update store data *required*
- `public` An object of public methods used to access store data *required*
- `init` A function which is called at the creation of the store. Used to set up
initial store state, as well as call `bindActions`.

### Initialization
The `init` function is used to set up initial store state, as well as bind
private store functions to handle dispatched actions using `this.bindActions`.

**Note: ** The TestUtils.reset method will use this method to reset
the store to an initial state, so it's good practice to declare default
variable values here, if needed.

```js

// Create your new store!
var myStore = new ObjectOrientedStore({
    init: function () {
    	this.names = {0: 'Jake Scott', 1: 'Josh Horwitz'};
    }
});
```

### Public methods
Public methods are exposed on the Store after its creation. They should not be
used to update the state of a store, only access data that is inside of it.


```javascript
var myStore = new ObjectOrientedStore({
    init: function () { // do stuff },
    public: {
        getName: function (id) {
            return this.names[id];
        },
        getNames: function () {
            return this.names;
        }
    }
});

console.log(myStore.getName(0)); // "Jake Scott"

console.log(myStore.getNames()) // Normal Object
```

### Private methods
Private methods are available through `this` only when inside of other Store
methods. This means you cannot access private methods outside
of the store. Inside private methods, you have access to both public and private
methods of the store, as well as private store data.

```js
var myStore = new ObjectOrientedStore({
    init: function () { // do stuff },
    public: {
        // Public methods
    }
    private: {
        setNameValue: function (id, name) {
            this.names[id] = name;
        }
    }
});

myStore.setNameValue(5, 'Crank Shot'); // undefined is not a function
// Quit trying to access private methods!

```

### Binding actions
The ObjectOrientedStore lets you easily handle dispatched actions without any messy
switch statement. Just pass `bindActions` pairs of constants (either action
types or action sources) and private store functions to handle them.

```js
var myStore = new ObjectOrientedStore({
    init: function () {
        this.names = {};

        // Map action methods to private methods
        this.bindActions(
            'SET_NAME_VALUE', this.setNameValue
        );
    },
    public: {
        // Public methods
    }
    private: {
        setNameValue: function (id, name) {
            this.names[id] = name;
        }
    }
});
```

If you aren't quite sure how bindAction works, then please take a look
at [Actions & Action Creators](/#/docs/action-creators).

### Waiting for other Stores
You have access to `waitFor` inside your store which behaves the same as
`dispatcher.waitFor`.

```js
private: {
	myMethod: function () {
		this.waitFor(Store1.dispatchToken, Store2.dispatchToken);
		this.lol = 5;
	}
}
```
