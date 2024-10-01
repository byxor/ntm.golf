class Setup {
	constructor(
		stroke,
		wind,
		reference,
		subpixel,
		surface,
		stance,
		club,
		power,
		height,
		spin,
		outcome
	) {
		this.stroke = this.validateStroke(stroke);
		this.wind = this.validateWind(wind);
		this.reference = this.validateReference(reference);
		this.subpixel = this.validateSubpixel(subpixel);
		this.surface = this.validateSurface(surface);
		this.stance = this.validateStance(stance);
		this.club = this.validateClub(club);
		this.power = this.validatePower(power);
		this.height = this.validateHeight(height);
		this.spin = this.validateSpin(spin);
		this.outcome = this.validateOutcome(outcome);
	}

	validateStroke(stroke) {
		// TODO
		return stroke;
	}

	validateWind(wind) {
		if (!(wind instanceof Wind)) {
			throw `'${wind}' is not a Wind`;	
		}
		return wind;
	}

	validateReference(reference) {
		if (!(reference instanceof Reference)) {
			throw `'${reference}' is not a Reference`;
		}
		return reference;
	}

	validateSubpixel(subpixel) {
		if (!(subpixel === undefined || subpixel instanceof Subpixel)) {
			throw `'${subpixel}' is not a Subpixel`;
		}
		return subpixel;
	}

	validateSurface(surface) {
		if (!(surface instanceof Surface)) {
			throw `'${surface}' is not a Surface`;
		}
		return surface;
	}

	validateStance(stance) {
		if (!(stance instanceof Stance)) {
			throw `'${stance}' is not a Stance`;
		}
		return stance;
	}

	validateClub(club) {
		if (!(club instanceof Club)) {
			throw `'${club}' is not a Club`;
		}	
		return club;
	}

	validatePower(power) {
		if (!(power instanceof Power)) {
			throw `'${power}' is not a Power`;
		}
		return power;
	}

	validateHeight(height) {
		if (!(height instanceof Height)) {
			throw `'${height}' is not a Height`;
		}
		return height;
	}

	validateSpin(spin) {
		if (!(spin === undefined || spin instanceof Spin)) {
			throw `'${spin}' is not a Spin`;
		}
		return spin;
	}

	validateOutcome(outcome) {
		if (!(outcome instanceof Outcome)) {
			throw `'${outcome}' is not an Outcome`;
		}
		return outcome;
	}
}