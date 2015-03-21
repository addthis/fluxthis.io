# Debugging

The default debugging values are shown below:

```js
var FLUX_DEBUG_DEFAULTS = {
	all: false,
	types: [],
	sources: [],
	unused: process.env.NODE_ENV !== 'production';,
	unusedTimeout: 3000
};
```
You may override these by setting values on `window.FLUX_DEBUG`.
- `all`, `boolean`: print all debug statements
- `types`, `string[]`: print all results of actions that match any of the
	types provided
- `sources`, `string[]`: print all results of actions taht match any of the
	sources provided
- `unused`, `boolean`: print warnings on startup about possible unused constants
- `unusedTimeout`, `number`: in miliseconds, how long before the check for
	`unused` fires

Example:

```js
FLUX_DEBUG = {
	types: [MY_FAVORITE_ACTION_TYPE, BUTTON_CLICKED],
	sources: [USEFUL_SOURCE],
	unused: false
}
```
