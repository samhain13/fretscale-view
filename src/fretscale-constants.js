import React from 'react'

const PITCH_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const FORMULAE = [
  {
    'name': 'Ionian Mode / Major',
    'items': [0, 2, 4, 5, 7, 9, 11]
  },
  {
    'name': 'Dorian Mode',
    'items': [0, 2, 3, 5, 7, 9, 10]
  },
  {
    'name': 'Phrygian Mode',
    'items': [0, 1, 3, 5, 7, 8, 10]
  },
  {
    'name': 'Lydian Mode',
    'items': [0, 2, 4, 6, 7, 9, 11]
  },
  {
    'name': 'Mixolydian Mode',
    'items': [0, 2, 4, 5, 7, 9, 10]
  },
  {
    'name': 'Aeolian / Natural Minor',
    'items': [0, 2, 3, 5, 7, 8, 10]
  },
  {
    'name': 'Locrian Mode',
    'items': [0, 1, 3, 5, 6, 8, 10]
  },
  {
    'name': 'Harmonic Minor',
    'items': [0, 2, 3, 5, 7, 8, 11]
  },
  {
    'name': 'Jazz Minor',
    'items': [0, 2, 3, 5, 7, 9, 11]
  },
  {
    'name': 'Blues / Minor Pentatonic',
    'items': [0, 3, 5, 7, 10]
  }
]

function getFormulaOptions (keyPrefix) {
  let options = FORMULAE.map((formula, index) => {
    return (
      <option
        key={keyPrefix + index}
        value={index}
      >
        {formula.name}
      </option>
    )
  })
  return options
}

function getPitchOptions (keyPrefix) {
  let options = PITCH_NAMES.map((pitchName, index) => {
    return (
      <option
        key={keyPrefix + '-' + index}
        value={index}
      >
        {pitchName}
      </option>
    )
  })
  return options
}

export {PITCH_NAMES, FORMULAE, getFormulaOptions, getPitchOptions}
