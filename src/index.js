import React from 'react';
import ReactDOM from 'react-dom';
import {PITCH_NAMES} from './fretscale-constants.js';
import {FORMULAE} from './fretscale-constants.js';
import './index.css';


class Fretboard extends React.Component {
    getFretClassName(pitch_name) {
        let index = this.props.app.state.active_pitches.indexOf(pitch_name);
        if (index === 0) {
            return 'root-pitch';
        } else if (index > 0) {
            return 'active-pitch';
        } else {
            return 'inactive-pitch';
        }
    }
    
    getMarkerValue(fret_number) {
        if ([4, 6, 8, 10].indexOf(fret_number) >= 0) {
            return '•';
        } else if (fret_number === Number(this.props.app.props.show_frets)) {
            return '••';
        } else {
            return '';
        }
    }

    renderMarkers() {
        let frets = Array(Number(this.props.app.props.show_frets) + 1).fill(null);
        return(
            <tr>
            {frets.map((value, index) =>
                <td key={index} className='fret-marker'>
                    {this.getMarkerValue(index)}
                </td>
            )}
            </tr>
        );
    }

    renderString(pitch, index) {
        let frets = this.props.app.getPitchArray(pitch);
        return(
            <tr key={index}>
                <td>Tune</td>
            {frets.map((pitch_name, fret_index) =>
                <td
                    key={fret_index}
                    className={this.getFretClassName(pitch_name)}
                >
                    {pitch_name}
                </td>
            )}
            </tr>
        );
    }

    render() {
        let strings = this.props.app.state.tuning.slice().reverse();
        return(
            <section id="fretboard">
                <h2>
                    <small>Fretboard</small>
                    <br />
                    {this.props.fretboard_title}
                </h2>
                <table>
                    <tbody>
                    {this.renderMarkers()}
                    {strings.map((pitch, index) =>
                        this.renderString(pitch, index)
                    )}
                    {this.renderMarkers()}
                    </tbody>
                </table>
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
                    <div class="form-group">
                        <label for="choose-Key">Key</label>
                        <br />
                        <select id="choose-key" name="choose-key">
                        {PITCH_NAMES.map((name, index) =>
                            <option
                                key={index}
                                onClick={() =>
                                this.props.app.applyPitchNameSettings(index)}
                            >
                                {name}
                            </option>
                        )}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="choose-mode">Mode</label>
                        <br />
                        <select id="choose-mode" name="choose-mode">
                        {FORMULAE.map((item, index) => 
                            <option
                                key={index}
                                onClick={() =>
                                this.props.app.applyKeyModeSettings(item)}
                            >
                                {item.name}
                            </option>
                         )}
                        </select>
                    </div>
                 </form>
            </section>
        );
    }
}


class FretScaleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_pitches: [],
            key_mode: FORMULAE[0],
            pitch_name: PITCH_NAMES[0],
            tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
        }
    }
    
    applyKeyModeSettings(formula) {
        this.setState({
            active_pitches: this.getActivePitches(
                this.state.pitch_name,
                formula
            ),
            key_mode: formula
        });
    }
    
    applyPitchNameSettings(index) {
        this.setState({
            active_pitches: this.getActivePitches(
                PITCH_NAMES[index],
                this.state.key_mode
            ),
            pitch_name: PITCH_NAMES[index],
        })
    }
    
    componentDidMount() {
        this.setState({
            active_pitches: this.getActivePitches(
                this.state.pitch_name,
                this.state.key_mode
            ) 
        });
    }

    getActivePitches(pitch_name, formula) {
        let pitches = this.getPitchArray(pitch_name);
        let active_pitches = [];
        for (let i=0; i < formula.items.length; i++ ) {
            active_pitches.push(pitches[formula.items[i]]);
        }
        return active_pitches;
    }
    
    getPitchArray(pitch_name) {
        let pitches = []
        let limit = PITCH_NAMES.length;
        let j = PITCH_NAMES.indexOf(pitch_name);
        for (let i=0; i<this.props.show_frets; i++) {
            let num = i + j;
            if (num >= limit) num = num - limit;
            pitches.push(PITCH_NAMES[num]);
        }
        return pitches;
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
                <KeyModeSettings app={this} />
            </div>
        );
    }
}


ReactDOM.render(
    <FretScaleApp
        show_frets="13"
    />,
    document.getElementById('root')
);
