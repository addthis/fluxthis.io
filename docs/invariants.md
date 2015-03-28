# Invariants Explained

Here you will find a list of the more confusing invariants we throw at you to show you how much we love you.

##ActionCreator invariants

```js
invariant(
	!ActionSources.has(options.actionSource),
	`ActionCreator - Your actionSource of ${options.actionSource} is not unique.`
);	
```
All action sources must be unique! Not many people use action sources, but those who do will find things go wonky when two developers accidentally share an action source.

```js
invariant(
	!DisplayNames.has(options.displayName),
	`ActionCreator - Your displayName of ${options.displayName} is not unique.`
);
```
All ActionCreators must have a unique `displayName` for debugging readability

```js
invariant(
	actionType !== undefined,
	`The method ${name} could not be created on ${this}; actionType must be provided`
);
```
Without an `actionType`, stores most likely wont know what to do with an action. This mostly helps out when you accidentally pass `undefined` due to a typo'd constant.

###Dispatcher invariants
```js
invariant(
  action.type !== undefined && action.type !== null,
  `Attempted to dispatch an action with unrecognizable type ${action.type}`,
);
```
You don't want to dispatch things without a type. This might be caused by one of two problems:
 - You are dispatching things manually because you hate our `ActionCreator`, and not using it like this:
   ```js
   Dispatcher.dispatch({source, type, payload});
   ```
 - You provided `type`, but its value is `null` or `undefined`, most likely due to a typo.

```js
invariant(
  !err,
  'Actions must be simple objects, and must be stringifyable.'
);
```
Somehow you managed to dispatch a payload which caused JSON.stringify to barf. Hats off to you! We're kind of on the fence about this restriction (someone might want to dispatch immutables directly, which would error out here), so give us some feedback if you don't like it.
