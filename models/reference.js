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

// class FlagReference extends Reference {
// 	constructor(mvflag) {
// 		this.mvflag = this.validateMvflag(mvflag);
// 	}

// 	validateMvflag(mvflag) {
// 		if (typeof mvflag !== "number") {
// 			throw `mvflag '${mvflag}' is not a number`;
// 		}
// 		if (Math.abs(mvflag) > 7) {
// 			throw `mvflag '${mvflag}' is too large, make a visual reference`;
// 		}
// 		return mvflag;
// 	}
// }