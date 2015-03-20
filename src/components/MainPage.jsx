'use strict';

const React = require('react');
const RotatingCube = require('./logo/RotatingCube');
const html = require('main.md');

require('css/main.css');


export default React.createClass({
    displayName: '',
    render() {
        return (
            <div>
                <section className={'jumbotron'}>
                    <div className={'container main-container'}>
                        <h1 className={'lead'}>FluxThis</h1>
                        <p className={'lead'}>
                            The super-opinionated, yell-at-you-for-everything, immutable Flux framework by AddThis.
                        </p>
                        <p className={'lead get-started-btn'}>
                            <a
                                href="#/docs"
                                className="btn btn-outline-inverse btn-lg">
                                Get Started
                            </a>
                        </p>
                    </div>
                </section>
                <div
                    dangerouslySetInnerHTML={{__html: html}}
                    className='markdown-body'/>
            </div>
        );
    }
});