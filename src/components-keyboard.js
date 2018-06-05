import React, {Component} from 'react'
import {PITCH_NAMES} from './fretscale-constants'

class Keyboard extends Component {
  renderKeys() {
    let keys = []
    var pitchIndex = 0
    var lastPitch = ''
    for (let i = 0; i < this.props.keys; i++) {
      let pitchName = PITCH_NAMES[pitchIndex]

      let classNames = []
      if (pitchName.indexOf('#') >= 0) {
        classNames.push('key-ebony')
      } else {
        classNames.push('key-ivory')
      }

      let pitchNameValidIndex = this.props.valid_notes.indexOf(pitchName)
      if (pitchNameValidIndex === 0) {
        classNames.push('root-pitch')
      } else if (pitchNameValidIndex < 0) {
        classNames.push('inactive-pitch')
      } else {
        classNames.push('active-pitch')
      }

      if (lastPitch.indexOf('#') >= 0) {
        classNames.push('pull-left')
      }

      keys.push(
        <li
          className={classNames.join(' ')}
          key={'keyboard-key-' + i}
        >
          {pitchName}
        </li>
      )

      if (pitchIndex === PITCH_NAMES.length - 1) {
        pitchIndex = 0
      } else {
        pitchIndex ++
      }

      lastPitch = pitchName
    }
    return keys
  }

  render () {
    return (
      <section>
        <h2>
          <small>Keyboard</small>
          <br />
          {this.props.title}
        </h2>
        <ol id='keyboard'>
          {this.renderKeys()}
        </ol>
      </section>
    )
  }
}

export {Keyboard}
