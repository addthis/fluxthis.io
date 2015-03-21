# Dispatcher

If you aren't quite sure what a dispatcher is, please
read this little snippit from the [Flux Docs](http://facebook.github.io/flux/docs/overview.html#a-single-dispatcher).

>The dispatcher is the central hub that manages all data flow in a Flux
application. It is essentially a registry of callbacks into the stores and
has no real intelligence of its own — it is a simple mechanism for distributing
the actions to the stores. Each store registers itself and provides a callback.
When an action creator provides the dispatcher with a new action, all stores
in the application receive the action via the callbacks in the registry.

## How we handle and view the dispatcher

The dispatcher is the key to Flux. The FluxThis dispatcher is basically the same
as Facebook's dispatcher, only a little more locked down. For example, all
actions dispatched by the FluxThis dispatcher are deeply frozen with
`Object.freeze` to protect them from mutation in store handlers. Our dispatcher
also has a little bit extra to allow for rich debugging to the Flux cycle.

Unless you're planning on extending our dispatcher, you won't ever need to
require it. Every FluxThis component knows about the dispatcher singleton
internally.

However, if you're integrating FluxThis in to an existing project, you can
require our dispatcher instance at `fluxthis/src/distpatcherInstance.js` and
drop it in your code to replace your current dispatcher.
