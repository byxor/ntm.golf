class ShotMeterComponent extends HTMLElement {
	init(surface, club, power, height, spin, numberOfNotes, outcome) {
		this.surface = surface;
		this.club = club;
		this.power = power;
		this.height = height;
		this.spin = spin;

		this.backgroundImage = `/assets/meter/background.png`;
		this.backgroundMask = (() => {
			let suffix = "";
			if (numberOfNotes >= 3) {
				suffix = "-hide50percent";
			}
			return `/assets/meter/mask-background${suffix}.png`
		})();

		this.surfaceImage = `/assets/meter/surfaces/${this.surface.name}.png`;
		this.surfaceMask = `/assets/meter/surfaces/mask-9.png`;

		this.powerImage = `/assets/meter/powers/${this.power.value.replace("%", "")}.png`;
		this.powerMask = `/assets/meter/powers/mask.png`;

		this.heightRangeImage = `/assets/meter/heights/range-${this.club.heightRange}.png`;
		this.heightRangeMask = `/assets/meter/heights/mask-range.png`;
		this.heightMask = `/assets/meter/heights/mask-${this.height.value}.png`;

		this.directionIndicatorImage = `/assets/meter/indicators/power-and-height-4.png`;
		this.powerDirectionIndicatorMask = this.power.direction !== "" ?
			`/assets/meter/indicators/mask-power-${this.power.direction}.png` : "";

		this.heightDirectionIndicatorMask = `/assets/meter/indicators/mask-height-${this.height.direction}.png`;

		this.spinXOffset = (() => {
			if (this.spin === BACKSPIN) {
				return 0.5;
			} else {
				return 0;
			}
		})();
		this.spinYOffset = (() => {
			if (this.spin === BACKSPIN) {
				return 20;
			} else {
				return 0;
			}
		})();
		this.spinText = (() => {
			if (this.spin === TOPSPIN) {
				return "&uarr;&uarr;"; // ↑
			} else if (this.spin === BACKSPIN) {
				return "&Darr;&Darr;"; // ↡
			} else {
				return "";
			}
		})();

		this.outcome = outcome;
		this.consistent = outcome.consistent;
	}

	connectedCallback() {
		// TODO: use original grey/black gradient for "unverified" consistency

		const containerClass = (() => {
			if (this.outcome instanceof SuccessfulShot) {
				return this.consistent ? "consistent" : "inconsistent";
			} else {
				return "not-finished-yet";
			}
		})();
		

		createTemplate(this, `
			<style>
				.container {
					width: 602px;
					height: 343px;
					border: 1px solid black;
					border-radius: 4px;
				}

				.not-finished-yet {
				    background-image: linear-gradient(to bottom right, black, grey);
				}

				.inconsistent {
					background-image: linear-gradient(to bottom right, darkred, grey);
				}

				.consistent {
					background-image: linear-gradient(to bottom right, darkgreen, grey);
				}

				.background-container {
					position: absolute;

					width: 602px;
					height: 343px;

					background-image: url('${this.backgroundImage}');
					background-position: center;
					background-repeat: no-repeat;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					mask-image: url('${this.backgroundMask}');
					-webkit-mask-image: url('${this.backgroundMask}');
					mask-repeat: no-repeat;
					mask-position: center;

					z-index: 0;
				}

				.indicators-container {
					position: absolute;

					width: 602px;
					height: 343px;	
				}

				.parts-container {
					opacity: 1;
					position: relative;
					top: 60px;
					left: 201px;
				}

				.background {

				}

				.direction-indicator {
					position: absolute;

					background-image: url('${this.directionIndicatorImage}');
					background-position: center;
					background-repeat: no-repeat;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					
					mask-repeat: no-repeat;
					mask-position: center;

					width: 602px;
					height: 343px;

					z-index: 5;
				}

				.power-direction-indicator {
					mask-image: url('${this.powerDirectionIndicatorMask}');
					-webkit-mask-image: url('${this.powerDirectionIndicatorMask}');

					-webkit-animation: hue-rotate-animation 4s infinite;
				  	animation: hue-rotate-animation 4s infinite;
				  	animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
				}

				.height-direction-indicator {
					mask-image: url('${this.heightDirectionIndicatorMask}');
					-webkit-mask-image: url('${this.heightDirectionIndicatorMask}');

					-webkit-animation: hue-rotate-animation 4s infinite;
				  	animation: hue-rotate-animation 4s infinite;
				  	animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1);

				  	animation-delay: ${1200}ms;
				}

				@-webkit-keyframes hue-rotate-animation {
				 	0%, 5%    { -webkit-filter: hue-rotate(0deg) brightness(1); }
				 	12%       { -webkit-filter: hue-rotate(120deg) brightness(2); }
					45%       { -webkit-filter: hue-rotate(30deg) brightness(1); }
					100%      { -webkit-filter: hue-rotate(0deg) brightness(1); }
				}

				.surface {
					position: absolute;
					left: 36px;
					top: 44.5px;

					background-image: url('${this.surfaceImage}');
					background-position: center;
					background-repeat: no-repeat;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					mask-image: url('${this.surfaceMask}');
					-webkit-mask-image: url('${this.surfaceMask}');
					mask-repeat: no-repeat;
					mask-position: center;

					width: 200px;
					height: 200px;

					z-index: 4;
				}

				.power {
					position: absolute;
					left: 0px;
					top: 0px;

					width: 225px;
					height: 283px;

					background-image: url('${this.powerImage}');
					background-position: center;
					background-repeat: no-repeat;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					mask-image: url('${this.powerMask}');
					-webkit-mask-image: url('${this.powerMask}');
					mask-repeat: no-repeat;
					mask-position: center;


					z-index: 1;
				}

				.height-range {
					position: absolute;
					left: 201px;
					top: 48px;
					z-index: 2;

					background-image: url('${this.heightRangeImage}');
					background-position: center;
					background-repeat: no-repeat;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					mask-image: url('${this.heightRangeMask}');
					-webkit-mask-image: url('${this.heightRangeMask}');
					mask-repeat: no-repeat;
					mask-position: center;

					width: 71px;
					height: 193px;
				}

				.height {
					position: absolute;
					left: 202px;
					top: 48px;
					background-color: white;
					width: 70px;
					height: 193px;
					z-index: 3;

					opacity: 1;

					mask-mode: luminance;
					-webkit-mask-mode: luminance;
					mask-image: url('${this.heightMask}');
					-webkit-mask-image: url('${this.heightMask}');
					mask-repeat: no-repeat;
					mask-position: center;
				}

				.spin {
					position: absolute;
					z-index: 9;
					color: #010101;
					font-size: 50px;
					width: 50px;
					height: 50px;
					font-weight: 2000;
					letter-spacing: -23px;

					left: ${126 + this.spinXOffset}px;
					top: ${106 + this.spinYOffset}px;
				}
			</style>
			<div class="container ${containerClass}">
				<div class="background-container"></div>
				<div class="parts-container">
					<div class="surface"></div>
					<div class="power"></div>
					<div class="height-range"></div>
					<div class="height"></div>
					<span class="spin">${this.spinText}</span>
				</div>
				<div class="indicators-container">
					${
						this.power.value !== "max%" ?
						`<div class="direction-indicator power-direction-indicator"></div>`
						: ""	
					}
					<div class="direction-indicator height-direction-indicator"></div>
				</div>
			</div>
		`);
	}
}

customElements.define('shot-meter', ShotMeterComponent);
