# Immutable Stores

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


Within FluxThis, we follow the same philosophy; however,
with the Immutable Store we add some restrictions to help
reduce code smell.

## Immutability Built-in

The FluxThis Store enforces the use of immutable objects when dealing with
store state. Accessors are required to return immutables (or primitives), and
adding non-immutable properties to the store will throw errors.

You can create immutables through the FluxThis Store by accessing
`Store.Immutable`.

```js
var myStore = new Store({
	init: function () {
		this.data = Store.Immutable.Map({a: 'b', c: 'd'})
	},
	public: {
		/*...*/
	},
	private: {
		/*...*/
	}
})
```

For more information on how immutables work, please check out
[facebook's library here](https://github.com/facebook/immutable-js).

## ImmutableStore
The ImmutableStore is a very OO inspired store which strictly enforces the use
of immutable data. All properties of the store must be either immutable or JS
primitives to avoid throwing errors. If a public function ever returns a value
which does not meet these requirements, a different error is thrown. Let the
code enforce best practices so your team can relax.

```js
var FluxThis = require('fluxthis');
var ImmutableStore = FluxThis.ImmutableStore;
var Immutable = ImmutableStore.Immutable;

var myStore = new ImmutableStore({
	init: function () {
		this.url = 'github.com';
		this.count = 10;
		this.data = Immutable.fromJS({
			hi: [1,2,3],
			mom: 'lol'
		});
	},
	// Setters
	private: {
		/* learn about mutators later */
	},
	// Getters
	public: {
		getUrl: function () {
			return this.url;
		},
		getCount: function () {
			return this.count;
		},
		getData: function () {
			return this.data;
		}
	}
});
```

### Requiring

You can require the store individually, with some type of es6 loader:

```js
var ImmutableStore = require('fluxthis/src/ImmutableStore.es6');
```

or you can require a built version of the store that doesn't need es6
compilation.

```js
var ImmutableStore = require('fluxthis').ImmutableStore;
```
### Constructing

```js
var myStore = new ImmutableStore(options);
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
var Immutable = ImmutableStore.Immutable;

// Create your new store!
var myStore = new ImmutableStore({
    init: function () {
    	this.names = Immutable.Map({0: 'Jake Scott', 1: 'Josh Horwitz'});
    }
});
```

### Public methods
Public methods are exposed on the Store after its creation. They should not be
used to update the state of a store, only access data that is inside of it.

To keep you honest, public methods of an `ImmutableStore` will throw errors if
they return any value which is not primitive or Immutable. 
The reason plain objects are not allowed to be returned is because
if you modify that object, then you modify the store and violate flux
principles of 1 direction flow.

```javascript
var myStore = new ImmutableStore({
    init: function () { // do stuff },
    public: {
        // returning primitive values are OK.
        getName: function (id) {
            return this.names.get(id);
        },

        // WRONG
        // returning a plain javsacript object is
        // NOT OKAY WHAT THE HELL ARE YOU THINKING?!
        getNamesWrong: function () {
            return this.names.toJS();
        }

        // Correct
        getNames: function () {
            return this.names; // Return immutable map
        }
    }
});

console.log(myStore.getName(0)); // "Jake Scott"

console.log(myStore.getNamesWrong()); // Error thrown

console.log(myStore.getNames()) // Immutable Map object
```

### Private methods
Private methods are available through `this` only when inside of other Store
methods. This means you cannot access private methods outside
of the store. Inside private methods, you have access to both public and private
methods of the store, as well as private store data.

```js
var myStore = new ImmutableStore({
    init: function () { // do stuff },
    public: {
        // Public methods
    }
    private: {
        // Update private, Immutable values
        setNameValue: function (id, name) {
            // if this is confusing, check out the docs for Immutable JS
            this.names = this.names.set(id, name);
        }
    }
});

myStore.setNameValue(5, 'Crank Shot'); // undefined is not a function
// Quit trying to access private methods!

```

### Binding actions
The ImmutableStore lets you easily handle dispatched actions without any messy
switch statement. Just pass `bindActions` pairs of constants (either action
types or action sources) and private store functions to handle them.

```js
var myStore = new ImmutableStore({
    init: function () {
        this.names = Immutable.Map();

        // Map action methods to private methods.
        this.bindActions(
            'SET_NAME_VALUE', this.setNameValue
        );
    },
    public: {
        // Public methods
    }
    private: {
        // Update private, Immutable values
        setNameValue: function (id, name) {
            // if this is confusing, check out the docs for Immutable JS
            this.names = this.names.set(id, name);
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
