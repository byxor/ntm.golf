class Surface {
	constructor(name) {
		this.name = name;
		// TODO: consider storing estimated recovery values
	}
}

const TEE_SURFACE = new Surface("tee");
const FAIRWAY_SURFACE = new Surface("fairway");
const ROUGH_SURFACE = new Surface("rough");
const HEAVY_ROUGH_SURFACE = new Surface("heavy-rough");
const BUNKER_1_SURFACE = new Surface("bunker-1");
const BUNKER_2_SURFACE = new Surface("bunker-2");
const BUNKER_3_SURFACE = new Surface("bunker-3");
const BUNKER_4_SURFACE = new Surface("bunker-4");
const WATER_SURFACE = new Surface("water");

const GREEN_SURFACE = new Surface("green");
const GREEN_FRINGE_SURFACE = new Surface("green-fringe");
const CARTPATH_SURFACE = new Surface("cartpath");