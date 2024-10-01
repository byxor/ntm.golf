class Course {
	constructor(name, holes) {
		this.name = name;
		this.holes = holes;
		this.#validateHoles();
	}

	equals(other) {
		return this.name === other.name;
	}

	#validateHoles() {
		if (!Array.isArray(this.holes)) {
			throw `Holes '${this.holes}' is not an array`;
		}
		for (let i = 0; i < this.holes.length; i++) {
			if (!(this.holes[i] instanceof Hole)) {
				throw `holes[${i}] is not a Hole`;
			}
		}
	}
}

class Courses {
	constructor() {
		this.germany = parseNotes(GERMANY_NOTES, "Germany");
		this.japan = parseNotes(GERMANY_NOTES, "Japan");
		this.australia = parseNotes(GERMANY_NOTES, "Australia");
		this.usa = parseNotes(GERMANY_NOTES, "USA");
		// TODO: add course notes.
		// TODO: add scotland?
	}
}