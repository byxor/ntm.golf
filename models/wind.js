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

	logicallyEquals(other) {
		if (other === undefined) {
			return false;
		}
		if (this.strength === 0) {
			return other.strength === 0;
		}
		return this.equals(other);
	}

	opposite() {
		const oppositeDirection = {
			"S": "N",
			"S+1": "N+1",
			"SW": "NE",
			"SW+1": "NE+1",
			"W": "E",
			"W+1": "E+1",
			"NW": "SE",
			"NW+1": "SE+1",
			"N": "S",
			"N+1": "S+1",
			"NE": "SW",
			"NE+1": "SW+1",
			"E": "W",
			"E+1": "W+1",
			"SE": "NW",
			"SE+1": "NW+1",
		}[this.direction];
		return newWind(this.strength, oppositeDirection);
	}

	horizontallyFlipped() {
		const flippedDirection = {
			"S": "S",
			"S+1": "SE+1",
			"SW": "SE",
			"SW+1": "E+1",
			"W": "E",
			"W+1": "NE+1",
			"NW": "NE",
			"NW+1": "N+1",
			"N": "N",
			"N+1": "NW+1",
			"NE": "NW",
			"NE+1": "W+1",
			"E": "W",
			"E+1": "SW+1",
			"SE": "SW",
			"SE+1": "S+1",
		}[this.direction];
		return newWind(this.strength, flippedDirection);
	}

	toString() {
		if (this.strength === 0) {
			return "0w";
		}
		return `${this.strength}w(${this.direction})`;
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
				debugger;
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