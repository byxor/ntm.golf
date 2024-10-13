class HoleNote {}

class ImageHoleNote extends HoleNote {
    constructor(image) {
        super();

        this.image = image;

        this.#validateImage();
    }

    #validateImage() {
		if (typeof this.image !== "string") {
			throw `Image '${this.image}' is not a string`
		}
		if (this.image === "") {
			throw `image is an empty string`;
		}
	}
}

class TextHoleNote extends HoleNote {
    constructor(text) {
        super();

        this.text = text;

        this.#validateText();
    }

    #validateText() {
		if (typeof this.text !== "string") {
			throw `Text '${this.text}' is not a string`
		}
		if (this.text === "") {
			throw `text is an empty string`;
		}
	}
}