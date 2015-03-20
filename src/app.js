'use strict';

const React = require('react');
const Router = require('react-router');
const routes = require('router/routes');

if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}

Router.run(routes, Handler => {
    React.render(<Handler />, document.getElementById('root'));
});