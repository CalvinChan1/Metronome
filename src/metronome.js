var metronome = {
	on: false,
	current_beat: 1,
	bpm: 100,
	min_bpm: 10,
	max_bpm: 250,
	time_sig: [4, 4],
	current_timeout: 60000,
	subdivision: "quarter",
	hi_sound: new Audio('Sounds/hiclave.wav'),
	med_sound: null,
	low_sound: new Audio('Sounds/lowclave.wav'),
	first_beat_accent: true,
	volume: 50, // 0-100
	timer: 150, // timer in seconds
	clicks: false,
	start: function () {
		this.on = this.on ? false : true;

		clearInterval(this.clicks);
		this.reset_current_beat();
		this.play_sound();

		if (this.on) {
			this.initate_click();
			$("#start_button").html("Stop");
		} else {
			$("#start_button").html("Start");
		}
	},
	play_sound: function() {
		if (!this.on) return;

		if (this.first_beat_accent && this.current_beat === 1) {
			// higher pitched sound
			this.hi_sound.play();
		} else {
			// lower pitched sound
			this.low_sound.play();
		}
	},
	initate_click: function() {
		if (this.on) {
			clearInterval(this.clicks);
			this.clicks = setInterval(function() {
				// change current beat
				if (this.current_beat === this.time_sig[0]) {
					this.current_beat = 1;
				} else {
					this.current_beat++;
				}

				$("#beat_count").html(metronome.current_beat);
				this.play_sound();
			}.bind(this), (this.current_timeout / metronome.bpm))
		}
	},
	increment_bpm: function (adjustBpm, bpmSlider) {
		if ((adjustBpm === "inc" && this.bpm === this.max_bpm) ||
			(adjustBpm === "dec" && this.bpm === this.min_bpm)) {
			return;
		}
		if (!bpmSlider) {
			(adjustBpm === "inc") ? this.bpm++ : this.bpm--;
		}

		$("#bpm").html(metronome.bpm + " bpm");

		// Note: Admittedly, this is a hacky way to increment the simple-slider.
		// 		 this is a workaround due to the faulty built-in 'setValue' 
		//       method that the slider provided.
		var slider_width = 300,
			increment_slider_px = slider_width / (this.max_bpm - this.min_bpm),
			current_slider_posn = parseFloat($('#tempo_slider').find(".dragger").css("left")),
			new_slider_posn;

		if (adjustBpm === "inc") {
			new_slider_posn = (current_slider_posn + increment_slider_px).toString() + "px";
		} else {
			new_slider_posn = (current_slider_posn - increment_slider_px).toString() + "px";
		}

		$('#tempo_slider').find(".dragger").css("left", new_slider_posn);

		this.reset_current_beat();
	},
	time_sig_change: function(num, den) {
		if (num) {
			$(".numerator-dropdown").html(num + ' <span class="caret"></span>');
			this.time_sig[0] = num;
		} else {
			$(".denominator-dropdown").html(den + ' <span class="caret"></span>');
			this.time_sig[1] = den;

			if (den === 2) {
				this.current_timeout = 120000;
			} else if (den === 4) {
				this.current_timeout = 60000;
			} else if (den === 8) {
				this.current_timeout = 30000;
			} else if (den === 16) {
				this.current_timeout = 15000;
			}
		}
	},
	beat_subdivision: function(subdivision) {
		$(".subdivison-dropdown").html(subdivision + ' <span class="caret"></span>');
		this.subdivision = subdivision;
	},
	reset_current_beat: function() {
		this.current_beat = 1;
		$("#beat_count").html("1");

		this.initate_click();
	},
	volume_level: function() {
		// audio elements go from 0.0 to 1.0
		var volume = this.volume / 100;

		this.hi_sound.volume = volume;
		// this.med_sound.volume = volume;
		this.low_sound.volume = volume;
	},
	timer_input: function() {

	}
}

$(document).ready(function() {
	// Audio API

	// Click source:
	// http://www.denhaku.com/r_box/sr16/sr16perc/hi%20block.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/md%20block.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/lo%20block.wav

	// Clave source:
	// http://www.denhaku.com/r_box/sr16/sr16perc/hi%20clave.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/lo%20clave.wav
	
	// Cowbell source:
	// http://www.denhaku.com/r_box/sr16/sr16perc/hicowbel.wav
	// http://www.denhaku.com/r_box/sr16/sr16perc/mdcowbel.wav

	$("#start_button").click(function() {
		metronome.start();
	});

	$("#inc_tempo").click(function() {
		metronome.increment_bpm("inc", false);
	});

	$("#dec_tempo").click(function() {
		metronome.increment_bpm("dec", false);
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

	var $sound_dropdown = $(".sound-dropdown");

	// Sounds
	$("#click").click(function() {
		$sound_dropdown.html('Click <span class="caret"></span>');
		metronome.hi_sound = new Audio('Sounds/hiblock.wav');
		metronome.low_sound = new Audio('Sounds/midblock.wav');
		metronome.volume_level();
	});

	$("#clave").click(function() {
		$sound_dropdown.html('Clave <span class="caret"></span>');
		metronome.hi_sound = new Audio('Sounds/hiclave.wav');
		metronome.low_sound = new Audio('Sounds/lowclave.wav');
		metronome.volume_level();
	});

	$("#cowbell").click(function() {
		$sound_dropdown.html('Cowbell <span class="caret"></span>');
		metronome.hi_sound = new Audio('Sounds/hicowbell.wav');
		metronome.low_sound = new Audio('Sounds/midcowbell.wav');
		metronome.volume_level();
	});

	// First Beat Accent button
	$("#first_beat_accent").click(function() {
		metronome.first_beat_accent = metronome.first_beat_accent ? false : true;
	});

	// Sliders
	var $tempo_slider = $("#tempo_slider"),
		$vol_slider = $("#vol_slider");

	$tempo_slider.bind("slider:changed", function (event, data) {
		metronome.bpm = Math.round(data.value);
		metronome.increment_bpm(metronome.bpm, true);
	})

	$vol_slider.bind("slider:changed", function (event, data) {
		metronome.volume = Math.round(data.value);
		metronome.volume_level();
	});

	// Timer


	// Keyboard shortcuts
	$(window).keydown(function(e) {
		switch (e.keyCode) {
			case 38: // up arrow
				metronome.increment_bpm("inc", false);
				return;
			case 40: // down arrow
				metronome.increment_bpm("dec", false);
				return;
			case 32: // spacebar
				metronome.start();
				return;
		}
	})
})
