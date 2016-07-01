var metronome = {
	on: false,
	bpm: 100,
	min_bpm: 10,
	max_bpm: 250,
	current_beat: 1,
	current_beat_subdivision: 1,
	current_timeout: 60000,
	subdivision: 1,
	increment_interval: 1,
	bar_number: 0,
	time_sig: [4, 4],
	first_beat_accent: true,
	hi_sound: new Audio('Sounds/Clave/hiclave.wav'),
	mid_sound: null,
	low_sound: [],
	volume: 50, // 0-100
	timer: 0, // timer in seconds
	clicks: false,
	timer_init: false,
	start: function () {
		this.on = this.on ? false : true;

		// stops click
		clearInterval(this.clicks);

		// reset and ready metronome for init
		this.reset_current_beat();
		this.play_sound();
		this.timer_count();

		if (this.on) {
			this.initate_click();
			$("#start_button").html("Stop");
		} else {
			this.bar_number = 0;
			$("#bar_counter").html("Bar Counter: 0");

			$("#start_button").html("Start");
		}
	},
	play_sound: function() {
		if (!this.on) return;

		if (this.first_beat_accent && this.current_beat === 1 &&
			this.current_beat_subdivision === 1) {
			// console.log("high")
			this.hi_sound.play();
		} else if (this.subdivision !== 1 &&
				   this.current_beat_subdivision === 1) {
			// console.log("mid")
			this.mid_sound.play();
		} else {
			// console.log("low")
			this.low_sound[this.current_beat_subdivision].play();
		}
	},
	initate_click: function() {	
		if (this.on) {
			clearInterval(this.clicks);
			this.clicks = setInterval(function() {
				// reset back to 1
				if (this.current_beat_subdivision === this.subdivision &&
					this.current_beat === this.time_sig[0]) {
					// first beat of the bar
					this.current_beat = 1;
					this.current_beat_subdivision = 1;
					
					// new bar
					this.bar_number++;
					$("#bar_counter").html("Bar Counter: " +
											this.bar_number.toString())
				} else if (this.current_beat_subdivision === this.subdivision) {
					// last subdivision of the beat, will be an offbeat
					this.current_beat_subdivision = 1;
					this.current_beat++;
				} else {
					// next subdivision in beat
					this.current_beat_subdivision++;
				}

				// plays beat that just got incremented, so e
				$("#beat_count").html(metronome.current_beat);
				this.play_sound();
			}.bind(this), (this.current_timeout / metronome.bpm))
		}
	},
	increment_bpm: function (adjustBpm, bpmSlider) {
		if ((adjustBpm === "inc" &&
			 this.bpm + this.increment_interval > this.max_bpm) ||
			(adjustBpm === "dec" &&
			 this.bpm - this.increment_interval < this.min_bpm)) {
			return;
		}
		if (!bpmSlider) {
			(adjustBpm === "inc") ? this.bpm += this.increment_interval :
									this.bpm -= this.increment_interval;
		}

		$("#bpm").html(metronome.bpm + " bpm");

		// Note: Admittedly, this is a hacky way to increment the simple-slider.
		// 		 this is a workaround due to the faulty built-in 'setValue' 
		//       method that the slider provided.
		var slider_width = 300,
			increment_slider_px = slider_width / (this.max_bpm - this.min_bpm) * this.increment_interval,
			current_slider_posn = parseFloat($('#tempo_slider').find(".dragger").css("left")),
			new_slider_posn;

		(adjustBpm === "inc") ? new_slider_posn = (current_slider_posn + increment_slider_px).toString() + "px" :
								new_slider_posn = (current_slider_posn - increment_slider_px).toString() + "px";

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

			function hide_or_show_subdivision_options(show_or_hide) {
				var subdivisions = [$('#quarter-notes'), $('#triplets'),
									$('#whole-notes'), $('#half-notes'),
									$('#quintuplets'), $('#septuplets')]

				for (var i = 0; i < subdivisions.length; i++) {
					show_or_hide === "show" ? subdivisions[i].show() : subdivisions[i].hide();
				}
			}

			if (den === 2) {
				this.current_timeout = 120000;
				hide_or_show_subdivision_options("hide");
				$('#quarter-notes').show();
			} else if (den === 4) {
				this.current_timeout = 60000;
				hide_or_show_subdivision_options("show");
			} else if (den === 8) {
				this.current_timeout = 30000;
				$(".subdivison-dropdown").html('8th Notes <span class="caret"></span>');
				hide_or_show_subdivision_options("hide");
			} else if (den === 16) {
				this.current_timeout = 15000;
				hide_or_show_subdivision_options("hide");
				$(".subdivison-dropdown").html('16th Notes <span class="caret"></span>');
				$('#8th-notes').hide();
				$('#sextuplets').hide();
			}
		}
		this.reset_current_beat();
	},
	beat_subdivision: function(subdivision) {
		subdivision_name = $("ul").find("[data-subdivision='" + subdivision + "']").html();

		$(".subdivison-dropdown").html(subdivision_name + ' <span class="caret"></span>');
		this.subdivision = subdivision;
		var quarter_note_timeout = 60000;

		// need to fix issue with current_timeout too
		this.current_timeout = quarter_note_timeout / this.subdivision;
		this.reset_current_beat();
	},
	reset_current_beat: function() {
		this.current_beat = 1;
		this.current_beat_subdivision = 1;
		$("#beat_count").html("1");

		this.initate_click();
	},
	volume_level: function() {
		// audio elements go from 0.0 to 1.0
		var volume = this.volume / 100;

		this.hi_sound.volume = volume;
		this.mid_sound.volume = volume;
		for (var i = 0; i < 9; i++) {
			this.low_sound[i].volume = volume;
		}
	},
	timer_count: function() {
		if (this.on) {
			this.timer_init = setInterval(function() {
				$("#timeplz").html("Seconds Elapsed: " + this.timer);
				this.timer++;
			}.bind(this), 1000)
		} else {
			clearInterval(this.timer_init);
		}
	}
}

