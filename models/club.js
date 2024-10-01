class Club {
	constructor(name, type, heightRange) {
		this.name = name;
		this.type = this.validateType(type);
		this.heightRange = heightRange;
	}

	validateType(type) {
		const VALID_TYPES = [
			"Putter",
			"Wood",
			"Iron",
			"Wedge"
		];
		// TODO
		return type;
	}
}

function newClub(name, type, heightRange) {
	return new Club(name, type, heightRange);
}

const CLUB_280Y = newClub("280Y", "Wood", "e");
const CLUB_260Y = newClub("260Y", "Wood", "e");
const CLUB_250Y = newClub("250Y", "Wood", "e");
const CLUB_240Y = newClub("240Y", "Wood", "e");
const CLUB_220Y = newClub("220Y", "Iron", "d");
const CLUB_210Y = newClub("210Y", "Iron", "c");
const CLUB_200Y = newClub("200Y", "Iron", "c");
const CLUB_190Y = newClub("190Y", "Iron", "c");
const CLUB_180Y = newClub("180Y", "Iron", "b");
const CLUB_170Y = newClub("170Y", "Iron", "b");
const CLUB_160Y = newClub("160Y", "Iron", "b");
const CLUB_140Y = newClub("140Y", "Wedge", "a");
const CLUB_120Y = newClub("120Y", "Wedge", "a");
// const CLUB_PUTTER = new Club("Putter");