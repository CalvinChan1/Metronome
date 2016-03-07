var metronome = {
	on: false,
	current_beat: 0,
	bpm: 200,
	time_sig: [4, 4],
	subdivision: "quarter",
	sound: "clave",
	first_beat_accent: true,
	volume: 50,
	// timer in seconds
	timer: 150,
	clicks: false,
	start: function () {
		this.on = this.on ? false : true;

		if (this.on) {
			clearInterval(this.clicks);

			this.reset_current_beat();
			this.initate_click();

			$("#start_button").html("Stop");
		} else {
			clearInterval(this.clicks);

			this.reset_current_beat();
			
			$("#start_button").html("Start");
		}
	},
	initate_click: function() {
		if (this.on) {
			this.clicks = setInterval(function() {
				// change current beat
				metronome.current_beat = (metronome.current_beat + 1) % (metronome.time_sig[0])
				$("#beat_count").html(metronome.current_beat + 1);

				// this.play_sound();
			}, (60000 / metronome.bpm))
		}
	},
	increment_bpm: function (adjustBpm) {
		(adjustBpm === "inc") ? this.bpm++ : this.bpm--;

		clearInterval(this.clicks);

		this.reset_current_beat();
		this.initate_click();
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
	reset_current_beat: function() {
		this.current_beat = 0;
		$("#beat_count").html("1");
	},
	play_sound: function() {
		if (this.first_beat_accent && this.current_beat === 0) {
			// higher pitched sound
		} else {
			// lower pitched sound
		}
	},
	first_beat_accent: function() {
		this.first_beat_accent = this.first_beat_accent ? false : true;
	},
	volume_level_slider: function() {

	},
	current_beat_counter: function() {
		
	},
	timer_input: function() {

	}
}

$(document).ready(function() {
	// Audio
	var context;
	window.addEventListener('load', init, false);

	function init() {
		try {
			window.AudioContext = window.AudioContext
								 || window.webkitAudioContext;
			context = new AudioContext();
			console.log("init successful")
		} catch (e) {
			alert('Web Audio API is not supported in this browser');
		}
	}

	$("#start_button").click(function() {
		metronome.start();
	})

	$("#inc_tempo").click(function() {
		metronome.increment_bpm("inc");
		$("#bpm").html(metronome.bpm + " bpm");
	})

	$("#dec_tempo").click(function() {
		metronome.increment_bpm("dec");
		$("#bpm").html(metronome.bpm + " bpm");
	})
})
