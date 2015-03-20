
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