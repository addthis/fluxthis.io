'use strict';

const React = require('react');
const Router = require('react-router');

const MARKDOWN_LOOKUP = {
    'about': require('about.md'),
    'quick-start': require('quick-start.md'),
    'installation': require('installation.md'),

    'controller-views': require('controller-views.md'),
    'stores': require('stores.md'),
    'action-creators': require('action-creators.md'),
    'constant-collections': require('constant-collections.md'),

    'debugging': require('debugging.md'),
    'testing': require('testing.md'),
    'invariants': require('invariants.md'),

    'development': require('development.md')
};

export default React.createClass({
    displayName: 'MarkdownComponent',
    mixins: [Router.State],
    render() {
        const pathName = this.getPath();
        const fileName = pathName.substring(pathName.lastIndexOf('/') + 1);

        const html = MARKDOWN_LOOKUP[fileName];

        return (
            <div dangerouslySetInnerHTML={{__html: html}}
                className='markdown-body'
            />
        );
    }
});