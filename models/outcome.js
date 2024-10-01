class Outcome {}

class SuccessfulShot extends Outcome {
	constructor(bounce, trees, consistent, notes) {
		super();
		this.bounce = this.validateBounce(bounce);
		this.rollsIn = this.bounce === 0;
		this.trees = this.validateTrees(trees);
		this.consistent = this.validateConsistency(consistent);
		this.notes = this.validateNotes(notes);
	}

	validateBounce(bounce) {
		// TODO
		return bounce;
	}

	validateTrees(trees) {
		// TODO
		return trees;
	}

	validateConsistency(consistent) {
		// TODO
		return consistent;
	}

	validateNotes(notes) {
		// TODO
		return notes;
	}
}

class NotFinishedYet extends Outcome {
	constructor(rest, notes) {
		super();
		this.rest = this.validateRest(rest);
		this.notes = this.validateNotes(notes);
	}

	validateRest(rest) {
		// TODO
		return rest;
	}

	validateNotes(notes) {
		// TODO
		return notes;
	}
}