var metronome = {
	on: false,
	current_beat: 1,
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

		while (this.on) {
			setTimeout(function() { 
				// change current beat
				this.current_beat = (this.current_beat + 1) % this.time_sig[0]
				$("#beat_count").html(this.current_beat);
				this.play_sound();
			}, (bpm / 1000));
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