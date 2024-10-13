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
			const hole = this.holes[i];
			if (!(hole === undefined || hole instanceof Hole)) {
				throw `holes[${i}] is not a Hole`;
			}
		}
	}
}

class Courses {
	constructor() {
		this.germany = parseNotes(GERMANY_NOTES, "Germany");
		this.japan = parseNotes(``, "Japan");
		this.australia = parseNotes(``, "Australia");
		this.usa = parseNotes(``, "USA");
		// TODO: add course notes.
		// TODO: add scotland?
	}
}