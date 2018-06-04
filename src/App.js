import React, {Component} from 'react'
import {PITCH_NAMES, FORMULAE} from './fretscale-constants'
import {Fretboard} from './components-fretboard'
import {Keyboard} from './components-keyboard'
import './index.css'

class ViewModeSettings extends Component {
  render () {
    return (
      <nav id='mode-picker'>
        <h3>Select View Mode</h3>
        {this.props.modes.map((modeName, index) =>
          <button
            key={'app-mode-' + index}
            onClick={() => this.props.onClick(modeName.toLowerCase())}
          >
            {modeName} Mode
          </button>
        )}
      </nav>
    )
  }
}

class KeyModeSettings extends Component {
  render () {
    return (
      <form>
        <h3>Select Key/Mode</h3>
        <div className='form-group'>
          <label htmlFor='pick-pitch'>
            Root/Key
          </label>
          <select
            id='pick-pitch'
          >
            {PITCH_NAMES.map((pitchName, index) =>
              <option
                key={'pitch-names-' + index}
              >
                {pitchName}
              </option>
            )}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='pick-mode'>
            Mode
          </label>
          <select
            id='pick-mode'
          >
            {FORMULAE.map((formula, index) =>
              <option
                key={'mode-forumla-' + index}
              >
                {formula.name}
              </option>
            )}
          </select>
        </div>
      </form>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      app_mode: 'fretboard',
      app_mode_choices: ['Fretboard', 'Keyboard'],
      view_title: 'No Key/Mode Selected'
    }
  }

  getAppModeComponent(appMode) {
    if (this.state.app_mode === 'fretboard') {
      return <Fretboard
        title={this.state.view_title}
      />
    } else if (this.state.app_mode === 'keyboard') {
      return <Keyboard
        title={this.state.view_title}
      />
    } else {
      return ''
    }
  }

  setAppMode (appMode) {
    this.setState({app_mode: appMode})
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
          <KeyModeSettings />
        </section>
      </div>
    )
  }
}

export default App
