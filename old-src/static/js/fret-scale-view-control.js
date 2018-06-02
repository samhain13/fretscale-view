/*
    Fret Scale View Controller
    
    Requires jQuery 3.1.1
*/

var pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var formulae = [
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


var fretboard = function(tuning) {
    /*
        @tuning, array - items from pitches; default is E, A, D, G, B, E
    */
    this.tune = function(tuning) {
        this.tuning = [];
        if (tuning) {
            var that = this;
            $.each(tuning, function() {
                p = String(this);
                if (pitches.indexOf(p) >= 0) that.tuning.push(p);
            });
        }
        // If no tuning was given or we couldn't make one, default to standard.
        if (!tuning) {
            // Because we render from top to bottom, reverse the tuning.
            this.tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
            this.tuning.reverse();
        }
    }
    
    this.render = function() {
        var p_count = pitches.length;
        var table = $('#fret-board');
        table.html('');  // Clear the fretboard display.
        this.render_markers(table, p_count);
        // Now, add the frets for each of the strings.
        $.each(this.tuning, function() {
            var row = $('<tr></tr>');
            var pitch_id = pitches.indexOf(String(this));
            for (var i=pitch_id; i<pitch_id + p_count + 1; i++) {
                var p = pitches[(i >= p_count) ? i - p_count : i];
                var col = $('<td>' + p + '</td>');
                col.data('pitch', p);
                row.append(col);
            }
            table.append(row);
        });
        this.render_markers(table, p_count);
    }
    
    this.render_markers = function(table, p_count) {
        // Create the fret markers so we know where we are.
        var row = $('<tr></tr>');
        for (var i=0; i<p_count + 1; i++) {
            var col = $('<td></td>');
            if (i == 3 | i ==5 | i == 7 | i == 9) col.text('⚫');
            if (i == 12) col.text('⚫⚫');
            row.append(col);
        }
        table.append(row);
    }
    
    // On init.
    this.tune(tuning);
}


var tuning_form = function(fretboard) {
    this.fretboard = fretboard;
    
    this.add_string = function(selected) {
        var that = this;
        var select = $('<select></select>');
        var button = $('<input type="button" value="x" />');
        $.each(pitches, function() {
            var value = String(this);
            var option = $('<option>' + String(this) + '</option>');
            if (selected) {
                if (value == selected) option.attr('selected', 'selected');
            }
            select.append(option);
        });
        button.click( function() {
            that.remove_string(this);
        });
        $('#def-tuning > div').append(select);
        $('#def-tuning > div').append(button);
        $('#def-tuning > div').append($('<br />'));
    }
    
    this.remove_string = function(button) {
        var i = -1;
        $('#def-tuning div input[type="button"]').each( function(index) {
            if (this == button) i = index;
        });
        if (i >= 0) {
            $($('#def-tuning div select')[i]).remove();
            $($('#def-tuning div br')[i]).remove();
            button.remove();
        }
    }
    
    this.render = function() {
        var that = this;
        $('#def-tuning-set').unbind('click');
        $('#def-tuning-set').click( function() { that.set_tuning(); });
        $('#def-add-string').unbind('click');
        $('#def-add-string').click( function() { that.add_string('E'); });
        $.each(this.fretboard.tuning, function() {
            that.add_string(String(this));
        });
    }
    
    this.set_tuning = function() {
        var tuning = [];
        $('#def-tuning div select').each( function() {
            tuning.push($(this).val());
        });
        this.fretboard.tune(tuning);
        this.fretboard.render();
    }
}


var key_settings = function() {

    this.render = function() {
        var that = this;
        $.each(formulae, function(index) {
            var option = $('<option>' + this['name'] + '</option>');
            if (index == 0) option.attr('selected', 'selected');
            option.attr('value', index);
            $('#def-key-preset').append(option);
        });
        $.each(pitches, function(index) {
            var option = $('<option>' + String(this) + '</option>');
            if (index == 0) option.attr('selected', 'selected');
            $('#def-key-root').append(option);
        });
        $('#def-key-root-set').click( function() { that.set_root(); });
    }
    
    this.set_root = function() {
        var pitch = $('#def-key-root').val();
        var pitch_id = pitches.indexOf(pitch);
        var preset = formulae[Number($('#def-key-preset').val())];
        var transposed = [];
        $('td').removeClass('active');
        $('td').removeClass('active-root');
        for (var i=pitch_id; i<pitch_id + pitches.length; i++) {
            var p = (i >= pitches.length) ? i - pitches.length : i;
            transposed.push(String(pitches[p]));
        }
        $.each(transposed, function(index) {
            var current = this;
            if (preset['items'].indexOf(index) >= 0) {
                $('td').each( function() {
                    var td = $(this);
                    var p = td.data('pitch');
                    if (p == current) {
                        if (index == 0) td.addClass('active-root');
                        else td.addClass('active');
                    }
                });
            }
        });
        $('h1 > span').text('for ' + pitch + ' ' + preset['name']);
    }
}


// Build the UI
var fb = new fretboard();
var ftune = new tuning_form(fb);
var fkeyset = new key_settings();


$(document).ready( function() {
    fb.render();
    ftune.render();
    fkeyset.render();
    fkeyset.set_root();
});
