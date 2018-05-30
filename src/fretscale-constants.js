const PITCH_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FORMULAE = [
    {
        'name': 'Major / Ionian',
         'items': [0, 2, 4, 5, 7, 9, 11]
     },
     {
        'name': 'Natural Minor / Aeolian',
         'items': [0, 2, 3, 5, 7, 8, 10]
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
        'name': 'Locrian Mode',
         'items': [0, 1, 3, 5, 6, 8, 10]
     }
];

export {PITCH_NAMES};
export {FORMULAE};
