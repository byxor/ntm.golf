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
	
	static async create() {
		const fetches = [
			fetch("/notes/germany.txt"),
			fetch("/notes/japan.txt"),
			fetch("/notes/australia.txt"),
			fetch("/notes/usa.txt"),
			fetch("/notes/scotland.txt")
		];

		const responses = await Promise.all(fetches);

		const notes = await Promise.all(responses.map((response, i) => {
			if (!response.ok) {
				const courseName = [
					"Germany", "Japan", "Australia", "USA", "Scotland"
				][i];
				throw new Error(`Failed to fetch ${courseName} notes`);
			}
			return response.text();
		}));

		const [
			germanyNotes,
			japanNotes,
			australiaNotes,
			usaNotes,
			scotlandNotes
		] = notes;

		const germany = parseNotes(germanyNotes, "Germany");
		const japan = parseNotes(japanNotes, "Japan");
		const australia = parseNotes(australiaNotes, "Australia");
		const usa = parseNotes(usaNotes, "USA");
		const scotland = parseNotes(scotlandNotes, "Scotland")

		return new Courses(germany, japan, australia, usa, scotland);
	}

	constructor(germany, japan, australia, usa, scotland) {
		this.germany = germany;
		this.japan = japan;
		this.australia = australia;
		this.usa = usa;
		this.scotland = scotland;
	}
}