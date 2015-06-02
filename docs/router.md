# Experimental Feature

# FluxThis Router

FluxThis' Router is a koa inspired router that takes advantage of ES6 generators
 to avoid callback hell and provide true middleware routes in the browser! 
 Under the hood, the router uses the same core libraries that express, koa and 
 others use. One huge difference is that this router is built with Flux in 
 mind & uses Flux principles. 


### Quick Introduction

```javascript

// Create our React controller view to listen for route changes
const ControllerView = React.createClass({
  displayName: 'RouterControllerView',
  mixins: [RouterStore.mixin], // Should use the immutable pure render mixin here :)
  getStateFromStores() {
    return {
      reactElement: RouterStore.getReactElement(),
      reactElementProps: RouterStore.getReactElementProps()
    };
  },
  render() {
    const ReactComponent = this.state.reactElement;
  
    return (
      <div>
        <ReactComponent {...this.state.reactElementProps} />
      </div>
    );
  }
});

// Lets render our controller view then setup our router
React.render(ControllerView, document.getElementById('awesomeId'));

const AwesomeComponent = React.createClass({
    render() {
        return (
            <div>I'm an awesome component</div>
        );
    }
});

// now lets setup our route & start the router!
function routes(router) {
    router.route('/awesome', function *(next) {
        this.setReactElement(AwesomeComponent);
        yield *next;
    });
}

Router
  .defaultRoute('/awesome')
  .register(routes) // you can call this multiple times. yay modularity
  .start();
  
```

Now that we have your interest, keep reading to learn about more sweet features.

### Wait ES6 Generators and a Router? Wut.

That's right! We really liked what [koajs](http://koajs.com) did with their routing and generators,
 so we decided to follow their lead and do this in the browser. See the awesome
 gif below for a quick introduction to how generators make routing & middleware awesome.
 
