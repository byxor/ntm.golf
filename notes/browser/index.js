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

	// TODO: use the browser history API to enable back/forward to work correctly

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
		const pinParam = getQueryParam("pin");

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

		if (courseParam) {
			const course = (() => {
				return {
					"germany": this.#courses.germany,
					"japan": this.#courses.japan,
					"australia": this.#courses.australia,
					"usa": this.#courses.usa,
					"scotland": this.#courses.scotland,
				}[courseParam] || "germany";
			})();

			this.setCourse(course, !windParam);
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

		if (pinParam) {
			const pin = (() => {
				return this.#hole.pins.find(pin => {
					return pinParam === pin.toNavString();
				})
			})();
			this.setPin(pin);
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
			addQueryParam("pin", this.#pin.toNavString());
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

	setCourse(course, shouldUpdateHole=true) {
		console.log(`NavigationController: setCourse(${course.name})`);

		this.#course = course;
		this.#onCourseChangedListeners.forEach(listener => listener(course));

		if (shouldUpdateHole) {
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

		document.title = `Neo Turf Masters - ${course.name}`;
	}

	setHole(hole) {
		console.log(`NavigationController: setHole(${hole?.number})`);

		if (this.#hole !== hole) {
			this.#hole = hole;
			this.#onHoleChangedListeners.forEach(listener => listener(hole));
		}

		// choose first pin if it exists
		const eligiblePins = this.#hole?.pins?.filter(pin => pin.setups.length > 0) || [];
		if (eligiblePins.length > 0) {
			this.setPin(eligiblePins[0]);
		} else {
			this.setPin(undefined);
		}
	}

	setPin(pin) {
		console.log(`NavigationController: setPin(${pin?.distance}Y ${pin?.label})`);
		
		if (this.#pin !== pin) {
			this.#pin = pin;
			this.#onPinChangedListeners.forEach(listener => listener(pin));
		}

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

		if (!this.#wind?.logicallyEquals(wind)) {
			this.#wind = wind;
			this.#onWindChangedListeners.forEach(listener => listener(wind));
		}
	}

	getCourse() {
		return this.#course;
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

	static async create(containerId) {
		const container = document.getElementById(containerId);

		let courses;
		try {
			courses = await Courses.create();
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

		return new NotesBrowser(container, courses);
	}

	constructor(container, courses) {
		const navigationController = new NavigationController(courses);

		const notesBrowserComponent = document.createElement('notes-browser');
		notesBrowserComponent.init(navigationController, courses);

		container.appendChild(notesBrowserComponent);
	}
}