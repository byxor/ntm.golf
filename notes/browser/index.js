class NotesBrowser {
	constructor(containerId) {
		this.courses = new Courses();

		// navigate to relevant setup based on URL

		// https://ntm.golf/
		// (loads germany I guess)

		// https://ntm.golf/?course=usa
		// (loads USA?)

		// idk, figure this out later

		this.chosenCourse = this.courses.germany;
		this.chosenHole = this.chosenCourse.holes[0];
		this.chosenPin = this.chosenHole.pins[0];
		this.chosenSetup = undefined;


		console.log(this.chosenPin);

		const container = document.getElementById(containerId);

		const navigationComponent = document.createElement('navigation-');
		navigationComponent.init(this.courses);
		container.appendChild(navigationComponent);

		this.chosenPin.setups.forEach(setup => {
			const setupComponent = document.createElement('setup-');
			setupComponent.init(setup, 0);
			container.appendChild(setupComponent);
		});

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
	}

	onCourseSelected(courseName) {
		console.log(`NotesBrowser: selected course '${courseName}'`);
		this.chosenCourse = this.courses[name];
	}

	onHoleSelected(number) {
		console.log(`NotesBrowser: selected hole ${number}`);
		this.chosenHole = number;
	}

	onPinSelected(pin) {
		console.log(`NotesBrowser: selected pin ${pin}`);
		this.chosenPin = pin;
	}

	onSetupSelected(setup) {

	}
}