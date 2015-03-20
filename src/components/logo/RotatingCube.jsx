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
