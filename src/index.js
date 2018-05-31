import React from 'react';
import ReactDOM from 'react-dom';
import {PITCH_NAMES} from './fretscale-constants.js';
import {FORMULAE} from './fretscale-constants.js';
import './index.css';


class Fretboard extends React.Component {
    render() {
        return(
            <section id="fretboard">
                <h2>
                    <small>Fretboard</small>
                    <br />
                    {this.props.fretboard_title}
                </h2>
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
                <form action="." method="get">
                    <select id="choose-pitch" name="choose-pitch">
                    {PITCH_NAMES.map((name, index) =>
                        <option
                            key={index}
                            onClick={() => this.props.app.applyPitchNameSettings(index)}>
                            {name}
                        </option>
                    )}
                    </select>
                    <select id="choose-mode" name="choose-mode">
                    {FORMULAE.map((item, index) => 
                        <option
                            key={index}
                            onClick={() => this.props.app.applyKeyModeSettings(item)}>
                            {item.name}
                        </option>
                     )}
                    </select>
                 </form>
            </section>
        );
    }
}


class FretScaleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch_index: 0,
            pitch_name: PITCH_NAMES[0],
            key_mode: FORMULAE[0],
            tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
        }
    }
    
    applyKeyModeSettings(formula) {
        this.setState({key_mode: formula});
    }
    
    applyPitchNameSettings(index) {
        this.setState({
            pitch_index: index,
            pitch_name: PITCH_NAMES[index],
        })
    }

    render() {
        return(
            <div id="fretscale-app">
                <Fretboard
                    app={this}
                    fretboard_title={
                        this.state.pitch_name + ' ' + this.state.key_mode.name
                    }
                />
                <Tuning
                    app={this}
                />
                <KeyModeSettings
                    app={this}
                />
            </div>
        );
    }
}


ReactDOM.render(
    <FretScaleApp />,
    document.getElementById('root')
);
