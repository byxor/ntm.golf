class NavigationComponent extends HTMLElement {
	init(courses) {
		this.courses = courses;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
				}

				.course-select {
					
				}

				.hole-select {
					position: absolute;
					width: auto;
					height: auto;
					left: 190px;
					top: 10px;
				}

				.pin-select {

				}

				.wind-select {
					position: absolute;
					width: auto;
					height: auto;
					left: 189px;
					top: 95px;
				}
			</style>
			<div class=".container">
				<div class="course-select"></div>
				<div class="hole-select"></div>
				<div class="wind-select"></div>
				<div class="pin-select"></div>
				<div class="breadcrumb"></div>
			</div>
		`);

		const courseSelectContainer = this.shadowRoot.querySelector(".course-select");
		const courseSelectComponent = document.createElement('course-select');
		courseSelectComponent.init(this.courses, course => {
			console.log(`Course selected... ${course.name}`);
		});
		courseSelectContainer.appendChild(courseSelectComponent);

		const holeSelectContainer = this.shadowRoot.querySelector(".hole-select");
		const holeSelectComponent = document.createElement('hole-select');
		holeSelectComponent.init(hole => {
			console.log(`Hole selected... ${hole.number}`);
		})
		holeSelectContainer.appendChild(holeSelectComponent);

		const windSelectContainer = this.shadowRoot.querySelector(".wind-select");
		const windSelectComponent = document.createElement('wind-select');
		windSelectComponent.init(wind => {
			console.log(`Wind selected... ${wind.strength}w(${wind.direction})`);
		});
		windSelectContainer.appendChild(windSelectComponent);

			
	}
}

customElements.define('navigation-', NavigationComponent);