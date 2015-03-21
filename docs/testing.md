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
* {string} action.source - The action source you wish to mock
* {object} action.payload - An payload object to setup the store.

There is a fundamental problem that you run into when you try to
test a Flux Store, which is that they are singletons. That means
when you run a test that communicates an action you automatically
update all stores, even those you might not care about.

Using this method you will only dispatch to the current store, so
you no longer need to worry about sending payload parameters that
other stores care about.

### TestUtils.reset()

This method gives you the capability to reset a given store back to
it's initial state after the init method was called the first time.

This allows you to reset your Store across tests, so that it's in
a known state at the start of a given Test. Typically, you would
reset the store beforeEach unit test or after some subset of tests,
so that you can set it up again.