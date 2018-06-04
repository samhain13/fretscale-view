import React, {Component} from 'react'
import {PITCH_NAMES, FORMULAE} from './fretscale-constants'

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
  handleFormulaChange (event) {
    this.props.setFormula(Number(event.target.value))
  }

  handlePitchChange (event) {
    this.props.setPitch(Number(event.target.value))
  }

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
            value={this.props.current_pitch}
            onChange={this.handlePitchChange.bind(this)}
          >
            {PITCH_NAMES.map((pitchName, index) =>
              <option
                key={'pitch-names-' + index}
                value={index}
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
            value={this.props.current_formula}
            onChange={this.handleFormulaChange.bind(this)}
          >
            {FORMULAE.map((formula, index) =>
              <option
                key={'mode-forumla-' + index}
                value={index}
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

export {ViewModeSettings, KeyModeSettings}
