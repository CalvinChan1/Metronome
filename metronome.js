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

		clearInterval(this.clicks);
		this.reset_current_beat();

		if (this.on) {
			this.initate_click();
			$("#start_button").html("Stop");
		} else {
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
		$(".subdivison-dropdown").html(subdivision);
		this.subdivision = subdivision;
	},
	sound_selector: function(sound) {
		$(".sound-dropdown").html(sound);
		this.sound = sound;
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
	// Audio API

	// http://www.denhaku.com/r_box/sr16/sr16perc/hi%20block.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/md%20block.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/lo%20block.wav
	var click;

	// http://www.denhaku.com/r_box/sr16/sr16perc/hi%20clave.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/lo%20clave.wav
	var clave;
	
	// http://www.denhaku.com/r_box/sr16/sr16perc/hicowbel.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/mdcowbel.wav
	var cowbell;

	var context;

	window.addEventListener('load', init, false);

	function init() {
		try {
			window.AudioContext = window.AudioContext
								 || window.webkitAudioContext;

			context = new AudioContext();
			console.log("init successful")

			function loadSounds(url) {
				var request = new XMLHttpRequest();
				request.open('GET', url, true)
				request.responseType = 'arraybuffer';

				request.onload = function() {
					context.decodeAudioData(request.response, function (buffer) {
						click = click;
					}, onError)
				}
				request.send();
			}

		} catch (e) {
			alert('Web Audio API is not supported in this browser');
		}
	}

	$("#start_button").click(function() {
		metronome.start();
	});

	$("#inc_tempo").click(function() {
		metronome.increment_bpm("inc");
		$("#bpm").html(metronome.bpm + " bpm");
	});

	$("#dec_tempo").click(function() {
		metronome.increment_bpm("dec");
		$("#bpm").html(metronome.bpm + " bpm");
	});

	// Sliders
	var $vol_slider = $("#vol_slider"),
		$tempo_slider = $("#tempo_slider");

	$vol_slider.bind("", function (event, data) {

	})

	$vol_slider.bind("", function (event, data) {

	})

	$tempo_slider.bind("", function (event, data) {

	})

	$tempo_slider.bind("", function (event, data) {
		
	})

	// Sounds
	$("#click").click(function() {
		metronome.sound_selector("Click");
	});

	$("#clave").click(function() {
		metronome.sound_selector("Clave");
	});

	$("#cowbell").click(function() {
		metronome.sound_selector("Cowbell");
	});

	// Subdivisions
	$("#quarter-notes").click(function() {
		metronome.beat_subdivision("Quarter Notes");
	});

	$("#8th-notes").click(function() {
		metronome.beat_subdivision("8th Notes");
	});

	$("#triplets").click(function() {
		metronome.beat_subdivision("Triplets");
	});

	$("#16th-notes").click(function() {
		metronome.beat_subdivision("16th Notes");
	});
	
	$("#32nd-notes").click(function() {
		metronome.beat_subdivision("32nd Notes");
	});
	
	$("#whole-notes").click(function() {
		metronome.beat_subdivision("Whole Notes");
	});

	$("#half-notes").click(function() {
		metronome.beat_subdivision("Half Notes");
	});
	
	$("#quintuplets").click(function() {
		metronome.beat_subdivision("Quintuplets");
	});
	
	$("#septuplets").click(function() {
		metronome.beat_subdivision("Septuplets");
	});
})
