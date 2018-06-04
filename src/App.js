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
      view_title: 'No Key/Mode Selected'
    }
  }

  getAppModeComponent (appMode) {
    if (this.state.app_mode === 'fretboard') {
      return <Fretboard
        title={this.getViewModeTitle()}
      />
    } else if (this.state.app_mode === 'keyboard') {
      return <Keyboard
        title={this.getViewModeTitle()}
      />
    } else {
      return ''
    }
  }

  getViewModeTitle () {
    return (
      PITCH_NAMES[this.state.current_pitch] + ' ' +
      FORMULAE[this.state.current_formula].name
    )
  }

  setAppMode (appMode) {
    this.setState({app_mode: appMode})
  }

  setFormula (formulaIndex) {
    this.setState({current_formula: formulaIndex})
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
