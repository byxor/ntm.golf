function parseNotes(notes, courseName) {
	const lines = notes.split("\n");
	let i = 0;
	lines.forEach(line => {
		i++;
		// console.log(`${i}: ${line}`);
	});
	// console.log("---------------------------------");

	function parseCourse(lineNumber) {
		const start = lineNumber;

		const unindexedHoles = [];
		let line = lines[lineNumber];

		while (lineNumber < lines.length) {
			line = lines[lineNumber];
			
			if (line.trim() === "" || line.trim().startsWith("//")) {
				lineNumber++;
			} else if (line.startsWith("#")) {
				const [hole, nextLineNumber] = parseHole(lineNumber);
				unindexedHoles.push(hole);
				lineNumber = nextLineNumber;
			} else {
				throw "idk";
			}

		}

		const holes = Array(18).fill(undefined);
		unindexedHoles.forEach(hole => {
			const index = hole.number - 1;
			holes[index] = hole;
		});

		// console.log(`Parsed Course, lines[${start}->${lineNumber-1}])`);
		const course = new Course(courseName, holes);
		return course;
	}

	function parseHole(lineNumber) {
		const start = lineNumber;
		let line = lines[lineNumber];

		const holeNumber = (() => {
			const segments = line.split(" ");
			lineNumber++;
			return parseInt(segments[segments.length - 1]);
		})();

		const [notes, nextLineNumber] = parseHoleNotes(lineNumber);
		lineNumber = nextLineNumber;

		const pins = [];
		while (lineNumber < lines.length) {
			line = lines[lineNumber];
			
			if (line.trim() === "") {
				// skip
				lineNumber++;
			} else if (line.startsWith("##")) {
				const [pin, nextLineNumber] = parsePin(lineNumber);
				pins.push(pin);
				lineNumber = nextLineNumber;
			} else if (line.startsWith("#")) {
				break;
			} else {
				lineNumber++;
			}
		}

		// console.log(`Parsed Hole ${holeNumber}, lines[${start}->${lineNumber-1}]`);
		const par = undefined;
		const hole = new Hole(holeNumber, par, notes, pins, courseName);
		return [hole, lineNumber];
	}

	function parseHoleNotes(lineNumber) {
		const start = lineNumber;
		function line() {
			return lines[lineNumber].trim();
		}

		notes = [];
		while (lineNumber < lines.length) {
			if (line() === "" || line().startsWith("//")) {
				lineNumber++;
			} else if (line().startsWith("#")) {
				break; // stop parsing
			} else if (line().startsWith("-")) {
				// text note
				notes.push(new TextHoleNote(line().substring(2, line().length)));
				lineNumber++;
			} else {
				// image note
				notes.push(new ImageHoleNote(line()));
				lineNumber++;
			}
		}

		return [notes, lineNumber];
	}

	function parsePin(lineNumber) {
		const start = lineNumber;
		let line = lines[lineNumber];

		const [label, distance] = (() => {
			const segments = line.split(":");

			const label = segments[0].substring(2, segments[0].length).trim();
			const distance = parseInt(segments[1].substring(0, segments[1].length-2));

			lineNumber++;
			return [label, distance];
		})();

		const stroke = 1;
		const shotOptions = [];
		while (lineNumber < lines.length) {
			line = lines[lineNumber];

			if (line.startsWith("-")) {
				const [shotOption, nextLineNumber] = parseSetup(lineNumber, stroke, 0);
				lineNumber = nextLineNumber;
				shotOptions.push(shotOption);
			} else if (line.trim().startsWith("//")) {
				lineNumber++;
			} else if (line.trim() === "") {
				lineNumber++;
			} else {
				break;
				console.log(`${lineNumber}: ${line}`);
				throw `idk3`;
			}
		}

		// console.log(`Parsed Pin, lines[${start}->${lineNumber-1}]`);
		const image = "";
		const pin = new Pin(label, distance, image, shotOptions);
		return [pin, lineNumber]
	}

	function parseSetup(lineNumber, stroke, indentation) {
		const start = lineNumber;
		const line = lines[lineNumber];

		let stripped = line.trim();
		stripped = stripped.substring(2, stripped.length);
		const segments = stripped.split(", ");

		let i = 0;

		const wind = parseWind(segments[i++]);

		const reference = parseReference(segments[i++]);
		
		const subpixel = parseSubpixel(segments[i]);
		if (subpixel) {
			i++;
		}

		const stance = parseStance(segments[i]);
		if (stance !== DEFAULT_STANCE) {
			i++;
		}

		const club = parseClub(segments[i++]);
		const power = parsePower(segments[i++]);
		const height = parseHeight(segments[i++], club);

		const spin = parseSpin(segments[i]);
		if (spin !== undefined) {
			i++;
		}

		const outcome = parseOutcome(segments.slice(i, segments.length));

		lineNumber++;

		// just guess the surface for now, but should probably encode
		// this in the notes at some point
		const surface = stroke === 1 ? TEE_SURFACE : FAIRWAY_SURFACE;

		const setup = new Setup(stroke, wind, reference, subpixel, surface, stance, club, power, height, spin, outcome);

		const subSetups = [];
		while (lineNumber < lines.length) {
			if (lineNumber < lines.length - 1) {
				const nextLine = lines[lineNumber];

				let nextIndentation = 0;
				for (let i = 0; i < nextLine.length; i++) {
					if (nextLine.charAt(i) !== " ")  {
						nextIndentation = i;
						break;
					}
				}

				if (nextIndentation > indentation) {
					const [subSetup, nextLineNumber] = parseSetup(lineNumber, stroke+1, nextIndentation);
					subSetup.parent = setup;
					subSetups.push(subSetup);
					lineNumber = nextLineNumber;
				} else if (nextLine.trim() == "") {
					lineNumber++;
				} else if (nextLine.trim().startsWith("//")) {
					lineNumber++;
				} else {
					break;
				}
			} else {
				break;
			}
		}

		setup.children = subSetups;

		// console.log(`Parsed Setup, lines[${start+1}->${lineNumber}] (indentation ${indentation})`);	
		return [setup, lineNumber]
	}

	function parseWind(segment) {
		const parts = segment.split("w");

		const strength = parseInt(parts[0]);
		const direction = parts[1].substring(1, parts[1].length - 1);

		return newWind(strength, direction);
	}

	function parseReference(segment) {
		return new VisualReference(`${segment}.png`);
	}

	function parseSubpixel(segment) {
		return {
			"leftmost": LEFTMOST_SUBPIXEL,
			"rightmost": RIGHTMOST_SUBPIXEL,
		}[segment];
	}

	function parseStance(stance) {
		const result = {
			[STANCE_3x_HOOK.value]: STANCE_3x_HOOK,
			[STANCE_2x_HOOK.value]: STANCE_2x_HOOK,
			[STANCE_1x_HOOK.value]: STANCE_1x_HOOK,
			[STANCE_1x_SLICE.value]: STANCE_1x_SLICE,
			[STANCE_2x_SLICE.value]: STANCE_2x_SLICE,
			[STANCE_3x_SLICE.value]: STANCE_3x_SLICE,
		}[stance];

		if (result === undefined) {
			return DEFAULT_STANCE;
		}

		return result;
	}

	function parseClub(club) {
		return {
			[CLUB_280Y.name]: CLUB_280Y,
			[CLUB_260Y.name]: CLUB_260Y,
			[CLUB_250Y.name]: CLUB_250Y,
			[CLUB_240Y.name]: CLUB_240Y,
			[CLUB_220Y.name]: CLUB_220Y,
			[CLUB_210Y.name]: CLUB_210Y,
			[CLUB_200Y.name]: CLUB_200Y,
			[CLUB_190Y.name]: CLUB_190Y,
			[CLUB_180Y.name]: CLUB_180Y,
			[CLUB_170Y.name]: CLUB_170Y,
			[CLUB_160Y.name]: CLUB_160Y,
			[CLUB_140Y.name]: CLUB_140Y,
			[CLUB_120Y.name]: CLUB_120Y,
		}[club];
	}

	function parsePower(segment) {
		const value = (segment === "max%" ?
			segment :
			segment.substring(0, segment.length - 1)
		)

		let direction = undefined;
		if (segment.endsWith("^")) {
			direction = "up";
		} else if (segment.endsWith("v")) {
			direction = "down";
		}

		return newPower(value, direction);;
	}

	function parseHeight(segment, club) {
		const value = segment.substring(0, segment.length - 1);
		
		let direction = undefined;
		if (segment.endsWith("^")) {
			direction = "up";
		} else if (segment.endsWith("v")) {
			direction = "down";
		}

		return newHeight(value, direction, club);
	}

	function parseSpin(segment) {
		const trimmed = segment.trim();
		if (trimmed === "backspin") {
			return BACKSPIN;
		} else if (trimmed === "topspin") {
			return TOPSPIN;
		}
		return undefined;
	}

	function parseOutcome(segments) {
		function onSegment(segment, callback) {
			const index = segments.indexOf(segment);
			const found = index !== -1;
			if (found) {
				segments.splice(index, 1);
				callback();
			}
		}

		let bounce = undefined;
		let trees = undefined;
		let consistent = false;
		let rest = undefined;

		onSegment("rolls in", () => { bounce = 0; });
		onSegment("1st bounce", () => { bounce = 1; });
		onSegment("2nd bounce", () => { bounce = 2; });
		onSegment("3rd bounce", () => { bounce = 3; });
		onSegment("4th bounce", () => { bounce = 4; });
		onSegment("5th bounce", () => { bounce = 5; });
		onSegment("1x tree", () => { trees = 1 });
		onSegment("1x tree", () => { trees = 1 });
		onSegment("2x tree", () => { trees = 2 });
		onSegment("3x tree", () => { trees = 3 });
		onSegment("4x tree", () => { trees = 4 });
		onSegment("consistent", () => { consistent = true });

		// parse remaining distance if it exists

		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			if (segment.trim().startsWith("rest")) {
				parts = segment.split(" ");
				rest = parseInt(parts[1]);
				segments.splice(i, 1);
				break;
			}
		}

		const notes = segments;

		let outcome;
		if (rest === undefined) {
			outcome = new SuccessfulShot(bounce, trees, consistent, notes);
		} else {
			outcome = new NotFinishedYet(rest, notes);
		}

		return outcome;
	}

	return parseCourse(0);
}
