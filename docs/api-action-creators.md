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
- `actionSource` Source string so that stores know who the action originated from **required**

### Basic Example

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    actionSource: 'USER_API_ACTION_SOURCE',
    getUsers: {
        route: '/user',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE'
    }
});
```

Lets break down this basic example and then we will get into some of the powerful options
that API Action Creators give you.

As with normal [Action Creators](/#/docs/action-creators), you must provide a `displayName`
and `actionSource`. The part that differs is how you define actions.

In the above example we have an action called `getUsers` which can be accessed by
calling `apiAC.getUsers()`.

- `route` - relative route of the endpoint you wish to call **required**
- `method` - one of {GET | PUT | POST | DELETE} **required**
- `pending` - action type that gets dispatched once the ajax call has been submitted
- `success` - action type that gets dispatched once the ajax call has been successful
- `failure` - action type that gets dispatched once the ajax call has failed

**Note** - if you do not define `successTest` (see below) the API action creator will choose success
or failure based on the status code of the response. Any 2xx status codes are success,
anything else is a failure.

### But I want to see the power!

```javascript
var apiAC = new APIActionCreator({
    displayName: 'UserAPIActionCreator',
    actionSource: 'USER_API_ACTION_SOURCE',
    getUser: {
        route: '/user/:userID',
        method: 'GET',
        pending: 'RECEIVE_USER_PENDING',
        success: 'RECEIVE_USER_SUCCESS',
        failure: 'RECEIVE_USER_FAILURE',
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


#### successTest(response) => boolean

This method can be used to overwrite the default `successTest` which checks for a 2xx response code.
An example use case for this method could be to check status code and the value of the response
for specific validation.
