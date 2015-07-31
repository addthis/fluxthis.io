# About

The super-opinionated, yell-at-you-for-everything, immutable Flux framework by
AddThis.

## High Level Objectives

1. Enforce Flux design patterns
2. Make debugging extremely easy
3. Reduce boilerplate and create simple modular apis
4. Allow individual modules to be used standalone

## Motivation

One of the great things about React is how strict it is. If you do something
wrong, 9 times out of 10 you will be assaulted by `invariant` exceptions. This
kind of attitude keeps bad code from taking over your codebase.

Flux is a great design pattern, but following patterns is a matter of
convention, and conventions are easy to break. FluxThis takes the pattern and
turns it into a super-strict framework, to help large teams of devs avoid bad
practices, and write sustainable, bug-free code.

We use FluxThis in production across multiple teams and have found that
these imposed restrictions on convention truly do help reduce code smell,
and increase productivity and quality.

## Migration (made easy)

We realize that most of the people using Flux are using Facebook's dispatcher boilerplate code,
which we were using prior to FluxThis. Because of this, we made sure that FluxThis was completely
backwards compatible for easy transitions. All you need to do is simply drop in our
[dispatcher](/#/docs/dispatcher) and you are good to go! Sadly however, you will not reap
all the benefits of debugging and testing until your migrate your application to FluxThis
fully.

## Flux

Flux is the application architecture that Facebook, AddThis, and many other
companies use for building client-side web applications. It complements React's
composable view components by utilizing a unidirectional data flow.
It's more of a pattern rather than a formal framework, and you can
start using Flux immediately without a lot of new code.
[credit](https://facebook.github.io/flux/)

![Alt text](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png "Optional title")
