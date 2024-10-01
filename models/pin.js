class Pin {
	constructor(label, distance, image, setups) {
		this.label = this.validateLabel(label);
		this.distance = this.validateDistance(distance);
		this.image = this.validateImage(image);
		this.setups = this.validateSetups(setups);
	}

	validateLabel(label) {
		if (typeof label !== "string") {
			throw `Label '${label}' is not a string`;
		}
		return label;
	}

	validateDistance(distance) {
		if (typeof distance !== "number") {
			throw `Distance '${distance}' is not a number`;
		}
		return distance;
	}

	validateImage(image) {
		if (typeof image !== "string") {
			throw `Image '${image}' is not a string`;
		}
		return image;
	}

	validateSetups(setups) {
		if (!Array.isArray(setups)) {
			throw `Setups '${setups}' is not an array`;
		}
		for (let i = 0; i < setups.length; i++) {
			if (!(setups[i] instanceof Setup)) {
				throw `setups[${i}] is not a Setup`;
			}
		}
		return setups;
	}
}