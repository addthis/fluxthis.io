# Quick Start

This guide will get you up to speed in developing applications using FluxThis. It is 
designed for people who already know about both React and Flux. Having a knowledge of
Facebook's ImmutableJS library is not required, but is helpful.

## Setting up the Quick Start Environment
First, set a wonderful project environment using the quick start project on NPM:

```
# installs gulp globally, if you don't already have it
npm install -g gulp 

# installs this quick start module
git clone https://github.com/tjwudi/react-fluxthis-webpack-mocha-gulp
cd react-fluxthis-webpack-mocha-gulp
npm install
```

This project sets up a few things for you:

- gulp: it orchestrates your builds
- webpack: builds your project
- babel: lets you use esnext syntax
- mocha: runs unit tests

To kick off a build, just run `gulp watch`. This will build your file for development,
run any unit tests you have written via a phantomjs server, and alert you to any build
or test failures. 

Take a minute to familiarize yourself with the folder structure.  Everything you'll be
working on for this guide can be found in `src`.

## Walking through the tutorial
At this point, you have enough scaffolding to start reading the docs and coding up your
own application.  If you'd like a more guided approach, follow along here. We will be
creating a simple 'todo' application.

## Designing with Flux
 - Stores:
	- TodoStore
 - Actions
	- Add Todo
	- Remove Todo
	- Toggle Todo
 - Components
	- TodoController
	- TodoItem

## Creating an ImmutableStore
Direct your attention to `src/stores/MyFirstStore.es6.js`. You will use this as a skeleton
for creating the store which will hold all the information about your Todo list. When making
new stores, the first thing you should think about is the information that your views will
need to render your application. In the case of the Todo list, we really only need to store
a list of all our Todos! We will use an `ImmutableList` for this purpose.

### The `init` Method
Inside of a stores `init` method, you should declare every property of your store with a default value. Here we
add a list of todos, as well as an integer to keep track of todo IDs. Every property of an
`ImmutableStore` is required to be an Immutable object or primitive javascript type. Don't
worry, FluxThis will quickly catch your mistakes, if you make any.

```js
init () {
	this.todos = Immutable.List();
	this.lastID = 0;
},
```

### The `public` Methods
Inside of the `public` object, add accessor functions which can be used to get the data
inside your store. In our case, we just need to return our list of todos.

**Note** : Immutable Stores can only return immutable objects or primitive types.
```js
public {
	getTodos () {
		return this.todos;
	}
},
```

### The `private` Methods
Private methods are called internally by the store to respond to updates from the dispatcher.
These methods should update your store's internal state. Referring to our design that we laid
out earlier, you can see we will need to deal with three possible actions: add, remove, and
toggle.

```js
private {
	addTodo (description) {
		let todo = Immutable.fromJS({
			description: description,
			id: this.lastID++,
			done: false
		}); 

		// update this.todos with the new immutable list, containing the new todo
		this.todos = this.todos.push(todo);
	},
	removeTodo (id) {
		let index = this.todos.findIndex(todo => todo.get('id') === id);
		
		// remove the todo with the ID of id, but only if we have it to begin with
		this.todos = index > -1 ?
			this.todos.remove(index) :
			this.todos;
	},
	toggleTodo (id) {
		let index = this.todos.findIndex(todo => todo.get('id') === id);

		this.todos = this.todos.update(index, (todo) => {
			return todo.set('done', !todo.get('done'));
		});
	}
}
```
Since everything in an ImmutableStore is immutable, any collections of items need to be
completely replaced in order to update them. That is why every single private method
in this store reassigns a new value to `this.todos`. Be sure to check out the docs for 
ImmutableJS if any of the immutability bits are confusing.

**Note**: Private methods being called is what triggers your view to update!

### Using `bindActions`
If you're familiar with flux, you're probably wondering where the giant switch case of action
types belongs. Things look a little different in FluxThis. Inside the `init` method, we add a
call to `this.bindActions`, passing to it action types and private method handlers.

```js
init () {
	this.todos = Immutable.List();
	this.lastID = 0;
	this.bindActions(
		'ADD_TODO', this.addTodo,
		'REMOVE_TODO', this.removeTodo,
		'TOGGLE_TODO', this.toggleTodo
	);
},

```

The call to `bindActions` takes pairs of arguments. The first argument in a pair is an
action type. The second argument in the pair is a reference to a private method
which will handle the action.

