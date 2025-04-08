class Club {
	constructor(name, type, heightRanges) {
		this.name = name;
		this.type = this.validateType(type);
		
		this.heightRanges = heightRanges;
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

function newClub(name, type, heightRanges) {
	return new Club(name, type, heightRanges);
}

const CLUB_280Y = newClub("280Y", "Wood", {
	[TEE_SURFACE.name]: "e",
	[FAIRWAY_SURFACE.name]: "e",
});
const CLUB_260Y = newClub("260Y", "Wood", {
	[TEE_SURFACE.name]: "e",
	[FAIRWAY_SURFACE.name]: "e",
	[ROUGH_SURFACE.name]: "f",
	[BUNKER_1_SURFACE.name]: "f",
});
const CLUB_250Y = newClub("250Y", "Wood", {
	[TEE_SURFACE.name]: "e",
	[FAIRWAY_SURFACE.name]: "e",
	[ROUGH_SURFACE.name]: "f",
	[BUNKER_1_SURFACE.name]: "f",
});
const CLUB_240Y = newClub("240Y", "Wood", {
	[TEE_SURFACE.name]: "d",
	[FAIRWAY_SURFACE.name]: "d",
	[ROUGH_SURFACE.name]: "e",
	[HEAVY_ROUGH_SURFACE.name]: "f",
	[BUNKER_1_SURFACE.name]: "f",
});
const CLUB_220Y = newClub("220Y", "Iron", {
	[TEE_SURFACE.name]: "d",
	[FAIRWAY_SURFACE.name]: "d",
	[ROUGH_SURFACE.name]: "e",
	[HEAVY_ROUGH_SURFACE.name]: "f",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
});
const CLUB_210Y = newClub("210Y", "Iron", {
	[TEE_SURFACE.name]: "c",
	[FAIRWAY_SURFACE.name]: "c",
	[ROUGH_SURFACE.name]: "d",
	[HEAVY_ROUGH_SURFACE.name]: "d",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
});
const CLUB_200Y = newClub("200Y", "Iron", {
	[TEE_SURFACE.name]: "c",
	[FAIRWAY_SURFACE.name]: "c",
	[ROUGH_SURFACE.name]: "d",
	[HEAVY_ROUGH_SURFACE.name]: "d",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
});
const CLUB_190Y = newClub("190Y", "Iron", {
	[TEE_SURFACE.name]: "c",
	[FAIRWAY_SURFACE.name]: "c",
	[ROUGH_SURFACE.name]: "d",
	[HEAVY_ROUGH_SURFACE.name]: "d",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
});
const CLUB_180Y = newClub("180Y", "Iron", {
	[TEE_SURFACE.name]: "b",
	[FAIRWAY_SURFACE.name]: "b",
	[ROUGH_SURFACE.name]: "c",
	[HEAVY_ROUGH_SURFACE.name]: "c",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
	[BUNKER_4_SURFACE.name]: "a",
	[WATER_SURFACE.name]: "a",
});
const CLUB_170Y = newClub("170Y", "Iron", {
	[TEE_SURFACE.name]: "b",
	[FAIRWAY_SURFACE.name]: "b",
	[ROUGH_SURFACE.name]: "c",
	[HEAVY_ROUGH_SURFACE.name]: "c",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
	[BUNKER_4_SURFACE.name]: "a",
	[WATER_SURFACE.name]: "a",
});
const CLUB_160Y = newClub("160Y", "Iron", {
	[TEE_SURFACE.name]: "b",
	[FAIRWAY_SURFACE.name]: "b",
	[ROUGH_SURFACE.name]: "c",
	[HEAVY_ROUGH_SURFACE.name]: "c",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
	[BUNKER_4_SURFACE.name]: "a",
	[WATER_SURFACE.name]: "a",
});
const CLUB_140Y = newClub("140Y", "Wedge", {
	[TEE_SURFACE.name]: "a",
	[FAIRWAY_SURFACE.name]: "a",
	[ROUGH_SURFACE.name]: "b",
	[HEAVY_ROUGH_SURFACE.name]: "b",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
	[BUNKER_4_SURFACE.name]: "a",
	[WATER_SURFACE.name]: "a",
});
const CLUB_120Y = newClub("120Y", "Wedge", {
	[TEE_SURFACE.name]: "a",
	[FAIRWAY_SURFACE.name]: "a",
	[ROUGH_SURFACE.name]: "c",
	[HEAVY_ROUGH_SURFACE.name]: "d",
	[BUNKER_1_SURFACE.name]: "a",
	[BUNKER_2_SURFACE.name]: "a",
	[BUNKER_3_SURFACE.name]: "a",
	[BUNKER_4_SURFACE.name]: "a",
	[WATER_SURFACE.name]: "a",
});
// const CLUB_PUTTER = new Club("Putter");