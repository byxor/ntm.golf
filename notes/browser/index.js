class NavigationController {

	// TODO: allow URL-based navigation with queryparameters

	// TODO: use the browser history API to enable back/forward to work

	#courses;
	
	#onCourseChangedListeners = [];
	#onHoleChangedListeners = [];
	#onPinChangedListeners = [];
	#onSetupChangedListeners = [];
	#onWindChangedListeners = [];

	#course;
	#hole;
	#pin;
	#setup;
	#wind;

	constructor(courses) {
		this.#courses = courses;

		this.#course = undefined;
		this.#hole = undefined;
		this.#pin = undefined;
		this.#wind = undefined;
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
			this.setHole(holeWithSameNumber);
		} else {
			this.setHole(this.#course.holes[0]);
		}
	}

	setHole(hole) {
		console.log(`NavigationController: setHole(${hole})`);

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






























		// this.chosenPin.setups.forEach(setup => {
		// 	const setupComponent = document.createElement('setup-');
		// 	setupComponent.init(setup, 0);
		// 	container.appendChild(setupComponent);
		// });

		// {
		// 	const stroke = 1;
		// 	const wind = newWind(5, "NE");
		// 	const reference = new Reference();
		// 	const subpixel = LEFTMOST_SUBPIXEL;
		// 	const surface = TEE_SURFACE;
		// 	const stance = STANCE_3x_HOOK;
		// 	const club = CLUB_250Y;
		// 	const power = newPower("104%", "up");
		// 	const height = newHeight("N-2", "down", club);
		// 	const spin = undefined;
		// 	const outcome = new SuccessfulShot(2, 0, false, [
		// 			"rough if miss",
		// 			"very rarely goes in for some reason",
		// 		]);
		// 	const setup = new Setup(stroke, wind, reference, subpixel, surface, stance, club, power, height, spin, outcome);
		// 	const setupComponent = document.createElement('setup-');
		// 	setupComponent.init(setup, animationDelayIndex++);
		// 	container.appendChild(setupComponent);

		// 	console.log(setup);
		// }

		// {
		// 	const stroke = 1;
		// 	const wind = newWind(5, "NE");
		// 	const reference = new Reference();
		// 	const subpixel = LEFTMOST_SUBPIXEL;
		// 	const surface = WATER_SURFACE;
		// 	const stance = STANCE_2x_HOOK;
		// 	const club = CLUB_160Y;
		// 	const power = newPower("max%", "");
		// 	const height = newHeight("N-2", "down", club);
		// 	const spin = undefined;
		// 	const outcome = new SuccessfulShot(2, 0, false, [
		// 			"OOB if miss",
		// 			"H topspin if max-1%",
		// 			"needs work"
		// 		]);
		// 	const setup = new Setup(stroke, wind, reference, subpixel, surface, stance, club, power, height, spin, outcome);
		// 	const setupComponent = document.createElement('setup-');
		// 	setupComponent.init(setup, animationDelayIndex++);
		// 	container.appendChild(setupComponent);

		// 	console.log(setup);
		// }

		// {
		// 	const stroke = 2;
		// 	const wind = newWind(5, "NE");
		// 	const reference = new Reference();
		// 	const subpixel = LEFTMOST_SUBPIXEL;
		// 	const surface = FAIRWAY_SURFACE;
		// 	const stance = STANCE_1x_HOOK;
		// 	const club = CLUB_160Y;
		// 	const power = newPower("max-1%", "down");
		// 	const height = newHeight("NS", "up", club);
		// 	const spin = TOPSPIN;
		// 	const outcome = new NotFinishedYet(200, []);
		// 	const setup = new Setup(stroke, wind, reference, subpixel, surface, stance, club, power, height, spin, outcome);
		// 	const setupComponent = document.createElement('setup-');
		// 	setupComponent.init(setup, animationDelayIndex++);
		// 	container.appendChild(setupComponent);

		// 	console.log(setup);
		// }

		// {
		// 	const stroke = 2;
		// 	const wind = newWind(5, "NE");
		// 	const reference = new Reference();
		// 	const subpixel = LEFTMOST_SUBPIXEL;
		// 	const surface = FAIRWAY_SURFACE;
		// 	const stance = DEFAULT_STANCE;
		// 	const club = CLUB_160Y;
		// 	const power = newPower("max-1%", "down");
		// 	const height = newHeight("NS", "up", club);
		// 	const outcome = new SuccessfulShot(0, 3, false, []);
		// 	const spin = BACKSPIN;
		// 	const setup = new Setup(stroke, wind, reference, subpixel, surface, stance, club, power, height, spin, outcome);
		// 	const setupComponent = document.createElement('setup-');
		// 	setupComponent.init(setup, animationDelayIndex++);
		// 	container.appendChild(setupComponent);

		// 	console.log(setup);
		// }