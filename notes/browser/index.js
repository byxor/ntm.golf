const addQueryParam = (key, value) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.pushState({}, '', url.toString());
};

const removeQueryParam = (key) => {
	window.history.replaceState(key, null);
}

const getQueryParam = (key) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key) || '';
};

class NavigationController {

	// TODO: allow URL-based navigation with queryparameters
	// TODO: use the browser history API to enable back/forward to work

	#courses;
	
	#onCourseChangedListeners = [];
	#onHoleChangedListeners = [];
	#onPinChangedListeners = [];
	#onSetupChangedListeners = [];
	#onWindChangedListeners = [];

	#golfer;
	#course;
	#hole;
	#pin;
	#setup;
	#wind;

	constructor(courses) {
		this.#courses = courses;

		this.#golfer = "almeida"; // TODO: use proper model
		this.#course = undefined;
		this.#hole = undefined;
		this.#pin = undefined;
		this.#wind = undefined;

		setInterval(() => {
			this.updateURL();
		}, 500);
	}

	navigateViaUrl() {
		const courseParam = getQueryParam("course");
		const holeParam = getQueryParam("hole");
		const windParam = getQueryParam("into");

		if (courseParam) {
			const course = (() => {
				return {
					"germany": this.#courses.germany,
					"japan": this.#courses.japan,
					"australia": this.#courses.australia,
					"usa": this.#courses.usa,
				}[courseParam] || "germany";
			})();
			this.setCourse(course);
		} else {
			this.setCourse(this.#courses.germany);
		}

		if (holeParam) {
			const hole = (() => {
				const holeNumber = parseInt(holeParam);
				return this.#course.holes.find(hole => hole?.number === holeNumber);
			})();
			this.setHole(hole);
		}

		if (windParam) {
			const wind = (() => {
				const segments = windParam?.split("_");
				const strength = parseInt(segments[0]);
				const direction = segments[2]?.replace("1", "+1");
				const wind = newWind(strength, direction);
				return wind;
			})();
			this.setWind(wind);
		}
	}

	updateURL() {
		if (
			(this.#golfer === this.lastGolfer) &&
			(this.#course === this.lastCourse) &&
			(this.#hole === this.lastHole) &&
			(this.#pin === this.lastPin) &&
			(this.#wind === this.lastWind)
		) {
			return;
		}

		window.history.pushState({}, document.title, window.location.pathname);

		if (this.#course) {
			addQueryParam("course", this.#course.name.toLowerCase());
		}

		if (this.#hole) {
			addQueryParam("hole", this.#hole.number);
		}

		if (this.#pin) {
			addQueryParam("pin", `${this.#pin.distance}-yds-${this.#pin.label.toLowerCase().replaceAll(" ", "-")}`);
		}

		addQueryParam("with", this.#golfer);

		if (this.#wind) {
			addQueryParam("into", this.#wind.toString().replace(")", "").replace("(", "_").replace("+", "").replace("w", "_wind"));
		}

		this.lastGolfer = this.#golfer;
		this.lastCourse = this.#course;
		this.lastHole = this.#hole;
		this.lastPin = this.#pin;
		this.lastWind = this.#wind;

		console.log(`Url updated: ${window.location}`);
	}

	setCourse(course) {
		console.log(`NavigationController: setCourse(${course.name})`);

		this.#course = course;
		this.#onCourseChangedListeners.forEach(listener => listener(course));

		if (this.#hole !== undefined) {
			const holeWithSameNumber = (() =>
				this.#course.holes.find(hole =>
					hole?.number === this.#hole.number
			))();

			if (holeWithSameNumber) {
				this.setHole(holeWithSameNumber);
			} else {
				const firstDefinedHole = this.#course.holes.find(hole => hole !== undefined);
				if (firstDefinedHole) {
					this.setHole(firstDefinedHole);
				} else {
					this.setHole(undefined);
				}
			}
		} else {
			const firstDefinedHole = this.#course.holes.find(hole => hole !== undefined);
			if (firstDefinedHole) {
				this.setHole(firstDefinedHole);
			} else {
				this.setHole(undefined);
			}
		}
	}

	setHole(hole) {
		console.log(`NavigationController: setHole(${hole?.number})`);

		this.#hole = hole;
		this.#onHoleChangedListeners.forEach(listener => listener(hole));

		// choose first pin if it exists
		if (this.#hole?.pins?.length > 0) {
			this.setPin(this.#hole.pins[0]);
		} else {
			this.setPin(undefined);
		}
	}

	setPin(pin) {
		console.log(`NavigationController: setPin(${pin?.distance}Y ${pin?.label})`);
		
		this.#pin = pin;
		this.#onPinChangedListeners.forEach(listener => listener(pin));

		this.setSetup(undefined);
	}

	nextHole() {
		if (this.#hole.number < 18) {
			this.setHole(this.#course.holes[this.#hole.number]);
		}
	}

	setSetup(setup) {
		console.log(`NavigationController: setSetup(${setup})`);

		this.#setup = setup;
		this.#onSetupChangedListeners.forEach(listener => listener(setup));
	}

	setWind(wind) {
		console.log(`NavigationController: setWind(${wind})`);

		this.#wind = wind;
		this.#onWindChangedListeners.forEach(listener => listener(wind));
	}

	onCourseChanged(listener) {
		this.#onCourseChangedListeners.push(listener);
	}

	onHoleChanged(listener) {
		this.#onHoleChangedListeners.push(listener);
	}

	onPinChanged(listener) {
		this.#onPinChangedListeners.push(listener);
	}

	onSetupChanged(listener) {
		this.#onSetupChangedListeners.push(listener);
	}

	onWindChanged(listener) {
		this.#onWindChangedListeners.push(listener);
	}
}

class NotesBrowser {
	constructor(containerId) {
		const container = document.getElementById(containerId);

		let courses;
		try {
			courses = new Courses();
		} catch (e) {
			const headerElement = document.createElement('h1');
			headerElement.innerHTML = "Error: failed to parse notes";
			headerElement.style.color = "red";
			headerElement.style.textDecoration = "underline";
			container.appendChild(headerElement);

			const errorElement = document.createElement('h2');
			errorElement.innerHTML = e;
			container.appendChild(errorElement);

			const explanationText = document.createElement('p');
			explanationText.style.paddingTop = 50;
			explanationText.innerHTML = `(WIP) Error message may be misleading...<br/><br/>Check console for details...`;
			container.appendChild(explanationText);

			throw e;
		}

		const navigationController = new NavigationController(courses);

		const notesBrowserComponent = document.createElement('notes-browser');
		notesBrowserComponent.init(navigationController, courses);

		container.appendChild(notesBrowserComponent);
	}
}