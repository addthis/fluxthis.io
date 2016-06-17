# API Action Creators

By now you might be wondering, how do I make AJAX calls to the server?
Well, FluxThis has that answered for you in a powerful and easy way! You also
won't be seeing any of those `$` symbol things in this code.

If you are looking for normal action creators that do not communicate
with the server, then please checkout these [Action Creators](/#/docs/action-creators).

Enough talk, lets get down to some code:

### Requiring

You can require the store individually, with some type of es6 loader:

```js
var APIActionCreator = require('fluxthis/src/APIActionCreator.es6');
```

or you can require a built version of the API Action Creator that doesn't need es6
compilation.

```js
var APIActionCreator = require('fluxthis').APIActionCreator;
```
### Constructing

```js
var myAPIActionCreator = new APIActionCreator(options);
```

#### Options
- `displayName` Human readable name for debugging **required**

### Basic Example

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    getUsers: {
        route: '/user',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE',
        abort: 'ABORT_GET_USERS'
    }
});
```

Lets break down this basic example and then we will get into some of the powerful options
that API Action Creators give you.

As with normal [Action Creators](/#/docs/action-creators), you must provide a `displayName`.
The part that differs is how you define actions.

In the above example we have an action called `getUsers` which can be accessed by
calling `apiAC.getUsers()`.

- `route` - relative route of the endpoint you wish to call **required**
- `method` - one of {GET | PUT | POST | DELETE} **required**
- `pending` - action type that gets dispatched once the ajax call has been submitted
- `success` - action type that gets dispatched once the ajax call has been successful
- `failure` - action type that gets dispatched once the ajax call has failed
- `abort` - action type that gets dispatched if the ajax call was aborted

**Note** - if you do not define `successTest` (see below) the API action creator will choose success
or failure based on the status code of the response. Any 2xx status codes are success,
anything else is a failure.

### But I want to see the power!

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    getUser: {
        route: '/user/:userID',
        method: 'GET',
        withCredentials: false,
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE',
        abort: 'ABORT_GET_USER',
        successTest(response) {
            return response &&
                response.status &&
                response.status >= 200 &&
                response.status < 300;
        },
        handleSuccess(request, response) {
            // do some stuff like dispatch an action
        },
        handleFailure(request, response) {
            // do some stuff like dispatch an action
            // Notice you get the original request,
            // so you can do undos with the original data
        },
        handleAbort(request) {
            // do something like spawn another request.
        },
        createRequest(userID) {
            return {
                params: {
                    userID: userID
                }
            };
        }
    }
});

apiAC.getUser('123'); // Passes ID `123` to createRequest
```

In this example we added some new options, so lets cover them.

### Information about pending, success & failure actions

As you can tell from our example, the API Action Creator can take
default actions that are executed if certain conditions are met.

#### pending

If an action type is provided to `pending`, then an action will be dispatched
prior to the request being sent to the server.

The payload of the dispatched action will be the `request` object we are sending
to the server, which will contain any body, params, and/or query values.

#### success & failure

If an action type is passed to `success` or `failure`, then either of those
will be invoked depending on whether or not the response received from the
server passes the `successTest`.

When either of these actions are dispatched, they are provided with a payload
of:

- `{object} response` - response from the server
- `{object} request` - the original request sent to the server

The reason we provide you with both is so that you can reset data, compare
previous and current data, etc.

#### abort

If an action type is provided to `abort`, then an action will be dispatched
after the request has been aborted programmatically. This action will only be
sent if the abort was successful and the request was not already done. This will be known
at the time of calling abort on the request as a boolean value is returned.
#### withCredentials

The default value for this is false. You should set this to true if you are
submitting CORS requests and need to pass cookies.

#### createRequest(...args) => object

This method allows you to format your request and set any URL parameters,
query parameters and body parameters that you may wish to include.

As you can see in the above example, you are able to pass arguments
to the `createRequest` method which you can then use to format the request.

There are a few values that you may return to format your request,
so lets cover those:

