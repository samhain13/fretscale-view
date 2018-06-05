import React, {Component} from 'react'
import {PITCH_NAMES, getPitchOptions} from './fretscale-constants'

class InstrumentMarkers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_pitch: PITCH_NAMES[0]
    }
  }

  getFretValue (index) {
    if (index === 0) {
      return this.getTunerForm()
    } else if (index === 12) {
      return <strong>••</strong>
    } else if ([3, 5, 7, 9].indexOf(index) >= 0) {
      return <strong>•</strong>
    } else {
      return ' '
    }
  }

  getTunerForm () {
    return (
      <form className='tuner-form'>
        <select
          defaultValue='0'
          onChange={this.handleAddString.bind(this)}
        >
          {getPitchOptions('tune-' + this.props.string_index + '-')}
        </select>
        <input
          type='button'
          value={(this.props.is_insert) ? '▲' : '▼'}
          onClick={() => this.insertString()}
        />
      </form>
    )
  }

  handleAddString (event) {
    let pitchName = PITCH_NAMES[Number(event.target.value)]
    this.setState({current_pitch: pitchName})
  }

  insertString () {
    this.props.insert_string(this.props.is_insert, this.state.current_pitch)
  }

  renderFrets () {
    let frets = []
    for (let i = 0; i < this.props.frets + 1; i++) {
      frets.push(
        <li
          key={((this.props.is_insert) ? 'top-marker-' : 'bottom-marker-') + i}
          className='inactive-pitch'
        >
          {this.getFretValue(i)}
        </li>
      )
    }
    return frets
  }

  render () {
    return (
      <ol className='instrument-markers'>
        {this.renderFrets()}
      </ol>
    )
  }
}

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

  getTunerForm (currentPitchIndex) {
    return (
      <form className='tuner-form'>
        <input
          onClick={() => this.props.remove_string(this.props.string_index)}
          type='button'
          value='◀'
        />
        <select
          value={currentPitchIndex}
          onChange={this.handleTuningChange.bind(this)}
        >
          {getPitchOptions('tune-' + this.props.string_index + '-')}
        </select>
      </form>
    )
  }

  handleTuningChange (event) {
    this.props.set_tuning(Number(event.target.value), this.props.string_index)
  }

  renderFrets () {
    let startIndex = PITCH_NAMES.indexOf(this.props.root)
    let frets = []
    for (let i = 0; i < this.props.frets + 1; i++) {
      let pitchIndex = i + startIndex
      if (pitchIndex >= PITCH_NAMES.length) {
        pitchIndex -= PITCH_NAMES.length
      }
      let pitchName = PITCH_NAMES[pitchIndex]
      frets.push(
        <li
          key={this.props.key_string + '-' + i}
          className={this.getFretClass(pitchName)}
        >
          {(i > 0) ? pitchName : this.getTunerForm(startIndex)}
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
  renderMarkers (isInsert) {
    return (
      <InstrumentMarkers
        frets={this.props.frets}
        insert_string={this.props.insert_string}
        is_insert={isInsert}
      />
    )
  }

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
          {this.renderMarkers(false)}
          {this.renderStrings()}
          {this.renderMarkers(true)}
        </div>
      </section>
    )
  }
}

export {Fretboard}
