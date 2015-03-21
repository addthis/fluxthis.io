/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, Redirect, DefaultRoute} = Router;

const NavBar = require('components/NavBar');
const MainPage = require('components/MainPage');

const DocsNav = require('components/docs/DocsNav');
const MarkdownComponent = require('components/MarkdownComponent');

export default (
    <Route handler={NavBar}>
        <DefaultRoute handler={MainPage}/>

        <Route name='docs' handler={DocsNav}>
            <Route name='about' handler={MarkdownComponent}/>

            <Route name='quick-start' handler={MarkdownComponent}/>
            <Route name='installation' handler={MarkdownComponent}/>
            <Route name='examples' handler={MarkdownComponent}/>

            <Route name='dispatcher' handler={MarkdownComponent}/>
            <Route name='controller-views' handler={MarkdownComponent}/>
            <Route name='stores' handler={MarkdownComponent}/>
            <Route name='action-creators' handler={MarkdownComponent}/>
            <Route name='constant-collections' handler={MarkdownComponent}/>

            <Route name='debugging' handler={MarkdownComponent}/>
            <Route name='testing' handler={MarkdownComponent}/>
            <Route name='invariants' handler={MarkdownComponent}/>

            <Route name='development' handler={MarkdownComponent}/>
        </Route>
    </Route>
);