class BreadcrumbsComponent extends HTMLElement {

	#navigationController;

	#course;
	#hole;
	#pin;
	#setup;

	#wind = newWind(0, "");

	init(navigationController) {
		this.#navigationController = navigationController;

		this.#navigationController.onCourseChanged(course => {
			this.#onCourseChanged(course);
		});

		this.#navigationController.onHoleChanged(hole => {
			this.#onHoleChanged(hole);
		});

		this.#navigationController.onPinChanged(pin => {
			this.#onPinChanged(pin);
		});

		this.#navigationController.onSetupChanged(setup => {
			this.#onSetupChanged(setup);
		});

		this.#navigationController.onWindChanged(wind => {
			this.#onWindChanged(wind);
		});
	}

	#onCourseChanged(course) {
		this.#course = course;
		this.#render();
	}

	#onHoleChanged(hole) {
		this.#hole = hole;
		this.#render();
	}

	#onPinChanged(pin) {
		this.#pin = pin;
		this.#render();
	}

	#onSetupChanged(setup) {
		this.#setup = setup;
		this.#render();
	}

	#onWindChanged(wind) {
		this.#wind = wind;
		this.#render();
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		createTemplate(this, `
			<style>
				.container {
					padding: 10px;
				}
				.divider {
					padding: 10px;
				}
			</style>
			<div class="container">

			</div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		const appendDivider = () => {
			const divider = document.createElement("span");
			divider.innerHTML = " / ";
			container.appendChild(divider);
		};

		if (!this.#course) {
			return;
		}
		const courseBreadcrumb = document.createElement('breadcrumb-');
		courseBreadcrumb.init(this.#course.name, () => {
			this.#navigationController.setCourse(this.#course);
		});
		container.appendChild(courseBreadcrumb);

		if (!this.#hole) {
			return;
		}
		appendDivider();
		const holeBreadcrumb = document.createElement('breadcrumb-');
		holeBreadcrumb.init(`Hole ${this.#hole.number}`, () => {
			this.#navigationController.setHole(this.#hole);
		})
		container.appendChild(holeBreadcrumb);

		if (!this.#pin) {
			return;
		}
		appendDivider();
		const pinBreadcrumb = document.createElement('breadcrumb-');
		const extraPinText = (
			this.#setup === undefined ?
			this.#wind.toString() :
			this.#setup.wind.toString()
		);
		pinBreadcrumb.init(`${this.#pin.distance}Y: ${this.#pin.label} ${extraPinText}`, () => {
			this.#navigationController.setPin(this.#pin);
		});
		container.appendChild(pinBreadcrumb);

		if (!this.#setup) {
			return;
		}

		// sorted: earlier -> later
		const setups = [];
		let temp = this.#setup;
		while (temp !== undefined) {
			setups.unshift(temp);
			temp = temp.parent;
		}

		const setupBreadcrumbs = setups.map((setup, i) => {
			const setupBreadcrumb = document.createElement('breadcrumb-');

			let windText = setup.wind.toString();
			if (i === setups.length - 1) {
				windText = this.#wind.toString();
			}

			const restText = `Rest ${setup.outcome.rest}Y`;
			setupBreadcrumb.init(`${restText} ${windText}`, () => {});
			return setupBreadcrumb;
		});

		setupBreadcrumbs.forEach(breadcrumb => {
			appendDivider();
			container.appendChild(breadcrumb);
		});

	}
}

customElements.define('breadcrumbs-', BreadcrumbsComponent);