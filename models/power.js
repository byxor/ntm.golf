class Power {
	constructor(value, direction) {
		this.value = value;
		this.direction = direction;

		this.#validateValue();
		this.#validateDirection();
		// TODO: validate that the power and direction are possible
	}

	#validateValue() {

	}

	#validateDirection() {
		if (this.value !== "max%" && this.direction === undefined) {
			throw `Power value '${this.value}' has an undefined direction`;
		}
		// TODO
	}
}

const POWER_CACHE = {};

function newPower(value, direction) {
	const key = value + direction;
	let cachedPower = POWER_CACHE[key];
	if (cachedPower) {
		return cachedPower;
	}
	value = new Power(value, direction); 
	POWER_CACHE[key] = value;
	return value;
}

// Should there be 2 entries for max? 1 for each frame?
// how about MAX_UP is the early one (feels like it "jumps" up to max a little).
// and MAX_DOWN is the later one.

// it's hard to tell which is which tbh so probably not worth adding it (unless extreme accuracy is needed)
