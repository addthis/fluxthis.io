# Actions and Action Creators

If you are not familiar with the Flux terminology of Actions
and Action Creators, then please read this tidbit taken
from [Flux's Docs](https://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#actions-and-actioncreators).

>When new data enters the system, whether through a person interacting with the
application or through a web api call, that data is packaged into an action —
an object literal containing the new fields of data and a specific action
type. We often create a library of helper methods called ActionCreators that
not only create the action object, but also pass the action to the dispatcher.

>Different actions are identified by a type attribute. When all of the stores
receive the action, they typically use this attribute to determine if and how
they should respond to it. In a Flux application, both stores and views
control themselves; they are not acted upon by external objects. Actions
flow into the stores through the callbacks they define and register, not
through setter methods.

>Letting the stores update themselves eliminates many entanglements typically
found in MVC applications, where cascading updates between models can lead
to unstable state and make accurate testing very difficult. The objects
within a Flux application are highly decoupled, and adhere very strongly
to the Law of Demeter, the principle that each object within a system should
know as little as possible about the other objects in the system. This
results in software that is more maintainable, adaptable, testable, and
easier for new engineering team members to understand.

### Requiring

You can require the action creator individually; however,
 this will require an es6 loader:

```js
var ActionCreator = require('fluxthis/src/ActionCreator.es6');
```

or you can require a built version of the action creator that doesn't need es6
compilation.

```js
var ActionCreator = require('fluxthis').ActionCreator;
```


### Constructing

```js
var myActionCreator = new ActionCreator(options);
```

#### Options
- `displayName` Human readable name for debugging **optional**
- `actionSource` Source string so that stores know who the action originated from **optional**

## ActionCreator Example

```js
var FluxThis = require('fluxthis');
var ActionCreator = FluxThis.ActionCreator;

var myActionCreator = new ActionCreator({
	displayName: 'MyActionCreator',

	actionSource: 'CONTRIVED_EXAMPLE',

	//defines a public method
	doThing: {
		//used by stores to identify an action
		actionType: 'DO_THING',

		//define what payloads for this action should look like
		payloadType: ActionCreator.PayloadType.shape({
			do: ActionCreator.PayloadType.string,
			thing: ActionCreator.PayloadType.number.isRequired,
		}).isRequired,

		createPayload: function (arg1, arg2) {
			$.get('/lol/' + arg1 + '/wut/' + arg2)
				.always(this.doOtherThing);

			//this value is sent to all registered stores
			return {
				sum: arg1 + arg2
			};
		}
	},

	//defines another public method
	doOtherThing: {
		actionType: 'DO_OTHER_THING',

		//some actions should be dispatched without payloads
		payloadType: null
	}
});

myActionCreator.doThing({
	do: 'hi!',
	thing: 5
});

myActionCreator.doOtherThing();
```

#### Action Type

`actionType` is a string value that corresponds to an action. This value
is what stores listen to in `this.bindActions` and respond to internally
if the store cares about a given action.


#### Payload Type

`payloadType` is exactly like `propTypes` in React, which you can read more
about [here](https://facebook.github.io/react/docs/reusable-components.html).

You may access these `payloadType` values via:

```js
ActionCreator.PayloadTypes
```

What we did in FluxThis was expose PropTypes to actions, so that you could
validate your action payloads just like you can with prop types in any
environment that is *not* production. That means, when in production FluxThis
will not check ActionTypes to ensure performance.

#### createPayload(...args)

`createPayload` provides you with a pre-process step prior to sending the
action to the dispatcher. This means you can receive attributes and create
a custom payload that you will return from `createPayload` as an object.

This is a good location to set default action values or do any logic
needed prior to dispatching an action, such as making an ajax call to the
server.
