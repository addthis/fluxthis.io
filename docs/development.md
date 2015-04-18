# Development

So, you want to run FluxThis and squash some bugs, eh? Hopefully this
resource will help you get setup and running.

First things first, make sure you have node and npm installed.

Next you will need to make sure you have gulp installed globally:

```
npm install -g gulp
```

Now to the good stuff; you will need to get the repo. So, in your directory
of choice, run

```
git clone https://github.com/addthis/fluxthis.git

cd fluxthis

npm install
```

Whala, you have FluxThis installed and dev already built.


#### Code Quality

Please make sure you are constantly running `gulp test` to ensure you
are not breaking any tests prior to submitting a PR. TravisCI is setup
to build PRs just in case, but it's good practice.

Make sure you have adequate comments where needed & also you are following
the general code structure of the rest of the application.

We have eslint enabled on test execution and they will fail the test.
Please make sure you are following those guidelines.

#### Running Tests

Running tests is simple, simply run `gulp test` and sit back and enjoy
the magic in your favorite terminal. All our tests are done with mocha
and our API action creator tests automatically spawn a local express
server and kill it on completion.

#### Lets write some code

`gulp build-dev` will build development once, which is nice at first,
but your best friend will be `gulp watch` which will trigger a watch
task with webpack, so that you always have an up-to-date build.

#### With great power comes great responsibility

This section will only be for those select few with publishing power.

1. **Ensure you are on origin/master**
2. Increment the version number in `package.json`.
3. Run `gulp publish` to built, test, tag, and publish to npm.
4. Go grab a beer.

