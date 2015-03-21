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


## ActionCreator Example

```js
var FluxThis = require('FluxThis');
var ActionCreator = FluxThis.ActionCreator;
var myActionCreator = new ActionCreator({
	// used for debugging messages
	displayName: 'My',

	//used by stores to identity a group of related actions
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
