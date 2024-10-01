class Spin {
	constructor(value) {
		this.value = this.validateValue(value);
	}

	validateValue(value) {
		return value === "topspin" || value === "backspin";
	}
}

const TOPSPIN = new Spin("topspin");
const BACKSPIN = new Spin("backspin");