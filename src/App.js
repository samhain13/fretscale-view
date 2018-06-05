import React, {Component} from 'react'
import {PITCH_NAMES, FORMULAE} from './fretscale-constants'
import {ViewModeSettings, KeyModeSettings} from './components-settings'
import {Fretboard} from './components-fretboard'
import {Keyboard} from './components-keyboard'
import './index.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      app_mode: 'fretboard',
      app_mode_choices: ['Fretboard', 'Keyboard'],
      current_pitch: 0,
      current_formula: 0,
      fretboard_frets: 12,
      fretboard_tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
      keyboard_keys: 36,
      view_title: 'No Key/Mode Selected'
    }
  }

  getAppModeComponent (appMode) {
    if (this.state.app_mode === 'fretboard') {
      return <Fretboard
        frets={this.state.fretboard_frets}
        insert_string={
          (isInsert, pitchName) =>
            this.insertString(isInsert, pitchName)
        }
        remove_string={(stringIndex) => this.removeString(stringIndex)}
        set_tuning={
          (pitchIndex, stringIndex) =>
            this.setStringTuning(pitchIndex, stringIndex)
        }
        title={this.getViewModeTitle()}
        tuning={this.state.fretboard_tuning.slice()}
        valid_notes={this.getValidNotes()}
      />
    } else if (this.state.app_mode === 'keyboard') {
      return <Keyboard
        keys={this.state.keyboard_keys}
        title={this.getViewModeTitle()}
        valid_notes={this.getValidNotes()}
      />
    } else {
      return ''
    }
  }

  getValidNotes () {
    let items = FORMULAE[this.state.current_formula].items
    let transposed = []
    let validNotes = []
    for (let i = 0; i < PITCH_NAMES.length; i++) {
      let pitchIndex = i + this.state.current_pitch
      if (pitchIndex >= PITCH_NAMES.length) {
        pitchIndex -= PITCH_NAMES.length
      }
      transposed.push(PITCH_NAMES[pitchIndex])
    }
    for (let i = 0; i < items.length; i++) {
      validNotes.push(transposed[items[i]])
    }
    return validNotes
  }

  getViewModeTitle () {
    return (
      PITCH_NAMES[this.state.current_pitch] + ' ' +
      FORMULAE[this.state.current_formula].name
    )
  }

  insertString (isInsert, pitchName) {
    console.log(pitchName)
    let tuning = this.state.fretboard_tuning.slice()
    if (isInsert) {
      tuning.splice(0, 0, pitchName)
    } else {
      tuning.push(pitchName)
    }
    this.setState({fretboard_tuning: tuning})
  }

  removeString (stringIndex) {
    let tuning = this.state.fretboard_tuning.slice()
    tuning.splice(stringIndex, 1)
    this.setState({fretboard_tuning: tuning})
  }

  setAppMode (appMode) {
    this.setState({app_mode: appMode})
  }

  setFormula (formulaIndex) {
    this.setState({current_formula: formulaIndex})
  }

  setStringTuning (pitchIndex, stringIndex) {
    let tuning = this.state.fretboard_tuning.slice()
    tuning[stringIndex] = PITCH_NAMES[pitchIndex]
    this.setState({fretboard_tuning: tuning})
  }

  setPitch (pitchIndex) {
    this.setState({current_pitch: pitchIndex})
  }

  render () {
    return (
      <div className='app'>
        {this.getAppModeComponent()}
        <section id='app-settings'>
          <h2>App Settings</h2>
          <ViewModeSettings
            modes={this.state.app_mode_choices}
            onClick={(appMode) => this.setAppMode(appMode)}
          />
          <KeyModeSettings
            current_formula={this.state.current_forumla}
            current_pitch={this.state.current_pitch}
            setFormula={(formulaIndex) => this.setFormula(formulaIndex)}
            setPitch={(pitchIndex) => this.setPitch(pitchIndex)}
          />
        </section>
      </div>
    )
  }
}

export default App
