import React, {Component} from 'react'
import {getFormulaOptions, getPitchOptions} from './fretscale-constants'

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
            {getPitchOptions('pitch-names-')}
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
            {getFormulaOptions('mode-formula-')}
          </select>
        </div>
      </form>
    )
  }
}

export {ViewModeSettings, KeyModeSettings}
