# Test Utilities

We love testing and we are sure you love testing, so we
decided that testing should be an important part of FluxThis.
Along with our awesome code coverage, we baked in some test utilities
to make testing your react/flux web apps easier!

You can access the `TestUtils` object by:

```javascript
const SomeStore = require('SomeStore');
console.log(SomeStore.TestUtils); // {object}
```

**Important:**
The `TestUtils` object is only available when
`process.env.NODE_ENV !== 'production'` so please do not rely on any
of these methods during your day to day development
other than testing!

### TestUtils.mockDispatch(action)

* {string} action.type - The action type of the action your wish to dispatch.
* {object} action.payload - An payload object to setup the store.

There is a fundamental problem that you run into when you try to
test a Flux Store, which is that they are singletons. That means
when you run a test that communicates an action you automatically
update all stores, even those you might not care about.

Using this method you will only dispatch to the current store, so
you no longer need to worry about sending payload parameters that
other stores care about.

### TestUtils.mockPublicMethods(object)

This method provides you can easy way to mock public methods without screwing
up aliasing or access to private variables. Mocked public methods still
have access to all public and private methods/variables.

Here is an example:

```javascript
var Store = new ImmutableStore({
    init: function () {
        this.foo = 'bar';
    },
    private: {},
    public: {
        getFoo: function () {
            return this.foo;
        }
    },
});

console.log(Store.getFoo()); // bar

Store.TestUtils.mockPublicMethods({
    getFoo: function () {
        return 'yay testing';
    }
});

console.log(Store.getFoo()); // yay testing

Store.TestUtils.reset(); // See below

console.log(Store.getFoo()); // bar
```

### TestUtils.resetMockedPublicMethods()

This method will reset any mocked public methods. It will not reset
any private variables that may have changed, so if you wish to reset
both, then please checkout `TestUtils.reset()`.

## TestUtils.setPrivateMembers()

This method can be used to set the value of any private members.

This is useful for arranging your store to be a known state before hand,
dispatching an event, and then asserting your state is as expected:

```javascript
var Store = new ImmutableStore({
    displayName: 'CountingStore',

    init: function () {
        this.count = 0;
        this.bindActions(
            'ON_BUTTON_CLICKED', this.onButtonClicked
        );
    },
    private: {
        onButtonClicked: function () {
            this.count = this.count + 1;
        }
    },
    public: {
        getCount: function () {
            return this.count;
        }
    }
});

console.log(Store.getCount()); // 0

Store.TestUtils.setPrivateMembers({
    count: 5
});

console.log(Store.getCount()); // 5

Store.TestUtils.mockDispatch({
    type: 'ON_BUTTON_CLICKED'
});

console.log(Store.getCount()); // 6

Store.TestUtils.reset(); // See below
```

### TestUtils.reset()

This method gives you the capability to reset a given store back to
it's initial state after the init method was called the first time.

This allows you to reset your Store across tests, so that it's in
a known state at the start of a given Test. Typically, you would
reset the store beforeEach unit test or after some subset of tests,
so that you can set it up again.

### ReactTestUtils - Setting Initial State

You may be wondering, how do I set state when I'm using a testing tool
like ReactTestUtils, jasmine or mocha. Well, we have an easy solution for you!

```js
var React = require('react');
var ReactTestUtils = React.addons.TestUtils;

// Lets setup initial state.
var container = ReactTestUtils.renderIntoDocument(WidgetSettingsContainer({initialState: object}));
```

As you will notice in the above example, if you pass in a prop value of
`initialState`, then FluxThis will use that prop value to set your state.