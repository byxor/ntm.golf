class Hole {
	constructor(number, par, pins) {
		this.number = this.validateHoleNumber(number);
		this.par = this.validatePar(par);
		this.pins = this.validatePins(pins);
		// <todo: general notes - (text and images?)>
	}

	validateHoleNumber(number) {
		if (typeof number !== "number") {
			throw `Hole number '${number}' is not a number`;
		}
		if (number < 1 || number > 18) {
			throw `Hole number '${number}' is out of range (1-18)`
		}
		return number;
	}

	validatePar(par) {
		if (par !== undefined) {
			if (!(par === undefined || typeof par === "number")) {
				throw `par '${par}' is not a number or undefined`;
			}
			if (par < 3 || par > 5) {
				throw `par '${par}' is out of range (3-5)`
			}	
		}
		// TODO: validate between 3 and 5 (or empty?)
		return par;
	}

	validatePins(pins) {
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
}