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

require('css/logo.css');

export default React.createClass({
    displayName: 'FluxThisLogo',
    interval: null,
    getInitialState () {
        return {visibleClass: 'show-front'};
    },
    getNextVisibleClass () {
        let classes = [
            'show-front',
            'show-back',
            'show-left',
            'show-right',
            'show-top',
            'show-bottom'
        ];

        let index = null;
        while (index === null || classes[index] === this.state.visibleClass) {
            index = Math.floor(Math.random() * classes.length);
        }

        return classes[index];
    },
    componentDidMount () {
        let ctx = this;
        this.interval = setInterval(() => {
            ctx.setState({visibleClass: ctx.getNextVisibleClass()});
        }, 1000);
    },
    componentWillUnmount () {
        clearInterval(this.interval);
    },
    render () {
        return (
            <div id='cube' className={this.state.visibleClass}>
                <figure className='front'></figure>
                <figure className='back'></figure>
                <figure className='right'></figure>
                <figure className='left'></figure>
                <figure className='top'></figure>
                <figure className='bottom'></figure>
            </div>
        );
    }
});
