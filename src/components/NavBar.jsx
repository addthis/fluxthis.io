'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute, RouteHandler, Link} = Router;

require('css/navbar.css');

export default React.createClass({
    displayName: 'MainPage',
    render() {
        return  (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">FluxThis</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="https://github.com/addthis/fluxthis/issues">Support</a></li>
                                <li><a href="https://github.com/addthis/fluxthis">Github</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});