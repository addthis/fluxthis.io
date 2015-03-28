# Constant Collections

Constant collecitons let you create human-readable, minifier-friendly constants, which are never equal to anything but themselves.

```js
var ACTION_TYPES = new ConstantCollection(
  'ACTION_TYPE_1',
  'ACTION_TYPE_2',
  'ACTION_TYPE_3',
  'EXAMPLE'
);

var CONTRIVED_EXAMPLE_CONSTANTS = new ConstantCollection('EXAMPLE');

console.log(ACTION_TYPES.ACTION_TYPE_1 === ACTION_TYPES.ACTION_TYPE_2); //false 
console.log(ACTION_TYPES.ACTION_TYPE_1 === ACTION_TYPES.ACTION_TYPE_1;) //true
console.log(ACTION_TYPES.EXAMPLE === CONTRIVED.EXAMPLE;) //false!
```
Use them for action types, action sources, or anything else requiring constants with no particular value.

##Constructing
`var constants = new ConstantCollection(String... )`

### String...
 - A list of strings, which will be used to name the constants

### API
From a constant, you can access the constant's human-readable name via `CONSTANT.name`, and its collection via `CONSTANT.collection`.

```js
var constants = new ConstantCollection('TEST');
var TEST = constants.TEST;
console.log(TEST.collection === constants); //true
console.log(TEST.name === 'TEST'); //true
```

This is generally useless, but sometimes helps with debugging.
