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
These mixins automatically subscript the view to changes from the store, and call
pull in new state from the stores using `getStateFromStores`.

To use the mixin, simply list all of the stores a view depends on in its `mixin`
property, and define `getStateFromStores` to access those stores and properly
populate the view's state.

Views with the FluxThis mixin should sit at the top of your React structure, so
that they may pass their state down to children components through props. Having
too much nested state in your application can be dangerous and hard to debug, so
we suggest that you strongly limit your use of the mixin in child components.

```js
var MyView = React.createClass({
	displayName: 'MyView',
	mixin: [StoreA.mixin, StoreB.mixin],
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
	    // DON'T USE THIS METHOD.
	    // Use getStateFromStores
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

#### getInitialState()

**Note: ** When using this mixin you should **not** use this lifecycle method.

Any initial state should be setup in `getStateFromStores` as FluxThis will
call this method.

