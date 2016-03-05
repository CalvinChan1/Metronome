var metronome = {
	on: false,
	current_beat: 0,
	bpm: 100,
	time_sig: [4, 4],
	subdivision: "quarter",
	sound: "clave",
	first_beat_accent: true,
	volume: 50,
	// timer in seconds
	timer: 150,
	start: function () {
		var on = this.on ? false : true;
		this.on = on;

		if (this.on) {
			var starting = setInterval(function() { 
					// change current beat
					metronome.current_beat = (metronome.current_beat + 1) % (metronome.time_sig[0])
					$("#beat_count").html(metronome.current_beat + 1);
					// this.play_sound();
			}, (60000 / metronome.bpm))
			$("#start_button").html("Stop");
		} else {
			clearTimeout(starting);
			$("#start_button").html("Start");
		}
	},
	increment_up: function() {
		this.bpm++;
	},
	increment_down: function() {
		this.bpm--;
	},
	slider_logic: function() {
		//////
	},
	time_sig_change: function() {
		// var numerator = $(document).(".numerator").val();
		// var denominator = $(document).(".denominator").val();
	},
	beat_subdivision: function(subdivision) {
		// this.subdivision
	},
	sound_selector: function() {
		// clave/click/cowbell
	},
	play_sound: function() {
		if (this.first_beat_accent && this.current_beat === 1) {
			// higher pitched sound
		} else {
			// lower pitched sound
		}
	},
	first_beat_accent: function() {
		var first_beat_accent = this.first_beat_accent ? false : true;
		this.first_beat_accent = first_beat_accent;
	},
	volume_level_slider: function() {

	},
	current_beat_counter: function() {
		
	},
	timer_input: function() {

	}
}

$(document).ready(function() {
	$("#start_button").click(function() {
		metronome.start();
	})

	$("#inc_tempo").click(function() {
		metronome.increment_up();
		$("#bpm").html(metronome.bpm + " bpm");
	})

	$("#dec_tempo").click(function() {
		metronome.increment_down();
		$("#bpm").html(metronome.bpm + " bpm");
	})
})
