import React, {Component} from 'react'
import {PITCH_NAMES} from './fretscale-constants'

class InstrumentString extends Component {
  getFretClass (pitchName) {
    let index = this.props.valid_notes.indexOf(pitchName)
    if (index === 0) {
      return 'root-pitch'
    } else if (index > 0) {
      return 'active-pitch'
    } else {
      return 'inactive-pitch'
    }
  }

  getTunerForm (current_pitch_index) {
    return (
      <form className='tuner-form'>
        <input
          onClick={() => this.props.remove_string(this.props.string_index)}
          type='button'
          value='X'
        />
        <select
          value={current_pitch_index}
          onChange={this.handleTuningChange.bind(this)}
        >
          {PITCH_NAMES.map((pitchName, index) => {
            return (
              <option
                key={'tune-' + this.props.string_index + '-' + index}
                value={index}
              >
                {pitchName}
              </option>
            )
          })}
        </select>
      </form>
    )
  }

  handleTuningChange (event) {
    this.props.set_tuning(Number(event.target.value), this.props.string_index)
  }

  renderFrets () {
    let start_index = PITCH_NAMES.indexOf(this.props.root)
    let frets = []
    for (let i = 0; i < this.props.frets + 1; i++) {
      let pitchIndex = i + start_index
      if (pitchIndex >= PITCH_NAMES.length) {
        pitchIndex -= PITCH_NAMES.length
      }
      let pitchName = PITCH_NAMES[pitchIndex]
      frets.push(
        <li
          key={this.props.key_string + '-' + i}
          className={this.getFretClass(pitchName)}
        >
          {(i > 0) ? pitchName : this.getTunerForm(start_index)}
        </li>
      )
    }
    return frets
  }

  render () {
    return (
      <ol className='instrument-string'>
        {this.renderFrets()}
      </ol>
    )
  }
}

class Fretboard extends Component {
  renderStrings () {
    let renderedStrings = []
    let strings = this.props.tuning.reverse()
    for (let i = 0; i < strings.length; i++) {
      renderedStrings.push(
        <InstrumentString
          frets={this.props.frets}
          key={'fret-string-' + i}
          key_string={'fret-string-' + i}
          root={strings[i]}
          remove_string={this.props.remove_string}
          set_tuning={this.props.set_tuning}
          string_index={strings.length - i - 1}
          valid_notes={this.props.valid_notes}
        />
      )
    }
    return renderedStrings
  }

  render () {
    return (
      <section>
        <h2>
          <small>Keyboard</small>
          <br />
          {this.props.title}
        </h2>
        <div id='fretboard'>
          {this.renderStrings()}
        </div>
      </section>
    )
  }
}

export {Fretboard}
