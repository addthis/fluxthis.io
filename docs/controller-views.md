# Controller Views

## Basics
Controller views are an integral part to the Flux flow and we
try to enforce the guiding pricinples that govern the interaction
between the controll view and any stores it may care about.

If you aren't quite sure what a controller view is, please
read this little snippit from the [Flux Docs](http://facebook.github.io/flux/docs/overview.html#views-and-controller-views).

>React provides the kind of composable and freely re-renderable
views we need for the view layer. Close to the top of the
nested view hierarchy, a special kind of view listens for
events that are broadcast by the stores that it depends on.
We call this a controller-view, as it provides the glue code to
get the data from the stores and to pass this data down the chain
of its descendants. We might have one of these controller-views
governing any significant section of the page.

## React Mixin

FluxThis stores provide mixins to incorporate themselves into React classes.
These mixins automatically subscribe the view to changes from the store and
pull in new state from the stores using `getStateFromStores`.

To use the mixin, simply list all of the stores a view depends on in its `mixins`
property, and define `getStateFromStores` to access those stores and properly
populate the view's state.

Views with the FluxThis mixin should sit at the top of your React structure, so
that they may pass their state down to children components through props. Having
too much nested state in your application can be dangerous and hard to debug, so
we suggest that you strongly limit your use of the mixin in child components.

```js
var MyView = React.createClass({
	displayName: 'MyView',
	mixins: [StoreA.mixin, StoreB.mixin],
	getStateFromStores: function () {
		return {
			name: StoreA.getName(),
			age: StoreB.getAge()
		}
	},
	getDefaultProps: function () {
		return {a: 0, b: 1};
	},
	getInitialState() {
	    // Use this for state not set by stores
	    // Use getStateFromStores for state determined by stores
	},
	render: function () {
		// return some jsx goodness
	}
});

var element = React.createElement(MyView);
React.render(element, document.getElementById('main'));
```

#### getStateFromStores()

This function will be called when any dependant store fires a change event. In
the built-in stores, change events are fired any time a private function is
called (their purpose is changing data).

Don't worry if you chain private function calls, they will be batched
and only cause the component to update once in a single dispatch.

#### getInitialState()

This life-cycle method should be used when you have internal state
to the component that is not set by state from the store. 

**Note: ** When you are using this mixin you need to ensure that you are not
setting the same key's in `getInitialState` & `getStateFromStores`;
otherwise, you will run into errors being thrown in React. 

