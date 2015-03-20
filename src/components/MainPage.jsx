'use strict';

const React = require('react');
const RotatingCube = require('./logo/RotatingCube');
const html = require('main.md');

const Link = require('react-router').Link;

require('css/main.css');

export default React.createClass({
    displayName: '',
    render() {
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