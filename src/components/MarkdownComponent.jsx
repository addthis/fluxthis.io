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
const $ = require('jquery');
const hljs = require('highlight.js');

const MARKDOWN_LOOKUP = {
    'about': require('about.md'),

    'quick-start': require('quick-start.md'),
    'installation': require('installation.md'),

    'dispatcher': require('dispatcher.md'),
    'controller-views': require('controller-views.md'),
    'immutable-stores': require('immutable-stores.md'),
    'oo-stores': require('oo-stores.md'),
    'action-creators': require('action-creators.md'),
    'api-action-creators': require('api-action-creators.md'),
    'constant-collections': require('constant-collections.md'),
    'router': require('router.md'),

    'debugging': require('debugging.md'),
    'testing': require('testing.md'),
    'invariants': require('invariants.md'),

    'development': require('development.md')
};

const TITLE_LOOKUP = {
    'about': 'About',
    'quick-start': 'Quick Start',
    'installation': 'Installation',

    'dispatcher': 'Dispatcher',
    'controller-views': 'Controller Views',
    'immutable-stores': 'Immutable Stores',
    'oo-stores': 'Non-Immutable Stores',
    'action-creators': 'Action Creators',
    'api-action-creators': 'API Action Creators',
    'constant-collections': 'Constant Collections',
    'router': 'Router',

    'debugging': 'Debugging',
    'testing': 'Testing',
    'invariants': 'Invariants',

    'development': 'Development'
};

export default React.createClass({
    displayName: 'MarkdownComponent',
    mixins: [Router.State],
    highlightCode() {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    },
    componentDidMount() {
        this.highlightCode();
    },
    componentDidUpdate() {
        this.highlightCode();
    },
    render() {
        const pathName = this.getPath();
        const fileName = pathName.substring(pathName.lastIndexOf('/') + 1);

        const html = MARKDOWN_LOOKUP[fileName];
        document.title = 'FluxThis | ' + TITLE_LOOKUP[fileName];


        return (
            <div dangerouslySetInnerHTML={{__html: html}}
                className='markdown-body'
            />
        );
    }
});