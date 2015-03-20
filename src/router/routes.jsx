'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, Redirect, DefaultRoute} = Router;

const NavBar = require('components/NavBar');
const MainPage = require('components/MainPage');

const DocsMain = require('components/docs/DocsMain');
const DocsNav = require('components/docs/DocsNav');

export default (
    <Route handler={NavBar}>
        <DefaultRoute handler={MainPage}/>

        <Route name='docs' handler={DocsNav}>
            <DefaultRoute handler={DocsMain}/>
        </Route>
    </Route>
);