- `params` - Allows you to map values to URL parameters defined in your `route`. As you
    can see in the above example, we map `:userID` route parameter to the value returned
    in `createRequest`.
- `body` - Add JSON to the body of your request
- `query` - Formats values to a valid query string that's appended to the request's URL.
- `headers` - object of key/value pairs to set header key/values for your request

#### handleSuccess(request, response)

This handler gets called when a successful response is received from the server.
The original request has been added in case you would like any of the values you
previously sent.

This method is a good place to dispatch specific actions.

**Note** - `handleSuccess` gets called PRIOR to dispatching the the `success` action type
if one is defined. Typically you will want to define one or the other, but not both.

#### handleFailure(request, response)

This handler gets called when a failed response is received from the server.
The original request has been added in case you would like any of the values you
previously sent. This is useful in failures because you can use prior values
to reset stores back to what they were since saves/updates didn't work.

This method is a good place to dispatch specific actions.

**Note** - `handleFailure` gets called PRIOR to dispatching the the `failure` action type
if one is defined. Typically you will want to define one or the other, but not both.

#### handleAbort(request)

This handler gets called when a request submitted via an API action creator was cancelled
programmatically.

#### successTest(response) => boolean

This method can be used to overwrite the default `successTest` which checks for a 2xx response code.
An example use case for this method could be to check status code and the value of the response
for specific validation.


### Aborting A Request

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    getUsers: {
        route: '/user',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE'
    }
});

React.createClass({
    getInitialState() {
        return {
            request: null
        };
    },
    handleClick(evt) {
        evt.preventDefault();
        const request = apiAC.getUsers();

        // If the user clicked do something cool before the last request
        // was done then abort the last one and submit the new request.
        // Obviously you could do the opposite, which prevents trigger
        // happy users from clicking too many times.
        if (this.state.request && !this.state.request.isDone()) {
            this.state.request.abort();
            this.setState({request});
        }
    },
    render() {
        return (
            <button onClick={this.handleClick}> do something cool </button>
        );
    }
});
```

### Abort API

When you invoke an API Action Creator's method a request object is returned.


#### request.abort() => boolean

This method should be called to abort the request. If the request was successfully
aborted then true is returned and an action will be dispatched, if an abort action was
set on the API Action Creator.

This method will return false if the request failed to be aborted or the request
already finished.

#### request.isDone() => boolean

This method should be used to determine if the request has been completed or not.

### Static Methods

The `APIActionCreator` class provides static methods to set default options across all API Action Creator instances.

#### APIActionCreator.setDefaultHeaders(headers)

This method sets default headers to be applied to all requests created by `APIActionCreator` instances.

```javascript
var APIActionCreator = require('fluxthis').APIActionCreator;

APIActionCreator.setDefaultHeaders({
    'X-Custom-Header': '1234'
});
```

Individual APIActionCreator methods can override default headers or remove them by setting to `undefined`.

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    getUsers: {
        route: '/user',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE',
        createRequest() {
            return {
                headers: {
                    // Unset default header
                    'X-Custom-Header': undefined
                }
            };
        }
    }
});
```

#### APIActionCreator.setDefaultBaseURL(url)

This method sets a base URL to which all `route` options will be appended. A `route` will not be appended to the baseURL if the route itself is a fully qualified URL (i.e. `'http://example.com'`).

```javascript
var APIActionCreator = require('fluxthis').APIActionCreator;

APIActionCreator.setDefaultBaseURL('http://fluxthis.io/');
```

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    getUsers: {
        // Request will be made to http://fluxthis.io/user
        route: '/user',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE'
    },

    getExampleUser: {
        // Request will be made to http://example.com/user
        route: 'http://example.com/user',
        method: 'GET',
        pending: 'RECEIVE_EXAMPLE_USER_PENDING',
        success: 'RECEIVE_EXAMPLE_USER_SUCCESS',
        failure: 'RECEIVE_EXAMPLE_USER_FAILURE'
    }
});
```
