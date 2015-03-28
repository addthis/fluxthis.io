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
	'The method `${name}` could not be created on `${this}`; `actionType` must be provided'
);
```
Without an `actionType`, stores most likely wont know what to do with an action. This mostly helps out when you accidentally pass `undefined` due to a typo'd constant.

