class CourseComponent extends HTMLElement {
	init(course, onCourseSelected) {
		this.course = course;
		this.selected = false;
		this.onCourseSelected = onCourseSelected;

		this.imageWhenDeselected = this.course.name.toLowerCase() + ".png";
		this.imageWhenSelected = this.imageWhenDeselected.replace(".png", "-highlighted.png");
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const image = this.selected ? this.imageWhenSelected : this.imageWhenDeselected;

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
			    src="./assets/courses/${image}"
			/>
			<div class="cache">
				<img src="./assets/courses/${this.imageWhenSelected}"></img>
				<img src="./assets/courses/${this.imageWhenDeselected}"></img>
			</div>
		`);

		this.shadowRoot.querySelector(".image").addEventListener("click", () => this.onClick());
	}

	onClick() {
		this.select();
	}

	select() {
		this.selected = true;
		this.render();
		this.onCourseSelected(this.course);
	}

	deselect() {
		this.selected = false;
		this.render();
	}
}

class CourseSelectComponent extends HTMLElement {
	init(courses, onCourseSelected) {
		this.courses = courses;
		this.onCourseSelected = onCourseSelected;
	}

	connectedCallback() {
		createTemplate(this, `
			<style>

			</style>
			<div class="container">
			</div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		let germanyCourseElement;
		let japanCourseElement;
		let usaCourseElement;
		let australiaCourseElement;

		const onCourseSelected = course => {
			const allCourseElements = [
				germanyCourseElement,
				japanCourseElement,
				usaCourseElement,
				australiaCourseElement
			];

			const allOtherCourseElements = allCourseElements
				.filter(courseElement => course.name !== courseElement.course.name);

			allOtherCourseElements.forEach(c => c.deselect());

			this.onCourseSelected(course);
		};

		// TODO: use draggable="false" instead?

		germanyCourseElement = document.createElement('course-');
		germanyCourseElement.init(this.courses.germany, onCourseSelected);
		germanyCourseElement.ondragstart = (event => false);
		container.appendChild(germanyCourseElement);

		japanCourseElement = document.createElement('course-');
		japanCourseElement.init(this.courses.japan, onCourseSelected);
		japanCourseElement.ondragstart = (event => false);
		container.appendChild(japanCourseElement);

		container.appendChild(document.createElement('br'));
		
		usaCourseElement = document.createElement('course-');
		usaCourseElement.init(this.courses.usa, onCourseSelected);
		usaCourseElement.ondragstart = (event => false);
		container.appendChild(usaCourseElement);

		australiaCourseElement = document.createElement('course-');
		australiaCourseElement.init(this.courses.australia, onCourseSelected);
		australiaCourseElement.ondragstart = (event => false);
		container.appendChild(australiaCourseElement);

		// TODO: add scotland?

		germanyCourseElement.select();
	}
}

customElements.define('course-', CourseComponent);
customElements.define('course-select', CourseSelectComponent);