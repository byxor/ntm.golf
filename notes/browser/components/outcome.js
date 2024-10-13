class OutcomeComponent extends HTMLElement {
	
	#navigationController;
	#outcome;

	#topText;
	#bottomText;
	#image;
	#highlightable = true;
	#textMargin;
	
	init(navigationController, outcome) {
		this.#navigationController = navigationController;
		this.#outcome = outcome;

		this.#setTopAndBottomText();
	}

	#setTopAndBottomText() {
		// TODO: update trees for other courses e.g. 🌴🌲🌳
		if (this.#outcome instanceof SuccessfulShot) {
			this.#topText = this.#outcome.trees > 0 ? `${this.#outcome.trees} x&#127794;` : ``;
			this.#bottomText = (() => {
				switch(this.#outcome.bounce) {
					case 1: return "1st bounce";
					case 2: return "2nd bounce";
					case 3: return "3rd bounce";
					case 4: return "4th bounce";
					case 5: return "5th bounce";
					default: return "Rolls in...";
				}
			})() + "&nbsp;";
			this.#image = "/assets/flags/flag.png";
			// this.#highlightable = false;
			this.#textMargin = 64;
		} else {
			this.#topText = `Rest ${this.#outcome.rest} Y`;
			this.#bottomText = "&rArr;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; // ⇒
			this.#image = "";
			// this.#highlightable = true;
			this.#textMargin = 55;
		}
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
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
					margin-right: ${this.#textMargin}px;
				}

				.image {
					position: absolute;
					width: 61px;
					height: 61px;
					left: 116px;
					overflow: hidden;
					border-radius: 0 4px 0 0;
					opacity: 0.6;
				}

				.text {
					text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
				}
			</style>
			<div class="container ${this.#highlightable ? "highlightable" : ""}">
				${
					this.#image !== "" ?
					`<img class="image" src="${this.#image}" draggable="false"></img>	` : ``
				}
				<span class="text">${this.#topText}</span>
				<br class="br"/>
				<span class="text">${this.#bottomText}</span>
			</div>
		`);
	}
}

customElements.define('outcome-', OutcomeComponent);
