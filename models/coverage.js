class PinCoverage {

    constructor(hole, pin) {

        this.hole = hole;
        this.pin = pin;

        this.numberOfWindCombinationsForPin = 1337;
        this.knownSetups = {};
        this.percentageCovered = 0.0; // 0 - 100

        this.#calculate();
    }

    toString() {
        return `${this.knownSetups.size}/${this.numberOfWindCombinationsForPin}  (${Math.round(this.percentageCovered)}%)`;
    }

    #calculate() {
        // TODO: very laggy, scales poorly...
        // consider calculating once at parse time and never recomputing
        // - or just memoize results

        const numberOfDirections = 16;

        const numberOfWindCombinationsPerStroke = (numberOfDirections * this.hole.maxWind) + 1;

        const numberOfStrokes = (() => {
            // Guess the optimal number of strokes by choosing the highest stroke number from the setups.
            // Will be incorrect if there's a setup that takes an unnecessarily long route, but why
            // would we have one of those?
            let strokes = 0;

            const process = setup => {
                if (strokes < setup?.stroke) {
                    strokes = setup?.stroke;
                }
                setup.children.forEach(setup => process(setup));
            };
            this.pin.setups.forEach(setup => process(setup));

            return strokes;
        })();

        this.numberOfWindCombinationsForPin = Math.pow(numberOfWindCombinationsPerStroke, numberOfStrokes);

        this.knownSetups = new Set();
        const process = setup => {
            if (setup.children.length === 0) {
                
                let identifier = setup.wind.toString();

                let temp = setup.parent;
                while (temp !== undefined) {
                    identifier = `${temp.wind.toString()}/${identifier}`;
                    temp = temp.parent;
                }

                this.knownSetups.add(identifier);
            } else {
                setup.children.forEach(child => process(child));
            }
        };
        this.pin?.setups.forEach(setup => process(setup));

        this.percentageCovered = (this.knownSetups.size / this.numberOfWindCombinationsForPin) * 100;
    }
}

const PIN_COVERAGE_CACHE = {};

const newPinCoverage = (hole, pin) => {
    const key = `${hole.courseName}-${hole.number}-${pin.toNavString()}`;

    const cachedPinCoverage = PIN_COVERAGE_CACHE[key];
	if (cachedPinCoverage) {
		return cachedPinCoverage;
	}

	const value = new PinCoverage(hole, pin);
	PIN_COVERAGE_CACHE[key] = value;

	return value;
};


class HoleCoverage {

    constructor(hole) {
        const eligiblePins = hole.pins.filter(pin => pin.setups.length > 0);

        this.pinCoverages = eligiblePins.map(pin => {
            return newPinCoverage(hole, pin);
        });

        this.numberOfPinAndWindCombinationsForHole = 1337;
        this.knownSetups = 1337;
        this.percentageCovered = 0.0; // 0 - 100

        if (eligiblePins.length > 0) {
            this.#calculate();
        }
    }

    toString() {
        return `${this.knownSetups}/${this.numberOfPinAndWindCombinationsForHole}  (~${Math.round(this.percentageCovered)}%)`;
    }

    #calculate() {
        // Just an assumption.
        // Based on the MVS version of the game.
        // I believe some pins will hardly show (if ever?) depending on the level.
        // TODO: double check how pin RNG works - is it a sliding window of 6 pins (out of 8 total)?
        const numberOfPins = 8;

        // Take this value from the first pin coverage.
        // Assume the value will be identical for all pins.
        // Note: This may not necessarily be correct if some pins require extra strokes than others.
        const numberOfWindCombinationsForPin = this.pinCoverages[0].numberOfWindCombinationsForPin;

        // TODO: Could also calculate more accurately by accumulating all the pin coverages if all 8 are present.
        this.numberOfPinAndWindCombinationsForHole = numberOfPins * numberOfWindCombinationsForPin;

        this.knownSetups = 0;
        this.pinCoverages.forEach(pinCoverage => {
            this.knownSetups += pinCoverage.knownSetups.size;
        });

        this.percentageCovered = (this.knownSetups / this.numberOfPinAndWindCombinationsForHole) * 100;
    }

}

const HOLE_COVERAGE_CACHE = {};

const newHoleCoverage = hole => {
    const key = `${hole.courseName}-${hole.number}`;

    const cachedHoleCoverage = HOLE_COVERAGE_CACHE[key];
	if (cachedHoleCoverage) {
		return cachedHoleCoverage;
	}

	const value = new HoleCoverage(hole);
	HOLE_COVERAGE_CACHE[key] = value;

	return value;
};


class CourseCoverage {
    // Just a consideration.
    // Might be demotivating to see how low this number will be.
}