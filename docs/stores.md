# Stores

## Basics

Here is what the
[flux docs](https://facebook.github.io/flux/docs/overview.html#stores)
have to say about a store:


>Stores contain the application state and logic.
Their role is somewhat similar to a model in a traditional MVC, but they
manage the state of many objects — they do not represent a
single record of data like ORM models do. Nor are they the same
as Backbone's collections. More than simply managing a collection
of ORM-style objects, stores manage the application state for a
particular domain within the application.


Within FluxThis, we follow the same philosophy; however,
we add some restrictions to a generic store.

## Immutable all the things