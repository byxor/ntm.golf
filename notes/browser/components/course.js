class CourseComponent extends HTMLElement {

	#navigationController;
	#course;
	#selected = false;
	#imageWhenDeselected;
	#imageWhenSelected;

	init(navigationController, course) {
		this.#navigationController = navigationController;
		this.#course = course;
		this.#imageWhenDeselected = this.#course.name.toLowerCase() + ".png";
		this.#imageWhenSelected = this.#imageWhenDeselected.replace(".png", "-highlighted.png");

		this.#navigationController.onCourseChanged(course => {
			if (this.#course.equals(course)) {
				this.#select();
			} else {
				this.#deselect();
			}
		});
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		const image = this.#selected ? this.#imageWhenSelected : this.#imageWhenDeselected;

		createTemplate(this, `
			<style>
				.image {
					width: 80px;
					cursor: pointer;
				}
				.cache {
					display: none;
				}
			</style>
			<img
			    class="image"
			    src="/assets/courses/${image}"
				draggable="false"
			/>
			<div class="cache">
				<img src="/assets/courses/${this.#imageWhenSelected}"></img>
				<img src="/assets/courses/${this.#imageWhenDeselected}"></img>
			</div>
		`);

		this.shadowRoot
			.querySelector(".image")
			.addEventListener("click", () => {
				this.#navigationController.setCourse(this.#course)
			});
	}

	#select() {
		this.#selected = true;
		this.#render();
	}

	#deselect() {
		this.#selected = false;
		this.#render();
	}
}

customElements.define('course-', CourseComponent);