$(document).ready(function() {
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

	// Block source:
	// 

	$("#start_button").click(function() {
		metronome.start();
	});

	$("#inc_tempo").click(function() {
		metronome.increment_bpm("inc", false);
	});

	$("#dec_tempo").click(function() {
		metronome.increment_bpm("dec", false);
	});

	var $increment_interval = $("#increment_interval");
	$increment_interval.on("change", function() {
		var increment_val = $increment_interval[0].value;
		metronome.increment_interval = parseInt(increment_val);
	});

	// Beats
	var $numerator = $(".numerator"),
		$denominator = $(".denominator");

	function numerator_click_handler(numerator) {
		$numerator.find("#" + numerator).click(function() {
			metronome.time_sig_change(numerator, false);
		});
	}

	function denominator_click_handler(denominator) {
		$denominator.find("#" + denominator).click(function() {
			metronome.time_sig_change(false, denominator);
		});
	}

	for (var i = 0; i < 18; i++) {
		numerator_click_handler(i);
	}

	for (var j = 1; j < 5; j++) {
		denominator_click_handler(Math.pow(2, j));
	}

	// Subdivisions' event handlers
	var subdivisions_ids = ["#quarter-notes", "#8th-notes",
							"#triplets", "#16th-notes",
							"#sextuplets", "#32nd-notes",
							"#whole-notes", "#half-notes",
							"#quintuplets", "#septuplets"]

	function add_subdivision_click_handler(subdiv_id) {
		$(subdiv_id).click(function() {
			var subdiv_number = $(subdiv_id).data("subdivision")
			metronome.beat_subdivision(subdiv_number);
		})
	}

	for (var i = 0; i < subdivisions_ids.length; i++) {
		add_subdivision_click_handler(subdivisions_ids[i])
	}

	// Sounds
	var $sound_dropdown = $(".sound-dropdown");

	var hi_sound = new Audio('Sounds/clave/hiclave.wav'),
		mid_sound = new Audio('Sounds/clave/midclave.wav'),
		low_sound = new Audio('Sounds/clave/lowclave.wav');

	load_sound('clave');

	$("#click").click(function() {
		$sound_dropdown.html('Click <span class="caret"></span>');
		load_sound('block');
	});

	$("#clave").click(function() {
		$sound_dropdown.html('Clave <span class="caret"></span>');
		load_sound('clave');
	});

	$("#cowbell").click(function() {
		$sound_dropdown.html('Cowbell <span class="caret"></span>');
		load_sound('cowbell');
	});

	function load_sound(sound) {
		hi_sound = new Audio('Sounds/' + sound + '/hi' + sound + '.wav');
		mid_sound = new Audio('Sounds/' + sound + '/mid' + sound + '.wav');
		low_sound = new Audio('Sounds/' + sound + '/low' + sound + '.wav');

		hi_sound.preload = 'auto';
		mid_sound.preload = 'auto';
		low_sound.preload = 'auto';

		hi_sound.load();
		mid_sound.load();
		low_sound.load();

		metronome.hi_sound = hi_sound.cloneNode();
		metronome.mid_sound = mid_sound.cloneNode();

		for (var i = 0; i < 9; i++) {
			metronome.low_sound[i] = low_sound.cloneNode();
		}

		metronome.volume_level();	
	}
	
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
	$(".time_reset").click(function() {
		metronome.timer = 0;
	})

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
