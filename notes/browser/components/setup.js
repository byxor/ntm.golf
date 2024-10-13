class SetupComponent extends HTMLElement {

	#navigationController;
	#setup;
	#halfBlackedOut = false;

	init(navigationController, setup) {		
		this.#navigationController = navigationController;
		this.#setup = setup;
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		const isDieShown = (() => {
			if (this.#setup.outcome instanceof SuccessfulShot) {
				return !this.#setup.outcome.consistent;
			}
			return false;
		})();

		createTemplate(this, `
			<style>
				.container {
					position: relative;
					border-radius: 4px;
					overflow: hidden;
				}

				.container * {
					user-select: none;
				}

				.blackout {
					z-index: 50;
					background: rgb(0,0,0);
					background: linear-gradient(90deg, rgba(0,0,0,0.9) 40%, rgba(255,255,255,0) 60%);
					width: 600px;
					height: 344px;
					position: absolute;
					pointer-events: none;
				}

				.club {
					position: absolute;
					top: 0;
					left: 0;

					z-index: 10;
				}

				.stance {
					position: absolute;
					top: 43px;
					left: 0;

					z-index: 10;
				}

				.die {
					position: absolute;
					left: 328px;
					top: 148px;

					width: 28px;

					opacity: 1;
					transform: rotateY(180deg);
					-webkit-filter: drop-shadow(2px 5px 4px #222) brightness(0.92);
					filter:         drop-shadow(2px 2px 4px #222) brightness(0.92);

					z-index: 10;		
				}

				.hidden {
					visibility: hidden;
				}

				.notes {
					position: absolute;
					z-index: 60;

					width: 200px;
					height: 100px;

					color: white;

					left: 0px;
					top: ${this.#setup.stance === DEFAULT_STANCE ? 38 : 80}px;
				}

				.outcome {
					position: absolute;
					z-index: 10;

					width: 176px;
					height: 61px;

					left: 421px;
				}

				.shot-meter {
					position: relative;
				}
			</style>
			<div class="container">
				<div class="${this.#halfBlackedOut ? "blackout" : ""}"></div>
				<div class="club"></div>
				<div class="stance"></div>
				<img class="die ${isDieShown ? "" : "hidden"}" src="./assets/dice/die.png" draggable="false"></img>
				<div class="notes"></div>
				<div class="outcome"></div>
				<div class="shot-meter"></div>
			</div>
		`);

		const clubContainer = this.shadowRoot.querySelector(".club");
		const clubComponent = document.createElement("club-");
		clubComponent.init(this.#setup.club);
		clubContainer.appendChild(clubComponent);

		const stanceContainer = this.shadowRoot.querySelector(".stance");
		const stanceComponent = document.createElement("stance-");
		stanceComponent.init(this.#setup.stance);
		stanceContainer.appendChild(stanceComponent);

		const notesContainer = this.shadowRoot.querySelector(".notes");
		const notesComponent = document.createElement("notes-");
		notesComponent.init(this.#setup.outcome.notes);
		notesContainer.appendChild(notesComponent);

		const outcomeContainer = this.shadowRoot.querySelector(".outcome");
		const outcomeComponent = document.createElement("outcome-");
		outcomeComponent.init(
			this.#navigationController,
			this.#setup.outcome
		);
		outcomeContainer.appendChild(outcomeComponent);
		outcomeComponent.addEventListener('click', event => this.#onOutcomeClicked(event));

		const shotMeterContainer = this.shadowRoot.querySelector(".shot-meter");
		const shotMeterComponent = document.createElement('shot-meter');
		shotMeterComponent.init(
			this.#setup.surface,
			this.#setup.club,
			this.#setup.power,
			this.#setup.height,
			this.#setup.spin,
			this.#setup.outcome.notes.length,
			this.#setup.outcome.consistent
		);
		shotMeterContainer.appendChild(shotMeterComponent);

		// TODO:
		// Allow setup component to be right-clicked to save an image
		// or copy it to the clipboard.
		// html2canvas & clipboard API?
	}

	setHalfBlackedOut(value) {
		// TODO: different "blackout" modes.
		// e.g. black out the power bar if it hasn't changed
		this.#halfBlackedOut = value;
		this.#render();
	}

	#onOutcomeClicked() {
		if (this.#setup.outcome instanceof NotFinishedYet) {
			this.#navigationController.setSetup(this.#setup);
		} else {
			this.#navigationController.nextHole();
		}
	}
}

customElements.define('setup-', SetupComponent);
