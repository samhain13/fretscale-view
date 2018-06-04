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
          {(i > 0) ? pitchName : 'working on it...'}
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
