class Hole {
	constructor(number, par, notes, pins, courseName) {
		this.number = this.#validateHoleNumber(number);
		this.par = this.#validatePar(par);
		this.notes = this.#validateNotes(notes);
		this.pins = this.#validatePins(pins);
		this.courseName = this.#validateCourseName(courseName);	
		this.maxWind = (() => {
			switch (number) {
				case 1:
				case 2:
					return 3;
				case 3:
					return 5;
				case 4:
					return 8;
				default:
					return 15;
			}
		})();
	}

	equals(other) {
		if (other === undefined) {
			return false;
		}
		return (
			this.courseName === other.courseName &&
			this.number === other.number
		);
	}

	#validateHoleNumber(number) {
		if (typeof number !== "number") {
			throw `Hole number '${number}' is not a number`;
		}
		if (number < 1 || number > 18) {
			throw `Hole number '${number}' is out of range (1-18)`
		}
		return number;
	}

	#validatePar(par) {
		if (par !== undefined) {
			if (!(par === undefined || typeof par === "number")) {
				throw `par '${par}' is not a number or undefined`;
			}
			if (par < 3 || par > 5) {
				throw `par '${par}' is out of range (3-5)`
			}	
		}
		return par;
	}

	#validateNotes(notes) {
		if (!Array.isArray(notes)) {
			throw `Notes '${notes}' is not an array`;
		}
		for (let i = 0; i < notes.length; i++) {
			if (!(notes[i] instanceof HoleNote)) {
				throw `notes[${i}] is not a HoleNote`;
			}
		}
		return notes;
	}

	#validatePins(pins) {
		if (!Array.isArray(pins)) {
			throw `Pins '${pins}' is not an array`;
		}
		for (let i = 0; i < pins.length; i++) {
			if (!(pins[i] instanceof Pin)) {
				throw `pins[${i}] is not a Pin`;
			}
		}
		return pins;
	}

	#validateCourseName(courseName) {
		if (typeof courseName !== "string") {
			throw `Hole courseName '${courseName}' is not a string`;
		}
		const VALID_COURSE_NAMES = [
			"Germany",
			"Japan",
			"Australia",
			"USA",
			"Scotland",
		]
		if (!VALID_COURSE_NAMES.includes(courseName)) {
			throw `'${courseName}' is not a valid course name`;
		}
		return courseName;
	}
}