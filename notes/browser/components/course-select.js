class CourseSelectComponent extends HTMLElement {
	#navigationController;
	#courses;
	
	#germanyCourseElement = document.createElement('course-');
	#japanCourseElement = document.createElement('course-');
	#usaCourseElement = document.createElement('course-');
	#australiaCourseElement = document.createElement('course-');

	init(navigationController, courses) {
		this.#navigationController = navigationController;
		this.#courses = courses;

		this.#germanyCourseElement.init(
			navigationController,
			this.#courses.germany,
		);

		this.#japanCourseElement.init(
			navigationController,
			this.#courses.japan,
		);

		this.#usaCourseElement.init(
			navigationController,
			this.#courses.usa,
		);

		this.#australiaCourseElement.init(
			navigationController,
			this.#courses.australia,
		);
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		createTemplate(this, `
			<style>
			</style>
			<div class="container">
			</div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		container.appendChild(this.#germanyCourseElement);
		container.appendChild(this.#japanCourseElement);
		container.appendChild(document.createElement('br'));
		container.appendChild(this.#usaCourseElement);
		container.appendChild(this.#australiaCourseElement);
	}
}

customElements.define('course-select', CourseSelectComponent);