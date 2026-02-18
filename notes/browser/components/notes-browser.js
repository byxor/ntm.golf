class NotesBrowserComponent extends HTMLElement {

	#navigationController;
	#courses;

	#courseSelectComponent = document.createElement('course-select');
	#holeSelectComponent = document.createElement('hole-select');
	#windSelectComponent = document.createElement('wind-select');
	#pinSelectComponent = document.createElement('pin-select');
	#graphicalPinSelectComponent = document.createElement('graphical-pin-select');
	#breadcrumbsComponent = document.createElement('breadcrumbs-');
	#holeNotesComponent = document.createElement('hole-notes');
	#setupsComponent = document.createElement('setups-');
	#progressComponent = document.createElement('progress-');

	init(navigationController, courses) {
		this.#navigationController = navigationController;
		this.#courses = courses;

		this.#courseSelectComponent.init(navigationController, courses);
		this.#holeSelectComponent.init(navigationController);
		this.#windSelectComponent.init(
			this.#navigationController,
			wind => {},
			wind => navigationController.setWind(wind),
		);
		this.#pinSelectComponent.init(navigationController);
		this.#graphicalPinSelectComponent.init(navigationController);
		this.#breadcrumbsComponent.init(navigationController);
		this.#holeNotesComponent.init(navigationController);
		this.#setupsComponent.init(navigationController);
		this.#progressComponent.init(navigationController);
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
					
					/* old: nice relaxing blue colors */ 
					/* background: linear-gradient(118deg, rgba(255,255,255,1) 0%, rgba(0,212,255,1) 38%, rgba(9,42,121,1) 81%); */

					/* new: darker colors */ 
					background: linear-gradient(118deg, hsl(0, 24%, 56%) 0%, hsl(0, 31%, 27%) 38%, hsl(0, 0%, 0%) 62%);


					margin-top: 2px;
				}

				.inner-container {
					background-color: rgba(255, 255, 255, 0.9);
					width: 610px;
					height: auto;
					min-height: 100% !important;
				}

				.course-select {
					
				}

				.hole-select {
					position: absolute;
					width: auto;
					height: auto;
					left: 189px;
					top: 7px;
				}

				.pin-select {
					padding: 2px;
					padding-top: 4px;
					padding-bottom: 10px;
				}

				.wind-select {
					position: absolute;
					width: auto;
					height: auto;
					left: 189px;
					top: 92px;
				}

				.progress {
					position: absolute;
					width: auto;
					height: auto;
					left: 364px;
					top: 97px;
				}

				.setups {

				}
			</style>
			<div class="container">
				<div class="inner-container">
					<div class="course-select"></div>
					<div class="hole-select"></div>
					<div class="wind-select"></div>
					<div class="breadcrumbs"></div>
					<div class="graphical-pin-select"></div>
					<div class="pin-select"></div>
					<div class="progress"></div>
					<div class="hole-notes"></div>
					<div class="setups"></div>
				</div>
			</div>
		`);

		this.shadowRoot
			.querySelector(".course-select")
			.appendChild(this.#courseSelectComponent);

		this.shadowRoot
			.querySelector(".hole-select")
			.appendChild(this.#holeSelectComponent);

		this.shadowRoot
			.querySelector(".wind-select")
			.appendChild(this.#windSelectComponent);

		this.shadowRoot
			.querySelector(".pin-select")
			.appendChild(this.#pinSelectComponent);

		this.shadowRoot
			.querySelector(".graphical-pin-select")
			.appendChild(this.#graphicalPinSelectComponent);

		this.shadowRoot
			.querySelector(".progress")
			.appendChild(this.#progressComponent);

		this.shadowRoot
			.querySelector(".setups")
			.appendChild(this.#setupsComponent);
		
		this.shadowRoot
			.querySelector(".breadcrumbs")
			.appendChild(this.#breadcrumbsComponent);

		this.shadowRoot
			.querySelector(".hole-notes")
			.appendChild(this.#holeNotesComponent);

		this.#navigationController.navigateViaUrl();
	}
}

customElements.define('notes-browser', NotesBrowserComponent);