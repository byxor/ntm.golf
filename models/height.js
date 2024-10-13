class Height {
	constructor(value, direction, club) {
		this.value = this.#validateValue(value);
		this.direction = this.#validateDirection(direction);
		this.club = this.#validateClub(club);
		this.isRelative = (() => {
			if (this.value === "H") {
				return true;
			} else if (this.value === "L") {
				return true;
			} else if (this.value.includes("H-")) {
				return true;
			} else if (this.value.includes("L+")) {
				return true;
			}
			return false;
		})();
	}

	#validateValue(value) {
		// TODO?
		return value;
	}

	#validateDirection(direction) {
		const VALID_DIRECTIONS = [
			"up",
			"down",
		];
		if (typeof direction !== "string") {
			throw `Direction '${direction}' is not a string`;
		}
		return direction;
	}

	#validateClub(club) {
		if (!(club instanceof Club)) {
			throw `'${club}' is not a Club`;
		}
		return club;
	}
}

const HEIGHT_CACHE = {};

function newHeight(value, direction, club) {
	const key = value + direction + club.name;
	const cachedHeight = HEIGHT_CACHE[key];
	if (cachedHeight) {
		return cachedHeight;
	}
	const v = new Height(value, direction, club);
	HEIGHT_CACHE[key] == v;
	return v;
}

// do I need a way to convert relative heights to absolute (based on club)?
// e.g. 250Y H -> NS+1