In general, it's better to use constants for action types instead of strings. See the
documentation for [ConstantCollection](/#/docs/constant-collections) for more details.

At this point, your store has been created, and we can move on to creating a view that depends
on it.

## Creating a Controller View
In flux, certain high-level components which get their state directly from stores are referred
to as Controller Views. FluxThis uses a mixin approach to creating controller views, and
stores all information from relevant stores on `this.state` through the method `getStateFromStores`.

Open the file `src/components/MyFirstComponent.jsx` to get started.

```js

export default React.createClass({
    mixins: [MyFirstStore.mixin],
    getStateFromStores() {
        /* Your code here! */
    },
    render() {
        /* Your code here! */
    }
});

```

The first thing to notice here is the `mixins` attribute. For every store that this view depends on,
add the store's `mixin` to the list. For the most part, only top level components will need to use
FluxThis mixins as it's good practice to resist have too many controll views in your
react hierarchy.

The second thing to see is `getStateFromStores`. This method is used to translate store public
methods into internal component state. It should return an object, similar to `getInitialState`.
Note: `getInitialState`, if defined, will run before `getStateFromStores`. In addition,
`getInitialState` will always call `getStateFromStores`.

`getInitialState` should be used to setup any component state that does not
live in stores. 

```js
getStateFromStores() {
    return {
    	todos: MyFirstStore.getTodos()
    };
},
```

Next, lets implement the rest of the views methods.

```js
getInitialState () {
	return {newTodoText: ''};
},
handleAddClick () {
	/* We'll come back to this later */	
},
handleTodoToggleClick () {
	/* We'll come back to this later */	
},
handleTodoRemoveClick () {
	/* We'll come back to this later */	
},
renderTodoItems () {
	return this.state.todos.map(todo => {
		let id = todo.get('id');
		let toggleFn = this.handleTodoToggleClick.bind(this, id);
		let removeFn = this.handleTodoRemoveClick.bind(this, id);
		let style = {textDecoration: todo.get('done') ? 'line-through' : ''};

		return <div>
			<span style={style}>
				{todo.get('description')}
			</span>
			<input type='button' value='remove' onClick={removeFn}/>
			<input type='button' value='toggle' onClick={toggleFn}/>
		</div>;
	});
},
updateTodoText: function(event) {
	this.setState({ newTodoText: event.target.value });
},
render () {
	return <div>
		{this.renderTodoItems()}
		<input type='text' value={this.state.newTodoText} onChange={this.updateTodoText}/>
		<input type='button' value='add' onClick={this.handleAddClick}/>
	</div>
}
```
That's it for the view for now. We will move ahead to creating an ActionCreator, and then revisit
the view to add in functionality for adding/removing/toggling todos.

## Creating an `ActionCreator`
The FluxThis action creator is probably a little different than others you might have seen. The
most unique thing about it is that it does not provide any access to the dispatcher. Instead,
a dispatched action is mostly defined by configuration.

Open up the file `src/actions/MyFirstActionCreator.es6.js` to get started. The first thing we will 
add to the action creator is a `displayName`, which provides you with an easy way to identify 
the source of actions when you're debugging.

```js
export default new ActionCreator({
	displayName: 'Todo'
});
```

Next, we define our actions. At the minimum, actions need only an `type` to function. We
will provide `payload`s as well, which will spit out warnings when payloads don't look like
we expect them to, similar to react's `propTypes` .

```js
export default new ActionCreator({
	displayName: 'Todo',
	createTodo: {
		type: 'ADD_TODO',
		payload: ActionCreator.PayloadTypes.string.isRequired
	},
	removeTodo: {
		type: 'REMOVE_TODO',
		payload: ActionCreator.PayloadTypes.number.isRequired
	},
	toggleTodo: {
		type: 'TOGGLE_TODO',
		payload: ActionCreator.PayloadTypes.number.isRequired
	}
});
```

Now, the exported `ActionCreator` will expose three methods: `createTodo`, `removeTodo`, and
`toggleTodo`. Let's hop back into the view we created earlier to wire things together. 

```js
/* src/components/MyFirstComponent.es6.js */

handleAddClick () {
	MyFirstActionCreator.createTodo(this.state.newTodoText);
	this.setState({
		newTodoText: ''
	});
},
handleTodoToggleClick (id) {
	MyFirstActionCreator.toggleTodo(id);
},
handleTodoRemoveClick (id) {
	MyFirstActionCreator.removeTodo(id);
},
```

And we're done! Your little flux application should be ready for testing. 