![koa example](http://devres.zoomquiet.io/data/20131229140758/n7l5uakjo0.gif)

### Defining Routes

- `route(route: string, routeName: string, handler: generator)`
    - Use this method to define new routes
    - `route` - example: `/user/:id`... Checkout [here](https://github.com/component/path-to-regexp#usage) for more complex examples
    - `routeHandler` - ES6 generator handler
    
```javascript
// userRoutes.js
export default function (router) {
  router.route('/user/:id', function *userHandler(next) {
    // load user async
    const userID = this.getPathParams.get('id');
    loadUser(userID);
        
    // set the element
    this.setReactElement(userComponent, {userID});
    yield *next;
  });
}
```

### Defining middleware

There are 2 different types of middleware you can register.

1. `use(handler: generator)`
    - This method can be used to add a middleware handler for all routes. This is useful for authentication checking for example.
2. `all(urlRegex: string, handler: generator)`
    - The main difference between `all` and `use` is that `all` takes a string to match against URLs.
    - `urlStringRegex` - example: `/users*` would invoke the handler method for any route matching the regex string
    
```javascript
// middleware.js

export default function (router) {

  router.use(function *(next) {
    // do some stuff
    yield *next;
    // do some stuff after everyone else
  });
    
  router.all('/user*', function *userAuthHandler(next) {
    document.title = 'User Profile';
        
    // perhaps do some authentication stuff?
    if (authFails()) {
      this.rewriteTo('/notAuthorized);
      return; // short circuit the middleware chain
    }
        
    yield *next;
  });
}

```

### Route & Middleware Context

Each Route & Middleware handler gets access to the same context object (aka this) to let you know information about the current route

 - `getPath(): String`
     - returns the current hash fragment
 - `getQueryParams(): ImmutableMap`
     - Returns an immutable map of param => value
 - `getPathParams(): ImmutableMap`
     - Returns an immutable map of param => value
 - `redirectTo(path: string)`
     - replaces the current URL by finding the route with the given name and filling in the params. If not found, then redirects to 404 URL or default in that order by whichever is defined. 
     - `path` - replaces the current path in history with the new one
 - `setReactElement(ReactElement, props: object)`
     - Sets the react element in the RouterStore with the given props
     - `ReactElement` - react element that will be passed to your Router controller view
     - `props` - optional props to be passed to your Router controller view as state

### Register Routes & Middleware

You can register middleware & routes in whatever order you wish; however,
you must make sure that you call start when you are finished. You cannot
add anymore routes once the router has started. 

Each register call will invoke your function passing it a `router` object as you
have seen in our previous examples. This design pattern allows you to have 
modular design patterns by separating routes into different files.

```javascript

// app.js (main file)
// Register & Start the Router
Router
  .defaultRoute('/user')
  .register(beforeMiddleware)
  .register(user)
  .register(afterMiddleware)
  .start();
```

#### Router methods

- `defaultRoute(string)` 
    - takes the default route to be used if the hash is missing or route was not found
- `register(function)`
    - registers new middleware and routes. this method can be called multiple times. order matters when dealing with middleware
    - the callback is passed a `router` object with the 3 defined route/middleware types: `all`, `use`, & `route`.
- `start`
    - starts the router. Should only be called once. 
    
### Controller View

Lets wrap it all together! To do this, we need to create a controller view that will be your root node in your react `tree`. This controller view will listen to the RouterStore for changes to the route or react element to be rendered. 

**Note** - You should try your hardest to only have one router controller view to decrease complexity. See the component mixin below for more information about how you can avoid more controller views. 

```javascript

const RouterStore = require('fluxthis/src/RouterStore.es6');

React.createClass({
  displayName: 'RouterControllerView',
  mixins: [RouterStore.mixin], // Should use the immutable pure render mixin here :)
  getStateFromStores() {
    return {
      reactElement: RouterStore.getReactElement(),
      reactElementProps: RouterStore.getReactElementProps(),
      queryParams: RouterStore.getQueryParams(),
      pathParams: RouterStore.getPathParams(),
      path: RouterStore.getPath()
    };
  },
  render() {
    const ReactComponent = this.state.reactElement;

    if (!ReactComponent) {
      return null;
    }
  
    return (
      <div>
        <HeaderComponent />
        <ReactComponent {...this.state.reactElementProps} />
        <FooterComponent />
      </div>
    );
  }
});
```

### Component Mixin

We realize that you don't want to propagate down your props from your router controller view to children components deep down the tree, which is why we give you access to a component mixin with useful getters & navigation/redirect method calls. Please be aware that this mixin will NOT update your component, so you should ensure that reconciliation will go down to the nodes who care about routes. You might find it better just to propagate down values. 

So what's included in this mixin?

 - `getPath(): String`
     - returns the current hash fragment
 - `getQueryParams(): ImmutableMap`
     - Returns an immutable map of param => value
 - `getPathParams(): ImmutableMap`
     - Returns an immutable map of param => value
 - `redirectTo(path: string)`
     - replaces the current URL by finding the route with the given name and filling in the params. If not found, then redirects to 404 URL or default in that order by whichever is defined. 
     - `path` - replaces the current path in history with the new one
 - `navigateTo(path: string)`
     - navigates to the route with the given name and filling in the params. If not found, then redirects to 404 URL or default in that order by whichever is defined. 
     - `path` - navigate to a given path pushing it onto the history

As with any other mixin, you are given access to these methods on `this` inside the component. 


## Basic Example Application

Lets first start by creating our main entrypoint to our application

**main.js**

```javascript

const React = require('react');
const Router = require('fluxthis/src/Router.es6');
const RouterControllerView = require('./RouterControllerView');
const routes = require('./routes');

// Lets render our controller view. 
React.render(RouterControllerView, document.getElementById('someID'));

Router
  .defaultRoute('/')
  .register(routes)
  .start(); // make sure to call start

// Your router has now started & your application is good to go!
```

**RouterControllerView.js**

```javascript
const React = require('react');

export default React.createClass({
  displayName: 'RouterControllerView',
  mixins: [RouterStore.mixin], // Should use the immutable pure render mixin here :)
  getStateFromStores() {
    return {
      reactElement: RouterStore.getReactElement(),
      reactElementProps: RouterStore.getReactElementProps(),
      queryParams: RouterStore.getQueryParams(),
      pathParams: RouterStore.getPathParams(),
      path: RouterStore.getPath()
    };
  },
  render() {
    const ReactComponent = this.state.reactElement;

    if (!ReactComponent) {
      return null;
    }
  
    return (
      <div>
        <HeaderComponent />
        <ReactComponent {...this.state.reactElementProps} />
        <FooterComponent />
      </div>
    );
  }
});
```

**routes.js**
```javascript

export default function (router) {
  router.route('/', function *defaultHander(next) {
      this.rewriteTo('/foo/bar');
  });
  
  router.route('/foo/:id',  function *fooHandler(next) {
      const id = this.getPathParams().get('id');
      this.setReactElement(FooComponent, {id}); // default id as prop
      yield *next;
  });
  
  router.route('/bar', function *booHandler(next) {
      this.setReactElement(BarComponent);
      yield *next;
  });
}
```
