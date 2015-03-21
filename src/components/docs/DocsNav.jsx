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

require('css/side-navbar.css');

export default React.createClass({
    displayName: 'DocsNav',
    mixins: [Router.State],
    render() {
        return (
            <div className='row docs-container'>
                <div className='col-sm-1'/>
                <div className='col-sm-2'>
                    <ul id='sidebar' className='nav nav-stacked'>

                        <li><Link to='about'>About</Link></li>
                        <li><Link to='quick-start'>Quick Start</Link></li>
                        <li><Link to='installation'>Installation</Link></li>
                        <li><Link to='examples'>Examples</Link></li>

                        <li className="divider"></li>

                        <li><Link to='controller-views'>Controller Views</Link></li>
                        <li><Link to='stores'>Stores</Link></li>
                        <li><Link to='action-creators'>Action Creators</Link></li>
                        <li><Link to='constant-collections'>Constant Collections</Link></li>

                        <li className="divider"></li>

                        <li><Link to='debugging'>Debugging</Link></li>
                        <li><Link to='testing'>Test Utils</Link></li>
                        <li><Link to='invariants'>Invariants Explained</Link></li>

                        <li className="divider"></li>

                        <li><Link to='development'>Development</Link></li>
                    </ul>
                </div>
                <div className='col-sm-6'>
                    <RouteHandler {...this.props} />
                </div>
                <div className='col-sm-3'/>
            </div>
        );
    }
});