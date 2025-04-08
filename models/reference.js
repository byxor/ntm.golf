class Reference {}

class VisualReference extends Reference {
	constructor(image) {
		super();
		this.image = this.validateImage(image);
	}

	validateImage(image) {
		if (typeof image !== "string") {
			throw `Image '${image}' is not a string`
		}
		if (image === "") {
			throw `image is an empty string`;
		}
		return image;
	}
}

class FlagReference extends Reference {
	constructor(mvflag) {
		super();
		this.mvflag = this.validateMvflag(mvflag);
	}

	validateMvflag(mvflag) {
		if (typeof mvflag !== "number") {
			throw `mvflag '${mvflag}' is not a number`;
		}
		return mvflag;
	}

	logicallyEquals(other) {
		return this.mvflag === other.mvflag;
	}
}