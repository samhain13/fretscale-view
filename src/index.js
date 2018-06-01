import React from 'react'
import ReactDOM from 'react-dom'
import {PITCH_NAMES, FORMULAE} from './fretscale-constants.js'
import './index.css'

class InstrumentString extends React.Component {
  getFretClassName (pitchName) {
    let index = this.props.app.state.active_pitches.indexOf(pitchName)
    if (index === 0) {
      return 'root-pitch'
    } else if (index > 0) {
      return 'active-pitch'
    } else {
      return 'inactive-pitch'
    }
  }

  renderTuner (pitchName, fretIndex, index) {
    let trueIndex = this.props.app.state.tuning.length - index - 1

    return (
      <form action='.' method='get' className='tuner-form'>
        <select
          id={'tuner-' + trueIndex}
          name='tuner'
          value={pitchName}
          onChange={() => {}} // Just to get rid of the warning.
        >
          {PITCH_NAMES.map((name, pitchIndex) =>
            <option
              key={pitchIndex}
              onClick={
                () => this.props.app.applyTuning(trueIndex, name)
              }
            >
              {name}
            </option>
          )}
        </select>
        <input
          type='button'
          value='X'
          onClick={
            () => this.props.app.removeTuning(trueIndex)
          }
        />
      </form>
    )
  }

  render () {
    let frets = this.props.app.getPitchArray(this.props.pitch)

    return (
      <tr key={'string-' + this.props.index}>
        {frets.map((pitchName, fretIndex) =>
          <td
            key={'fret-' + this.props.index + '-' + fretIndex}
            className={this.getFretClassName(pitchName)}
          >
            {
              (fretIndex === 0)
                ? this.renderTuner(pitchName, fretIndex, this.props.index)
                : pitchName
            }
          </td>
        )}
      </tr>
    )
  }
}

class Fretboard extends React.Component {
  getMarkerValue (fretNumber, isInsert) {
    if ([3, 5, 7, 9].indexOf(fretNumber) >= 0) {
      return '•'
    } else if (fretNumber === 12) {
      return '••'
    } else if (fretNumber === 0) {
      return this.renderMarkerForm(isInsert)
    } else {
      return ''
    }
  }

  renderMarkerForm (isInsert) {
    return (
      <form action='.' method='get' className='tuner-form'>
        <select
          id={'tuner-' + (isInsert) ? 'insert' : 'append'}
          name='tuner'
        >
          {PITCH_NAMES.map((name, pitchIndex) =>
            <option
              key={pitchIndex}
              onClick={
                () => this.props.app.addTuning(name, isInsert)
              }
            >
              {'Add string: ' + name}
            </option>
          )}
        </select>
      </form>
    )
  }

  renderMarkers (isInsert) {
    let frets = Array(Number(this.props.app.props.show_frets)).fill(null)

    return (
      <tr>
        {frets.map((value, index) =>
          <td key={index} className='fret-marker'>
            {this.getMarkerValue(index, isInsert)}
          </td>
        )}
      </tr>
    )
  }

  render () {
    let strings = this.props.app.state.tuning.slice().reverse()
    let stringComponents = []
    for (let i = 0; i < strings.length; i++) {
      stringComponents.push(
        <InstrumentString
          key={'string-' + i}
          app={this.props.app}
          pitch={strings[i]}
          index={i}
        />
      )
    }

    return (
      <section id='fretboard'>
        <h2>
          <small>Fretboard</small>
          <br />
          {this.props.fretboard_title}
        </h2>
        <table>
          <tbody>
            {this.renderMarkers(false)}
            {stringComponents}
            {this.renderMarkers(true)}
          </tbody>
        </table>
      </section>
    )
  }
}

class KeyModeSettings extends React.Component {
  render () {
    return (
      <section id='key-settings'>
        <h2>Key/Mode Settings</h2>
        <form action='.' method='get'>
          <div className='form-group'>
            <label htmlFor='choose-Key'>Key</label>
            <br />
            <select id='choose-key' name='choose-key'>
              {PITCH_NAMES.map((name, index) =>
                <option
                  key={index}
                  onClick={
                    () => this.props.app.applyPitchNameSettings(index)
                  }
                >
                  {name}
                </option>
              )}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='choose-mode'>Mode</label>
            <br />
            <select id='choose-mode' name='choose-mode'>
              {FORMULAE.map((item, index) =>
                <option
                  key={index}
                  onClick={
                    () => this.props.app.applyKeyModeSettings(item)
                  }
                >
                  {item.name}
                </option>
              )}
            </select>
          </div>
        </form>
      </section>
    )
  }
}

class FretScaleApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active_pitches: [],
      key_mode: FORMULAE[0],
      pitch_name: PITCH_NAMES[0],
      tuning: ['E', 'A', 'D', 'G', 'B', 'E']
    }
  }

  addTuning (pitchName, isInsert) {
    let tuning = this.state.tuning.slice()
    if (isInsert) {
      tuning.unshift(pitchName)
    } else {
      tuning.push(pitchName)
    }
    this.setState({tuning: tuning})
  }

  applyKeyModeSettings (formula) {
    this.setState({
      active_pitches: this.getActivePitches(
        this.state.pitch_name,
        formula
      ),
      key_mode: formula
    })
  }

  applyPitchNameSettings (index) {
    this.setState({
      active_pitches: this.getActivePitches(
        PITCH_NAMES[index],
        this.state.key_mode
      ),
      pitch_name: PITCH_NAMES[index]
    })
  }

  applyTuning (index, pitchName) {
    let tuning = this.state.tuning.slice()
    tuning[index] = pitchName
    this.setState({tuning: tuning})
  }

  componentDidMount () {
    this.setState({
      active_pitches: this.getActivePitches(
        this.state.pitch_name,
        this.state.key_mode
      )
    })
  }

  getActivePitches (pitchName, formula) {
    let pitches = this.getPitchArray(pitchName)
    let activePitches = []
    for (let i = 0; i < formula.items.length; i++) {
      activePitches.push(pitches[formula.items[i]])
    }
    return activePitches
  }

  getPitchArray (pitchName) {
    let pitches = []
    let limit = PITCH_NAMES.length
    let j = PITCH_NAMES.indexOf(pitchName)
    for (let i = 0; i < this.props.show_frets; i++) {
      let num = i + j
      if (num >= limit) num = num - limit
      pitches.push(PITCH_NAMES[num])
    }
    return pitches
  }

  removeTuning (index) {
    let tuning = this.state.tuning.slice()
    tuning.splice(index, 1)
    this.setState({tuning: tuning})
  }

  render () {
    return (
      <div id='fretscale-app'>
        <Fretboard
          app={this}
          fretboard_title={
            this.state.pitch_name + ' ' + this.state.key_mode.name
          }
        />
        <KeyModeSettings app={this} />
      </div>
    )
  }
}

ReactDOM.render(
  <FretScaleApp
    show_frets='13'
  />,
  document.getElementById('root')
)
