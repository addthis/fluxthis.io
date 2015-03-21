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
we add some restrictions to a generic store.

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

### ImmutableStore
The ImmutableStore is a very OO inspired store which strictly enforces the use
of immutable data. All properties of the store must be either immutable or JS
primitives to avoid throwing errors. If a public function ever returns a value
which does not meet these requirements, a different error is thrown. Let the
code enforce best practices so your team can relax.

```js
var FluxThis = require('FluxThis');
var ImmutableStore = FluxThis.ImmutableStore;
var myStore = new ImmutableStore({
	init: function () {
		this.url = 'github.com';
		this.count = 10;
		this.data = ImmutableStore.Immutable.fromJS({
			hi: [1,2,3],
			mom: 'lol'
		});
	},
	private: {
		/* learn about accessors later */
	},
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

#### Requiring

```js
// individually, with webpack and an es6 loader
var ImmutableStore = require('fluxthis/src/ImmutableStore');
```
#### Constructing

```js
var myStore = new ImmutableStore(options);
```

#### Options
- `displayName` Human readable name for debugging *optional*
- `private` An object of private methods used to update store data *required*
- `public` An object of public methods used to access store data *required*
- `init` A function which is called at the creation of the store. Used to set up
initial store state, as well as call `bindActions`.

#### Public methods
Public methods are exposed on the Store after its creation. They should not be
used to update the state of a store, only access data that is inside of it.

To keep you honest, public methods of an `ImmutableStore` will throw errors if
they return any value which is not primitive or Immutable. 
The reason plain objects are not allowed to be returned is because
if you modify that object, then you modify the store and violate flux
principles of 1 direction flow.

```javascript
public: {
	// returning primitives is OK.
	getName: function (id) {
		// this.info = Immutable.fromJS({id_0: {name: 'jake'}, id_1: ...})
		return this.info.getIn([id, 'name']);
	},

	// returning immutables is OK too
	getInfo: function (id) {
		return this.info.get(id);
	},

	// returning objects is NOT OKAY WHAT THE HELL ARE YOU THINKING?!
	getPlainInfo: function () {
		badIdea = {id_0: {name: 'jake'}};
		return badIdea;
	}
}
```

#### Private methods
Private methods are available through `this` only when inside of other Store
methods. Inside private methods, you have access to both public and private
methods of the store, as well as private store data.

```js
private: {
	// Update private, Immutable values
	setNameValue: function (name, value) {
		// if this is confusing, check out the docs for Immutable JS
		this.names = this.names.update(name, value);
	},

	// Update private, primitive values
	setAge: function (newAge) {
		this.age = Number(newAge);
	}
}
```

#### Initialization
The `init` function is used to set up initial store state, as well as bind
private store functions to handle dispatched actions using `this.bindActions`.

```js
init: function () {
	var Immutable = ImmutableStore.Immutable;
	this.names = Immutable.Map({jake: '1', scott: '0'});
}
```
#### Binding actions
The ImmutableStore lets you easily handle dispatched actions without any messy
switch statement. Just pass `bindActions` pairs of constants (either action
types or action sources) and private store functions to handle them.

```js
init: function () {
	this.bindActions(
		SOME_ACTION_TYPE, this.coolPrivateStoreMethod,
		OTHER_ACTION_TYPE, this.coolerPrivateStoreMethod,
		AN_ACTION_SOURCE, this.coolestPrivateStoreMethod
	);
}
```

#### Waiting for other Stores
You have access to `waitFor` inside your store which behaves sililarly to
`dispatcher.waitFor`.

```js
private: {
	myMethod: function () {
		this.waitFor(Store1.dispatchToken, Store2.dispatchToken);
		this.lol = 5;
	}
}
```
