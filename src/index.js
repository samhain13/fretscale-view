import React from 'react';
import ReactDOM from 'react-dom';
import {PITCH_NAMES} from './fretscale-constants.js';
import {FORMULAE} from './fretscale-constants.js';
import './index.css';


class Fretboard extends React.Component {
    render() {
        return(
            <section id="fretboard">
                <h2>Fretboard</h2>
            </section>
        );
    }
}


class Tuning extends React.Component {
    render() {
        return(
            <section id="tuning">
                <h2>Tuning</h2>
            </section>
        );
    }
}


class KeyModeSettings extends React.Component {
    render() {
        return (
            <section id="key-settings">
                <h2>Key/Mode Settings</h2>
            </section>
        );
    }
}


class FretScaleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch: PITCH_NAMES[0],
            key_mode: FORMULAE[0],
            tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
        }
    }

    render() {
        return(
            <div id="fretscale-app">
                <Fretboard />
                <Tuning />
                <KeyModeSettings />
            </div>
        );
    }
}


ReactDOM.render(
    <FretScaleApp />,
    document.getElementById('root')
);
