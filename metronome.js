var metronome = {
	on: false,
	current_beat: 1,
	bpm: 100,
	time_sig: [4, 4],
	subdivision: "quarter",
	sound: "clave",
	first_beat_accent: true,
	volume: 50,
	timer: [2, 30],
	start: function () {
		var on = this.on ? false : true;
		this.on = on;
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
	first_beat_accent: function() {
		var first_beat_accent = this.first_beat_accent ? false : true;
		this.first_beat_accent = first_beat_accent;
	},
	volume_level_slider: function() {

	},
	current_beat_counter: function() {
		// may not need this
	},
	timer_input: function() {
		
	}
}