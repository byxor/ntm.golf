class HoleComponent extends HTMLElement {

	// TODO: pass hole object into this
	init(number, onSelected) {
		this.number = number;
		this.selected = false;
		this.onSelected = onSelected;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		createTemplate(this, `
			<style>
				.container {
					width: 40px;
					height: 40px;
					cursor: pointer;

					text-align: center;
					vertical-align: middle;
					line-height: 20px;  

				}
				.selected {
				    -webkit-box-shadow:inset 0px 0px 0px 2px orange;
				    -moz-box-shadow:inset 0px 0px 0px 2px orange;
				    box-shadow:inset 0px 0px 0px 2px orange;
				    background-color: #bbbbbb;
				    font-size: 27px;
				}
				.deselected {
					background-color: grey;
				}
				.text {
					text-align: center;
					vertical-align: middle;
					line-height: 40px;   
				}
			</style>
			<div class="container ${this.selected ? "selected" : "deselected"}">
				<span class="text">${this.number}</span>
			</div>
		`);

		this.shadowRoot
			.querySelector(".container")
			.addEventListener("click", () => this.onClick());
	}

	onClick() {
		this.select();
	}

	select() {
		this.selected = true;
		this.render();
		this.onSelected(this.number);
	}

	deselect() {
		this.selected = false;
		this.render();
	}
}

class HoleSelectComponent extends HTMLElement {

	// TODO: pass holes here
	init(onHoleSelected) {
		this.onHoleSelected = onHoleSelected;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		createTemplate(this, `
			<style>
				.container {
					display: flex;
					flex-wrap: wrap;
					gap: 2px;
					width: 378px;
				}
			</style>
			<div class="container"></div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		const holes = [];
		for (let number = 1; number <= 18; number++) {
			const hole = document.createElement('hole-');
			holes.push(hole);

			hole.init(number, (selectedNumber) => {
				const unselectedHoles = holes.filter(hole => hole.number !== selectedNumber);
				unselectedHoles.forEach(hole => hole.deselect());
				this.onHoleSelected(hole);
			});

			container.appendChild(hole);
		}

		holes[0].select();
	}
}

customElements.define('hole-', HoleComponent);
customElements.define('hole-select', HoleSelectComponent);