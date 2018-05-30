import React from 'react';
import ReactDOM from 'react-dom';
import {PITCH_NAMES} from './fretscale-constants.js';
import {FORMULAE} from './fretscale-constants.js';
import './index.css';


class FretScale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch: PITCH_NAMES[0],
            key_mode: FORMULAE[0],
        }
    }

    render() {
        return(
            <div>
                <section id="fretboard">
                    <h2>Fretboard</h2>
                </section>
                
                <section id="tuning">
                    <h2>Tuning</h2>
                </section>
                
                <section id="key-settings">
                    <h2>Key/Mode Settings</h2>
                </section>
            </div>
        )
    }
}


ReactDOM.render(
    <FretScale />,
    document.getElementById('root')
);
