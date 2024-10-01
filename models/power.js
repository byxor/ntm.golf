class Power {
	constructor(value, direction) {
		this.value = value;
		this.direction = this.validateDirection(direction);
		// todo: validate that the power and direction are possible
	}

	validateDirection(direction) {
		return direction;
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

// ...
// const POWER_48_UP = newPower("48%", "up");
// const POWER_48_DOWN = newPower("48%", "down");
// const POWER_49_UP = newPower("49%", "up");
// const POWER_49_DOWN = newPower("49%", "down");
// const POWER_50_UP = newPower("50%", "up");
// const POWER_50_DOWN = newPower("50%", "down");
// const POWER_51_UP = newPower("51%", "up");
// const POWER_51_DOWN = newPower("51%", "down");
// const POWER_52_UP = newPower("52%", "up");
// const POWER_53_UP = newPower("53%", "up");
// const POWER_53_DOWN = newPower("53%", "down");
// const POWER_54_DOWN = newPower("54%", "down");
// const POWER_55_UP = newPower("55%", "up");
// ...
// const POWER_97_UP = newPower("97%", "up");
// const POWER_97_DOWN = newPower("97%", "down");
// const POWER_98_UP = newPower("98%", "up");
// const POWER_98_DOWN = newPower("98%", "down");
// const POWER_99_UP = newPower("99%", "up");
// const POWER_100_DOWN = newPower("100%", "down");
// const POWER_101_UP = newPower("101%", "up");
// const POWER_101_DOWN = newPower("101%", "down");
// const POWER_102_UP = newPower("102%", "up");
// const POWER_102_DOWN = newPower("102%", "down");
// const POWER_103_UP = newPower("103%", "up");
// const POWER_103_DOWN = newPower("103%", "down");
// const POWER_104_UP = newPower("104%", "up");
// const POWER_104_DOWN = newPower("104%", "down");
// const POWER_105_UP = newPower("105%", "up");
// const POWER_MAX_4_DOWN = newPower("max-4%", "down");
// const POWER_MAX_3_UP = newPower("max-3%", "up");
// const POWER_MAX_3_DOWN = newPower("max-3%", "down");
// const POWER_MAX_2_UP = newPower("max-2%", "up");
// const POWER_MAX_2_DOWN = newPower("max-2%", "down");
// const POWER_MAX_1_UP = newPower("max-1%", "up");
// const POWER_MAX_1_DOWN = newPower("max-1%", "down");
// const POWER_MAX = newPower("max%", "");

// Should there be 2 entries for max? 1 for each frame?
// how about MAX_UP is the early one (feels like it "jumps" up to max a little).
// and MAX_DOWN is the later one.

// it's hard to tell which is which tbh so probably not worth adding it (unless extreme accuracy is needed)
