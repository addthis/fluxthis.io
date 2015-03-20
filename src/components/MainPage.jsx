'use strict';

const React = require('react');
const RotatingCube = require('./logo/RotatingCube');

export default React.createClass({
    displayName: '',
    render() {
        return (
            <div>
                <section className={'container'}>
                    <span style={{
                        position: 'relative',
                        top: '110px'
                    }}>
                        <span style={{
                            fontStyle: 'italic',
                            fontFamily: 'cursive'
                        }}>
							{'f'}
                        </span>
                        <span style={{
                            fontFamily: '"Times new roman", serif'
                        }}>
							{'luxthis'}
                        </span>
                    </span>
                    <RotatingCube/>
                    <RotatingCube/>
                </section>
            </div>
        );
    }
});