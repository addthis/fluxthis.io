'use strict';

const React = require('react');
const Router = require('react-router');
const routes = require('router/routes');

require('quick-start.md');

if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}

Router.run(routes, Handler => {
    React.render(<Handler />, document.getElementById('root'));
});