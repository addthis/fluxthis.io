'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute, RouteHandler, Link} = Router;

export default React.createClass({
    displayName: '',
    render() {
        return (
            <div>
                I'm the docs left nav bar
                <RouteHandler {...this.props} />
            </div>
        );
    }
});