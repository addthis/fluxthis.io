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
const RotatingCube = require('./logo/RotatingCube');
const html = require('main.md');

const Link = require('react-router').Link;

require('css/main.css');

export default React.createClass({
    displayName: '',
    render() {
        document.title = 'FluxThis';

        return (
            <div>
                <section className={'jumbotron'}>
                    <div className={'container main-container'}>
                        <h1>FluxThis</h1>
                        <p className={'lead'}>
                            The super-opinionated, yell-at-you-for-everything, immutable Flux framework by AddThis.
                        </p>
                        <p className={'lead get-started-btn'}>
                            <Link
                                to='about'
                                className='btn btn-outline-inverse btn-lg'>
                                Get Started
                            </Link>
                        </p>
                    </div>
                </section>

                <div dangerouslySetInnerHTML={{__html: html}}
                    className='markdown-body'/>

                <p className={'lead get-started-btn-bottom'}>
                    <Link
                        to='about'
                        className='btn btn-outline-inverse btn-lg'>
                        Get Started
                    </Link>
                </p>
            </div>
        );
    }
});