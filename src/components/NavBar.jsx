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
const {Route, DefaultRoute, RouteHandler, Link} = Router;

require('css/navbar.css');

export default React.createClass({
    displayName: 'MainPage',
    mixins: [Router.State],
    render() {
        // Don't show the navbar brand on the home page
        // since we have it shown in big ole letters.
        let navbarBrand = this.getPath() === '/' ? null :
            (<a className='navbar-brand' href='#'>FluxThis</a>);
        let isDocsPage = this.getPath().startsWith('/docs');

        return  (
            <div>
                <nav className='navbar navbar-default'>
                    <div className='container-fluid'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
                            {navbarBrand}
                        </div>
                        <div id='navbar' className='navbar-collapse collapse'>
                            <ul className='nav navbar-nav navbar-right'>
                                <li><Link className={isDocsPage ? 'active' : ''} to='about'>Documentation</Link></li>
                                <li><a target="_blank" href='https://github.com/addthis/fluxthis/issues'>Support</a></li>
                                <li><a target="_blank" href='https://github.com/addthis/fluxthis'>Github</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});