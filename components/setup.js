class ClubComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					overflow: hidden;
					width: 218px;
				}

				.image {
					position: relative;
					left: -90px;

					width: 220px;
				}
			</style>
			<div class="container">
				<img class="image" src="${this.clubImage}" draggable="false">
			</div>
		`);
	}

	init(club) {
		this.club = club;
		this.clubImage = `./assets/clubs/${club.name}.png`;
	}
}

class StanceComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.image {
					width: 70px;
				}

				.stance-3x {
					opacity: 1;
				}

				.stance-2x {
					opacity: 0.9;
				}

				.stance-1x {
					opacity: 0.6;
				}

				.stance-default {
					opacity: 0.3;
				}
			</style>
			<div>
				<img class="image ${this.stanceClass}" src="${this.stanceImage}" draggable="false"/>
			</div>
		`);
	}

	init(stance) {
		this.stance = stance;

		this.stanceImage = (() => {
			const path = `./assets/stances`;
			if (stance !== DEFAULT_STANCE) {
				return `${path}/${this.stance.value.replace(" ", "-")}.png`;
			} else {
				return `${path}/default.png`;
			}
		})();

		this.stanceClass = (() => {
			const stance = this.stance;
			if (stance === DEFAULT_STANCE) {
				return "stance-default";
			} else if (stance === STANCE_1x_HOOK || stance === STANCE_1x_SLICE) {
				return "stance-1x";
			} else if (stance === STANCE_2x_HOOK || stance === STANCE_2x_SLICE) {
				return "stance-2x";
			} else {
				return "stance-3x";
			}
		})();
	}
}

class OutcomeComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
					background-color: rgba(0,0,0,0.5);
					transition: background-color 0.1s cubic-bezier(0.16, 1, 0.3, 1);
					border-left: 6px solid black;

					color: #cecece;

					width: 176px;
					height: 61px;

					text-align: right;
					line-height: 200%;
				}

				.highlightable:hover {
					background-color: rgba(255, 165, 0, 0.9);
					cursor: pointer;
				}

				.container .text {
					margin-right: ${this.textMargin}px;
				}

				.image {
					position: absolute;
					width: 61px;
					height: 61px;
					left: 115px;
				}

				.text {
					text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
				}
			</style>
			<div class="container ${this.highlightable ? "highlightable" : ""}">
				${
					this.image !== "" ?
					`<img class="image" src="${this.image}" draggable="false"></img>	` : ``
				}
				<span class="text">${this.topText}</span>
				<br class="br"/>
				<span class="text">${this.bottomText}</span>
			</div>
		`);
	}

	init(outcome) {
		this.outcome = outcome;

		// TODO: update trees for other courses e.g. 🌴🌲🌳
		if (this.outcome instanceof SuccessfulShot) {
			this.topText = outcome.trees > 0 ? `${outcome.trees} x&#127794;` : ``;
			this.bottomText = (() => {
				switch(outcome.bounce) {
					case 1: return "1st bounce";
					case 2: return "2nd bounce";
					case 3: return "3rd bounce";
					case 4: return "4th bounce";
					case 5: return "5th bounce";
					default: return "Rolls in...";
				}
			})() + "&nbsp;";
			this.image = "./assets/flags/flag.png";
			this.highlightable = false;
			this.textMargin = 64;
		} else {
			this.topText = `Rest ${this.outcome.rest} Y`;
			this.bottomText = "&rArr;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; // ⇒
			this.image = "";
			this.highlightable = true;
			this.textMargin = 55;
		}
	}
}

class NotesComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
					text-shadow: 0 0 3px red, 0 0 5px blue;
				}

				.list {
					position: absolute;
					left: -30px;
					list-style: none;
				}

				.item {
					color: white;
					font-size: 14px;
				}

				.item::before {
					content: '\\2022    ';
				}

				.item:not(:first-child) {
					margin-top: 12px;
				}
			</style>
			<div class="container">
				<ul class="list">
				</ul>
			</div>
		`);

		const notesList = this.shadowRoot.querySelector(".list");
		this.notes.forEach(note => {
			const item = document.createElement("li");
			item.setAttribute("class", "item");
			item.innerHTML = note;
			notesList.appendChild(item);
		});
	}

	init(notes) {
		this.notes = notes;
	}
}


class SetupComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
					border-radius: 4px;
					overflow: hidden;
				}

				.club {
					position: absolute;
				    top: 0;
				    left: 0;

				    z-index: 10;
				}

				.stance {
					position: absolute;
				    top: 44px;
				    left: 0;

				    z-index: 10;
				}

				.die {
					position: absolute;
					left: 328px;
					top: 148px;

					width: 28px;

					opacity: 1;
					transform: rotateY(180deg);
					-webkit-filter: drop-shadow(2px 5px 4px #222) brightness(0.92);
					filter:         drop-shadow(2px 2px 4px #222) brightness(0.92);

					z-index: 10;		
				}

				.hidden {
					visibility: hidden;
				}

				.notes {
					position: absolute;
					z-index: 10;

					width: 200px;
					height: 100px;

					color: white;

					left: 0px;
					top: 80px;
				}

				.outcome {
					position: absolute;
					z-index: 10;

					width: 176px;
					height: 61px;

					left: 421px;
				}

				.shot-meter {
					position: relative;
				}
			</style>
			<div class="container">
				<div class="club"></div>
				<div class="stance"></div>
				<img class="die ${this.setup.outcome.consistent ? "hidden" : ""}" src="./assets/dice/die.png" draggable="false"></img>
				<div class="notes"></div>
				<div class="outcome"></div>
				<div class="shot-meter"></div>
			</div>
		`);

		const clubContainer = this.shadowRoot.querySelector(".club");
		const clubComponent = document.createElement("club-");
		clubComponent.init(this.setup.club);
		clubContainer.appendChild(clubComponent);

		const stanceContainer = this.shadowRoot.querySelector(".stance");
		const stanceComponent = document.createElement("stance-");
		stanceComponent.init(this.setup.stance);
		stanceContainer.appendChild(stanceComponent);

		const notesContainer = this.shadowRoot.querySelector(".notes");
		const notesComponent = document.createElement("notes-");
		notesComponent.init(this.setup.outcome.notes);
		notesContainer.appendChild(notesComponent);

		const outcomeContainer = this.shadowRoot.querySelector(".outcome");
		const outcomeComponent = document.createElement("outcome-");
		outcomeComponent.init(this.setup.outcome);
		outcomeContainer.appendChild(outcomeComponent);

		const shotMeterContainer = this.shadowRoot.querySelector(".shot-meter");
		const shotMeterComponent = document.createElement('shot-meter');
		shotMeterComponent.init(
			this.setup.surface,
			this.setup.club,
			this.setup.power,
			this.setup.height,
			this.setup.spin,
			this.setup.outcome.notes.length,
		);
		shotMeterContainer.appendChild(shotMeterComponent);

		// TODO:
		// Allow setup component to be right-clicked to save an image
		// or copy it to the clipboard.
		// html2canvas & clipboard API?
	}

	init(setup) {		
		this.setup = setup;
	}
}

customElements.define('club-', ClubComponent);
customElements.define('stance-', StanceComponent);
customElements.define('outcome-', OutcomeComponent);
customElements.define('notes-', NotesComponent);
customElements.define('setup-', SetupComponent);