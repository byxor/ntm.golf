class Wind {
	constructor(strength, direction) {
		this.strength = strength;
		this.direction = direction;

		this.#validateStrength();
		this.#validateDirection();
	}

	equals(other) {
		if (other === undefined) {
			return false;
		}
		return this.strength === other.strength && this.direction === other.direction;
	}

	#validateStrength() {
		if (this.strength < 0 || this.strength > 15) {
			throw `Wind strength '${this.strength}' must be between 0 and 15`;
		}
	}

	#validateDirection() {
		const VALID_DIRECTIONS = [
			"N",
			"N+1",
			"NE",
			"NE+1",
			"E",
			"E+1",
			"SE",
			"SE+1",
			"S",
			"S+1",
			"SW",
			"SW+1",
			"W",
			"W+1",
			"NW",
			"NW+1",
		];
		if (this.direction) {
			if (typeof this.direction !== "string") {
				throw `Direction '${this.direction}' is not a string`;
			}
			if (!VALID_DIRECTIONS.includes(this.direction)) {
				throw `'${this.direction}' is not a valid direction`;
			}
		}
	}
}

const WIND_CACHE = {};

function newWind(strength, direction) {
	const key = strength + direction;
	const cachedWind = WIND_CACHE[key];
	if (cachedWind) {
		return cachedWind;
	}
	const value = new Wind(strength, direction);
	WIND_CACHE[key] = value;
	return value;
}