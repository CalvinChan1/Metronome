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
	time_sig_change: function(num, den) {
		if (num) {
			$(".numerator-dropdown").html(num + ' <span class="caret"></span>');
			this.time_sig[0] = num;
		} else {
			$(".denominator-dropdown").html(den + ' <span class="caret"></span>');
			this.time_sig[1] = den;
		}
	},
	beat_subdivision: function(subdivision) {
		$(".subdivison-dropdown").html(subdivision + ' <span class="caret"></span>');
		this.subdivision = subdivision;
	},
	sound_selector: function(sound) {
		$(".sound-dropdown").html(sound + ' <span class="caret"></span>');
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

	$vol_slider.bind("slider:changed", function (event, data) {
	  // // The currently selected value of the slider
	  console.log(data.value);

	  // // The value as a ratio of the slider (between 0 and 1)
	  console.log(data.ratio);
	});

	$tempo_slider.bind("slider:changed", function (event, data) {
		metronome.bpm = Math.round(data.value);
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

	$("#sextuplets").click(function() {
		metronome.beat_subdivision("16th Note Triplets");
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

	// Beats
	var $numerator = $(".numerator");
	var $denominator = $(".denominator");

	$numerator.find("#2").click(function() {
		metronome.time_sig_change(2, false);
	});

	$numerator.find("#3").click(function() {
		metronome.time_sig_change(3, false);
	});

	$numerator.find("#4").click(function() {
		metronome.time_sig_change(4, false);
	});

	$numerator.find("#5").click(function() {
		metronome.time_sig_change(5, false);
	});

	$numerator.find("#6").click(function() {
		metronome.time_sig_change(6, false);
	});

	$numerator.find("#7").click(function() {
		metronome.time_sig_change(7, false);
	});

	$numerator.find("#8").click(function() {
		metronome.time_sig_change(8, false);
	});

	$numerator.find("#9").click(function() {
		metronome.time_sig_change(9, false);
	});

	$numerator.find("#10").click(function() {
		metronome.time_sig_change(10, false);
	});

	$numerator.find("#11").click(function() {
		metronome.time_sig_change(11, false);
	});

	$numerator.find("#12").click(function() {
		metronome.time_sig_change(12, false);
	});

	$numerator.find("#13").click(function() {
		metronome.time_sig_change(13, false);
	});

	$numerator.find("#14").click(function() {
		metronome.time_sig_change(14, false);
	});

	$numerator.find("#15").click(function() {
		metronome.time_sig_change(15, false);
	});

	$numerator.find("#16").click(function() {
		metronome.time_sig_change(16, false);
	});

	$numerator.find("#17").click(function() {
		metronome.time_sig_change(17, false);
	});

	$numerator.find("#18").click(function() {
		metronome.time_sig_change(18, false);
	});

	$denominator.find("#2").click(function() {
		metronome.time_sig_change(false, 2);
	});

	$denominator.find("#4").click(function() {
		metronome.time_sig_change(false, 4);
	});

	$denominator.find("#8").click(function() {
		metronome.time_sig_change(false, 8);
	});

	$denominator.find("#16").click(function() {
		metronome.time_sig_change(false, 16);
	});
})
