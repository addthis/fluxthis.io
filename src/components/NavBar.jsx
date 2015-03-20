'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute, RouteHandler, Link} = Router;

export default React.createClass({
    displayName: 'MainPage',
    render() {
        return  (
            <div>
                I should be the navbar
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});